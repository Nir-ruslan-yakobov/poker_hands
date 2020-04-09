export default class Player {
    // מאפייני שחקן
    constructor(name, cards = [], score = [], countedHand = []) {
        this.name = name;
        this.cards = cards;
        this.score = score;
        this.countedHand = countedHand;
    }
}