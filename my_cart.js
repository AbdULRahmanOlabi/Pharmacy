function getProductPrice() {
    const productName = document.getElementById("productNameInput").value.toLowerCase();

    fetch("products.json")
      .then(response => response.json())
      .then(data => {
        const product = data.find(product => product.title.toLowerCase() === productName);

        if (product) {
          const productDetailsDiv = document.getElementById("productDetails");
          productDetailsDiv.innerHTML = `
            <div class="product-card">
              <img src="${product.image}" alt="${product.title}" class="product-image">
              <h2 class="product-title">${product.title}</h2>
              <p class="product-price">Description: ${product.description}</p>
              <p class="product-price">Price: ${product.price}</p>
              <input type="number" id="quantityInput" placeholder="Quantity" min="1">
              <button onclick="addToCart('${productName}')">Add to Cart</button>
            </div>
          `;
        } else {
          alert("Product not found.");
        }
      })
      .catch(error => {
        console.log("Error fetching data:", error);
        alert("An error occurred while fetching data.");
      });
  }

  function addToCart(productName) {
    const quantityInput = document.getElementById("quantityInput");
    const quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (cartItems.find(item => item.name === productName)) {
      alert("Product is already in the cart.");
    } else {
      cartItems.push({ name: productName, quantity });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCartItems();
      alert("Product added to cart.");
    }
  }

  function updateCartItems() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartItemsList = document.getElementById("cartItems");

    cartItemsList.innerHTML = "";
    cartItems.forEach((item, index) => {
      const listItem = document.createElement("li");
      const itemContent = document.createElement("div");
      itemContent.classList.add("cart-item-content");

      const itemName = document.createElement("span");
      itemName.classList.add("item-name");
      itemName.textContent = item.name;
      itemContent.appendChild(itemName);

      const itemQuantity = document.createElement("span");
      itemQuantity.classList.add("item-quantity");
      itemQuantity.textContent = ` Quantity: ${item.quantity}`;
      itemContent.appendChild(itemQuantity);

      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = 'Delete';
      deleteButton.classList.add("delete-button");
      deleteButton.setAttribute("onclick", `removeFromCart(${index})`);
      itemContent.appendChild(deleteButton);

      listItem.appendChild(itemContent);
      cartItemsList.appendChild(listItem);
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
        return data.find(product => product.title.toLowerCase() === name.toLowerCase());
      })
      .catch(error => {
        console.log("Error fetching data:", error);
        alert("An error occurred while fetching data.");
      });
  }

  updateCartItems();