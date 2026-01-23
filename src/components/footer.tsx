import Link from 'next/link';
import { contactInfo, profile } from '@/content/profile';
import { TextParticle } from '@/components/ui/text-particle';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 border-t border-black/5 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[--foreground]">{profile.name}</p>
          <p className="text-xs text-[--muted]">© {year} {profile.name}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-[--muted]">
          <Link href="/sobre-mi" className="hover:text-[--accent]">
            Sobre mí
          </Link>
          <Link href="/contacto" className="hover:text-[--accent]">
            Contacto
          </Link>
          <a href={`mailto:${contactInfo.email}`} className="hover:text-[--accent]">
            {contactInfo.email}
          </a>
          <a href={`tel:${contactInfo.phone}`} className="hover:text-[--accent]">
            {contactInfo.phone}
          </a>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
        <div className="h-32 sm:h-36">
          <TextParticle
            text="Daniel Reyes"
            fontSize={110}
            particleColor="#0b2f70"
            particleSize={2}
            particleDensity={5}
          />
        </div>
      </div>
    </footer>
  );
};
