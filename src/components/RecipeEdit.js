import React , { useContext } from 'react'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import { recipeContext } from './App'
import { v4 as uuidv4 } from 'uuid';

function RecipeEdit({ selectedRecipe }) {
    const {handleRecipeChange, handleRecipeSelect}= useContext(recipeContext)
    function handleChange(recipeChange){
        handleRecipeChange(selectedRecipe.id, {...selectedRecipe, ...recipeChange})
    }
    function handleIngredientChange(id, editIngredient){
        const newIngredients = [...selectedRecipe.ingredients]
        const index = newIngredients.findIndex(i=> i.id === id)
        newIngredients[index] = editIngredient
        handleChange({ingredients: newIngredients})
    }
    function handleIngredientAdd(){
        const newIngredient = {
            id: uuidv4(),
            name: "",
            amount:""
        }
        handleChange({ingredients: [...selectedRecipe.ingredients, newIngredient]})
    }
    function handleIngredientDelete(id){
        const newIngredients = selectedRecipe.ingredients.filter(i=> i.id === id)
        handleChange({ingredients : newIngredients})
    }
    return (
        <div className="recipe-edit">
            <div className="recipe-edit__delete-button-container">
                <button 
                className="recipe-edit__delete-button"
                onClick = {()=> handleRecipeSelect(undefined)}
                > &times;
                </button>
            </div>

            <div className="recipe-edit__grid">
                <label htmlFor="name" className="recipe-edit__label">Name</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={selectedRecipe.name} 
                    onInput = {(e)=> handleChange({name: e.target.value})}
                    className="recipe-edit__input" 
                />
                <label htmlFor="cookTime" className="recipe-edit__label">Cook Time</label>
                <input 
                    type="text" 
                    name="cookTime" 
                    id="cookTime" 
                    value={selectedRecipe.cookTime}
                    onInput = {(e)=> handleChange({cookTime: e.target.value})} 
                    className="recipe-edit__input" 
                />
                <label htmlFor="servings" className="recipe-edit__label">Servings</label>
                <input 
                    type="number" min="1" 
                    name="servings" 
                    id="servings" 
                    value={selectedRecipe.servings} 
                    onInput = {(e)=> handleChange({servings: parseInt(e.target.value) || ""})}
                    className="recipe-edit__input" 
                />
                <label htmlFor="instructions" className="recipe-edit__label">Instructions</label>
                <textarea 
                    name="instructions" 
                    id="instructions" 
                    value={selectedRecipe.instructions} 
                    onInput = {(e)=> handleChange({instructions: e.target.value})}
                    className="recipe-edit__input recipe-edit__instructions" 
                />
            </div>

            <br />
            
            <label className="recipe-edit__label">Ingredients</label>

            <div className="recipe-edit__ingredient-grid">
                <div>Name</div>
                <div>Amount</div>
                <div></div>
                {selectedRecipe.ingredients.map(ingredient =>{
                    return <RecipeIngredientEdit 
                                key={ingredient.id} 
                                handleIngredientChange={handleIngredientChange}
                                handleIngredientDelete={handleIngredientDelete}
                                ingredient={ingredient}
                            />
                })}
            </div>

            <div className="recipe-edit__add-ingredient-button-container">
                <button className="btn btn--primary recipe-edit__add-ingredient-button" onClick={()=> handleIngredientAdd()}>Add Ingredient</button>
            </div>
        </div>
    )
}

export default RecipeEdit
