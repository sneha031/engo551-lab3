const map = L.map("map").setView([51.0447, -114.0719], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

const statusEl = document.getElementById("status");
const markersLayer = L.layerGroup().addTo(map);

function setStatus(msg) {
  statusEl.textContent = msg || "";
}

function plotGeoJson(geojson) {
  markersLayer.clearLayers();

  const layer = L.geoJSON(geojson, {
    pointToLayer: (_, latlng) => L.circleMarker(latlng, { radius: 5 }),

    onEachFeature: (feature, marker) => {
      const p = feature.properties || {};

      const issueddate = p.issueddate ?? "N/A";
      const workclassgroup = p.workclassgroup ?? "N/A";
      const contractorname = p.contractorname ?? "N/A";
      const communityname = p.communityname ?? "N/A";
      const originaladdress = p.originaladdress ?? "N/A";

      const html = `
        <div>
          <b>Issued Date:</b> ${issueddate}<br>
          <b>Work Class Group:</b> ${workclassgroup}<br>
          <b>Contractor Name:</b> ${contractorname}<br>
          <b>Community Name:</b> ${communityname}<br>
          <b>Original Address:</b> ${originaladdress}
        </div>
      `;

      marker.bindPopup(html);
    }
  });

  layer.addTo(markersLayer);

  const bounds = layer.getBounds();
  if (bounds.isValid()) map.fitBounds(bounds, { padding: [30, 30] });
}

document.getElementById("searchBtn").addEventListener("click", async () => {
  const start = document.getElementById("startDate").value;
  const end = document.getElementById("endDate").value;

  if (!start || !end) return setStatus("Pick both dates.");
  if (start > end) return setStatus("Start must be before end.");

  setStatus("Searching...");

  const res = await fetch(`/api/permits?start=${start}&end=${end}`);
  const data = await res.json();

  if (!res.ok) return setStatus(data.error || "Search failed.");

  const count = data.features?.length || 0;
  setStatus(`Found ${count} permits.`);
  plotGeoJson(data);
});