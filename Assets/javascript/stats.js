import { filterCapacity, filterAssistAndPercent, filteredRevenues, createTableOne, createTableTwo } from "../modulo/functions.js";

let table1 = document.getElementById('tabla1');
let tablaUpcoming = document.getElementById('upTable');
let tablaPastEvent = document.getElementById('pastTable');

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(response => response.json())
  .then(data => {
    let currentDate = new Date(data.currentDate);
    let upcomingEvents = data.events.filter(event => (new Date(event.date) > currentDate));
    let pastEvents = data.events.filter(event => (new Date(event.date) < currentDate));
    let upcomingEventCategories = [...new Set(upcomingEvents.map(event => event.category))];
    let pastEventsCategories = [...new Set(pastEvents.map(event => event.category))];
    let assistanceAndPercentage = filterAssistAndPercent(data.events);
    let eventsCapacity = filterCapacity(data.events);
    let pastValues = filteredRevenues(pastEventsCategories, pastEvents);
    let upcomingValues = filteredRevenues(upcomingEventCategories, upcomingEvents);
    createTableOne(assistanceAndPercentage, eventsCapacity, table1);
    createTableTwo(pastValues, tablaPastEvent);
    createTableTwo(upcomingValues, tablaUpcoming);
  });

