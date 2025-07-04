import { RowItemView } from "./RowItemView"
import PropTypes from 'prop-types'

export const ListItemView = ({title, items, handlerDeleteItem}) => {
    
    return (
        <>
            <h4>{title}</h4>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Productos</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map(({ id, product, price, quantity }) => {
                        return (
                            <RowItemView key={id} 
                            id={id}
                            product={product} 
                            price={price} 
                            quantity={quantity} 
                            // Pasa a la función handlerDeleteItem el id y lo devuelve a componentes superiores
                            handlerDeleteItem ={ (id) => handlerDeleteItem(id)}/>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

ListItemView.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
}