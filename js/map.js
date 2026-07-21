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

export function flyToProject(project){

    if(!project.lat || !project.lng) return;

    map.flyTo(
        [project.lat, project.lng],
        12,
        {
            duration: 1.2
        }
    );

}

export function openProject(project){

    const marker = markers.find(m =>

        m.project.name === project.name

    );

    if(marker){

        marker.fire("click");

    }

}

export function drawProjects(projects) {

    // Удаляем старые метки
    markers.forEach(marker => map.removeLayer(marker));

    markers = [];

    projects.forEach(project => {

        if (!project.lat || !project.lng) return;

        const marker = L.marker([project.lat, project.lng])
    .addTo(map);

    marker.project = project;

    marker.on("click", () => {

        showProject(project);

    });

    markers.push(marker);

        if(markers.length === 1){

    map.setView(markers[0].getLatLng(), 11);

}

else if(markers.length > 1){

    const group = L.featureGroup(markers);

    map.fitBounds(group.getBounds(),{
        padding:[40,40]
    });

}

    // Автоматически показываем все найденные проекты
if (markers.length === 1) {

    map.setView(markers[0].getLatLng(), 11);

}

else if (markers.length > 1) {

    const group = L.featureGroup(markers);

    map.fitBounds(group.getBounds(), {
        padding: [40, 40]
    });

}

    });

}