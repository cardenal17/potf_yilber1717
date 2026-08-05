import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, extname, join, resolve, sep } from "node:path";

type PersonalInfo = {
  fullName: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
  photo: string;
};

type Experience = {
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

type Education = {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
};

type Certification = {
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate: string;
  credentialId: string;
  credentialUrl: string;
};

type Skill = {
  name: string;
  category: string;
};

type Project = {
  name: string;
  role: string;
  description: string;
  url: string;
  startDate: string;
  endDate: string;
  technologies: string[];
};

type Social = {
  platform: string;
  url: string;
  username: string;
};

type Language = {
  name: string;
  proficiency: string;
};

type Portfolio = {
  personalInfo: PersonalInfo;
  professionalSummary: string;
  workExperience: Experience[];
  education: Education[];
  certifications: Certification[];
  skills: Skill[];
  projects: Project[];
  social: Social[];
  languages: Language[];
};

type CsvData = Record<string, Array<Record<string, string>>>;

type CliArgs = {
  input: string;
  format: "auto" | "zip" | "csv" | "json" | "md";
  outDir: string;
};

const EMPTY_PORTFOLIO: Portfolio = {
  personalInfo: {
    fullName: "",
    headline: "",
    location: "",
    email: "",
    phone: "",
    website: "",
    linkedin: "",
    github: "",
    photo: ""
  },
  professionalSummary: "",
  workExperience: [],
  education: [],
  certifications: [],
  skills: [],
  projects: [],
  social: [],
  languages: []
};

const WORKSPACE_ROOT = resolve(process.cwd());

function ensureInsideWorkspace(targetPath: string, label: string): string {
  const normalized = resolve(targetPath);
  const rootWithSep = WORKSPACE_ROOT.endsWith(sep) ? WORKSPACE_ROOT : `${WORKSPACE_ROOT}${sep}`;

  if (normalized === WORKSPACE_ROOT || normalized.startsWith(rootWithSep)) {
    return normalized;
  }

  throw new Error(`${label} debe estar dentro del workspace: ${WORKSPACE_ROOT}`);
}

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {
    input: "",
    format: "auto",
    outDir: resolve(process.cwd(), "data")
  };

  const positional: string[] = [];

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];

    if (token === "--input" && argv[i + 1]) {
      args.input = ensureInsideWorkspace(resolve(argv[i + 1]), "--input");
      i += 1;
      continue;
    }

    if (token === "--format" && argv[i + 1]) {
      const candidate = argv[i + 1].toLowerCase();
      if (["auto", "zip", "csv", "json", "md"].includes(candidate)) {
        args.format = candidate as CliArgs["format"];
      }
      i += 1;
      continue;
    }

    if (token === "--outDir" && argv[i + 1]) {
      args.outDir = ensureInsideWorkspace(resolve(argv[i + 1]), "--outDir");
      i += 1;
      continue;
    }

    if (!token.startsWith("--")) {
      positional.push(token);
    }
  }

  if (!args.input && positional[0]) {
    args.input = ensureInsideWorkspace(resolve(positional[0]), "input");
  }

  if (args.format === "auto" && positional[1]) {
    const candidate = positional[1].toLowerCase();
    if (["auto", "zip", "csv", "json", "md"].includes(candidate)) {
      args.format = candidate as CliArgs["format"];
    }
  }

  if (!args.input) {
    throw new Error("Falta --input. Ejemplo: --input ./linkedin-export.zip");
  }

  return args;
}

function detectFormat(inputPath: string, requested: CliArgs["format"]): Exclude<CliArgs["format"], "auto"> {
  if (requested !== "auto") {
    return requested;
  }

  const stats = statSync(inputPath);
  if (stats.isDirectory()) {
    return "csv";
  }

  const ext = extname(inputPath).toLowerCase();
  if (ext === ".zip") return "zip";
  if (ext === ".json") return "json";
  if (ext === ".md" || ext === ".markdown") return "md";
  if (ext === ".csv") return "csv";

  throw new Error(`No se pudo detectar el formato para: ${inputPath}`);
}

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

