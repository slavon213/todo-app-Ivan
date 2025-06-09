const theme = document.getElementById("theme");
console.log(theme);

const newItemInput = document.getElementById("addItem");
const todoList = document.querySelector(".todos ul");
const itemsLeft = document.querySelector(".items-left span");

console.log(itemsLeft.textContent);

itemsLeft.innerText = document.querySelectorAll('.list-item input[type="checkbox"]').length;


theme.addEventListener("click", () => {
    document.querySelector("body").classList = [theme.checked ? "light-theme": "dark-theme"]
})
