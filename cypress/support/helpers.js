import { faker } from '@faker-js/faker';

export default {
    
    /**
     * Criei esta função para gerar um usuario randomico
     * 
     * @returns {firstName: string, lastName: string, zipCode: string}
     */

    userInfo: function () {
        return {
            firstName: faker.internet.userName(),
            lastName: faker.internet.userName(),
            zipCode: faker.address.zipCode()
        }
    }
}