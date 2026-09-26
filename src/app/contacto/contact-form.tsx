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
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="contact-field">
        <label htmlFor="name">
          Nombre
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="contact-input"
          placeholder="¿Cómo te llamas?"
          autoComplete="name"
        />
      </div>
      <div className="contact-field">
        <label htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="contact-input"
          placeholder="tu@email.com"
          autoComplete="email"
        />
      </div>
      <div className="contact-field contact-message-field">
        <label htmlFor="message">
          Mensaje
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={6}
          className="contact-input"
          placeholder="Cuéntame brevemente qué necesitas, qué información tienes y cuál es el resultado que buscas…"
        />
      </div>
      {status === 'error' && <p className="contact-form-error" role="alert">Incluye tu email y mensaje para continuar.</p>}
      <div className="contact-form-actions">
        <Button type="submit" className="contact-submit">
          Preparar mensaje <span aria-hidden="true">↗</span>
        </Button>
        <a className="contact-direct-link" href={`mailto:${contactInfo.email}`}>
          Escribir directamente
        </a>
      </div>
      <p className="contact-form-note">
        <span aria-hidden="true">i</span> Se abrirá tu cliente de correo con el mensaje listo para revisar y enviar a {profile.email}.
      </p>
    </form>
  );
}
