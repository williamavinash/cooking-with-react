import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import RecipeEdit from "./RecipeEdit";
import "../css/app.css"
import { v4 as uuidv4 } from 'uuid';
export const recipeContext = React.createContext()

const LOCAL_STORAGE_KEY = "cookWithReact.recipe"
function App (){
  const [recipe, setRecipe]= useState(sampleRecipe)
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  //setSelectedRecipeId will take selectedRecipeId as an input hance on passing id from handleRecipeSelect to setSelectedRecipeId tells that passed id == selectedRecipeId
  const selectedRecipe = recipe.find(recipe=> recipe.id === selectedRecipeId)
  const recipeContextValue = { 
    // handleRecipeAdd:handleRecipeAdd, both are similar
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }
 
  useEffect(()=>{
    const recipeJSONfromLS = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(recipeJSONfromLS != null){
      setRecipe(recipeJSONfromLS)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipe))
  },[recipe])

  function handleRecipeSelect(id){ 
    setSelectedRecipeId(id)
  }

  function handleRecipeChange(id, editRecipe){
    const newRecipes = [...recipe]
    const index = newRecipes.findIndex(r=> r.id === id)
    newRecipes[index] = editRecipe
    setRecipe(newRecipes)
  }

  function handleRecipeAdd(){
    const newRecipe = {
      id: uuidv4(),
      name: "",
      cookTime: "",
      servings: null,
      instructions: "",
      ingredients: [
        {
          id: uuidv4(),
          name: "",
          amount: ""
        }
      ]
    }
    setSelectedRecipeId(newRecipe.id)
    // recipe.push(newRecipe) 
    //this above will not work as this will only push but not re-render our page but setRecipe will push as well as re-render our page
    setRecipe([...recipe, newRecipe])
    //In above line, ...recipe tells to take all the recipe present in our recipe array and add a newRecipe to make a brand new array
  }
  function handleRecipeDelete(id){
    if(selectedRecipeId != null && selectedRecipeId === id){
      setSelectedRecipeId(undefined)
    }
    setRecipe(recipe.filter(recipe=> recipe.id !== id))   
  }
  return (
    <recipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes = {recipe}/>
      {selectedRecipe && <RecipeEdit selectedRecipe={selectedRecipe}/>}
    </recipeContext.Provider>
  )
}


const sampleRecipe = [
  {
      id: 1,
      name: "Plain Rice",
      cookTime: "1:45",
      servings: 3,
      instructions: "1. Put water into cooker\n2. Put cooker inside oven\n3. Eat Rice",
      ingredients: [
        {
          id: 1,
          name: "Rice",
          amount: "2 kg"
        },
        {
          id: 2,
          name: "Water",
          amount: "1 Litre"
        }
      ]
  },
  {
      id: 2,
      name: "Veg Momos",
      cookTime: "5:00",
      servings: 5,
      instructions: "1. Put momos into cooker\n2. Put cooker over gas\n3. Eat and enjoy momos",
      ingredients: [
        {
          id: 1,
          name: "Rice Floor",
          amount: "0.5 kg"
        },
        {
          id: 2,
          name: "Chutney",
          amount: "250 gm"
        }
      ]
  }
]

export default App;
