import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { profile, heroImage } from '@/content/profile';
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern';

export const Hero = () => {
  const highlight = 'enfoque práctico';
  const [before, after] = profile.headline.includes(highlight)
    ? profile.headline.split(highlight)
    : [profile.headline, ''];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#061735] via-[#0b2f70] to-[#0a5dff] text-white">
      <div className="glow-blob glow-1 left-[-12%] top-[-30%] h-80 w-80 bg-white/20" aria-hidden />
      <div className="glow-blob glow-2 right-[-6%] bottom-[-25%] h-[28rem] w-[28rem] bg-[#0a5dff]/40" aria-hidden />
      <AnimatedGridPattern
        className="opacity-60 text-white/15"
        width={56}
        height={56}
        numSquares={28}
        maxOpacity={0.4}
        duration={4.5}
        repeatDelay={0.8}
      />

      <Container className="relative z-10 grid items-start gap-8 py-20 lg:min-h-[560px] lg:grid-cols-[3fr_1fr]">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-100">SOY DANIEL REYES</p>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">{profile.heroEyebrow}</p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl">
            {before}
            {profile.headline.includes(highlight) && (
              <span className="underline-on-load ml-2 inline-flex items-center rounded-md bg-[#0a5dff] px-2 py-1 text-white shadow-sm">
                {highlight}
              </span>
            )}
            {after}
          </h1>
          <p className="max-w-2xl text-lg text-blue-100">{profile.subheadline}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/contacto" className="px-6 py-3 bg-white !text-[#0b2f70] hover:bg-[#dbe7ff]">
              Contactar
            </Button>
            <Button href="#experiencia" variant="secondary" className="px-6 py-3 bg-white/10 text-white border-white/30">
              Ver experiencia
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end lg:self-start">
          <div className="hero-image-gradient" aria-hidden />
          <div className="absolute right-10 top-10 h-72 w-72 rounded-full bg-[#0a5dff]/30 blur-2xl" aria-hidden />
          <div className="group relative h-80 w-80 overflow-hidden rounded-full border-[10px] border-white/30 shadow-2xl transition hover:shadow-[0_25px_60px_-25px_rgba(10,93,255,0.6)] sm:h-[380px] sm:w-[380px]">
            <Image
              src={heroImage}
              alt="Foto de perfil"
              fill
              className="object-cover transition duration-500 ease-out group-hover:scale-[1.04] group-hover:rotate-1"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
