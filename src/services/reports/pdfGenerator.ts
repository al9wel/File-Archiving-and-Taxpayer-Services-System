import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface PdfGeneratorOptions {
    orientation?: "portrait" | "landscape";
    fileName?: string;
}

/**
 * Converts HTML content into a crisp, multi-page A4 PDF document directly inside the browser.
 */
export async function generatePdfFromHtml(
    htmlContent: string,
    options: PdfGeneratorOptions = {}
): Promise<void> {
    const { orientation = "portrait", fileName = "report.pdf" } = options;

    // Create container for off-screen rendering
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.top = "0";
    // Set fixed width matching A4 dimensions in pixels at 96 DPI
    // Portrait: 210mm ~ 794px | Landscape: 297mm ~ 1122px
    const widthPx = orientation === "portrait" ? 794 : 1122;
    container.style.width = `${widthPx}px`;
    container.style.backgroundColor = "#ffffff";
    container.style.direction = "rtl";
    container.style.fontFamily = "'Almarai', 'Inter', system-ui, -apple-system, sans-serif";
    container.innerHTML = htmlContent;

    document.body.appendChild(container);

    try {
        // Render container to high-definition canvas
        const canvas = await html2canvas(container, {
            scale: 2, // High DPI for crisp text & borders
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
            windowWidth: widthPx,
        });

        // Initialize jsPDF document
        const pdf = new jsPDF({
            orientation,
            unit: "mm",
            format: "a4",
            compress: true,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        const pdfWidth = pdf.internal.pageSize.getWidth(); // mm
        const pdfHeight = pdf.internal.pageSize.getHeight(); // mm

        // Calculate aspect ratio
        const imgWidthPx = canvas.width;
        const imgHeightPx = canvas.height;
        const imgHeightMm = (imgHeightPx * pdfWidth) / imgWidthPx;

        let heightLeft = imgHeightMm;
        let position = 0;

        // First page
        pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeightMm, undefined, "FAST");
        heightLeft -= pdfHeight;

        // Additional pages if content overflows single page
        while (heightLeft > 0) {
            position = heightLeft - imgHeightMm;
            pdf.addPage();
            pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeightMm, undefined, "FAST");
            heightLeft -= pdfHeight;
        }

        // Open in new tab or download
        const pdfBlob = pdf.output("blob");
        const blobUrl = URL.createObjectURL(pdfBlob);

        const newWindow = window.open(blobUrl, "_blank");
        if (!newWindow) {
            // Fallback download if popup blocker is active
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    } finally {
        // Clean up temporary DOM element
        if (container.parentNode) {
            container.parentNode.removeChild(container);
        }
    }
}
