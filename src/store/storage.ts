// @ts-ignore
import idbStorage from "redux-persist-indexeddb-storage";
import { IDB_NAME, REDUX_IDB_NAME } from "./constants";

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

const storage = typeof window !== "undefined" ? idbStorage(REDUX_IDB_NAME) : createNoopStorage();

export default storage;