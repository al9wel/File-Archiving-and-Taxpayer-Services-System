import type { File } from "@/types/File";
import type { FileMovement, FileMovementStatistics } from "@/types/FileMovments";
import { generatePdfFromHtml } from "./pdfGenerator";
import { generateAllFilesHtmlTemplate } from "./templates/allFilesTemplate";
import { generateSingleFileHtmlTemplate } from "./templates/singleFileTemplate";
import { generateFileMovementsHtmlTemplate } from "./templates/fileMovementsTemplate";

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
