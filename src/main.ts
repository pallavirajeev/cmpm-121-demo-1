import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Pizza Maker";

const pizzaButton = document.createElement("button");
pizzaButton.type = "button";
pizzaButton.style.fontSize = "100px";
pizzaButton.style.padding = "10px 20px";
pizzaButton.style.marginTop = "20px";
pizzaButton.textContent = "🍕";
pizzaButton.addEventListener("click", setCtr);

let ctr = 0;
const pizzaCtr: HTMLDivElement = document.createElement("div");
pizzaCtr.textContent = pizzaStr();
pizzaCtr.style.fontSize = "20px";

function setCtr() {
  ctr++;
  pizzaCtr.textContent = pizzaStr();
}
function pizzaStr() {
  return `Pizza Count: ${ctr}`;
}

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

app.append(header);
app.append(pizzaButton);
app.append(pizzaCtr);
