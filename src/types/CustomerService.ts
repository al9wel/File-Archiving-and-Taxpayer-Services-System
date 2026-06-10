import { Timestamp } from "firebase/firestore";

export interface Chat {
  id: string;
  userId: string;
  userName: string;
  lastMessage: string;
  updatedAt: Timestamp | null;
}

export interface Message {
  id: string;
  message: string;
  userName: string;
  senderType: "user" | "admin";
  createdAt: Timestamp | null;
}
