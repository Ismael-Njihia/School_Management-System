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

    } else {
        window.location.href = "/School_Management-System/index.html"
    }
})