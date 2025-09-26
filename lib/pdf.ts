// lib/pdf.ts
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import QRCode from "qrcode";

export async function generateTicketPDF(
  tier: string,
  reference: string,
  buyerName: string
): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 0,
      });

      const buffers: Buffer[] = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      // ✅ Use your own font instead of Helvetica
      const fontPath = path.join(process.cwd(), "public/fonts/OpenSans-Regular.ttf");
      if (!fs.existsSync(fontPath)) {
        throw new Error("Font not found at: " + fontPath);
      }
      doc.font(fontPath);

      // ✅ Load ticket background image
      const ticketImagePath = path.join(process.cwd(), "public/tickets", `${tier}.jpg`);
      if (!fs.existsSync(ticketImagePath)) {
        throw new Error("Ticket image not found at: " + ticketImagePath);
      }
      doc.image(ticketImagePath, 0, 0, { width: 595, height: 842 });

      // ✅ Overlay text
      doc.fillColor("black").fontSize(18).text(`Name: ${buyerName}`, 50, 700);
      doc.fontSize(16).text(`Reference: ${reference}`, 50, 730);
      doc.text(`Tier: ${tier}`, 50, 760);

      // ✅ QR Code
      const qrDataUrl = await QRCode.toDataURL(reference);
      const qrBuffer = Buffer.from(qrDataUrl.split(",")[1], "base64");
      doc.image(qrBuffer, 400, 700, { width: 120, height: 120 });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
