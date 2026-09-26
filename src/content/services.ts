export type ServiceVisualType =
  | "reconciliation"
  | "documents"
  | "financial"
  | "reports"
  | "inventory"
  | "spreadsheet"
  | "processing"
  | "budget"
  | "workflow"
  | "decisions";

export type ServiceSize = "standard" | "wide" | "tall";

export type ProfessionalService = {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  description: string;
  capabilities: string[];
  example: string;
  tools: string[];
  result: string;
  visual: ServiceVisualType;
  size: ServiceSize;
};

export const professionalServices: ProfessionalService[] = [
  {
    id: "conciliaciones-bancarias",
    number: "01",
    title: "Conciliaciones bancarias",
    shortDescription:
      "Cruce y validación de movimientos bancarios contra registros contables.",
    description:
      "Reviso que cada movimiento del banco tenga correspondencia con la contabilidad y documento las diferencias que requieren atención.",
    capabilities: [
      "Cruzar extractos bancarios con auxiliares contables.",
      "Detectar cargos, depósitos y duplicados sin identificar.",
      "Dar seguimiento a partidas pendientes de conciliación.",
      "Preparar una conciliación clara y comprobable.",
    ],
    example:
      "Al cierre del mes, comparo los movimientos del estado de cuenta con el registro contable y separo únicamente las diferencias que deben investigarse.",
    tools: ["Excel", "ERP", "Conciliación"],
    result: "Saldos confiables y diferencias localizadas antes del cierre.",
    visual: "reconciliation",
    size: "wide",
  },
  {
    id: "cfdi-comprobantes",
    number: "02",
    title: "CFDI y comprobantes",
    shortDescription:
      "Organización, validación y control de CFDI, facturas y documentación contable.",
    description:
      "Ordeno los comprobantes y reviso sus datos esenciales para facilitar el registro, la consulta y el seguimiento documental.",
    capabilities: [
      "Clasificar CFDI y comprobantes por periodo y operación.",
      "Revisar datos fiscales y documentos faltantes.",
      "Relacionar comprobantes con pagos o movimientos.",
      "Mantener un control documental fácil de consultar.",
    ],
    example:
      "Una carpeta con facturas de distintos proveedores se convierte en un control por fecha, emisor, monto y estado de validación.",
    tools: ["CFDI", "Excel", "Control documental"],
    result: "Documentación ordenada y lista para revisión o registro.",
    visual: "documents",
    size: "standard",
  },
  {
    id: "analisis-financiero",
    number: "03",
    title: "Análisis financiero",
    shortDescription:
      "Indicadores, variaciones y análisis de información para apoyar decisiones.",
    description:
      "Convierto cifras contables y operativas en indicadores que permiten entender tendencias, cambios y puntos de atención.",
    capabilities: [
      "Calcular indicadores y variaciones relevantes.",
      "Comparar periodos, objetivos y resultados.",
      "Detectar tendencias y desviaciones.",
      "Presentar hallazgos con contexto y claridad.",
    ],
    example:
      "Comparo ingresos, costos y margen de varios meses para explicar dónde cambió el resultado y qué dato merece seguimiento.",
    tools: ["Excel", "Dashboards", "Análisis"],
    result: "Una lectura clara de lo que está ocurriendo en el negocio.",
    visual: "financial",
    size: "standard",
  },
  {
    id: "reportes-contables",
    number: "04",
    title: "Reportes contables",
    shortDescription:
      "Transformación de información contable en reportes claros y estructurados.",
    description:
      "Estructuro datos dispersos para presentar reportes consistentes, legibles y útiles para revisión periódica.",
    capabilities: [
      "Depurar y ordenar bases de información.",
      "Integrar reportes por periodo, cuenta o área.",
      "Estandarizar formatos y criterios de presentación.",
      "Resumir los datos que requieren seguimiento.",
    ],
    example:
      "Un conjunto de auxiliares y movimientos se integra en un reporte mensual con totales, variaciones y observaciones.",
    tools: ["Excel", "ERP", "Reportes"],
    result: "Información consistente que puede revisarse sin reconstruirla cada vez.",
    visual: "reports",
    size: "wide",
  },
  {
    id: "control-inventarios",
    number: "05",
    title: "Control de inventarios",
    shortDescription:
      "Seguimiento de existencias, movimientos y niveles de inventario.",
    description:
      "Organizo entradas, salidas y existencias para detectar faltantes, diferencias y productos que requieren reposición.",
    capabilities: [
      "Registrar entradas, salidas y ajustes.",
      "Comparar existencias físicas contra registros.",
      "Definir alertas y niveles mínimos de stock.",
      "Identificar productos con baja rotación.",
    ],
    example:
      "El control diario actualiza existencias después de cada movimiento y señala los artículos que llegaron a su nivel mínimo.",
    tools: ["Excel", "Inventarios", "Dashboards"],
    result: "Existencias visibles y compras mejor anticipadas.",
    visual: "inventory",
    size: "tall",
  },
  {
    id: "excel-automatizacion",
    number: "06",
    title: "Excel y automatización",
    shortDescription:
      "Automatización de tareas repetitivas y procesamiento con hojas de cálculo.",
    description:
      "Diseño controles y hojas de trabajo que reducen capturas repetidas, validan datos y calculan resultados de forma consistente.",
    capabilities: [
      "Estructurar bases, tablas y controles.",
      "Automatizar cálculos y validaciones.",
      "Crear plantillas reutilizables.",
      "Reducir pasos manuales en procesos frecuentes.",
    ],
    example:
      "Una plantilla recibe los movimientos del mes, aplica las fórmulas necesarias y actualiza automáticamente el resumen.",
    tools: ["Excel", "Power Query", "Automatización"],
    result: "Procesos más rápidos y con menos errores de captura.",
    visual: "spreadsheet",
    size: "standard",
  },
  {
    id: "python-automatizacion",
    number: "07",
    title: "Automatización con Python",
    shortDescription:
      "Herramientas para procesar, comparar y analizar grandes cantidades de información.",
    description:
      "Creo flujos sencillos para limpiar, combinar y validar archivos cuando el volumen supera lo práctico en una hoja de cálculo.",
    capabilities: [
      "Combinar archivos con una estructura repetida.",
      "Comparar grandes volúmenes de registros.",
      "Aplicar reglas de limpieza y validación.",
      "Generar salidas listas para analizar.",
    ],
    example:
      "Varios archivos CSV y Excel se consolidan, se revisan con reglas definidas y producen una base validada.",
    tools: ["Python", "Excel", "CSV", "Automatización"],
    result: "Información procesada con reglas repetibles y trazables.",
    visual: "processing",
    size: "standard",
  },
  {
    id: "control-presupuestal",
    number: "08",
    title: "Control presupuestal",
    shortDescription:
      "Seguimiento de presupuestos, gastos, variaciones y cumplimiento de objetivos.",
    description:
      "Comparo lo planeado con lo ejercido para mostrar desviaciones a tiempo y conservar el contexto de cada partida.",
    capabilities: [
      "Dar seguimiento al presupuesto por área o concepto.",
      "Comparar gasto real contra lo planeado.",
      "Calcular variaciones y porcentajes de avance.",
      "Señalar desviaciones que requieren revisión.",
    ],
    example:
      "El gasto real de cada área se actualiza durante el mes y muestra cuánto presupuesto queda disponible.",
    tools: ["Excel", "Presupuestos", "Dashboards"],
    result: "Desviaciones visibles antes de que se conviertan en problemas.",
    visual: "budget",
    size: "wide",
  },
  {
    id: "organizacion-procesos",
    number: "09",
    title: "Organización de procesos",
    shortDescription:
      "Estandarización de procedimientos administrativos y operativos.",
    description:
      "Documento pasos, responsables y validaciones para que las actividades frecuentes sigan un criterio común.",
    capabilities: [
      "Mapear actividades y puntos de control.",
      "Definir responsables y entregables.",
      "Crear listas de verificación y formatos.",
      "Reducir omisiones y retrabajo.",
    ],
    example:
      "Un proceso de recepción de documentos queda definido desde la entrega hasta su validación y archivo final.",
    tools: ["Procesos", "Checklists", "Documentación"],
    result: "Procedimientos claros que el equipo puede repetir y verificar.",
    visual: "workflow",
    size: "standard",
  },
  {
    id: "informacion-decisiones",
    number: "10",
    title: "Información para decisiones",
    shortDescription:
      "Conversión de datos operativos y financieros en información clara y accionable.",
    description:
      "Integro datos de distintas fuentes y los resumo para responder preguntas concretas sobre el desempeño de una operación.",
    capabilities: [
      "Unificar datos financieros y operativos.",
      "Seleccionar los indicadores que sí aportan contexto.",
      "Construir resúmenes ejecutivos claros.",
      "Traducir hallazgos en puntos de acción.",
    ],
    example:
      "Ventas, costos y existencias se reúnen en una sola vista para explicar el resultado del periodo y sus causas.",
    tools: ["Dashboards", "Excel", "Análisis"],
    result: "Una base clara para decidir con datos y prioridades visibles.",
    visual: "decisions",
    size: "wide",
  },
];
