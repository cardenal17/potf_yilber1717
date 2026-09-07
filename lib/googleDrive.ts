// Acceso server-side a Google Drive. NUNCA importar este módulo desde un componente cliente.
// La API key vive en la variable de entorno GOOGLE_DRIVE_API_KEY (no NEXT_PUBLIC_*).

export type DriveImage = {
  id: string;
  name: string;
  thumbnailUrl: string;
};

const DRIVE_FOLDER_ID_PATTERN = /^[a-zA-Z0-9_-]{10,100}$/;

export function isValidDriveFolderId(folderId: string): boolean {
  return DRIVE_FOLDER_ID_PATTERN.test(folderId);
}

export async function listDriveFolderImages(folderId: string): Promise<DriveImage[]> {
  if (!isValidDriveFolderId(folderId)) {
    throw new Error("Identificador de carpeta de Drive invalido");
  }

  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  if (!apiKey) {
    // Sin configuración de Drive: no romper la UI, simplemente no hay imágenes remotas.
    return [];
  }

  const query = encodeURIComponent(`'${folderId}' in parents and mimeType contains 'image/' and trashed = false`);
  const fields = encodeURIComponent("files(id,name,thumbnailLink)");
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&key=${apiKey}`;

  const response = await fetch(url, {
    // Revalida periódicamente para reflejar cambios en la carpeta sin redeploy.
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    throw new Error(`Error consultando Google Drive (status ${response.status})`);
  }

  const data = (await response.json()) as {
    files?: { id: string; name: string; thumbnailLink?: string }[];
  };

  return (data.files ?? [])
    .filter((file) => Boolean(file.thumbnailLink))
    .map((file) => ({
      id: file.id,
      name: file.name,
      thumbnailUrl: (file.thumbnailLink as string).replace(/=s\d+$/, "=s1600")
    }));
}
