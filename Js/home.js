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
            //show the MSS
        firebase.firestore().collection("MSS").get().then((MssScore) => {

            MssScore.forEach((doc) => {
                let MeanSS = doc.data().Mss;
                console.log(MeanSS)

                document.getElementById("MSS").innerText = MeanSS;

            })

        })


        //pull all users and show them
        firebase.firestore().collection("users").get().then((querySnapshot) => {
                let userDetails = '';
                querySnapshot.forEach((doc) => {
                    let userName = doc.data().userName;
                    let userType = doc.data().userType

                    userDetails += '<div class="usersHomeAll">';
                    userDetails += '<h4>' + userName + '</h4>';
                    userDetails += '<p>' + userType + '</p>';
                    userDetails += '</div>';

                })
                $("#allusers").append(userDetails);
            })
            //let's calculate the mean score for every subjects
        firebase.firestore().collection("marks").get().then((myVirtualStore) => {
            var Eng = 0;
            var kis = 0;
            var math = 0;
            var sci = 0;
            var social = 0;
            myVirtualStore.forEach((doc) => {
                var engM = doc.data().Eng
                var engP = parseInt(engM)
                var kisM = doc.data().kis
                var kisP = parseInt(kisM)
                var mathM = doc.data().math
                var mathP = parseInt(mathM)
                var sciM = doc.data().sci
                var sciP = parseInt(sciM)
                var socialM = doc.data().SSC
                var socialP = parseInt(socialM)


                Eng += engP;
                kis += kisP;
                math += mathP;
                sci += sciP;
                social += socialP;

                //from our database let's get how many students we have
                firebase.firestore().collection("classDetails").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let SNO = doc.data().studentsNo;

                        var EngMss = Eng / SNO
                        var kisMss = kis / SNO
                        var mathMss = math / SNO
                        var sciMSS = sci / SNO
                        var socialMss = social / SNO


                        //data Visualization
                        const ctx = document.getElementById('myChart').getContext('2d');
                        const myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ['English', 'Kiswahili', 'Mathematics', 'Science', 'SS/CRE'],
                                datasets: [{
                                    label: 'Mean score for subjects ',
                                    data: [EngMss, kisMss, mathMss, sciMSS, socialMss],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 2
                                }]
                            },
                            options: {
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }
                        });




                    })
                })

            })

        })



    } else {
        window.location.href = "/School_Management-System/index.html"
    }
})