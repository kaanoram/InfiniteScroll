const loader = document.getElementById('loader');
const imageContainer = document.getElementById('image-container');

let photos = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const count = 30;
const apiKey = config.MY_KEY;
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


async function getPhotos(){
    try{
        const response = await fetch(apiURL);
        photos = await response.json();
        displayPhotos();
    }
    catch(error){
        console.log(error)
    }
}

function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        loader.hidden = true;
        ready = true;
    }
}

function displayPhotos(){
    totalImages = photos.length;
    imagesLoaded = 0;
    console.log(photos);
    for (let photo of photos){
        const item = document.createElement('a');
        setAttributes(item, {href: photo.links.html, target: '_blank'})
        const img = document.createElement('img');
        if (photo.alt_description !== null){
            setAttributes(img, {src: photo.urls.regular, alt: photo.alt_description, title: photo.alt_description});
        }
        else{
            setAttributes(img, {src: photo.urls.regular});
        }
        img.addEventListener('load', imageLoaded)
        item.appendChild(img);
        imageContainer.appendChild(item);
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})

getPhotos();