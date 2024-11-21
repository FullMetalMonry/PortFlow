// Хранение продуктов
const products = [];

// Добавление продукта
function addProduct() {
  const name = document.getElementById('product-name').value.trim();
  const quantity = parseFloat(document.getElementById('product-quantity').value);
  if (!name || isNaN(quantity) || quantity <= 0) {
    alert('Please enter valid ingredient name and quantity.');
    return;
  }

  products.push({ name, quantity });
  renderProductList();
  clearInputFields();
}

// Очистка полей ввода
function clearInputFields() {
  document.getElementById('product-name').value = '';
  document.getElementById('product-quantity').value = '';
}

// Отображение списка продуктов
function renderProductList() {
  const list = document.getElementById('product-list');
  list.innerHTML = products.map((p, index) => `
    <div class="flex justify-between items-center bg-gray-200 p-2 rounded mb-2">
      <span>${p.name} (${p.quantity})</span>
      <button class="text-red-500" onclick="removeProduct(${index})">Remove</button>
    </div>
  `).join('');
}

// Удаление продукта
function removeProduct(index) {
  products.splice(index, 1);
  renderProductList();
}

// Логика поиска рецептов
async function findRecipes() {
  if (products.length === 0) {
    alert('Please add some products first.');
    return;
  }

  const ingredient = products[0]?.name || ''; // Берем первый ингредиент из списка
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.meals) {
      displayRecipes([]);
      return;
    }

    displayRecipes(data.meals);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    alert('Failed to fetch recipes. Please try again later.');
  }

  // Переход к секции рецептов
  const recipesSection = document.getElementById('recipes');
  if (recipesSection) {
    recipesSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    alert('Recipes section is not found on the page!');
  }
}

// Отображение рецептов

function displayRecipes(recipes) {
  const recipesSection = document.getElementById('recipes');
  if (recipes.length === 0) {
    recipesSection.innerHTML = `<p class="text-gray-600">No recipes found for the given ingredients.</p>`;
    return;
  }

  recipesSection.innerHTML = recipes.map(recipe => `
    <div class="recipe-card bg-white shadow-lg rounded-lg overflow-hidden w-72 md:w-80 lg:w-96 mx-auto mb-6">
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="w-full h-48 object-cover object-center">
      <div class="p-4">
        <h4 class="text-lg font-semibold text-gray-900">${recipe.strMeal}</h4>
        <a href="https://www.themealdb.com/meal.php?c=${recipe.idMeal}" target="_blank" class="text-purple-600 hover:underline text-sm">View Recipe</a>
      </div>
    </div>
  `).join('');
}

