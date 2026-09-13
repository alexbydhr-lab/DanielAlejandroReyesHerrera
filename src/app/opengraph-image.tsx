import { ImageResponse } from 'next/og';

export const alt = 'Daniel Reyes · Contabilidad, operación y análisis financiero';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          color: '#f3f8ff',
          background: '#020712',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background:
              'radial-gradient(circle at 78% 18%, rgba(22,136,255,.36), transparent 32%), radial-gradient(circle at 84% 78%, rgba(69,200,255,.18), transparent 28%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '34px',
            display: 'flex',
            border: '1px solid rgba(84,181,255,.26)',
            borderRadius: '30px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '84px',
            top: '84px',
            width: '330px',
            height: '330px',
            display: 'flex',
            border: '1px solid rgba(69,200,255,.35)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '126px',
            top: '126px',
            width: '246px',
            height: '246px',
            display: 'flex',
            border: '1px solid rgba(69,200,255,.18)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '232px',
            top: '232px',
            width: '34px',
            height: '34px',
            display: 'flex',
            borderRadius: '50%',
            background: '#45c8ff',
            boxShadow: '0 0 36px rgba(69,200,255,.9)',
          }}
        />

        <div
          style={{
            position: 'relative',
            width: '100%',
            padding: '82px 88px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#76d9ff', fontSize: '20px', letterSpacing: '6px' }}>
            <span style={{ width: '11px', height: '11px', display: 'flex', borderRadius: '50%', background: '#45c8ff', boxShadow: '0 0 16px #1688ff' }} />
            PERFIL PROFESIONAL · DURANGO
          </div>

          <div style={{ maxWidth: '760px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: '72px', fontWeight: 800, lineHeight: 1, letterSpacing: '-4px' }}>
              Daniel Reyes
            </div>
            <div style={{ marginTop: '20px', display: 'flex', color: '#63d5ff', fontSize: '34px', fontWeight: 650 }}>
              Contabilidad, operación y análisis.
            </div>
            <div style={{ marginTop: '22px', maxWidth: '650px', display: 'flex', color: '#9bb5c8', fontSize: '22px', lineHeight: 1.45 }}>
              Orden para los datos. Claridad para decidir.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', color: '#6f8ea5', fontSize: '17px', letterSpacing: '2px' }}>
            DANIELREYES.VERCEL.APP
            <span style={{ width: '120px', height: '2px', display: 'flex', background: 'linear-gradient(90deg,#45c8ff,transparent)' }} />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
