// @ts-ignore
import idbStorage from "redux-persist-indexeddb-storage";

const createNoopStorage = () => ({
    getItem(_key: any) {
        return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
        return Promise.resolve(value);
    },
    removeItem(_key: any) {
        return Promise.resolve();
    }
});

const storage = typeof window !== "undefined" ? idbStorage('whisperin_db') : createNoopStorage();

export default storage;