import './stylesheets/style.scss';

function findById(id) {
  return function(singleCocktail) {
    return singleCocktail.id === id;
  };
}

// faire call API
fetch('https://fancy-cocktails2.herokuapp.com/api/v1/cocktails')
  .then(response => response.json())
  .then(data => {
    const resultsArray = data;
    // recup ID des cocktails
    const idArray = resultsArray.map(cocktail => cocktail.id);
    // prendre une id random
    const randomItem = idArray[Math.floor(Math.random() * idArray.length)];
    // recuperate the good cocktail
    const cocktailToDisplay = resultsArray.find(findById(randomItem));
    console.log(cocktailToDisplay);
  });
