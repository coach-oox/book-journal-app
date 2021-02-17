const form = document.querySelector("form");
const newButton = document.querySelector(".new-journal");
const cancelButton = document.querySelector(".cancel");
const addButton = document.querySelector(".add");

function saveJournal(event) {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const journal = document.querySelector("#journal").value;
    const userDatas = JSON.parse(localStorage.getItem(USER_DATA));

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const day = now.getDay();
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fir", "Sat"];

    const obj = {
        id: Math.random().toString(36).substr(2, 16),
        date: `${year}. ${month < 10 ? `0${month}` : `${month}`}. ${
            date < 10 ? `0${date}` : `${date}`
        }. ${days[day]}`,
        time: `${hour < 10 ? `0${hour}` : `${hour}`} : ${min < 10 ? `0${min}` : `${min}`} : ${
            sec < 10 ? `0${sec}` : `${sec}`
        }`,
        title,
        journal,
    };

    if (!userDatas) {
        const datas = [obj];
        localStorage.setItem(USER_DATA, JSON.stringify(datas));
    } else {
        userDatas.push(obj);
        localStorage.setItem(USER_DATA, JSON.stringify(userDatas));
    }

    closeForm();
    location.reload();
}

function closeForm() {
    form.classList.add("hidden");
    newButton.classList.remove("hidden");
}

function openForm() {
    newButton.classList.add("hidden");
    form.classList.remove("hidden");
}

newButton.addEventListener("click", openForm);
cancelButton.addEventListener("click", closeForm);
addButton.addEventListener("click", saveJournal);
