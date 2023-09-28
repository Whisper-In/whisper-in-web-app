import axiosInstance from "../axios";

const route = "eleven-labs"

export const getTextToSpeech = async (profileId: string, text: string) => {
    try {        
        const result = await axiosInstance.post<Blob>(
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