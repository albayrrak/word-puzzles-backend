"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const word_1 = require("./controllers/word");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT || 8080;
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
];
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
app.post('/start', word_1.startGame);
app.post("/verify", word_1.verifyWord);
app.post("/game", word_1.getGame);
app.post("/finish", word_1.finishGame);
app.post("/rank", word_1.getTopRank);
app.post("/add-word", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wordsLowerCase = wordsEn.map((x) => {
        let test = x.word.toLowerCase();
        return {
            word: test,
            lang: "en"
        };
    });
    const addWord = yield prisma.word.createMany({
        data: wordsLowerCase
    });
}));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("test");
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.$connect();
        app.listen(port, () => {
            console.log("server is running");
        });
    }
    catch (error) {
        yield prisma.$disconnect();
        console.log(error);
    }
});
start();
//# sourceMappingURL=index.js.map