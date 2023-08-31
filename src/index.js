import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_obedcL20ZjYX5GSVdYLDjtguDA1aYmfegI3KiNHPbufFPEmVg5Sb4Ov6gQk9LFwC";
import SlimSelect from "slim-select";
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from "./cat";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const elements = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info'),
    catPic: document.querySelector('.cat-info-pict'),
    catDesc: document.querySelector('.cat-info-desc')
}

elements.select.addEventListener('change', changeSelect);
elements.select.classList.add('unvisible');
 
function renderSelect(breeds) {
    const markup = breeds
        .map(breed => {
            return `<option value='${breed.reference_image_id}'>${breed.name}</option>`;
        }).join('');
    elements.select.insertAdjacentHTML('beforeend', markup);
    new SlimSelect({
        select: '#single',
    });
};

(function fetchBreedsRender() {
    elements.loader.classList.remove('unvisible')
    fetchBreeds()
        .then(breeds => renderSelect(breeds))
        .catch(error => {
            console.log(error);
            Notify.failure('Oops! Something went wrong! Try reloading the page!');
        })
        .finally(() => {
            elements.loader.classList.add('unvisible');
            elements.select.classList.remove('unvisible');
        });
})();

function renderDesc(breed) {
    const picture = `<img class="cat-picture" src="${breed.url}" alt="${breed.id}">`;
    const descript = `<h2 class="cat-info-desc-title">${breed.breeds[0].name}</h2>
    <p class="cat-info-desc-desc">${breed.breeds[0].description}</p>
    <p class="cat-info-desc-desc"><b>Temperament:</b> ${breed.breeds[0].temperament}</p>`;
    elements.catPic.insertAdjacentHTML('beforeend', picture);
    elements.catDesc.insertAdjacentHTML('beforeend', descript);
};

function changeSelect(evt) {
    elements.loader.classList.remove('unvisible');
    elements.catPic.innerHTML = '';
    elements.catDesc.innerHTML = '';
    const breedId = evt.target.value;
    fetchCatByBreed(breedId)
        .then(breed => renderDesc(breed))
        .catch(error => {
            console.log(error);
            Notify.failure('Oops! Something went wrong! Try reloading the page!');
        })
        .finally(() => elements.loader.classList.add('unvisible'));
}