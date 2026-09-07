// Metadatos del CV/Resume. Los PDF viven en /public/cv y se actualizan sin tocar componentes.
export type ResumeAsset = {
  locale: "es" | "en";
  label: string;
  file: string;
  updatedAt: string;
};

export const resumeAssets: ResumeAsset[] = [
  { locale: "es", label: "CV (Español)", file: "/cv/CV-Yilber-Triana-ES.pdf", updatedAt: "2026-01" },
  { locale: "en", label: "Resume (English)", file: "/cv/Resume-Yilber-Triana-EN.pdf", updatedAt: "2026-01" }
];
