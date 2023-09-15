import Dexie, { Table } from "dexie";
import { IDB_NAME } from "./constants";

export interface Audio {
    id?: number,
    arrayBuffer: ArrayBuffer,
}

export class WhisperInDexie extends Dexie {
    audios!: Table<Audio>;

    constructor() {
        super(IDB_NAME);

        this.version(1).stores({
            audios: '++id, name, age'
        })
    }
}

export const idb = new WhisperInDexie();