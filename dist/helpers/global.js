"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffle = void 0;
function shuffle(word) {
    const letters = word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    const shuffledWord = letters.join('');
    return shuffledWord;
}
exports.shuffle = shuffle;
//# sourceMappingURL=global.js.map