const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const popup = document.querySelector('.popup');
const okBtn = document.querySelector('.popup button');

//? for the new date
var currentDate = new Date();

var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();

var formattedDate = month + '/' + day + '/' + year;

function addTask() {
    if (inputBox.value === '') {
        popup.classList.add("open-popup");
        inputBox.addEventListener("click", () => {
            popup.classList.remove("open-popup")
        })
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value +" " + "|" + " " + formattedDate;
        listContainer.appendChild(li);
        let span =  document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData()
}

listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData()
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData()
    }
}, false)

function saveData() {
    localStorage.setItem("allData", listContainer.innerHTML)
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("allData");
}

showTask();

// ! timer code 

var ms = 0,
    sec = 0,
    min = 0;

var counter;
var start = document.querySelector('.start'),
    stop_timer = document.querySelector('.stop'),
    reset_timer = document.querySelector('.reset'),
    time = document.querySelector('.time');
start.addEventListener("click", () => {
    if (!counter) {
        counter = setInterval(run, 10);
    }

    function run() {
        time.textContent = min + ":" + sec + ":" + ms
        ms++
        if (ms == 100) {
            ms = 0;
            sec++;
        }
        if (sec == 60) {
            sec = 0;
            min++;
        }
    }
})

stop_timer.addEventListener("click", () => {
    clearInterval(counter);
    counter = false
})

reset_timer.addEventListener("click", () => {
    clearInterval(counter);
    counter = false;
    ms = 0,
        sec = 0,
        min = 0;
    time.textContent = min + ':' + sec + ':' + ms;
})
