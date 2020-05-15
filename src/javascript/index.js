import 'bootstrap';
import '../assets/stylesheets/style.scss';
import './cocktail';
import { startLoading } from './loader';
import { initStarRating } from './star_rating';
import './refresh';

startLoading();
initStarRating();
