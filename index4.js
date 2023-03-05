function moneyAndAge(money, age) {
  if (age >= 60 && money >=10000) {
    return true;
  }
  else {
    return false;
  }
}

const heading = document.getElementById("my_heading");

console.log(heading);

heading.style.color = "blue";

heading.innerText = "Hello Universe";

heading.style.textAlign = "center";

function handleClick() {
  console.log("I have been clicked");
  heading.innerText += "!";
}

heading.addEventListener("click", handleClick);