import { initMap, drawProjects } from "./map.js";
import { loadProjects } from "./data.js";
import { showProject } from "./ui.js";
import {
    buildSectorFilter,
    buildFinancingFilter, 
    buildDistrictFilter,
    buildStageFilter
} from "./filters.js";
import { showProjectList } from "./ui.js";

let allProjects = [];
let filteredProjects = [];

const filters = {
    search: "",
    sector: "",
    financing: "",
    district: "",
    stage: "",
    minInvestment: null,
    maxInvestment: null
};

async function start() {

    initMap();

    allProjects = await loadProjects();

    filteredProjects = [...allProjects];

    drawProjects(filteredProjects);

    updateCounter();

    initSearch();

    buildSectorFilter(
    allProjects,
    filters.sector,
    filterSector
);

    buildFinancingFilter(
    allProjects,
    filters.financing,
    filterFinancing
);

    buildDistrictFilter(
    allProjects,
    filters.district,
    filterDistrict
);

    buildStageFilter(
    allProjects,
    filters.stage,
    filterStage
);

}

start();

function updateCounter(){

    document.getElementById("projectCount").textContent =
        filteredProjects.length;

}

function updateStats(){

    document.getElementById("statProjects").textContent =
        filteredProjects.length;

    const investment = filteredProjects.reduce((sum, p) => {

    const value = String(p.investment ?? "0")
        .replace(",", ".")
        .replace(/[^\d.]/g, "");

    return sum + (parseFloat(value) || 0);

}, 0);

    const jobs = filteredProjects.reduce(
        (sum,p)=>sum + Number(p.jobs || 0),
        0
    );

const problems = filteredProjects.filter(p => {

    return (p.stage ?? "")
        .toLowerCase()
        .includes("проблем");

}).length;

    document.getElementById("statInvestment").textContent =
        investment.toLocaleString("ru-RU")+" млн ₸";

    document.getElementById("statJobs").textContent =
        jobs.toLocaleString("ru-RU");

    document.getElementById("statProblem").textContent =
        problems;

}

function redraw(){

    drawProjects(filteredProjects);

    showProjectList(filteredProjects);

    updateCounter();

    updateStats();

}

function initSearch(){

    const input = document.getElementById("search");

    input.addEventListener("input", () => {

        filters.search = input.value.toLowerCase();

        applyFilters();

    });

}

function filterSector(sector){

    filters.sector =
        filters.sector === sector ? "" : sector;

    // Сбрасываем зависимые фильтры
    filters.financing = "";
    filters.district = "";
    filters.stage = "";

    applyFilters();

}

function filterFinancing(financing){

    filters.financing =
        filters.financing === financing ? "" : financing;

    filters.district = "";
    filters.stage = "";

    applyFilters();

}

function filterDistrict(district){

    filters.district =
        filters.district === district ? "" : district;

    filters.stage = "";

    applyFilters();

}

function filterStage(stage){

    filters.stage =
        filters.stage === stage ? "" : stage;

    applyFilters();

}

function applyFilters(){

    filteredProjects = allProjects.filter(project=>{

        // Поиск
        if(filters.search){

            const text = filters.search;

            const found =
                project.name.toLowerCase().includes(text) ||
                project.company.toLowerCase().includes(text);

            if(!found) return false;

        }

        // Отрасль
        if(filters.sector){

            if(project.sector!==filters.sector)
                return false;

        }

        // Финансирование
        if(filters.financing){

            if(project.financing!==filters.financing)
                return false;

        }

        // Район
        if(filters.district){

            if(project.district !== filters.district)
                return false;

        }

        // Стадия
        if(filters.stage){

            if(project.stage !== filters.stage)
                return false;

}

        // Сумма (пока не используется)

        return true;

    });

const financingSource = allProjects.filter(p => {

    if (filters.sector && p.sector !== filters.sector)
        return false;

    return true;

});

const districtSource = allProjects.filter(p => {

    if(filters.sector && p.sector !== filters.sector)
        return false;

    if(filters.financing && p.financing !== filters.financing)
        return false;

    return true;

});

const stageSource = allProjects.filter(p => {

    if(filters.sector && p.sector !== filters.sector)
        return false;

    if(filters.financing && p.financing !== filters.financing)
        return false;

    if(filters.district && p.district !== filters.district)
        return false;

    return true;

});

buildSectorFilter(
    allProjects,
    filters.sector,
    filterSector
);

buildFinancingFilter(
    financingSource,
    filters.financing,
    filterFinancing
);

buildDistrictFilter(
    districtSource,
    filters.district,
    filterDistrict
);

buildStageFilter(
    stageSource,
    filters.stage,
    filterStage
);

redraw();

}