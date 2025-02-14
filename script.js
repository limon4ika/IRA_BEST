const gallery = document.querySelector('.gallery');
const imageURL = "https://i.pinimg.com/originals/b1/54/bf/b154bf5c4d45e9464cbd059f3bc526bf.jpg";
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');

for (let i = 0; i < 9; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${imageURL}" alt="Годжо Сатору">
        <h2>Ира ЛУЧШАЯ</h2>
        <div class="rating" data-index="${i}">
            ${[...Array(5)].map((_, j) => `<span class="star" data-star="${j + 1}">★</span>`).join('')}
        </div>
        <div class="average-rating" id="average-${i}">Рейтинг: Нет оценок</div>
    `;
    gallery.appendChild(card);

    // Открытие модального окна при клике на карточку
    card.addEventListener('click', () => {
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

// Закрытие при клике на тёмный фон
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Обработчик для установки рейтинга
document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = star.parentElement.getAttribute('data-index');
        const rating = parseInt(star.getAttribute('data-star'));

        localStorage.setItem(`rating-${index}`, rating);
        updateRating(index, rating);
    });
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
