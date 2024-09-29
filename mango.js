let result=  db["modeles"].distinct("genre");

db["modeles"].find({"genre":"Aventure"},{"director":"Spielberg"},{"title":true})

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

