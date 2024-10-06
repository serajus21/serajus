// fetching button category 
const loadCategories = () =>{
    fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    .then((res) => res.json())
    .then(data => displayCategories(data.categories))
    .catch((error) => console(error));
}
const loadPets = () =>{
    fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((res) => res.json())
    .then(data => displayPets(data.pets))
    .catch((error) => console(error));
}

// function



// display
const displayCategories = (categories) => {
    const buttonCategory = document.getElementById('button-category')
    categories.forEach((item) => {
        const button = document.createElement("button");
        button.innerHTML = `
        <button class="btn lg:btn-lg bg-white rounded-3xl font-bold text-2xl space-y-4 border-blue-400 flex gap-6"><img class ="h-10 w-10" src="${item.category_icon}">${item.category}</button>
        `
        
        buttonCategory.append(button)
    });
}

const displayPets = (pets) => {
    const petContainer = document.getElementById('pets');
    pets.forEach(pet => {
        const card = document.createElement('div');
        card.classList = "card bg-base-100"
        card.innerHTML = `
            <figure>
              <img
                src=${pet.image}
                alt=""
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title text-extrabold"> ${pet.pet_name?`${pet.pet_name}`:'Not Available'}</h2>
              <p><i class="fa-solid fa-table-cells-large mr-1"></i>Breed: ${pet.breed?`${pet.breed}`:'Not Available'}</p>
              <p><i class="fa-solid fa-cake-candles mr-1"></i>Birth: ${pet.date_of_birth?`${pet.date_of_birth}`:'Not Available'}</p>
              <p><i class="fa-solid fa-venus-mars mr-1"></i> Gender: ${pet.gender?`${pet.gender}`:'Not Available'}</p>
              <p><i class="fa-solid fa-hand-holding-dollar mr-1"></i>Price: ${pet.price?`${pet.price}`:'Not Available'}</p>
              <div class="flex gap-3 justify-between">
                <button class="btn">
                  <i class="fa-regular fa-thumbs-up"></i>
                </button>
                <button class="btn font-bold text-teal-700">Adopt</button>
                <button class="btn font-bold text-teal-700">Details</button>
              </div>
            </div>
        `
        petContainer.append(card);
    })
}

loadCategories();
loadPets();