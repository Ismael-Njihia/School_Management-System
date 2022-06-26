firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        document.getElementById("ClassDetails").onclick = function() {
            let classIn = document.getElementById("classIn").value;
            let studentsNo = document.getElementById("studentsNo").value;

            //store in the firebase
            let classDetails = firebase.firestore().collection("classDetails").doc();
            classDetails.set({
                classIn: classIn,
                studentsNo: studentsNo,
                classDetails: classDetails.id,
            }).then(() => {
                window.location.reload();
            })
        }
        document.getElementById("ExamDetails").onclick = function() {
            let selectOption = document.getElementById("selectOption").value;
            let yearInput = document.getElementById("yearInput").value;

            //store in the firebase
            let ExamDetails = firebase.firestore().collection("ExamDetails").doc();
            ExamDetails.set({
                selectOption: selectOption,
                yearInput: yearInput,
                ExamDetails: ExamDetails.id
            }).then(() => {
                window.location.reload();
            })
        }
        firebase.firestore().collection("classDetails").get().then((virtualStore) => {
            let content = "";
            virtualStore.forEach((doc) => {
                classIn: doc.data().classIn;
                studentsNo: doc.data().studentsNo;
                classDetails: doc.data().classDetails;

                content += '<h3> +studentsNo +</h3>'

            })
            $("#NoStudents").append(content);
        })

    } else {
        window.location.href = "/School_Management-System/index.html"
    }
})