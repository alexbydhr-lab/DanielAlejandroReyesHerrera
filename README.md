# Portafolio personal – Daniel Alejandro Reyes Herrera

Base de marca personal en Next.js 14 (App Router) + TypeScript + Tailwind. Inspirado en una landing editorial limpia, con secciones apiladas y CTA a contacto.

## Requisitos
- Node.js 18+ (recomendado LTS)
- npm

## Scripts
```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm start       # sirve el build
npm run lint
```

## Estructura principal
- `src/content/profile.ts`: **Único archivo de contenido**. Edita aquí nombre, textos, experiencia, habilidades, herramientas, idiomas, CTAs y enlaces. LinkedIn/GitHub están como `#` para que los reemplaces.
- `src/app/page.tsx`: Inicio / landing con hero, servicios, impacto, experiencia, habilidades, herramientas, idiomas y CTA final.
- `src/app/sobre-mi/page.tsx`: Narrativa, formación y valores.
- `src/app/contacto/page.tsx`: Datos de contacto y formulario (abre mailto).
- `src/app/cv/page.tsx`: Vista básica de CV y botón de descarga (usa `/public/cv.pdf` si lo agregas).
- `src/components/*`: Componentes UI (Container, Button, Card, Badge, TimelineItem, Navbar, Footer).
- `public/profile.jpg`: Placeholder de imagen (1x1). Reemplázalo por tu foto.
- `public/og-image.png`: Placeholder para OpenGraph. Reemplázalo si tienes uno propio.

## Cómo personalizar
1) Edita `src/content/profile.ts` para:
   - Datos personales, hero, chips y CTA.
   - Servicios (“Lo que hago”), experiencia, formación, habilidades, herramientas, idiomas, FAQ.
   - Enlaces (email, teléfono, redes).
2) Reemplaza `/public/profile.jpg` por tu foto real (mismo nombre o ajusta `heroImage` en `profile.ts`).
3) Si quieres ofrecer descarga de CV, coloca tu PDF en `/public/cv.pdf`.
4) Paleta y bordes usan CSS vars en `src/app/globals.css` (`--accent`, `--background`, etc.).

## Notas de privacidad
- No se publica dirección exacta (solo “Durango, Dgo.”).
- Textos en español neutro, tono profesional y directo.

## Accesibilidad
- Enlaces y botones con estados de foco visibles.
- Inputs con labels, `aria` en mailto a través de formulario.

## Despliegue en Vercel
1) `npm run build` para asegurar que compile.
2) Deploy con `vercel` apuntando a este repo (framework: Next.js, output: `.next`).

## Licencia de assets
- No se usan imágenes con copyright. `profile.jpg` y `og-image.png` son placeholders.
