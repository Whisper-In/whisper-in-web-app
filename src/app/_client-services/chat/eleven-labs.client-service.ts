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