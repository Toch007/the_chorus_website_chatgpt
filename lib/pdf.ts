// lib/pdf.ts
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";

export async function generateTicketPDF(
  tier: string,
  ticketId: string,   // 👈 now we pass ticketId instead of reference
  buyerName: string
): Promise<Buffer> {
  // 1️⃣ Ticket template path
  const ticketPath = path.join(process.cwd(), "public", "tickets", `${tier}.jpg`);
  if (!fs.existsSync(ticketPath)) {
    throw new Error(`Ticket template not found: ${ticketPath}`);
  }

  // 2️⃣ Load background image
  const ticketImageBytes = fs.readFileSync(ticketPath);

  // 3️⃣ Create PDF in landscape
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 380]);
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // 4️⃣ Embed background image
  const ticketImage = await pdfDoc.embedJpg(ticketImageBytes);
  page.drawImage(ticketImage, { x: 0, y: 0, width, height });

  // 5️⃣ Generate QR code with JSON payload
  const qrPayload = JSON.stringify({
    ticketId,    // 👈 embed ticketId (what scanner expects)
    tier,
    buyerName,
    issuedAt: new Date().toISOString(),
  });

  const qrDataUrl = await QRCode.toDataURL(qrPayload, { margin: 1, width: 200 });
  const qrBase64 = qrDataUrl.split(",")[1];
  const qrBytes = Buffer.from(qrBase64, "base64");
  const qrImage = await pdfDoc.embedPng(qrBytes);

  // 6️⃣ Draw semi-transparent rectangle behind text
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

  // 7️⃣ Overlay buyer info
  const textColor = rgb(1, 1, 1);
  page.drawText(`Name: ${buyerName}`, {
    x: textBoxX + 10,
    y: textBoxY + 28,
    size: 14,
    font,
    color: textColor,
  });
  page.drawText(`ID: ${ticketId}`, {    // 👈 show ticketId
    x: textBoxX + 10,
    y: textBoxY + 10,
    size: 10,
    font,
    color: textColor,
  });

  // 8️⃣ Place QR code top-right
  const qrSize = 80;
  page.drawImage(qrImage, {
    x: width - qrSize - 20,
    y: height - qrSize - 20,
    width: qrSize,
    height: qrSize,
  });

  // 9️⃣ Return PDF buffer
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
