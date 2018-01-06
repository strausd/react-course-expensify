const promise = new Promise((resolve, reject) => {
    // setTimeout(() => {
    //     resolve('This is my resolved data');
    // }, 2000);
    setTimeout(() => {
        reject('something went wrong');
    }, 2000);
});

console.log('Before');

promise.then((data) => {
    console.log('1', data);
}).catch((error) => {
    console.log(error);
});


console.log('After');