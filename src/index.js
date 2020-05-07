import './assets/stylesheets/style.scss';

// const loader = document.querySelector('.loader');
// const cocktailName = document.querySelector('.cocktail-name');
// const picture = document.querySelector('.cocktail-picture');

const demo = document.querySelector('#demo');
const baseEndpoint = 'https://fancy-cocktails2.herokuapp.com/api/v1/cocktails';

function handleError(err) {
  console.log('OH NO!');
  console.log(err);
  demo.textContent = `Something went wrong: ${err}`;
}

// must return me a cocktail ID
async function getCocktailId() {
  const response = await fetch(`${baseEndpoint}`);
  const data = await response.json();
  const idArray = data.map(element => element.id);
  const randomItem = idArray[Math.floor(Math.random() * idArray.length)];
  return randomItem;
}

// call API cocktail SHOW
async function displayCocktail() {
  demo.textContent = 'loading...';
  const id = await getCocktailId(); // this will grab you the return value from getCocktailId function;
  const response = await fetch(`${baseEndpoint}/${id}`);
  const data = await response.json();
  console.log(data);
}

displayCocktail().catch(handleError);
