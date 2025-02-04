import { supabase } from "./main";

async function loadRecipes() {
    const { data: recipes, error } = await supabase
        .from('recipe')
        .select('*');

    if (error) {
        console.error('Error fetching recipes:', error);
        return;
    }

    console.log('Fetched recipes:', recipes);

    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.innerHTML = ''; // Clear existing recipes

    recipes.forEach((recipe) => {
        // Log each recipe's imageUrl for debugging
        console.log('Recipe imageUrl:', recipe.image_url);

        const card = document.createElement('div');
        card.classList.add('user-card');
        const imageUrl = recipe.image_url || 'path/to/fallback/image.jpg'; // Update with actual fallback image URL

        card.innerHTML = `
            <div class="card">
                <div class="img-display">
                    <img src="${imageUrl}" alt="${recipe.rec_name}" />
                </div>
                <div class="recipe">
                    <h3>${recipe.rec_name}</h3>
                    <button class="rate-button" data-recipe-id="${recipe.id}">
                        <i class="fa fa-cart-shopping recipe-cart-icon" data-recipe-id="${recipe.id}" data-recipe-name="${recipe.rec_name}" data-recipe-price="${recipe.rec_price}" data-recipe-img="${imageUrl}"></i>
                    </button>
                </div>
                Price: $${recipe.rec_price}
                <div class="email">@${recipe.user_name}</div>
            </div>
        `;

        recipeContainer.appendChild(card);
    });

    // Attach event listeners to the dynamically created cart icons
    document.querySelectorAll('.recipe-cart-icon').forEach(icon => {
        icon.addEventListener('click', (event) => {
            const recipeId = event.target.dataset.recipeId;
            const recipeName = event.target.dataset.recipeName;
            const recipePrice = event.target.dataset.recipePrice;
            const recipeImg = event.target.dataset.recipeImg;

            console.log(`Cart icon clicked for recipe ID: ${recipeId}`);
            console.log(`Recipe price: $${recipePrice}`); // Log the price

            // Update the modal content
            document.getElementById('ratingModalLabel').innerText = recipeName;
            const modalImageContainer = document.querySelector('.modal-image-container');
            modalImageContainer.innerHTML = `<img src="${recipeImg}" alt="${recipeName}" class="img-modal">`;

            // Display the recipe price in the modal
            document.getElementById('recipePrice').innerText = `Price: $${recipePrice}`;

            // Store the recipe name in the Buy button's dataset
            const buyButton = document.getElementById('submitRating');
            buyButton.dataset.recipeName = recipeName;
            buyButton.dataset.recipePrice = recipePrice; // Store the price as well

            // Show the modal
            const ratingModal = new bootstrap.Modal(document.getElementById('ratingModal'));
            ratingModal.show();
        });
    });
}

async function saveOrder(recipeName, recipePrice) {
    const { data, error } = await supabase
        .from('order')
        .insert([{ order_name: recipeName, order_price: recipePrice }]);

    if (error) {
        console.error('Error saving order:', error);
    } else {
        console.log('Order saved:', data);
        // Redirect to orders.html after saving the order
        window.location.href = 'orders.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadRecipes();

    // Add event listener for the search input
    document.querySelector('.search input').addEventListener('input', filterRecipes);

    // Add event listener for the Buy button in the modal
    document.getElementById('submitRating').addEventListener('click', (event) => {
        const recipeName = event.target.dataset.recipeName;
        const recipePrice = event.target.dataset.recipePrice; // Make sure to get the price

        if (recipeName && recipePrice) {
            saveOrder(recipeName, recipePrice); // Pass both the name and price
        } else {
            console.error('Recipe name or price is missing');
        }
    });

});

function filterRecipes() {
    const searchInput = document.querySelector('.search input').value.toLowerCase();
    const recipeCards = document.querySelectorAll('.user-card');

    recipeCards.forEach(card => {
        const recipeName = card.querySelector('.recipe h3').textContent.toLowerCase();
        if (recipeName.includes(searchInput)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}
