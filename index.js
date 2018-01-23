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
const dir = __dirname + '/downloads/';
var fs = require('fs'),
    https = require('follow-redirects').https,
    request = require('request'),
    mime = require('mime-types');

var getRandomImage = new Promise(
    function (resolve, reject) {
        unsplash.photos.getRandomPhoto({
            'height': process.env.HEIGHT || 1080,
            'width': process.env.WIDTH || 1920,
            'featured': process.env.FEATURED || true,
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

var download = function(image) {
    var request = https.get(image.download, function(response) {
        var file = fs.createWriteStream(dir + image.id + '.' + mime.extension(response.headers['content-type']));
        response.pipe(file);
        file.on('finish', function() {
            file.close();
			console.log(image)
			wallpaper.set(file.path).then(() => {
				console.log(`New Wallpaper courtesy of ${image.user.name}`);
			});
        });
    });
};


var getImageDetails = function () {
    getRandomImage
    .then(download)
    .catch(function (error) {
        console.log(error.message);
    });
};

getImageDetails();