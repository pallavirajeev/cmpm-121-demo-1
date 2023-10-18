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
  return `Current Delivery Rate: ${growthRate.toFixed(2)} pizzas/sec`;
}

interface Item {
  name: string;
  cost: number;
  rate: number;
  emoji: string;
  desc: string;
}

const availableItems: Item[] = [
  {
    name: "Scooter",
    cost: 10,
    rate: 0.1,
    emoji: "🛴",
    desc: "A scooter is better than walking",
  },
  {
    name: "Moped",
    cost: 100,
    rate: 2,
    emoji: "🛵",
    desc: "Now your feet can get a rest from pushing",
  },
  {
    name: "Motorcycle",
    cost: 1000,
    rate: 50,
    emoji: "🏍️",
    desc: "Wow, you're making great time",
  },
  {
    name: "Car",
    cost: 10000,
    rate: 100,
    emoji: "🛻",
    desc: "Nice, you can carry so many more pizzas",
  },
  {
    name: "Airplane",
    cost: 100000,
    rate: 10000,
    emoji: "🛩️",
    desc: "Zoooooom, off you go",
  },
];

const itemCounts: { [name: string]: number } = {};

const itemButtons: { [name: string]: HTMLButtonElement } = {};

availableItems.forEach((item) => {
  itemCounts[item.name] = 0;
  const button = document.createElement("button");
  button.type = "button";
  button.style.marginTop = "20px";
  button.textContent = `${item.name}: ${item.emoji}, Deliver at least ${
    item.cost
  } pizzas first! # of ${item.name}s bought: ${itemCounts[item.name].toFixed(
    0,
  )}, ${item.desc}`;
  button.addEventListener("click", () => buyItem(item));
  button.disabled = true;
  itemButtons[item.name] = button;
});

function buyItem(item: Item) {
  const itemName = item.name;
  const itemCost = item.cost;
  if (ctr >= itemCost) {
    itemCounts[itemName]++;
    item.cost *= 1.15;
    if (!startClick) {
      startClick = true;
      requestAnimationFrame(step);
    }
    ctr -= itemCost;
    growthRate += item.rate;
    pizzaCtr.textContent = pizzaStr();
    rateText.textContent = rateStr();
    itemButtons[itemName].textContent = `${itemName}: ${
      item.emoji
    }, Deliver at least ${item.cost.toFixed(
      2,
    )} pizzas first! # of ${itemName}s bought: ${itemCounts[itemName].toFixed(
      0,
    )}, ${item.desc}`;
    if (ctr < itemCost) {
      itemButtons[itemName].disabled = true;
    }
  }
}

let startClick = false;
function setCtr() {
  ctr++;
  pizzaCtr.textContent = pizzaStr();
  if (ctr >= availableItems[0].cost) {
    itemButtons[availableItems[0].name].disabled = false;
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
  availableItems.forEach((item) => {
    if (ctr >= item.cost) {
      itemButtons[item.name].disabled = false;
    } else {
      itemButtons[item.name].disabled = true;
    }
  });
}

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

app.append(header);
app.append(pizzaButton);
app.append(pizzaCtr);
app.append(rateText);
availableItems.forEach((item) => {
  app.append(itemButtons[item.name]);
});
