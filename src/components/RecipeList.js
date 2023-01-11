import React, { useContext } from 'react'
import Recipe from './Recipe'
import { recipeContext } from './App'

function RecipeList({recipes}) {
    const { handleRecipeAdd } = useContext(recipeContext)
    return (
        <div className="recipe-list">
            <div>
                {
                    recipes.map(recipe => {
                        return <Recipe 
                        key={recipe.id} 
                        {...recipe} />
                    })
                }
            </div>
            <div className="recipe-list__btn-container">
                <button className="btn btn--primary" onClick={handleRecipeAdd}>Add Recipe</button>
            </div>
        </div>

    )
}

export default RecipeList
/*
instead of passing recipe in line 10, as name = {recipe.name} cookTime = {recipe.cookTime} etc, we simply pass {...recipe}
{...recipe} tells to take all the key value pair inside recipe object

while using array like above, always pass a unique key to every div because let our div with key 1 will got some changes, then why should other div re-render.and without passing unique key, React will re-render all other divs..that is not good
*/