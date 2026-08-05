# Portafolio data-driven

Toda la informacion del perfil vive en archivos JSON dentro de `data/`.
Los componentes del sitio deben leer solo esos archivos para evitar tokens innecesarios.

## Estructura

- data/portfolio.json
- data/experience.json
- data/projects.json
- data/certifications.json
- data/skills.json
- data/social.json
- data/education.json
- data/languages.json

## Fuente unica de verdad

`data/portfolio.json` contiene todas las secciones completas:
- Informacion personal
- Resumen profesional
- Experiencia laboral
- Educacion
- Certificaciones
- Habilidades
- Proyectos
- Redes sociales
- Idiomas

Los demas archivos en `data/` son vistas derivadas para consumo selectivo por pagina o componente.

## Importacion LinkedIn (one-shot)

1. Instalar dependencias:

   npm install

2. Ejecutar importador:

   npm run import:linkedin -- --input ./ruta/al/archivo

Ejemplos de entrada:
- ZIP oficial de LinkedIn: `linkedin-export.zip`
- Carpeta con CSV del export: `./linkedin-csv/`
- JSON ya generado: `./perfil.json`
- Markdown del perfil: `./perfil.md`

Opciones:
- `--format auto|zip|csv|json|md` (default: auto)
- `--outDir ./data` (default: ./data)

## Flujo de actualizacion

Cuando cambie tu perfil de LinkedIn:
1. Exportas de nuevo.
2. Ejecutas una vez el importador.
3. Se regeneran los JSON.
4. El resto del proyecto no se toca.
