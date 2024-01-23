// const Clarifai = require('clarifai');

// const returnClarifaiRequestOptions = (imageUrl) => {
// const PAT = 'dfb565faf154434e8179ea80a0130982';
// // Specify the correct user_id/app_id pairings
// // Since you're making inferences outside your app's scope
// const USER_ID = 'esra75';       
// const APP_ID = 'Test';
// // Change these to whatever model and image URL you want to use
// // eslint-disable-next-line no-unused-vars
// const MODEL_ID = 'face-detection';   
// const IMAGE_URL = imageUrl;

// const raw = JSON.stringify({
//     "user_app_id": {
//         "user_id": USER_ID,
//         "app_id": APP_ID
//     },
//     "inputs": [
//         {
//             "data": {
//                 "image": {
//                     "url": IMAGE_URL
//                 }
//             }
//         }
//     ]
// });

// const requestOptions = {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Authorization': 'Key ' + PAT
//     },
//     body: raw
// };

// return requestOptions

// }

// const initial = {
// 	box: {}
// }

//   displayFaceBox = box => {
//     this.setState({ box: box });
//     };

// const handleApiCall = (req, res) =>{
//   fetch("https://api.clarifai.com/v2/models/" + "face-detection" +  "/outputs", returnClarifaiRequestOptions(req.body.input))
//       .then(data => {
//       res.json(data);

//   }) 

//       .catch(err=>res.status(400).json('unable to work with api'))
// }

// const handleImage = (req, res, knex) => {
// 	const { id } = req.body;
// 	knex('users').where('id', '=', id)
// 	.increment('entries', 1)
// 	.returning('entries')
// 	.then(entries => {
// 		res.json(entries[0].entries)
// 	})
// 	.catch(err => res.status(400).json('unable to get entries'))
// }


// module.exports = {
// 	handleImage,
// 	handleApiCall
// }


const Clarifai = require('clarifai');
 
const app = new Clarifai.App({
 apiKey: 'f4f2426292c54d03a76dda921c4eedb0' 
});

const handleApiCall = (req, res) => {
  app.models.predict('face-detection', req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, knex) => {
  const { id } = req.body;
  knex('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}