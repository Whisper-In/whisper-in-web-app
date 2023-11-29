import axios from "axios";

export const fetcher = async (url: string) => axios.get(url).then((result) => result.data);