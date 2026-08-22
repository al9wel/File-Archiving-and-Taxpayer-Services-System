import type { FileMovement, FileMovementStatistics } from "@/types/FileMovments";
import { escapeHtml, formatArabicDate, getMovementStatusBadgeStyle, getMovementStatusLabel, TAX_LOGO_URL } from "../pdfHelpers";

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
                <tr style="${index % 2 === 1 ? "background-color: #fbfbfc;" : "background-color: #ffffff;"}">
                    <td style="padding: 9px 8px; border-bottom: 1px solid #e5e7eb; text-align: center; vertical-align: middle; font-weight: 600; color: #4b5563;">${index + 1}</td>
                    <td style="padding: 9px 8px; border-bottom: 1px solid #e5e7eb; text-align: center; vertical-align: middle; font-weight: 700; color: #111827;">${fileId}</td>
                    <td style="padding: 9px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; vertical-align: middle; font-weight: 600; color: #1f2937;">${tradeName}</td>
                    <td style="padding: 9px 8px; border-bottom: 1px solid #e5e7eb; text-align: center; vertical-align: middle;">
                        <span style="${badgeStyle}">${statusLabel}</span>
                    </td>
                    <td style="padding: 9px 8px; border-bottom: 1px solid #e5e7eb; text-align: center; vertical-align: middle; color: #374151; font-weight: 600;">${dateStr}</td>
                    <td style="padding: 9px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; vertical-align: middle; color: #4b5563; font-size: 12px;">${collectorName}</td>
                    <td style="padding: 9px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; vertical-align: middle; color: #4b5563; font-size: 12px;">${departmentName}</td>
                    <td style="padding: 9px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; vertical-align: middle; color: #6b7280; font-size: 12px;">${creatorName}</td>
                </tr>
            `;
        })
        .join("");

    return `
    <div style="width: 100%; box-sizing: border-box; padding: 30px; font-family: 'Almarai', sans-serif; direction: rtl; background-color: #ffffff; color: #111827;">
        
        <!-- Official Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #8b1e1e; padding-bottom: 16px; margin-bottom: 20px;">
            <div style="text-align: right;">
                <h3 style="margin: 0; font-size: 14px; font-weight: 700; color: #8b1e1e;">الجمهورية اليمنية</h3>
                <h4 style="margin: 4px 0 0 0; font-size: 12px; font-weight: 600; color: #374151;">وزارة المالية - مصلحة الضرائب</h4>
                <h4 style="margin: 2px 0 0 0; font-size: 12px; font-weight: 600; color: #4b5563;">مكتب الضرائب بمحافظة حضرموت الساحل</h4>
            </div>

            <div style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <img src="${TAX_LOGO_URL}" alt="شعار النظام" style="height: 52px; width: auto; object-fit: contain; margin: 0 auto 6px auto; display: block;" />
                <span style="font-size: 12px; color: #8b1e1e; font-weight: 800;">نظام الأرشفة وخدمات المكلفين</span>
            </div>

            <div style="text-align: left;">
                <div style="font-size: 12px; color: #4b5563; margin-bottom: 4px;"><strong>تاريخ التقرير:</strong> ${today}</div>
                <div style="font-size: 12px; color: #4b5563;"><strong>إجمالي الحركات:</strong> ${totalMovements}</div>
            </div>
        </div>

        <!-- Title -->
        <div style="text-align: center; margin-bottom: 20px; background-color: #fef2f2; padding: 12px; border-radius: 8px; border: 1px solid #fee2e2;">
            <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #781919;">تقرير حركة الملفات الأرشيفية</h1>
            <p style="margin: 8px 0 0 0; font-size: 13px; font-weight: 600; color: #8b1e1e;">سجل وتفاصيل حركات الملفات وإحصائيات التداول</p>
        </div>

        <!-- Stats Bar with colored top borders matching movement status -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 22px;">
            <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-top: 3px solid #8b1e1e; padding: 10px; border-radius: 8px; text-align: center;">
                <div style="font-size: 11px; color: #64748b; font-weight: 600;">إجمالي الحركات</div>
                <div style="font-size: 17px; font-weight: 800; color: #111827; margin-top: 4px;">${totalMovements}</div>
            </div>
            <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-top: 3px solid #16a34a; padding: 10px; border-radius: 8px; text-align: center;">
                <div style="font-size: 11px; color: #15803d; font-weight: 600;">داخل الأرشيف</div>
                <div style="font-size: 17px; font-weight: 800; color: #166534; margin-top: 4px;">${insideCount}</div>
            </div>
            <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-top: 3px solid #d97706; padding: 10px; border-radius: 8px; text-align: center;">
                <div style="font-size: 11px; color: #b45309; font-weight: 600;">خارج الأرشيف</div>
                <div style="font-size: 17px; font-weight: 800; color: #92400e; margin-top: 4px;">${outsideCount}</div>
            </div>
            <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-top: 3px solid #dc2626; padding: 10px; border-radius: 8px; text-align: center;">
                <div style="font-size: 11px; color: #b91c1c; font-weight: 600;">مفقود</div>
                <div style="font-size: 17px; font-weight: 800; color: #991b1b; margin-top: 4px;">${missingCount}</div>
            </div>
        </div>

        <!-- Table -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 13px;">
            <thead>
                <tr style="background-color: #8b1e1e; color: #ffffff;">
                    <th style="padding: 10px 8px; border: 1px solid #8b1e1e; text-align: center; font-weight: 700; width: 40px;">#</th>
                    <th style="padding: 10px 8px; border: 1px solid #8b1e1e; text-align: center; font-weight: 700;">رقم الملف</th>
                    <th style="padding: 10px 8px; border: 1px solid #8b1e1e; text-align: right; font-weight: 700;">اسم المكلف</th>
                    <th style="padding: 10px 8px; border: 1px solid #8b1e1e; text-align: center; font-weight: 700;">حالة الحركة</th>
                    <th style="padding: 10px 8px; border: 1px solid #8b1e1e; text-align: center; font-weight: 700;">تاريخ الحركة</th>
                    <th style="padding: 10px 8px; border: 1px solid #8b1e1e; text-align: right; font-weight: 700;">المستلم / المجمع</th>
                    <th style="padding: 10px 8px; border: 1px solid #8b1e1e; text-align: right; font-weight: 700;">القسم المعني</th>
                    <th style="padding: 10px 8px; border: 1px solid #8b1e1e; text-align: right; font-weight: 700;">المنشئ</th>
                </tr>
            </thead>
            <tbody>
                ${rowsHtml.length > 0 ? rowsHtml : `<tr><td colspan="8" style="padding: 20px; text-align: center; color: #9ca3af;">لا توجد حركات ملفات مسجلة</td></tr>`}
            </tbody>
        </table>

        <!-- Footer -->
        <div style="border-top: 1px solid #e2e8f0; padding-top: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #64748b;">
            <div>إدارة الضرائب بساحل حضرموت — نظام الأرشفة وخدمات المكلفين</div>
            <div>تم التوليد تلقائيًا من النظام</div>
        </div>

    </div>
    `;
}

