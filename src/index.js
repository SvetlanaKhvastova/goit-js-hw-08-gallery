import items from './gallery-items.js';

let dataIndex = 0;

const refs = {
  gallery: document.querySelector('.js-gallery'),
  largeImage: document.querySelector('.js-lightbox'),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  closeOverlay: document.querySelector('.lightbox__overlay'),
  imgModal: document.querySelector('.lightbox__image'),
};

refs.gallery.addEventListener('click', onGalleryClick);
refs.closeModalBtn.addEventListener('click', closeModal);
refs.closeOverlay.addEventListener('click', closeModal);

const galleryMarkup = createGalleryMarkup(items);
refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(items) {
  return items
    .map(({ original, preview, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}

function onGalleryClick(event) {
  event.preventDefault();

  const imgRef = event.target;
  const largeImgURL = imgRef.dataset.source;

  if (imgRef.nodeName !== 'IMG') {
    return;
  }

  setLargeImg(largeImgURL);

  refs.imgModal.alt = imgRef.alt;

  openModal();
}

function setLargeImg(url) {
  refs.imgModal.src = url;
}

function openModal() {
  refs.largeImage.classList.add('is-open');
  window.addEventListener('keydown', closeModalEsc);
  window.addEventListener('keydown', arrowModalImg);
}

function closeModal() {
  refs.largeImage.classList.remove('is-open');
  refs.imgModal.src = '';
  refs.imgModal.alt = '';

  window.removeEventListener('keydown', closeModalEsc);
  window.removeEventListener('keydown', arrowModalImg);
}

function closeModalEsc(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
function arrowModalImg(event) {
  if (event.code === 'ArrowRight') {
    dataIndex += 1;
    if (dataIndex === items.length) {
      dataIndex = 0;
    }
    refs.imgModal.src = items[dataIndex].original;
    console.log('следующая картинка вправо');
  }
  if (event.code === 'ArrowLeft') {
    dataIndex -= 1;
    if (dataIndex < 0) {
      dataIndex = items.length - 1;
    }
    refs.imgModal.src = items[dataIndex].original;
    console.log('следующая картинка влево');
  }
}
