import type { File } from "@/types/File";
import { escapeHtml, formatArabicDate, getFileTypeLabel, formatUrlOrText, TAX_LOGO_URL } from "../pdfHelpers";

export function generateSingleFileHtmlTemplate(file: File["fileInfo"]): string {
    const today = formatArabicDate();

    const fileId = escapeHtml(file.id);
    const taxNumber = escapeHtml(file.taxNumber);
    const inventoryNumber = escapeHtml(file.inventoryNumber);
    const activityStartDate = escapeHtml(formatArabicDate(file.activityStartDate));
    const docsCount = escapeHtml(file.docsCount);
    const note = escapeHtml(file.note || "لا توجد ملاحظات");

    const tradeName = escapeHtml(file.taxPayer?.tradeName);
    const fileType = escapeHtml(getFileTypeLabel(file.taxPayer?.fileType));
    const commercialRecordHtml = formatUrlOrText(file.taxPayer?.commercialRecord);
    const activityLicenseHtml = formatUrlOrText(file.taxPayer?.activityLicense);
    const source = escapeHtml(file.taxPayer?.source);

    const departmentName = escapeHtml(file.department?.name);
    const statusName = escapeHtml(file.fileStatus?.statusName);
    const activityTypeName = escapeHtml(file.activityType?.name);
    const paymentTypeName = escapeHtml(file.paymentType?.name);
    const regionName = escapeHtml(file.region?.name);
    const districtName = escapeHtml(file.district?.name);
    const fullAddress = escapeHtml(file.fullAddress);

    const creatorName = escapeHtml(
        file.creator
            ? `${file.creator.firstName || ""} ${file.creator.lastName || ""}`.trim() || file.creator.userName
            : "-"
    );

    return `
    <div style="width: 100%; box-sizing: border-box; padding: 30px; font-family: 'Almarai', sans-serif; direction: rtl; background-color: #ffffff; color: #111827;">
        
        <!-- Official Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #8b1e1e; padding-bottom: 16px; margin-bottom: 20px;">
            <div style="text-align: right;">
                <h3 style="margin: 0; font-size: 13px; font-weight: 700; color: #8b1e1e;">الجمهورية اليمنية</h3>
                <h4 style="margin: 4px 0 0 0; font-size: 12px; font-weight: 600; color: #374151;">وزارة المالية - مصلحة الضرائب</h4>
                <h4 style="margin: 2px 0 0 0; font-size: 12px; font-weight: 600; color: #4b5563;">مكتب الضرائب بمحافظة حضرموت - الساحل</h4>
            </div>

            <div style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <img src="${TAX_LOGO_URL}" alt="شعار النظام" style="height: 48px; width: auto; object-fit: contain; margin: 0 auto 5px auto; display: block;" />
                <span style="font-size: 11px; color: #8b1e1e; font-weight: 800;">نظام الأرشفة وخدمات المكلفين</span>
            </div>

            <div style="text-align: left;">
                <div style="font-size: 11px; color: #4b5563; margin-bottom: 3px;"><strong>تاريخ إصدار التقرير:</strong> ${today}</div>
                <div style="font-size: 11px; color: #4b5563;"><strong>رقم الملف:</strong> ${fileId}</div>
            </div>
        </div>

        <!-- Title -->
        <div style="text-align: center; margin-bottom: 20px; background-color: #fef2f2; padding: 12px; border-radius: 8px; border: 1px solid #fee2e2;">
            <h1 style="margin: 0; font-size: 19px; font-weight: 800; color: #781919;">تقرير تفصيلي لملف المكلف</h1>
            <p style="margin: 8px 0 0 0; font-size: 13px; font-weight: 700; color: #8b1e1e;">${tradeName}</p>
        </div>

        <!-- Section 1: Basic File Info -->
        <div style="margin-bottom: 20px;">
            <div style="background-color: #8b1e1e; color: #ffffff; padding: 7px 12px; font-size: 13px; font-weight: 700; border-radius: 6px 6px 0 0;">
                أولاً: بيانات الملف الأرشيفي
            </div>
            <div style="border: 1px solid #e2e8f0; border-top: none; padding: 14px; border-radius: 0 0 6px 6px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; font-size: 12px;">
                <div><span style="color: #6b7280; font-weight: 600;">رقم الملف:</span> <strong style="color: #111827;">${fileId}</strong></div>
                <div><span style="color: #6b7280; font-weight: 600;">الرقم الضريبي:</span> <strong style="color: #111827;">${taxNumber}</strong></div>
                <div><span style="color: #6b7280; font-weight: 600;">رقم الحصر:</span> <strong style="color: #111827;">${inventoryNumber}</strong></div>
                <div><span style="color: #6b7280; font-weight: 600;">حالة الملف:</span> <span style="display: inline-flex; align-items: center; justify-content: center; line-height: 1.2; padding: 3px 8px; font-size: 11px; font-weight: 700; border-radius: 10px; background-color: #fef2f2; color: #8b1e1e; border: 1px solid #fecaca; vertical-align: middle;">${statusName}</span></div>
                <div><span style="color: #6b7280; font-weight: 600;">تاريخ بدء النشاط:</span> <strong style="color: #111827;">${activityStartDate}</strong></div>
                <div><span style="color: #6b7280; font-weight: 600;">عدد الوثائق:</span> <strong style="color: #111827;">${docsCount}</strong></div>
            </div>
        </div>

        <!-- Section 2: Taxpayer Info -->
        <div style="margin-bottom: 20px;">
            <div style="background-color: #8b1e1e; color: #ffffff; padding: 7px 12px; font-size: 13px; font-weight: 700; border-radius: 6px 6px 0 0;">
                ثانياً: بيانات المكلف والترخيص
            </div>
            <div style="border: 1px solid #e2e8f0; border-top: none; padding: 14px; border-radius: 0 0 6px 6px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 12px;">
                <div><span style="color: #6b7280; font-weight: 600;">الاسم التجاري:</span> <strong style="color: #111827;">${tradeName}</strong></div>
                <div><span style="color: #6b7280; font-weight: 600;">نوع المكلف:</span> <strong style="color: #111827;">${fileType}</strong></div>
                <div><span style="color: #6b7280; font-weight: 600;">السجل التجاري:</span> <strong style="color: #111827;">${commercialRecordHtml}</strong></div>
                <div><span style="color: #6b7280; font-weight: 600;">ترخيص النشاط:</span> <strong style="color: #111827;">${activityLicenseHtml}</strong></div>
                <div style="grid-column: span 2;"><span style="color: #6b7280; font-weight: 600;">المصدر:</span> <strong style="color: #111827;">${source}</strong></div>
            </div>
        </div>

        <!-- Section 3: Location & Classification -->
        <div style="margin-bottom: 20px;">
            <div style="background-color: #8b1e1e; color: #ffffff; padding: 7px 12px; font-size: 13px; font-weight: 700; border-radius: 6px 6px 0 0;">
                ثالثاً: التصنيف والجغرافيا
            </div>
            <div style="border: 1px solid #e2e8f0; border-top: none; padding: 14px; border-radius: 0 0 6px 6px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 12px;">
                <div><span style="color: #6b7280; font-weight: 600;">القسم:</span> <strong style="color: #111827;">${departmentName}</strong></div>
                <div><span style="color: #6b7280; font-weight: 600;">نوع النشاط:</span> <strong style="color: #111827;">${activityTypeName}</strong></div>
                <div><span style="color: #6b7280; font-weight: 600;">نوع السداد:</span> <strong style="color: #111827;">${paymentTypeName}</strong></div>
                <div><span style="color: #6b7280; font-weight: 600;">المنطقة / الحي:</span> <strong style="color: #111827;">${regionName} - ${districtName}</strong></div>
                <div style="grid-column: span 2;"><span style="color: #6b7280; font-weight: 600;">العنوان الكامل:</span> <strong style="color: #111827;">${fullAddress}</strong></div>
            </div>
        </div>

        <!-- Section 4: Notes & Metadata -->
        <div style="margin-bottom: 24px;">
            <div style="background-color: #f8fafc; color: #334155; padding: 6px 12px; font-size: 12px; font-weight: 700; border-radius: 6px 6px 0 0; border: 1px solid #cbd5e1;">
                رابعاً: الملاحظات والبيانات الإدارية
            </div>
            <div style="border: 1px solid #cbd5e1; border-top: none; padding: 12px; border-radius: 0 0 6px 6px; font-size: 12px; color: #334155;">
                <div style="margin-bottom: 8px;"><strong>الملاحظات:</strong> ${note}</div>
                <div><strong>منشئ الملف:</strong> ${creatorName}</div>
            </div>
        </div>

        <!-- Signatures & Stamp Box -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 30px; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
            <div style="text-align: center; width: 200px;">
                <div style="font-size: 12px; font-weight: 700; color: #374151; margin-bottom: 45px;">توقيع الموظف المختص</div>
                <div style="border-bottom: 1px solid #9ca3af; width: 100%;"></div>
            </div>
            <div style="text-align: center; width: 160px;">
                <div style="height: 70px; border: 2px dashed #8b1e1e; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #8b1e1e; font-size: 11px; font-weight: 600;">
                    ختم المكتب الرسمي
                </div>
            </div>
            <div style="text-align: center; width: 200px;">
                <div style="font-size: 12px; font-weight: 700; color: #374151; margin-bottom: 45px;">اعتماد مدير القسم</div>
                <div style="border-bottom: 1px solid #9ca3af; width: 100%;"></div>
            </div>
        </div>

        <!-- Footer -->
        <div style="margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 10px; text-align: center; font-size: 10px; color: #94a3b8;">
            إدارة الضرائب بساحل حضرموت — وثيقة أرشيفية رسمية مولدة من نظام الأرشفة وخدمات المكلفين
        </div>

    </div>
    `;
}

