const gallery = document.querySelector('.gallery');
const imageURL = "https://i.pinimg.com/originals/b1/54/bf/b154bf5c4d45e9464cbd059f3bc526bf.jpg";

for (let i = 0; i < 9; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${imageURL}" alt="Годжо Сатору">
        <h2>Ира ЛУЧШАЯ</h2>
        <p>Ира ЛУЧШАЯ Ира ЛУЧШАЯ Ира ЛУЧШАЯ</p>
    `;
    gallery.appendChild(card);
}
