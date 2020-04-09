

export default class Game {

    static levels = [
        {
            rank: 1, level: 'Hight card'
        },
        {
            rank: 2, level: 'Pair'
        },
        {
            rank: 3, level: 'Two pair'
        },
        {
            rank: 4, level: 'Set'
        },
        {
            rank: 5, level: 'Straight'
        },
        {
            rank: 6, level: 'Flash'
        },
        {
            rank: 7, level: 'Full house'
        },
        {
            rank: 8, level: 'Kare'
        },
        {
            rank: 9, level: 'Straight flash'
        },
        {
            rank: 10, level: 'Royla flash'
        }
    ];

    constructor(deck = [], players = []) {
        this.players = players;
        this.deck = deck;
        this.suffle();
    }


    // עירבוב החבילה
    async suffle() {

        let count = this.deck.length - 1;
        let temp;

        while (count > 0) {
            let index = Math.floor(Math.random() * this.deck.length);

            temp = this.deck[index];
            this.deck[index] = this.deck[count];
            this.deck[count] = temp;

            count--;
        }

        return await this.deck;


    }

    // שחקנים מקלבים קלפים
    async playesGetCards() {
        await this.players.forEach((player) => {
            for (let i = 0; i < 2; i++) {
                let card = Math.floor(Math.random() * this.deck.length);
                player.cards.push(this.deck[card]);

                this.deck.splice(card, 1)
            }
        })

        return this.players;
    }

    // פךופ טרן וריבר
    async borad() {
        let boardCards = [];

        let burnCardFirst = await this.deck.splice(0, 1);
        let plop = await this.deck.splice(0, 3);

        let burnCardSecond = await this.deck.splice(0, 1);
        let turn = await this.deck.splice(0, 1);

        let burnCardThree = await this.deck.splice(0, 1);
        let river = await this.deck.splice(0, 1);

        boardCards = boardCards.concat(plop, turn, river);

        return await boardCards;

    }


    setCountsToArray(score, suit) {
        // המרת אובייקטי המיספור למערכים
        let counted = [[], []];

        for (let i = 0; i < Object.keys(suit).length; i++) {
            let obg = new Object();
            obg.shape = Object.keys(suit)[i];
            obg.count = Object.values(suit)[i];

            counted[0].push(obg);
        }

        for (let i = 0; i < Object.keys(score).length; i++) {
            let obg = new Object();
            obg.number = Number(Object.keys(score)[i]);
            obg.count = Object.values(score)[i];

            counted[1].push(obg);
        }

        console.log(counted)

        return counted
    }



    // קבלת שחקן יחיד ומספור הקלפים
    countHand(player, boardCards) {
        let cards = [];
        cards = cards.concat(player.cards, boardCards);
        // console.log(player, 'player cards')


        let score = {};
        let suit = {};

        // לספור איזה ערכים חוזרים על עצמם
        for (let i = 0; i < cards.length; i++) {
            let cardVal = cards[i].number;
            let cardShape = cards[i].shape;

            if (score[cardVal] > 0) {
                score[cardVal]++
            } else {
                score[cardVal] = 1
            }

            if (suit[cardShape] > 0) {
                suit[cardShape]++
            } else {
                suit[cardShape] = 1
            }

        }

        return this.setCountsToArray(score, suit);
    }



    sorttingCardsCount(countedCards) {

        countedCards = this.sorrtingCardVal(countedCards, 'count')

        // למיין ערכים שחוזרים על עצמם
        let newCardsCount = [];



        for (let i = 0; i < 7; i++) {
            if (countedCards[0].count > 1) {
                newCardsCount.push(countedCards[0])
                countedCards.splice(0, 1)
            }
        }


        let sortValsCounted = this.sorttingCardValCounted(newCardsCount)
        let sortVals = this.sorrtingCardVal(countedCards, 'number')



        sortValsCounted = sortValsCounted.concat(sortVals)


        return sortValsCounted

    }


    // מיון ערכים שמוספרו לפי כמות
    sorttingCardValCounted(countedCards) {

        let stop;
        let i = countedCards.length;

        while (i > 0) {
            stop = true;
            for (let x = 0; x < i - 1; x++) {
                if (countedCards[x].number < countedCards[x + 1].number) {
                    if (countedCards[x].count === countedCards[x + 1].count) {
                        let tepm = countedCards[x]
                        countedCards[x] = countedCards[x + 1]
                        countedCards[x + 1] = tepm
                        stop = false
                    }
                }
            }

            i--;

            if (stop) {
                break
            }
        }

        return countedCards
    }


    // למיין ערכים
    sorrtingCardVal(countedCards, wichVal) {

        let stop;
        let i = countedCards.length;

        while (i > 0) {
            stop = true;
            for (let x = 0; x < i - 1; x++) {
                if (countedCards[x][wichVal] < countedCards[x + 1][wichVal]) {
                    let tepm = countedCards[x]
                    countedCards[x] = countedCards[x + 1]
                    countedCards[x + 1] = tepm
                    stop = false
                }
            }

            i--;

            if (stop) {
                break
            }
        }

        return countedCards
    }

