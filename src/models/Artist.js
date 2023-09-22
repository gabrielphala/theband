const { SQLifier } = require('sqlifier');

module.exports = new (class Artist extends SQLifier {
    constructor () {
        super();

        this.schema('artist', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            stage_name: { type: 'varchar', length: 15 },
            email: { type: 'varchar', length: 30 },
            password: { type: 'varchar', length: 250 }
        })
    }

    getAll () {
        return this.find();
    }
})