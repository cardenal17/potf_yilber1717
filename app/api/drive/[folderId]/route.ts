import { NextResponse } from "next/server";
import { isValidDriveFolderId, listDriveFolderImages } from "../../../../lib/googleDrive";

export const revalidate = 3600;

export async function GET(
  _request: Request,
  { params }: { params: { folderId: string } }
): Promise<NextResponse> {
  const { folderId } = params;

  if (!isValidDriveFolderId(folderId)) {
    return NextResponse.json({ error: "Identificador de carpeta invalido" }, { status: 400 });
  }

  try {
    const images = await listDriveFolderImages(folderId);
    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ error: "No se pudo obtener la carpeta de Drive" }, { status: 502 });
  }
}
