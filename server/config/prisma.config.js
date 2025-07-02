
const { PrismaClient: PropertyProClient } = require('../node_modules/.prisma/client-propertypro');
const { PrismaClient: AptigenClient } = require('../node_modules/.prisma/client-aptigen');
const propetypro = new PropertyProClient();
const aptigen = new AptigenClient();

// Export both
module.exports = {
    propetypro,
    aptigen
};