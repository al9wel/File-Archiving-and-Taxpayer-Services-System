import type { File } from "./File"
export interface Attachment {
    id: string | number,
    title: string,
    attachmentFile: string,
    file: File["fileInfo"],
}