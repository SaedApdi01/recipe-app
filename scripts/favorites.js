import { recipes } from '../data/recipes.js';
import { favorites, updateFavLocalstorage, readButton } from '../data/favoritesData.js';
import { updateOnlineStatus } from '../data/network.js';

const favoritedID = favorites.map((fav) => fav.favId);
const checkFavIds = recipes.filter((recipe) =>
  favoritedID.includes(recipe.recipeID.toString())
);

// Function to generate HTML for favorite recipes
function favoriteGeneratedHTML() {
  let favoriteHtml = '';
  const favoriteRecipesContainer = document.querySelector('.favorite');
  if (!checkFavIds.length) {
    favoriteRecipesContainer.innerText = 'No Favorite Recipes Found📪';
  } else {
    checkFavIds.map((recipe) => {
      favoriteHtml += `
        <div class="favorites" data-recipe-id="${recipe.recipeID}">
          <img src="${recipe.recipeImage}" alt="${recipe.recipeTItle}" />
          <h3>${recipe.recipeTItle}</h3>
          <button class="btn-remove" data-remove-id="${recipe.recipeID}"><i class="fas fa-trash"></i></button>
          <button class="read-btn" data-recipe-id="${recipe.recipeID}"><i class="fas fa-book"></i></button>
        </div>
      `;
    });
    // Insert favorite recipes into the container
    favoriteRecipesContainer.innerHTML = favoriteHtml;

    // Initialize read button functionality
    readButton();
  }
}
favoriteGeneratedHTML();

const modalMessage = document.querySelector('.modal-message'); 
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');

// Remove favorite recipes
document.querySelectorAll('.btn-remove').forEach((button) => {
  button.addEventListener('click', function () {
    const removeId = button.dataset.removeId;
    // Find the index of the favorite to be removed
    const favIndex = favorites.findIndex((fav) => fav.favId === removeId);
    if (favIndex !== -1) {
      favorites.splice(favIndex, 1);
      updateFavLocalstorage();
      modal.style.display = 'block'; 
      modalContent.style.display = 'block';
      modalMessage.textContent = `Successfully Deleted✅`;
      document.querySelector('.close').addEventListener('click', function(){
        location.reload();
        modal.style.display = 'none'; 
        modalContent.style.display = 'none';
      });
    } else {
      console.log('Error: Favorite not found');
    }
  });
});

updateOnlineStatus();
