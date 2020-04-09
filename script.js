import Player from './playes.js';
import Deck from './deck.js';
import Game from './game.js';

var playerOne = new Player('Avi');
var playerTwo = new Player('Evi');

var deck = new Deck();
var displayDeck = deck.createDeck(); // יצירת חבילה

var game = new Game(displayDeck, [playerOne, playerTwo]); // יצירת משחק ..שליחת חבילה ושחקנים



game.playesGetCards() // שחקנים מקבלים קלפים
    .then((players) => {
        game.borad() // פלופ טרן וריבר יצירת בורד
            .then((boardCards) => {
                console.log(players)
                // console.log(game.deck, 'Deck')
                console.log(boardCards, 'Board');


                // איחוד קלפי השחקן עם הבורד וספירה ערכים
                let handPlayerOne = game.countHand(players[0], boardCards);





                // קבלת שלב 
                let getScorePlayerOne = game.checkRankHand(players[0], handPlayerOne[1], handPlayerOne[0]);
                players[0].score = getScorePlayerOne


                let handPlayerTwo = game.countHand(players[1], boardCards);
                let getScorePlayerTwo = game.checkRankHand(players[1], handPlayerTwo[1], handPlayerTwo[0]);
                players[1].score = getScorePlayerTwo


                //  הצגת הקלפים על המסך
                let board = document.querySelector('.board');
                for (let i = 0; i < boardCards.length; i++) {
                    board.innerHTML += `<p>${boardCards[i].shape} ${boardCards[i].number}`
                }


                // הצגת קלפים של השחקים על המסך
                let player1 = document.querySelector('.player1')
                let player2 = document.querySelector('.player2')
                for (let i = 0; i < players.length; i++) {
                    player1.innerHTML += `<p>${players[0].cards[i].shape} ${players[0].cards[i].number}`
                    player2.innerHTML += `<p>${players[1].cards[i].shape} ${players[1].cards[i].number}`
                }

                document.querySelector('.infop1').innerHTML = getScorePlayerOne.level
                document.querySelector('.infop2').innerHTML = getScorePlayerTwo.level

                // console.log(handPlayerOne[1], handPlayerTwo[1])
                // הכרזת מנצח
                game.winner(playerOne, playerTwo)
                    .then((win) => {
                        console.log(win)
                        let total = document.querySelector('.total')
                        total.innerHTML = win
                    })


            })
    })








