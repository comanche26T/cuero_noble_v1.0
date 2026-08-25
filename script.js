const WHATSAPP_BASE = "https://wa.me/51929502963";
const products = window.CUERO_NOBLE_PRODUCTS || [];
const grid = document.querySelector("#productGrid");
const searchInput = document.querySelector("#searchInput");
const colorFilter = document.querySelector("#colorFilter");
const emptyState = document.querySelector("#emptyState");
const dialog = document.querySelector("#productDialog");
const dialogBody = document.querySelector("#dialogBody");
const closeDialogButton = document.querySelector(".dialog-close");
let activeCategory = "all";

const paymentMethods = [
  { name: "Yape", image: "assets/payments/yape.png" },
  { name: "Plin", image: "assets/payments/plin.png" },
  { name: "Caja Huancayo", image: "assets/payments/caja-huancayo.png" },
  { name: "Debito SIP", image: "assets/payments/sip.png" }
];

function soles(value) {
  return `S/${Math.round(value)}`;
}

function computedOffer(product) {
  if (typeof product.offerPrice === "number") return product.offerPrice;
  return Math.round(product.listPrice * (1 - product.discount / 100));
}

function whatsappUrl(product) {
  const text = `Hola, vi el ${product.name} en color ${product.color} en el catalogo de CUERO NOBLE. Quisiera consultar talla, disponibilidad y medios de pago.`;
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
}

function uniqueColors() {
  return [...new Set(products.map((product) => product.colorSpanish))].sort((a, b) => a.localeCompare(b));
}

function renderColorOptions() {
  uniqueColors().forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    colorFilter.append(option);
  });
}

function priceMarkup(product) {
  return `
    <div class="price-area">
      <span class="regular"><s>${soles(product.listPrice)}</s></span>
      <strong>${soles(computedOffer(product))}</strong>
      <span class="discount">${product.discount}% dscto.</span>
    </div>
  `;
}

function paymentLogos(size = "mini") {
  return paymentMethods
    .map((method) => `<img class="payment-logo payment-logo-${size}" src="${method.image}" alt="${method.name}">`)
    .join("");
}

function sizeChips(product) {
  if (!product.availableSizes || product.availableSizes.length === 0) {
    return `<span class="size-chip muted">Consultar</span>`;
  }
  return product.availableSizes.map((size) => `<span class="size-chip">${size}</span>`).join("");
}

function productCard(product) {
  const article = document.createElement("article");
  article.className = "product-card";
  article.dataset.productId = product.id;
  article.dataset.slide = "0";
  article.innerHTML = `
    <div class="image-box">
      <img src="${product.images[0]}" alt="${product.name} color ${product.colorSpanish}" data-card-image>
      <span class="tag">${product.tag}</span>
      <div class="carousel-controls" aria-label="Galeria de ${product.name}">
        <button type="button" data-slide-dir="-1" aria-label="Foto anterior">‹</button>
        <button type="button" data-slide-dir="1" aria-label="Foto siguiente">›</button>
      </div>
      <div class="dots" aria-hidden="true">${product.images.map((_, index) => `<span class="${index === 0 ? "active" : ""}"></span>`).join("")}</div>
    </div>
    <div class="card-body">
      <p class="category">${product.category}</p>
      <h3>${product.name}</h3>
      <dl class="meta">
        <div><dt>Color</dt><dd>${product.colorSpanish} <small>${product.color}</small></dd></div>
        <div><dt>Codigo</dt><dd>${product.sku}</dd></div>
      </dl>
      ${priceMarkup(product)}
      <div class="sizes-row" aria-label="Tallas disponibles">
        <span>Tallas</span>
        <div>${sizeChips(product)}</div>
      </div>
      <p class="status">${product.stockStatus}</p>
      <p class="delivery">Pedido estimado: 5 a 10 dias habiles, previa confirmacion.</p>
      <div class="card-actions">
        <button type="button" data-detail="${product.id}">Ver detalles</button>
        <a href="${whatsappUrl(product)}" target="_blank" rel="noopener"><img src="assets/whatsapp.svg" alt="" aria-hidden="true"> Consultar por WhatsApp</a>
      </div>
    </div>
  `;
  return article;
}

