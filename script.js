// script.js
let currentWeek = getWeekNumber(new Date());
let weeklyNotes = {};
let noteContainer = document.getElementById("note-container");
let submitButton = document.getElementById("submit-button");
let weekSelector = document.getElementById("week-selector");

submitButton.addEventListener("click", function() {
    var note = document.getElementById("note-input").value;
    if(!weeklyNotes[currentWeek]){
        weeklyNotes[currentWeek] = [];
    }
    weeklyNotes[currentWeek].push(note);
    localStorage.setItem("weeklyNotes", JSON.stringify(weeklyNotes));
    renderNotes();
});

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return weekNo;
}


weekSelector.addEventListener("change", function() {
    currentWeek = weekSelector.value;
    renderNotes();
});

function renderNotes(){
    noteContainer.innerHTML = "";
    if(!weeklyNotes[currentWeek]){
        return;
    }
    weeklyNotes[currentWeek].forEach(function(note) {
        var newNote = document.createElement("div");
        newNote.innerHTML = note;
        noteContainer.appendChild(newNote);
    });
}

window.onload = function() {
    var savedWeeklyNotes = localStorage.getItem("weeklyNotes");
    if (savedWeeklyNotes) {
        weeklyNotes = JSON.parse(savedWeeklyNotes);
    }
    for(let i = 1; i <= 52; i++){
        var option = document.createElement("option");
        option.value = i;
        option.text = "Week " + i;
        weekSelector.appendChild(option);
    }
    renderNotes();
};
function renderNotes() {
    noteContainer.innerHTML = "";
    if (!weeklyNotes[currentWeek]) {
        return;
    }
    weeklyNotes[currentWeek].forEach(function(note, index) {
        var newNote = document.createElement("div");
        newNote.innerHTML = note;
        var editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.className = "editBtn";
        editBtn.addEventListener("click", function() {
            // code to display the note in an input field and allow editing
        });
        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.className = "deleteBtn";
        deleteBtn.addEventListener("click", function() {
            weeklyNotes[currentWeek].splice(index, 1);
            localStorage.setItem("weeklyNotes", JSON.stringify(weeklyNotes));
            renderNotes();
        });
        newNote.appendChild(editBtn);
        newNote.appendChild(deleteBtn);
        noteContainer.appendChild(newNote);
    });
}


