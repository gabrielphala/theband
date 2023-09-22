const { SQLifier } = require('sqlifier');

module.exports = new (class Supporter extends SQLifier {
    constructor () {
        super();

        this.schema('supporter', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            firstname: { type: 'varchar', length: 15 },
            lastname: { type: 'varchar', length: 15 },
            email: { type: 'varchar', length: 30 },
            password: { type: 'varchar', length: 250 },
        })
    }
})