const addTravelModal = document.querySelector('#add-modal');
const startAddTravelButton = document.querySelector('header button');
const backdropElement = document.querySelector('#backdrop');
const canselButtonModal = addTravelModal.querySelector('.btn--passive');
const addButtonModal = canselButtonModal.nextElementSibling;
const inputs = addTravelModal.querySelectorAll('input'); 
const centralFirstTextBlock = document.querySelector('#entry-text');
const deleteModalWindow = document.querySelector('#delete-modal');

const travels = [];

const toggleBackdropElement = () => {
  backdropElement.classList.toggle('visible');
};

const changeCentalFirstText = () => {
  if (travels.length === 0) {
    centralFirstTextBlock.style.display = 'block';
  } else {
    centralFirstTextBlock.style.display = 'none';
  };
};

// закриття модального вікна видалення елементу
const closeDeletionTravelModal = () => {
  toggleBackdropElement();
  deleteModalWindow.classList.remove('visible');
};

const deleteTravel = bindedTravelId => {
  let travelIndex = 0;
  for (const travel of travels) {
    if (travel.id === bindedTravelId) {
      break;
    };
    travelIndex++;
  };
  travels.splice(travelIndex, 1);
  const listUl = document.querySelector('#travel-list');
  listUl.children[travelIndex].remove();

  closeDeletionTravelModal();
  changeCentalFirstText();
};

const confirmDeleteModalWindowButton = bindedTravelId => {
  deleteModalWindow.classList.add('visible');
  toggleBackdropElement();

  const deletingModalWindowCancelButton = deleteModalWindow.querySelector('.btn--passive');
  let deletingModalWindowConfirmButton = deleteModalWindow.querySelector('.btn--danger');

  deletingModalWindowConfirmButton.replaceWith(deletingModalWindowConfirmButton.cloneNode(true));
  deletingModalWindowConfirmButton = deleteModalWindow.querySelector('.btn--danger');
  


  deletingModalWindowCancelButton.removeEventListener('click', closeDeletionTravelModal);
  deletingModalWindowCancelButton.addEventListener('click', closeDeletionTravelModal);
  deletingModalWindowConfirmButton.addEventListener('click', deleteTravel.bind(null, bindedTravelId));
};




const createNewTravelElement = (id, title, imageUrl, rating, date) => {
  const newTravelElement = document.createElement('li');
  newTravelElement.className = 'travel-element';
  newTravelElement.innerHTML = `
  <div class='travel-element__image'>
  <img src='${imageUrl}' alt='${title}'>
  </div>
  <div>
  <h2>${title}</h2>
  <p>${rating}/10 stars</p>
  <br>
  <p>${date}</p>
  </div>
  `;
  newTravelElement.addEventListener('click', confirmDeleteModalWindowButton.bind(null, id));

  const listUl = document.querySelector('#travel-list');
  listUl.appendChild(newTravelElement);
};
//скасувати видалення елементу подорожі
const closeModalWindow = () => {
  addTravelModal.classList.remove('visible');
};

const showTravelModal = () => {
  //додати модальне вікно внесення подорожі
  addTravelModal.classList.add('visible');
  toggleBackdropElement();
};

const clearTravelInputs = () => {
  for (const userInput of inputs) {
    userInput.value = '';
  };
};
//скасування видалення модального вікна заповнення форми
closeModalWindow();
const cancelTravelModal = () => {
  closeModalWindow();
  toggleBackdropElement();
  clearTravelInputs();
};

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
    isNaN(Date.parse(dateValue)) ||
    !/^\d{2}[-/.]\d{2}[-/.]\d{4}$/.test(dateValue)
    ) {
      alert('You schould enter correct data!');
      return;
    };
    
  const newTravel = {
    id: Math.random().toString(),
    title: titleValue,
    image: imgValue,
    rating: ratingValue,
    date: dateValue
  };
  travels.push(newTravel);
  console.log(travels);
  closeModalWindow();
  toggleBackdropElement();
  clearTravelInputs();
  createNewTravelElement(
    newTravel.id,
    newTravel.title,
    newTravel.image,
    newTravel.rating,
    newTravel.date
  );
  changeCentalFirstText();
};

const backdropClick = () => { 
  closeModalWindow();
  closeDeletionTravelModal();
  clearTravelInputs();
};
  
  startAddTravelButton.addEventListener('click', showTravelModal);
  backdropElement.addEventListener('click', backdropClick);
  canselButtonModal.addEventListener('click', cancelTravelModal);
  addButtonModal.addEventListener('click', addTravel);
  