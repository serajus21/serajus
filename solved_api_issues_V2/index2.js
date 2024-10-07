const petsAPI = 'https://openapi.programming-hero.com/api/peddy/pets';
let petsData = [];

const loadCategories = () => {
  fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    .then((res) => res.json())
    .then(data => displayCategories(data.categories))
    .catch((error) => console.error("Error fetching categories:", error));
};

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

const displayPets = (pets) => {
  const petContainer = document.getElementById('pets');
  petContainer.innerHTML = '';  // Clear previous pets
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
          <button class="btn font-bold text-teal-700" id="details-btn-${pet.id}">Details</button>
        </div>
      </div>
    `;
    petContainer.append(card);

    // Adding event listener for the "Details" button to open modal
    document.getElementById(`details-btn-${pet.id}`).addEventListener('click', () => openPetDetails(pet));
  });
};

const openPetDetails = (pet) => {
  // Populating modal with pet details
  document.getElementById('modal-pet-name').innerText = `Name: ${pet.pet_name}`;
  document.getElementById('modal-pet-breed').innerText = `Breed: ${pet.breed}`;
  document.getElementById('modal-pet-birth').innerText = `Birth: ${pet.date_of_birth}`;
  document.getElementById('modal-pet-gender').innerText = `Gender: ${pet.gender}`;
  document.getElementById('modal-pet-price').innerText = `Price: ${pet.price}`;
  
  // Show the modal
  document.getElementById('pet-modal').classList.remove('hidden');
};

// Close modal functionality
document.getElementById('close-modal-btn').addEventListener('click', () => {
  document.getElementById('pet-modal').classList.add('hidden');
});

const loadPetsByCategory = (category) => {
  console.log("Selected category:", category);
  const filteredPets = petsData.filter(pet => pet.category === category);
  console.log("Filtered pets:", filteredPets);
  displayPets(filteredPets);
};

loadCategories();
loadPets();
