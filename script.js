var currentBox = 0;
const sections = ["About Me", "Project1", "Project2"];
var listLength = document.getElementById("list").getElementsByClassName("dot").length;

window.onload = function() {
    scrollToBox(0);
};
window.onresize = function () {
    scrollToBox(currentBox);
};

for (i = 0; i < listLength; i++) {
    addEventToDot(i);
    if (i < listLength - 1) {
        let rect = document.getElementById("dot" + i).getBoundingClientRect();
        let xPos = rect.left + rect.width / 2;
    }
}

function addEventToDot(index) {
    let dot = document.getElementById("dot" + index);

    dot.addEventListener("mousedown", function() {
        scrollToBox(index);
    });
}

function scrollToBox(index) {
    if (index != currentBox) {
        document.getElementById("dot" + currentBox).classList.remove("active");
        currentBox = index;
        document.getElementById("dot" + currentBox).classList.add("active");
        //animateDoor();
    }

    setTimeout(function() {
        console.log
        document.getElementById("box" + index)
        .scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    }, 500);
}