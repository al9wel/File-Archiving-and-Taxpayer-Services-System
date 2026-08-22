import type { TaxPayers } from "@/types/TaxPayers";
import { escapeHtml, formatArabicDate, getFileTypeLabel, TAX_LOGO_URL } from "../pdfHelpers";

export function generateAllTaxPayersHtmlTemplate(taxPayers: TaxPayers[]): string {
    const today = formatArabicDate();
    const totalPayers = taxPayers.length;

    // Calculate breakdown statistics
    let individualCount = 0;
    let companyCount = 0;
    let charitableCount = 0;

    taxPayers.forEach((tp) => {
        const type = tp.taxPayerFileType;
        if (type === "Individual") individualCount++;
        else if (type === "Company") companyCount++;
        else if (type === "CharitableCompany") charitableCount++;
    });

    const rowsHtml = taxPayers
        .map((tp, index) => {
            const payerId = escapeHtml(tp.taxPayerId);
            const payerName = escapeHtml(tp.taxPayerName);
            const tradeName = escapeHtml(tp.tradeName);
            const phone = escapeHtml(tp.phone);
            const fileType = escapeHtml(getFileTypeLabel(tp.taxPayerFileType));

            return `
                <tr style="${index % 2 === 1 ? "background-color: #fbfbfc;" : "background-color: #ffffff;"}">
                    <td style="padding: 9px 8px; border-bottom: 1px solid #e5e7eb; text-align: center; vertical-align: middle; font-weight: 600; color: #4b5563;">${index + 1}</td>
                    <td style="padding: 9px 8px; border-bottom: 1px solid #e5e7eb; text-align: center; vertical-align: middle; font-weight: 700; color: #111827;">${payerId}</td>
                    <td style="padding: 9px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; vertical-align: middle; font-weight: 600; color: #1f2937;">${payerName}</td>
                    <td style="padding: 9px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; vertical-align: middle; font-weight: 600; color: #374151;">${tradeName}</td>
                    <td style="padding: 9px 8px; border-bottom: 1px solid #e5e7eb; text-align: center; vertical-align: middle; color: #374151; direction: ltr;">${phone}</td>
                    <td style="padding: 9px 8px; border-bottom: 1px solid #e5e7eb; text-align: center; vertical-align: middle;">
                        <span style="display: inline-flex; align-items: center; justify-content: center; line-height: 1.2; padding: 4px 10px; font-size: 11px; font-weight: 700; border-radius: 12px; vertical-align: middle; background-color: #fef2f2; color: #8b1e1e; border: 1px solid #fecaca;">${fileType}</span>
                    </td>
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
                <h4 style="margin: 2px 0 0 0; font-size: 12px; font-weight: 600; color: #4b5563;">مكتب الضرائب بمحافظة حضرموت - الساحل</h4>
            </div>

            <div style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <img src="${TAX_LOGO_URL}" alt="شعار النظام" style="height: 52px; width: auto; object-fit: contain; margin: 0 auto 6px auto; display: block;" />
                <span style="font-size: 12px; color: #8b1e1e; font-weight: 800;">نظام الأرشفة وخدمات المكلفين</span>
            </div>

            <div style="text-align: left;">
                <div style="font-size: 12px; color: #4b5563; margin-bottom: 4px;"><strong>تاريخ التقرير:</strong> ${today}</div>
                <div style="font-size: 12px; color: #4b5563;"><strong>إجمالي المكلفين:</strong> ${totalPayers}</div>
            </div>
        </div>

        <!-- Title -->
        <div style="text-align: center; margin-bottom: 20px; background-color: #fef2f2; padding: 12px; border-radius: 8px; border: 1px solid #fee2e2;">
            <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #781919;">تقرير جميع المكلفين في النظام</h1>
            <p style="margin: 8px 0 0 0; font-size: 13px; font-weight: 600; color: #8b1e1e;">قائمة رسمية بجميع المكلفين المسجلين حتى تاريخه</p>
        </div>

        <!-- Stats Bar -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 22px;">
            <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-top: 3px solid #8b1e1e; padding: 10px; border-radius: 8px; text-align: center;">
                <div style="font-size: 11px; color: #64748b; font-weight: 600;">إجمالي المكلفين</div>
                <div style="font-size: 17px; font-weight: 800; color: #111827; margin-top: 4px;">${totalPayers}</div>
            </div>
            <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-top: 3px solid #8b1e1e; padding: 10px; border-radius: 8px; text-align: center;">
                <div style="font-size: 11px; color: #64748b; font-weight: 600;">أفراد</div>
                <div style="font-size: 17px; font-weight: 800; color: #111827; margin-top: 4px;">${individualCount}</div>
            </div>
            <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-top: 3px solid #8b1e1e; padding: 10px; border-radius: 8px; text-align: center;">
                <div style="font-size: 11px; color: #64748b; font-weight: 600;">شركات</div>
                <div style="font-size: 17px; font-weight: 800; color: #111827; margin-top: 4px;">${companyCount}</div>
            </div>
            <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-top: 3px solid #8b1e1e; padding: 10px; border-radius: 8px; text-align: center;">
                <div style="font-size: 11px; color: #64748b; font-weight: 600;">شركات خيرية</div>
                <div style="font-size: 17px; font-weight: 800; color: #111827; margin-top: 4px;">${charitableCount}</div>
            </div>
        </div>

        <!-- Table -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 13px;">
            <thead>
                <tr style="background-color: #8b1e1e; color: #ffffff;">
                    <th style="padding: 10px 8px; border: 1px solid #8b1e1e; text-align: center; font-weight: 700; width: 40px;">#</th>
                    <th style="padding: 10px 8px; border: 1px solid #8b1e1e; text-align: center; font-weight: 700;">رقم المكلف</th>
                    <th style="padding: 10px 8px; border: 1px solid #8b1e1e; text-align: right; font-weight: 700;">اسم المكلف</th>
                    <th style="padding: 10px 8px; border: 1px solid #8b1e1e; text-align: right; font-weight: 700;">الاسم التجاري</th>
                    <th style="padding: 10px 8px; border: 1px solid #8b1e1e; text-align: center; font-weight: 700;">رقم الهاتف</th>
                    <th style="padding: 10px 8px; border: 1px solid #8b1e1e; text-align: center; font-weight: 700;">نوع المكلف</th>
                </tr>
            </thead>
            <tbody>
                ${rowsHtml.length > 0 ? rowsHtml : `<tr><td colspan="6" style="padding: 20px; text-align: center; color: #9ca3af;">لا يوجد مكلفين مسجلين</td></tr>`}
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
