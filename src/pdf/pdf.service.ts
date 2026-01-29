// src/pdf/pdf.service.ts
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

export async function generatePdfFromHtml(
  html: string,
  outputPath: string
) {
  const browser = await puppeteer.launch({
    headless: 'new'
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '2cm',
      bottom: '2cm',
      left: '2cm',
      right: '2cm'
    }
  });

  await browser.close();
}
