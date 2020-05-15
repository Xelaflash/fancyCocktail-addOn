import $ from 'jquery';

const cocktailName = document.querySelector('.cocktail-name');
const pictureDiv = document.querySelector('.cocktail-picture');
const ingredientsDiv = document.querySelector('#ingredients-content');
const recipeDiv = document.querySelector('#recipe-content');
const loader = document.querySelector('.loader');
const baseEndpoint = 'https://fancy-cocktails2.herokuapp.com/api/v1/cocktails';
const showPageDiv = document.querySelector('.show-page');
const flashAlert = `
  <div class="alert alert-success fade show" id="flash-success" role="alert">
    Review created with success
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
  </div>`;

function handleError(err) {
  console.log(err);
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

  // display picture
  cocktailName.textContent = data.name;
  const photo = `
  <img src="${baseEndpoint}/${id}/photo" width="350" alt="Cocktail picture">
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

  // turn the loading anim off
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1200);
  return data;
}

const cocktail = fetchCocktail().catch(handleError);

// const { reviews } = data;
// if (reviews.length > 0) {
//   const ratingArr = reviews.map(review => review.rating);
//   console.log(ratingArr);
//   const averageRating = ratingArr.reduce((a, b) => a + b) / ratingArr.length;
//   console.log(averageRating);
// }

const starWrapper = document.querySelector('.stars-wrapper');
const ratingTxt = document.querySelector('#rating-txt');

cocktail.then(result => {
  // display average rating
  const { reviews } = result;
  if (reviews.length > 0) {
    const ratingArr = reviews.map(review => review.rating);
    const averageRating = Math.round(ratingArr.reduce((a, b) => a + b) / ratingArr.length);
    console.log(averageRating, ratingArr.reduce((a, b) => a + b) / ratingArr.length);
    const blankStars = 5 - averageRating;

    const drawBlankStars = function(numberOfStars) {
      for (let i = 0; i < numberOfStars; i += 1) {
        const el = `<span class="stars star-blank"></span>`;
        starWrapper.insertAdjacentHTML('afterbegin', el);
      }
    };

    const drawStarsColored = function(numberOfStars) {
      for (let i = 0; i < numberOfStars; i += 1) {
        const el = `<span class="stars star-colored"></span>`;
        starWrapper.insertAdjacentHTML('afterbegin', el);
      }
    };
    drawBlankStars(blankStars);
    drawStarsColored(averageRating);
  } else {
    const defaultText = `<p>Be the first to let a review</p>`;
    ratingTxt.insertAdjacentHTML('afterbegin', defaultText);
  }
  if (reviews.length === 1) {
    const nbOfReview = `<span>(${reviews.length} review)</span>`;
    ratingTxt.insertAdjacentHTML('afterbegin', nbOfReview);
  } else if (reviews.length > 1) {
    const nbOfReviewPluralize = `<span>(${reviews.length} reviews)</span>`;
    ratingTxt.insertAdjacentHTML('afterbegin', nbOfReviewPluralize);
  }

  // create new rating ==> POST to API
  const cocktailId = result.id;
  const submitBtn = document.querySelector('#submit_form');
  const rating = document.querySelector('#review_rating');
  submitBtn.addEventListener('click', () => {
    const review = { review: { rating: rating.value } };
    fetch(`${baseEndpoint}/${cocktailId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    });
    // did not found the way to close modal with es6
    $('#rating-modal').modal('hide');
    $('html, body').animate({ scrollTop: $('.show-page').offset().top }, 300);
    showPageDiv.insertAdjacentHTML('afterbegin', flashAlert);
    setTimeout(() => {
      $('.alert').alert('close');
    }, 2000);
  });
});
