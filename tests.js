//  לחבר את הבורד עם קלפי השחקן ל7
//  לעשות מיון לפי כמות  ולהוציא את החימישיה הכי טובה 
// להוציא את הכמות ואם נשאר מקום לכמות 5 כללית להכניס את הגבוהים ביותר


// אם במערך יש 2 איברים זה או פול או קארה
// אם 5 או סטרייט או צבע או קלף גבוה



function checkOverParis(countedCards) {
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

var arrOne = [{ number: 7, count: 2 }, { number: 5, count: 2 }, { number: 3, count: 2 }, { number: 10, count: 1 }]
var checkArrOne = checkOverParis(arrOne)
console.log(checkArrOne, arrOne)


var arrTwo = [{ number: 3, count: 3 }, { number: 2, count: 3 }, { number: 10, count: 1 }]
var checkArrTwo = checkOverParis(arrTwo)
console.log(checkArrTwo, arrTwo)



var arrThree = [{ number: 5, count: 4 }, { number: 12, count: 2 }, { number: 10, count: 1 }]
var checkArrThree = checkOverParis(arrThree)
console.log(checkArrThree, arrThree)




