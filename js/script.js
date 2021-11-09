$(document).ready(function() {
  //global variables
  var totalWinning = 0;

  //event listener
  $("button").on("click", pull);

  //functions
  function isBetValid() {
    let isValid = true;
    if($("#bet").val() < 1 || $("#bet").val() > 100) {
      isValid = false;
    }
    return isValid;
  }//isBetValid
  function pull() {
    //variables
    let winnings = 0;
    let bet = $("#bet").val();
    let slotsArray = ["cherry", "bar", "seven"];
    let slotTrackArray = ["", "", ""];
    let winHeading = document.getElementById("win");
    let totalWinHeading = document.getElementById("totalWin");
    
    //clear error message
    $("#invalid").html("");

    //check for valid bet
    if(!isBetValid()) {
      //clear win message and slot images
      $("#win").html("");
      for(let i = 1; i < 4; i++) {
        $(`#slot${i}`).html("");
      }
      //set error message
      $("#invalid").html("You placed an invalid bet, please bet between $1-100.");
      return;
    }

    //loops through to set each slot image
    for(let i = 1; i < 4; i++) {
      //get random number between 0-2, 0 = cherry, 1 = bar, 2 = seven
      let slot = Math.floor(Math.random() * 3);
      //track which value was drawn
      slotTrackArray[i - 1] = slotsArray[slot];
      //set slot image
      $(`#slot${i}`).html(`<img src='img/${slotsArray[slot]}.png' alt=${slotsArray[slot]}>`);
    }

    //calculate winnings and output results in green if positive and red if negative
    if(slotTrackArray[0] == "cherry" && slotTrackArray[1] == "cherry" && slotTrackArray[2] == "cherry") {
      winnings = bet * 2;
      totalWinning += winnings;
      $("#win").html(`You won! ${bet} x 2 = $${winnings}`);
      winHeading.style["color"] = "green";
    }
    else if(slotTrackArray[0] == "bar" && slotTrackArray[1] == "bar" && slotTrackArray[2] == "bar") {
      winnings = bet * 6;
      totalWinning += winnings;
      $("#win").html(`You won! ${bet} x 6 = $${winnings}`);
      winHeading.style["color"] = "green";
    }
    else if(slotTrackArray[0] == "seven" && slotTrackArray[1] == "seven" && slotTrackArray[2] == "seven") {
      winnings = bet * 15;
      totalWinning += winnings;
      $("#win").html(`You won! ${bet} x 15 = $${winnings}`);
      winHeading.style["color"] = "green";
    }
    else {
      $("#win").html("You lost!");
      totalWinning -= bet;
      winHeading.style["color"] = "red";
    }
    if(totalWinning > 0) {
      totalWinHeading.style["color"] = "green";
    }
    else {
      totalWinHeading.style["color"] = "red";
    }
    $("#totalWin").html(`Total winnings: ${totalWinning}`);
  }//pull
  
});//ready