function parseCsvFile(filePath: string): Array<Record<string, string>> {
  const content = readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const lines = content.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) return [];

  const headers = parseCsvLine(lines[0]);
  const rows: Array<Record<string, string>> = [];

  for (let i = 1; i < lines.length; i += 1) {
    const values = parseCsvLine(lines[i]);
    const row: Record<string, string> = {};
    for (let h = 0; h < headers.length; h += 1) {
      row[headers[h]] = values[h] ?? "";
    }
    rows.push(row);
  }

  return rows;
}

function collectCsvFiles(basePath: string): string[] {
  const safeBasePath = ensureInsideWorkspace(basePath, "Ruta CSV");
  const stats = statSync(safeBasePath);
  if (!stats.isDirectory()) {
    return [safeBasePath];
  }

  const entries = readdirSync(safeBasePath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const full = ensureInsideWorkspace(join(safeBasePath, entry.name), "Archivo CSV");
    if (entry.isDirectory()) {
      files.push(...collectCsvFiles(full));
      continue;
    }
    if (extname(entry.name).toLowerCase() === ".csv") {
      files.push(full);
    }
  }

  return files;
}

function toKey(fileName: string): string {
  return basename(fileName, extname(fileName))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function loadCsvData(pathOrDir: string): CsvData {
  const files = collectCsvFiles(pathOrDir);
  const result: CsvData = {};

  for (const file of files) {
    result[toKey(file)] = parseCsvFile(file);
  }

  return result;
}

function extractZipToTemp(zipPath: string): string {
  const tempDir = mkdtempSync(join(tmpdir(), "linkedin-import-"));

  try {
    if (process.platform === "win32") {
      execFileSync(
        "powershell",
        [
          "-NoProfile",
          "-Command",
          `Expand-Archive -Path '${zipPath.replace(/'/g, "''")}' -DestinationPath '${tempDir.replace(/'/g, "''")}' -Force`
        ],
        { stdio: "ignore" }
      );
      return tempDir;
    }

    execFileSync("tar", ["-xf", zipPath, "-C", tempDir], { stdio: "ignore" });
    return tempDir;
  } catch (error) {
    rmSync(tempDir, { recursive: true, force: true });
    throw new Error(`No se pudo extraer el ZIP: ${(error as Error).message}`);
  }
}

function firstNonEmpty(...values: Array<string | undefined>): string {
  for (const value of values) {
    if ((value ?? "").trim()) return (value ?? "").trim();
  }
  return "";
}

function mapFromCsv(csv: CsvData): Portfolio {
  const portfolio: Portfolio = JSON.parse(JSON.stringify(EMPTY_PORTFOLIO));

  const profile = csv.profile?.[0] ?? csv.intro?.[0] ?? csv.personal_information?.[0] ?? {};
  portfolio.personalInfo.fullName = firstNonEmpty(profile["First Name"], profile["Last Name"] ? `${profile["First Name"] ?? ""} ${profile["Last Name"] ?? ""}` : undefined, profile["Name"]);
  portfolio.personalInfo.headline = firstNonEmpty(profile["Headline"], profile["Summary Headline"]);
  portfolio.personalInfo.location = firstNonEmpty(profile["Geo Location"], profile["Location"]);
  portfolio.personalInfo.linkedin = firstNonEmpty(profile["URL"], profile["LinkedIn"]);

  const emails = csv.email_addresses ?? csv.email_address ?? [];
  if (emails[0]) {
    portfolio.personalInfo.email = firstNonEmpty(emails[0]["Email Address"], emails[0]["Email"]);
  }

  const phones = csv.phone_numbers ?? csv.phone_number ?? [];
  if (phones[0]) {
    portfolio.personalInfo.phone = firstNonEmpty(phones[0]["Phone Number"], phones[0]["Number"]);
  }

  const positions = csv.positions ?? csv.position ?? csv.experience ?? [];
  portfolio.workExperience = positions.map((row) => ({
    company: firstNonEmpty(row["Company Name"], row["Company"]),
    title: firstNonEmpty(row["Title"], row["Position"]),
    location: firstNonEmpty(row["Location"]),
    startDate: firstNonEmpty(row["Started On"], row["Start Date"]),
    endDate: firstNonEmpty(row["Finished On"], row["End Date"]),
    description: firstNonEmpty(row["Description"])
  })).filter((item) => item.company || item.title);

  const educationRows = csv.education ?? csv.educations ?? [];
  portfolio.education = educationRows.map((row) => ({
    institution: firstNonEmpty(row["School Name"], row["Institution"]),
    degree: firstNonEmpty(row["Degree Name"], row["Degree"]),
    fieldOfStudy: firstNonEmpty(row["Field Of Study"], row["Field"]),
    startDate: firstNonEmpty(row["Start Date"]),
    endDate: firstNonEmpty(row["End Date"]),
    description: firstNonEmpty(row["Notes"], row["Description"])
  })).filter((item) => item.institution || item.degree);

  const certifications = csv.certifications ?? csv.licenses_certifications ?? [];
  portfolio.certifications = certifications.map((row) => ({
    name: firstNonEmpty(row["Name"], row["Certification Name"]),
    issuer: firstNonEmpty(row["Authority"], row["Company"], row["Issuer"]),
    issueDate: firstNonEmpty(row["Started On"], row["Issue Date"]),
    expirationDate: firstNonEmpty(row["Finished On"], row["Expiration Date"]),
    credentialId: firstNonEmpty(row["License Number"], row["Credential ID"]),
    credentialUrl: firstNonEmpty(row["URL"], row["Credential URL"])
  })).filter((item) => item.name);

  const skillsRows = csv.skills ?? csv.skill ?? [];
  portfolio.skills = skillsRows.map((row) => ({
    name: firstNonEmpty(row["Name"], row["Skill Name"]),
    category: firstNonEmpty(row["Category"], "General")
  })).filter((item) => item.name);

  const projectsRows = csv.projects ?? csv.project ?? [];
  portfolio.projects = projectsRows.map((row) => ({
    name: firstNonEmpty(row["Title"], row["Name"]),
    role: firstNonEmpty(row["Role"]),
    description: firstNonEmpty(row["Description"]),
    url: firstNonEmpty(row["URL"], row["Project URL"]),
    startDate: firstNonEmpty(row["Started On"], row["Start Date"]),
    endDate: firstNonEmpty(row["Finished On"], row["End Date"]),
    technologies: firstNonEmpty(row["Technologies"]).split(/[,;]+/).map((x) => x.trim()).filter(Boolean)
  })).filter((item) => item.name);

  const websites = csv.websites ?? csv.website ?? [];
  const socialRows = csv.social_links ?? csv.social ?? [];
  portfolio.social = [
    ...websites.map((row) => ({
      platform: firstNonEmpty(row["Type"], "Website"),
      url: firstNonEmpty(row["URL"], row["Website URL"]),
      username: ""
    })),
    ...socialRows.map((row) => ({
      platform: firstNonEmpty(row["Platform"], "Social"),
      url: firstNonEmpty(row["URL"]),
      username: firstNonEmpty(row["Username"])
    }))
  ].filter((item) => item.url);

  const languageRows = csv.languages ?? csv.language ?? [];
  portfolio.languages = languageRows.map((row) => ({
    name: firstNonEmpty(row["Name"], row["Language"]),
    proficiency: firstNonEmpty(row["Proficiency"], row["Level"])
  })).filter((item) => item.name);

  const profileSummary = csv.about?.[0] ?? csv.summary?.[0] ?? {};
  portfolio.professionalSummary = firstNonEmpty(profileSummary["Summary"], profileSummary["About"], profile["Summary"]);

  return portfolio;
}

function mapFromJson(raw: unknown): Portfolio {
  if (!raw || typeof raw !== "object") {
    return JSON.parse(JSON.stringify(EMPTY_PORTFOLIO));
  }

  const data = raw as Record<string, unknown>;
  const portfolio = JSON.parse(JSON.stringify(EMPTY_PORTFOLIO)) as Portfolio;

  portfolio.personalInfo = {
    ...portfolio.personalInfo,
    ...(data.personalInfo as Record<string, string> ?? {})
  };

  if (typeof data.professionalSummary === "string") {
    portfolio.professionalSummary = data.professionalSummary;
  }

  portfolio.workExperience = (data.workExperience as Experience[] ?? data.experience as Experience[] ?? []);
  portfolio.education = (data.education as Education[] ?? []);
  portfolio.certifications = (data.certifications as Certification[] ?? []);
  portfolio.skills = (data.skills as Skill[] ?? []);
  portfolio.projects = (data.projects as Project[] ?? []);
  portfolio.social = (data.social as Social[] ?? []);
  portfolio.languages = (data.languages as Language[] ?? []);

  return portfolio;
}

function mapFromMarkdown(markdown: string): Portfolio {
  const portfolio: Portfolio = JSON.parse(JSON.stringify(EMPTY_PORTFOLIO));
  const sections = markdown.split(/^##\s+/m).map((chunk) => chunk.trim()).filter(Boolean);

  for (const section of sections) {
    const lines = section.split(/\r?\n/).map((line) => line.trim());
    const title = lines[0].toLowerCase();
    const body = lines.slice(1).join("\n").trim();

    if (title.includes("resumen") || title.includes("summary") || title.includes("about")) {
      portfolio.professionalSummary = body;
      continue;
    }

    if (title.includes("habilidad") || title.includes("skills")) {
      portfolio.skills = lines.slice(1)
        .filter((line) => line.startsWith("-") || line.startsWith("*"))
        .map((line) => line.replace(/^[-*]\s*/, "").trim())
        .filter(Boolean)
        .map((name) => ({ name, category: "General" }));
      continue;
    }

    if (title.includes("idioma") || title.includes("languages")) {
      portfolio.languages = lines.slice(1)
        .filter((line) => line.startsWith("-") || line.startsWith("*"))
        .map((line) => line.replace(/^[-*]\s*/, "").trim())
        .filter(Boolean)
        .map((entry) => {
          const [name, proficiency] = entry.split(":").map((part) => part.trim());
          return { name: name ?? "", proficiency: proficiency ?? "" };
        });
      continue;
    }
  }

  return portfolio;
}

function writeDataFiles(outDir: string, portfolio: Portfolio): void {
  const safeOutDir = ensureInsideWorkspace(outDir, "Directorio de salida");
  mkdirSync(safeOutDir, { recursive: true });
  const pretty = (value: unknown) => `${JSON.stringify(value, null, 2)}\n`;

  writeFileSync(join(safeOutDir, "portfolio.json"), pretty(portfolio), "utf8");
  writeFileSync(join(safeOutDir, "experience.json"), pretty(portfolio.workExperience), "utf8");
  writeFileSync(join(safeOutDir, "projects.json"), pretty(portfolio.projects), "utf8");
  writeFileSync(join(safeOutDir, "certifications.json"), pretty(portfolio.certifications), "utf8");
  writeFileSync(join(safeOutDir, "skills.json"), pretty(portfolio.skills), "utf8");
  writeFileSync(join(safeOutDir, "social.json"), pretty(portfolio.social), "utf8");
  writeFileSync(join(safeOutDir, "education.json"), pretty(portfolio.education), "utf8");
  writeFileSync(join(safeOutDir, "languages.json"), pretty(portfolio.languages), "utf8");
}

function run(): void {
  const args = parseArgs(process.argv.slice(2));
  const format = detectFormat(args.input, args.format);

  let tempDirToCleanup = "";

  try {
    let portfolio: Portfolio;

    if (format === "zip") {
      tempDirToCleanup = extractZipToTemp(args.input);
      const csv = loadCsvData(tempDirToCleanup);
      portfolio = mapFromCsv(csv);
    } else if (format === "csv") {
      const csv = loadCsvData(args.input);
      portfolio = mapFromCsv(csv);
    } else if (format === "json") {
      const content = readFileSync(args.input, "utf8");
      portfolio = mapFromJson(JSON.parse(content));
    } else {
      const content = readFileSync(args.input, "utf8");
      portfolio = mapFromMarkdown(content);
    }

    writeDataFiles(args.outDir, portfolio);

    process.stdout.write(`Importacion completada. Archivos generados en: ${args.outDir}\n`);
  } finally {
    if (tempDirToCleanup) {
      rmSync(tempDirToCleanup, { recursive: true, force: true });
    }
  }
}

run();
