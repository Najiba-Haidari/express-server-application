const navbarImg = document.getElementById("home");

navbarImg.addEventListener("click", ()=> {
    window.location.replace("http://127.0.0.1:3000/");
})

// const modal = document.getElementById("exampleModal");

// modal.addEventListener("submit", handleNewUser);

// function handleNewUser(e) {
//     e.preventDefault();
// let name = document.getElementById("user-name")
// let username = document.getElementById("user-username")
// let email = document.getElementById("user-email")

// const newUser = {
//     name, username, email
// }

// fetch(('/api/users', {
//     method: "POST",
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newUser),
// })
// .then((response)=> response.json())
// .then((data)=> {
//     name = "";
//     username= "";
//     email = "";
// })
// )
// }