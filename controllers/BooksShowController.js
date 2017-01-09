angular.module('libraryApp')
  .controller('BooksShowController', BooksShowController);

// controller function and dependency injection
// $routeParams and $location are required for routing stuff
//   - but you might need to add a dependency
BooksShowController.$inject=['$routeParams', '$location', '$http'];

function BooksShowController($routeParams, $location, $http) {
  var vm = this;
  var bookId = $routeParams.id;
  var api = 'https://super-crud.herokuapp.com/books/'

  vm.getData = function(){
    $http({
      method: 'GET',
      url: api + bookId
    }).then(function successCallback(response) {
      vm.book = response.data;
    }, function errorCallback(response) {
      console.log('There was an error getting the data', response);
      $location.path('/');
    });
  }
  vm.getData();

  vm.updateBook = function(book){
    $http({
      method: 'PUT',
      url: api + bookId,
      data: {
        title: book.title,
        author: book.author,
        image: book.image,
        releaseDate: book.releaseDate
      }
    }).then(function successCallback(updatedBookJson) {
      vm.book = updatedBookJson.data;
      // $location.path('/');
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  }

  vm.deleteBook = function(book){
    $http({
      method: 'DELETE',
      url: api + bookId
    }).then(function successCallback(book) {
      $location.path('/');
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  }
}
