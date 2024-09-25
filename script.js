
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
      displayAllBooks(jsondata);
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
    const figure = document.createElement("div");
    figure.classList.add("figure-container");
    const article = document.createElement("article");
    section.appendChild(figure);
    let isShortDescriptionVisible = false;


    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container")
    const img = document.createElement("img");
    img.src = book.thumbnailUrl;
    article.appendChild(imgContainer);
    imgContainer.appendChild(img);

    const title = document.createElement("h1");
    title.textContent = book.title;
    article.appendChild(title);

    const isbn = document.createElement("p");
    isbn.textContent = "Numero ISBN:" + book.isbn;
    article.appendChild(isbn);
    try {
      const publishedDate = document.createElement("p");
      const date = new Date(Date.parse(book.publishedDate.dt_txt));
      publishedDate.textContent = "Date de publication: " + date.toLocaleDateString();
      article.appendChild(publishedDate);
    } catch (error) {
      loader.style.display = "none";
      console.error("Erreur lors du chargement de la date:", error);
    }

    const pageCount = document.createElement("p");
    pageCount.textContent = "Nombre de page: " + book.pageCount;
    article.appendChild(pageCount);
    if (book.pageCount == 0) {
      pageCount.textContent = "";
    }

    const authorPara = document.createElement("p");
    authorPara.textContent = "Auteur(s): " + book.authors.join(", ");
    article.appendChild(authorPara);

    const descriptionPara = document.createElement("div");
    descriptionPara.style.display = "none";

    if (book.shortDescription == undefined) {
      descriptionPara.textContent = "";

    } else {
      descriptionPara.textContent = "Description: " + book.shortDescription;
      article.appendChild(descriptionPara);
    }
    figure.appendChild(article);


    figure.addEventListener("click", () => {

      isShortDescriptionVisible = !isShortDescriptionVisible;
      if (isShortDescriptionVisible) {
        descriptionPara.style.display = "block";
        descriptionPara.style.maxHeight = "300px";
        figure.style.transform = "scale(1.25)";
        figure.style.overflow = "hidden";

      } else {
        descriptionPara.style.display = "none";
        descriptionPara.style.maxHeight = "0";
        figure.style.transform = "none";

      }
    });
  });
}

function setupSearch(jsondata) {
  const searchBar = document.getElementById("search-bar");
  const resultDiv = document.getElementById("result");

  searchBar.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    resultDiv.innerHTML = "";

    const filteredAuthors = new Set();
    jsondata.forEach((book) => {
      const authors = book.authors || [];
      authors.forEach((author) => {
        if (author.toLowerCase().startsWith(query) && query.length > 0) {
          filteredAuthors.add(author);
        }

      });

    });
    const filteredTitles = new Set();
    jsondata.forEach((book) => {
      const titles = book.title || [];
      titles.forEach((title) => {
        if (title.toLowerCase().startsWith(query) && query.length > 0) {
          filteredTitles.add(title);
        }
      });
    });
  

    // Max  authors display
    const authorsArray = Array.from(filteredAuthors).slice(0, 50);
    if (authorsArray.length > 0) {
      authorsArray.forEach((author) => {
        const authorItem = document.createElement("li");
        authorItem.textContent = author;
        authorItem.style.cursor = "pointer";
        resultDiv.style.display = "block";
        resultDiv.style.maxHeight = "300px";
        resultDiv.style.overflow = "scroll";
        resultDiv.style.overflowX = "hidden";

        authorItem.addEventListener("click", () => {
          const authorBooks = jsondata.filter((book) =>
            book.authors.includes(author)
          );
          displayBooks(authorBooks);
        });

        resultDiv.appendChild(authorItem);
      });
    }

      const titleArray = Array.from(filteredTitles).slice(0, 50);
      if (titleArray.length > 0) {
        titleArray.forEach((title) => {
          const titleItem = document.createElement("li");
          titleItem.textContent = title;
          titleItem.style.cursor = "pointer";
          resultDiv.style.display = "block";
          resultDiv.style.maxHeight = "300px";
          resultDiv.style.overflow = "scroll";
          resultDiv.style.overflowX = "hidden";

          titleItem.addEventListener("click", () => {
            const titleBooks = jsondata.filter((book) =>
              book.title.includes(title)
            );

            displayBooks(titleBooks);
          });
          resultDiv.appendChild(titleItem);
        
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
          categoryList.style.overflow = "scroll";
          categoryList.style.overflowX = "hidden";
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



    function displayAllBooks(jsondata) {
      let displayAllBtn = document.getElementById("all-btn");

      displayAllBtn.addEventListener("click", () => {

        displayBooks(jsondata);


      })
    }


    window.onload = loadJSON;
