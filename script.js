const gallery = document.querySelector('.gallery');
const imageURL = "https://i.pinimg.com/originals/b1/54/bf/b154bf5c4d45e9464cbd059f3bc526bf.jpg";
const ratings = Array(9).fill({ total: 0, count: 0 });

function calculateAverage(index) {
    const { total, count } = ratings[index];
    return count ? (total / count).toFixed(1) : "Нет оценок";
}

for (let i = 0; i < 9; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${imageURL}" alt="Годжо Сатору">
        <h2>Ира ЛУЧШАЯ</h2>
        <p>Ира ЛУЧШАЯ Ира ЛУЧШАЯ Ира ЛУЧШАЯ</p>
        <div class="rating" data-index="${i}">
            ${[...Array(5)].map((_, j) => `<span class="star" data-star="${j + 1}">★</span>`).join('')}
        </div>
        <div class="average-rating">Рейтинг: ${calculateAverage(i)}</div>
    `;
    gallery.appendChild(card);
}

const stars = document.querySelectorAll('.star');
stars.forEach(star => {
    star.addEventListener('click', (event) => {
        const index = event.target.parentElement.getAttribute('data-index');
        const rating = parseInt(event.target.getAttribute('data-star'));

        // Обновляем рейтинг
        ratings[index].total += rating;
        ratings[index].count += 1;

        // Обновляем отображение рейтинга
        const averageRating = event.target.parentElement.nextElementSibling;
        averageRating.textContent = `Рейтинг: ${calculateAverage(index)}`;

        // Обновляем отображение звёзд
        const starsInCard = event.target.parentElement.querySelectorAll('.star');
        starsInCard.forEach(s => {
            s.classList.toggle('active', parseInt(s.getAttribute('data-star')) <= rating);
        });
    });
});
