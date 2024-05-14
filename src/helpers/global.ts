export function shuffle(word: string) {
    // Kelimeyi diziye dönüştür
    const letters = word.split('');

    // // Diziyi karıştır
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }

    // // Karıştırılmış diziyi birleştirerek yeni kelimeyi oluştur
    const shuffledWord = letters.join('');

    return shuffledWord;
}
