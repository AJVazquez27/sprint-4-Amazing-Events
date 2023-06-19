import { cargarDatos, showCheckbox, filtradoCheckAndSearch } from "../modulo/functions.js"

let card = document.getElementById ("cards")

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(res => res.json())
    .then(data => { console.log(data)
        const categories = data.events.map(data => data.category) //map extrae la prop category de data y crea un nuevo array con esa info
        const categoriesNoRepeat = new Set (categories) // el tipo de lista Set es una colección de valores únicos por lo que lo creo para no tener duplicados
        const catList = Array.from(categoriesNoRepeat) // crea el array y guarda lo de new set ahi 
        const checkContainer = document.getElementById("category-check") //invoco el id de html
        cargarDatos(data.events, card)
        showCheckbox(catList, checkContainer)
        filtradoCheckAndSearch(data, card)})
    .catch(err => console.log(err))

