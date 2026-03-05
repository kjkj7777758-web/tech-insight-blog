'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  ArrowRightLeft,
  Copy,
  RotateCcw,
  Upload,
  FileUp,
  CheckCircle,
  AlertCircle,
  ArrowUpDown,
  Info,
} from 'lucide-react';

type Mode = 'encode' | 'decode';

interface Stats {
  inputSize: number;
  outputSize: number;
  ratio: string;
}

function isBase64(str: string): boolean {
  if (!str || str.length < 4) return false;
  const trimmed = str.trim();
  const base64Regex = /^[A-Za-z0-9+/\n\r]+=*$/;
  if (!base64Regex.test(trimmed)) return false;
  if (trimmed.length % 4 !== 0 && !trimmed.endsWith('=')) return false;
  return trimmed.length >= 8;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);
  return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function utf8ToBase64(str: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function base64ToUtf8(b64: string): string {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const decoder = new TextDecoder('utf-8');
  return decoder.decode(bytes);
}

export default function Base64Converter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<Mode>('encode');
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [autoDetectHint, setAutoDetectHint] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-detect mode hint when input changes
  useEffect(() => {
    if (input.trim().length > 0 && mode === 'encode' && isBase64(input.trim())) {
      setAutoDetectHint('입력값이 Base64 형식으로 보입니다. 디코딩 모드를 사용해보세요.');
    } else if (input.trim().length > 0 && mode === 'decode' && !isBase64(input.trim())) {
      setAutoDetectHint('입력값이 Base64 형식이 아닌 것 같습니다. 인코딩 모드를 사용해보세요.');
    } else {
      setAutoDetectHint('');
    }
  }, [input, mode]);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2500);
  }, []);

  const handleConvert = useCallback(() => {
    setError('');
    setOutput('');
    setStats(null);

    if (!input.trim()) {
      setError('변환할 텍스트를 입력해주세요.');
      return;
    }

    try {
      let result: string;
      const inputBytes = new TextEncoder().encode(input).length;

      if (mode === 'encode') {
        result = utf8ToBase64(input);
      } else {
        const cleaned = input.trim().replace(/\s/g, '');

        if (!isBase64(cleaned)) {
          setError('유효하지 않은 Base64 문자열입니다. 올바른 Base64 형식인지 확인해주세요.');
          return;
        }

        try {
          result = base64ToUtf8(cleaned);
        } catch {
          setError('Base64 디코딩에 실패했습니다. 입력값이 올바른 Base64 형식인지 확인해주세요.');
          return;
        }
      }

      const outputBytes = new TextEncoder().encode(result).length;
      const ratio =
        mode === 'encode'
          ? inputBytes > 0
            ? ((outputBytes / inputBytes) * 100).toFixed(1)
            : '0'
          : outputBytes > 0
            ? ((inputBytes / outputBytes) * 100).toFixed(1)
            : '0';

      setOutput(result);
      setStats({
        inputSize: inputBytes,
        outputSize: outputBytes,
        ratio: `${ratio}%`,
      });
    } catch {
      setError(
        mode === 'encode'
          ? '인코딩 중 오류가 발생했습니다.'
          : '디코딩 중 오류가 발생했습니다. 유효한 Base64 문자열인지 확인해주세요.'
      );
    }
  }, [input, mode]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      showToast('클립보드에 복사되었습니다!');
    } catch {
      // fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = output;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('클립보드에 복사되었습니다!');
    }
  }, [output, showToast]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
    setStats(null);
    setFileName('');
    setAutoDetectHint('');
  }, []);

  const handleSwap = useCallback(() => {
    if (!output) return;
    setInput(output);
    setOutput('');
    setError('');
    setStats(null);
    setMode((prev) => (prev === 'encode' ? 'decode' : 'encode'));
    setAutoDetectHint('');
  }, [output]);

  const handleFileRead = useCallback(
    (file: File) => {
      setFileName(file.name);
      setError('');

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setError('파일 크기가 5MB를 초과합니다. 더 작은 파일을 사용해주세요.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const bytes = new Uint8Array(arrayBuffer);
        let binary = '';
        bytes.forEach((b) => (binary += String.fromCharCode(b)));
        const base64 = btoa(binary);

        setMode('encode');
        setInput(`[파일: ${file.name} (${formatBytes(file.size)})]`);
        setOutput(base64);

        const outputBytes = new TextEncoder().encode(base64).length;
        setStats({
          inputSize: file.size,
          outputSize: outputBytes,
          ratio: `${((outputBytes / file.size) * 100).toFixed(1)}%`,
        });

        showToast(`${file.name} 파일이 Base64로 변환되었습니다.`);
      };
      reader.onerror = () => {
        setError('파일 읽기에 실패했습니다.');
      };
      reader.readAsArrayBuffer(file);
    },
    [showToast]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileRead(file);
    },
    [handleFileRead]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFileRead(file);
      e.target.value = '';
    },
    [handleFileRead]
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl shadow-lg animate-fade-in text-sm font-medium">
          <CheckCircle size={16} />
          {toast}
        </div>
      )}

      {/* Mode Toggle */}
      <div className="flex items-center justify-center">
        <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-700/50 bg-gray-50 dark:bg-slate-800/80 p-1">
          <button
            onClick={() => {
              setMode('encode');
              setError('');
              setAutoDetectHint('');
            }}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              mode === 'encode'
                ? 'bg-[#2563eb] text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            인코딩 (Encode)
          </button>
          <button
            onClick={() => {
              setMode('decode');
              setError('');
              setAutoDetectHint('');
            }}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              mode === 'decode'
                ? 'bg-[#2563eb] text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            디코딩 (Decode)
          </button>
        </div>
      </div>

      {/* Auto-detect Hint */}
      {autoDetectHint && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 text-sm text-blue-700 dark:text-blue-300">
          <Info size={16} className="mt-0.5 shrink-0" />
          <span>{autoDetectHint}</span>
        </div>
      )}

      {/* Input Area */}
      <div
        className={`relative rounded-xl border-2 transition-colors ${
          isDragOver
            ? 'border-[#2563eb] bg-blue-50 dark:bg-blue-900/10'
            : 'border-gray-200 dark:border-gray-700/50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 dark:border-gray-700/50 bg-gray-50 dark:bg-slate-800/80 rounded-t-xl">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {mode === 'encode' ? '원본 텍스트' : 'Base64 문자열'}
          </span>
          <div className="flex items-center gap-2">
            {fileName && (
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-md">
                {fileName}
              </span>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-[#2563eb] dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Upload size={14} />
              파일 업로드
            </button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === 'encode'
              ? '인코딩할 텍스트를 입력하세요... (한글도 지원합니다)\n\n파일을 드래그 앤 드롭하여 Base64로 변환할 수도 있습니다.'
              : 'Base64 문자열을 입력하세요...\n\n예: SGVsbG8gV29ybGQh'
          }
          className="w-full h-44 p-4 bg-white dark:bg-slate-800/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none rounded-b-xl font-mono text-sm leading-relaxed"
        />

        {/* Drag overlay */}
        {isDragOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-blue-50/90 dark:bg-blue-900/40 rounded-xl z-10">
            <div className="flex flex-col items-center gap-2 text-[#2563eb] dark:text-blue-400">
              <FileUp size={32} />
              <span className="text-sm font-medium">파일을 놓으세요</span>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleConvert}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium rounded-xl transition-colors shadow-sm"
        >
          <ArrowRightLeft size={16} />
          변환
        </button>
        <button
          onClick={handleCopy}
          disabled={!output}
          className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-slate-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 font-medium rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Copy size={16} />
          복사
        </button>
        <button
          onClick={handleSwap}
          disabled={!output}
          className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-slate-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 font-medium rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowUpDown size={16} />
          입출력 교환
        </button>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-slate-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 font-medium rounded-xl transition-colors"
        >
          <RotateCcw size={16} />
          초기화
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-sm text-red-700 dark:text-red-300">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Output Area */}
      <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700/50">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 dark:border-gray-700/50 bg-gray-50 dark:bg-slate-800/80 rounded-t-xl">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {mode === 'encode' ? 'Base64 결과' : '디코딩 결과'}
          </span>
          {output && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-[#2563eb] dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Copy size={14} />
              복사
            </button>
          )}
        </div>
        <textarea
          value={output}
          readOnly
          placeholder="변환 결과가 여기에 표시됩니다..."
          className="w-full h-44 p-4 bg-white dark:bg-slate-800/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none rounded-b-xl font-mono text-sm leading-relaxed"
        />
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-gray-700/50">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">입력 크기</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {formatBytes(stats.inputSize)}
            </p>
          </div>
          <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-gray-700/50">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">출력 크기</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {formatBytes(stats.outputSize)}
            </p>
          </div>
          <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-gray-700/50">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              {mode === 'encode' ? '인코딩 비율' : '압축 비율'}
            </p>
            <p className="text-sm font-semibold text-[#2563eb] dark:text-blue-400">
              {stats.ratio}
            </p>
          </div>
        </div>
      )}

      {/* Usage Tips */}
      <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-gray-700/50">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">사용 팁</h3>
        <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-[#2563eb] dark:text-blue-400 mt-0.5">&#8226;</span>
            한글, 이모지 등 UTF-8 문자를 포함한 텍스트를 인코딩/디코딩할 수 있습니다.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#2563eb] dark:text-blue-400 mt-0.5">&#8226;</span>
            파일을 드래그 앤 드롭하거나 업로드 버튼으로 파일을 Base64로 변환할 수 있습니다. (최대 5MB)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#2563eb] dark:text-blue-400 mt-0.5">&#8226;</span>
            &quot;입출력 교환&quot; 버튼으로 결과를 다시 입력으로 넣어 역변환할 수 있습니다.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#2563eb] dark:text-blue-400 mt-0.5">&#8226;</span>
            모든 처리는 브라우저에서 이루어지며, 서버로 데이터가 전송되지 않습니다.
          </li>
        </ul>
      </div>

      {/* Inline toast animation style */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
