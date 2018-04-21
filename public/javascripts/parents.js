(() => {
var tabs = document.querySelectorAll(".tab");
var box = document.querySelector(".recommended .box");

function changeSection(e)
{
    e.preventDefault;
    if(e.target.classList.contains("tv")) {
        box.style.backgroundImage = "url('../images/television-background-adult.jpg')";
    }
    else if(e.target.classList.contains("movies")){
        box.style.backgroundImage = "url('../images/movies-background-adult.jpg')";
    }
    else if(e.target.classList.contains("music")){
        box.style.backgroundImage = "url('../images/music-background-adult.jpg')";
    }
}




tabs.forEach(function(element, index) {
    element.addEventListener('click', changeSection);
});
})();
