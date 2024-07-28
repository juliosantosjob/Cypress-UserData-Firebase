const axios = require('axios')

if (!process.env.BASE_URL) throw new Error('BASE_URL is not defined')
if (!process.env.PROJECT_ID) throw new Error('PROJECT_ID is not defined')

const PROJECT_ID = process.env.PROJECT_ID
const FB_URL = `https://${PROJECT_ID}.firebaseio.com`

async function getUser({ route }) {
    let response

    if (!route) {
        throw new Error('Route is required to use this task!')
    }
    if (typeof route !== 'string') {
        throw new Error('Route needs to be a string!')
    }

    const URL = `${FB_URL}/${route}.json`

    try {
        response = await axios.get(URL)
    } catch (error) {
        console.log('Error getting user: ', route)
        throw error
    }

    return response.data
}

module.exports = {

    /**
     * Vai buscar os dados de um user no firebase passando 
     * as credenciais de acesso de maneira segura
     * 
     * @param {string} route
     */

    getUser
}