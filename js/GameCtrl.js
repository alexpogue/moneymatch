"use strict";

var globalFavs;

function GameCtrl($scope, $timeout) {
//	var tip = "Set aside extra money in the bank for emergencies, and do not live paycheck-to-paycheck if at all possible";
	var tip = "WE DON'T LEASE WE BUY THE WHOLE CAR";
	var numWordsInTip = tip.split(' ').length;

	globalFavs = [];
	$scope.clicksEnabled = true;
	$scope.solved = false;
	$scope.favButtonClicked = false;

	$scope.cards = getCardsFromString_withDuplicates(tip, 8, 16);
	var flippedCardInd = null;

	$scope.solvedWords = [];

	$scope.wordsInSolution = function() {
		var ret = [];
		for(var i = 0; i < numWordsInTip; i++) {
			if($scope.solvedWords[i] === undefined) {
				ret.push("[]");
			}
			else{
				ret.push($scope.solvedWords[i]);
			}
		}
		return ret;
	};

	$scope.cardClicked = function(ind) {
		window.getSelection().removeAllRanges();
		var flippedCard = $scope.cards[flippedCardInd];
		if($scope.cards[ind].flipped === true || $scope.clicksEnabled === false) {
			return;
		}

		$scope.cards[ind].flipped = true;

		if(flippedCard === undefined) {
			flippedCardInd = ind;
		}
		else if($scope.cards[ind].matchCard(flippedCard) === true) {
			$scope.cards[ind].solved = true;
			flippedCard.solved = true;
			flippedCardInd = null;
			$scope.solvedWords[$scope.cards[ind].order] = $scope.cards[ind].content;
			var numSolvedWords = getNumSolvedWords($scope.solvedWords);
			if(numSolvedWords === numWordsInTip) {
				$scope.solved = true;
			}
			/* cards matched! Display them in green. If there are still cards 
			on the board with the string, do nothing. If all cards with the 
			string have been matched, show the word in the solution. */
		}
		else if($scope.cards[ind].matchCard(flippedCard) === false) {
			$scope.clicksEnabled = false;
			$timeout(
				function() { 
					flipAllUnsolvedCards($scope.cards);
					$scope.clicksEnabled = true;
				}, 
				500
			);
			flippedCardInd = null;
		}
	};
	$scope.favButtonClick = function() {
		$scope.favButtonClicked = true;
	};

	$scope.addFav = function() {
		globalFavs.push(tip);
	};
}

function getNumSolvedWords(solvedWords) {
	var num = 0;
	for(var i = 0; i < solvedWords.length; i++) {
		if(solvedWords[i] !== undefined) {
			++num;
		}
	}
	return num;
}

function flipAllUnsolvedCards(cards) {
	for(var i = 0; i < cards.length; i++) {
		if(cards[i].solved === false) {
			cards[i].flipped = false;
		}
	}
}

