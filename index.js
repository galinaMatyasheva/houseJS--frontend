let homesData = [];

window.onload = async function init() {
  homesData = mockdata;
  render(homesData);
};

const onKeyUpFilter = () => {
  const inputFilter = document.getElementById("filter");
  const filterValue = inputFilter.value;

  if (filterValue.length >= 3) {
    let homeFilter = homesData.filter((home) =>
      home.title.toLowerCase().includes(filterValue.toLowerCase())
    );
    render(homeFilter);
  } else {
    render(homesData);
  }
};

const render = (homes) => {
  const filterNoResults = document.getElementById("filter-no-results");
  const buttonSeeMore = document.getElementById("button-see-more");
  filterNoResults.style.display = homes.length === 0 ? "flex" : "none";
  buttonSeeMore.style.display = homes.length === 0 ? "none" : "flex";

  const houseGallery = document.getElementById("gallery");

  while (houseGallery.firstChild) {
    houseGallery.removeChild(houseGallery.firstChild);
  }

  homes.map((item, index) => {
    const houseGalleryCard = document.createElement("a");
    houseGalleryCard.href = `/details/[${item.id}]`;
    houseGalleryCard.className = "gallery__card";
    houseGalleryCard.style.marginRight = homes.length <= 3 ? "10px" : "";
    houseGallery.style.justifyContent = homes.length < 3 ? "start" : "";
    houseGalleryCard.id = `homes-${index}`;

    const houseGalleryCardImg = document.createElement("div");
    houseGalleryCardImg.className = "gallery-card__img-wrap";

    const img = new Image();
    img.src = item.img;
    img.alt = "img";
    img.className = "gallery-card__img";

    const type = document.createElement("p");
    type.innerText = item.type.replace(/([A-Z][a-z]+)/g, " $1 ").trim();
    type.className = "gallery-card__house-type";
    type.style.backgroundColor =
      item.type === "IndependentLiving" ? "#006f79" : "#ec6608";

    const houseGalleryCardText = document.createElement("div");
    houseGalleryCardText.className = "gallery-card__text";

    const textTitle = document.createElement("h2");
    textTitle.innerText = item.title;
    textTitle.className = "gallery-card__text-title";

    const address = document.createElement("p");
    address.className = "gallery-card__text-address";
    address.innerText = item.address;

    const priceText = document.createElement("p");
    priceText.innerText = "New properties for Sale from ";
    const price = document.createElement("span");
    price.className = "gallery-card__price";
    price.innerText = `£${item.price}`;

    const ownership = document.createElement("p");
    ownership.className = "gallery-card__text-ownership";
    ownership.innerText = "Shared Ownership Available";

    houseGallery.appendChild(houseGalleryCard);
    houseGalleryCard.appendChild(houseGalleryCardImg);
    houseGalleryCardImg.appendChild(img);
    houseGalleryCardImg.appendChild(type);
    houseGalleryCard.appendChild(houseGalleryCardText);
    houseGalleryCardText.appendChild(textTitle);
    houseGalleryCardText.appendChild(address);
    houseGalleryCardText.appendChild(priceText);
    priceText.appendChild(price);
    houseGalleryCardText.appendChild(ownership);
  });
};
