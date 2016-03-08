"use strict";

const $ = require('jquery');

function display(data) {
  let displayedAnimals = "";
  for (let prop in data) {
    displayedAnimals += `<div class="animalInfo">`;
    displayedAnimals += `<h2>${data[prop].animal}</h2>`;
    displayedAnimals += `<img src="${data[prop].image}" width=200 height=200>`;
    displayedAnimals += `<p>Distinguishing characteristic: ${data[prop].characteristic}</p>`;
    displayedAnimals += `<button class="delete" id=${prop}>Delete</button>`
    displayedAnimals += `</div>`;
  }
  $("#animals").html(displayedAnimals);

  $(".delete").click(function() {

    $.ajax({
          url:`https://vivid-heat-6487.firebaseio.com/animals/${$(this)[0].id}.json`,
          method: "DELETE",
        }).done(function(returnFromDelete){
            console.log("returnFromDelete", returnFromDelete);
       
        });
});
}

let getAnimals = function() {
  return new Promise((resolve, reject) => {
    $.ajax({
            url:"https://vivid-heat-6487.firebaseio.com/animals/.json",//.json tells firebase to send back in json
            method: "GET",
          }).done(function(data) {
              resolve(data);
              //console.log("data", data); 
          }).fail(function(error) {
              reject(error);
              console.log("failed", error);
          });
  });
};

getAnimals()
  .then(
    function(data) {
      console.log("data", data);
      display(data);
    }
  );
/// build new animal

$("#button").click(function() {
  console.log("you clicked the button!");

  let newAnimal = {
    "animal": $("#animal").val(),
    "image": $("#image").val(),
    "characteristic": $("#characteristic").val()
  };

  console.log("newAnimal", newAnimal);
  newAnimal = JSON.stringify(newAnimal);
  $.ajax({
        url:"https://vivid-heat-6487.firebaseio.com/animals.json",
        method: "POST",
        data: newAnimal
      }).done(function(addedAnimal){
          console.log("addedAnimal", addedAnimal);
     
      });
});


$(".delete").click(function() {
  console.log("this", $(this));

  // $.ajax({
  //       url:"https://vivid-heat-6487.firebaseio.com/animals.json",
  //       method: "DELETE",
  //       data: newAnimal
  //     }).done(function(addedAnimal){
  //         console.log("addedAnimal", addedAnimal);
     
  //     });
});













