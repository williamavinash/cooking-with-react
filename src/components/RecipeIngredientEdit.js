import React from 'react'

export default function RecipeIngredientEdit(props) {
    const {ingredient, handleIngredientChange, handleIngredientDelete } = props
    function handleChange(ingredientChange){
        handleIngredientChange(ingredient.id, {...ingredient, ...ingredientChange})
    }
    return (
        <>
            <input 
                type="text" 
                name="name" 
                value={ingredient.name} 
                onInput={e=>handleChange({name: e.target.value})}
                className="recipe-edit__input" 
            />
            <input 
                type="text" 
                name="amount" 
                value={ingredient.amount} 
                onInput={e=>handleChange({amount: e.target.value})}
                className="recipe-edit__input" 
            />
            <button className="btn btn--danger" onClick={()=>handleIngredientDelete(ingredient.id)}>&times;</button>
        </>
    )
}
