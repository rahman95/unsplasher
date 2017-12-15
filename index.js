require('dotenv').config();
require('es6-promise').polyfill();
require('isomorphic-fetch');
import Unsplash, { toJson } from 'unsplash-js';
const wallpaper = require('wallpaper');
const unsplash = new Unsplash({
  applicationId: process.env.CLIENT_ID,
  secret: process.env.API_SECRET,
  callbackUrl: process.env.CALLBACK_URL
});

var getRandomImage = new Promise(
    function (resolve, reject) {
        unsplash.photos.getRandomPhoto({
            height: process.env.HEIGHT || 1080,
            width: process.env.WIDTH || 1920,
            featured: process.env.FEATURED || true,
        }).then(toJson).then(image => {
            if(image){
                var randomImage = {
                    'id': image.id,
                    'width': image.width,
                    'height': image.height,
                    'download': image.links.download,
                    'user': {
                        'username': image.user.username,
                        'name': image.user.name
                    }
                };
                resolve(randomImage);
            }else{
                reject(new Error('An error occured')); // reject
            }
        });
    }
);

var getImageDetails = function () {
    getRandomImage.then(function (image) {
        return image;
    })
    .catch(function (error) {
        console.log(error.message);
    });
};

getImageDetails();

// wallpaper.set('unicorn.jpg').then(() => {
//     console.log('done');
// });