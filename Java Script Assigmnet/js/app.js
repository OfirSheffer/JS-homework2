document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById("cardsContainer");
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const errorContainer = document.getElementById("errorContainer");

  let allItems = [];

  // Fetch items from JSON
  fetch("data/items.json")
    .then((res) => res.json())
    .then((data) => {
      allItems = data;
      renderItems(allItems);
    })
    .catch((err) => {
      console.error("Error loading items:", err);
      errorContainer.textContent = "Failed to load items.";
    });

  // Render items to gallery
  function renderItems(items) {
    cardsContainer.innerHTML = "";
    if (items.length === 0) {
      errorContainer.textContent = "No items found.";
      return;
    }
    errorContainer.textContent = "";
    items.forEach((item) => {
      const card = document.createElement("section");
      card.className = "col";

      card.innerHTML = `
        <article class="card-custom h-100">
          <div class="card-img-container">
            <img src="${item.image}" alt="${item.title}" />
          </div>
          <section class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <h6 class="card-subtitle mb-2">${item.description}</h6>
            <span class="badge badge-author">${item.author}</span>
          </section>
        </article>
      `;

      cardsContainer.appendChild(card);
    });
  }

  // Search function
  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    const filtered = allItems.filter((item) =>
      item.title.toLowerCase().includes(term) ||
      item.author.toLowerCase().includes(term)
    );
    renderItems(filtered);
  });

  // Sort function
  sortSelect.addEventListener("change", () => {
    const value = sortSelect.value;
    let sortedItems = [...allItems];

    switch (value) {
      case "title-asc":
        sortedItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sortedItems.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "author-asc":
        sortedItems.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case "author-desc":
        sortedItems.sort((a, b) => b.author.localeCompare(a.author));
        break;
      default:
        break;
    }

    renderItems(sortedItems);
  });

  // Theme toggle
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const dark = document.body.classList.contains("dark-mode");
    themeIcon.className = dark ? "bi bi-sun-fill" : "bi bi-moon-fill";
  });
});
