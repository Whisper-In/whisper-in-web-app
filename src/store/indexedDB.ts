import Dexie, { Table } from "dexie";
import { IDB_NAME } from "./constants";

export interface Audio {
    id?: number,
    chatId: string,
    arrayBuffer: ArrayBuffer,
}

export class WhisperInDexie extends Dexie {
    audios!: Table<Audio>;

    constructor() {
        super(IDB_NAME);

        this.version(1).stores({
            audios: '++id, id, chatId, [chatId+id]'
        })
    }
}

export const idb = new WhisperInDexie();