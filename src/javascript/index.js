import 'bootstrap';
import '../assets/stylesheets/style.scss';
import { handleFirstTab } from './components/keyboard_focus';
import './components/cocktail';
import { startLoading } from './components/loader';
import { initStarRating } from './components/star_rating';
import './components/refresh';

startLoading();
initStarRating();
// outline for keyboard user on focus
window.addEventListener('keydown', handleFirstTab);
