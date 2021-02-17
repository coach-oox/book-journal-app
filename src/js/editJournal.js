function saveAll() {
    const elements = document.querySelectorAll(".element");

    let datas = [];

    elements.forEach((element) => {
        const date = element.childNodes[0].childNodes[0].innerText;
        const time = element.childNodes[0].childNodes[1].innerText;
        const title = element.childNodes[1].childNodes[0].innerText;
        const journal = element.childNodes[2].childNodes[0].innerText;

        const obj = {
            date,
            time,
            title,
            journal,
        };

        datas.push(obj);
    });

    localStorage.setItem(USER_DATA, JSON.stringify(datas));
}

function rewriteJournal(event) {
    const originId = event.target.parentNode.parentNode.parentNode.id;
    const newTitle = event.target.parentNode.parentNode.childNodes[0].value;
    const newJournal = event.target.parentNode.parentNode.childNodes[1].value;

    const datas = JSON.parse(localStorage.getItem(USER_DATA));
    datas.forEach((data) => {
        if (data.id === originId) {
            data.title = newTitle;
            data.journal = newJournal;
        }
    });

    localStorage.setItem(USER_DATA, JSON.stringify(datas));
}

function editJournal(event) {
    const originId = event.target.parentNode.parentNode.parentNode.id;
    const element = event.target.parentNode.parentNode.parentNode;
    const titleBlock = element.childNodes[1];
    const journalBlock = element.childNodes[2];

    let originData;
    const datas = JSON.parse(localStorage.getItem(USER_DATA));
    datas.forEach((data) => {
        if (data.id === originId) originData = data;
    });

    const form = document.createElement("form");
    const input = document.createElement("input");
    const textarea = document.createElement("textarea");
    const buttons = document.createElement("div");
    const save = document.createElement("button");
    const cancel = document.createElement("button");

    input.value = originData.title;
    textarea.value = originData.journal;
    save.innerText = "Save";
    cancel.innerText = "Cancel";

    buttons.appendChild(save);
    buttons.appendChild(cancel);

    save.classList.add("save");
    save.addEventListener("click", rewriteJournal);
    cancel.classList.add("cancel");
    buttons.classList.add("buttons");

    form.appendChild(input);
    form.appendChild(textarea);
    form.appendChild(buttons);

    element.appendChild(form);

    titleBlock.classList.add("hidden");
    journalBlock.classList.add("hidden");
}

function deleteJournal(event) {
    const target = event.target.parentNode.parentNode.parentNode.id;
    const datas = JSON.parse(localStorage.getItem(USER_DATA));
    const newDatas = datas.filter((data) => {
        return data.id !== target;
    });

    localStorage.setItem(USER_DATA, JSON.stringify(newDatas));
    location.reload();
}
