import {cargarDatos2, showCheckbox, filtradoCheckAndSearch2 } from "../modulo/functions.js";

let card = document.getElementById("cards");

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let filtEvents = data.events.filter(evento => evento.date > data.currentDate);
        const categories = filtEvents.map(evento => evento.category);
        const categoriesNoRepeat = [...new Set(categories)];
        const catList = Array.from(categoriesNoRepeat);
        const checkContainer = document.getElementById("category-check");
        cargarDatos2(filtEvents, card);
        showCheckbox(catList, checkContainer);
        filtradoCheckAndSearch2(filtEvents, card);
    })
    .catch(err => console.log(err));
