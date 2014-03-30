function GameCtrl($scope, $timeout) {
	var tip = "Set aside extra money in the bank for emergencies, and do not live paycheck-to-paycheck if at all possible";

	$scope.clicksEnabled = true;

	$scope.cards = getCardsFromString_withDuplicates(tip, 36, 36);
	var flippedCardInd = null;

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
	}
}

function flipAllUnsolvedCards(cards) {
	for(var i = 0; i < cards.length; i++) {
		if(cards[i].solved === false) {
			cards[i].flipped = false;
		}
	}
}

function shuffleArray(arr) {
	var i = arr.length;
	while(--i) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
}
