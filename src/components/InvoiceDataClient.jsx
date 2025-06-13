
export const InvoiceDataClient = ({title, client}) => {

    const { name: nameClient, lastName, address } = client; //Añadir alias a name para evitar variable duplicada
    const { country, city, street, number } = address
    return (
        <>
            <h3>{title}</h3>
            <ul className="list-group">
                <li className="list-group-item active">{nameClient} {lastName}</li>
                <li className="list-group-item">{country} / {city}</li>
                <li className="list-group-item">{street} {number}</li>
            </ul>
        </>
    )
}