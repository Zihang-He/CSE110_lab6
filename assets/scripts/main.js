// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. TODO - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.

  let r = localStorage.getItem('recipes');
  if (!r){
    return [];
  }
  return JSON.parse(r);
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. TODO - Get a reference to the <main> element
  // A11. TODO - Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>
  let main_r = document.querySelector('main');
  for(let r = 0; r < recipes.length; r++){
    let recipe = document.createElement('recipe-card');
    recipe.data = recipes[r];
    main_r.appendChild(recipe);
  }
  
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  let str_recipes = JSON.stringify(recipes);
  localStorage.setItem('recipes',str_recipes);
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
  let main = document.querySelector('main');
  // B2. TODO - Get a reference to the <form> element
  let form = document.querySelector('form');
  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  form.addEventListener('submit',(event)=>{
    // Steps B4-B9 will occur inside the event listener from step B3
    event.preventDefault();
    // B4. TODO - Create a new FormData object from the <form> element reference above
    let fd = new FormData(form);
    // B5. TODO - Create an empty object (I'll refer to this object as recipeObject to
    //            make this easier to read), and then extract the keys and corresponding
    //            values from the FormData object and insert them into recipeObject
    let recipeObject = {};
    for(const [key,val] of fd){
      recipeObject[key] = val;
    }
    // B6. TODO - Create a new <recipe-card> element
    let new_rc = document.createElement('recipe-card');
    // B7. TODO - Add the recipeObject data to <recipe-card> using element.data
    new_rc.data = recipeObject;
    // B8. TODO - Append this new <recipe-card> to <main>
    
    main.appendChild(new_rc);
    // B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
    //            then save the recipes array back to localStorage
    let recipes = getRecipesFromStorage();
    recipes.push(recipeObject);
    saveRecipesToStorage(recipes);
  })
  
  // B10. TODO - Get a reference to the "Clear Local Storage" button
  let clear_stg = document.querySelector('.danger');
  // B11. TODO - Add a click event listener to clear local storage button
  clear_stg.addEventListener('click',(event)=>{
    // Steps B12 & B13 will occur inside the event listener from step B11
    // B12. TODO - Clear the local storage
    //event.preventDefault();
    localStorage.clear();
    // B13. TODO - Delete the contents of <main>
    main.innerHTML = '';
  })
  
}
