angular.module('libraryApp')
  .controller('BooksIndexController', BooksIndexController);

// add your BooksIndexController function here!
// don't forget $http if you need to make requests

BooksIndexController.$inject = ['$http'];

function BooksIndexController ($http) {
  var vm = this;
  var api = 'https://super-crud.herokuapp.com/books/'
  var books = [];

  vm.getBooks = $http({
    method: 'GET',
    url: 'https://super-crud.herokuapp.com/books'
  }).then(function successCallback(response) {
    vm.books = response.data.books;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  vm.postBook = function(book){
    $http({
      method: 'POST',
      url: api,
      data: {
        title: book.title,
        author: book.author,
        image: book.image,
        releaseDate: book.releaseDate
      }
    }).then(function successCallback(response) {
      vm.books.push(response.data);
    }, function errorCallback(response) {
      console.log('There was an error getting the data', response);
      $location.path('/');
    });
  }
}
