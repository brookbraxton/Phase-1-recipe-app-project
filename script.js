// API URL
const apiUrl = 'http://localhost:3000/recipes';

// Global Variables
const shoppingItems = [];
const users = [{ name: 'Alice', favorites: [] }]; // Example user

// Recipe Class
class Recipe {
    constructor(id, title, description, image, ingredients, instructions) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.ingredients = ingredients;
        this.instructions = instructions;
    }
}

// Fetching Recipes
async function fetchRecipes() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const recipes = data.slice(0, 5).map(post => new Recipe(
            post.id,
            post.title,
            post.body,
            'https://via.placeholder.com/150',
            ['Ingredient 1', 'Ingredient 2'],
            'Follow these steps to cook the recipe.'
        ));

        displayRecipes(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

// Posting a New Recipe
function postRecipe(newRecipe) {
    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(newRecipe),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

// Displaying Recipes
function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';  // Clear the list

    recipes.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.textContent = recipe.title;

        // Create a button for marking as favorite
        const favoriteButton = document.createElement('button');
        favoriteButton.textContent = "Mark as Favorite";
        favoriteButton.addEventListener('click', () => markAsFavorite(recipe.id));

        // Append recipe and button
        recipeItem.appendChild(favoriteButton);
        recipeList.appendChild(recipeItem);
    });
}

// Showing Recipe Details
function showRecipeDetails(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    const detailsSection = document.getElementById('recipe-details');

    detailsSection.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}">
        <p>${recipe.description}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        <h3>Instructions:</h3>
        <p>${recipe.instructions}</p>
        <button onclick="closeDetails()">Close</button>
    `;

    detailsSection.style.display = 'block';
}

function closeDetails() {
    document.getElementById('recipe-details').style.display = 'none';
}

// Marking a Recipe as Favorite
function markAsFavorite(recipeId) {
    const user = users[0];  // Assume Alice is logged in
    if (!user.favorites.includes(recipeId)) {
        user.favorites.push(recipeId);
        alert("Recipe marked as favorite!");
    } else {
        alert("Recipe is already a favorite.");
    }
}

// Managing the Shopping List
function addToShoppingList(ingredient) {
    shoppingItems.push(ingredient);
    displayShoppingList();
}

function displayShoppingList() {
    const shoppingListElement = document.getElementById('shoppingItems');
    shoppingListElement.innerHTML = ''; // Clear previous items

    shoppingItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox"> ${item}
            <button onclick="removeFromShoppingList('${item}')">Remove</button>
        `;
        shoppingListElement.appendChild(listItem);
    });
}

function removeFromShoppingList(item) {
    const index = shoppingItems.indexOf(item);
    if (index > -1) {
        shoppingItems.splice(index, 1);
    }
    displayShoppingList();
}

// Handling Button Clicks
document.addEventListener('DOMContentLoaded', () => {
    fetchRecipes(); // Fetch and display recipes from the mock API

    // Back Button
    const backBtn = document.getElementById("backBtn");
    backBtn.addEventListener("click", () => {
        alert("Back button clicked!");
    });

    // Filter Button
    const filterBtn = document.getElementById("filterBtn");
    filterBtn.addEventListener("click", () => {
        alert("Filter button clicked!");
    });

    // Sort Button
    const sortBtn = document.getElementById("sortBtn");
    sortBtn.addEventListener("click", () => {
        alert("Sort button clicked!");
    });

    // Add to Shopping List
    document.getElementById('addToShoppingListBtn').addEventListener('click', () => {
        const ingredientList = document.querySelectorAll("#ingredientList li");
        ingredientList.forEach(ingredient => {
            const ingredientText = ingredient.getAttribute("data-ingredient");
            addToShoppingList(ingredientText);
        });
    });
});

async function fetchRecipes() {
  const apiUrl = 'your_api_endpoint_here'; // Replace with your API endpoint
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayRecipes(data.recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}

function displayRecipes(recipes) {
  const recipeList = document.getElementById('recipe-list'); // Ensure this element exists in your HTML
  recipeList.innerHTML = ''; // Clear previous recipes

  recipes.forEach(recipe => {
    const recipeItem = document.createElement('div');
    recipeItem.className = 'recipe-item';
    recipeItem.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}">
      <p>${recipe.description}</p>
      <button onclick="showRecipeDetails('${recipe.id}')">View Details</button>
    `;
    recipeList.appendChild(recipeItem);
  });
}

function showRecipeDetails(recipeId) {
  // Assuming you have a way to get recipe details from the previously fetched recipes
  const recipe = recipes.find(r => r.id === recipeId);
  const detailsSection = document.getElementById('recipe-details'); // Ensure this element exists in your HTML

  detailsSection.innerHTML = `
    <h2>${recipe.title}</h2>
    <img src="${recipe.image}" alt="${recipe.title}">
    <p>${recipe.description}</p>
    <h3>Ingredients:</h3>
    <ul>
      ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
    </ul>
    <h3>Instructions:</h3>
    <ol>
      ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
    </ol>
    <button onclick="closeDetails()">Close</button>
  `;

  detailsSection.style.display = 'block'; // Show details section
}

function closeDetails() {
  document.getElementById('recipe-details').style.display = 'none'; // Hide details section
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  fetchRecipes(); // Fetch and display recipes
});

  
