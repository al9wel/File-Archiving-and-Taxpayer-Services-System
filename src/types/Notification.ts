import type { User } from "./User";

export interface Notification {

    id: number | string,
    title: string,
    description: string,
    notificationType: "General" | "ForSystemUsers" | "ForTaxPayers" | "Special",
    receiverPhone: string,
    sendBy: User
}
export type NotifiacationStore={
    notifications: Notification[],
    total_count: number|string,
    type_counts:{
        ForSystemUsers: number,
        ForTaxPayers: number|string,
        General: number|string,
        Special: number|string,
    }
}
