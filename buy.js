    // Get the total value from localStorage and display it
    const totalPaySpan = document.getElementById("totalPay");
    const totalPay = localStorage.getItem("totalPrice");
    totalPaySpan.textContent = totalPay ? `$${totalPay}` : "N/A";

    function confirmPurchase(event) {
      event.preventDefault();

      const paymentType = document.querySelector('input[name="payment"]:checked').value;
      const confirmationMessage = `Total Pay: $${totalPay}\nPayment Type: ${paymentType}\n\nAre you sure?`;

      if (confirm(confirmationMessage)) {
        // Redirect to the home page
        window.location.href = "home.html";
      }
    }