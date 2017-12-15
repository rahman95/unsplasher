require('dotenv').config();
import Unsplash from 'unsplash-js';
const wallpaper = require('wallpaper');
const unsplash = new Unsplash({
  applicationId: process.env.CLIENT_ID,
  secret: process.env.API_SECRET,
  callbackUrl: process.env.CALLBACK_URL
});

unsplash.photos.getRandomPhoto(
    {
     height: process.env.HEIGHT || 1080,
     width: process.env.WIDTH || 1920,
     featured: process.env.FEATURED || true,
    }
).then(toJson)
.then(json => {
    // Your code
  });



// wallpaper.set('unicorn.jpg').then(() => {
//     console.log('done');
// });