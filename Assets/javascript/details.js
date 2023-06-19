 import { llenarCard } from "../modulo/functions.js";


fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(res => res.json())
        .then(data => {
        const $contenedor = document.getElementById("card-det");
        const events = data.events;
        console.log(events)
        const params = new URLSearchParams(location.search);
        const id = params.get("id");
        const idEncontrado = events.find(elemento => elemento._id == id);
        console.log("id", id)
        llenarCard($contenedor, idEncontrado);
        })
        .catch(err => console.log(err));
