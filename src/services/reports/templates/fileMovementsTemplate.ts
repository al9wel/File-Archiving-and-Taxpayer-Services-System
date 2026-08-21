import type { FileMovement, FileMovementStatistics } from "@/types/FileMovments";
import { escapeHtml, formatArabicDate, getMovementStatusBadgeStyle, getMovementStatusLabel } from "../pdfHelpers";

export function generateFileMovementsHtmlTemplate(
    movements: FileMovement[],
    stats?: FileMovementStatistics
): string {
    const today = formatArabicDate();
    const totalMovements = stats?.total_movements ?? movements.length;

    let insideCount = 0;
    let outsideCount = 0;
    let missingCount = 0;

    if (stats) {
        insideCount = Number(stats.inside_archive_count || 0);
        outsideCount = Number(stats.outside_archive_count || 0);
        missingCount = Number(stats.missing_count || 0);
    } else {
        movements.forEach((m) => {
            if (m.status === "InsideArchive") insideCount++;
            else if (m.status === "OutsideArchive") outsideCount++;
            else if (m.status === "Missing") missingCount++;
        });
    }

    const rowsHtml = movements
        .map((m, index) => {
            const fileId = escapeHtml(m.file?.id || m.file?.taxNumber);
            const tradeName = escapeHtml(m.file?.taxPayer?.tradeName);
            const statusLabel = escapeHtml(getMovementStatusLabel(m.status));
            const badgeStyle = getMovementStatusBadgeStyle(m.status);
            const dateStr = escapeHtml(formatArabicDate(m.date));
            const collectorName = escapeHtml(m.taxCollector?.fullName);
            const departmentName = escapeHtml(m.department?.name);
            const creatorName = escapeHtml(
                m.creator
                    ? `${m.creator.firstName || ""} ${m.creator.lastName || ""}`.trim() || m.creator.userName
                    : "-"
            );

            return `
                <tr style="${index % 2 === 1 ? "background-color: #f9fafb;" : ""}">
                    <td style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; text-align: center; font-weight: 600; color: #4b5563;">${index + 1}</td>
                    <td style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; text-align: center; font-weight: 700; color: #111827;">${fileId}</td>
                    <td style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; color: #1f2937;">${tradeName}</td>
                    <td style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">
                        <span style="display: inline-block; padding: 3px 10px; font-size: 11px; font-weight: 700; border-radius: 12px; ${badgeStyle}">${statusLabel}</span>
                    </td>
                    <td style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #374151; font-weight: 600;">${dateStr}</td>
                    <td style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #4b5563; font-size: 12px;">${collectorName}</td>
                    <td style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #4b5563; font-size: 12px;">${departmentName}</td>
                    <td style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #6b7280; font-size: 12px;">${creatorName}</td>
                </tr>
            `;
        })
        .join("");

    return `
    <div style="width: 100%; box-sizing: border-box; padding: 30px; font-family: 'Almarai', sans-serif; direction: rtl; background-color: #ffffff; color: #111827;">
        
        <!-- Official Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 16px; margin-bottom: 20px;">
            <div style="text-align: right;">
                <h3 style="margin: 0; font-size: 14px; font-weight: 700; color: #1e3a8a;">الجمهورية اليمنية</h3>
                <h4 style="margin: 4px 0 0 0; font-size: 13px; font-weight: 600; color: #374151;">وزارة المالية - مصلحة الضرائب</h4>
                <h4 style="margin: 2px 0 0 0; font-size: 13px; font-weight: 600; color: #4b5563;">مكتب الضرائب بمحافظة حضرموت - الساحل</h4>
            </div>

            <div style="text-align: center;">
                <div style="width: 50px; height: 50px; margin: 0 auto 6px auto; background-color: #1e3a8a; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 800; font-size: 18px;">
                    ض
                </div>
                <span style="font-size: 11px; color: #6b7280; font-weight: 600;">نظام أرشفة الملفات</span>
            </div>

            <div style="text-align: left;">
                <div style="font-size: 12px; color: #4b5563; margin-bottom: 4px;"><strong>تاريخ التقرير:</strong> ${today}</div>
                <div style="font-size: 12px; color: #4b5563;"><strong>إجمالي الحركات:</strong> ${totalMovements}</div>
            </div>
        </div>

        <!-- Title & Stats Bar -->
        <div style="margin-bottom: 20px; background-color: #f8fafc; padding: 14px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <h1 style="margin: 0 0 10px 0; font-size: 20px; font-weight: 800; color: #1e293b; text-align: center;">تقرير حركة الملفات الأرشيفية</h1>
            
            <div style="display: flex; justify-content: space-around; background-color: #ffffff; padding: 10px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 12px;">
                <div><span style="color: #64748b;">إجمالي الحركات:</span> <strong style="color: #1e293b; font-size: 14px;">${totalMovements}</strong></div>
                <div><span style="color: #065f46;">داخل الأرشيف:</span> <strong style="color: #047857; font-size: 14px;">${insideCount}</strong></div>
                <div><span style="color: #075985;">خارج الأرشيف:</span> <strong style="color: #0284c7; font-size: 14px;">${outsideCount}</strong></div>
                <div><span style="color: #991b1b;">مفقود:</span> <strong style="color: #dc2626; font-size: 14px;">${missingCount}</strong></div>
            </div>
        </div>

        <!-- Table -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 13px;">
            <thead>
                <tr style="background-color: #1e3a8a; color: #ffffff;">
                    <th style="padding: 10px 8px; border: 1px solid #1e3a8a; text-align: center; font-weight: 700; width: 40px;">#</th>
                    <th style="padding: 10px 8px; border: 1px solid #1e3a8a; text-align: center; font-weight: 700;">رقم الملف</th>
                    <th style="padding: 10px 8px; border: 1px solid #1e3a8a; text-align: right; font-weight: 700;">اسم المكلف</th>
                    <th style="padding: 10px 8px; border: 1px solid #1e3a8a; text-align: center; font-weight: 700;">حالة الحركة</th>
                    <th style="padding: 10px 8px; border: 1px solid #1e3a8a; text-align: center; font-weight: 700;">تاريخ الحركة</th>
                    <th style="padding: 10px 8px; border: 1px solid #1e3a8a; text-align: right; font-weight: 700;">المستلم / المجمع</th>
                    <th style="padding: 10px 8px; border: 1px solid #1e3a8a; text-align: right; font-weight: 700;">القسم المعني</th>
                    <th style="padding: 10px 8px; border: 1px solid #1e3a8a; text-align: right; font-weight: 700;">المنشئ</th>
                </tr>
            </thead>
            <tbody>
                ${rowsHtml.length > 0 ? rowsHtml : `<tr><td colspan="8" style="padding: 20px; text-align: center; color: #9ca3af;">لا توجد حركات ملفات مسجلة</td></tr>`}
            </tbody>
        </table>

        <!-- Footer -->
        <div style="border-top: 1px solid #e2e8f0; padding-top: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #64748b;">
            <div>إدارة الضرائب بساحل حضرموت — نظام أرشفة الملفات وخدمات المكلفين</div>
            <div>تم التوليد تلقائيًا من المتصفح</div>
        </div>

    </div>
    `;
}
