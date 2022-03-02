let faker = require('faker')
let cpf = require('gerador-validador-cpf')

export default {
    deliver: function() {

        let firstName = faker.name.firstName()
        let lastName = faker.name.lastName()

        let data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: '35999999999',
            address: {
                postalcode: '37704057',
                street: 'Rua Dona Maria Bastos',
                number: '88',
                details: 'curva',
                district: 'Jardim Regina',
                city_state: 'Poços de Caldas/MG'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        return data;
    }
}