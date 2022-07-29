import moment from "moment"

//Pone los titulos del calendario en español
export const calendarConfig = {
    allDay: 'Todo el día',
    previous: 'Atrás',
    next: 'Siguiente',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'No hay eventos en este rango',
    showMore: total => `+ Ver más (${total})`
};

//Video 379: Convierte la fecha String del Backend en una válida para el Calendario
export const adjustEventsDate = ( eventos = [] ) => { 
   return eventos.map( evento => ({
            ...evento, 
            start: moment(evento.start).toDate(),
            end: moment(evento.end).toDate()
        })
    )
}
