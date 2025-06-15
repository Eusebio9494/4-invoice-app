import { useEffect, useState } from "react";
import { getInvoice } from "./services/getInvoiceServices"
import { InvoiceDataClient } from "./components/InvoiceDataClient";
import { InvoiceDataCompany } from "./components/InvoiceDataCompany";
import { InvoiceView } from "./components/InvoiceView";
import { ListItemView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";
import { invoice } from "./data/invoice";

const invoiceInitial = {
        id: 0,
        name: '',

        client: {
            name: '',
            lastName: '',
            address: {
                country: '',
                city: '',
                street: '',
                number: 0
            },

        },
        company: {
            name: '',
            fiscalNumber: 0,
        },
        items: []

    }
export const InvoiceApp = () => {

    //Objeto para que lo maneje el estado de react, para que solo se ejecute la primera vez
    const [invoice, setInvoice] = useState(invoiceInitial);

    //------------------------------------------------------
    const [items, setItems] = useState([]);

    //Guarda el ciclo de vida
    useEffect(() => {
        //Se obtiene los datos
        const data = getInvoice();
        console.log(data)
        //Se guarda el objeto obtenido de backend y asigna al objeto en frontend
        setInvoice(data);
        setItems(data.items)
    }, [])


    //Se desestructura para obtener los atributos y objetos del json
    const { total, id, client, name, company, items: itemsInitial } = invoice


    //Alternativa para declarar un hook useState-Estado del formulario
    const [formItemsState, setFormItemsState] = useState({
        product: '',
        price: '',
        quantity: '',
    });
    //Se desestructura constante useState para convertirlas en variables
    const { product, price, quantity } = formItemsState;


    //------------------------------------------------------
    const [counter, setCounter] = useState(4)
    //------------------------------------------------------


    //Alternativa para definir solo un método de onChange para cada valor del formulario
    const onInputChange = ({ target }) => {
        // console.log(target.name)
        // console.log(target.value)

        setFormItemsState({ ...formItemsState, [target.name]: target.value });
    };
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
        //Agrega los valores ingresados al nuevo arreglo
        setItems([...items,
        {
            id: counter,
            product: product.trim(),
            price: +price.trim(),
            quantity: parseInt(quantity.trim(), 10)
        }
        ]);
        setFormItemsState({
            product: '',
            price: '',
            quantity: ''
        })
        setCounter(counter + 1)
    }
    return (
        <>
            <div className="container">
                <div className="card my-3">
                    <div className="card-header">
                        Ejemplo Factura
                    </div>
                    <div className="card-body">
                        <InvoiceView title='Catalogo' id={id} name={name} />
                        <div className="row my-3">

                            <div className="col">
                                <InvoiceDataClient title='Datos del cliente' client={client} />
                            </div>

                            <div className="col">
                                <InvoiceDataCompany title='Datos de la empresa' company={company} />

                            </div>
                        </div>

                        <ListItemView title='Productos' items={items} />
                        <TotalView total={total} />

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
                    </div>
                </div>
            </div>

        </>
    )
}