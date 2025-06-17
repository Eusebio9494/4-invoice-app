import { useState, useEffect } from "react";

export const FormItemView = ( {handler} ) => {

    //Alternativa para declarar un hook useState-Estado del formulario
    const [formItemsState, setFormItemsState] = useState({
        product: '',
        price: '',
        quantity: '',
    });

    //Se desestructura constante useState para convertirlas en variables
    const { product, price, quantity } = formItemsState;

    //Alternativa para definir solo un método de onChange para cada valor del formulario
    const onInputChange = ({ target }) => {
        // console.log(target.name)
        // console.log(target.value)

        //Agrega mediante Spread nuevos valores al arreglo, el nombre del input/atributo y su valor
        setFormItemsState({ ...formItemsState, [target.name]: target.value });
    };

        useEffect(() => {
            // console.log('El precio cambio')
        }, [price])//2° parametro es el evento que dispara el useEffect 
        useEffect(() => {
            console.log('Los items cambiaron')
        }, [formItemsState])//2° parametro es el evento que dispara el useEffect 

    const onInvoiceItemsSubmit = (event) => {
        event.preventDefault();

        if (!product.trim()) return;
        if (price.trim().length <= 1) return;
        if (isNaN(price.trim())) {
            alert('Error el precio no es un número')
            return
        };
        if (quantity.trim().length < 1) {
            alert('Error la cantidad tiene que ser mayor a 0')
            return
        };
        if (isNaN(quantity)) {
            alert('Error la cantidad no es un número')
            return
        };

        //Recibe función handler del padre y le regresa los items agregados en el formulario
        handler(formItemsState);
        
        setFormItemsState({
            product: '',
            price: '',
            quantity: ''
        })

    };

    return (
    <>
        <form className="w-50" onSubmit={event => onInvoiceItemsSubmit(event)}>
            <input type="text"
                name="product"
                value={product} //para limpiar valor despues de enviar formulario
                placeholder="Producto"
                className="form-control m-3"
                //Método de referencia
                onChange={onInputChange} />

            <input type="text"
                name="price"
                value={price}
                placeholder="Precio"
                className="form-control m-3"
                onChange={event => onInputChange(event)} />

            <input type="text"
                name="quantity"
                value={quantity}
                placeholder="Quantity"
                className="form-control m-3"
                // Método de referencia
                onChange={onInputChange} />
            <button
                type="submit" className="btn btn-primary m-3">
                Nuevo Item
            </button>
        </form>
    </>
    )
}