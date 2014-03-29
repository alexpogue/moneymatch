/* This file contain functions to create/update card object */

/** Constructor of class Card.
 *  @param _content The content string of the card.
 *  @return A card object with _content string, and flipped/solved properties are set as false.
 */
function Card(_content) {
    this.content = _content; // Content string of this card.
    this.flipped = false;    // If this card is flipped or not.
    this.solved = false;     // If this card has been solved or not.
    this.order= 0;           // Order of this card in the whole final string.
    
    // Use this method to see if two cards match eachother.
    this.matchCard = matchCard;
    function matchCard(_anotherCard) {
        return this.content == _anotherCard.content;
    }
    
    this.printInfo = printInfo;
    function printInfo() {
        console.log();
        console.log("*********** Card Info ***********");
        console.log("content: " + this.content);
        console.log("flipped: " + this.flipped);
        console.log("solved:  " + this.solved);
        console.log("order:   " + this.order);
        console.log("*********************************");
        console.log();
    }
}

function getCardsFromString(str, numCards) {
    if (numCards%2 == 1) {
        conlog.error("numCards is odd, automatically decrese by one to: " + --numCards);
    }
    var strArr = splitString(str, numCards);
    var cards = [];
    for (var i = 0; i < strArr.length; ++i) {
        cards[i] = new Card(strArr[i]);
    }
    return cards;
}

