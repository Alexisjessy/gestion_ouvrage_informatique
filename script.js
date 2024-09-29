// Load JSON and manage data
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

// Initialize the app with all features
function initializeApp(jsondata) {
  setupSearch(jsondata);
  setupCategoryDropdown(jsondata);
  setupDisplayAllButton(jsondata);
  displayBooks(jsondata); // Display all books on load
}

// Display books in a grid
function displayBooks(books) {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = ""; // Clear previous content

  books.forEach(book => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `
      <img src="${book.thumbnailUrl}" alt="${book.title}">
      <h2>${book.title}</h2>
      <p>Auteur(s): ${book.authors.join(", ")}</p>
    `;
    bookCard.addEventListener("click", () => showModal(book));
    bookList.appendChild(bookCard);
  });
}

// Modal to show book details
function showModal(book) {
  const modal = document.getElementById("book-modal");
  document.getElementById("modal-title").textContent = book.title;
  document.getElementById("modal-authors").textContent = book.authors.join(", ");
  const date = new Date(Date.parse(book.publishedDate.dt_txt));
  document.getElementById("modal-date").textContent = date.toLocaleDateString() || "Date inconnue";
  document.getElementById("modal-description").textContent = book.shortDescription || "Pas de description.";

  modal.style.display = "flex";

  // Close modal on click outside or close button
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

    const filteredBooks = jsondata.filter(book => 
      book.title.toLowerCase().includes(query) || 
      book.authors.some(author => author.toLowerCase().includes(query))
    );

    displayBooks(filteredBooks);
  });
}

// Setup category dropdown
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
      categoryList.style.display = "none"; // Hide list after selection
    });

    categoryList.appendChild(categoryItem);
  });
}

// Setup display all books button
function setupDisplayAllButton(jsondata) {
  const allBtn = document.getElementById("all-btn");

  allBtn.addEventListener("click", () => {
    displayBooks(jsondata); 
  });
}

// Call loadJSON on page load
window.onload = loadJSON;
