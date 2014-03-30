"use strict";

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

	this.clone = clone;
	function clone() {
		var ret = new Card(this.content);
		ret.flipped = this.flipped;
		ret.solved = this.solved;
		ret.order = this.order;
		return ret;
	}
    
    // Use this method to see if two cards match eachother.
    this.matchCard = matchCard;
    function matchCard(_anotherCard) {
        return this.content == _anotherCard.content;
    }
    
    // Print the information of this card.
    this.printInfo = printInfo;
    function printInfo() {
        console.log("");
        console.log("*********** Card Info ***********");
        console.log("content: " + this.content);
        console.log("flipped: " + this.flipped);
        console.log("solved:  " + this.solved);
        console.log("order:   " + this.order);
        console.log("*********************************");
        console.log("");
    }

}

/** This function gets an array of unique cards from certain string. Those cards are not paired, and unique to each other.
 *  e.g. [1, 2, 3, 4, 5]
 *  @param str The entire string we want to get cards out of.
 *  @param numUniqueCards Number of unique cards we want to get.
 *  @return An array of unique cards.
 */
function getCardsFromString(str, numUniqueCards) {
    var strArr = splitString(str, numUniqueCards);
    var cards = [];
    for (var i = 0; i < strArr.length; ++i) {
        cards[i] = new Card(strArr[i]);
        cards[i].order = i;
    }
    return cards;
}

/** This function gets an array of cards which can have duplicates from certain string, they are not neccessarily unique to each other, and they're all paired.
 *  Also, the result array is in random order.
 *  e.g. [1, 2, 3, 3, 4, 5, 5, 1, 2, 3, 3, 4, 5, 5] (and randomize this array)
 *  @param str The entire string we want to get cards out of.
 *  @param numUniqueCards Number of unique cards we want to get.
 *  @param totalNum Total number of cards we want to get. It should be an even number, but if it's odd, it will decrese by one.
 *  @return An array of unique cards.
 */
function getCardsFromString_withDuplicates(str, numUniqueCards, totalNum) {
    // If the total number passed in is odd, decrease it by one. Because there's no way
    if (totalNum%2 == 1) {
        conlog.error("totalNum is odd, automatically decrese by one to: " + --totalNum);
    }
    
    // Get unique cards first
    var cards = getCardsFromString(str, numUniqueCards);
    // Keep adding duplicate cards until it meet the totalNum requirement (half of it)
    while (cards.length < Math.floor(totalNum/2)) {
        cards[cards.length] = cards[Math.floor(Math.random()*1000)%cards.length];
    }

    // Duplicate every single card
	var cardsClone = [];
	for(var i = 0; i < cards.length; i++) {
		cardsClone.push(cards[i].clone());
	}
    cards = cards.concat(cardsClone);
    cards = shuffle(cards);
    
    return cards;
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


