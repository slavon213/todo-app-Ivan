const theme = document.getElementById("theme");

const newItemInput = document.getElementById("addItem");
const todoList = document.querySelector(".todos ul");
const itemsLeft = document.querySelector(".items-left span");
const addClick = document.querySelector(".new-todo span");

const clearButton = document.querySelector(".clear");

const filterButtons = document.querySelectorAll('.filter input[type="radio"]');

// itemsLeft.innerText = document.querySelectorAll(
//     '.list-item input[type="checkbox"]'
// ).length;

theme.addEventListener("click", () => {
    document.querySelector("body").classList = [theme.checked ? "light-theme" : "dark-theme"];
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
    element.setAttribute("draggable", "true");
    element.classList.add("flex-row");
    element.innerHTML = `
        <label class="list-item">
            <input type="checkbox" name="todoItem"/>
            <span class="checkmark"></span>
            <span class="text">${value}</span>
        </label>
        <span class="remove"></span>
    `;
    // if (document.querySelector('.filter input[type="radio"]:checked').id === "completed") {
    //     element.classList.add("hidden");
    // }

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

clearButton.addEventListener("click", () => {
    let completed = document.querySelectorAll('.list-item input[type="checkbox"]:checked');

    completed.forEach((element) => {
        removeTodo(element.closest("li"));
    });
});

filterButtons.forEach((button) => {
    button.addEventListener("change", (event) => {
        filterItems(event.target.id);
    });
});

function filterItems(idItem) {
    const allItems = document.querySelectorAll("li");

    switch (idItem) {
        case "all":
            allItems.forEach((item) => {
                item.classList.remove("hidden");
            });
            break;
        case "active":
            allItems.forEach((item) => {
                item.querySelector("input").checked ? item.classList.add("hidden") : item.classList.remove("hidden");
            });

            break;
        case "completed":
            allItems.forEach((item) => {
                item.querySelector("input").checked ? item.classList.remove("hidden") : item.classList.add("hidden");
            });

        default:
            break;
    }
}
addRemoveFunction();
