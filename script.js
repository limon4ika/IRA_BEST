const gallery = document.querySelector('.gallery');
const imageURLs = [
    "https://i.pinimg.com/originals/b1/54/bf/b154bf5c4d45e9464cbd059f3bc526bf.jpg",
    "https://avatars.mds.yandex.net/i?id=c07595c89b5b128398d6ad3b02e06d59_l-11944133-images-thumbs&n=13",
    "https://i.pinimg.com/originals/f0/46/69/f046696271b465516e55868a5aae36b6.jpg",
    "https://i.pinimg.com/736x/3c/0b/1e/3c0b1e111d88d2491510ccbd5edde0fd.jpg",
    "https://i.pinimg.com/736x/b3/2b/18/b32b18bfdf330d37a65f8980ff690a46.jpg",
    "https://avatars.mds.yandex.net/i?id=a1d99fe7be1fee254055a6a0a2eae6a0_l-12569778-images-thumbs&n=13",
    "https://i.pinimg.com/originals/73/b4/bf/73b4bf0281218cf01db8d773bfb4f7e6.jpg", // izmenil
    "https://i.pinimg.com/736x/5e/ca/1b/5eca1b41b9a93bb7e5bc32694aba4498.jpg",
    "https://steamuserimages-a.akamaihd.net/ugc/1808768009308378246/38FC43EB55647A509405425F46947696188B8987/?imw=512&amp;imh=503&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true"
];
const videoURLs = [
    "https://www.youtube.com/embed/3OTe3aDcGD8",  // 
    "https://www.youtube.com/embed/HHA_3ryDtNc",  // Пример видео с YouTube
    "https://www.youtube.com/embed/mxoULWzy8cE",  // Пример видео с YouTube
    "https://www.youtube.com/embed/ngNzg4kdcz0",  // Пример видео с YouTube
    "https://www.youtube.com/embed/g_uA4h_qmdE",  // Пример видео с YouTube
    "https://www.youtube.com/embed/BNBxtXwntRA",  // Пример видео с YouTube
    "https://www.youtube.com/embed/6ZfuNTqbHE8",  // мстютели
    "https://www.youtube.com/embed/ZkiqFhT-03Q",  // Пример видео с YouTube
    "https://www.youtube.com/embed/2uDH8tfOYRs"   // Пример видео с YouTube
];
const descriptions = [
    "Годжик лучший👪",
    "Наги плаки плаки🥰",
    "Мой муж💋",
    "Бокута МВП🥵",
    "Ризли красавчик👅",
    "Эгоисто Исаги Яйцо🙇",
    "Тони Страпони🦄",
    "Наташка в рот давашка🙏",
    "Моя жена🤤"
];
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');

for (let i = 0; i < 9; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${imageURLs[i]}" alt="Картинка ${i + 1}">
        <h2>Ира ЛУЧШАЯ ${i + 1}</h2>
        <div class="rating" data-index="${i}">
            ${[...Array(5)].map((_, j) => `<span class="star" data-star="${j + 1}">★</span>`).join('')}
        </div>
        <div class="average-rating" id="average-${i}">Рейтинг: Нет оценок</div>
    `;
    gallery.appendChild(card);

    // Открытие модального окна при клике на карточку
    card.addEventListener('click', () => {
        const modalContent = `
            <iframe width="560" height="315" src="${videoURLs[i]}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <h2>Ира ЛУЧШАЯ ${i + 1}</h2>
            <p class="modal-description">${descriptions[i]}</p>

            <!-- Форма обратной связи -->
            <div class="form-container">
                <form id="feedback-form-${i}">
                    <input type="text" id="name-${i}" placeholder="Ваше имя" required>
                    <textarea id="message-${i}" placeholder="Ваше сообщение" required></textarea>
                    <button type="submit">Отправить</button>
                </form>
            </div>
        `;
        modal.querySelector('.modal-content').innerHTML = modalContent;
        modal.style.display = 'flex';

        // Обработчик формы
        const form = document.getElementById(`feedback-form-${i}`);
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById(`name-${i}`).value;
            const message = document.getElementById(`message-${i}`).value;
            sendToTelegram(name, message);
        });
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
    rating = parseInt(rating); // Преобразуем в число

    const stars = document.querySelectorAll(`.rating[data-index="${index}"] .star`);
    stars.forEach((star, i) => {
        if (i < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });

    // Проверяем, равен ли рейтинг числу 5
    const ratingText = rating === 5 ? "ЛУЧШАЯ" : rating;
    document.getElementById(`average-${index}`).innerText = `Рейтинг: ${ratingText} / 5`;
}


// Отправка данных в Telegram
function sendToTelegram(name, message) {
    const telegramToken = '7853372373:AAHb-qllckfaL8c2hgMzXa7kOpqhDO9_4UI';
    const chatId = '944641730';
    const text = `Новое сообщение от ${name}: ${message}`;
    const url = `https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

    fetch(url)
        .then(response => {
            if (response.ok) {
                alert('Ваше сообщение отправлено!');
            } else {
                alert('Ошибка при отправке сообщения.');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Ошибка при отправке сообщения.');
        });
}
