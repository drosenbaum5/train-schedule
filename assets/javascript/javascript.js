

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDWkT48lYL-9gA8o7pxN_rjvhw77U8fUwk",
    authDomain: "train-schedule-6d89a.firebaseapp.com",
    databaseURL: "https://train-schedule-6d89a.firebaseio.com",
    projectId: "train-schedule-6d89a",
    storageBucket: "",
    messagingSenderId: "701307719763",
    appId: "1:701307719763:web:b1e49505d69f7528"
  };    


  
  firebase.initializeApp(firebaseConfig); 
  var database = firebase.database();





  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#destination").val().trim();
    // var firstTrainTime = moment($("first-time").val(), "H HH").format("LT");
    var firstTrainTime = $("#first-time").val().trim();
    var trainFrequency = $("#frequency").val().trim();

    console.log(firstTrainTime);
    
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      firstTime: firstTrainTime,
      frequency: trainFrequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);





   


  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-time").val("");
  $("#frequency").val("");
});


//Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTime;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trainFrequency);






    // Create the new row
   // First Time (pushed back 1 year to make sure it comes before current time)
   var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
   console.log(firstTimeConverted);
   console.log(firstTrainTime);

   // Current Time
   var currentTime = moment();
   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

   // Difference between the times
   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   console.log("DIFFERENCE IN TIME: " + diffTime);

   // Time apart (remainder)
   var tRemainder = diffTime % trainFrequency;
   console.log(tRemainder);

   // Minute Until Train
   var tMinutesTillTrain = trainFrequency - tRemainder;
   console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

   // Next Train
   var nextTrain = moment().add(tMinutesTillTrain, "minutes");
   console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(firstTrainTime),
    $("<td>").text(nextTrain),
  
  );
  console.log(JSON.stringify(newRow,null,2))

  // Append the new row to the table
  $("#schedule-table > tbody").append(newRow);
});
