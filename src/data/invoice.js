
export const invoice = {
    id: 10,
    name: 'Componentes PC',

    client: {
        name: 'Eusebio',
        lastName: 'Olvera',
        address: {
            country: 'USA',
            city: 'Miami',
            street: 'algo',
            number: 12
        },

    },
    company: {
        name: 'New Egg',
        fiscalNumber: 124356,
    },
    items: [
        {
            id: 1,
            product: 'Cpu Intel i7',
            price: 499,
            quantity: 1,
        },
        {
            id: 2,
            product: 'Corsair Keyboard Mechanic',
            price: 150,
            quantity: 2,
        },
        {
            id: 3,
            product: 'Monitor Asus',
            price: 350,
            quantity: 1,
        }
    ]

}