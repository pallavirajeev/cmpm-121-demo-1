import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Pizza Delivery";

const pizzaButton = document.createElement("button");
pizzaButton.type = "button";
pizzaButton.style.fontSize = "100px";
pizzaButton.style.padding = "10px 20px";
pizzaButton.style.marginTop = "20px";
pizzaButton.textContent = "🍕";
pizzaButton.addEventListener("click", setCtr);

let ctr = 0;
let growthRate = 1;
const pizzaCtr: HTMLDivElement = document.createElement("div");
pizzaCtr.textContent = pizzaStr();
pizzaCtr.style.fontSize = "20px";

const scooterButton = document.createElement("button");
scooterButton.type = "button";
pizzaButton.style.marginTop = "20px";
scooterButton.textContent = "A Scooter: 🛴, Deliver at least 10 pizzas first";
scooterButton.addEventListener("click", scootCtr);
scooterButton.disabled = true;

//step 5: only thing to complete is increasing speed

function scootCtr() {
  if (ctr >= 10) {
    if (!startClick) {
      startClick = true;
      requestAnimationFrame(step);
    }
    ctr -= 10;
    growthRate++;
    pizzaCtr.textContent = pizzaStr();
    if (ctr < 10) {
      scooterButton.disabled = true;
    }
  }
}

let startClick = false;
function setCtr() {
  ctr++;
  pizzaCtr.textContent = pizzaStr();
  if (ctr >= 10) {
    scooterButton.disabled = false;
  }
}

function pizzaStr() {
  return `Pizza's Delivered: ${ctr.toFixed(2)}`;
}

let previousTimeStamp = 0;
function step(timeStamp: number) {
  if (!previousTimeStamp) {
    previousTimeStamp = timeStamp;
  }

  const elapsed = (timeStamp - previousTimeStamp) / 1000;

  ctr += elapsed * growthRate;

  pizzaCtr.textContent = pizzaStr();

  previousTimeStamp = timeStamp;

  requestAnimationFrame(step);
  if (ctr >= 10) {
    scooterButton.disabled = false;
  } else {
    scooterButton.disabled = true;
  }
}

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

app.append(header);
app.append(pizzaButton);
app.append(pizzaCtr);
app.append(scooterButton);
