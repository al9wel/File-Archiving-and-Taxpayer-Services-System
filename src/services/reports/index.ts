import type { File } from "@/types/File";
import type { FileMovement, FileMovementStatistics } from "@/types/FileMovments";
import type { TaxPayers } from "@/types/TaxPayers";
import { generatePdfFromHtml } from "./pdfGenerator";
import { generateAllFilesHtmlTemplate } from "./templates/allFilesTemplate";
import { generateSingleFileHtmlTemplate } from "./templates/singleFileTemplate";
import { generateFileMovementsHtmlTemplate } from "./templates/fileMovementsTemplate";
import { generateAllTaxPayersHtmlTemplate } from "./templates/allTaxPayersTemplate";
import { generateSingleTaxPayerHtmlTemplate } from "./templates/singleTaxPayerTemplate";

/**
 * Generates an official A4 Landscape report for all files.
 */
export async function generateAllFilesReport(files: File["fileInfo"][]): Promise<void> {
    const htmlContent = generateAllFilesHtmlTemplate(files);
    await generatePdfFromHtml(htmlContent, {
        orientation: "landscape",
        fileName: `تقرير_جميع_الملفات_${new Date().toISOString().slice(0, 10)}.pdf`,
    });
}

/**
 * Generates an official A4 Portrait report for a single taxpayer file.
 */
export async function generateSingleFileReport(file: File["fileInfo"]): Promise<void> {
    const htmlContent = generateSingleFileHtmlTemplate(file);
    await generatePdfFromHtml(htmlContent, {
        orientation: "portrait",
        fileName: `تقرير_ملف_${file.id}_${new Date().toISOString().slice(0, 10)}.pdf`,
    });
}

/**
 * Generates an official A4 Landscape report for file movements.
 */
export async function generateFileMovementsReport(
    movements: FileMovement[],
    stats?: FileMovementStatistics
): Promise<void> {
    const htmlContent = generateFileMovementsHtmlTemplate(movements, stats);
    await generatePdfFromHtml(htmlContent, {
        orientation: "landscape",
        fileName: `تقرير_حركة_الملفات_${new Date().toISOString().slice(0, 10)}.pdf`,
    });
}

/**
 * Generates an official A4 Landscape report for all taxpayers.
 */
export async function generateAllTaxPayersReport(taxPayers: TaxPayers[]): Promise<void> {
    const htmlContent = generateAllTaxPayersHtmlTemplate(taxPayers);
    await generatePdfFromHtml(htmlContent, {
        orientation: "landscape",
        fileName: `تقرير_جميع_المكلفين_${new Date().toISOString().slice(0, 10)}.pdf`,
    });
}

/**
 * Generates an official A4 Portrait report for a single taxpayer (supports all taxpayer types and full details).
 */
export async function generateSingleTaxPayerReport(taxPayer: any): Promise<void> {
    const htmlContent = generateSingleTaxPayerHtmlTemplate(taxPayer);
    const id = taxPayer?.taxPayerInfo?.id || taxPayer?.taxPayerId || "مكلف";
    await generatePdfFromHtml(htmlContent, {
        orientation: "portrait",
        fileName: `تقرير_مكلف_${id}_${new Date().toISOString().slice(0, 10)}.pdf`,
    });
}