    // בדיקת צבע
    checkFlash(countedCards) {
        for (let i = 0; i < countedCards.length; i++) {
            if (countedCards[i].count === 5) {
                console.log('Flash')
                return true
            }
        }

        return false;
    }


    // בדיקת קנטה
    checkStreet(countedCards) {

        let count = countedCards.length;
        let street = 1;


        for (let i = 0; i < count - 1; i++) {
            if (countedCards[i].number - 1 == countedCards[i + 1].number) {
                street++;
                if (street === 4 && countedCards[i + 1].number === 2) {
                    for (let x = 0; x < count - 1; x++) {
                        if (countedCards[x].number === 14) {
                            return true;
                        }
                    }
                }
                if (street === 5) {
                    return true;
                }
            } else {
                street = 1;
            }

        }

        return false;

    }


    checkOverParis(countedCards) {
        debugger
        let countCards = 0;
        for (let i = 0; i < countedCards.length; i++) {
            countCards += countedCards[i].count;
            if (countCards > 4) {
                // if (countCards[i + 1] == undefined) return true
                if (countedCards[i].number < countedCards[i + 1].number) {
                    let temp = countedCards[i]
                    countedCards[i] = countedCards[i + 1]
                    countedCards[i + 1] = temp
                    return true
                } else {
                    return true
                }
            }
        }

        return false
    }


    //   חוזק יד של שחקן בדיקת שלב 
    checkRankHand(player, countedCardsCount, countedCrdsShapes) {
        // יד של שחקן עם ערכים ..השני כמות צבעים
        console.log(countedCardsCount)
        console.log(countedCrdsShapes)
        let sorttedCounts = this.sorttingCardsCount(countedCardsCount)
        console.log(sorttedCounts)

        player.countHand = sorttedCounts


        if (sorttedCounts.length === 7) {
            if (this.checkFlash(countedCrdsShapes)) {
                return Game.levels[5]
            }
            else if (this.checkStreet(sorttedCounts)) {
                return Game.levels[4]
            } else {
                return Game.levels[0]
            }
        }

        else if (sorttedCounts.length === 6) {
            if (this.checkFlash(countedCrdsShapes)) {
                return Game.levels[5]
            }
            if (this.checkStreet(sorttedCounts)) {
                return Game.levels[4]
            } else {
                return Game.levels[1]
            }
        }

        else if (sorttedCounts.length === 5) {

            if (this.checkFlash(countedCrdsShapes)) {
                return Game.levels[5]
            }
            if (sorttedCounts[0].count === 3) {
                let checkStreet = this.checkStreet(sorttedCounts);
                if (checkStreet) {
                    return Game.levels[4]
                } else {
                    return Game.levels[3]
                }
            } else if (sorttedCounts[0].count === 2) {
                let checkStreet = this.checkStreet(sorttedCounts);
                if (checkStreet) {
                    return Game.levels[4]
                } else {
                    return Game.levels[2]

                }
            }
        }

        else if (sorttedCounts.length === 4) {
            if (sorttedCounts[0].count === 2)
                if (this.checkOverParis(sorttedCounts)) {
                    return Game.levels[2]
                }
            if (sorttedCounts[0].count === 3) {
                return Game.levels[6]
            } else if (sorttedCounts[0].count === 4) {
                return Game.levels[7]
            }
        }

        else if (sorttedCounts.length === 3) {
            if (sorttedCounts[0].count === 3) {
                debugger
                if (this.checkOverParis(sorttedCounts)) {
                    return Game.levels[3]
                }
            }
            if (sorttedCounts[0].count === 4) {
                if (this.checkOverParis(sorttedCounts)) {
                    return Game.levels[7]
                }

            }

        }

    }




    // בדיקת מנצח 
    async winner(playerOne, playerTwo) {
        let win = '';
        // אם לשתיהם יש שלב זהה אבל ערך הקלפים גבוה יותר
        if (playerTwo.score.rank === playerOne.score.rank) {

            console.log(playerOne)
            console.log(playerTwo)
            let countCards = 0;
            for (let i = 0; i < 7; i++) {
                countCards += playerOne.countHand[i].count
                console.log(countCards)
                if (playerOne.countHand[i].number > playerTwo.countHand[i].number) {
                    win = 'Player one win'
                    return await win
                } else if (playerOne.countHand[i].number < playerTwo.countHand[i].number) {
                    win = 'Player two win'
                    return await win
                }
                if (countCards > 5) {
                    win = 'Split'
                    return await win
                }
            }



        }

        else if (playerOne.score.rank > playerTwo.score.rank) {
            win = 'Player one win'
            return await win
        } else {
            win = 'Player two win'
            return await win
        }

    }


}












