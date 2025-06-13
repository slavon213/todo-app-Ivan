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
    addDragFunction(element);

    todoList.append(element);

    addRemoveFunction();
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
            break;
    }
}

// Drag&Drop

function addDragFunction() {
    let draggedElement = null;
    const listLiItems = document.querySelectorAll("li");
    listLiItems.forEach((itemLi) => {
        itemLi.addEventListener("dragstart", () => {
            draggedElement = itemLi;
        });

        itemLi.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.target.classList.add("dragged");
        });

        itemLi.addEventListener("dragleave", (e) => {
            e.target.classList.remove("dragged");
        });

        itemLi.addEventListener("drop", (e) => {
            const rect = e.target.getBoundingClientRect();
            const itemY = e.clientY;
            const halfLi = rect.top + rect.height / 2;

            if (itemY < halfLi) {
                e.target.parentNode.insertBefore(draggedElement, itemLi);
            } else {
                e.target.parentNode.insertBefore(draggedElement, itemLi.nextSibling);
            }
            e.target.classList.remove("dragged");
        });
    });
}

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

addDragFunction();
updateItemsLeft();
movingFilter(match.matches);
