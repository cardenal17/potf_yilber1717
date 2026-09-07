# Guía de contenido: Developer Project Gallery, Scripts y CV

Esta guía explica cómo extender el portafolio **sin tocar componentes de la interfaz**.
Toda la información vive en `content/` (TypeScript) y las imágenes en Google Drive o en `public/`.

## 1. Agregar un nuevo proyecto

Edita [content/project-catalog.ts](../content/project-catalog.ts) y agrega un objeto al arreglo `projects`:

```ts
{
  slug: "mi-proyecto-nuevo",           // usado en /projects/mi-proyecto-nuevo
  name: "Nombre del proyecto",
  category: "software",               // profesional | software | automatizacion | ia | data-science | scripts | arquitectura | labs
  status: "produccion",               // produccion | en-progreso | prototipo | archivado
  summary: "Resumen corto para la tarjeta.",
  coverImage: "https://... o /images/...",
  technologies: ["Next.js", "TypeScript"],
  confidential: false,                // true oculta el enlace a GitHub en tarjeta y detalle
  problem: "...",
  solution: "...",
  responsibilities: ["..."],
  architecture: "...",
  results: ["..."],
  learnings: ["..."],
  github: "https://github.com/...",   // opcional
  demo: "https://...",                // opcional
  imageSource: { type: "upload", images: [] } // o { type: "drive", driveFolderId: "..." }
}
```

No es necesario modificar `app/projects/page.tsx`, `app/projects/[slug]/page.tsx` ni los componentes:
la galería, los filtros y la página de detalle leen automáticamente este catálogo.

## 2. Asociar un proyecto a una carpeta de Google Drive

1. En Google Drive, crea/usa una carpeta por proyecto (ej. `KUYN`, `CodeGraph`, `AI Agent`, `Automation`, `Data Lab`).
2. Comparte la carpeta como "Cualquier persona con el enlace puede ver".
3. Copia el ID de la carpeta desde la URL: `https://drive.google.com/drive/folders/<ID>`.
4. En el proyecto correspondiente de `content/project-catalog.ts`, usa:
   ```ts
   imageSource: { type: "drive", driveFolderId: "<ID>" }
   ```
5. Configura la variable de entorno `GOOGLE_DRIVE_API_KEY` (ver sección de seguridad abajo).

La página de detalle del proyecto llama a `/api/drive/[folderId]`, que consulta la Google Drive API
**desde el servidor** (`lib/googleDrive.ts`) y devuelve solo `id`, `name` y `thumbnailUrl`. La clave nunca
llega al navegador.

### Sincronizar cambios en la carpeta

Las imágenes se listan en vivo (con caché de 1 hora vía `revalidate`). Para forzar una sincronización
inmediata tras subir/eliminar imágenes, vuelve a desplegar o espera a que expire la caché; no requiere
cambios de código.

### Seguridad de la integración con Drive

- La API key se define solo en `GOOGLE_DRIVE_API_KEY` (variable de entorno de servidor, **sin** prefijo
  `NEXT_PUBLIC_`), configurada en Vercel → Project Settings → Environment Variables.
- `lib/googleDrive.ts` es server-only: nunca se importa desde un componente `"use client"`.
- El `folderId` se valida con una expresión regular antes de usarse en la consulta a la API de Drive.
- Nunca se expongan tokens OAuth, claves privadas ni credenciales en el frontend.

## 3. Publicar un nuevo Script

Edita [content/scripts-catalog.ts](../content/scripts-catalog.ts) y agrega un objeto al arreglo `scripts`:

```ts
{
  slug: "mi-script",
  title: "Título del script",
  category: "python",  // python | sql-oracle | apis | laravel-angular | n8n-rpa | devops | ia
  language: "Python",
  description: "...",
  problem: "...",
  solution: "...",
  code: `...`,
  executionExample: "python mi_script.py",
  result: "..."
}
```

Aparecerá automáticamente en `/scripts` (con filtro por categoría) y en `/scripts/mi-script`.

## 4. Actualizar el CV / Resume

1. Coloca el PDF actualizado en `public/cv/` (ver `public/cv/README.txt` para los nombres esperados).
2. Si cambias el nombre del archivo, actualiza la ruta en [content/resume.ts](../content/resume.ts).
3. No se requiere ningún cambio en componentes: el botón del Hero y la página `/resume` leen este archivo.

Si en el futuro se necesita almacenamiento externo (S3, Drive, etc.), basta con cambiar el campo `file`
de `content/resume.ts` por una URL absoluta; la UI no cambia.

## 5. Convenciones generales

- Los modelos de datos (`content/*.ts`) son la única fuente de verdad; los componentes solo presentan.
- No se modificó ninguna sección existente (Home, About, Achievements, Journey, Lab, Certifications, Blog,
  Contact) fuera de agregar enlaces de navegación y el botón de descarga de CV en el Hero.
- Estilos nuevos reutilizan las variables y clases existentes (`--accent`, `.card`, `.badge`, `.grid`) y
  agregan clases específicas (`.filter-chip`, `.drive-gallery`, `.code-block`) al final de `app/globals.css`.
