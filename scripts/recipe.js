import { recipes } from "../data/recipes.js";
import { updateOnlineStatus } from "../data/network.js";

// Function to get the recipe ID from the URL parameters
function getRecipeID(id) {
    const urlParam = new URLSearchParams(window.location.search);
    return urlParam.get(id);
}

const recipeId = getRecipeID('recipeId');
const readingRecipe = recipes.filter(recipe => recipe.recipeID.toString() === recipeId);
// Function to generate the HTML for the selected recipe
function generateRecipe() {
    let recipeHTML = '';
    if (readingRecipe) {
        readingRecipe.forEach(recipe => {
            document.title = recipe.recipeTItle; 
            recipeHTML += `
                <div class="recipe-img">
                    <img src="${recipe.recipeImage}" alt="" width="300px" />
                </div>
                <div class="recipe-info">
                    <h2>${recipe.recipeTItle}</h2>
                    <article>
                        ${recipe.recipeDesc}
                    </article>
                    <iframe
                        src="${recipe.videoLink}"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                    ></iframe>
                </div>
            `;
        });

        document.querySelector('.current-recipe').innerHTML = recipeHTML;
    } else {
        console.log('Error: Recipe not found');
    }
}

generateRecipe();
updateOnlineStatus();
