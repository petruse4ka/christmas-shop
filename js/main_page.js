/* Burger Menu */

const burgerIcon = document.querySelector('.header__burger-menu');
const menu = document.querySelector('.header__list');
const documentBody = document.querySelector('.body');
const menuLinks = document.querySelectorAll('.header__link');

const handleBurgerMenu = () => {
  burgerIcon.classList.toggle('active');
  menu.classList.toggle('active');
  documentBody.classList.toggle('noscroll');
};

const scrollTop = () => {
  window.scrollTo({
    top: 0,
  });
};

burgerIcon.addEventListener('click', () => {
  handleBurgerMenu();
  scrollTop();
});

menuLinks.forEach((item) => {
  item.addEventListener('click', () => {
    if (menu.classList.contains('active')) {
      handleBurgerMenu();
    }
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    burgerIcon.classList.remove('active');
    menu.classList.remove('active');
    if (!giftsModal.open) {
      documentBody.classList.remove('noscroll');
    }
  }
});

/* Shuffle array with the Fisher–Yates */

function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

/* Gift Cards */

import { gifts } from './gifts.js';

let randomGifts = shuffle(gifts);
const giftsList = document.querySelector('.best__list');

const populateGifts = (array) => {
  for (let i = 0; i < 4; i += 1) {
    const giftsItem = document.createElement('li');
    const giftsImageContainer = document.createElement('div');
    const giftsImage = document.createElement('img');
    const giftsContentContainer = document.createElement('div');
    const giftsName = document.createElement('h3');
    const giftsCategory = document.createElement('h4');

    giftsItem.classList.add('best__item');
    giftsItem.id = array[i].id;
    giftsImageContainer.classList.add('best__image-container');
    giftsImage.classList.add('best__image');
    giftsImage.src = array[i].imageSrc;
    giftsImage.alt = array[i].imageAlt;
    giftsImage.width = 310;
    giftsImage.height = 230;
    giftsContentContainer.classList.add('best__content-container');
    giftsName.classList.add('best__name');
    giftsName.textContent = array[i].name;
    giftsCategory.classList.add('best__subtitle');
    giftsCategory.classList.add(array[i].categoryClass);
    giftsCategory.textContent = array[i].category;

    giftsImageContainer.appendChild(giftsImage);
    giftsContentContainer.appendChild(giftsName);
    giftsContentContainer.appendChild(giftsCategory);
    giftsItem.appendChild(giftsImageContainer);
    giftsItem.appendChild(giftsContentContainer);
    giftsList.appendChild(giftsItem);
  }
  addGiftItemClickListeners();
};

populateGifts(randomGifts);

/* Modal Window */

const giftsModal = document.querySelector('.modal__gifts');
const modalCloseButton = document.querySelector('.modal__close-button');

function populateModal(gift) {
  const imageContainer = document.querySelector('.modal__image-container');
  const image = document.createElement('img');
  const descriptionContainer = document.querySelector(
    '.modal__description-container'
  );
  const descriptionName = document.createElement('h3');
  const descriptionSubtitle = document.createElement('h4');
  const descriptionText = document.createElement('p');
  const liveItem = document.getElementById('live');
  const createItem = document.getElementById('create');
  const loveItem = document.getElementById('love');
  const dreamItem = document.getElementById('dream');

  imageContainer.textContent = '';
  descriptionContainer.textContent = '';
  liveItem.textContent = '';
  createItem.textContent = '';
  loveItem.textContent = '';
  dreamItem.textContent = '';

  image.classList.add('modal__image');
  image.src = gift.imageSrc;
  image.alt = gift.imageAlt;
  image.width = 320;
  image.height = 230;
  descriptionName.classList.add('modal__description-name');
  descriptionName.textContent = gift.name;
  descriptionSubtitle.classList.add('modal__description-subtitle');
  descriptionSubtitle.classList.add(gift.categoryClass);
  descriptionSubtitle.textContent = gift.category;
  descriptionText.classList.add('modal__description-text');
  descriptionText.textContent = gift.description;

  imageContainer.appendChild(image);
  descriptionContainer.appendChild(descriptionName);
  descriptionContainer.appendChild(descriptionSubtitle);
  descriptionContainer.appendChild(descriptionText);

  for (let i = 0; i < 4; i += 1) {
    const itemCategory = document.createElement('div');
    const itemRank = document.createElement('div');
    const rankList = document.createElement('ul');
    let category;
    let rankValue;
    let rank;

    if (i === 0) {
      category = 'Live';
      rankValue = gift.superpowers.live;
      rank = parseInt(gift.superpowers.live, 10) / 100;
    } else if (i === 1) {
      category = 'Create';
      rankValue = gift.superpowers.create;
      rank = parseInt(gift.superpowers.create, 10) / 100;
    } else if (i === 2) {
      category = 'Love';
      rankValue = gift.superpowers.love;
      rank = parseInt(gift.superpowers.love, 10) / 100;
    } else if (i === 3) {
      category = 'Dream';
      rankValue = gift.superpowers.dream;
      rank = parseInt(gift.superpowers.dream, 10) / 100;
    }

    itemCategory.classList.add('modal__description-item-category');
    itemCategory.textContent = category;
    itemRank.classList.add('modal__description-item-rank');
    itemRank.textContent = rankValue;
    rankList.classList.add('modal__description-rank-list');

    for (let j = 0; j < rank; j += 1) {
      const rankItem = document.createElement('li');
      rankItem.classList.add('modal__description-rank-item');
      rankItem.classList.add('colored');
      rankList.appendChild(rankItem);
    }

    for (let k = rank; k < 5; k += 1) {
      const rankItem = document.createElement('li');
      rankItem.classList.add('modal__description-rank-item');
      rankList.appendChild(rankItem);
    }

    if (i === 0) {
      liveItem.appendChild(itemCategory);
      liveItem.appendChild(itemRank);
      liveItem.appendChild(rankList);
    } else if (i === 1) {
      createItem.appendChild(itemCategory);
      createItem.appendChild(itemRank);
      createItem.appendChild(rankList);
    } else if (i === 2) {
      loveItem.appendChild(itemCategory);
      loveItem.appendChild(itemRank);
      loveItem.appendChild(rankList);
    } else if (i === 3) {
      dreamItem.appendChild(itemCategory);
      dreamItem.appendChild(itemRank);
      dreamItem.appendChild(rankList);
    }
  }
}

function addGiftItemClickListeners() {
  const giftItems = document.querySelectorAll('.best__item');

  giftItems.forEach((item) => {
    item.addEventListener('click', () => {
      const gift = gifts.find((element) => element.id === item.id);
      populateModal(gift);
      giftsModal.showModal();
      documentBody.classList.add('noscroll');
    });
  });
}

modalCloseButton.addEventListener('click', () => {
  giftsModal.close();
});

giftsModal.addEventListener('click', (event) => {
  if (
    event.clientX < giftsModal.getBoundingClientRect().left ||
    event.clientX > giftsModal.getBoundingClientRect().right ||
    event.clientY < giftsModal.getBoundingClientRect().top ||
    event.clientY > giftsModal.getBoundingClientRect().bottom
  ) {
    giftsModal.close();
    documentBody.classList.remove('noscroll');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && giftsModal.open) {
    documentBody.classList.remove('noscroll');
  }
});

/* Slider */

const sliderRow = document.querySelector('.slider__row');
const slider = document.querySelector('.slider__list');
const leftButton = document.getElementById('slideLeft');
const rightButton = document.getElementById('slideRight');
let currentSliderPosition = 0;
let maxScrolls;

const scrollSlider = () => {
  const scrollWidth =
    (slider.scrollWidth -
      parseFloat(window.getComputedStyle(sliderRow).width)) /
    maxScrolls;
  const newPosition = currentSliderPosition * scrollWidth;
  slider.style.transform = `translateX(-${newPosition}px)`;
  if (currentSliderPosition === 0) {
    leftButton.classList.add('disabled');
  }
  if (currentSliderPosition > 0) {
    leftButton.classList.remove('disabled');
  }
  if (currentSliderPosition < maxScrolls) {
    rightButton.classList.remove('disabled');
  }
  if (currentSliderPosition === maxScrolls) {
    rightButton.classList.add('disabled');
  }
};

rightButton.addEventListener('click', () => {
  if (currentSliderPosition < maxScrolls) {
    currentSliderPosition += 1;
    scrollSlider();
  }
});

leftButton.addEventListener('click', () => {
  if (currentSliderPosition > 0) {
    currentSliderPosition -= 1;
    scrollSlider();
  }
});

window.addEventListener('load', () => {
  if (window.innerWidth > 768) {
    maxScrolls = 3;
  } else {
    maxScrolls = 6;
  }
  currentSliderPosition = 0;
  scrollSlider();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    maxScrolls = 3;
  } else {
    maxScrolls = 6;
  }
  currentSliderPosition = 0;
  scrollSlider();
});

/* Timer */

const dayCount = document.getElementById('days');
const hourCount = document.getElementById('hours');
const minuteCount = document.getElementById('minutes');
const secondCount = document.getElementById('seconds');

const getFinalTime = () => {
  const now = new Date();
  const year = now.getUTCFullYear() + 1;
  return new Date(`${year}-01-01T00:00:00Z`).getTime();
};
let finalTime = getFinalTime();

const updateTimer = () => {
  const currentTime = new Date().getTime();
  const timeRemaining = finalTime - currentTime;

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  dayCount.textContent = days;
  hourCount.textContent = hours;
  minuteCount.textContent = minutes;
  secondCount.textContent = seconds;

  if (timeRemaining <= 0) {
    finalTime = getFinalTime();
  }
};

updateTimer();

setInterval(updateTimer, 1000);
