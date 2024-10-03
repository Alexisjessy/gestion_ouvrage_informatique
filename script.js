let panier = JSON.parse(localStorage.getItem("panier")) || []; 


function loadJSON() {
  const loader = document.getElementById("loader");
  loader.style.display = "block";

  fetch("./books.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur HTTP: " + response.status);
      }
      return response.json();
    })
    .then((jsondata) => {
      loader.style.display = "none";
      initializeApp(jsondata);
    })
    .catch((error) => {
      loader.style.display = "none";
      console.error("Erreur lors du chargement du JSON:", error);
      alert("Impossible de charger les données des livres.");
    });
}

function initializeApp(jsondata) {
  setupSearch(jsondata);
  setupCategoryDropdown(jsondata);
  setupDisplayAllButton(jsondata);
  setupPanier();
  displayBooks(jsondata);
}


function displayBooks(books) {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  books.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `
      <img src="${book.thumbnailUrl}" alt="${book.title}">
      <h2>${book.title}</h2>
      <p>Auteur(s): ${book.authors.join(", ")}</p>
      <button class="add-to-cart">Ajouter au panier</button>
    `;
    bookCard
      .querySelector(".add-to-cart")
      .addEventListener("click", () => addToCart(book));
    bookCard.addEventListener("click", () => showModal(book));
    bookList.appendChild(bookCard);
  });
}


function showModal(book) {
  const modal = document.getElementById("book-modal");
  document.getElementById("modal-title").textContent = book.title;
  document.getElementById("modal-authors").textContent =
    book.authors.join(", ");
  const date = new Date(Date.parse(book.publishedDate.dt_txt));
  document.getElementById("modal-date").textContent =
    date.toLocaleDateString() || "Date inconnue";
  document.getElementById("modal-description").textContent =
    book.shortDescription || "Pas de description.";

  modal.style.display = "flex";

  document.querySelector(".modal-close").addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}


function setupSearch(jsondata) {
  const searchBar = document.getElementById("search-bar");
  const resultDiv = document.getElementById("result");

  searchBar.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    resultDiv.innerHTML = "";

    if (query === "") {
      resultDiv.style.display = "none";
      displayBooks(jsondata);
      return;
    }

    const filteredBooks = jsondata.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.authors.some((author) => author.toLowerCase().includes(query))
    );

    displayBooks(filteredBooks);
  });
}


function setupCategoryDropdown(jsondata) {
  const categoryBtn = document.getElementById("category-btn");
  const categoryList = document.getElementById("category-list");
  let isCategoryListVisible = false;

  const categories = {};
  jsondata.forEach((book) => {
    book.categories.forEach((category) => {
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(book);
    });
  });

  categoryBtn.addEventListener("click", () => {
    isCategoryListVisible = !isCategoryListVisible;
    categoryList.style.display = isCategoryListVisible ? "block" : "none";
  });

  Object.keys(categories).forEach((category) => {
    const categoryItem = document.createElement("div");
    categoryItem.textContent = category;
    categoryItem.classList.add("category-item");

    categoryItem.addEventListener("click", () => {
      displayBooks(categories[category]);
      categoryList.style.display = "none"; 
    });

    categoryList.appendChild(categoryItem);
  });
}


function setupDisplayAllButton(jsondata) {
  const allBtn = document.getElementById("all-btn");

  allBtn.addEventListener("click", () => {
    displayBooks(jsondata);
  });
}


function addToCart(book) {
  panier.push(book);
  localStorage.setItem("panier", JSON.stringify(panier)); // Sauvegarder dans localStorage
  alert(`${book.title} a été ajouté au panier.`);
  updatePanierDisplay();
}


function updatePanierDisplay() {
  const panierContainer = document.getElementById("panier");
  panierContainer.innerHTML = "";

  if (panier.length === 0) {
    panierContainer.textContent = "Votre panier est vide.";
  } else {
    panier.forEach((book, index) => {
      const bookItem = document.createElement("div");
      bookItem.classList.add("panier-item");
      bookItem.innerHTML = `
        <p>${book.title} - ${book.authors.join(", ")}</p>
        <button class="remove-from-cart">Supprimer</button>
      `;
      bookItem
        .querySelector(".remove-from-cart")
        .addEventListener("click", () => removeFromCart(index));
      panierContainer.appendChild(bookItem);
    });
  }
}


function removeFromCart(index) {
  panier.splice(index, 1);
  localStorage.setItem("panier", JSON.stringify(panier));
  updatePanierDisplay();
}


function setupPanier() {
  updatePanierDisplay();

  document
    .getElementById("valider-panier")
    .addEventListener("click", function () {
      const panier = JSON.parse(localStorage.getItem("panier")) || [];
      if (panier.length > 0) {
        const commandes = JSON.parse(localStorage.getItem("commandes")) || [];
        const dateValidation = new Date().toLocaleString(); 
        commandes.push({ date: dateValidation, items: panier });
        localStorage.setItem("commandes", JSON.stringify(commandes));
        localStorage.removeItem("panier"); 
        alert("Commande validée avec succès !");
        updatePanierDisplay(); 
      } else {
        alert("Votre panier est vide.");
      }
    });

  document.getElementById("history-btn").addEventListener("click", function () {
    window.location.href = "historique.html";
  });
}

window.onload = function () {
  loadJSON();

  const commandes = JSON.parse(localStorage.getItem("commandes")) || [];
  const orderHistoryList = document.getElementById("order-history-list");

  if (orderHistoryList) {
    if (commandes.length === 0) {
      orderHistoryList.innerHTML = "<li>Aucune commande trouvée.</li>";
    } else {
      commandes.forEach((commande) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <strong>Date:</strong> ${commande.date} <br>
          <strong>Articles commandés:</strong>
          <ul>
            ${commande.items
              .map(
                (item) => `<li>${item.title} - ${item.authors.join(", ")}</li>`
              )
              .join("")}
          </ul>
        `;
        orderHistoryList.appendChild(listItem);
      });
    }
  }
};
