'use client';

import { useState, useMemo, useCallback } from 'react';
import { Copy, Trash2, Check, AlertCircle, ChevronDown, ChevronUp, Replace } from 'lucide-react';

interface MatchResult {
  fullMatch: string;
  index: number;
  groups: string[];
  namedGroups: Record<string, string>;
}

const COMMON_PATTERNS = [
  {
    label: '이메일',
    pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
    flags: 'g',
    testString: 'user@example.com, admin@test.co.kr',
  },
  {
    label: 'URL',
    pattern: 'https?://[\\w\\-._~:/?#\\[\\]@!$&\'()*+,;=%]+',
    flags: 'g',
    testString: 'Visit https://example.com or http://test.co.kr/path?q=1',
  },
  {
    label: '전화번호',
    pattern: '(01[016789])-?(\\d{3,4})-?(\\d{4})',
    flags: 'g',
    testString: '010-1234-5678, 011-123-4567, 01012345678',
  },
  {
    label: '한글만',
    pattern: '[가-힣]+',
    flags: 'g',
    testString: '안녕하세요 Hello 반갑습니다 World',
  },
  {
    label: '숫자만',
    pattern: '\\d+',
    flags: 'g',
    testString: 'abc 123 def 456 ghi 789',
  },
  {
    label: 'IP 주소',
    pattern: '(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})',
    flags: 'g',
    testString: '192.168.0.1, 10.0.0.255, 172.16.0.1',
  },
];

const MATCH_COLORS = [
  { bg: 'bg-yellow-200 dark:bg-yellow-500/40', text: 'text-yellow-800 dark:text-yellow-200' },
  { bg: 'bg-green-200 dark:bg-green-500/40', text: 'text-green-800 dark:text-green-200' },
  { bg: 'bg-blue-200 dark:bg-blue-500/40', text: 'text-blue-800 dark:text-blue-200' },
  { bg: 'bg-pink-200 dark:bg-pink-500/40', text: 'text-pink-800 dark:text-pink-200' },
  { bg: 'bg-purple-200 dark:bg-purple-500/40', text: 'text-purple-800 dark:text-purple-200' },
  { bg: 'bg-orange-200 dark:bg-orange-500/40', text: 'text-orange-800 dark:text-orange-200' },
];

const MATCH_COLORS_INLINE = [
  '#fde68a',
  '#bbf7d0',
  '#bfdbfe',
  '#fbcfe8',
  '#ddd6fe',
  '#fed7aa',
];

