firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var UserId = user.uid;
        console.log(UserId);
        //username
        firebase.firestore().collection("users").doc(UserId).get().then((doc) => {
            var username = doc.data().userName;


            document.getElementById("addMarks").onclick = function() {
                //getting user input
                let fullname = document.getElementById("Fname").value;
                let English = document.getElementById("English").value;
                let EngF = parseInt(English);
                let kis = document.getElementById("kiswahili").value;
                let kisF = parseInt(kis);
                let math = document.getElementById("math").value;
                let mathF = parseInt(math)
                let sci = document.getElementById("sci").value;
                let sciF = parseInt(sci)
                let SSC = document.getElementById("SSC").value;
                let sscF = parseInt(SSC)
                let TT = EngF + kisF + mathF + sciF + sscF;
                //getting date in  my format
                let timeStamp = new Date();
                let year = timeStamp.getFullYear();
                let month = timeStamp.getMonth();
                month += 1
                let day = timeStamp.getDate();

                let timeFormatted = day + "/" + month + "/" + year


                let marks = firebase.firestore().collection("marks").doc();
                marks.set({
                    Fname: fullname,
                    Eng: English,
                    kis: kis,
                    math: math,
                    sci: sci,
                    SSC: SSC,
                    TT: TT,
                    UserId: UserId,
                    tutor: username,
                    date: timeFormatted,
                    docId: marks.id
                }).then(() => {
                    window.location.reload();
                })

            }
            firebase.firestore().collection("marks").orderBy("TT", "desc").get().then((querySnapshot) => {
                let content = '';
                let position = 1;

                //how many students are in class?
                firebase.firestore().collection("classDetails").get().then((virtualStore) => {
                    virtualStore.forEach((doc) => {
                        var studentsNo = doc.data().studentsNo;
                        console.log(studentsNo);
                        //calculate the mean score of the students
                        let PUpgraded = position - 1;
                        if (PUpgraded == studentsNo) {
                            firebase.firestore().collection("marks").get().then((virtualStore) => {
                                let allTotal = 0;
                                virtualStore.forEach((doc) => {
                                    let TT = doc.data().TT;
                                    //parse Int
                                    let ParsedTT = parseInt(TT);
                                    allTotal += ParsedTT
                                    let Mss = allTotal / studentsNo;
                                    console.log(allTotal)
                                    document.getElementById("mssInternal").innerText = "MSS" + " " + Mss;
                                    document.getElementById("addMarks").disabled = true;
                                    //Update the Mss to the Database
                                    let MssDoc = firebase.firestore().collection("MSS").doc(UserId);
                                    MssDoc.set({
                                        UserId: UserId,
                                        MssDoc: MssDoc.id,
                                        Mss: Mss,
                                    })

                                })
                            })
                        } else if (PUpgraded < studentsNo) {
                            console.log(PUpgraded - studentsNo);
                            document.getElementById("mssInternal").style.display = "none";
                        }
                    })



                })

                querySnapshot.forEach((doc) => {
                    let Fname = doc.data().Fname
                    let Eng = doc.data().Eng
                    let kis = doc.data().kis
                    let math = doc.data().math
                    let sci = doc.data().sci
                    let SSC = doc.data().SSC
                    let TT = doc.data().TT
                    let date = doc.data().date
                    let tutor = doc.data().tutor


                    content += '<tr>'
                    content += '<td>' + position++ + '</td>'
                    content += '<td>' + Fname + '</td>'
                    content += '<td>' + Eng + '</td>'
                    content += '<td>' + kis + '</td>'
                    content += '<td>' + math + '</td>'
                    content += '<td>' + sci + '</td>'
                    content += '<td>' + SSC + '</td>'
                    content += '<td>' + TT + '</td>'
                    content += '<td>' + tutor + '</td>'
                    content += '<td>' + date + '</td>'
                    content += '</tr>'
                })
                $("#marksDisplay").append(content);
            })
        })


    } else {
        window.location.href = "/School_Management-System/index.html"
    }

})