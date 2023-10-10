import Dexie, { Table } from "dexie";
import { IDB_NAME } from "./constants";

export interface Audio {
    id?: number,
    chatId: string,
    messageId: string,
    arrayBuffer: ArrayBuffer,
}

export class WhisperInDexie extends Dexie {
    audios!: Table<Audio>;

    constructor() {
        super(IDB_NAME);

        this.version(2).stores({
            audios: '++id, id, [chatId+messageId]'
        })
    }
}

export const idb = new WhisperInDexie();