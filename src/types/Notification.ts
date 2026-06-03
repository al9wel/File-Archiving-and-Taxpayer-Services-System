import type { User } from "./User";

export interface Notification {

    id: number | string,
    title: string,
    description: string,
    notificationType: "General" | "ForSystemUsers" | "ForTaxPayers" | "Special",
    receiverPhone: string,
    sendBy: User
}

