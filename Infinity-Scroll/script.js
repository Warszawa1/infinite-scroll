const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'kFz-StZgDO0s6x1wvnBvYAtuASTqM7P7xudanUeFHYw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images have loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// HELPER FUNTION TO SET ATTRIBUTES ON DOM ELEMENTS
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links and Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement("a");
        // item.setAttribute("href", photo.links.html);
        // item.setAttribute("target", "_blank");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank"
        });
        
        // Create <img> for photo
        const img = document.createElement("img");
        // img.setAttribute("src", photo.urls.regular);
        // img.setAttribute("alt", photo.alt_description);
        // img.setAttribute("title", photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event Listener, check when each image has loaded
        img.addEventListener("load", imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray  = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error Here
    console.log(error);
  }
}

// Check to see if scrolling near botton of page, load more photos
window.addEventListener("scroll", () => {
   if (
     window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
   }
});
 
// On Load
getPhotos();