const USER_DATA = "user-data";

function openJournal(event) {
    let target;
    const selected = event.target.classList;

    if (selected.contains("book-title")) {
        target = event.target.parentNode.childNodes[2];
    } else if (selected.contains("text")) {
        target = event.target.parentNode.parentNode.childNodes[2];
    } else {
        target = event.target.parentNode.parentNode.parentNode.childNodes[2];
    }

    if (target.classList.contains("hidden")) {
        target.classList.remove("hidden");
    } else {
        target.classList.add("hidden");
    }
}

function loadJournal() {
    const datas = JSON.parse(localStorage.getItem(USER_DATA));

    if (datas) {
        datas.forEach((data) => {
            const userId = data.id;
            const userDate = data.date;
            const userTime = data.time;
            const userTitle = data.title;
            const userJournal = data.journal;

            const container = document.querySelector(".content");
            const element = document.createElement("div");
            const created = document.createElement("div");
            const date = document.createElement("div");
            const time = document.createElement("div");
            const bookTitle = document.createElement("div");
            const text = document.createElement("div");
            const bookJournal = document.createElement("div");
            const bookMenu = document.createElement("div");
            const journal = document.createElement("div");
            const edit = document.createElement("button");
            const remove = document.createElement("button");

            const calendarIcon = `<i class="far fa-calendar"></i>`;
            const clockIcon = `<i class="far fa-clock"></i>`;
            const arrowIcon = `<i class="far fa-arrow-alt-circle-down"></i>`;

            // date and time
            date.innerHTML = calendarIcon + userDate;
            time.innerHTML = clockIcon + userTime;
            created.appendChild(date);
            created.appendChild(time);

            date.classList.add("date");
            time.classList.add("time");
            created.classList.add("created");

            // title
            text.innerHTML = userTitle + arrowIcon;
            bookTitle.appendChild(text);

            text.classList.add("text");
            bookTitle.classList.add("book-title");
            bookTitle.addEventListener("click", openJournal);

            // journal
            journal.innerText = userJournal;
            edit.innerText = "Edit";
            remove.innerText = "Delete";

            bookJournal.classList.add("book-journal", "hidden");

            edit.classList.add("edit");
            remove.classList.add("remove");
            bookMenu.classList.add("buttons");

            edit.addEventListener("click", editJournal);
            remove.addEventListener("click", deleteJournal);

            bookMenu.appendChild(edit);
            bookMenu.appendChild(remove);

            bookJournal.appendChild(journal);
            bookJournal.appendChild(bookMenu);

            // create a new element
            element.classList.add("element");
            element.id = userId;
            element.appendChild(created);
            element.appendChild(bookTitle);
            element.appendChild(bookJournal);
            container.appendChild(element);
        });
    }
}

function main() {
    loadJournal();
}

main();
