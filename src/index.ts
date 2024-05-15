import express from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client'
import { shuffle } from "./helpers/global";
import { CustomResponse } from "models/responseModel";
import { GameResponseModel } from "models/global";

const prisma = new PrismaClient()

const app = express()

// Middleware
app.use(express.json())
app.use(cors())


const words = [
    {
        word: "Masal"
    },
    {
        word: "Kale"
    },
    {
        word: "Yaprak"
    },
    {
        word: "Gökyüzü"
    },
    {
        word: "Mürekkep"
    },
    {
        word: "Serçe"
    },
    {
        word: "Deniz"
    },
    {
        word: "Gülümseme"
    },
    {
        word: "İstasyon"
    },
    {
        word: "Akvaryum"
    },
    {
        word: "Rüzgar"
    },
    {
        word: "Çekiç"
    },
    {
        word: "Parmak"
    },
    {
        word: "Buzul"
    },
]


app.post('/start', async (req, res: CustomResponse<{ gameId: string }>) => {
    try {
        const { username } = req.body

        if (username) {
            const randomWord = await prisma.word.findMany()

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

        }

    } catch (error) {
        console.error('Error creating game:', error);
        res.status(500);
    }
});

app.post("/verify", async (req, res: CustomResponse<null>) => {
    try {
        const { word, gameId } = req.body

        const isVerifyWord = await prisma.game.findFirst({ where: { id: gameId, word: word } })

        if (isVerifyWord && isVerifyWord.level === 7) {
            await prisma.game.update({ where: { id: gameId }, data: { status: false } })
            return res.json({ data: { gameStatus: false }, success: true }).status(200)
        }

        if (isVerifyWord && isVerifyWord.status) {
            const randomWord = await prisma.word.findMany()

            const isVerifyWordIndex = randomWord.findIndex((x) => x.word === isVerifyWord.word)

            let randomRecord = randomWord.length - 1 === isVerifyWordIndex ? randomWord[0] : randomWord[isVerifyWordIndex + 1];

            const shuffleWord = shuffle(randomRecord.word)

            const score = isVerifyWord.score + randomRecord.word.split("").length * 10

            const level = isVerifyWord.level + 1

            await prisma.game.update({ where: { id: gameId }, data: { word: randomRecord.word, wordShuffle: shuffleWord, score: score, level: level } })

            res.json({ data: { wordStatus: true, gameStatus: true }, success: true }).status(200)

        } else {

            res.json({ data: { wordStatus: false, gameStatus: true }, success: true }).status(404)
        }





    } catch (error) {
        res.status(500)
    }
})

app.post("/game", async (req, res: CustomResponse<GameResponseModel>) => {

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

})

app.post("/finish", async (req, res) => {
    try {
        const { gameId } = req.body

        if (gameId) {
            const game = await prisma.game.update({ where: { id: gameId }, data: { status: false } })
            res.json({ Data: null, Success: true, GameStatus: false }).status(200)

        }
    } catch (error) {

    }

})

app.get("/rank", async (req, res) => {
    const rank = await prisma.game.findMany({ orderBy: { score: "desc" }, take: 2 })
    res.json(rank)


})

app.post("/add-word", async (req, res) => {
    const addWord = await prisma.word.createMany({
        data: words
    })

    return res.json(addWord)

})


const start = async () => {
    try {
        await prisma.$connect()

        app.listen("5000", () => {
            console.log("server is running");
        })
    } catch (error) {
        await prisma.$disconnect()

        console.log(error);

    }
}

start()
