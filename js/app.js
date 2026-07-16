import { initMap, drawProjects } from "./map.js";
import { loadProjects } from "./data.js";
import { showProject } from "./ui.js";
import {
    buildSectorFilter,
    buildFinancingFilter, 
    buildDistrictFilter,
    buildStageFilter
} from "./filters.js";

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

    buildSectorFilter(allProjects, filterSector);

    buildFinancingFilter(allProjects, filterFinancing);

    buildDistrictFilter(allProjects, filterDistrict);

    buildStageFilter(allProjects, filterStage);

}

start();

function updateCounter(){

    document.getElementById("projectCount").textContent =
        filteredProjects.length;

}

function updateStats(){

    document.getElementById("statProjects").textContent =
        filteredProjects.length;

    const investment = filteredProjects.reduce(
        (sum,p)=>sum + Number(p.investment || 0),
        0
    );

    const jobs = filteredProjects.reduce(
        (sum,p)=>sum + Number(p.jobs || 0),
        0
    );

    const problems = filteredProjects.filter(
        p=>p.stage.toLowerCase().includes("проблем")
    ).length;

    document.getElementById("statInvestment").textContent =
        investment.toLocaleString("ru-RU")+" млн ₸";

    document.getElementById("statJobs").textContent =
        jobs.toLocaleString("ru-RU");

    document.getElementById("statProblem").textContent =
        problems;

}

function redraw(){

    drawProjects(filteredProjects);

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

    filters.sector = sector;

    applyFilters();

}

function filterFinancing(financing){

    filters.financing = financing;

    applyFilters();

}

function filterDistrict(district){

    filters.district = district;

    applyFilters();

}

function filterStage(stage){

    filters.stage = stage;

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

    const source =

        filters.sector

            ? allProjects.filter(p=>p.sector===filters.sector)

            : allProjects;

    buildFinancingFilter(source, filterFinancing);

    redraw();

}