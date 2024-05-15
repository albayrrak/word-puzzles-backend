export type GameResponseModel = {
    id: string;
    score: number;
    word: string;
    wordShuffle: string;
    status: boolean;
    level: number;
    playerId: string;
    player: {
        id: string;
        username: string;
    }

}