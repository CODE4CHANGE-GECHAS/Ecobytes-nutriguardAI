# NutriGuard AI

*NutriGuard AI* is a web-based application that helps users scan pre-packed food products using their barcode and fetches nutritional information from the OpenFoodFacts API. It also provides health warnings for common medical conditions like diabetes, thyroid, blood pressure, allergy, and throat infection.

## Features

- *Barcode Scanning* using your device's camera (via QuaggaJS)
- *Manual Barcode Entry* with product lookup
- *Nutritional Information* display (calories, protein, fat, sugar, salt)
- *Health Warnings* for:
  - Diabetes
  - Thyroid
  - Blood Pressure (Hypertension)
  - Allergy (nuts, gluten, milk)
  - Throat Infection (preservatives, acidity)
- *Product Image Display*
- *Google Translate Integration* for multilingual support (English, Hindi, Tamil, Telugu, etc.)

## Pages

- index.html — Home or Landing Page
- scanner.html — Barcode scanning and product information
- result.html — Optional result display page (if needed)

## Files

- scanner.html — Main scanning and lookup interface
- scanner.js / app.js — JavaScript logic for fetching product data and scanning
- style.css — Stylesheet
- README.md — This file

## How to Use

1. Open scanner.html in your browser.
2. Either:
   - Enter a barcode number manually and click "Fetch Info"
   - Or click "Start Barcode Scanner" and point your camera at a barcode
3. Wait for the product data to load.
4. View:
   - Product name, ingredients, nutritional values
   - Automatic health warnings
   - Product image (if available)

## Setup

This project requires no backend or build process. Just open the HTML file in a modern browser.

Make sure your browser allows camera access for barcode scanning to work.

## Dependencies

- [QuaggaJS](https://serratus.github.io/quaggaJS/) — JavaScript Barcode Scanner
- [OpenFoodFacts API](https://world.openfoodfacts.org/data) — Public food product database
- [Google Translate](https://translate.google.com/) — For inline language translation

## License

MIT License