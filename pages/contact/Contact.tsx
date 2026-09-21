'use client';

import { useState, useEffect } from 'react';
import { 
  VscSend, 
  VscCheck, 
  VscError, 
  VscSymbolMethod, 
  VscJson, 
  VscRunAll, 
  VscTerminal, 
  VscKey, 
  VscGlobe, 
  VscMail, 
  VscGithub, 
  VscMention 
} from 'react-icons/vsc';

export default function Contact() {
  // Form State
  const [inquiryType, setInquiryType] = useState('project');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Terminal State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<Array<{ cmd?: string; output: string }>>([
    { output: 'Type "help" to see available terminal commands.' },
  ]);

  // Clock State
  const [timeString, setTimeString] = useState('');
  const [showPgp, setShowPgp] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // ozyt earf bdjj ysuj 
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, inquiryType}),
      });

      console.log(response);

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        console.log(response);

      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  // Terminal Command Handler
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = terminalInput.trim().toLowerCase();
    let response = '';

    if (trimmed === 'help') {
      response = 'Available commands:\n  dev socials.json   - View direct social handles\n  dev location.txt  - View time zone & status\n  clear             - Clear terminal logs';
    } else if (trimmed === 'dev socials.json') {
      response = '{\n  "email": "stoicdavid16@gmail.com",\n  "github": "https://github.com/Amon-mamon",\n  "linkedin": "https://www.linkedin.com/in/vince-stephen-david-ab72292a0/",\n}';
    } else if (trimmed === 'dev location.txt') {
      response = 'Location: Central Luzon, Philippines (UTC+8)\nStatus: Active — Accepting new projects.\nAvg SLA: < 24 hrs response time.';
    } else if (trimmed === 'clear') {
      setTerminalLogs([]);
      setTerminalInput('');
      return;
    } else if (trimmed === '') {
      return;
    } else {
      response = `Command not found: "${trimmed}". Type "help" for a list of available commands.`;
    }

    setTerminalLogs((prev) => [...prev, { cmd: terminalInput, output: response }]);
    setTerminalInput('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 text-[#d4d4d4] font-mono text-xs sm:text-sm select-none space-y-6">
      
      {/* ── 1. Availability & Time Zone Banner ────────────── */}
      <div className="bg-[#181818] border border-[#2b2b2b] rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <div>
            <span className="text-[#89d185] font-semibold">// Status: Accepting Opportunities</span>
            <p className="text-[#808080] text-[11px]">Average SLA Response: &lt; 24 hrs</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[#9cdcfe] bg-[#1e1e1e] px-3 py-1.5 rounded border border-[#3c3c3c]">
          <VscGlobe className="text-[#569cd6]" />
          <span>Asia/Manila (UTC+8):</span>
          <span className="text-white font-mono">{timeString || '12:00:00 PM'}</span>
        </div>
      </div>

      {/* ── 2. Main REST API Client Runner ────────────────── */}
      <div className="bg-[#1e1e1e] border border-[#2b2b2b] rounded-lg overflow-hidden shadow-2xl">
        
        {/* Editor Title Bar */}
        <div className="flex items-center justify-between bg-[#252526] px-4 py-2 border-b border-[#2b2b2b]">
          <div className="flex items-center gap-2">
            <VscSymbolMethod className="text-[#4ec9b0]" />
            <span className="text-[#cccccc] font-semibold text-xs">send-message.http</span>
          </div>
          <span className="text-[#808080] text-[11px] hidden sm:inline">POST /api/v1/contact</span>
        </div>

        {/* Request Endpoint Bar */}
        <div className="p-4 bg-[#181818] border-b border-[#2b2b2b] space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex items-center bg-[#252526] border border-[#3c3c3c] rounded px-3 py-1.5 shrink-0">
              <span className="text-[#569cd6] font-bold text-xs">POST</span>
            </div>
            <div className="flex-1 bg-[#1e1e1e] border border-[#3c3c3c] rounded px-3 py-1.5 text-[#ce9178] text-xs truncate">
              https://vince.dev/api/v1/contact
            </div>
            <button
              onClick={handleSubmit}
              disabled={status === 'loading'}
              className="flex items-center justify-center gap-2 bg-[#0e639c] hover:bg-[#1177bb] text-white px-5 py-2 rounded font-semibold transition-colors disabled:bg-[#3c3c3c] shrink-0"
            >
              <VscRunAll className={`text-base ${status === 'loading' ? 'animate-spin' : ''}`} />
              <span>{status === 'loading' ? 'Sending...' : 'Send Request'}</span>
            </button>
          </div>

          {/* Inquiry Type Selectors */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[#808080] text-xs font-semibold mr-1">Inquiry Type:</span>
            {[
              { id: 'project', label: 'Project Inquiry' },
              { id: 'freelance', label: 'Freelance / Contract' },
              { id: 'fulltime', label: 'Full-Time Role' },
            ].map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setInquiryType(type.id)}
                className={`px-2.5 py-1 rounded text-xs transition-colors border ${
                  inquiryType === type.id
                    ? 'bg-[#007acc] text-white border-[#007acc]'
                    : 'bg-[#2d2d2d] text-[#808080] border-[#3c3c3c] hover:text-white'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* JSON Request Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div className="bg-[#252526] px-3 py-1 text-[#808080] text-[11px] flex items-center justify-between rounded-t">
            <span className="flex items-center gap-1.5"><VscJson className="text-[#e5c07b]" /> Payload (JSON)</span>
            <span>UTF-8</span>
          </div>

          <div className="space-y-3 bg-[#181818] p-4 border border-[#2b2b2b] rounded-b">
            
            {/* Field 1 */}
            <div className="flex items-center gap-3">
              <span className="text-[#555555] text-xs w-6 text-right">01</span>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                <label htmlFor="name" className="text-[#9cdcfe] sm:w-28 shrink-0">&quot;sender_name&quot;:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="flex-1 bg-[#1e1e1e] border border-[#3c3c3c] focus:border-[#007acc] rounded px-3 py-1.5 text-[#ce9178] outline-none"
                  placeholder='"Your Name"'
                />
              </div>
            </div>

            {/* Field 2 */}
            <div className="flex items-center gap-3">
              <span className="text-[#555555] text-xs w-6 text-right">02</span>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                <label htmlFor="email" className="text-[#9cdcfe] sm:w-28 shrink-0">&quot;sender_email&quot;:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="flex-1 bg-[#1e1e1e] border border-[#3c3c3c] focus:border-[#007acc] rounded px-3 py-1.5 text-[#ce9178] outline-none"
                  placeholder='"you@example.com"'
                />
              </div>
            </div>

            {/* Field 3 */}
            <div className="flex items-start gap-3">
              <span className="text-[#555555] text-xs w-6 text-right pt-2">03</span>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-start gap-2">
                <label htmlFor="message" className="text-[#9cdcfe] sm:w-28 shrink-0 pt-1.5">&quot;message_body&quot;:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="flex-1 bg-[#1e1e1e] border border-[#3c3c3c] focus:border-[#007acc] rounded px-3 py-1.5 text-[#ce9178] outline-none resize-y"
                  placeholder='"Write your message here..."'
                />
              </div>
            </div>

          </div>

          {/* Response Console Status Bar */}
          <div className="bg-[#1e1e1e] border border-[#2b2b2b] p-3 rounded flex items-center justify-between min-h-[42px]">
            <div className="text-[11px] text-[#808080]">
              STATUS: {status === 'idle' && <span>Awaiting execution</span>}
              {status === 'loading' && <span className="text-[#e5c07b]">Transmitting payload...</span>}
              {status === 'success' && <span className="text-[#89d185] font-semibold">200 OK (24ms)</span>}
              {status === 'error' && <span className="text-[#f14c4c] font-semibold">500 Internal Error</span>}
            </div>

            {status === 'success' && (
              <p className="text-[#89d185] text-xs flex items-center gap-1.5">
                <VscCheck /> Message delivered successfully!
              </p>
            )}
            {status === 'error' && (
              <p className="text-[#f14c4c] text-xs flex items-center gap-1.5">
                <VscError /> Failed to send message.
              </p>
            )}
          </div>
        </form>
      </div>

      {/* ── 3. Alternative Direct Endpoints ───────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <a
          href="/contact"
          className="bg-[#181818] border border-[#2b2b2b] hover:border-[#007acc] p-3 rounded flex items-center gap-3 transition-colors group"
        >
          <VscMail className="text-lg text-[#569cd6] group-hover:scale-110 transition-transform" />
          <div className="truncate">
            <p className="text-[11px] text-[#808080]">Email Direct</p>
            <p className="text-xs text-white truncate font-semibold">vince@example.com</p>
          </div>
        </a>

        <a
          href="https://github.com/Amon-mamon"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#181818] border border-[#2b2b2b] hover:border-[#007acc] p-3 rounded flex items-center gap-3 transition-colors group"
        >
          <VscGithub className="text-lg text-[#4ec9b0] group-hover:scale-110 transition-transform" />
          <div className="truncate">
            <p className="text-[11px] text-[#808080]">GitHub Profile</p>
            <p className="text-xs text-white truncate font-semibold">@Amon-mamon</p>
          </div>
        </a>

        <a
          href="https://www.linkedin.com/in/vince-stephen-david-ab72292a0/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#181818] border border-[#2b2b2b] hover:border-[#007acc] p-3 rounded flex items-center gap-3 transition-colors group"
        >
          <VscMention className="text-lg text-[#ce9178] group-hover:scale-110 transition-transform" />
          <div className="truncate">
            <p className="text-[11px] text-[#808080]">LinkedIn Direct</p>
            <p className="text-xs text-white truncate font-semibold">vince-stephen-david</p>
          </div>
        </a>

        <button
          onClick={() => setShowPgp(!showPgp)}
          className="bg-[#181818] border border-[#2b2b2b] hover:border-[#007acc] p-3 rounded flex items-center gap-3 transition-colors text-left group"
        >
          <VscKey className="text-lg text-[#e5c07b] group-hover:scale-110 transition-transform" />
          <div className="truncate">
            <p className="text-[11px] text-[#808080]">Security</p>
            <p className="text-xs text-white truncate font-semibold">{showPgp ? 'Hide PGP Key' : 'View PGP Key'}</p>
          </div>
        </button>
      </div>

      {/* PGP Public Key Drawer */}
      {showPgp && (
        <div className="bg-[#181818] border border-[#2b2b2b] rounded-lg p-4 font-mono text-[11px] text-[#808080] space-y-2">
          <p className="text-[#e5c07b] font-bold">// Public Key Fingerprint: 4A8F 9B2C 1D3E 5F7A</p>
          <pre className="bg-[#1e1e1e] p-3 rounded text-[#808080] overflow-x-auto select-all">
{`-----BEGIN PGP PUBLIC KEY BLOCK-----
mQENBF2... Vince Stephen David <vince@example.com> ...
-----END PGP PUBLIC KEY BLOCK-----`}
          </pre>
        </div>
      )}

      {/* ── 4. Interactive Terminal Command Prompt ────────── */}
      <div className="bg-[#181818] border border-[#2b2b2b] rounded-lg overflow-hidden">
        <div className="bg-[#252526] px-4 py-1.5 border-b border-[#2b2b2b] flex items-center gap-2 text-xs text-[#808080]">
          <VscTerminal className="text-[#4ec9b0]" />
          <span>Integrated Terminal</span>
        </div>

        <div className="p-4 font-mono text-xs space-y-2 max-h-48 overflow-y-auto">
          {terminalLogs.map((log, index) => (
            <div key={index} className="space-y-1">
              {log.cmd && (
                <div className="flex items-center gap-2 text-[#9cdcfe]">
                  <span className="text-[#4ec9b0]">vince@portfolio:~$</span>
                  <span>{log.cmd}</span>
                </div>
              )}
              <pre className="text-[#cccccc] whitespace-pre-wrap font-mono pl-4">{log.output}</pre>
            </div>
          ))}

          <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-1">
            <span className="text-[#4ec9b0]">vince@portfolio:~$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="type 'help', 'dev socials.json', 'dev location.txt', 'clear'"
              className="flex-1 bg-transparent text-white focus:outline-none font-mono"
            />
          </form>
        </div>
      </div>

    </div>
  );
}