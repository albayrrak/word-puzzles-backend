import express from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client'
import { shuffle } from "./helpers/global";

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


app.post('/start', async (req, res) => {
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

            return res.json(startGame)

        }

    } catch (error) {
        console.error('Error creating game:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post("/verify", async (req, res) => {
    const { word, gameId } = req.body


    if (gameId) {

        const isVerifyWord = await prisma.game.findFirst({ where: { id: gameId, word: word } })

        if (isVerifyWord.level === 7) {
            await prisma.game.update({ where: { id: gameId }, data: { status: false } })
            return res.json({ msg: "Oyun bitti" }).status(200)

        }

        if (isVerifyWord && isVerifyWord.status) {
            const randomWord = await prisma.word.findMany()

            const isVerifyWordIndex = randomWord.findIndex((x) => x.word === isVerifyWord.word)

            let randomRecord = randomWord.length - 1 === isVerifyWordIndex ? randomWord[0] : randomWord[isVerifyWordIndex + 1];

            const shuffleWord = shuffle(randomRecord.word)

            const score = isVerifyWord.score + randomRecord.word.split("").length * 10

            const level = isVerifyWord.level + 1



            const findGame = await prisma.game.update({ where: { id: gameId }, data: { word: randomRecord.word, wordShuffle: shuffleWord, score: score, level: level } })

            return res.json(findGame)


        } else {
            res.status(404).json({ success: false, message: 'Eşleşme bulunamadı.' });
        }

    }
})

app.get("/game/:id", async (req, res) => {

    try {
        const { id } = req.query
        const getGame = await prisma.game.findFirst({ where: { id: id as string }, include: { player: true } })
        res.json(getGame)

    } catch (error) {
        throw new Error()
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
