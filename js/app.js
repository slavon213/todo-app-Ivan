const theme = document.getElementById("theme");
console.log(theme);

const newItemInput = document.getElementById("addItem");
const todoList = document.querySelector(".todos ul");
const itemsLeft = document.querySelector(".items-left span");
const addClick = document.querySelector(".new-todo span");
console.log(itemsLeft.textContent);

// itemsLeft.innerText = document.querySelectorAll(
//     '.list-item input[type="checkbox"]'
// ).length;

theme.addEventListener("click", () => {
    document.querySelector("body").classList = [
        theme.checked ? "light-theme" : "dark-theme",
    ];
});

newItemInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && newItemInput.value.length > 0) {
        createNewTodoItem(newItemInput.value);
        newItemInput.value = "";
    }
});

addClick.addEventListener("click", () => {
    if (newItemInput.value.length > 0) {
        createNewTodoItem(newItemInput.value);
        newItemInput.value = "";
    }
});

function createNewTodoItem(value) {
    const element = document.createElement("li");
    element.setAttribute("draggable", "true")
    element.classList.add("flex-row");
    element.innerHTML = `
        <label class="list-item">
            <input type="checkbox" name="todoItem"/>
            <span class="checkmark"></span>
            <span class="text">${value}</span>
        </label>
        <span class="remove"></span>
    `;
    console.log(element);
    if (
        document.querySelector('.filter input[type="radio"]:checked').id ===
        "completed"
    ) {
        element.classList.add("hidden");
    }

    todoList.append(element);

    addRemoveFunction();
    updateItemsLeft(1);
}

function updateItemsLeft(value) {
    itemsLeft.textContent = Number(itemsLeft.textContent) + value;
}

function removeTodo(elem) {
    elem.remove();
    updateItemsLeft(-1);
}

function addRemoveFunction() {
    const removeButtonsList = document.querySelectorAll("ul li span.remove");
    removeButtonsList.forEach((buttonElement) => {
        buttonElement.addEventListener("click", () => {
            let liElement = buttonElement.closest("li");
            removeTodo(liElement);
        });
    });
}


addRemoveFunction();
