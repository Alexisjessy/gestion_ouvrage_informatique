// if (isLoading) {
//     return <Loader />;

//   }

// let request = new XMLHttpRequest();
// request.open("GET", requestURL);
// request.responseType = "json";
// request.send();

// fetch('./books.json')
//     .then(response => response.json())
//     .then(jsondata => {
//         console.log(jsondata);
//         populateHeader(jsondata);
//     })
//     .catch(error => console.error('Error fetching JSON:', error));

// let header = document.querySelector("header");
// let section = document.querySelector("section");


// function populateHeader(jsonObj) {
//     let myH1 = document.createElement("h1");
//     myH1.textContent = jsonObj.title;
//     header.appendChild(myH1);

//     let myPara = document.createElement("p");
//     myPara.textContent = "Description: " + jsonObj.longDescription + " " + jsonObj.authors;
//     header.appendChild(myPara);
// }


// function displayBooks(jsondata) {
//     jsondata.forEach(book => {
//         let myH1 = document.createElement("h1");
//         myH1.textContent = book.title;
//         header.appendChild(myH1);
//     });
// }

function loadJSON() {
    fetch('./books.json')
        .then(response => response.json())
        .then(jsondata => {

            //     let infoDiv = document.getElementById('info');
            //     infoDiv.innerHTML = `
            //     <p><b>Titre:</b> ${jsondata.title}</p>
            //     <p><b>Description:</b> ${jsondata.longDescription}</p>
            //     <p><b>Auteur:</b> ${jsondata.authors}</p>
            //     <p><b>Date de publication:</b> ${jsondata.publishedDate}</p>
            // `;


            displayBooks(jsondata);
          
           search(jsondata)

        })
        .catch(error => console.error('Error fetching JSON:', error));
}
window.onload = loadJSON;

let header = document.querySelector("header");
let section = document.querySelector("section");



function displayBooks(jsondata) {


    jsondata.forEach(jsondata => {

        let article = document.createElement("article");

        // let searchBar = document.getElementById('search-bar');
        // searchBar.textcontent = jsondata.authors;
        let img = document.createElement("img");
        img.src = jsondata.thumbnailUrl;

        article.appendChild(img);

        let myH1 = document.createElement("h1");
        myH1.textContent = jsondata.title;
        article.appendChild(myH1);

        let myPara1 = document.createElement("p");
        myPara1.textContent = "Author: " + jsondata.authors;
        article.appendChild(myPara1);

        let myPara2 = document.createElement("p");
        myPara2.textContent = "Description: " + jsondata.shortDescription;
        article.appendChild(myPara2);

        section.appendChild(article);
    });
}


function search(jsondata) {
    const searchBar = document.getElementById('search-bar');
    const resultDiv = document.getElementById('result');
  
    searchBar.addEventListener('input', function () {
        let query = (this.value || '').toLowerCase(); 
        resultDiv.innerHTML = ''; 
        
        jsondata.forEach(item => {
            let authors = item.authors || []; 
             
     
            let filteredAuthors = authors.filter(author => (author || '').toLowerCase().includes(query));

       
            if (filteredAuthors.length > 0) {
                resultDiv.innerHTML += filteredAuthors.join('<br>') + '<br>' < 5;
                
            }
        });
    });

  
    document.addEventListener('click', function (e) {
       
        if (!searchBar.contains(e.target)) {
            resultDiv.innerHTML = ''; 
            
        }
    });
}

