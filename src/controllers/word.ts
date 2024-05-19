import { Request } from "express";
import { CustomResponse } from "../models/responseModel";
import { PrismaClient } from '@prisma/client'
import { shuffle } from "../helpers/global";
import { GameResponseModel } from "../models/global";

const prisma = new PrismaClient()

export const startGame = async (req: Request, res: CustomResponse<{ gameId: string }>) => {
    try {
        const { username, lang } = req.body

        if (username) {
            const randomWord = await prisma.word.findMany({ where: { lang: lang } })

            const randomIndex = Math.floor(Math.random() * randomWord.length);

            const randomRecord = randomWord[randomIndex];

            const shuffleWord = shuffle(randomRecord.word)

            const createUser = await prisma.player.create({
                data: {
                    username: username
                }
            })

            const startGame = await prisma.game.create({
                data: {
                    playerId: createUser.id,
                    word: randomRecord.word,
                    wordShuffle: shuffleWord
                }

            })

            return res.json({ data: { game: { gameId: startGame.id } }, success: true }).status(200)

        } else {
            return res.json({ data: { game: null }, success: false }).status(200)
        }

    } catch (error) {
        console.error('Error creating game:', error);
        res.status(500);
    }
}

export const verifyWord = async (req: Request, res: CustomResponse<null>) => {
    try {
        const { word, gameId, lang } = req.body


        const isVerifyWord = await prisma.game.findFirst({ where: { id: gameId, word: word } })

        if (isVerifyWord && isVerifyWord.level === 7) {
            await prisma.game.update({ where: { id: gameId }, data: { status: false } })
            return res.json({ data: { gameStatus: false }, success: true }).status(200)
        }

        if (isVerifyWord && isVerifyWord.status) {
            const randomWord = await prisma.word.findMany({ where: { lang: lang } })

            const isVerifyWordIndex = randomWord.findIndex((x: any) => x.word === isVerifyWord.word)

            let randomRecord = randomWord.length - 1 === isVerifyWordIndex ? randomWord[0] : randomWord[isVerifyWordIndex + 1];
            console.log(randomRecord.word);


            const shuffleWord = shuffle(randomRecord.word)

            const score = (isVerifyWord.word.split("").length * 10) + isVerifyWord.score

            const level = isVerifyWord.level + 1

            await prisma.game.update({ where: { id: gameId }, data: { word: randomRecord.word, wordShuffle: shuffleWord, score: score, level: level } })

            res.json({ data: { wordStatus: true, gameStatus: true }, success: true }).status(200)

        } else {

            res.json({ data: { wordStatus: false, gameStatus: true }, success: true }).status(404)
        }





    } catch (error) {
        res.status(500)
    }
}

export const getGame = async (req: Request, res: CustomResponse<GameResponseModel>) => {
    try {
        const { id } = req.body
        const game = await prisma.game.findFirst({ where: { id: id as string }, include: { player: true } })

        if (game && game.status) {
            res.json({ data: { game: game }, success: true }).status(200)
        } else {
            res.json({ data: { game: null }, success: true }).status(200)

        }

    } catch (error) {
        throw new Error()
    }

}

export const finishGame = async (req: Request, res: CustomResponse<GameResponseModel>) => {
    try {
        const { gameId } = req.body

        if (gameId) {
            await prisma.game.update({ where: { id: gameId }, data: { status: false } })

            res.json({ data: { game: null, wordStatus: false, gameStatus: false }, success: true }).status(200)

        } else {
            res.json({ data: { game: null, wordStatus: false, gameStatus: false }, success: false }).status(200)
        }
    } catch (error) {
        res.json({ data: { game: null, wordStatus: false, gameStatus: false }, success: false }).status(500)

    }
}

export const getTopRank = async (req: Request, res: CustomResponse<GameResponseModel[]>) => {
    try {
        const { count } = req.body
        const rank = await prisma.game.findMany({ orderBy: { score: "desc" }, take: count, include: { player: true } })
        if (rank) {
            res.json({ data: { game: rank, gameStatus: false, wordStatus: false }, success: true, }).status(200)
        } else {
            res.json({ data: null, success: false }).status(200)
        }

    } catch (error) {
        res.json().status(500)
    }
}

