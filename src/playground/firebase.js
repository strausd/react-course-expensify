import * as firebase from 'firebase';

const config = {
};

firebase.initializeApp(config);

const database = firebase.database();

database.ref('expenses').on('child_removed', (dataSnapshot) => {
    console.log(dataSnapshot.key, dataSnapshot.val());
});

database.ref('expenses').on('child_changed', (dataSnapshot) => {
    console.log(dataSnapshot.key, dataSnapshot.val());
});

database.ref('expenses').on('child_added', (dataSnapshot) => {
    console.log(dataSnapshot.key, dataSnapshot.val());
});

// database.ref('expenses')
//     .on('value', (dataSnapshot) => {
//         const expenses = [];
//         dataSnapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });
//         console.log('Expenses updated:');
//         console.log(expenses);
//     }, (e) => {
//         console.log('Error fetching changed value.', e)
//     });


// database.ref('expenses')
//     .once('value')
//     .then((dataSnapshot) => {
//         const expenses = [];
//         dataSnapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });
//         console.log(expenses);
//     })
//     .catch((e) => {
//         console.log('Error', e)
//     })

// database.ref('expenses').push({
//     createdAt: 123,
//     description: 'Disney World',
//     note: '',
//     amount: 450000
// });




// database.ref('notes/-L0yZB3R20uDYlPPivH3').remove();

// database.ref('notes').push({
//     title: 'Course topics',
//     body: 'React native, angular, python'
// })

// const firebaseNotes = {
//     notes: {
//         hjaksfjsdg: {
//             title: 'First note',
//             body: 'this is my note body right here'
//         },
//         kfsdhkgjjf: {
//             title: 'Second note',
//             body: 'this is more body text'
//         },
//     }
// };

// const notes = [
//     {
//         id: 12,
//         body: 'First note'
//     },
//     {
//         id: 1247,
//         body: 'Second note'
//     }
// ];

// database.ref('notes').set(notes);

// const onValueChange = database.ref().on('value', (dataSnapshot) => {
//     const data_value = dataSnapshot.val();
//     const final_string = `${data_value.name} is a ${data_value.job.title} at ${data_value.job.company}.`;
//     console.log(final_string);
// }, (e) => {
//     console.log('Error in fetching data.', e);
// });

// setTimeout(() => {
//     database.ref().update({
//         name: 'Afton Straus',
//         'job/title': 'Software Engineer'
//     });
// }, 2000);

// setTimeout(() => {
//     database.ref().off('value', onValueChange);
//     console.log('Just unsubscribed');
// }, 4000);

// setTimeout(() => {
//     database.ref().update({
//         name: 'Danny Straus',
//         'job/title': 'Software Developer'
//     });
//     console.log('Just updated the db after unsubscribing');
// }, 6000);



// database.ref()
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val)
//     })
//     .catch((e) => {
//         console.log('Error fetching data.', e);
//     });

// database.ref().set({
//     name: 'Danny Straus',
//     age: 25,
//     stressLevel: 7,
//     isMarried: true,
//     job: {
//         title: 'Software Developer',
//         company: 'Insite'
//     },
//     location: {
//         city: 'Dallas',
//         country: 'USA'
//     }
// }).then(() => {
//     console.log('Data is saved');
// }).catch((error) => {
//     console.log('error:', error);
// });

// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'USAA',
//     'location/city': 'Plano'
// });

// database.ref('location/city').remove().then(() => {
//     console.log('Successfully removed');
// }).catch((e) => {
//     console.log(e);
// });