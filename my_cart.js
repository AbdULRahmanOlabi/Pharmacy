function getProductPrice() {
  const productName = document.getElementById("productNameInput").value.toLowerCase();

  fetch("products.json")
    .then(response => response.json())
    .then(data => {
      const matchingProducts = data.filter(product => product.title.toLowerCase().includes(productName));

      if (matchingProducts.length > 0) {
        const productDetailsDiv = document.getElementById("productDetails");
        productDetailsDiv.innerHTML = "";

        matchingProducts.forEach(product => {
          const productCard = document.createElement("div");
          productCard.classList.add("product-card");

          const image = document.createElement("img");
          image.src = product.image;
          image.alt = product.title;
          image.classList.add("product-image");
          productCard.appendChild(image);

          const title = document.createElement("h2");
          title.classList.add("product-title");
          title.textContent = product.title;
          productCard.appendChild(title);

          const description = document.createElement("p");
          description.classList.add("product-description");
          description.textContent = product.description;
          productCard.appendChild(description);

          const price = document.createElement("p");
          price.classList.add("product-price");
          price.textContent = "Price: " + product.price;
          productCard.appendChild(price);

          const quantityInput = document.createElement("input");
          quantityInput.type = "number";
          quantityInput.id = "quantityInput_" + product.id;
          quantityInput.placeholder = "Quantity";
          quantityInput.min = "1";
          productCard.appendChild(quantityInput);

          const addButton = document.createElement("button");
          addButton.textContent = "Add to Cart";
          addButton.addEventListener("click", () => addToCart(product));
          productCard.appendChild(addButton);

          productDetailsDiv.appendChild(productCard);
        });
      } else {
        alert("Product not found.");
      }
    })
    .catch(error => {
      console.log("Error fetching data:", error);
      alert("An error occurred while fetching data.");
    });
}

function addToCart(product) {
  const quantityInput = document.getElementById("quantityInput_" + product.id);
  const quantity = parseInt(quantityInput.value);

  if (isNaN(quantity) || quantity <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cartItems.find(item => item.name === product.title)) {
    alert("Product is already in the cart.");
  } else {
    cartItems.push({ name: product.title, quantity });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartItems();
    alert("Product added to cart.");
  }
}

function updateCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartItemsList = document.querySelector("#cartItems tbody");

  cartItemsList.innerHTML = "";
  cartItems.forEach((item, index) => {
    const row = document.createElement("tr");

    const productNameCell = document.createElement("td");
    productNameCell.textContent = item.name;
    row.appendChild(productNameCell);

    const quantityCell = document.createElement("td");
    quantityCell.textContent = item.quantity;
    row.appendChild(quantityCell);

    // Fetch the product price
    getProductByName(item.name)
      .then(product => {
        const priceCell = document.createElement("td");
        const totalPrice = product.price * item.quantity;
        priceCell.textContent = `$${totalPrice.toFixed(2)}`;
        row.appendChild(priceCell);

        const actionsCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.setAttribute("onclick", `removeFromCart(${index})`);
        actionsCell.appendChild(deleteButton);
        row.appendChild(actionsCell);

        cartItemsList.appendChild(row);
      })
      .catch(error => {
        console.log("Error fetching product:", error);
      });
  });
}


function removeFromCart(index) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCartItems();
}

function checkout() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cartItems.length > 0) {
    // Fetch the products data
    fetch("products.json")
      .then(response => response.json())
      .then(data => {
        let totalPrice = 0;

        // Calculate total price
        cartItems.forEach(item => {
          const product = data.find(p => p.title.toLowerCase() === item.name.toLowerCase());

          if (product) {
            totalPrice += product.price * item.quantity;
          }
        });

        // Save total price to local storage
        localStorage.setItem("totalPrice", totalPrice);

        // Show thank you message
        alert("Thank you for your purchase!");

        // Clear the cart
        localStorage.removeItem("cartItems");
        updateCartItems();

        // Show the table with updated cart items
        const cartItemsList = document.querySelector("#cartItems tbody");
        cartItemsList.innerHTML = "";
        cartItems.forEach((item, index) => {
          const row = document.createElement("tr");

          const productNameCell = document.createElement("td");
          productNameCell.textContent = item.name;
          row.appendChild(productNameCell);

          const quantityCell = document.createElement("td");
          quantityCell.textContent = item.quantity;
          row.appendChild(quantityCell);

          // Fetch the product price
          getProductByName(item.name)
            .then(product => {
              const priceCell = document.createElement("td");
              const totalPrice = product.price * item.quantity;
              priceCell.textContent = `$${totalPrice.toFixed(2)}`;
              row.appendChild(priceCell);

              const actionsCell = document.createElement("td");
              const deleteButton = document.createElement("button");
              deleteButton.textContent = "Delete";
              deleteButton.classList.add("delete-button");
              deleteButton.setAttribute("onclick", `removeFromCart(${index})`);
              actionsCell.appendChild(deleteButton);
              row.appendChild(actionsCell);

              cartItemsList.appendChild(row);
            })
            .catch(error => {
              console.log("Error fetching product:", error);
            });
        });
      })
      .catch(error => {
        console.log("Error fetching data:", error);
        alert("An error occurred while fetching data.");
      });
  } else {
    alert("Your cart is empty.");
  }
}


function getProductByName(name) {
  return fetch("products.json")
    .then(response => response.json())
    .then(data => {
      return data.find(product => product.title.toLowerCase().includes(name.toLowerCase()));
    })
    .catch(error => {
      console.log("Error fetching data:", error);
      alert("An error occurred while fetching data.");
    });
}

updateCartItems();
