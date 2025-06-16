import PropTypes from 'prop-types'

export const RowItemView = ({ id, product, price, quantity, handlerDeleteItem }) => {
    return (
        <>
            <tr>
                <td>{product}</td>
                <td>{price}</td>
                <td>{quantity}</td>
                <td>
                    {/* Pasa a la función handlerDeleteItem el id y lo devuelve a componentes superiores*/}
                    <button 
                    className='btn btn-danger'
                    onClick={() => {
                        handlerDeleteItem(id)
                        }}>eliminar</button>
                </td>
            </tr>
        </>
    )
}

RowItemView.propTypes = {
    product: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
}