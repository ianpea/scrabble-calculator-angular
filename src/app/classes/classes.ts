import {Toast} from "../interfaces/interfaces";

export class ToastPayload implements Toast {
    message: string;
    show: boolean;

    constructor (message: string, show: boolean) {
        this.message = message;
        this.show = show;
    }
}