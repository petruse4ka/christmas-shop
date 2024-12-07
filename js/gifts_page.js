/* Burger Menu */

const burgerIcon = document.querySelector(".header__burger-menu");
const menu = document.querySelector(".header__list");
const documentBody = document.querySelector(".body");
const menuLinks = document.querySelectorAll(".header__link");

const handleBurgerMenu = () => {
  burgerIcon.classList.toggle("active");
  menu.classList.toggle("active");
  documentBody.classList.toggle("noscroll");
};

const scrollTop = () => {
  window.scrollTo({
    top: 0,
  });
};

burgerIcon.addEventListener("click", () => {
  handleBurgerMenu();
  scrollTop();
});

menuLinks.forEach((item) => {
  item.addEventListener("click", () => {
    if (menu.classList.contains("active")) {
      handleBurgerMenu();
    }
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    burgerIcon.classList.remove("active");
    menu.classList.remove("active");
    if (!giftsModal.open) {
      documentBody.classList.remove("noscroll");
    }
  }
});

/* Button up */

const buttonUp = document.querySelector(".button-up");

buttonUp.addEventListener("click", () => {
  scrollTop();
});

const handleButtonUp = () => {
  if (window.scrollY >= 300 && window.innerWidth <= 768) {
    buttonUp.classList.add("active");
  } else if (window.scrollY < 300 || window.innerWidth > 768) {
    buttonUp.classList.remove("active");
  }
};

window.addEventListener("scroll", () => {
  handleButtonUp();
});

window.addEventListener("resize", () => {
  handleButtonUp();
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

import { gifts } from "./gifts.js";

let randomGifts = shuffle(gifts);
const giftsCatalog = document.querySelector(".gifts__list");
const giftsCategoryFilters = document.querySelectorAll(".gifts__tabs-radio");

const populateGifts = (array) => {
  giftsCatalog.textContent = "";

  array.forEach((item) => {
    const giftsItem = document.createElement("li");
    const giftsImageContainer = document.createElement("div");
    const giftsImage = document.createElement("img");
    const giftsContentContainer = document.createElement("div");
    const giftsName = document.createElement("h3");
    const giftsCategory = document.createElement("h4");

    giftsItem.classList.add("gifts__item");
    giftsItem.classList.add("hide");
    giftsItem.id = item.id;
    giftsImageContainer.classList.add("gifts__image-container");
    giftsImage.classList.add("gifts__image");
    giftsImage.src = item.imageSrc;
    giftsImage.alt = item.imageAlt;
    giftsImage.width = 310;
    giftsImage.height = 230;
    giftsContentContainer.classList.add("gifts__content-container");
    giftsName.classList.add("gifts__name");
    giftsName.textContent = item.name;
    giftsCategory.classList.add("gifts__subtitle");
    giftsCategory.classList.add(item.categoryClass);
    giftsCategory.textContent = item.category;

    giftsImageContainer.appendChild(giftsImage);
    giftsContentContainer.appendChild(giftsName);
    giftsContentContainer.appendChild(giftsCategory);
    giftsItem.appendChild(giftsImageContainer);
    giftsItem.appendChild(giftsContentContainer);
    giftsCatalog.appendChild(giftsItem);

    giftsItem.classList.remove("hide");
  });
  addGiftItemClickListeners();
};

populateGifts(randomGifts);

/* Filter Gift Cards */

const filterGifts = (category) => {
  let filteredGifts = [];
  if (category === "all") {
    filteredGifts = randomGifts;
  } else {
    filteredGifts = randomGifts.filter(
      (item) => item.categoryClass === category
    );
  }
  populateGifts(filteredGifts);
  addGiftItemClickListeners();
};

giftsCategoryFilters.forEach((category) => {
  category.addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    filterGifts(selectedCategory);
  });
});

/* Modal Window */

const giftsModal = document.querySelector(".modal__gifts");
const modalCloseButton = document.querySelector(".modal__close-button");

function populateModal(gift) {
  const imageContainer = document.querySelector(".modal__image-container");
  const image = document.createElement("img");
  const descriptionContainer = document.querySelector(
    ".modal__description-container"
  );
  const descriptionName = document.createElement("h3");
  const descriptionSubtitle = document.createElement("h4");
  const descriptionText = document.createElement("p");
  const liveItem = document.getElementById("live");
  const createItem = document.getElementById("create");
  const loveItem = document.getElementById("love");
  const dreamItem = document.getElementById("dream");

  imageContainer.textContent = "";
  descriptionContainer.textContent = "";
  liveItem.textContent = "";
  createItem.textContent = "";
  loveItem.textContent = "";
  dreamItem.textContent = "";

  image.classList.add("modal__image");
  image.src = gift.imageSrc;
  image.alt = gift.imageAlt;
  image.width = 320;
  image.height = 230;
  descriptionName.classList.add("modal__description-name");
  descriptionName.textContent = gift.name;
  descriptionSubtitle.classList.add("modal__description-subtitle");
  descriptionSubtitle.classList.add(gift.categoryClass);
  descriptionSubtitle.textContent = gift.category;
  descriptionText.classList.add("modal__description-text");
  descriptionText.textContent = gift.description;

  imageContainer.appendChild(image);
  descriptionContainer.appendChild(descriptionName);
  descriptionContainer.appendChild(descriptionSubtitle);
  descriptionContainer.appendChild(descriptionText);

  for (let i = 0; i < 4; i += 1) {
    const itemCategory = document.createElement("div");
    const itemRank = document.createElement("div");
    const rankList = document.createElement("ul");
    let category;
    let rankValue;
    let rank;

    if (i === 0) {
      category = "Live";
      rankValue = gift.superpowers.live;
      rank = parseInt(gift.superpowers.live, 10) / 100;
    } else if (i === 1) {
      category = "Create";
      rankValue = gift.superpowers.create;
      rank = parseInt(gift.superpowers.create, 10) / 100;
    } else if (i === 2) {
      category = "Love";
      rankValue = gift.superpowers.love;
      rank = parseInt(gift.superpowers.love, 10) / 100;
    } else if (i === 3) {
      category = "Dream";
      rankValue = gift.superpowers.dream;
      rank = parseInt(gift.superpowers.dream, 10) / 100;
    }

    itemCategory.classList.add("modal__description-item-category");
    itemCategory.textContent = category;
    itemRank.classList.add("modal__description-item-rank");
    itemRank.textContent = rankValue;
    rankList.classList.add("modal__description-rank-list");

    for (let j = 0; j < rank; j += 1) {
      const rankItem = document.createElement("li");
      rankItem.classList.add("modal__description-rank-item");
      rankItem.classList.add("colored");
      rankList.appendChild(rankItem);
    }

    for (let k = rank; k < 5; k += 1) {
      const rankItem = document.createElement("li");
      rankItem.classList.add("modal__description-rank-item");
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
  const giftItems = document.querySelectorAll(".gifts__item");

  giftItems.forEach((item) => {
    item.addEventListener("click", () => {
      const gift = gifts.find((element) => element.id === item.id);
      populateModal(gift);
      giftsModal.showModal();
      documentBody.classList.add("noscroll");
    });
  });
}

modalCloseButton.addEventListener("click", () => {
  giftsModal.close();
  documentBody.classList.remove("noscroll");
});

giftsModal.addEventListener("click", (event) => {
  if (
    event.clientX < giftsModal.getBoundingClientRect().left ||
    event.clientX > giftsModal.getBoundingClientRect().right ||
    event.clientY < giftsModal.getBoundingClientRect().top ||
    event.clientY > giftsModal.getBoundingClientRect().bottom
  ) {
    giftsModal.close();
    documentBody.classList.remove("noscroll");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && giftsModal.open) {
    documentBody.classList.remove("noscroll");
  }
});
