const addTravelModal = document.querySelector('#add-modal');
const startAddTravelButton = document.querySelector('header button');
const backdropElement = document.querySelector('#backdrop');
const canselButtonModal = addTravelModal.querySelector('.btn--passive');
const addButtonModal = canselButtonModal.nextElementSibling;
const inputs = addTravelModal.querySelectorAll('input'); 
console.log(inputs);

const travels = [];

const toggleBackdropElement = () => {
  backdropElement.classList.toggle('visible');
}

const toggleTravelModal = () => {
  addTravelModal.classList.toggle('visible');
  toggleBackdropElement();
}

const clearTravelInputs = () => {
  for (const userInput of inputs) {
    userInput.value = '';
  }
}

const addTravel = () => {
  const titleValue = inputs[0].value;
  const imgValue = inputs[1].value;
  const ratingValue = inputs[2].value;
  const dateValue = inputs[3].value;

  if (
    titleValue.trim() === '' ||
    imgValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 10 ||
    isNaN(Date.parse(dateValue))
    // || !/^\d{4}-\d{2}-\d{2}$/.test(dateValue)//можна використати RegularExp
  ) {
    alert('You schould enter correct values!');
  }

  const newTravel = {
    title: titleValue,
    image: imgValue,
    rating: ratingValue,
    date: dateValue
  }

  travels.push(newTravel);
  console.log(travels);
  toggleTravelModal();
  clearTravelInputs();
}


const cancelTravelModal = () => {
  addTravelModal.classList.remove('visible');
  backdropElement.classList.remove('visible');
  clearTravelInputs();
}

startAddTravelButton.addEventListener('click', toggleTravelModal);
canselButtonModal.addEventListener('click', cancelTravelModal);
backdropElement.addEventListener('click', toggleTravelModal);
addButtonModal.addEventListener('click', addTravel);
