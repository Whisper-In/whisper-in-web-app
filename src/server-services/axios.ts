import axios from "axios"
import { cookies } from "next/headers"
import deepmerge from "deepmerge";

console.log(process.env.SERVICE_URL);

const axiosInstance = axios.create({
    baseURL: process.env.SERVICE_URL
});

axiosInstance.interceptors.request.use((config) => {
    const token = cookies().get("token")?.value;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
export default axiosInstance;

class FetchClientInterceptor<T> {
    getValue?: (value: T) => T;

    constructor() {

    }

    use(getValue: (value: T) => T) {
        this.getValue = getValue;
    }
}

class FetchClient {
    baseURL?: string;
    defaultInit?: RequestInit;
    interceptors = {
        request: new FetchClientInterceptor<RequestInit>()
    }

    constructor(opts: {
        baseURL?: string,
        defaultInit?: RequestInit
    }) {
        this.baseURL = opts.baseURL;
        this.defaultInit = opts.defaultInit;
    }

    fetch<T>(input: string, init?: RequestInit) {
        if (input.toString().slice(0, 1) !== '/') {
            input = `/${input}`;
        }

        if (this.interceptors.request.getValue) {
            const requestInterceptorInit = this.interceptors.request.getValue({});
            init = deepmerge(init ?? {}, requestInterceptorInit)
        }

        const url = this.baseURL ? `${this.baseURL}${input}` : input;
        return fetch(url, deepmerge(this.defaultInit ?? {}, init ?? {}))
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                return response.json() as Promise<T>
            });
    }
}

export const fetchInstance = new FetchClient({
    baseURL: process.env.SERVICE_URL
});

fetchInstance.interceptors.request.use((config) => {
    const token = cookies().get("token")?.value;

    if (token) {
        config.headers = {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }

    return config;
})