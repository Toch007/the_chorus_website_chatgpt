// lib/pdf.ts
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";

export async function generateTicketPDF(
  tier: string,
  ticketId: string,
  buyerName: string,
): Promise<Buffer> {
  // Try Paul-specific ticket template first, fall back to generic
  const paulTicketPath = path.join(
    process.cwd(),
    "public",
    "tickets",
    `paul ticket (${tier}).jpg`,
  );
  const genericTicketPath = path.join(
    process.cwd(),
    "public",
    "tickets",
    `${tier}.jpg`,
  );

  const ticketPath = fs.existsSync(paulTicketPath)
    ? paulTicketPath
    : genericTicketPath;

  if (!fs.existsSync(ticketPath)) {
    throw new Error(`Ticket template not found for tier: ${tier}`);
  }

  // Load background image
  const ticketImageBytes = fs.readFileSync(ticketPath);

  // Create PDF in landscape
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 380]);
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Embed background image
  const ticketImage = await pdfDoc.embedJpg(ticketImageBytes);
  page.drawImage(ticketImage, { x: 0, y: 0, width, height });

  // Generate QR code with JSON payload
  const qrPayload = JSON.stringify({
    ticketId,
    tier,
    buyerName,
    issuedAt: new Date().toISOString(),
  });

  const qrDataUrl = await QRCode.toDataURL(qrPayload, {
    margin: 1,
    width: 200,
  });
  const qrBase64 = qrDataUrl.split(",")[1];
  const qrBytes = Buffer.from(qrBase64, "base64");
  const qrImage = await pdfDoc.embedPng(qrBytes);

  // Semi-transparent text box backdrop
  const textBoxWidth = 220;
  const textBoxHeight = 50;
  const textBoxX = 40;
  const textBoxY = 40;
  page.drawRectangle({
    x: textBoxX,
    y: textBoxY,
    width: textBoxWidth,
    height: textBoxHeight,
    color: rgb(0, 0, 0),
    opacity: 0.6,
  });

  // Overlay buyer info
  const textColor = rgb(1, 1, 1);
  page.drawText(`Name: ${buyerName}`, {
    x: textBoxX + 10,
    y: textBoxY + 28,
    size: 14,
    font,
    color: textColor,
  });
  page.drawText(`ID: ${ticketId}`, {
    x: textBoxX + 10,
    y: textBoxY + 10,
    size: 10,
    font,
    color: textColor,
  });

  // Place QR code top-right
  const qrSize = 80;
  page.drawImage(qrImage, {
    x: width - qrSize - 20,
    y: height - qrSize - 20,
    width: qrSize,
    height: qrSize,
  });

  // Return PDF buffer
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
