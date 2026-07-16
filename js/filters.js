export function buildSectorFilter(projects, callback) {

    const container = document.getElementById("sectorFilters");
    container.innerHTML = "";

    createButton(container, "Все", () => callback(""));

    const sectors = [...new Set(projects.map(p => p.sector))];

    sectors.forEach(sector => {

        createButton(container, sector, () => callback(sector));

    });

}

export function buildFinancingFilter(projects, callback) {

    const container = document.getElementById("financingFilters");
    container.innerHTML = "";

    createButton(container, "Все", () => callback(""));

    const financing = [...new Set(projects.map(p => p.financing))]
        .filter(Boolean)
        .sort();

    financing.forEach(item => {

        createButton(container, item, () => callback(item));

    });

}

export function buildDistrictFilter(projects, callback) {

    const container = document.getElementById("districtFilters");

    container.innerHTML = "";

    createButton(container, "Все", () => callback(""));

    const districts = [...new Set(projects.map(p => p.district))]
        .filter(Boolean)
        .sort();

    districts.forEach(district => {

        createButton(container, district, () => callback(district));

    });

}

export function buildStageFilter(projects, callback){

    const container = document.getElementById("stageFilters");

    container.innerHTML = "";

    createButton(container, "Все", () => callback(""));

    const stages = [...new Set(projects.map(p => p.stage))]
        .filter(Boolean)
        .sort();

    stages.forEach(stage=>{

        createButton(container, stage, () => callback(stage));

    });

}

function createButton(container, text, click){

    const btn = document.createElement("button");

    btn.textContent = text;

    btn.className = "filterButton";

    btn.dataset.group = container.id;

    btn.onclick = () => {

    document
        .querySelectorAll(`#${container.id} .filterButton`)
        .forEach(button => button.classList.remove("active"));

    btn.classList.add("active");

    click();

};

    container.appendChild(btn);

}