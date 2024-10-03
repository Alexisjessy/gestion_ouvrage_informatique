



window.onload = function() {
    const commandes = JSON.parse(localStorage.getItem("commandes")) || [];
    const orderHistoryList = document.getElementById("order-history-list");

    if (commandes.length === 0) {
        orderHistoryList.innerHTML = "<li>Aucune commande trouvée.</li>";
    } else {
        commandes.forEach(commande => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>Date:</strong> ${commande.date} <br>
                <strong>Articles commandés:</strong>
                <ul>
                    ${commande.items.map(item => `<li>${item.title} - ${item.authors.join(", ")}</li>`).join("")}
                </ul>
            `;
            orderHistoryList.appendChild(listItem);
        });
    }
};
