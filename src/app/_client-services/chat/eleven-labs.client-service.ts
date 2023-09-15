import axios from "axios";

const route = "/api/eleven-labs";

export async function getTextToSpeech(aiProfileId: string, text: string) {
    try {
        const result = await axios.post<ArrayBuffer>(
            `${route}/text-to-speech/${aiProfileId}`,
            { text },
            {
                responseType: "arraybuffer"
            });

        console.log(result.data)

        return result.data;
    } catch (error) {
        throw error;
    }
}