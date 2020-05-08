import './assets/stylesheets/style.scss';

// const loader = document.querySelector('.loader');
const cocktailName = document.querySelector('.cocktail-name');
const pictureDiv = document.querySelector('.cocktail-picture');
const ingredientsDiv = document.querySelector('#ingredients-content');
const recipeDiv = document.querySelector('#recipe-content');

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

function displayRecipe(step, index) {
  const recipe = `
  <p class="step">
  <span class="step-nbr">0${index + 1}</span>
  <span class="step-item">${step}</span>
</p>
  `;
  recipeDiv.insertAdjacentHTML('beforeend', recipe);
}

// call API cocktail SHOW
async function fetchCocktail() {
  // demo.textContent = 'loading...';
  const id = await getCocktailId(); // this will grab you the return value from getCocktailId function;
  const response = await fetch(`${baseEndpoint}/${id}`);
  const data = await response.json();
  // display name
  cocktailName.textContent = data.name;
  // display picture
  const photo = `
  <img src="${baseEndpoint}/${id}/photo" width="400" alt="Cocktail picture">
  `;
  pictureDiv.insertAdjacentHTML('beforeend', photo);
  // display doses
  data.doses.forEach(ingredient => {
    const dose = `
    <p class="step">
    <span class="dose-nbr">${ingredient.description}</span>
    <span class="dose-item">${ingredient.ingredient.name}</span>
    `;
    ingredientsDiv.insertAdjacentHTML('beforeend', dose);
  });
  // display recipe
  const recipeStr = data.recipe;
  const recipeArray = recipeStr
    .replace(/[\n\r]+/g, '')
    .replace(/\s{2,10}/g, ' ')
    .split('.');
  recipeArray.map(step => step.trim());
  recipeArray.forEach(displayRecipe);
}

fetchCocktail().catch(handleError);
