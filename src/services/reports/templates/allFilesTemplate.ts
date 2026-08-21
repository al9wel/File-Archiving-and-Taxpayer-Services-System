import type { File } from "@/types/File";
import { escapeHtml, formatArabicDate, getFileTypeLabel } from "../pdfHelpers";

export function generateAllFilesHtmlTemplate(files: File["fileInfo"][]): string {
    const today = formatArabicDate();
    const totalFiles = files.length;

    const rowsHtml = files
        .map((f, index) => {
            const fileId = escapeHtml(f.id);
            const tradeName = escapeHtml(f.taxPayer?.tradeName);
            const activityName = escapeHtml(f.activityType?.name);
            const fileType = escapeHtml(getFileTypeLabel(f.taxPayer?.fileType));
            const statusName = escapeHtml(f.fileStatus?.statusName);
            const regionName = escapeHtml(f.region?.name);
            const districtName = escapeHtml(f.district?.name);
            const departmentName = escapeHtml(f.department?.name);
            const location = `${regionName} / ${districtName}`;

            return `
                <tr style="${index % 2 === 1 ? "background-color: #f9fafb;" : ""}">
                    <td style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; text-align: center; font-weight: 600; color: #4b5563;">${index + 1}</td>
                    <td style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; text-align: center; font-weight: 700; color: #111827;">${fileId}</td>
                    <td style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; color: #1f2937;">${tradeName}</td>
                    <td style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #374151;">${activityName}</td>
                    <td style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">
                        <span style="display: inline-block; padding: 3px 10px; font-size: 11px; font-weight: 600; border-radius: 12px; background-color: #f3f4f6; color: #374151; border: 1px solid #d1d5db;">${fileType}</span>
                    </td>
                    <td style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">
                        <span style="display: inline-block; padding: 3px 10px; font-size: 11px; font-weight: 600; border-radius: 12px; background-color: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd;">${statusName}</span>
                    </td>
                    <td style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #4b5563; font-size: 12px;">${location}</td>
                    <td style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #4b5563; font-size: 12px;">${departmentName}</td>
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
                <div style="font-size: 12px; color: #4b5563;"><strong>إجمالي الملفات:</strong> ${totalFiles}</div>
            </div>
        </div>

        <!-- Title -->
        <div style="text-align: center; margin-bottom: 24px; background-color: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #1e293b;">تقرير جميع الملفات في النظام</h1>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">قائمة رسمية بجميع ملفات المكلفين المسجلة حتى تاريخه</p>
        </div>

        <!-- Table -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 13px;">
            <thead>
                <tr style="background-color: #1e3a8a; color: #ffffff;">
                    <th style="padding: 10px 8px; border: 1px solid #1e3a8a; text-align: center; font-weight: 700; width: 40px;">#</th>
                    <th style="padding: 10px 8px; border: 1px solid #1e3a8a; text-align: center; font-weight: 700;">رقم الملف</th>
                    <th style="padding: 10px 8px; border: 1px solid #1e3a8a; text-align: right; font-weight: 700;">اسم المكلف</th>
                    <th style="padding: 10px 8px; border: 1px solid #1e3a8a; text-align: right; font-weight: 700;">نوع النشاط</th>
                    <th style="padding: 10px 8px; border: 1px solid #1e3a8a; text-align: center; font-weight: 700;">نوع الملف</th>
                    <th style="padding: 10px 8px; border: 1px solid #1e3a8a; text-align: center; font-weight: 700;">حالة الملف</th>
                    <th style="padding: 10px 8px; border: 1px solid #1e3a8a; text-align: right; font-weight: 700;">المنطقة / الحي</th>
                    <th style="padding: 10px 8px; border: 1px solid #1e3a8a; text-align: right; font-weight: 700;">القسم</th>
                </tr>
            </thead>
            <tbody>
                ${rowsHtml.length > 0 ? rowsHtml : `<tr><td colspan="8" style="padding: 20px; text-align: center; color: #9ca3af;">لا توجد ملفات مسجلة</td></tr>`}
            </tbody>
        </table>

        <!-- Footer -->
        <div style="border-top: 1px solid #e2e8f0; padding-top: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #64748b;">
            <div>إدارة الضرائب بساحل حضرموت — نظام أرشفة الملفات وخدمات المكلفين</div>
            <div>تم التوليد تلقائيًا من النظام</div>
        </div>

    </div>
    `;
}
