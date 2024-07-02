import { recipes } from '../data/recipes.js'
import { updateOnlineStatus } from '../data/network.js';
import { favorites, updateFavLocalstorage, readButton } from '../data/favoritesData.js'

const modalMessage = document.querySelector('.modal-message'); 
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');

let recipeHTML = '';

// Function to handle favorite button functionality
function favoriteFunctionality() {
  document.querySelectorAll('.fav-btn').forEach((favbutton) => {
    favbutton.addEventListener('click', function () {
      const favId = favbutton.dataset.favId;
      const checkFavID = favorites.some((favorite) => favorite.favId === favId);
      if (checkFavID) {
        modal.style.display = 'block'; 
        modalContent.style.display = 'block';
        modalMessage.textContent = `You already added this recipe❌!`;
        document.querySelector('.close').addEventListener('click', function() {
          modal.style.display = 'none'; 
          modalContent.style.display = 'none'; 
        });
      } else if (!checkFavID) {
        favorites.push({ favId: favId });
        modal.style.display = 'block'; 
        modalContent.style.display = 'block';
        modalMessage.textContent = `Added to favorites💌!`;
        document.querySelector('.close').addEventListener('click', function() {
          modal.style.display = 'none'; 
          modalContent.style.display = 'none'; 
        });
      }
      console.log(favorites);
      updateFavLocalstorage();
      document.querySelector('.favorite-btn').innerHTML = `<i class="fa-solid fa-heart"></i>${favorites.length}`;
    });
  });
}

// Function to handle search functionality
function searchHandling() {
  const inputValue = document.querySelector('.search-input').value.toLowerCase();
  const searchedRecipe = recipes.filter(
    (recipe) =>
      recipe.recipeTItle.toLowerCase().includes(inputValue) ||
      recipe.recipeShortDesc.toLowerCase().includes(inputValue)
  );
  let searchedRecipeHTML = '';
  if (searchedRecipe.length !== 0) {
    searchedRecipe.forEach((recipe) => {
      searchedRecipeHTML += `
      <div class="recipe">
        <img src="${recipe.recipeImage}" alt="" />
        <h3>${recipe.recipeTItle}</h3>
        <p>
          ${recipe.recipeShortDesc}
        </p>
        <button class="fav-btn" data-fav-id="${recipe.recipeID}"><i class="fa-solid fa-heart"></i> Add To Favorites</button>
        <button class="read-btn" data-recipe-id="${recipe.recipeID}"><i class="fas fa-book"></i> Learn Now</button>
      </div>
      `;
      document.querySelector('.recipes').innerHTML = searchedRecipeHTML;
    });
  } else {
    document.querySelector('.recipes').innerHTML = '<h4 style="color:black">Sorry, no results found🔍<h2>';
  }
  readButton();
  favoriteFunctionality();
}

// Function to generate HTML for all recipes
function allRecipesHTML() {
  recipes.forEach((recipe) => {
    recipeHTML += `
      <div class="recipe">
        <img src="${recipe.recipeImage}" alt="" />
        <h3>${recipe.recipeTItle}</h3>
        <p>
          ${recipe.recipeShortDesc}
        </p>
        <button class="fav-btn" data-fav-id="${recipe.recipeID}"><i class="fa-solid fa-heart"></i> Add To Favorites</button>
        <button class="read-btn" data-recipe-id="${recipe.recipeID}"><i class="fas fa-book"></i> Learn Now</button>
      </div>
    `;
    document.querySelector('.recipes').innerHTML = recipeHTML;
  });

  // Initialize favorite functionality
  favoriteFunctionality();
  // Initialize read functionality
  readButton();
}
allRecipesHTML();

// Search functionality
document.querySelector('.search-btn').addEventListener('click', () => {
  searchHandling();
});

// Handle enter key for searching
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    searchHandling();
  }
});

// Set initial favorites button HTML
document.querySelector('.favorite-btn').innerHTML = `<i class="fa-solid fa-heart"></i>${favorites.length}`;

// Redirect to favorites page on favorite button click
document.querySelector('.favorite-btn').addEventListener('click', function () {
  window.location.href = `favorites.html`;
});

// Update online status
updateOnlineStatus();
