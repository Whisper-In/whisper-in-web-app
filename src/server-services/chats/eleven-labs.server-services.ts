import axiosInstance from "../axios";

const route = "eleven-labs"

export const getTextToSpeech = async (aiProfileId: string, text: string) => {
    try {
        const result = await axiosInstance.post<Blob>(
            `${route}/text-to-speech/${aiProfileId}`,
            { text },
            {
                responseType: "arraybuffer"
            });

        return result.data;
    } catch (error) {
        throw error;
    }
}