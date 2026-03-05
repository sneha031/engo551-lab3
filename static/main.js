const map = L.map("map").setView([51.0447, -114.0719], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

const statusEl = document.getElementById("status");
function setStatus(msg) {
  statusEl.textContent = msg || "";
}

document.getElementById("searchBtn").addEventListener("click", () => {
  const start = document.getElementById("startDate").value;
  const end = document.getElementById("endDate").value;

  if (!start || !end) return setStatus("Pick both a start date and an end date.");
  if (start > end) return setStatus("Start date must be before the end date.");

  setStatus(`Searching permits from ${start} to ${end}...`);
});