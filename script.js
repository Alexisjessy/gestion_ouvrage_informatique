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
// function setupSearch(jsondata) {
//   const searchBar = document.getElementById("search-bar");
//   const resultDiv = document.getElementById("result");

//   if (!searchBar || !resultDiv) {
//     console.error("Erreur: Les éléments 'search-bar' ou 'result' sont introuvables.");
//     return;
//   }

//   // Ajout d'un écouteur d'événement pour la barre de recherche
//   searchBar.addEventListener("input", function () {
//     const query = this.value.toLowerCase();
//     resultDiv.innerHTML = ""; // Vider les résultats précédents

//     if (query.length === 0) {
//       // Si la recherche est vide, afficher tous les livres
//       resultDiv.style.display = "none";
//       displayBooks(jsondata);
//       return;
//     }

//     // Créer des ensembles pour les auteurs et les titres filtrés
//     const filteredAuthors = new Set();
//     const filteredTitles = new Set();

//     // Recherche dans les données JSON
//     jsondata.forEach((book) => {
//       const authors = book.authors || [];
//       const title = book.title || "";

//       // Filtrer les auteurs
//       authors.forEach((author) => {
//         if (author.toLowerCase().includes(query)) {
//           filteredAuthors.add(author);
//         }
//       });

//       // Filtrer les titres
//       if (title.toLowerCase().includes(query)) {
//         filteredTitles.add(title);
//       }
//     });

//     // Affichage des résultats
//     displaySearchResults(filteredAuthors, filteredTitles, jsondata);
//   });
// }

// function displaySearchResults(filteredAuthors, filteredTitles, jsondata) {
//   const resultDiv = document.getElementById("result");
//   resultDiv.innerHTML = ""; // Vider les résultats précédents

//   // Vérification si aucun résultat
//   if (filteredAuthors.size === 0 && filteredTitles.size === 0) {
//     resultDiv.style.display = "none";
//     return;
//   }

//   // Affichage des auteurs filtrés
//   if (filteredAuthors.size > 0) {
//     const authorHeader = document.createElement("h3");
//     authorHeader.textContent = "Auteurs";
//     resultDiv.appendChild(authorHeader);

//     filteredAuthors.forEach((author) => {
//       const authorItem = document.createElement("li");
//       authorItem.textContent = author;
//       authorItem.style.cursor = "pointer";

//       // Quand on clique sur un auteur, afficher ses livres
//       authorItem.addEventListener("click", () => {
//         const authorBooks = jsondata.filter((book) =>
//           book.authors.includes(author)
//         );
//         displayBooks(authorBooks);
//         searchBar.value = ""; // Vider la barre de recherche après sélection
//       });

//       resultDiv.appendChild(authorItem);
//     });
//   }

//   // Affichage des titres filtrés
//   if (filteredTitles.size > 0) {
//     const titleHeader = document.createElement("h3");
//     titleHeader.textContent = "Titres";
//     resultDiv.appendChild(titleHeader);

//     filteredTitles.forEach((title) => {
//       const titleItem = document.createElement("li");
//       titleItem.textContent = title;
//       titleItem.style.cursor = "pointer";

//       // Quand on clique sur un titre, afficher les livres correspondants
//       titleItem.addEventListener("click", () => {
//         const titleBooks = jsondata.filter((book) =>
//           book.title === title
//         );
//         displayBooks(titleBooks);
//         searchBar.value = ""; // Vider la barre de recherche après sélection
//       });

//       resultDiv.appendChild(titleItem);
//     });
//   }

//   // Afficher les résultats
//   resultDiv.style.display = "block";
//   resultDiv.style.maxHeight = "300px";
//   resultDiv.style.overflow = "auto";
// }

// // Fonction pour afficher tous les livres ou ceux correspondant à la recherche
// function displayBooks(books) {
//   const resultDiv = document.getElementById("book-results");

//   if (!resultDiv) {
//     console.error("Erreur: L'élément 'book-results' est introuvable.");
//     return;
//   }

//   resultDiv.innerHTML = ""; // Vider les résultats précédents

//   if (books.length === 0) {
//     resultDiv.textContent = "Aucun résultat trouvé.";
//   } else {
//     books.forEach((book) => {
//       const bookItem = document.createElement("div");
//       bookItem.classList.add("book-item");

//       // Afficher la vignette du livre
//       const img = document.createElement("img");
//       img.src = book.thumbnailUrl;
//       img.alt = book.title;
//       bookItem.appendChild(img);

//       // Afficher le titre et les auteurs
//       const title = document.createElement("h2");
//       title.textContent = book.title;
//       bookItem.appendChild(title);

//       const authors = document.createElement("p");
//       authors.textContent = `Auteur(s): ${book.authors.join(", ")}`;
//       bookItem.appendChild(authors);

//       resultDiv.appendChild(bookItem);
//     });
//   }
// }

// // Fonction pour afficher tous les livres au chargement de la page
// function displayAllBooks(jsondata) {
//   displayBooks(jsondata);
// }

// Appel de la fonction `displayAllBooks` si la recherche est vide
// window.onload = () => {
//   loadJSON().then((jsondata) => {
//     displayAllBooks(jsondata); // Afficher tous les livres au chargement
//     setupSearch(jsondata); // Configurer la recherche
//   });
// };


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
