const theme = document.getElementById("theme");
const newItemInput = document.getElementById("addItem");
const todoList = document.querySelector(".todos ul");
const itemsLeft = document.querySelector(".items-left span");
const addClick = document.querySelector(".new-todo span");
const checkCompletedLst = document.querySelectorAll('ul li input[type="checkbox"]');

const clearButton = document.querySelector(".clear");

const filterButtons = document.querySelectorAll('.filter input[type="radio"]');

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
    value = value.charAt(0).toUpperCase() + value.slice(1);
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
    element.addEventListener("change", () => {
        updateItemsLeft();
    });

    addRemoveFunction(element.querySelector(".remove"));
    addDragFunction(element);
    todoList.append(element);
    updateItemsLeft();
}

function updateItemsLeft() {
    const activeItems = document.querySelectorAll('ul li input[type="checkbox"]:not(:checked)').length;
    itemsLeft.textContent = activeItems;
}

checkCompletedLst.forEach((check) => {
    check.addEventListener("change", () => {
        updateItemsLeft();
    });
});

function removeTodo(elem) {
    elem.remove();
    updateItemsLeft();
}

function addRemoveFunction(element) {
    element.addEventListener("click", () => {
        let liElement = element.closest("li");
        removeTodo(liElement);
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
            allItems.forEach((item) => {
                item.querySelector("input").checked ? item.classList.remove("hidden") : item.classList.add("hidden");
            });
            break;
    }
}

// Drag&Drop

let draggedElement = null;

function addDragFunction(element) {
    element.addEventListener("dragstart", () => {
        draggedElement = element;
    });

    element.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.target.closest("li").classList.add("dragged");
    });

    element.addEventListener("dragleave", (e) => {
        e.target.closest("li").classList.remove("dragged");
    });

    element.addEventListener("drop", (e) => {
        e.target.closest("li").classList.remove("dragged");
        const rect = e.target.getBoundingClientRect();
        const itemY = e.clientY;
        const halfLi = rect.top + rect.height / 2;

        if (itemY < halfLi) {
            e.target.closest("ul").insertBefore(draggedElement, element);
        } else {
            e.target.closest("ul").insertBefore(draggedElement, element.nextSibling);
        }
        e.target.classList.remove("dragged");
    });
}

const listLiItems = document.querySelectorAll("li");
listLiItems.forEach((itemLi) => {
    addDragFunction(itemLi);
});

function movingFilter(screen) {
    if (screen) {
        const filterBlock = document.querySelector(".control .filter");
        const lastFilterBlock = document.querySelector(".control.control-last");
        lastFilterBlock.appendChild(filterBlock);
        lastFilterBlock.style.display = "block";
    } else {
        const filterBlock = document.querySelector(".filter");
        const filterBlockMain = document.querySelector(".control");

        const lastFilterBlock = document.querySelector(".control.control-last");

        filterBlockMain.insertBefore(filterBlock, filterBlockMain.lastElementChild);
        lastFilterBlock.style.display = "none";
    }
}

const match = matchMedia("(max-width: 550px)");

match.addEventListener("change", ({ matches }) => {
    movingFilter(matches);
});

const removeButtonsList = document.querySelectorAll("ul li span.remove");
removeButtonsList.forEach((buttonElement) => {
    addRemoveFunction(buttonElement);
});

updateItemsLeft();
movingFilter(match.matches);
