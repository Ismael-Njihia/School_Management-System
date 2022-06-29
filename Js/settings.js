firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //get the logged in user Id
        let UserId = user.uid;
        console.log(UserId)

        document.getElementById("ClassDetails").onclick = function() {
            let classIn = document.getElementById("classIn").value;
            let studentsNo = document.getElementById("studentsNo").value;

            //store in the firebase
            let classDetails = firebase.firestore().collection("classDetails").doc();
            classDetails.set({
                classIn: classIn,
                studentsNo: studentsNo,
                UserId: UserId,
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
                    UserId: UserId,
                    ExamDetails: ExamDetails.id
                }).then(() => {
                    window.location.reload();
                })
            }
            //showing the ExamDetails and Class details to the user
        firebase.firestore().collection("classDetails").get().then((querysnapshot) => {
            let content = '';
            querysnapshot.forEach((doc) => {
                let SNO = doc.data().studentsNo;
                let classIn = doc.data().classIn;
                let docId = doc.data().classDetails;
                console.log(SNO);

                content += '<tr>';
                content += '<td>' + SNO + '</td>';
                content += '<td>' + classIn + '</td>';
                content += '<td> <button class="btn btn-primary" id="editSettings">Edit</button> </td>';
                content += '<td> <button class="btn btn-danger">Delete</button> </td>';
                content += '</tr>';

            })
            $("#SettingsDetails").append(content);

        })


    } else {
        window.location.href = "/School_Management-System/index.html"
    }
})