import './assets/stylesheets/style.scss';

const loader = document.querySelector('.loader');
const cocktailName = document.querySelector('.cocktail-name');
const picture = document.querySelector('.cocktail-picture');

function findById(id) {
  return function(singleCocktail) {
    return singleCocktail.id === id;
  };
}

// call API for all cocktails to recuperate random cocktail ID
async function fetchCocktails() {
  const response = await fetch('https://fancy-cocktails2.herokuapp.com/api/v1/cocktails');
  const data = await response.json();
  // console.log(data);
  return data;
}

// function getcocktailId() {
//   const resultsArray = fetchCocktails();
//   console.log(resultsArray);
//   const idArray = resultsArray.map(element => element.id);
//   const randomItem = idArray[Math.floor(Math.random() * idArray.length)];
//   console.log(randomItem);
//   return randomItem;
// }
// getcocktailId();

// async function fetchCocktails() {
//   const response = await fetch('https://fancy-cocktails2.herokuapp.com/api/v1/cocktails')
//     .then(response => response.json())
//     .then(data => {
//       const resultsArray = data;
//       // recup ID des cocktails
//       const idArray = resultsArray.map(element => element.id);
//       // prendre une id random
//       const randomItem = idArray[Math.floor(Math.random() * idArray.length)];
//       console.log(randomItem);
//       return randomItem;
//       // recuperate the good cocktail
//       // const cocktailToDisplay = resultsArray.find(findById(randomItem));
//       // console.log(cocktailToDisplay);
//       // return cocktailToDisplay;
//     });
// }

// re-call APi for specific cocktail
// fetch(`https://fancy-cocktails2.herokuapp.com/api/v1/cocktails/33`)
//   .then(response => response.json())
//   .then(result => {
//     console.log(result);
//   });
