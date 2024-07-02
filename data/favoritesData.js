export let favorites = JSON.parse(localStorage.getItem('favorites')) || []
export function updateFavLocalstorage() {
  localStorage.setItem('favorites', JSON.stringify(favorites))
}

export function readButton() {
  document.querySelectorAll('.read-btn').forEach((button) => {
    button.addEventListener('click', function () {
      const recipeId = button.dataset.recipeId
      window.location.href = `recipe.html?recipeId=${recipeId}`
    })
  })
}
