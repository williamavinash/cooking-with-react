import React from 'react'
import Ingredient from './Ingredient'

function IngredientList({ingredient}) {
    const ingredientList = ingredient.map(ingredient => {
        return <Ingredient key={ingredient.id} {...ingredient}/>
    })
    return (
        <div className="ingredient-list">
            {ingredientList}
        </div>
    )
}

export default IngredientList
