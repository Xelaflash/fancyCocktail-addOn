import 'bootstrap';
import '../assets/stylesheets/style.scss';
import { fetchCocktail, handleError } from './cocktail';
import { startLoading } from './loader';
import { initStarRating } from './star_rating';
import './refresh';

startLoading();
fetchCocktail().catch(handleError);
initStarRating();
