import { invoice } from "../data/invoice"

export const getInvoice = () => {
    
    // console.log(invoice)
    let total = 0;
    invoice.items.forEach( item => {
        total += item.price * item.quantity;
    });

    return {...invoice, total};
}