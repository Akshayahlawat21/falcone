const selectionsDiv = document.getElementById("selections");
const resultDiv = document.getElementById("result");
let selectedPlanets = [];
let selectedVehicles = [];
let queenPlanet = planets[Math.floor(Math.random() * planets.length)]; 

function renderSelections() {
  for (let i = 0; i < 4; i++) {
    const section = document.createElement("div");
    section.className = "planet-section";

    const select = document.createElement("select");
    select.innerHTML = `<option value="">Select Planet</option>` +
      planets.map(p => `<option value="${p.name}">${p.name} (${p.distance})</option>`).join("");
    
    select.addEventListener("change", (e) => {
      selectedPlanets[i] = planets.find(p => p.name === e.target.value);
      renderVehicles(section, i);
    });

    section.appendChild(select);
    selectionsDiv.appendChild(section);
  }
}

function renderVehicles(section, index) {

  const oldVehicleDiv = section.querySelector(".vehicle-options");
  if (oldVehicleDiv) oldVehicleDiv.remove();

  const vehicleDiv = document.createElement("div");
  vehicleDiv.className = "vehicle-options";

  vehicles.forEach(v => {
    if (selectedPlanets[index] && v.max_distance >= selectedPlanets[index].distance && v.total_no > 0) {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "vehicle-" + index;
      radio.value = v.name;
      radio.addEventListener("change", () => {
        selectedVehicles[index] = v;
      });
      label.appendChild(radio);
      label.append(` ${v.name} (Count: ${v.total_no})`);
      vehicleDiv.appendChild(label);
      vehicleDiv.appendChild(document.createElement("br"));
    }
  });

  section.appendChild(vehicleDiv);
}

document.getElementById("findBtn").addEventListener("click", () => {
  let totalTime = 0;
  let found = false;

  for (let i = 0; i < 4; i++) {
    if (selectedPlanets[i] && selectedVehicles[i]) {
      totalTime += selectedPlanets[i].distance / selectedVehicles[i].speed;
      if (selectedPlanets[i].name === queenPlanet.name) {
        found = true;
      }
    }
  }

  if (found) {
    resultDiv.innerHTML = `🎉 You found Falcone on ${queenPlanet.name} in ${totalTime} hours!`;
  } else {
    resultDiv.innerHTML = `❌ Falcone not found. She was on ${queenPlanet.name}. Time taken: ${totalTime} hours.`;
  }
});

renderSelections();



