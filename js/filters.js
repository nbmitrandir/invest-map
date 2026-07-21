export function buildSectorFilter(projects, currentValue, callback) {

    const container = document.getElementById("sectorFilters");
    container.innerHTML = "";

    createButton(container, "Все", "", currentValue, () => callback(""));

    const sectors = [...new Set(projects.map(p => p.sector))]
        .filter(Boolean)
        .sort();

    sectors.forEach(sector => {

        createButton(container, sector, sector, currentValue, () => callback(sector));

    });

}

export function buildFinancingFilter(projects, currentValue, callback) {

    const container = document.getElementById("financingFilters");
    container.innerHTML = "";

    createButton(container, "Все", "", currentValue, () => callback(""));

    const financing = [...new Set(projects.map(p => p.financing))]
        .filter(Boolean)
        .sort();

    financing.forEach(item => {

        createButton(container, item, item, currentValue, () => callback(item));

    });

}

export function buildDistrictFilter(projects, currentValue, callback) {

    const container = document.getElementById("districtFilters");
    container.innerHTML = "";

    createButton(container, "Все", "", currentValue, () => callback(""));

    const districts = [...new Set(projects.map(p => p.district))]
        .filter(Boolean)
        .sort();

    districts.forEach(district => {

        createButton(container, district, district, currentValue, () => callback(district));

    });

}

export function buildStageFilter(projects, currentValue, callback){

    const container = document.getElementById("stageFilters");
    container.innerHTML = "";

    createButton(container, "Все", "", currentValue, () => callback(""));

    const stages = [...new Set(projects.map(p => p.stage))]
        .filter(Boolean)
        .sort();

    stages.forEach(stage => {

        createButton(container, stage, stage, currentValue, () => callback(stage));

    });

}

function createButton(container, text, value, currentValue, click){

    const btn = document.createElement("button");

    btn.textContent = text;

    btn.className = "filterButton";

    if(value === currentValue){
        btn.classList.add("active");
    }

    btn.onclick = click;

    container.appendChild(btn);

}