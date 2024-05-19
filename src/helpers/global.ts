export function shuffle(word: string) {
    const letters = word.split('');

    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }

    const shuffledWord = letters.join('');

    return shuffledWord;
}
