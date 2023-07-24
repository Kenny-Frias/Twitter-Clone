// const firebaseConfig = {
//   apiKey: "AIzaSyDNFNg_Rm9krrc7MsDZyVqszZ57NJsChHI",
//   authDomain: "twitter-clone-d5d9a.firebaseapp.com",
//   projectId: "twitter-clone-d5d9a",
//   storageBucket: "twitter-clone-d5d9a.appspot.com",
//   messagingSenderId: "55211511465",
//   appId: "1:55211511465:web:54a106885ae75d3cf963b8",
//   measurementId: "G-JF4N9YCVEC"
// };
 
// firebase.initializeApp(firebaseConfig);

// const storageRef = firebase.storage().ref();

// let finaluser = null;



// // Export a setter function to update the finaluser variable
// // export function setFinalUser(username) {
// //   finaluser = username;
// // }

// // // Export the finaluser variable
// // export { finaluser };

// let filenum;
// let num;

// let times;

// const signInButton = document.querySelector('.insignIn');
// if (signInButton) {
//   signInButton.addEventListener('click', () => {

//     const alerticon = document.querySelector('.alerticon');
//     const alert = document.querySelector('.alert');
   
//     let username = document.querySelector('.inemail').value;
//     let password = document.querySelector('.inpassword').value;
   
//     times = 0;
//     ttimes = 0;

//     if (username !== '' && password !== '') {
   
//       firebase
//   .storage()
//   .ref()
//   .listAll()
//   .then(function(result) {
//     result.items.forEach(function(fileRef) {
//       fileRef
//         .getDownloadURL()
//         .then(function(url) {
//           fetch(url)
//             .then(function(response) {
//               if (response.ok) {
//                 return response.text();
//               } else {
//                 throw new Error("Network response was not ok.");
//               }
//             })
//             .then(function(text) {
//               if (text.includes(username) && text.includes(password)) {
//                 finaluser = username;
//                 window.location.href = '/';
//               } else if (result.items.length == times+1) {
//                 alert.textContent='Wrong password or username!';
//                 alert.style.display = 'block';
//                 alerticon.style.display = 'block';
//               } else {
//                 times+=1;
//               }
//             })
//             .catch(function(error) {
//               console.error("Error fetching file content:", error);
//             });
//         });
//     });
//   })
//     } else {
//       alert.textContent='One or more blank boxes!';
//       alert.style.display = 'block';
//       alerticon.style.display = 'block';
//     }

//   });
// }

// function uploadTextFile(username, password, interests) {
//   const textContent = `${username}${password}${interests.join('')}`;
//   // const textContent = username+password+interests;
//   const fileName = `${username}.txt`;
//   const storageRef = firebase.storage().ref();

//   // Create a reference to the file
//   const fileRef = storageRef.child(fileName);

//   // Upload the text file to Firebase Storage
//   const uploadTask = fileRef.putString(textContent);

//   // Optional: You can monitor the upload progress
//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       // Here, you can handle progress updates
//       const progress =
//         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log(`Upload is ${progress}% done`);
//     },
//     (error) => {
//       // Handle any errors that occur during the upload process
//       console.error("Error uploading the file: ", error);
//     },
//     () => {
//       // Once the upload is complete, you can get the download URL for the file
//       uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//         console.log("File available at: ", downloadURL);
//       });
//     }
//   );
// }

// // Check if the .signUp element exists on the page before adding the event listener
// const signUpButton = document.querySelector('.signUp');
// if (signUpButton) {
//   signUpButton.addEventListener('click', () => {

//     const alerticon = document.querySelector('.alerticon');
//     const alert = document.querySelector('.alert');

//     filenum = 0;
//     num = 0;
   
//     let username = document.querySelector('.email').value;
//     let password = document.querySelector('.password').value;
//     let interests = [""]
 
//     if (username != '' && password != '') {

//       const sports = document.querySelector('.sports')
//       const music = document.querySelector('.music')
//       const tech = document.querySelector('.tech')
     
//       if (sports.checked) {
//         interests.push("Sports");
//         console.log("sports")
//       }
//       if (music.checked) {
//         interests.push("Music");
//       }
//       if (tech.checked) {
//         interests.push("Tech");
//       }

//       firebase
//       .storage()
//       .ref()
//       .listAll()
//       .then(function(result) {
//         if (result.items.length === 0) {
//           finaluser = username;
//           uploadTextFile(username, password, interests)
//           window.location.href = '/';
//         }else {
//           result.items.forEach(function(fileRef) {
//           fileRef
//             .getDownloadURL()
//             .then(function(url) {
//               fetch(url)
//                 .then(function(response) {
//                   if (response.ok) {
//                     return;
//                   } else {
//                     throw new Error("Network response was not ok.");
//                   }
//                 })
//                 .then(function() {
//                   filenum+=1;
//                   if (fileRef.name === `${username}.txt`) {
//                     num+=1;
//                     alert.textContent='Username already in use!';
//                     alert.style.display = 'block';
//                     alerticon.style.display = 'block';
//                   } else if (filenum == result.items.length && num === 0) {
//                     uploadTextFile(username, password, interests)
//                     window.location.href = '/';
//                   }
//                 })
//                 .catch(function(error) {
//                   console.error("Error fetching file content:", error);
//                 });
//             });
//         });
//         }
//       })
//     } else {
//       alert.textContent='One or more blank boxes!';
//       alert.style.display = 'block';
//       alerticon.style.display = 'block';
//     }
//   });
// }






