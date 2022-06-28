firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        firebase.firestore().collection("classDetails").get().then((virtualStore) => {

            virtualStore.forEach((doc) => {
                let classIn = doc.data().classIn;
                let studentsNo = doc.data().studentsNo;
                let classDetails = doc.data().classDetails;
                console.log(studentsNo)

                document.getElementById("NoStudents").innerText = studentsNo;
                document.getElementById("Class").innerText = classIn;

            })
        })
        firebase.firestore().collection("ExamDetails").get().then((querySnapshot) => {

                querySnapshot.forEach((doc) => {
                    let selectOption = doc.data().selectOption;
                    let yearInput = doc.data().yearInput;
                    let docId = doc.data.ExamDetails;

                    document.getElementById("typeOfExam").innerText = selectOption;
                    document.getElementById("examDone").innerText = "Exam done in" + " " + yearInput;


                })
            })
            //pull all users and show them
        firebase.firestore().collection("users").get().then((querySnapshot) => {
            let userDetails = '';
            querySnapshot.forEach((doc) => {
                let userName = doc.data().userName;
                let userType = doc.data().userType

                userDetails += '<div>';
                userDetails += '<h4>' + userName + '</h4>';
                userDetails += '<p>' + userType + '</p>';
                userDetails += '</div>';

            })
            $("#allusers").append(userDetails);
        })

    } else {
        window.location.href = "/School_Management-System/index.html"
    }
})