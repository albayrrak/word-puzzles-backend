import { Response } from "express"



interface Json<T> {
    success: boolean;
    data: {
        gameStatus?: boolean;
        wordStatus?: boolean;
        game?: T;
    };
}

type Send<T, R> = (body?: Json<T>) => R;

export interface CustomResponse<T> extends Response {
    json: Send<T, this>;
}
