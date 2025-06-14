import { useState } from "react";
import { getInvoice } from "./services/getInvoiceServices"
import { InvoiceDataClient } from "./components/InvoiceDataClient";
import { InvoiceDataCompany } from "./components/InvoiceDataCompany";
import { InvoiceView } from "./components/InvoiceView";
import { ListItemView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";

export const InvoiceApp = () => {
    //Se desestructura para obtener los atributos y objetos del json
    const { total, id, client, name, company, items: itemsInitial } = getInvoice();


    const [productValue, setProductValue] = useState('')
    const [priceValue, setPriceValue] = useState(0)
    const [quantitytValue, setQuantityValue] = useState(0)

    const [items, setItems] = useState(itemsInitial);

    const [counter, setCounter] = useState(4)
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

                        <form onSubmit={event => {
                            event.preventDefault();

                            if(productValue.trim().length <= 1) return;
                            if(priceValue.trim().length <= 1) return;
                            if(quantitytValue.trim().length < 1) return;
                            setItems([...items,
                            {
                                id: counter, product: productValue,
                                price: +priceValue,
                                quantity: parseInt(quantitytValue, 10)
                            }
                            ]);
                            setProductValue('');
                            setPriceValue('');
                            setQuantityValue('');
                            setCounter(counter + 1)
                        }}>
                            <input type="text"
                                name="product"
                                value={productValue} //para limpiar valor despues de enviar formulario
                                placeholder="Producto" className="form-control m-4" onChange={event => {
                                    console.log(event.target.value)
                                    setProductValue(event.target.value)
                                    //target es el campo
                                    //value es el valor ingresado
                                }} />

                            <input type="text"
                                name="price"
                                value={priceValue}
                                placeholder="Precio" className="form-control m-4" onChange={event => {
                                    console.log(event.target.value)
                                    setPriceValue(event.target.value)
                                }} />

                            <input type="text"
                                name="quantity"
                                value={quantitytValue}
                                placeholder="Quantity" className="form-control m-4" onChange={event => {
                                    console.log(event.target.value)
                                    setQuantityValue(event.target.value)
                                }} />
                            <button 
                            type="submit" className="btn btn-primary m-4">
                                Nuevo Item
                                </button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}