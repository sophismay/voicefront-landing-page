$(function() {
    //dynamically add x image
    loadIcons();
    displayNegative();
});

function loadIcons() {
    $("#ui-id-45 img").attr({"src": "images/mobile.png"}).css({"height": "120px", "width": "120px"});
    $("#ui-id-46 img").attr({"src": "images/chair-bw.png"}).css({"height": "120px", "width": "120px"});
    $("#ui-id-47 img").attr({"src": "images/chip.png"}).css({"height": "120px", "width": "120px"});
}

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