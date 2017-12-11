// const person = {
//     name: 'Danny',
//     age: 25,
//     location: {
//         city: 'Dallas',
//         temp: 71
//     }
// };
//
// const {name = 'Anonymous', age} = person;
//
// console.log(`${name} is ${age}.`);
//
// const {temp: temperature, city} = person.location;
// if (city && temperature) {
//     console.log(`It's ${temperature} in ${city}.`);
// }
//
// const book = {
//     title: 'The Bible',
//     author: 'God',
//     publisher: {
//         name: "God's Church"
//     }
// };
//
// const {name: publisherName = 'Self-Published'} = book.publisher;
// console.log(publisherName);

// Array destructuring
console.log('=======================================================');

const address = ['12231 Amsterdam Rd', 'Farmers Branch', 'TX', '75234'];

const [ , city, state] = address;

console.log(`You are in ${city} ${state}.`);


const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [description, price_small, price_med, price_large] = item;

console.log(`A medium ${description} costs ${price_med}.`);