const MATCH_COLORS_INLINE_DARK = [
  'rgba(234,179,8,0.4)',
  'rgba(34,197,94,0.4)',
  'rgba(59,130,246,0.4)',
  'rgba(236,72,153,0.4)',
  'rgba(139,92,246,0.4)',
  'rgba(249,115,22,0.4)',
];

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [replacement, setReplacement] = useState('');
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const [copied, setCopied] = useState(false);
  const [showReplace, setShowReplace] = useState(false);
  const [expandedMatch, setExpandedMatch] = useState<number | null>(null);

  const flagString = useMemo(() => {
    return Object.entries(flags)
      .filter(([, v]) => v)
      .map(([k]) => k)
      .join('');
  }, [flags]);

  const toggleFlag = useCallback((flag: keyof typeof flags) => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  }, []);

  const { regex, error } = useMemo(() => {
    if (!pattern) return { regex: null, error: null };
    try {
      const r = new RegExp(pattern, flagString);
      return { regex: r, error: null };
    } catch (e) {
      return { regex: null, error: (e as Error).message };
    }
  }, [pattern, flagString]);

  const matches: MatchResult[] = useMemo(() => {
    if (!regex || !testString) return [];
    const results: MatchResult[] = [];
    if (flags.g) {
      let match: RegExpExecArray | null;
      const r = new RegExp(regex.source, regex.flags);
      while ((match = r.exec(testString)) !== null) {
        results.push({
          fullMatch: match[0],
          index: match.index,
          groups: match.slice(1),
          namedGroups: match.groups ? { ...match.groups } : {},
        });
        if (match[0].length === 0) {
          r.lastIndex++;
        }
      }
    } else {
      const match = regex.exec(testString);
      if (match) {
        results.push({
          fullMatch: match[0],
          index: match.index,
          groups: match.slice(1),
          namedGroups: match.groups ? { ...match.groups } : {},
        });
      }
    }
    return results;
  }, [regex, testString, flags.g]);

  const highlightedHtml = useMemo(() => {
    if (!regex || !testString || matches.length === 0) return escapeHtml(testString);

    const sorted = [...matches].sort((a, b) => a.index - b.index);
    let result = '';
    let lastIndex = 0;

    sorted.forEach((m, i) => {
      const colorIdx = i % MATCH_COLORS_INLINE.length;
      const lightColor = MATCH_COLORS_INLINE[colorIdx];
      const darkColor = MATCH_COLORS_INLINE_DARK[colorIdx];
      if (m.index > lastIndex) {
        result += escapeHtml(testString.slice(lastIndex, m.index));
      }
      result += `<mark class="regex-match" style="--match-light:${lightColor};--match-dark:${darkColor};border-radius:3px;padding:1px 2px;" data-match-index="${i}">${escapeHtml(m.fullMatch)}</mark>`;
      lastIndex = m.index + m.fullMatch.length;
    });

    if (lastIndex < testString.length) {
      result += escapeHtml(testString.slice(lastIndex));
    }

    return result;
  }, [regex, testString, matches]);

  const replaceResult = useMemo(() => {
    if (!regex || !testString || !replacement) return '';
    try {
      return testString.replace(regex, replacement);
    } catch {
      return '';
    }
  }, [regex, testString, replacement]);

  const handleCopy = useCallback(() => {
    if (!pattern) return;
    const fullRegex = `/${pattern}/${flagString}`;
    navigator.clipboard.writeText(fullRegex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [pattern, flagString]);

  const handleClear = useCallback(() => {
    setPattern('');
    setTestString('');
    setReplacement('');
    setExpandedMatch(null);
  }, []);

  const handlePreset = useCallback(
    (preset: (typeof COMMON_PATTERNS)[0]) => {
      setPattern(preset.pattern);
      setTestString(preset.testString);
      const newFlags = { g: false, i: false, m: false, s: false };
      for (const f of preset.flags) {
        if (f in newFlags) {
          newFlags[f as keyof typeof newFlags] = true;
        }
      }
      setFlags(newFlags);
      setExpandedMatch(null);
    },
    []
  );

  return (
    <div className="space-y-6">
      {/* Pattern Input */}
      <div className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-5">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          정규표현식 패턴
        </label>
        <div className="flex items-center gap-2">
          <span className="text-lg text-gray-400 font-mono select-none">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="패턴을 입력하세요..."
            className="flex-1 px-3 py-2.5 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-gray-700/50 rounded-lg font-mono text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 focus:border-[#2563eb] transition-colors"
            spellCheck={false}
            autoComplete="off"
          />
          <span className="text-lg text-gray-400 font-mono select-none">/</span>
          <span className="text-sm font-mono text-[#2563eb] dark:text-blue-400 min-w-[2rem]">
            {flagString}
          </span>
        </div>

        {/* Flags */}
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">플래그:</span>
          {(
            [
              { key: 'g', label: 'g', desc: 'Global' },
              { key: 'i', label: 'i', desc: 'Case-insensitive' },
              { key: 'm', label: 'm', desc: 'Multiline' },
              { key: 's', label: 's', desc: 'DotAll' },
            ] as const
          ).map((f) => (
            <button
              key={f.key}
              onClick={() => toggleFlag(f.key)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-colors border ${
                flags[f.key]
                  ? 'bg-[#2563eb]/10 dark:bg-blue-500/20 border-[#2563eb]/30 dark:border-blue-500/30 text-[#2563eb] dark:text-blue-400'
                  : 'bg-gray-50 dark:bg-slate-900/30 border-gray-200 dark:border-gray-700/50 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
              title={f.desc}
            >
              <span className="font-bold">{f.label}</span>
              <span className="text-[10px] font-sans opacity-70">{f.desc}</span>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <button
            onClick={handleCopy}
            disabled={!pattern}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors bg-gray-100 dark:bg-slate-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700/50"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? '복사됨' : '정규식 복사'}
          </button>
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors bg-gray-100 dark:bg-slate-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 border border-gray-200 dark:border-gray-700/50"
          >
            <Trash2 size={13} />
            초기화
          </button>
          <button
            onClick={() => setShowReplace((v) => !v)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
              showReplace
                ? 'bg-[#2563eb]/10 dark:bg-blue-500/20 border-[#2563eb]/30 dark:border-blue-500/30 text-[#2563eb] dark:text-blue-400'
                : 'bg-gray-100 dark:bg-slate-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 border-gray-200 dark:border-gray-700/50'
            }`}
          >
            <Replace size={13} />
            치환 모드
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-3 flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg">
            <AlertCircle size={16} className="text-red-500 dark:text-red-400 mt-0.5 shrink-0" />
            <p className="text-sm text-red-600 dark:text-red-400 font-mono break-all">{error}</p>
          </div>
        )}
      </div>

      {/* Quick Patterns */}
      <div className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-5">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          자주 쓰는 정규식 패턴
        </label>
        <div className="flex flex-wrap gap-2">
          {COMMON_PATTERNS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => handlePreset(preset)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-slate-700/50 text-gray-700 dark:text-gray-300 hover:bg-[#2563eb]/10 hover:text-[#2563eb] dark:hover:bg-blue-500/20 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-700/50 hover:border-[#2563eb]/30 dark:hover:border-blue-500/30 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Test String */}
      <div className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-5">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          테스트 문자열
        </label>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="테스트할 문자열을 입력하세요..."
          className="w-full h-40 px-4 py-3 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-gray-700/50 rounded-lg font-mono text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 focus:border-[#2563eb] transition-colors resize-y"
          spellCheck={false}
        />
      </div>

      {/* Replace Mode */}
      {showReplace && (
        <div className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-5">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            치환 문자열
          </label>
          <input
            type="text"
            value={replacement}
            onChange={(e) => setReplacement(e.target.value)}
            placeholder="치환할 문자열을 입력하세요... ($1, $2 등 캡처 그룹 참조 가능)"
            className="w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-gray-700/50 rounded-lg font-mono text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 focus:border-[#2563eb] transition-colors"
            spellCheck={false}
          />
          {replaceResult && (
            <div className="mt-3">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                치환 결과:
              </span>
              <div className="px-4 py-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-lg font-mono text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-all">
                {replaceResult}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Match Highlights */}
      {testString && pattern && !error && (
        <div className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              매칭 결과 하이라이트
            </label>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                matches.length > 0
                  ? 'bg-[#2563eb]/10 dark:bg-blue-500/20 text-[#2563eb] dark:text-blue-400'
                  : 'bg-gray-100 dark:bg-slate-700/50 text-gray-500 dark:text-gray-400'
              }`}
            >
              {matches.length}개 매칭
            </span>
          </div>
          <div
            className="px-4 py-3 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-gray-700/50 rounded-lg font-mono text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-all leading-relaxed regex-highlight-area"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </div>
      )}

      {/* Match Details */}
      {matches.length > 0 && (
        <div className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-5">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            매칭 상세 정보
          </label>
          <div className="space-y-2">
            {matches.map((m, i) => {
              const colorIdx = i % MATCH_COLORS.length;
              const color = MATCH_COLORS[colorIdx];
              const isExpanded = expandedMatch === i;
              const hasGroups = m.groups.length > 0 || Object.keys(m.namedGroups).length > 0;

              return (
                <div
                  key={i}
                  className="border border-gray-200 dark:border-gray-700/50 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedMatch(isExpanded ? null : i)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-slate-800/80 transition-colors"
                  >
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${color.bg} ${color.text}`}
                    >
                      #{i + 1}
                    </span>
                    <span className="font-mono text-sm text-gray-900 dark:text-gray-100 truncate flex-1">
                      &quot;{m.fullMatch}&quot;
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">
                      인덱스: {m.index}
                    </span>
                    {hasGroups && (
                      <span className="text-gray-400 dark:text-gray-500 shrink-0">
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </span>
                    )}
                  </button>
                  {isExpanded && hasGroups && (
                    <div className="px-4 py-3 bg-gray-50/50 dark:bg-slate-900/30 border-t border-gray-200 dark:border-gray-700/50">
                      {m.groups.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            캡처 그룹:
                          </span>
                          {m.groups.map((g, gi) => (
                            <div
                              key={gi}
                              className="flex items-center gap-2 pl-3 font-mono text-xs"
                            >
                              <span className="text-gray-400 dark:text-gray-500">${gi + 1}:</span>
                              <span className="text-gray-900 dark:text-gray-100">
                                &quot;{g ?? '(undefined)'}&quot;
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      {Object.keys(m.namedGroups).length > 0 && (
                        <div className="space-y-1 mt-2">
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            명명된 그룹:
                          </span>
                          {Object.entries(m.namedGroups).map(([name, val]) => (
                            <div
                              key={name}
                              className="flex items-center gap-2 pl-3 font-mono text-xs"
                            >
                              <span className="text-gray-400 dark:text-gray-500">{name}:</span>
                              <span className="text-gray-900 dark:text-gray-100">
                                &quot;{val}&quot;
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* No Match Message */}
      {pattern && testString && !error && regex && matches.length === 0 && (
        <div className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            매칭되는 결과가 없습니다. 패턴이나 테스트 문자열을 확인해 주세요.
          </p>
        </div>
      )}

      {/* Style for match highlights */}
      <style>{`
        .regex-highlight-area mark.regex-match {
          background-color: var(--match-light);
          color: inherit;
        }
        .dark .regex-highlight-area mark.regex-match {
          background-color: var(--match-dark);
          color: inherit;
        }
      `}</style>
    </div>
  );
}
