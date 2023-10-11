import { idb } from "@/store/indexedDB";
import axios from "axios";

const route = "/api/eleven-labs";

export async function getTextToSpeech(profileId: string, text: string) {
    try {
        const result = await axios.post<ArrayBuffer>(
            `${route}/text-to-speech/${profileId}`,
            { text },
            {
                responseType: "arraybuffer"
            });
        return result.data;
    } catch (error) {
        throw error;
    }
}

export async function getTextToSpeechStoreInIDB(profileId: string, text: string, chatId: string, messageId: string) {
    try {
        const result = await axios.post<ArrayBuffer>(
            `${route}/text-to-speech/${profileId}`,
            { text },
            {
                responseType: "arraybuffer"
            });

        const messageAudio = await idb.audios.where(["chatId", "messageId"]).equals([chatId, messageId]).first();
        if (!messageAudio) {
            await idb.audios.add({
                chatId,
                messageId,
                arrayBuffer: result.data
            });
        } else {
            await idb.audios.update(messageAudio.id!, {
                arrayBuffer: result.data
            });
        }

        return result.data;
    } catch (error) {
        throw error;
    }
}