import { showProject } from "./ui.js";

let map;
let markers = [];

export function initMap() {

    map = L.map("map").setView([43.3, 77.2], 8);

    L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom:19,
            attribution:"© OpenStreetMap"
        }
    ).addTo(map);

}

export function getMap() {
    return map;
}

export function drawProjects(projects) {

    // Удаляем старые метки
    markers.forEach(marker => map.removeLayer(marker));

    markers = [];

    projects.forEach(project => {

        if (!project.lat || !project.lng) return;

        const marker = L.marker([project.lat, project.lng])
            .addTo(map)
            .on("click", () => {

                showProject(project);

            });

        markers.push(marker);

    });

}