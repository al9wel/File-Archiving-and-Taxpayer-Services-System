import taxLogoImg from "@/assets/images/TaxLogo.png";

/**
 * Utility functions for PDF Reports Generation.
 */

export const TAX_LOGO_URL = taxLogoImg;

export function formatArabicDate(dateStr?: string | Date | null): string {
    if (!dateStr) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${day}/${month}/${year}`;
    }

    try {
        const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
        if (isNaN(date.getTime())) {
            return String(dateStr);
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${day}/${month}/${year}`;
    } catch {
        return String(dateStr);
    }
}

export function getFileTypeLabel(fileType?: string | null): string {
    if (!fileType) return "-";
    switch (fileType) {
        case "Individual":
            return "فرد";
        case "Company":
            return "شركة";
        case "CharitableCompany":
            return "شركة خيرية";
        default:
            return fileType;
    }
}

export function getMovementStatusLabel(status?: string | null): string {
    if (!status) return "-";
    switch (status) {
        case "InsideArchive":
            return "داخل الأرشيف";
        case "OutsideArchive":
            return "خارج الأرشيف";
        case "Missing":
            return "مفقود";
        default:
            return status;
    }
}

export function getMovementStatusBadgeStyle(status?: string | null): string {
    const base = "display: inline-flex; align-items: center; justify-content: center; line-height: 1.2; padding: 4px 10px; font-size: 11px; font-weight: 700; border-radius: 12px; vertical-align: middle;";
    switch (status) {
        case "InsideArchive":
            return `${base} background-color: #d1fae5; color: #065f46; border: 1px solid #a7f3d0;`;
        case "OutsideArchive":
            return `${base} background-color: #e0f2fe; color: #075985; border: 1px solid #bae6fd;`;
        case "Missing":
            return `${base} background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5;`;
        default:
            return `${base} background-color: #f3f4f6; color: #374151; border: 1px solid #e5e7eb;`;
    }
}

export function formatUrlOrText(val: any): string {
    if (val === null || val === undefined || val === "") return "-";
    const str = String(val).trim();
    if (
        str.startsWith("http://") ||
        str.startsWith("https://") ||
        str.startsWith("/uploads/") ||
        str.startsWith("blob:") ||
        str.startsWith("data:")
    ) {
        return `<a href="${escapeHtml(str)}" target="_blank" style="color: #8b1e1e; font-weight: 700; text-decoration: underline;">مرفق خارجي (رابط)</a>`;
    }
    return escapeHtml(str);
}

export function escapeHtml(val: any): string {
    if (val === null || val === undefined || val === "") return "-";
    return String(val)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

