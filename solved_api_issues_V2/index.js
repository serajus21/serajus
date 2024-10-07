const petsAPI = 'https://openapi.programming-hero.com/api/peddy/pets';
let petsData = [];


const loadCategories = () => {
  fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    .then((res) => res.json())
    .then(data => displayCategories(data.categories))
    .catch((error) => console.error("Error fetching categories:", error));
};

// Fetching & displaying
const loadPets = () => {
  fetch(petsAPI)
    .then((res) => res.json())
    .then((data) => {
      petsData = data.pets;
      console.log("All pets data:", petsData);
      displayPets(petsData);
    })
    .catch((error) => console.error("Error fetching pets:", error));
};

// categories as buttons
const displayCategories = (categories) => {
  const buttonCategory = document.getElementById('button-category');
  categories.forEach((item) => {
    const button = document.createElement("button");
    button.innerHTML = `
      <button class="btn lg:btn-lg bg-white rounded-3xl font-bold text-2xl space-y-4 border-blue-400 flex gap-6" onclick="loadPetsByCategory('${item.category}')">
        <img class="h-10 w-10" src="${item.category_icon}">${item.category}
      </button>
    `;
    buttonCategory.append(button);
  });
};

// sorting by price
let isAscending = true;

const sortByPrice = () => {
  const sortedPets = [...petsData].sort((a, b) => {
    const priceA = a.price ? parseFloat(a.price) : 0;
    const priceB = b.price ? parseFloat(b.price) : 0;
    
    if (isAscending) {
      return priceA - priceB; // Ascending order
    } else {
      return priceB - priceA; // Descending order
    }
  });

  isAscending = !isAscending; // Toggle the sorting order for the next click
  displayPets(sortedPets); // Display sorted pets
};

// Event listener for sorting button
document.getElementById('sort-price-btn').addEventListener('click', sortByPrice);


// pet cards
const displayPets = (pets) => {
  const petContainer = document.getElementById('pets');
  petContainer.innerHTML = '';
  if (pets.length === 0) {
    petContainer.innerHTML = '<p>No pets found in this category.</p>';
    return;
  }
  pets.forEach(pet => {
    const card = document.createElement('div');
    card.classList = "card bg-base-100";
    card.innerHTML = `
      <figure>
        <img src="${pet.image}" alt="Pet Image"/>
      </figure>
      <div class="card-body">
        <h2 class="card-title text-extrabold">${pet.pet_name ? pet.pet_name : 'Not Available'}</h2>
        <p><i class="fa-solid fa-table-cells-large mr-1"></i>Breed: ${pet.breed ? pet.breed : 'Not Available'}</p>
        <p><i class="fa-solid fa-cake-candles mr-1"></i>Birth: ${pet.date_of_birth ? pet.date_of_birth : 'Not Available'}</p>
        <p><i class="fa-solid fa-venus-mars mr-1"></i>Gender: ${pet.gender ? pet.gender : 'Not Available'}</p>
        <p><i class="fa-solid fa-hand-holding-dollar mr-1"></i>Price: ${pet.price ? pet.price : 'Not Available'}</p>
        <div class="flex gap-3 justify-between">
          <button class="btn">
            <i class="fa-regular fa-thumbs-up"></i>
          </button>
          <button class="btn font-bold text-teal-700">Adopt</button>
          <button class="btn font-bold text-teal-700">Details</button>
        </div>
      </div>
    `;
    petContainer.append(card);
  });
};


// --- modal starts ----------------------------------------------------------------------------

// --- modal ends -----------------------------------------------------------------------------

// loading
const loadPetsByCategory = (category) => {
  console.log("Selected category:", category);
  const filteredPets = petsData.filter(pet => pet.category === category);
  console.log("Filtered pets:", filteredPets);
  displayPets(filteredPets);
};


loadCategories();
loadPets();
