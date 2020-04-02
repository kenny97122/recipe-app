const recipeName = document.getElementById('recipe-name')
const recipeStep = document.getElementById('recipe-steps')
const ingredientContainer = document.getElementById('ingredients-container')
const ingredientForm = document.getElementById('ingredients-form')
const ingredientInput = document.getElementById('ingredient-name')
const deleteBtn = document.getElementById('delete-recipe')
const errorDiv = document.getElementById('error')

const recipesLocalStorage = getRecipes()
const id = location.hash.substring(1)
console.log(recipesLocalStorage);

const foundRecipe = recipesLocalStorage.find(recipe => recipe.id === id)
console.log(foundRecipe);

if (foundRecipe === undefined) {
    location.assign('index.html')
}
recipeName.value = foundRecipe.title
recipeStep.value = foundRecipe.steps

renderIngredient(foundRecipe.ingredients, ingredientContainer, recipesLocalStorage)



// renderIngredient(recipesLocalStorage, ingredientContainer)

// Change and save the recipe name
recipeName.addEventListener('input', (e) => {
    foundRecipe.title = e.target.value
    saveRecipe(recipesLocalStorage)
})


// Change and save the steps
recipeStep.addEventListener('input', (e) => {
    foundRecipe.steps = e.target.value
    saveRecipe(recipesLocalStorage)
})


// Add and save an ingredient for the recipe
ingredientForm.addEventListener('submit', (e) => {
    e.preventDefault()

    if (ingredientInput.value === '') {
        showError(errorDiv)
    } else {
        foundRecipe.ingredients.push({
            id: uuidv4(),
            title: ingredientInput.value,
            have: false
        })
    }
    ingredientInput.value = ''
    saveRecipe(recipesLocalStorage)
    renderIngredient(foundRecipe.ingredients, ingredientContainer, recipesLocalStorage)
})

deleteBtn.addEventListener('click', (e) => {
    const confirmation = confirm(`Are you sure that you want to delete this recipe ?`)
    if (confirmation) {
        const index = recipesLocalStorage.indexOf(foundRecipe)
        recipesLocalStorage.splice(index, 1)
        saveRecipe(recipesLocalStorage)
        location.assign('index.html')
    }

})