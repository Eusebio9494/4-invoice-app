import { useEffect, useState } from "react";
import { calculateTotal, getInvoice } from "./services/getInvoiceServices"
import { InvoiceDataClient } from "./components/InvoiceDataClient";
import { InvoiceDataCompany } from "./components/InvoiceDataCompany";
import { InvoiceView } from "./components/InvoiceView";
import { ListItemView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";
import { invoice } from "./data/invoice";
import { FormItemView } from "./components/FormItemView";

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

    const [activeForm, setActiveForm] = useState(false);

    //Objeto para que lo maneje el estado de react, para que solo se ejecute la primera vez
    const [invoice, setInvoice] = useState(invoiceInitial);

    //------------------------------------------------------
    const [items, setItems] = useState([]);

    //Se desestructura para obtener los atributos y objetos del json
    const { id, client, name, company } = invoice

    //------------------------------------------------------
    const [counter, setCounter] = useState(4)

    const [total, setTotal] = useState(0);

    //Guarda el ciclo de vida
    useEffect(() => {
        //Se obtiene los datos
        const data = getInvoice();
        // console.log(data)
        //Se guarda el objeto obtenido de backend y asigna al objeto en frontend
        setInvoice(data);
        setItems(data.items)
    }, []);



    //Actualizar el precio total de productos
    useEffect( () => {
        setTotal(calculateTotal(items))
    }, [items]);
 

    //Agrega los items recibidos del form y los agrega al arreglo de useState
    const handlerAddItems = ( {product, price,quantity}) => {
       
        //Agrega los valores ingresados al nuevo arreglo
        setItems([...items,
        {
            id: counter,
            product: product.trim(),
            price: +price.trim(),
            quantity: parseInt(quantity.trim(), 10)
        }
        ]);
        setCounter(counter + 1)
    };

    //Actualiza los items con los id que sean diferentes al id eliminado
    const handlerDeleteItem = (id) => {
        setItems(items.filter(item => item.id !==id))
    }

    //Función para actualizar el valor booleano para ocultar formulario
    const onAction = () => {
        setActiveForm(!activeForm);
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

                        {/* Pasa la función handlerDeleteItem a componentes hijos para que le regresen el valor indicado y lo
                        envia a la función handlerDeleteItem en este componente*/}
                        <ListItemView title='Productos' items={items} handlerDeleteItem ={ (id) => {handlerDeleteItem(id)}}/>
                        <TotalView total={total} />
                        <button className="btn btn-secondary" 
                        onClick={ onAction }>{!activeForm ? 'Agregar Item':'Ocultar Formulario'}</button>
                        {/*{ !activeForm? '': <FormItemView handler= {(newItem) => handlerAddItems(newItem)} />} */}
                        { !activeForm || <FormItemView handler= {newItem => {handlerAddItems(newItem)}} />}
                    </div>
                </div>
            </div>

        </>
    )
}