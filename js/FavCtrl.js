function FavCtrl($scope) {
	if($scope.favs === [] || $scope.favs === undefined || $scope.favs === null) {
		$scope.noFavs = true;
	}
}
