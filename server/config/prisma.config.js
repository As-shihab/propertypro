// Load PropertyPro client
const { PrismaClient: PropertyProClient } = require('../node_modules/.prisma/client-propertypro');

// Load Aptigen client
const { PrismaClient: AptigenClient } = require('../node_modules/.prisma/client-aptigen');

// Instantiate clients
const propetypro = new PropertyProClient();
const aptigen = new AptigenClient();

// Export both
module.exports = {
    propetypro,
    aptigen
};
