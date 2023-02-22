const categoriesBox = document.getElementById('categories');
const productsBox = document.getElementById('products');
const sepetBtn = document.getElementById('sepetBtn');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeModal');
const toplamBilgi = document.getElementById('toplamBilgi');
const modalWrapper = document.getElementById('modal-wrapper');

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://api.escuelajs.co/api/v1/categories')
    .then((res) => res.json())
    .then((data) => {
      data.slice(0, 4).forEach((category) => {
        const categoryItem = document.createElement('div');

        categoryItem.classList.add('category');

        categoryItem.innerHTML = `
        <img src=${category.image}/>
        <p>${category.name}</p>`;

        categoriesBox.appendChild(categoryItem);
      });
    });
});

//! SEPET
let sepet = [];
let fiyatlar = [];

sepetBtn.addEventListener('click', () => {
  modalWrapper.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  modalWrapper.classList.remove('active');
  sepet = [];
});

function sepeteEkle(param) {
  const urunDiv = document.createElement('div');
  urunDiv.classList.add('modalItem');
  urunDiv.innerHTML = `
  <h2>${param.name}</h2>
  <p>${param.price} tl</p>
  `;
  modal.appendChild(urunDiv);
  fiyatlar.push(+param.price);
  const toplam = fiyatlar.reduce((a, b) => a + b, 0);
  toplamBilgi.innerText = toplam;
}

function setModal(param) {
  console.log(param);
}

//? ÜRÜNLERİ ÇEKME VE YAZMA
document.addEventListener('DOMContentLoaded', () => {
  // Event Başlangıç
  fetch('https://api.escuelajs.co/api/v1/products')
    .then((res) => res.json())
    .then((data) => {
      //her bir veri için döngü
      data.slice(1, 20).forEach((product) => {
        //Ürün Oluşturma
        const productItem = document.createElement('div');

        productItem.classList.add('product');

        productItem.innerHTML = `
            <img
              src=${product.images[0]}
            />
            <p onclick="setModal(${product.id})" >${product.title}</p>

            <label>${product.category.name}</label>

            <div class="card-buy">
              <label>${product.price}$</label> 
              <button onclick="sepeteEkle({name:'${product.title}',price:'${product.price}'})">Sepete Ekle</button>
            </div>`;

        productsBox.appendChild(productItem);
      });
    });
  // Event Son
});
