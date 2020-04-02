const searchInput = document.getElementById('search')
const recipeContainer = document.getElementById('recipe-container')
const addRecipe = document.getElementById('add-recipe')


const recipes = getRecipes()
const filter = {
    searchText: ''
}

renderRecipe(recipes, recipeContainer, filter)

addRecipe.addEventListener('click', (e) => {

    const id = uuidv4()
    recipes.push({
        id: id,
        title: '',
        steps: '',
        ingredients: []
    })
    saveRecipe(recipes)
    location.assign('recipe.html#' + id)
})

searchInput.addEventListener('input', (e) => {
    filter.searchText = e.target.value
    renderRecipe(recipes, recipeContainer, filter)
})