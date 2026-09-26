import type { CSSProperties, ReactNode } from "react";
import type { ServiceVisualType } from "@/content/services";

type ServiceVisualProps = {
  type: ServiceVisualType;
  expanded?: boolean;
};

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="m3.2 8.3 3 3 6.6-7" />
  </svg>
);

function ReconciliationVisual() {
  return (
    <div className="service-demo reconciliation-demo">
      <div className="demo-heading">
        <span>Banco</span>
        <span>Registro</span>
      </div>
      <div className="reconciliation-pairs">
        {["12,480", "3,260", "8,915"].map((amount, index) => (
          <div className="reconciliation-pair" key={amount}>
            <span className="transaction-chip">${amount}</span>
            <span className="match-line" style={{ "--match-delay": `${index * 0.7}s` } as CSSProperties}>
              <i />
            </span>
            <span className="transaction-chip">${amount}</span>
            <span className="match-check"><CheckIcon /></span>
          </div>
        ))}
      </div>
      <div className="demo-status"><CheckIcon /> 3 movimientos conciliados</div>
    </div>
  );
}

function DocumentsVisual() {
  return (
    <div className="service-demo documents-demo">
      <div className="document-stack">
        {["A-104", "B-028", "C-315"].map((folio, index) => (
          <div className={`document-sheet document-sheet-${index + 1}`} key={folio}>
            <span className="document-fold" />
            <strong>CFDI</strong>
            <span>{folio}</span>
            <i /><i /><i />
            <span className="document-check"><CheckIcon /></span>
          </div>
        ))}
      </div>
      <div className="document-tray"><span>Comprobantes validados</span><b>03</b></div>
    </div>
  );
}

function FinancialVisual() {
  const bars = [42, 61, 53, 78, 67, 88, 74, 96];
  return (
    <div className="service-demo financial-demo">
      <div className="metric-row">
        <div><span>Margen</span><strong>28.4%</strong></div>
        <div><span>Variación</span><strong className="positive">+6.2%</strong></div>
      </div>
      <div className="chart-area">
        <span className="chart-grid-line line-one" />
        <span className="chart-grid-line line-two" />
        <div className="chart-bars">
          {bars.map((height, index) => (
            <i key={index} style={{ "--bar-height": `${height}%`, "--bar-delay": `${index * 0.09}s` } as CSSProperties} />
          ))}
        </div>
        <svg className="trend-line" viewBox="0 0 260 80" preserveAspectRatio="none" aria-hidden="true">
          <path d="M4 66 C45 62,54 45,82 51 S132 28,160 36 S211 10,256 15" />
        </svg>
      </div>
      <div className="chart-periods"><span>Ene</span><span>Abr</span><span>Ago</span></div>
    </div>
  );
}

function ReportsVisual() {
  return (
    <div className="service-demo reports-demo">
      <div className="source-data">
        <span className="source-label">Datos</span>
        {[72, 48, 86, 61].map((width, index) => (
          <span className="source-row" key={width} style={{ "--row-width": `${width}%`, "--row-delay": `${index * 0.18}s` } as CSSProperties} />
        ))}
      </div>
      <div className="report-transfer"><span>→</span><i /></div>
      <div className="generated-report">
        <div className="report-top"><span>REPORTE</span><b>SEP</b></div>
        <div className="report-total"><small>Resultado</small><strong>$184,620</strong></div>
        <div className="report-bars"><i /><i /><i /><i /><i /></div>
        <div className="report-ready"><CheckIcon /> Generado</div>
      </div>
    </div>
  );
}

function InventoryVisual() {
  const items = [
    { code: "A-01", name: "Materia prima", quantity: "42", state: "ok" },
    { code: "B-12", name: "Empaque", quantity: "18", state: "ok" },
    { code: "C-07", name: "Producto C", quantity: "04", state: "low" },
    { code: "D-21", name: "Insumo D", quantity: "26", state: "ok" },
  ];
  return (
    <div className="service-demo inventory-demo">
      <div className="inventory-summary">
        <div><span>Existencias</span><strong>90</strong></div>
        <div className="inventory-cubes" aria-hidden="true"><i /><i /><i /></div>
      </div>
      <div className="inventory-list">
        {items.map((item, index) => (
          <div className={`inventory-item ${item.state}`} key={item.code} style={{ "--item-delay": `${index * 0.18}s` } as CSSProperties}>
            <span className="inventory-code">{item.code}</span>
            <span className="inventory-name">{item.name}</span>
            <strong>{item.quantity}</strong>
          </div>
        ))}
      </div>
      <div className="stock-alert"><span>!</span><div><strong>Stock bajo</strong><small>C-07 requiere reposición</small></div></div>
    </div>
  );
}

