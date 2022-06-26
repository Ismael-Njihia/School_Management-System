document.getElementById("login").onclick = function() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password).then((userCred) => {
        let userId = userCred.user.uid;
        console.log(userId)

    }).then(() => {
        window.location.href = "/School_management-System/views/home.html"
    })
}