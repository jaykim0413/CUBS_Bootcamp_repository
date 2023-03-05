let isSwitched = false;
let light_switch = document.getElementById('light_switch');

function toggleLightSwitch() {
  if (light_switch.style.color == 'white') {
    light_switch.style.color = 'black';
    light_switch.style.backgroundColor = 'white';
  } else {
    light_switch.style.color = 'white';
    light_switch.style.backgroundColor = 'black';
  }
}

light_switch.addEventListener('click', toggleLightSwitch);