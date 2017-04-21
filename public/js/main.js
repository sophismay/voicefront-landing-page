$(function() {
    //dynamically add x image
    displayNegative();
});

function displayNegative() {
    setTimeout(function(){
        $("<img src='images/negative-x.png' id='negative-img'>").css({
            "position": "absolute", "top": "200px", "right": "0"
        }).appendTo(".image-container").addClass("animated fadeIn");
        displayPhone();
    }, 1000); 
}
function displayPhone() {
    setTimeout( function(){
        $("#mic-image").addClass("fadeOut").css({"display": "none"});
        $("#negative-img").addClass("fadeOut").css({"display": "none"});
        $("<img src='images/app-screen-showcase.png'>").appendTo(".image-container").addClass("animated fadeInRight");
    }, 900);
}