
export const InvoiceView = ({ title, id, name }) => {
    return (
        <>
            <h3>{title}</h3>
            <ul className="list-group"> {/*Agrupa la lista*/}
                <li className="list-group-item">id: {id}</li> {/*Da formato a los item*/}
                <li className="list-group-item">Name: {name}</li>
            </ul>
        </>
    )
}