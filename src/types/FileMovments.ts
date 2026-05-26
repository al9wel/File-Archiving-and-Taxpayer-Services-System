import type { Department } from "./Department"
import type { File } from "./File"
import type { TaxCollector } from "./TaxCollector"
import type { User } from "./User"

// هذا التايب يمثل حركة ملف واحدة (يستخدم عند جلب حركة واحدة حيث تكون البيانات مباشرة داخل data)
export interface FileMovement {
    id: number | string;
    status: "InsideArchive" | "OutsideArchive" | "Missing";
    date: string;
    file: File["fileInfo"];
    taxCollector: TaxCollector;
    department: Department;
    creator: User;
}

// هذا التايب يمثل الرد عند جلب كل حركات الملفات (حيث تكون مصفوفة الحركات داخل أوبجكت filesMovements)
export interface FileMovementsResponse {
    filesMovements: FileMovement[];
}
