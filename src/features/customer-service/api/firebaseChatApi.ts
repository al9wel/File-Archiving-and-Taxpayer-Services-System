import { collection, doc, query, orderBy, onSnapshot, addDoc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Chat, Message } from '@/types/CustomerService';

const CHATS_COLLECTION = 'chats';
const MESSAGES_COLLECTION = 'messages';

export const firebaseChatApi = {

  subscribeToChats: (callback: (chats: Chat[]) => void) => {
    const q = query(collection(db, CHATS_COLLECTION), orderBy('updatedAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const chats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Chat));
      callback(chats);
    });
  },

  getChat: async (chatId: string): Promise<Chat | null> => {
    const docRef = doc(db, CHATS_COLLECTION, chatId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Chat;
    }
    return null;
  },


  subscribeToMessages: (chatId: string, callback: (messages: Message[]) => void) => {
    const q = query(
      collection(db, `${CHATS_COLLECTION}/${chatId}/${MESSAGES_COLLECTION}`),
      orderBy('createdAt', 'asc')
    );
    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
      callback(messages);
    });
  },

  sendMessage: async (chatId: string, messageText: string, userName: string, senderType: 'admin' | 'user' = 'admin') => {
    const messageData = {
      message: messageText,
      userName,
      senderType,
      createdAt: serverTimestamp(),
    };

    const messagesRef = collection(db, `${CHATS_COLLECTION}/${chatId}/${MESSAGES_COLLECTION}`);
    await addDoc(messagesRef, messageData);

    const chatRef = doc(db, CHATS_COLLECTION, chatId);
    await updateDoc(chatRef, {
      lastMessage: messageText,
      updatedAt: serverTimestamp(),
    });
  }
};
