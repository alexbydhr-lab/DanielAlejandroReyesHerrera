'use client';

import { FormEvent, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { contactInfo, profile } from '@/content/profile';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'error'>('idle');

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Contacto desde la web - ${name || 'Nuevo mensaje'}`);
    const body = encodeURIComponent(`Hola Daniel,\n\n${message}\n\nNombre: ${name}\nCorreo: ${email}`);
    return `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
  }, [name, email, message]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !message) {
      setStatus('error');
      return;
    }
    setStatus('idle');
    window.location.href = mailtoHref;
  };

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <div>
        <label className="block text-sm font-semibold text-[--foreground]" htmlFor="name">
          Nombre
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-[--foreground] focus:outline-none focus:ring-2 focus:ring-[--accent]"
          placeholder="Tu nombre"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-[--foreground]" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-[--foreground] focus:outline-none focus:ring-2 focus:ring-[--accent]"
          placeholder="tu@email.com"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-[--foreground]" htmlFor="message">
          Mensaje
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-[--foreground] focus:outline-none focus:ring-2 focus:ring-[--accent]"
          placeholder="Cuéntame brevemente qué necesitas…"
        />
      </div>
      {status === 'error' && <p className="text-xs text-red-600">Incluye tu email y mensaje para continuar.</p>}
      <div className="flex items-center gap-3">
        <Button type="submit" className="bg-[#0b2f70] text-white hover:bg-[#0a5dff]">
          Abrir email
        </Button>
        <a className="text-sm text-[--accent]" href={mailtoHref}>
          Copiar enlace mailto
        </a>
      </div>
      <p className="text-xs text-[--muted]">
        El formulario abre tu cliente de correo con el mensaje prellenado. También puedes escribir a {profile.email}.
      </p>
    </form>
  );
}
