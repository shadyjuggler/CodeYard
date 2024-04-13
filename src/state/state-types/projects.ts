import { Cell } from "./cell";

export interface Projects {
    [id: string]: {
        title: string | "",
        descr: string | "",
        DOC: string;
        order: string[];
        data: {
            [key: string]: Cell
        }
    }
}