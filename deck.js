export default class Deck {

    deck = [];
    // יצירת חבילה
    createDeck() {
        const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        const shapes = ['H', 'D', 'S', 'C'];

        shapes.forEach((shape) => {
            numbers.forEach((number) => {
                this.deck.push({ shape: shape, number: number });
            })
        })

        return this.deck
    }
}