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
let growthRate = 0;

const pizzaCtr: HTMLDivElement = document.createElement("div");
pizzaCtr.textContent = pizzaStr();
pizzaCtr.style.fontSize = "20px";

const rateText = document.createElement("div");
rateText.textContent = rateStr();
rateText.style.fontSize = "20px";
rateText.style.marginTop = "20px";

function rateStr() {
  return `Current Growth Rate: ${growthRate.toFixed(2)} pizzas/sec`;
}

let ctrS = 0;
let ctrM = 0;
let ctrMo = 0;

const scooterButton = document.createElement("button");
scooterButton.type = "button";
scooterButton.style.marginTop = "20px";
scooterButton.textContent = `A Scooter: 🛴, Deliver at least 10 pizzas first! # bought: ${ctrS.toFixed(
  0,
)}`;
scooterButton.addEventListener("click", scootCtr);
scooterButton.disabled = true;

const mopedButton = document.createElement("button");
mopedButton.type = "button";
mopedButton.style.marginTop = "20px";
mopedButton.style.marginLeft = "20px";
mopedButton.textContent = `A Moped: 🛵, Deliver at least 100 pizzas first! # bought: ${ctrM.toFixed(
  0,
)}`;
mopedButton.addEventListener("click", mopedCtr);
mopedButton.disabled = true;

const moterButton = document.createElement("button");
moterButton.type = "button";
moterButton.style.marginTop = "20px";
moterButton.style.marginLeft = "20px";
moterButton.textContent = `A Motorcycle: 🏍️, Deliver at least 1000 pizzas first! # bought: ${ctrMo.toFixed(
  0,
)}`;
moterButton.addEventListener("click", moterCtr);

moterButton.disabled = true;

function scootCtr() {
  ctrS++;
  if (ctr >= 10) {
    if (!startClick) {
      startClick = true;
      requestAnimationFrame(step);
    }
    ctr -= 10;
    growthRate += 0.1;
    pizzaCtr.textContent = pizzaStr();
    rateText.textContent = rateStr();
    scooterButton.textContent = `A Scooter: 🛴, Deliver at least 10 pizzas first! # bought: ${ctrS.toFixed(
      0,
    )}`;
    if (ctr < 10) {
      scooterButton.disabled = true;
    }
  }
}

function mopedCtr() {
  ctrM++;
  if (ctr >= 100) {
    if (!startClick) {
      startClick = true;
      requestAnimationFrame(step);
    }
    ctr -= 100;
    growthRate += 2;
    pizzaCtr.textContent = pizzaStr();
    rateText.textContent = rateStr();
    mopedButton.textContent = `A Moped: 🛵, Deliver at least 100 pizzas first! # bought: ${ctrM.toFixed(
      0,
    )}`;
    if (ctr < 100) {
      mopedButton.disabled = true;
    }
  }
}

function moterCtr() {
  ctrMo++;
  if (ctr >= 1000) {
    if (!startClick) {
      startClick = true;
      requestAnimationFrame(step);
    }
    ctr -= 1000;
    growthRate += 50;
    pizzaCtr.textContent = pizzaStr();
    rateText.textContent = rateStr();
    moterButton.textContent = `A Motorcycle: 🏍️, Deliver at least 1000 pizzas first! # bought: ${ctrMo.toFixed(
      0,
    )}`;
    if (ctr < 1000) {
      mopedButton.disabled = true;
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

  if (ctr >= 100) {
    mopedButton.disabled = false;
  } else {
    mopedButton.disabled = true;
  }

  if (ctr >= 1000) {
    moterButton.disabled = false;
  } else {
    moterButton.disabled = true;
  }
}

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

app.append(header);
app.append(pizzaButton);
app.append(pizzaCtr);
app.append(rateText);
app.append(scooterButton);
app.append(mopedButton);
app.append(moterButton);
