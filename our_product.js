$(document).ready(function() {
    // Fetch JSON data and populate the table
    $.getJSON("products.json", function(data) {
      var tableBody = $("#product-table");
      $.each(data, function(index, product) {
        var row = $("<tr></tr>");
        row.append("<td>" + product.title + "</td>");
        row.append("<td>" + product.description + "</td>");
        row.append("<td>" + product.price + "</td>");
        row.append("<td><img src='" + product.image + "' alt='Product Image'></td>");
        tableBody.append(row);
      });
    });
  });