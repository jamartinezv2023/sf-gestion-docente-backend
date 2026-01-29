// src/controllers/pdf.controller.ts
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { generatePdfFromHtml } from '../pdf/pdf.service';

export async function generatePlanAulaPdf(req: Request, res: Response) {
  try {
    const templatePath = path.join(
      __dirname,
      '../pdf/templates/plan-aula.html'
    );

    let html = fs.readFileSync(templatePath, 'utf-8');

    // 🔁 Reemplazo simple (luego lo mejoramos)
    Object.entries(req.body).forEach(([key, value]) => {
      html = html.replaceAll(`{{${key}}}`, String(value));
    });

    const outputDir = path.join(__dirname, '../../generated');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const outputPath = path.join(
  outputDir,
  `plan-aula-${Date.now()}.pdf`
);


    await generatePdfFromHtml(html, outputPath);

    res.download(outputPath);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
