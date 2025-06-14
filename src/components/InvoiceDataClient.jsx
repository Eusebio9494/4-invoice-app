import PropTypes from 'prop-types'

export const InvoiceDataClient = ({title, client}) => {

    const { name: nameClient, lastName, address: {country, city, street, number} } = client; //Añadir alias a name para evitar variable duplicada
    // const { country, city, street, number } = address
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

InvoiceDataClient.propTypes = {
    title: PropTypes.string.isRequired,
    client: PropTypes.string.isRequired,
}