const cocktailName = document.querySelector('.cocktail-name');
const pictureDiv = document.querySelector('.cocktail-picture');
const ingredientsDiv = document.querySelector('#ingredients-content');
const recipeDiv = document.querySelector('#recipe-content');
const loader = document.querySelector('.loader');
const starsDiv = document.querySelector('.stars-wrapper');
const baseEndpoint = 'https://fancy-cocktails2.herokuapp.com/api/v1/cocktails';

function handleError(err) {
  alert(` Sorry 🤷🏻‍♂️ Something went wrong`);
}

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
  // turn loading anim on
  loader.classList.remove('hidden');
  const id = await getCocktailId();
  const response = await fetch(`${baseEndpoint}/${id}`);
  const data = await response.json();
  cocktailName.textContent = data.name;
  const photo = `
  <img src="${baseEndpoint}/${id}/photo" width="350" alt="Cocktail picture">
  `;
  pictureDiv.insertAdjacentHTML('beforeend', photo);
  data.doses.forEach(ingredient => {
    const dose = `
    <p class="step">
    <span class="dose-nbr">${ingredient.description}</span>
    <span class="dose-item">${ingredient.ingredient.name}</span>
    `;
    ingredientsDiv.insertAdjacentHTML('beforeend', dose);
  });
  const recipeStr = data.recipe;
  const recipeArray = recipeStr
    .replace(/[\n\r]+/g, '')
    .replace(/\s{2,10}/g, ' ')
    .split('.');
  recipeArray.map(step => step.trim());
  recipeArray.forEach(displayRecipe);

  // reviews
  const reviewsArr = data.reviews;
  console.log(reviewsArr);

  // turn the loading anim off
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1200);
}

function displayReview() {}

export { fetchCocktail, handleError, displayReview };
