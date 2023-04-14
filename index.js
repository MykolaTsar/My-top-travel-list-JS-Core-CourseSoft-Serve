const addTravelModal = document.querySelector('#add-modal');
const startAddTravelButton = document.querySelector('header button');
const backdropElement = document.querySelector('#backdrop');
const canselButtonModal = addTravelModal.querySelector('.btn--passive');
const addButtonModal = canselButtonModal.nextElementSibling;
const inputs = addTravelModal.querySelectorAll('input'); 
const centralFirstTextBlock = document.querySelector('#entry-text');

const travels = [];

const changeCentalFirstText = () => {
  if (travels.length === 0) {
    centralFirstTextBlock.style.display = 'block';
  } else {
    centralFirstTextBlock.style.display = 'none';
  }
}

const deleteTravel = travelId => {
  let travelIndex = 0;
  for (const travel of travels) {
    if (travel.id === travelId) {
      break;
    }
    travelIndex++;
  }
  travels.splice(travelIndex, 1);
  const listUl = document.querySelector('#travel-list');
  listUl.children[travelIndex].remove();
}

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
  newTravelElement.addEventListener('click', deleteTravel.bind(null, id));
  const listUl = document.querySelector('#travel-list');
  listUl.appendChild(newTravelElement);
}

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
      alert('You schould enter correct data!');
    }
    
    const newTravel = {
      id: Math.random().toString(),
      title: titleValue,
      image: imgValue,
      rating: ratingValue,
      date: dateValue
    }
    
    travels.push(newTravel);
    toggleTravelModal();
    clearTravelInputs();
    changeCentalFirstText();
    createNewTravelElement(
      newTravel.id,
      newTravel.title,
      newTravel.image,
      newTravel.rating,
      newTravel.date
    );
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
  