function SpreadsheetVisual() {
  const values = ["ENE", "FEB", "MAR", "$24.8", "$27.1", "$31.6", "12%", "9%", "16%"];
  return (
    <div className="service-demo spreadsheet-demo">
      <div className="formula-bar"><span>fx</span><b>=SUMA(B2:D2)</b></div>
      <div className="sheet-grid">
        {values.map((value, index) => (
          <span key={`${value}-${index}`} className={index > 2 ? "sheet-value" : "sheet-head"} style={{ "--cell-delay": `${index * 0.12}s` } as CSSProperties}>{value}</span>
        ))}
      </div>
      <div className="sheet-result"><span>Resultado</span><strong>$83.5K</strong><i><CheckIcon /></i></div>
    </div>
  );
}

function ProcessingVisual() {
  return (
    <div className="service-demo processing-demo">
      <div className="input-files"><span><b>CSV</b> ventas.csv</span><span><b>XLS</b> costos.xlsx</span></div>
      <div className="process-path"><i /><span className="process-core"><svg viewBox="0 0 24 24"><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M18.4 5.6l-2.1 2.1m-8.6 8.6-2.1 2.1"/><circle cx="12" cy="12" r="3.2"/></svg></span><i /></div>
      <div className="processed-output">
        <div><span>Base validada</span><b><CheckIcon /></b></div>
        <i /><i /><i /><i />
        <small>2,480 registros</small>
      </div>
    </div>
  );
}

function BudgetVisual() {
  return (
    <div className="service-demo budget-demo">
      <div className="budget-metric"><span>Disponible</span><strong>$32,400</strong><small>27% del presupuesto</small></div>
      <div className="budget-comparison">
        <div className="budget-row"><span>Presupuesto</span><b>$120K</b><i><em className="budget-plan" /></i></div>
        <div className="budget-row"><span>Gasto real</span><b>$87.6K</b><i><em className="budget-real" /></i></div>
      </div>
      <div className="budget-variance"><span>Variación calculada</span><strong>− $32.4K</strong><b>Dentro del objetivo</b></div>
    </div>
  );
}

function WorkflowVisual() {
  const steps = ["Recepción", "Revisión", "Registro", "Validación", "Finalizado"];
  return (
    <div className="service-demo workflow-demo">
      <div className="workflow-track"><i /></div>
      <div className="workflow-steps">
        {steps.map((step, index) => (
          <div key={step} className="workflow-step" style={{ "--step-delay": `${index * 0.65}s` } as CSSProperties}>
            <span>{index + 1}</span><small>{step}</small>
          </div>
        ))}
      </div>
      <div className="workflow-status"><span className="status-pulse" /> Proceso en seguimiento <b>5 etapas</b></div>
    </div>
  );
}

function DecisionsVisual() {
  return (
    <div className="service-demo decisions-demo">
      <div className="data-sources">
        <span className="data-chip data-chip-one">Ventas <b>+8%</b></span>
        <span className="data-chip data-chip-two">Costos <b>−3%</b></span>
        <span className="data-chip data-chip-three">Stock <b>90</b></span>
        <span className="data-chip data-chip-four">Margen <b>28%</b></span>
      </div>
      <div className="decision-flow"><i /><span>→</span></div>
      <div className="decision-dashboard">
        <div className="decision-header"><span>Resumen ejecutivo</span><b>Actualizado</b></div>
        <div className="decision-score"><span><small>Desempeño</small><strong>84</strong></span><i><em /></i></div>
        <div className="decision-insight"><span><CheckIcon /></span><div><small>Hallazgo principal</small><strong>Margen por encima del objetivo</strong></div></div>
      </div>
    </div>
  );
}

export function ServiceVisual({ type, expanded = false }: ServiceVisualProps) {
  const visuals: Record<ServiceVisualType, ReactNode> = {
    reconciliation: <ReconciliationVisual />,
    documents: <DocumentsVisual />,
    financial: <FinancialVisual />,
    reports: <ReportsVisual />,
    inventory: <InventoryVisual />,
    spreadsheet: <SpreadsheetVisual />,
    processing: <ProcessingVisual />,
    budget: <BudgetVisual />,
    workflow: <WorkflowVisual />,
    decisions: <DecisionsVisual />,
  };

  return (
    <div className={`service-visual service-visual-${type}${expanded ? " is-expanded" : ""}`} aria-hidden="true">
      <div className="service-visual-grid" />
      <div className="service-visual-glow" />
      {visuals[type]}
    </div>
  );
}
