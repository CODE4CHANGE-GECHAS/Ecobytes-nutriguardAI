function startApp() {
  document.getElementById('lookup-section').style.display = 'block';
}

async function fetchProductInfo() {
  const code = document.getElementById('barcode').value.trim();
  if (!code) {
    alert("Please enter a barcode number.");
    return;
  }

  document.getElementById('info').innerHTML = `<p>🔍 Fetching data for: ${code}</p>`;

  try {
    const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`);
    const data = await response.json();

    if (data.status === 1) {
      const product = data.product;
      const fat = parseFloat(product.nutriments.fat_100g) || 0;
      const sugar = parseFloat(product.nutriments.sugars_100g) || 0;
      const salt = parseFloat(product.nutriments.salt_100g) || 0;

      document.getElementById('info').innerHTML = `
        <h3>${product.product_name || 'Unknown Product'}</h3>
        <p><span class="label">Brand:</span> ${product.brands || 'N/A'}</p>
        <p><span class="label">Ingredients:</span> ${product.ingredients_text || 'N/A'}</p>
        <p><span class="label">Calories (per 100g):</span> ${product.nutriments.energy_100g || 'N/A'} kcal</p>
        <p><span class="label">Proteins:</span> ${product.nutriments.proteins_100g || 'N/A'} g</p>
        <p><span class="label">Fat:</span> ${fat} g</p>
        <p><span class="label">Sugar:</span> ${sugar} g</p>
        <p><span class="label">Salt:</span> ${salt} g</p>
        <p><span class="label">Nutrition Grade:</span> ${product.nutrition_grades_tags ? product.nutrition_grades_tags.join(', ') : 'N/A'}</p>
        <p><span class="label">Expiry Date:</span> ${product.expiration_date || 'Not provided'}</p>
        ${product.image_url ? `<img src="${product.image_url}" alt="Product Image" width="150"/>` : ''}
      `;

      // Health warning check
      let warnings = [];
      if (fat > 17) warnings.push("High fat content — not recommended for heart patients.");
      if (sugar > 20) warnings.push("High sugar content — not suitable for diabetics.");
      if (salt > 15) warnings.push("High salt content — caution for hypertension patients.");

      if (warnings.length) {
        alert("⚠️ Health Warning:\n\n" + warnings.join("\n"));
      }

    } else {
      document.getElementById('info').innerHTML = `<p>❌ Product not found for code: ${code}</p>`;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    document.getElementById('info').innerHTML = `<p>⚠️ Error fetching product info.</p>`;
  }
}

// Barcode Scanner using QuaggaJS
function startScanner() {
  document.getElementById('barcode-result').innerHTML = "<p>📡 Scanning...</p>";

  Quagga.init({
    inputStream: {
      type: "LiveStream",
      target: document.querySelector('#scanner-container'),
      constraints: { facingMode: "environment" }
    },
    decoder: {
      readers: ["ean_reader", "upc_reader", "code_128_reader"]
    }
  }, function(err) {
    if (err) {
      console.log("Error starting Quagga scanner:", err);
      return;
    }
    Quagga.start();
  });

  Quagga.onDetected(function(result) {
    const code = result.codeResult.code;
    document.getElementById('barcode').value = code;
    fetchProductInfo();
    Quagga.stop();
  });
}
