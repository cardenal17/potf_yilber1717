// Modelo de datos independiente de la UI para la sección Scripts.
// Agregar un script nuevo = agregar un objeto a `scripts`. Ver docs/CONTENT_GUIDE.md.

export type ScriptCategory =
  | "python"
  | "sql-oracle"
  | "apis"
  | "laravel-angular"
  | "n8n-rpa"
  | "devops"
  | "ia";

export const scriptCategories: { value: "todos" | ScriptCategory; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "python", label: "Python" },
  { value: "sql-oracle", label: "SQL Oracle" },
  { value: "apis", label: "APIs" },
  { value: "laravel-angular", label: "Laravel / Angular" },
  { value: "n8n-rpa", label: "n8n / RPA" },
  { value: "devops", label: "DevOps" },
  { value: "ia", label: "IA" }
];

export type ScriptItem = {
  slug: string;
  title: string;
  category: ScriptCategory;
  language: string;
  description: string;
  problem: string;
  solution: string;
  code: string;
  executionExample: string;
  result: string;
};

export const scripts: ScriptItem[] = [
  {
    slug: "python-etl-normalizacion",
    title: "ETL de normalización de datos",
    category: "python",
    language: "Python",
    description: "Script para limpiar y normalizar archivos CSV antes de cargarlos a un data warehouse.",
    problem: "Archivos de origen con formatos inconsistentes de fecha, moneda y texto.",
    solution: "Pipeline con Pandas que normaliza tipos, valida columnas obligatorias y exporta un CSV limpio.",
    code: `import pandas as pd\n\ndef normalize(path: str) -> pd.DataFrame:\n    df = pd.read_csv(path)\n    df["fecha"] = pd.to_datetime(df["fecha"], errors="coerce")\n    df["monto"] = df["monto"].replace(r"[^0-9.]", "", regex=True).astype(float)\n    return df.dropna(subset=["fecha", "monto"])`,
    executionExample: "python normalize.py --input datos_crudos.csv --output datos_limpios.csv",
    result: "Reducción de errores de carga en el data warehouse y datos consistentes para reporting."
  },
  {
    slug: "sql-oracle-tuning-consultas",
    title: "Tuning de consultas Oracle con planes de ejecución",
    category: "sql-oracle",
    language: "SQL (PL/SQL)",
    description: "Consulta para identificar sentencias SQL con mayor consumo de recursos.",
    problem: "Consultas lentas en producción sin visibilidad clara del cuello de botella.",
    solution: "Uso de vistas dinámicas de rendimiento (V$SQL) para priorizar el tuning.",
    code: `SELECT sql_id, executions, elapsed_time / 1000000 AS elapsed_sec,\n       buffer_gets, sql_text\nFROM v$sql\nORDER BY elapsed_time DESC\nFETCH FIRST 10 ROWS ONLY;`,
    executionExample: "Ejecutar en SQL*Plus o SQL Developer con permisos sobre vistas V$.",
    result: "Priorización efectiva de las consultas a optimizar por impacto real."
  },
  {
    slug: "api-utilidad-reintentos",
    title: "Cliente HTTP con reintentos y backoff",
    category: "apis",
    language: "Python",
    description: "Utilidad para llamadas a APIs externas con reintentos exponenciales y timeouts seguros.",
    problem: "Fallas intermitentes de red causaban errores no controlados al consumir APIs de terceros.",
    solution: "Cliente con backoff exponencial, timeout explícito y manejo de errores tipado.",
    code: `import time\nimport requests\n\ndef call_with_retry(url: str, retries: int = 3, timeout: int = 5):\n    for attempt in range(retries):\n        try:\n            response = requests.get(url, timeout=timeout)\n            response.raise_for_status()\n            return response.json()\n        except requests.RequestException:\n            if attempt == retries - 1:\n                raise\n            time.sleep(2 ** attempt)`,
    executionExample: "call_with_retry('https://api.ejemplo.com/status')",
    result: "Reducción de fallos por errores transitorios de red en integraciones críticas."
  },
  {
    slug: "n8n-flujo-notificaciones",
    title: "Flujo n8n de notificaciones automatizadas",
    category: "n8n-rpa",
    language: "n8n (JSON workflow)",
    description: "Workflow que escucha un webhook y envía notificaciones a Slack/Email según reglas de negocio.",
    problem: "Notificaciones manuales tardías ante eventos críticos del sistema.",
    solution: "Workflow n8n con nodo Webhook, condicional de severidad y nodos de notificación.",
    code: `{\n  "nodes": [\n    { "name": "Webhook", "type": "n8n-nodes-base.webhook" },\n    { "name": "IF Severidad Alta", "type": "n8n-nodes-base.if" },\n    { "name": "Slack", "type": "n8n-nodes-base.slack" }\n  ]\n}`,
    executionExample: "Importar el JSON en n8n y activar el workflow.",
    result: "Notificaciones en segundos ante eventos críticos, sin intervención manual."
  }
];

export function getScriptBySlug(slug: string): ScriptItem | undefined {
  return scripts.find((script) => script.slug === slug);
}
