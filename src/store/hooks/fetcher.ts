import axios from "axios";

export const fetcher = async (url: string) => axios.get(url).then((result) => result.data);

export const getKey = <T>(url: string, pageIndex: number, previousData: T[], params: URLSearchParams) => {
    if (previousData && !previousData.length) return null;

    if (params.has("pageIndex")) {
        params.set("pageIndex", pageIndex.toString());
    } else {
        params.append("pageIndex", pageIndex.toString());
    }

    return `${url}?${params}`;
}

export const getKeyForObject = <T>(url: string, pageIndex: number, previousData: any, dataKey: string, params: URLSearchParams) => {
    if (previousData && !previousData[dataKey]?.length) return null;

    if (params.has("pageIndex")) {
        params.set("pageIndex", pageIndex.toString());
    } else {
        params.append("pageIndex", pageIndex.toString());
    }

    return `${url}?${params}`;
}