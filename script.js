
function loadJSON() {
  const loader = document.getElementById("loader");
  loader.style.display = "block";

  fetch("./books.json")
    .then((response) => response.json())
    .then((jsondata) => {
      loader.style.display = "none";
      displayBooks(jsondata);
      setupSearch(jsondata);
      setupCategoryDropdown(jsondata);
    })
    .catch((error) => {
      loader.style.display = "none";
      console.error("Erreur lors du chargement du JSON:", error);
    });
}

function displayBooks(jsondata) {
  const section = document.getElementById("book-list");
  section.innerHTML = "";

  jsondata.forEach((book) => {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.src = book.thumbnailUrl;
    article.appendChild(img);

    const title = document.createElement("h1");
    title.textContent = book.title;
    article.appendChild(title);

    const authorPara = document.createElement("p");
    authorPara.textContent = "Auteur(s): " + book.authors.join(", ");
    article.appendChild(authorPara);

    const descriptionPara = document.createElement("p");
    descriptionPara.textContent = "Description: " + book.shortDescription;
    article.appendChild(descriptionPara);

    section.appendChild(article);
  });
}

function setupSearch(jsondata) {
  const searchBar = document.getElementById("search-bar");
  const resultDiv = document.getElementById("result");

  searchBar.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    resultDiv.innerHTML = "";

    // Filtrer les auteurs en fonction de la requête
    const filteredAuthors = new Set();
    jsondata.forEach((book) => {
      const authors = book.authors || [];
      authors.forEach((author) => {
        if (author.toLowerCase().startsWith(query) && query.length > 0) {
          filteredAuthors.add(author);
        }
      });
    });

    // Limiter à 5 résultats maximum
    const authorsArray = Array.from(filteredAuthors).slice(0, 5);
    if (authorsArray.length > 0) {
      authorsArray.forEach((author) => {
        const authorItem = document.createElement("p");
        authorItem.textContent = author;
        authorItem.style.cursor = "pointer";

        authorItem.addEventListener("click", () => {
          const authorBooks = jsondata.filter((book) =>
            book.authors.includes(author)
          );
          displayBooks(authorBooks);
        });

        resultDiv.appendChild(authorItem);
      });
    }
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
    if (isCategoryListVisible) {
      categoryList.style.display = "block";
      categoryList.style.maxHeight = "300px";
    } else {
      categoryList.style.display = "none";
      categoryList.style.maxHeight = "0";
    }
  });

  Object.keys(categories).forEach((category) => {
    const categoryItem = document.createElement("div");
    categoryItem.textContent = category;
    categoryItem.className = "category-item";

    categoryItem.addEventListener("click", () => {
      displayBooks(categories[category]);
    });

    categoryList.appendChild(categoryItem);
  });
}

window.onload = loadJSON;
