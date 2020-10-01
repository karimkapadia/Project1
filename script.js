//Yelp Fusion API Key
const apiKeyYELP = "EZDv5tRzSfa7-uVnENuWVxJseqp-EuPvr14V3TfEXtvyp4o4Vf5AutuD7iaTPpDqUGz_hdCBcsTkKJZaIe0AlyL-FbC8DbKtufn_L6f5NJICtGj1MCqGFXXZo8F0X3Yx";

//HTML5 native geolocation
var devicePos;

//Build query URL for Yelp Fusion API
function buildYelpURL(position){
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?";
    var params = [];
    //For user to input location
    //if($("#").val() != "") params.push(`location=${$("#").val()}`);
    if(position != null) {
        params.push(`latitude=${position.coords.latitude}`);
        params.push(`longitude=${position.coords.longitude}`);
    }
    if($("#catagories").val() != "Select a Category...") params.push(`catagories=${$("#catagories").val()}`);
    return queryURL + params.join("&");
}

//Send request to Yelp Fusion API
function getYelpResults(){
    var queryURL = buildYelpURL(devicePos);
    $.ajax({
        url: queryURL,
        method: "GET",
        asyn omain: true,
        headers: {
            "Authorization": `Bearer ${apiKeyYELP}`
        }
    }).then(function(response){
        console.log(response);
    //In case unexpected errors happen
    }).fail(function(xhr, textStatus, error){
        console.log(xhr);
        console.log(textStatus);
    });
}

//Using native HTML5 geolocation to get user's location and pass to getRestaurant()
function getLocation(){
    console.log("getLocation() Ran")
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
}

function setPosition(position){
  devicePos = position;
}

$(document).ready(function(){
  $(".curLocation").on("click", getLocation);
  $("#searchBtn").on("click", getYelpResults);
});