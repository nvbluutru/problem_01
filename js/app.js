let toDoList = [
    {
        id: 1,
        name: "Todo 1",
        complete: false
    },
    {
        id: 2,
        name: "Todo 2",
        complete: true
    }
];

const getEle = (selector) => {
    return document.querySelector(selector);
}

const renderToDoList = (data) => {
    let result = data.reduce((content, item) => {
        content += `
        <div class="list__item${item.complete ? " green" : ""}" data-id="${item.id}" onclick="completeClicked(event)">
            <span>${item.name}</span>
            <i class="fa fa-times" onclick="removeTodo(event)"></i>
        </div>`;
        return content;
    }, "")
    let showTodo = getEle(".list__data");
    showTodo.innerHTML = result;
}

const checkEmpty = (value, valueMessage) => {
    if (value.trim() === "") {
        alertMessage(valueMessage, false);
        return false;
    }
    return true;
}

const addTodo = (event) => {
    event.preventDefault();
    let eleInput = getEle(".list__input");
    const valueInput = eleInput.value;
    if (!checkEmpty(valueInput, "Please do not leave it blank")) {
        return;
    }
    let id = toDoList.length > 0 ? toDoList[toDoList.length - 1].id + 1 : 1;
    let objectNew = {
        id: id,
        name: valueInput,
        complete: false
    }
    toDoList.push(objectNew);
    renderToDoList(toDoList);
    eleInput.value = "";
    alertMessage("added new mission successfully", true);
}

const removeTodo = (event) => {
    let getID = event.target.parentElement.dataset.id;
    let findIndex = toDoList.findIndex((item) => item.id == getID);
    toDoList.splice(findIndex, 1);
    alertMessage("Deleted mission successfully", true);
}
let timeOut;
const alertMessage = (valueMess, status) => {
    if (timeOut) {
        clearTimeout(timeOut);
    }
    let eleMessage = getEle(".list__mesage");
    status ? eleMessage.classList = "list__mesage green" : eleMessage.classList = "list__mesage error";
    eleMessage.innerHTML = valueMess;
    timeOut = setTimeout(() => {
        eleMessage.innerHTML = "";
        eleMessage.classList = "list__mesage";
    }, 2000);
}

const completeClicked = (event) => {
    const getID = event.target.dataset.id;
    let findItem = toDoList.find((item) => item.id == getID);
    if (findItem) {
        findItem.complete = !findItem.complete;
    }
    renderToDoList(toDoList);
    const note = findItem.complete ? "complete" : "complete removal";
    alertMessage(`${findItem.name} ${note} successfully`, true);
}

renderToDoList(toDoList);

const submit = document.querySelector(".list__submit");
submit.addEventListener("click", addTodo);
