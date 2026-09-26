import { ImageResponse } from 'next/og';

export const alt = 'Daniel Reyes · Orden para los datos. Claridad para decidir.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const colors = {
  white: '#FFFFFF',
  surface: '#F5F7FA',
  heading: '#163A63',
  accent: '#2F6DA3',
  muted: '#667085',
  line: '#DDE3EA',
  soft: '#EAF2F8',
};

const summary = [
  'Auxiliar contable',
  '9.º semestre',
  'Durango, Dgo.',
  'Excel · Power Query · Python',
];

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        background: colors.surface,
        color: colors.heading,
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 26,
          left: 26,
          width: 1148,
          height: 578,
          display: 'flex',
          flexDirection: 'column',
          border: `1px solid ${colors.line}`,
          background: colors.white,
        }}
      >
        <div
          style={{
            height: 92,
            padding: '0 54px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${colors.line}`,
          }}
        >
          <div style={{ display: 'flex', gap: 10, fontSize: 20, fontWeight: 700, letterSpacing: 4 }}>
            <span>DANIEL</span><span style={{ color: colors.accent }}>REYES</span>
          </div>
          <div style={{ display: 'flex', color: colors.muted, fontSize: 14, fontWeight: 700, letterSpacing: 3 }}>
            PORTAFOLIO PROFESIONAL
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', padding: '54px 54px 44px', gap: 42 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div
              style={{
                display: 'flex',
                padding: '9px 12px',
                color: colors.accent,
                background: colors.soft,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              PERFIL PROFESIONAL · DURANGO
            </div>

            <div style={{ display: 'flex', marginTop: 32, fontSize: 75, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>
              Daniel Reyes
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20, fontSize: 34, fontWeight: 700, letterSpacing: -1, lineHeight: 1.17 }}>
              <span>Orden para los datos.</span>
              <span>Claridad para decidir.</span>
            </div>
            <div style={{ display: 'flex', marginTop: 24, color: colors.muted, fontSize: 21, lineHeight: 1.35 }}>
              Contabilidad, análisis financiero y automatización.
            </div>
          </div>

          <div
            style={{
              width: 310,
              alignSelf: 'center',
              display: 'flex',
              flexDirection: 'column',
              padding: '24px 24px 20px',
              border: `1px solid ${colors.line}`,
              borderTop: `4px solid ${colors.accent}`,
              background: colors.white,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.accent, fontSize: 12, fontWeight: 700, letterSpacing: 2 }}>
              <span>FICHA PROFESIONAL</span><span>01 / 04</span>
            </div>
            <div style={{ display: 'flex', marginTop: 22, marginBottom: 12, fontSize: 28, fontWeight: 700, letterSpacing: -1 }}>
              Actualmente
            </div>
            {summary.map((item, index) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  minHeight: 41,
                  borderTop: `1px solid ${colors.line}`,
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                <span style={{ width: 25, color: colors.accent, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            height: 67,
            padding: '0 54px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `1px solid ${colors.line}`,
            color: colors.muted,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          <span>DANIELREYES.VERCEL.APP</span>
          <span>CONTABILIDAD · DATOS · PROCESOS</span>
        </div>
      </div>
    </div>,
    size,
  );
}
