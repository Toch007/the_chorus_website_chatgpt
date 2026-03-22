"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

interface QRCodeGeneratorProps {
  url: string;
  size?: number;
  level?: "L" | "M" | "Q" | "H";
  includeMargin?: boolean;
}

export default function QRCodeGenerator({
  url,
  size = 200,
  level = "H",
  includeMargin = true,
}: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        url,
        {
          errorCorrectionLevel: level,
          type: "image/png",
          quality: 0.95,
          margin: includeMargin ? 2 : 0,
          width: size,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        },
        (error) => {
          if (error) {
            console.error("Error generating QR code:", error);
          }
        },
      );
    }
  }, [url, size, level, includeMargin]);

  return (
    <canvas
      ref={canvasRef}
      className="mx-auto"
      style={{
        border: "2px solid #e5e7eb",
        borderRadius: "8px",
        padding: "8px",
        backgroundColor: "#ffffff",
      }}
    />
  );
}
