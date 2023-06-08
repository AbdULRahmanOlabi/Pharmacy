function searchProduct() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
  
    if (searchInput.trim() === "") {
      alert("Please enter a search term.");
      return;
    }
  
    fetch("products.json")
      .then(response => response.json())
      .then(data => {
        const searchResults = data.filter(product => product.title.toLowerCase().includes(searchInput));
  
        if (searchResults.length > 0) {
          const searchResultsDiv = document.getElementById("searchResults");
          searchResultsDiv.innerHTML = "";
  
          searchResults.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product-card");
  
            const image = document.createElement("img");
            image.src = product.image;
            image.alt = product.title;
            productDiv.appendChild(image);
  
            const title = document.createElement("h2");
            title.textContent = product.title;
            productDiv.appendChild(title);
  
            const description = document.createElement("p");
            description.textContent = "Description: " + product.description;
            productDiv.appendChild(description);
  
            const price = document.createElement("p");
            price.textContent = "Price: " + product.price;
            productDiv.appendChild(price);
  
            searchResultsDiv.appendChild(productDiv);
          });
        } else {
          alert("No results found.");
        }
      })
      .catch(error => {
        console.log("Error fetching data:", error);
        alert("An error occurred while fetching data.");
      });
  }
  