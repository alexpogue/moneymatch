function FavCtrl($scope) {
	if(globalFavs === [] || globalFavs === undefined || globalFavs === null) {
		$scope.noFavs = true;
	}
	$scope.favs = globalFavs;
}
