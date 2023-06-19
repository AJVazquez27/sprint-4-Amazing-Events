//-------------------------------------------HOME JS-----------------------------------------------------

function cargarCards(event) {
    return ` 
    <div class="card borderPink backPink mt-3 mb-2" style="width: 18rem;">
        <img src="${event.image}" class="card-img-top" alt="${event.name}">
        <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}</p>
            <div class="d-flex justify-content-evenly centerI">
                <p class="price">Price: $${event.price}</p>
                <a href="./Assets/pages/details.html?id=${event._id}" class="btn btn-primary">More details</a>
            </div>
        </div>
    </div>`
}

export function cargarDatos (events, index){
    let template = ""
    for (let event of events) {
        template += cargarCards(event)
    }
    if (template === "") {
        template = "<h4 mt-3> No hemos encontrado resultado para su búsqueda. </h4>";
    }
    index.innerHTML = template
}


function checkbox(category){  // esto se encarga de llenar con la info correcta los checkbox
    return `
    <label >${category}</label>
    <input class="me-3" type="checkbox" id="${category}" name="Category" value="${category}">
    `
}

export function showCheckbox(catList, html){
    let checkboxTemplate = ""
    for (let check of catList){
        checkboxTemplate += checkbox(check)
    }
    html.innerHTML = checkboxTemplate
}

export function filtradoCheckAndSearch(data, card){
    let arrCheck = []
    let arrSearch = []
    let searchValue = ""
    let arrFilt = []

    let eventCheck = document.querySelectorAll(" #category-check > input[type=checkbox]")
    let checkList = []


    for ( let i=0; i < eventCheck.length; i++){
        eventCheck[i].addEventListener("change", function(){
            checkList = []
            for (i=0; i < eventCheck.length; i++){
                if (eventCheck[i].checked){
                    checkList.push(eventCheck[i].value)
                }


                if (checkList.length === 0){
                    arrCheck = []
                    if (arrSearch.length === 0){
                    arrFilt = data.events
                    }else{
                        arrFilt = arrSearch
                    }
                    cargarDatos(arrFilt, card)  
                }
                else{
                    console.log(checkList)
                    arrCheck = data.events.filter(cat => checkList.includes(cat.category))
                    arrFilt = arrCheck.filter (evento => arrSearch.includes(evento) || searchValue == "")
                    console.log(arrFilt)
                    cargarDatos(arrFilt, card)
                }
            }

        })
    }

    const boxSearch = document.getElementById("searchBox")

    boxSearch.addEventListener("keyup", elemento => {
        elemento.target.value
        searchValue = elemento.target.value
        arrSearch = data.events.filter(evento => evento.name.toLowerCase().includes(elemento.target.value.toLowerCase()))
        arrFilt = arrSearch.filter(evento => arrCheck.includes(evento) || arrCheck.length === 0)
        console.log(arrFilt)
        console.log(arrSearch)
        cargarDatos(arrFilt, card)
    })
}

//-------------------------------------------------PAST Y UPCOMING------------------------------------------------------

function cargarCard(event) {
    return ` 
    <div class="card borderPink backPink mt-3 mb-2" style="width: 18rem;">
        <img src="${event.image}" class="card-img-top" alt="${event.name}">
        <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}</p>
            <div class="d-flex justify-content-evenly centerI">
                <p class="price">Price: $${event.price}</p>
                <a href="./details.html?id=${event._id}" class="btn btn-primary">More details</a>
            </div>
        </div>
    </div>`
}

export function cargarDatos2(events, index){
    let template = ""
    for (let event of events) {
        template += cargarCard(event)
    }
    if (template === "") {
        template = "<h4 mt-3> No hemos encontrado resultado para su búsqueda. </h4>";
    }
    index.innerHTML = template
}

