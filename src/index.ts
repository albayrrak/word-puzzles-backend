import express from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client'
import { shuffle } from "./helpers/global";
import { CustomResponse } from "models/responseModel";
import { GameResponseModel } from "models/global";
import { finishGame, getGame, getTopRank, startGame, verifyWord } from "./controllers/word";

const prisma = new PrismaClient()

const app = express()

// Middleware
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 8080



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

const wordsEn = [
    { word: "Apple", lang: "en" },
    { word: "Banana", lang: "en" },
    { word: "Computer", lang: "en" },
    { word: "Mountain", lang: "en" },
    { word: "Library", lang: "en" },
    { word: "Elephant", lang: "en" },
    { word: "Garden", lang: "en" },
    { word: "Pencil", lang: "en" },
    { word: "Rainbow", lang: "en" },
    { word: "School", lang: "en" },
    { word: "Television", lang: "en" },
    { word: "Umbrella", lang: "en" },
    { word: "Village", lang: "en" },
    { word: "Window", lang: "en" }
];

app.post('/start', startGame);

app.post("/verify", verifyWord)

app.post("/game", getGame)

app.post("/finish", finishGame)

app.post("/rank", getTopRank)

app.post("/add-word", async (req, res) => {
    const wordsLowerCase = wordsEn.map((x) => {
        let test = x.word.toLowerCase()

        return {
            word: test,
            lang: "en"
        }
    })

    const addWord = await prisma.word.createMany({
        data: wordsLowerCase
    })

})

app.get("/", async (req, res) => {
    res.send("test")
})

const start = async () => {
    try {
        await prisma.$connect()

        app.listen(port, () => {
            console.log("server is running");
        })
    } catch (error) {
        await prisma.$disconnect()

        console.log(error);

    }
}

start()
