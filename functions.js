// Render the recipe in the app
const renderRecipe = (recipeArr, container, filter) => {
    container.innerHTML = ''
    const filteredRecipe = recipeArr.filter(recipe => {
        return recipe.title.toLowerCase().includes(filter.searchText.toLowerCase())
    })
    filteredRecipe.forEach(recipe => {
        const recipeLink = document.createElement('a')
        const title = document.createElement('p')
        const subTitle = document.createElement('span')
        recipeLink.setAttribute('href', `recipe.html#${recipe.id}`)
        if (recipe.title.length === 0) {
            title.textContent = 'Unamed recipe'
        } else {
            title.textContent = recipe.title
        }
        const haveAll = recipe.ingredients.every(ingredient => ingredient.have === true)
        const haveOne = recipe.ingredients.some(ingredient => ingredient.have === true)


        if (haveAll) {
            subTitle.textContent = 'You have all ingredients'
        } else if (haveOne) {
            subTitle.textContent = 'You have some ingredients'
        } else {
            subTitle.textContent = 'You have no ingrendients'
        }

        recipeLink.appendChild(title)
        recipeLink.appendChild(subTitle)
        container.appendChild(recipeLink)
    });
}


const saveRecipe = (arrRecipe) => {
    localStorage.setItem('recipes', JSON.stringify(arrRecipe))
}

const getRecipes = () => {
    const recipesJSON = JSON.parse(localStorage.getItem('recipes'))
    return recipesJSON !== null ? recipesJSON : []
}


// // Rendre the ingredients for each recipe
const renderIngredient = (arrIngredient, container, arr) => {
    container.innerHTML = ''
    arrIngredient.forEach(ingredient => {
        const element = document.createElement('div')
        const span = document.createElement('span')
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        const icon = document.createElement('i')

        checkbox.addEventListener('click', e => {
            ingredient.have = e.target.checked
            saveRecipe(arr)
        })
        checkbox.checked = ingredient.have


        icon.addEventListener('click', (e) => {
            const index = arrIngredient.indexOf(ingredient)
            arrIngredient.splice(index, 1)
            saveRecipe(arr)
            renderIngredient(arrIngredient, container, arr)
        })
        span.textContent = ingredient.title
        icon.textContent = 'Delete'


        element.appendChild(checkbox)
        element.appendChild(span)
        element.appendChild(icon)
        container.appendChild(element)
    })
}

// Display an error message if input is empty

const showError = (errorContainer) => {
    errorContainer.textContent = 'You must fill this field'
}