export function filtradoCheckAndSearch2(filtEvents, card) {
    let arrCheck = [];
    let arrSearch = [];
    let searchValue = "";
    let arrFilt = [];

    let eventCheck = document.querySelectorAll("#category-check input[type=checkbox]");
    let checkList = [];

    for (let i = 0; i < eventCheck.length; i++) {
        eventCheck[i].addEventListener("change", function() {
            checkList = [];
            for (let j = 0; j < eventCheck.length; j++) {
                if (eventCheck[j].checked) {
                    checkList.push(eventCheck[j].value);
                }
            }

            if (checkList.length === 0) {
                arrCheck = [];
                if (arrSearch.length === 0) {
                    arrFilt = filtEvents;
                } else {
                    arrFilt = arrSearch;
                }
                cargarDatos(arrFilt, card);
            } else {
                arrCheck = filtEvents.filter(evento => checkList.includes(evento.category));
                arrFilt = arrCheck.filter(evento => arrSearch.includes(evento) || searchValue === "");
                cargarDatos(arrFilt, card);
            }
        });
    }

    const boxSearch = document.getElementById("searchBox");

    boxSearch.addEventListener("keyup", elemento => {
        searchValue = elemento.target.value;
        arrSearch = filtEvents.filter(evento => evento.name.toLowerCase().includes(searchValue.toLowerCase()));
        arrFilt = arrSearch.filter(evento => arrCheck.includes(evento) || arrCheck.length === 0);
        cargarDatos(arrFilt, card)
    })
}

//-------------------------------------------------- DETAILS-----------------------------------------------------

export function llenarCard($contenedor, idFind) {
    console.log(idFind)
    $contenedor.innerHTML = `
            <div class="d-flex p-5">
            <img class="detImg" src="${idFind.image}" alt="${idFind.name}"></img>
            <div class="cont ms-5">
                    <h1>${idFind.name}</h1>
                    <h3>${idFind.date}</h3>
                    <p class="detP">${idFind.description}</p>
                    <p class="detP"> Lugar:  ${idFind.place}</p>
                    <p class="detP"> Capacidad:  ${idFind.capacity}</p>
                    <p class="detP"> Asistencia:  ${idFind.assistance}</p>
                    <p class="detP"> Precio:  $${idFind.price}</p>
            </div>
            </div>
            `;
}

//--------------------------------------------------STATS--------------------------------------------------------------

// Función para filtrar la capacidad
export function filterCapacity(events) {
    return events.sort((a, b) => a.capacity - b.capacity);
  }
  
  // Función para filtrar la asistencia y el porcentaje de asistencia
  export function filterAssistAndPercent(events) {
    return events
      .filter(event => event.assistance)
      .map(event => ({
        event: event.name,
        percentage: (event.assistance * 100 / event.capacity).toFixed(2)
      }))
      .sort((a, b) => a.percentage - b.percentage);
  }
  
  // Función para filtrar las ganancias
  export function filteredRevenues(arrayA, arrayB) {
    return arrayA.map(category => {
      const categ = arrayB.filter(event => event.category === category);
      const revenues = categ.reduce((accumulator, event) => {
        const attendance = event.assistance || event.estimate;
        return accumulator + (attendance * event.price);
      }, 0);
      const percentages = (
        categ.reduce((accumulator, event) => {
          const attendance = event.assistance || event.estimate;
          return accumulator + (attendance * 100 / event.capacity);
        }, 0) / categ.length
      ).toFixed(2);
      return {
        category: category,
        revenue: revenues,
        percentage: percentages
      };
    });
  }
  
  // Función para crear la primera tabla
  export function createTableOne(arrayA, arrayB, table) {
    const highPercent = arrayA[arrayA.length - 1];
    const lowPercent = arrayA[0];
    const highCapacity = arrayB[arrayB.length - 1];
    
    table.innerHTML = `
      <th colspan="3" class="table-primary" >Event statistics</th>
      <tr> 
        <td class="fw-bold fs-6">Events with the highest percentage of attendance</td>
        <td class="fw-bold fs-6">Events with the lowest percentage of attendance</td>
        <td class="fw-bold fs-6">Event with larger capacity</td>
      </tr>
      <tr>
        <td class="letra">${highPercent.event} ${highPercent.percentage}%</td>
        <td class="letra">${lowPercent.event} ${lowPercent.percentage}%</td>
        <td class="letra">${highCapacity.name} ${highCapacity.capacity.toLocaleString()}</td>
      </tr>
    `;
  }
  
  // Función para crear las otras tablas
  export function createTableTwo(array, element) {
    const rows = array.map(event => `
      <tr>
        <td class="letra">${event.category}</td>
        <td class="letra">$ ${event.revenue.toLocaleString()}</td>
        <td class="letra">${event.percentage}%</td>
      </tr>
    `);
    
    element.innerHTML = rows.join('');
  }