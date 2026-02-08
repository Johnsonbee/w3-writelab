const selectedChapters = new Map();
const listContainer = document.getElementById('selected-list');
const totalPriceEl = document.getElementById('total-price');
const checkoutBtn = document.querySelector('.checkout-btn');

document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.chapter-card');
        const id = card.dataset.id;
        const name = card.querySelector('h3').innerText;
        const price = parseInt(card.dataset.price);

        if (!selectedChapters.has(id)) {
            selectedChapters.set(id, { name, price });
            renderSummary();
        }
    });
});

function renderSummary() {
    listContainer.innerHTML = '';
    let total = 0;

    if (selectedChapters.size === 0) {
        listContainer.innerHTML = '<li class="empty-state">No chapters added yet.</li>';
        checkoutBtn.disabled = true;
    } else {
        selectedChapters.forEach((value, key) => {
            total += value.price;
            const li = document.createElement('li');
            li.className = 'selected-item';
            li.innerHTML = `
                <span>${value.name}</span>
                <button class="remove-btn" onclick="removeChapter('${key}')">Remove</button>
            `;
            listContainer.appendChild(li);
        });
        checkoutBtn.disabled = false;
    }

    totalPriceEl.innerText = `₦${total.toLocaleString()}`;
}

function removeChapter(id) {
    selectedChapters.delete(id);
    renderSummary();
}