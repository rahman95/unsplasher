require('dotenv').config();
const wallpaper = require('wallpaper');
const unsplash = require('unsplash-api');

console.log('Connecting to Unsplashed.');
unsplash.init(process.env.CLIENT_ID);


// wallpaper.set('unicorn.jpg').then(() => {
//     console.log('done');
// });