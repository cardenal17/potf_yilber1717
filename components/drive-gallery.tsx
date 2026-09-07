"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { DriveImage } from "../lib/googleDrive";

export function DriveGallery({ folderId }: { folderId: string }): JSX.Element {
  const [images, setImages] = useState<DriveImage[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "empty" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/drive/${encodeURIComponent(folderId)}`)
      .then((response) => {
        if (!response.ok) throw new Error("request-failed");
        return response.json() as Promise<{ images: DriveImage[] }>;
      })
      .then((data) => {
        if (cancelled) return;
        setImages(data.images);
        setStatus(data.images.length ? "ready" : "empty");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [folderId]);

  if (status === "loading") return <p className="muted">Cargando galería desde Google Drive...</p>;
  if (status === "error") return <p className="muted">No se pudo cargar la galería de Drive en este momento.</p>;
  if (status === "empty") return <p className="muted">Esta carpeta de Drive aún no tiene imágenes disponibles.</p>;

  return (
    <div className="drive-gallery">
      {images.map((image) => (
        <Image
          key={image.id}
          src={image.thumbnailUrl}
          alt={image.name}
          width={480}
          height={320}
          className="drive-gallery-img"
        />
      ))}
    </div>
  );
}
