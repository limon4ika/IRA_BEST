const gallery = document.querySelector('.gallery');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const closeModal = document.querySelector('.close-modal');

// Массив с разными картинками Годжо Сатору
const images = [
    "https://i.pinimg.com/originals/b1/54/bf/b154bf5c4d45e9464cbd059f3bc526bf.jpg",
    "https://i.pinimg.com/originals/71/f9/c8/71f9c8abda0322e50741c42c1e9d1a4f.jpg",
    "https://i.pinimg.com/originals/ab/ab/ab/abababababababababababababababab.jpg",
    "https://i.pinimg.com/originals/4d/4d/4d/4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d.jpg",
    "https://i.pinimg.com/originals/9a/9a/9a/9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9.jpg"
];

// Генерация карточек
for (let i = 0; i < 9; i++) {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${randomImage}" alt="Годжо Сатору">
        <h2>Ира ЛУЧШАЯ</h2>
        <div class="rating" data-index="${i}">
            ${[...Array(5)].map((_, j) => `<span class="star" data-star="${j + 1}">★</span>`).join('')}
        </div>
        <div class="average-rating" id="average-${i}">Рейтинг: Нет оценок</div>
    `;
    gallery.appendChild(card);

    // Открытие модального окна при клике на карточку
    card.addEventListener('click', () => {
        modalContent.innerHTML = `<h2>Ира ЛУЧШАЯ</h2><p>Ира ЛУЧШАЯ Ира ЛУЧШАЯ Ира ЛУЧШАЯ</p>`;
        modal.style.display = 'flex';
    });

    // Загрузка рейтинга из localStorage
    const savedRating = localStorage.getItem(`rating-${i}`);
    if (savedRating) {
        updateRating(i, parseInt(savedRating));
    }
}

// Закрытие модального окна
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Обновление отображения рейтинга
function updateRating(index, rating) {
    const stars = document.querySelectorAll(`.rating[data-index="${index}"] .star`);
    stars.forEach((star, i) => {
        if (i < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    const ratingText = rating === 5 ? "ЛУЧШАЯ" : rating;
    document.getElementById(`average-${index}`).innerText = `Рейтинг: ${ratingText} / 5`;
}

// Обработка клика на звёзды
gallery.addEventListener('click', (event) => {
    if (event.target.classList.contains('star')) {
        const star = event.target;
        const index = star.closest('.rating').dataset.index;
        const rating = parseInt(star.dataset.star);
        localStorage.setItem(`rating-${index}`, rating);
        updateRating(index, rating);
    }
});
