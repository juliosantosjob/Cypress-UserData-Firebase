const { getUser } = require('conections-fb');

function tasks(on) {
    on('task', {
        getUser
    });
}

module.exports = {

    /**
     * Traz as tasks do Cypress para um arquivo isolado, especificamente
     * para evitar poluir o arquivo de configuração caso haja várias
     * tasks.
     * 
     * @param {*} on 
     */

    tasks
};