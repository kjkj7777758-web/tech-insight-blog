'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  Braces,
  Copy,
  Check,
  Minimize2,
  Sparkles,
  RotateCcw,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  FileJson,
  Keyboard,
} from 'lucide-react';

type IndentType = '2spaces' | '4spaces' | 'tab';

interface JsonStats {
  keyCount: number;
  maxDepth: number;
  dataSize: string;
  arrayCount: number;
  objectCount: number;
  stringCount: number;
  numberCount: number;
  booleanCount: number;
  nullCount: number;
}

function countKeys(obj: unknown, depth = 0): { keys: number; maxDepth: number; arrays: number; objects: number; strings: number; numbers: number; booleans: number; nulls: number } {
  let keys = 0;
  let maxDepth = depth;
  let arrays = 0;
  let objects = 0;
  let strings = 0;
  let numbers = 0;
  let booleans = 0;
  let nulls = 0;

  if (obj === null) {
    nulls = 1;
    return { keys, maxDepth, arrays, objects, strings, numbers, booleans, nulls };
  }

  if (typeof obj === 'string') {
    strings = 1;
    return { keys, maxDepth, arrays, objects, strings, numbers, booleans, nulls };
  }

  if (typeof obj === 'number') {
    numbers = 1;
    return { keys, maxDepth, arrays, objects, strings, numbers, booleans, nulls };
  }

  if (typeof obj === 'boolean') {
    booleans = 1;
    return { keys, maxDepth, arrays, objects, strings, numbers, booleans, nulls };
  }

  if (Array.isArray(obj)) {
    arrays = 1;
    for (const item of obj) {
      const child = countKeys(item, depth + 1);
      keys += child.keys;
      maxDepth = Math.max(maxDepth, child.maxDepth);
      arrays += child.arrays;
      objects += child.objects;
      strings += child.strings;
      numbers += child.numbers;
      booleans += child.booleans;
      nulls += child.nulls;
    }
  } else if (typeof obj === 'object') {
    objects = 1;
    const entries = Object.entries(obj as Record<string, unknown>);
    keys += entries.length;
    for (const [, value] of entries) {
      const child = countKeys(value, depth + 1);
      keys += child.keys;
      maxDepth = Math.max(maxDepth, child.maxDepth);
      arrays += child.arrays;
      objects += child.objects;
      strings += child.strings;
      numbers += child.numbers;
      booleans += child.booleans;
      nulls += child.nulls;
    }
  }

  return { keys, maxDepth, arrays, objects, strings, numbers, booleans, nulls };
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function syntaxHighlight(json: string): string {
  const escaped = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return escaped.replace(
    /("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = 'text-emerald-600 dark:text-emerald-400'; // number
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'text-blue-600 dark:text-blue-400 font-medium'; // key
          match = match.replace(/:$/, '');
          return `<span class="${cls}">${match}</span>:`;
        } else {
          cls = 'text-amber-600 dark:text-amber-400'; // string
        }
      } else if (/true|false/.test(match)) {
        cls = 'text-purple-600 dark:text-purple-400'; // boolean
      } else if (/null/.test(match)) {
        cls = 'text-red-500 dark:text-red-400 italic'; // null
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

function getErrorLineNumber(input: string, errorMessage: string): number | null {
  const posMatch = errorMessage.match(/position\s+(\d+)/i);
  if (posMatch) {
    const position = parseInt(posMatch[1], 10);
    const upToError = input.substring(0, position);
    return upToError.split('\n').length;
  }

  const lineMatch = errorMessage.match(/line\s+(\d+)/i);
  if (lineMatch) {
    return parseInt(lineMatch[1], 10);
  }

  const colMatch = errorMessage.match(/column\s+(\d+)/i);
  if (!colMatch) {
    try {
      JSON.parse(input);
    } catch {
      const msg = (errorMessage || '').toString();
      const atPos = msg.match(/at position (\d+)/);
      if (atPos) {
        const pos = parseInt(atPos[1], 10);
        return input.substring(0, pos).split('\n').length;
      }
    }
  }

  return null;
}

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [errorLine, setErrorLine] = useState<number | null>(null);
  const [indentType, setIndentType] = useState<IndentType>('2spaces');
  const [showIndentDropdown, setShowIndentDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<JsonStats | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getIndent = useCallback((): string | number => {
    switch (indentType) {
      case '2spaces': return 2;
      case '4spaces': return 4;
      case 'tab': return '\t';
      default: return 2;
    }
  }, [indentType]);

  const getIndentLabel = useCallback((): string => {
    switch (indentType) {
      case '2spaces': return '2 Spaces';
      case '4spaces': return '4 Spaces';
      case 'tab': return 'Tab';
      default: return '2 Spaces';
    }
  }, [indentType]);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2000);
  }, []);

  const validateAndParse = useCallback((text: string): { parsed: unknown; valid: boolean; errorMsg: string | null; errorLine: number | null } => {
    if (!text.trim()) {
      return { parsed: null, valid: false, errorMsg: null, errorLine: null };
    }

    try {
      const parsed = JSON.parse(text);
      return { parsed, valid: true, errorMsg: null, errorLine: null };
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'JSON parsing error';
      const line = getErrorLineNumber(text, msg);
      return { parsed: null, valid: false, errorMsg: msg, errorLine: line };
    }
  }, []);

  const computeStats = useCallback((parsed: unknown, rawText: string): JsonStats => {
    const result = countKeys(parsed);
    const byteSize = new Blob([rawText]).size;
    return {
      keyCount: result.keys,
      maxDepth: result.maxDepth,
      dataSize: formatBytes(byteSize),
      arrayCount: result.arrays,
      objectCount: result.objects,
      stringCount: result.strings,
      numberCount: result.numbers,
      booleanCount: result.booleans,
      nullCount: result.nulls,
    };
  }, []);

  const handleFormat = useCallback(() => {
    const { parsed, valid, errorMsg, errorLine: errLine } = validateAndParse(input);

    if (!input.trim()) {
      setOutput('');
      setError(null);
      setErrorLine(null);
      setStats(null);
      setIsValid(null);
      return;
    }

    if (!valid) {
      setError(errorMsg);
      setErrorLine(errLine);
      setOutput('');
      setStats(null);
      setIsValid(false);
      return;
    }

    const formatted = JSON.stringify(parsed, null, getIndent());
    setOutput(formatted);
    setError(null);
    setErrorLine(null);
    setIsValid(true);
    setStats(computeStats(parsed, formatted));
  }, [input, getIndent, validateAndParse, computeStats]);

  const handleMinify = useCallback(() => {
    const { parsed, valid, errorMsg, errorLine: errLine } = validateAndParse(input);

    if (!input.trim()) {
      setOutput('');
      setError(null);
      setErrorLine(null);
      setStats(null);
      setIsValid(null);
      return;
    }

    if (!valid) {
      setError(errorMsg);
      setErrorLine(errLine);
      setOutput('');
      setStats(null);
      setIsValid(false);
      return;
    }

    const minified = JSON.stringify(parsed);
    setOutput(minified);
    setError(null);
    setErrorLine(null);
    setIsValid(true);
    setStats(computeStats(parsed, minified));
  }, [input, validateAndParse, computeStats]);

  const handleCopy = useCallback(async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      showToast('클립보드에 복사되었습니다');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('복사에 실패했습니다');
    }
  }, [output, showToast]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setError(null);
    setErrorLine(null);
    setStats(null);
    setIsValid(null);
    inputRef.current?.focus();
  }, []);

  // Real-time validation as user types
  useEffect(() => {
    if (!input.trim()) {
      setError(null);
      setErrorLine(null);
      setIsValid(null);
      return;
    }

    const timer = setTimeout(() => {
      const { valid, errorMsg, errorLine: errLine } = validateAndParse(input);
      if (valid) {
        setError(null);
        setErrorLine(null);
        setIsValid(true);
      } else {
        setError(errorMsg);
        setErrorLine(errLine);
        setIsValid(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input, validateAndParse]);

  // Keyboard shortcut: Ctrl+Enter to format
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleFormat();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFormat]);

  // Close indent dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowIndentDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const highlightedOutput = output ? syntaxHighlight(output) : '';

  return (
    <div className="w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg shadow-lg">
            <Check size={16} />
            {toastMessage}
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button
          onClick={handleFormat}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Sparkles size={16} />
          포맷팅
        </button>

        <button
          onClick={handleMinify}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-lg transition-colors"
        >
          <Minimize2 size={16} />
          압축
        </button>

        <button
          onClick={handleCopy}
          disabled={!output}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          복사
        </button>

        <button
          onClick={handleClear}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-lg transition-colors"
        >
          <RotateCcw size={16} />
          초기화
        </button>

        <div className="ml-auto flex items-center gap-3">
          {/* Indent Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowIndentDropdown(!showIndentDropdown)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-600 dark:text-gray-300 text-sm rounded-lg transition-colors"
            >
              <Braces size={14} />
              {getIndentLabel()}
              <ChevronDown size={14} />
            </button>

            {showIndentDropdown && (
              <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-10">
                {([
                  { value: '2spaces' as IndentType, label: '2 Spaces' },
                  { value: '4spaces' as IndentType, label: '4 Spaces' },
                  { value: 'tab' as IndentType, label: 'Tab' },
                ]).map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setIndentType(option.value);
                      setShowIndentDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors ${
                      indentType === option.value
                        ? 'text-primary-600 dark:text-primary-400 font-medium bg-primary-50 dark:bg-primary-900/20'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Keyboard shortcut hint */}
          <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <Keyboard size={12} />
            <span>Ctrl+Enter</span>
          </div>
        </div>
      </div>

      {/* Validation Status Bar */}
      {input.trim() && (
        <div className={`flex items-center gap-2 px-3 py-2 mb-4 rounded-lg text-sm ${
          isValid === true
            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/50'
            : isValid === false
              ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50'
              : 'bg-gray-50 dark:bg-slate-800 text-gray-500 border border-gray-200 dark:border-gray-700/50'
        }`}>
          {isValid === true && (
            <>
              <CheckCircle2 size={16} />
              <span className="font-medium">유효한 JSON입니다</span>
            </>
          )}
          {isValid === false && (
            <>
              <AlertCircle size={16} />
              <span className="font-medium">
                JSON 문법 오류
                {errorLine && <span className="ml-1">(라인 {errorLine})</span>}
              </span>
              {error && <span className="hidden sm:inline ml-1 opacity-80">- {error}</span>}
            </>
          )}
        </div>
      )}

      {/* Editor Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input Panel */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-slate-800/80 border border-b-0 border-gray-200 dark:border-gray-700/50 rounded-t-lg">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              <FileJson size={14} />
              입력 JSON
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {input.length > 0 && formatBytes(new Blob([input]).size)}
            </span>
          </div>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='여기에 JSON을 붙여넣으세요...&#10;&#10;예시:&#10;{&#10;  "name": "테크인사이트",&#10;  "type": "기술 블로그"&#10;}'
            spellCheck={false}
            className={`w-full h-80 lg:h-[480px] p-4 font-mono text-sm leading-relaxed bg-white dark:bg-slate-800/50 border rounded-b-lg resize-none focus:outline-none focus:ring-2 transition-colors ${
              isValid === false
                ? 'border-red-300 dark:border-red-700/50 focus:ring-red-500/30'
                : isValid === true
                  ? 'border-green-300 dark:border-green-700/50 focus:ring-green-500/30'
                  : 'border-gray-200 dark:border-gray-700/50 focus:ring-primary-500/30'
            } text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500`}
          />
        </div>

        {/* Output Panel */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-slate-800/80 border border-b-0 border-gray-200 dark:border-gray-700/50 rounded-t-lg">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              <Sparkles size={14} />
              포맷 결과
            </div>
            {output && (
              <button
                onClick={handleCopy}
                className="text-xs text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {copied ? '복사됨!' : '복사'}
              </button>
            )}
          </div>
          <div className="w-full h-80 lg:h-[480px] overflow-auto bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-gray-700/50 rounded-b-lg">
            {highlightedOutput ? (
              <pre
                className="p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap break-all"
                dangerouslySetInnerHTML={{ __html: highlightedOutput }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500 text-sm">
                {input.trim()
                  ? isValid === false
                    ? 'JSON 문법 오류를 수정한 후 포맷팅하세요'
                    : '포맷팅 버튼을 클릭하거나 Ctrl+Enter를 누르세요'
                  : 'JSON을 입력하면 여기에 결과가 표시됩니다'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Panel */}
      {stats && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-gray-700/50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">JSON 분석 정보</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="text-center p-2 bg-white dark:bg-slate-700/50 rounded-lg">
              <div className="text-lg font-bold text-primary-600 dark:text-primary-400">{stats.keyCount}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">키(Key) 수</div>
            </div>
            <div className="text-center p-2 bg-white dark:bg-slate-700/50 rounded-lg">
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{stats.maxDepth}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">중첩 깊이</div>
            </div>
            <div className="text-center p-2 bg-white dark:bg-slate-700/50 rounded-lg">
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{stats.dataSize}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">데이터 크기</div>
            </div>
            <div className="text-center p-2 bg-white dark:bg-slate-700/50 rounded-lg">
              <div className="text-lg font-bold text-amber-600 dark:text-amber-400">{stats.objectCount}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">객체(Object)</div>
            </div>
            <div className="text-center p-2 bg-white dark:bg-slate-700/50 rounded-lg">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{stats.arrayCount}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">배열(Array)</div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span>문자열: <strong className="text-amber-600 dark:text-amber-400">{stats.stringCount}</strong></span>
            <span>숫자: <strong className="text-emerald-600 dark:text-emerald-400">{stats.numberCount}</strong></span>
            <span>불리언: <strong className="text-purple-600 dark:text-purple-400">{stats.booleanCount}</strong></span>
            <span>Null: <strong className="text-red-500 dark:text-red-400">{stats.nullCount}</strong></span>
          </div>
        </div>
      )}

      {/* Sample JSON button */}
      {!input.trim() && (
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              const sample = JSON.stringify({
                "name": "테크인사이트",
                "type": "기술 블로그",
                "established": 2024,
                "categories": ["리뷰", "튜토리얼", "팁", "가이드"],
                "features": {
                  "darkMode": true,
                  "responsive": true,
                  "seo": {
                    "enabled": true,
                    "languages": ["ko", "en"]
                  }
                },
                "stats": {
                  "posts": 150,
                  "monthlyVisitors": null,
                  "rating": 4.8
                }
              });
              setInput(sample);
            }}
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            예시 JSON 불러오기
          </button>
        </div>
      )}

      {/* Toast animation style */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -8px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
