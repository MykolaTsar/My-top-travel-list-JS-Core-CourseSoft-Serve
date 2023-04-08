const addTravelModal = document.querySelector('#add-modal');
const startAddTravelButton = document.querySelector('header button');

const joinCanselButtonModal = document.querySelector('.btn--passive');


const toggleTravelModal = () => {
  addTravelModal.classList.toggle('visible');
}

const removeTravelModal = () => {
  addTravelModal.classList.remove('visible');
}

startAddTravelButton.addEventListener('click', toggleTravelModal);
joinCanselButtonModal.addEventListener('click', removeTravelModal);
