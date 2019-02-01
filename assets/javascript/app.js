
$(document).ready(function() {

        //Getting Firebase Ready
    var config = {
    apiKey: "AIzaSyDCyHKRJYZRzmlob35fMotBNekGWhWyC-o",
    authDomain: "train-time-57ab8.firebaseapp.com",
    databaseURL: "https://train-time-57ab8.firebaseio.com",
    projectId: "train-time-57ab8",
    storageBucket: "train-time-57ab8.appspot.com",
    messagingSenderId: "194462908180"
  
};
    
    firebase.initializeApp(config);


    var database = firebase.database();


//adding buttons to train time

    $("#add-train-btn").on("click", function(event) {
        event.preventDefault();

        var trainName = $("#train-name-input").val().trim();
        var trainDest = $("#dest-input").val().trim();
        var firstTrain = $("#firstTrain-input").val().trim();
        var trainFreq = $("#freq-input").val().trim()

        var newTrain = {
            name: trainName,
            destination: trainDest,
            start: firstTrain,
            frequency: trainFreq
        };


        //uploads train data        
            database.ref().push(newTrain);


            alert("Train added");

     // Clears textboxes
        $("#train-name-input").val("");
        $("#dest-input").val("");
        $("#firstTrain-input").val("");
        $("#freq-input").val("");

        return false;
    });


    // Creating Firebase event
    database.ref().on("child_added", function(childSnapshot){

         console.log(childSnapshot.val());

        // Storing data in variables
         var trainName = childSnapshot.val().name;
         var trainDest = childSnapshot.val().destination;
         var firstTrain = childSnapshot.val().start;
         var trainFreq = childSnapshot.val().frequency;


    // Declaring a variable
        var trainFreq  = trainFreq;

        var firstTime = firstTrain;
    
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

    // Current time
        var currentTime = moment();
        console.log("Current Time: " + moment(currentTime).format("HH:mm"));
        
    // Difference between times 
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("Difference in time: " + diffTime);

    // Time apart 
        var tReminder = diffTime % trainFreq; 
        console.log(tReminder);

    // time until train 
        var tMinutesTillTrain = trainFreq - tReminder;
        console.log("Minutes till train: " + tMinutesTillTrain);

    // Next train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var arrival = moment(nextTrain).format("hh:mm a");
        console.log("Arrival time: " + moment(nextTrain).format("HH:mm"));

    // Adding data to table

    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>"
    + trainFreq + "</td><td>" + arrival + "</td><td>" + tMinutesTillTrain + "</td><tr>");
        

    });



});