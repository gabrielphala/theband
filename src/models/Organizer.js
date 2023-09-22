const { SQLifier } = require('sqlifier');

module.exports = new (class Organizer extends SQLifier {
    constructor () {
        super();

        this.schema('organizer', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            firstname: { type: 'varchar', length: 30 },
            lastname: { type: 'varchar', length: 30 },
            email: { type: 'varchar', length: 30 },
            password: { type: 'varchar', length: 250 }
        })
    }
})