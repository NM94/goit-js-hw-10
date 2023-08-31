import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_obedcL20ZjYX5GSVdYLDjtguDA1aYmfegI3KiNHPbufFPEmVg5Sb4Ov6gQk9LFwC";

const API_KEY = "live_obedcL20ZjYX5GSVdYLDjtguDA1aYmfegI3KiNHPbufFPEmVg5Sb4Ov6gQk9LFwC";
const urlBreeds = "https://api.thecatapi.com/v1/breeds"
const urlCat = "https://api.thecatapi.com/v1/images"

function fetchBreeds() {
    return fetch(`${urlBreeds}?api_key=${API_KEY}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.status);
            }
            return resp.json();
        });
};

function fetchCatByBreed(breedId) {
    return fetch(`${urlCat}/${breedId}?api_key=${API_KEY}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.status);
            }
            return resp.json();
        });
};

export { fetchBreeds, fetchCatByBreed };