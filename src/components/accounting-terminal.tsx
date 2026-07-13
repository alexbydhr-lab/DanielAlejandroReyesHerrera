'use client';

import { useEffect, useRef, useState } from 'react';

const commands = [
  '> conciliando movimientos...',
  '> validando CFDI...',
  '> generando reporte financiero...',
  '✓ información organizada',
];

const wait = (milliseconds: number) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export const AccountingTerminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lines, setLines] = useState<string[]>(commands.map(() => ''));
  const [activeLine, setActiveLine] = useState(-1);
  const [complete, setComplete] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: .35 });
    observer.observe(terminal);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    const kickoff = window.setTimeout(async () => {
      setLines(commands.map(() => ''));
      setComplete(false);
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      for (let lineIndex = 0; lineIndex < commands.length; lineIndex += 1) {
        if (cancelled) return;
        setActiveLine(lineIndex);
        const command = commands[lineIndex];
        if (reduceMotion) {
          setLines((current) => current.map((line, index) => index === lineIndex ? command : line));
        } else {
          for (let character = 1; character <= command.length; character += 1) {
            if (cancelled) return;
            setLines((current) => current.map((line, index) => index === lineIndex ? command.slice(0, character) : line));
            await wait(lineIndex === commands.length - 1 ? 24 : 30);
          }
          await wait(lineIndex === commands.length - 1 ? 220 : 430);
        }
      }
      if (!cancelled) {
        setActiveLine(-1);
        setComplete(true);
      }
    }, 180);
    return () => {
      cancelled = true;
      window.clearTimeout(kickoff);
    };
  }, [visible, run]);

  return (
    <div ref={terminalRef} className="accounting-terminal" aria-label="Terminal de procesos contables">
      <div className="terminal-bar">
        <div aria-hidden="true"><i /><i /><i /></div>
        <span>FIN_CORE / PROCESOS</span>
        <b className={complete ? 'is-complete' : ''}><i />{complete ? 'COMPLETO' : 'EN VIVO'}</b>
      </div>
      <div className="terminal-body" aria-live="polite">
        <div className="terminal-meta"><span>sesión: daniel_reyes</span><span>modo: análisis</span></div>
        <div className="terminal-lines">
          {commands.map((command, index) => {
            const isActive = activeLine === index;
            const isDone = Boolean(lines[index]) && (activeLine > index || complete || index < activeLine);
            return (
              <div key={command} className={`${index === commands.length - 1 ? 'terminal-success' : ''} ${isActive ? 'is-active' : ''}`}>
                <code>{lines[index]}{isActive && <i className="terminal-cursor" aria-hidden="true" />}</code>
                <span>{isDone ? 'OK' : isActive ? 'RUN' : '—'}</span>
              </div>
            );
          })}
        </div>
        <div className="terminal-footer">
          <div><span style={{ width: complete ? '100%' : `${Math.max(8, ((activeLine + 1) / commands.length) * 100)}%` }} /></div>
          <button type="button" onClick={() => setRun((value) => value + 1)} aria-label="Repetir secuencia de terminal">
            ↻ repetir
          </button>
        </div>
      </div>
    </div>
  );
};