function setCardSlide(card, product, nextIndex) {
  const index = (nextIndex + product.images.length) % product.images.length;
  card.dataset.slide = String(index);
  const image = card.querySelector("[data-card-image]");
  image.src = product.images[index];
  card.querySelectorAll(".dots span").forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === index);
  });
}

function relatedColors(product) {
  return products
    .filter((item) => item.name === product.name && item.id !== product.id)
    .map((item) => `<span>${item.colorSpanish}</span>`)
    .join("");
}

function openDetails(product) {
  dialogBody.innerHTML = `
    <div class="dialog-media">
      <img src="${product.images[0]}" alt="${product.name} color ${product.colorSpanish}" data-dialog-image>
      <div class="thumbs">
        ${product.images.map((image, index) => `<button class="${index === 0 ? "active" : ""}" type="button" data-thumb="${image}" aria-label="Ver foto ${index + 1}"><img src="${image}" alt=""></button>`).join("")}
      </div>
    </div>
    <div class="dialog-copy">
      <p class="category">${product.category}</p>
      <h2 id="dialogTitle">${product.name}</h2>
      <p>${product.description}</p>
      <dl class="detail-list">
        <div><dt>Codigo</dt><dd>${product.sku}</dd></div>
        <div><dt>Color oficial</dt><dd>${product.color}</dd></div>
        <div><dt>Material</dt><dd>${product.material}</dd></div>
        <div><dt>Impermeabilidad</dt><dd>${product.waterproof}</dd></div>
        <div><dt>Tallas</dt><dd>${product.sizes}</dd></div>
      </dl>
      <div class="sizes-row detail-sizes" aria-label="Tallas disponibles">
        <span>Tallas EU</span>
        <div>${sizeChips(product)}</div>
      </div>
      ${priceMarkup(product)}
      <div class="payment-mini" aria-label="Medios de pago">
        ${paymentLogos("mini")}
      </div>
      <h3>Caracteristicas</h3>
      <ul>${product.features.map((feature) => `<li>${feature}</li>`).join("")}</ul>
      <div class="related">
        <strong>Colores relacionados</strong>
        <div>${relatedColors(product) || "<span>Consultar mas colores</span>"}</div>
      </div>
      <div class="dialog-actions">
        <a class="primary-action" href="${whatsappUrl(product)}" target="_blank" rel="noopener"><img src="assets/whatsapp.svg" alt="" aria-hidden="true"> Consultar por WhatsApp</a>
      </div>
    </div>
  `;
  dialog.showModal();
}

function visibleProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedColor = colorFilter.value;
  return products.filter((product) => {
    const categoryMatches = activeCategory === "all" || product.category === activeCategory;
    const colorMatches = selectedColor === "all" || product.colorSpanish === selectedColor;
    const text = `${product.name} ${product.category} ${product.sku} ${product.color} ${product.colorSpanish}`.toLowerCase();
    return categoryMatches && colorMatches && text.includes(query);
  });
}

function renderProducts() {
  grid.innerHTML = "";
  const items = visibleProducts();
  items.forEach((product) => grid.append(productCard(product)));
  emptyState.hidden = items.length > 0;
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeCategory = button.dataset.filter;
    renderProducts();
  });
});

document.addEventListener("click", (event) => {
  const detailId = event.target.dataset.detail;
  const specialId = event.target.dataset.productId;
  const slideDir = event.target.dataset.slideDir;
  const thumb = event.target.closest("[data-thumb]");

  if (detailId) openDetails(products.find((product) => product.id === detailId));
  if (specialId) window.open(whatsappUrl(products.find((product) => product.id === specialId)), "_blank", "noopener");
  if (slideDir) {
    const card = event.target.closest(".product-card");
    const product = products.find((item) => item.id === card.dataset.productId);
    setCardSlide(card, product, Number(card.dataset.slide) + Number(slideDir));
  }
  if (thumb) {
    dialog.querySelector("[data-dialog-image]").src = thumb.dataset.thumb;
    dialog.querySelectorAll("[data-thumb]").forEach((button) => button.classList.toggle("active", button === thumb));
  }
});

searchInput.addEventListener("input", renderProducts);
colorFilter.addEventListener("change", renderProducts);
closeDialogButton.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

renderColorOptions();
renderProducts();
