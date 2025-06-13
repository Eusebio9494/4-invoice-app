import { invoice } from "../data/invoice"
import { getInvoice } from "../services/getInvoiceServices"
import { InvoiceDataClient } from "./InvoiceDataClient";
import { InvoiceDataCompany } from "./InvoiceDataCompany";
import { InvoiceView } from "./InvoiceView";
import { ListItemView } from "./ListItemsView";

export const InvoiceApp = () => {
    //Se desestructura para obtener los atributos y objetos del json
    const { id, client, name, company, items } = getInvoice();
    
    return (
        <>
            <div className="container"> 
                <div className="card my-3">
                    <div className="card-header">
                        Ejemplo Factura
                    </div>
                    <div className="card-body">
                        <InvoiceView id={id} name={name}/>
                        <div className="row my-3">

                            <div className="col">
                                <InvoiceDataClient title='Datos del cliente' client={client}/>
                            </div>

                            <div className="col">
                                <InvoiceDataCompany title='Datos de la empresa' company={company}/>
                                
                            </div>
                        </div>

                        <ListItemView title='Productos' items={items} />
                    </div>
                </div>
            </div>

        </>
    )
}