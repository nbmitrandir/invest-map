let selectedItem = null;

import { flyToProject, openProject } from "./map.js";

export function showProject(project) {

    document.querySelectorAll(".projectItem").forEach(item=>{

    item.classList.remove("active");

    if(item.textContent === project.company){

        item.classList.add("active");

        selectedItem = item;

    }

});

    document.getElementById("projectInfo").innerHTML = `

        <h2>${project.name}</h2>

        <hr>

        <table class="projectTable">

            <tr>
                <td><b>Компания</b></td>
                <td>${project.company}</td>
            </tr>

            <tr>
                <td><b>Район</b></td>
                <td>${project.district}</td>
            </tr>

            <tr>
                <td><b>Отрасль</b></td>
                <td>${project.sector}</td>
            </tr>

            <tr>
                <td><b>Финансирование</b></td>
                <td>${project.financing}</td>
            </tr>

            <tr>
                <td><b>Сумма</b></td>
                <td>${project.investment} млн ₸</td>
            </tr>

            <tr>
                <td><b>Рабочие места</b></td>
                <td>${project.jobs}</td>
            </tr>

            <tr>
                <td><b>Ввод (РКС)</b></td>
                <td>${project.commissioningRKS}</td>
            </tr>

            <tr>
                <td><b>Ввод (факт)</b></td>
                <td>${project.commissioningFact}</td>
            </tr>

            <tr>
                <td><b>Площадь</b></td>
                <td>${project.area} га</td>
            </tr>

            <tr>
                <td><b>Мощность</b></td>
                <td>${project.capacity}</td>
            </tr>

            <tr>
                <td><b>Стадия</b></td>
                <td>${project.stage}</td>
            </tr>

        </table>

        <hr>

        <h3>Текущий статус</h3>

        <p>${project.status}</p>

    `;

}

export function showProjectList(projects){

    const list = document.getElementById("projectList");

    list.innerHTML = "<h3>Проекты</h3>";

    if(projects.length === 0){

        list.innerHTML += "<p>Нет проектов</p>";

        return;

    }

    projects.forEach(project=>{

        const item = document.createElement("div");

        item.className = "projectItem";

        item.textContent = project.company;

        item.onclick = ()=>{

    if(selectedItem){

        selectedItem.classList.remove("active");

    }

    item.classList.add("active");

    selectedItem = item;

    flyToProject(project);

    openProject(project);

};

        list.appendChild(item);

    });

}