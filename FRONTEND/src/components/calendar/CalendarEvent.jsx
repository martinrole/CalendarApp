
export default function CalendarEvent({ event }) {

    const { title, usuario } = event

    return (
        <div>
            <strong>{title}</strong> - <span>{usuario.nombre}</span>
        </div>
    )
}
