import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface PdfGeneratorOptions {
    orientation?: "portrait" | "landscape";
    fileName?: string;
}

/**
 * Converts HTML content into a crisp, multi-page A4 PDF document directly inside the browser.
 * Uses an isolated iframe to prevent html2canvas from parsing modern CSS (e.g. oklch) in the host app.
 */
export async function generatePdfFromHtml(
    htmlContent: string,
    options: PdfGeneratorOptions = {}
): Promise<void> {
    const { orientation = "portrait", fileName = "report.pdf" } = options;

    // Portrait: 210mm ~ 794px | Landscape: 297mm ~ 1122px at standard 96 DPI
    const widthPx = orientation === "portrait" ? 794 : 1122;

    // Create an isolated hidden iframe
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.left = "-9999px";
    iframe.style.top = "0";
    iframe.style.width = `${widthPx}px`;
    iframe.style.height = "1000px";
    iframe.style.border = "none";
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";
    iframe.style.zIndex = "-9999";

    document.body.appendChild(iframe);

    try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc) {
            throw new Error("تعذر إنشاء بيئة التقرير المعزولة");
        }

        // Setup clean isolated HTML with no host stylesheets or oklch variables
        iframeDoc.open();
        iframeDoc.write(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="utf-8">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@400;600;700;800&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
                <style>
                    * {
                        box-sizing: border-box;
                        margin: 0;
                        padding: 0;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        background-color: #ffffff;
                        color: #111827;
                        direction: rtl;
                        font-family: 'Almarai', 'Inter', system-ui, -apple-system, sans-serif;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                        width: ${widthPx}px;
                    }
                </style>
            </head>
            <body>
                <div id="report-content" style="width: ${widthPx}px; background-color: #ffffff;">
                    ${htmlContent}
                </div>
            </body>
            </html>
        `);
        iframeDoc.close();

        // Wait for fonts in iframe to be ready
        if (iframeDoc.fonts) {
            await iframeDoc.fonts.ready;
        }
        // Small delay to ensure all DOM elements are fully settled
        await new Promise((resolve) => setTimeout(resolve, 150));

        const targetEl = iframeDoc.getElementById("report-content") || iframeDoc.body;

        // Render container to high-definition canvas
        const canvas = await html2canvas(targetEl, {
            scale: 2, // High DPI for crisp text & borders
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
            width: widthPx,
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
        while (heightLeft > 1) { // 1mm threshold to avoid empty trailing page
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
        // Clean up temporary iframe
        if (iframe.parentNode) {
            iframe.parentNode.removeChild(iframe);
        }
    }
}
