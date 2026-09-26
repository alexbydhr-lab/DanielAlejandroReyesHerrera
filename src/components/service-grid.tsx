"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { professionalServices, type ProfessionalService } from "@/content/services";
import { ServiceVisual } from "@/components/service-visual";

function ExpandIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M7.5 3.5h-4v4M12.5 16.5h4v-4M3.8 7.2 8 3m4 14 4.2-4.2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m5 5 10 10M15 5 5 15" />
    </svg>
  );
}

type ServiceCardProps = {
  service: ProfessionalService;
  onOpen: (service: ProfessionalService, trigger: HTMLButtonElement) => void;
  selected: boolean;
};

function ServiceCard({ service, onOpen, selected }: ServiceCardProps) {
  return (
    <button
      className={`service-bento-card service-size-${service.size}`}
      type="button"
      onClick={(event) => onOpen(service, event.currentTarget)}
      aria-haspopup="dialog"
      aria-label={`Abrir detalles de ${service.title}`}
      data-selected={selected ? "true" : undefined}
    >
      <span className="service-card-copy">
        <span className="service-card-meta">
          <span>{service.number}</span>
          <span>Servicio</span>
        </span>
        <span className="service-card-title">{service.title}</span>
        <span className="service-card-description">{service.shortDescription}</span>
      </span>
      <span className="service-expand-icon"><ExpandIcon /></span>
      <ServiceVisual type={service.visual} />
      <span className="service-card-cue">Ver alcance <span>↗</span></span>
    </button>
  );
}

type ServiceDetailProps = {
  service: ProfessionalService;
  origin: { x: number; y: number; width: number; height: number };
  closing: boolean;
  onClose: () => void;
  reducedMotion: boolean;
};

function ServiceDetail({ service, origin, closing, onClose, reducedMotion }: ServiceDetailProps) {
  const dialogRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = `service-detail-title-${service.id}`;

  useLayoutEffect(() => {
    const panel = dialogRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay || reducedMotion) return;

    const bounds = panel.getBoundingClientRect();
    const collapsed = `translate(${origin.x - bounds.left}px, ${origin.y - bounds.top}px) scale(${origin.width / bounds.width}, ${origin.height / bounds.height})`;
    const frames = [
      { transform: collapsed, borderRadius: "8px" },
      { transform: "translate(0, 0) scale(1, 1)", borderRadius: "8px" },
    ];
    const panelAnimation = panel.animate(closing ? [...frames].reverse() : frames, {
      duration: closing ? 360 : 560,
      easing: closing ? "cubic-bezier(.4,0,.2,1)" : "cubic-bezier(.22,1,.36,1)",
      fill: "both",
    });
    const backdropAnimation = overlay.animate(
      [{ backgroundColor: "rgba(24,34,48,0)", backdropFilter: "blur(0px)" },
        { backgroundColor: "rgba(24,34,48,.38)", backdropFilter: "blur(3px)" }],
      { duration: closing ? 360 : 440, direction: closing ? "reverse" : "normal", fill: "both" },
    );
    const contents = panel.querySelectorAll<HTMLElement>(".service-detail-topline, .service-detail-copy > div, .service-detail-visual-wrap");
    const contentAnimations = Array.from(contents, (element, index) => element.animate(
      closing
        ? [{ opacity: 1 }, { opacity: 0 }]
        : [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: closing ? 140 : 300, delay: closing ? 0 : 130 + index * 25, easing: "ease-out", fill: "both" },
    ));
    return () => {
      panelAnimation.cancel();
      backdropAnimation.cancel();
      contentAnimations.forEach((animation) => animation.cancel());
    };
  }, [origin, closing, reducedMotion]);

  useEffect(() => {
    const focusTimer = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, reducedMotion]);

  return (
    <div
      ref={overlayRef}
      className="service-detail-overlay"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <article
        ref={dialogRef}
        className="service-detail-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="service-detail-topline">
          <span>{service.number} / SERVICIO</span>
          <button ref={closeRef} type="button" className="service-detail-close" onClick={onClose} aria-label="Cerrar detalle">
            <CloseIcon />
          </button>
        </div>

        <div className="service-detail-layout">
          <div className="service-detail-copy">
            <div>
              <p className="service-detail-kicker">Capacidad profesional</p>
              <h3 id={titleId}>{service.title}</h3>
              <p className="service-detail-description">{service.description}</p>
            </div>

            <div className="service-detail-section">
              <h4>Qué puedo hacer</h4>
              <ul>
                {service.capabilities.map((capability) => (
                  <li key={capability}><span>✓</span>{capability}</li>
                ))}
              </ul>
            </div>

            <div className="service-detail-example">
              <span>Ejemplo práctico</span>
              <p>{service.example}</p>
            </div>

            <div className="service-detail-tools" aria-label="Herramientas relacionadas">
              {service.tools.map((tool) => <span key={tool}>{tool}</span>)}
            </div>

            <div className="service-detail-result">
              <span>Resultado</span>
              <p>{service.result}</p>
            </div>
          </div>

          <div className="service-detail-visual-wrap">
            <div className="service-detail-visual-label"><span>Vista del proceso</span><b>EN CURSO</b></div>
            <ServiceVisual type={service.visual} expanded />
          </div>
        </div>
      </article>
    </div>
  );
}

export function ServiceGrid() {
  const [selected, setSelected] = useState<{
    service: ProfessionalService;
    origin: { x: number; y: number; width: number; height: number };
  } | null>(null);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [inView, setInView] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "140px 0px", threshold: 0.04 },
    );
    observer.observe(grid);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useLayoutEffect(() => {
    if (!selected) return;
    const root = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    const previousRootOverflow = root.style.overflow;
    const previousRootOverscroll = root.style.overscrollBehavior;
    const previousOverscroll = body.style.overscrollBehavior;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    root.classList.add("service-detail-open");
    root.style.overflow = "hidden";
    root.style.overscrollBehavior = "none";
    body.style.overscrollBehavior = "none";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      root.classList.remove("service-detail-open");
      root.style.overflow = previousRootOverflow;
      root.style.overscrollBehavior = previousRootOverscroll;
      body.style.overscrollBehavior = previousOverscroll;
      body.style.paddingRight = previousPaddingRight;
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
    };
  }, [selected]);

  const openService = useCallback((service: ProfessionalService, trigger: HTMLButtonElement) => {
    openerRef.current = trigger;
    setClosing(false);
    const bounds = trigger.getBoundingClientRect();
    setSelected({
      service,
      origin: {
        x: bounds.left,
        y: bounds.top,
        width: bounds.width,
        height: bounds.height,
      },
    });
  }, []);

  const closeService = useCallback(() => {
    if (closeTimer.current) return;
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      setSelected(null);
      setClosing(false);
      closeTimer.current = null;
      openerRef.current?.focus({ preventScroll: true });
    }, reducedMotion ? 0 : 360);
  }, [reducedMotion]);

  return (
    <>
      <div ref={gridRef} className={`service-bento-grid${inView ? " is-active" : ""}${reducedMotion ? " reduce-motion" : ""}`}>
        {professionalServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onOpen={openService}
            selected={selected?.service.id === service.id}
          />
        ))}
      </div>

      {typeof document !== "undefined"
        ? createPortal(
            <>
              {selected ? (
                <ServiceDetail
                  key={selected.service.id}
                  service={selected.service}
                  origin={selected.origin}
                  closing={closing}
                  onClose={closeService}
                  reducedMotion={reducedMotion}
                />
              ) : null}
            </>,
            document.body,
          )
        : null}
    </>
  );
}
