const display = document.getElementById("display");
const buttons = document.querySelectorAll(".calculator button");

// check operator
function isOperator(char) {
  return ["+", "-", "×", "÷"].includes(char);
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.innerText;
    const lastChar = display.value.slice(-1);

    // agar display me Error ho to pehle clear
    if (display.value === "Error" && value !== "C") {
      display.value = "";
    }

    // clear
    if (value === "C") {
      display.value = "";
      return;
    }

    // plus minus
    if (value === "±") {
      if (display.value) {
        display.value = display.value * -1;
      }
      return;
    }

    // percentage
    if (value === "%") {
      if (display.value) {
        display.value = display.value / 100;
      }
      return;
    }

    // equal
    if (value === "=") {
      try {
        display.value = eval(
          display.value.replace(/×/g, "*").replace(/÷/g, "/")
        );
      } catch {
        display.value = "Error";
      }
      return;
    }

    // operator replace logic
    if (isOperator(value)) {
      if (isOperator(lastChar)) {
        display.value = display.value.slice(0, -1) + value;
        return;
      }
    }

    // add value
    display.value += value;
  });
});

// dark / light mode
const toggleBtn = document.getElementById("modeToggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  toggleBtn.innerText =
    document.body.classList.contains("light") ? "☀️" : "🌙";
});