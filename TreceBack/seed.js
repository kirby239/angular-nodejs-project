const bcrypt = require('bcrypt');
const { sequelize, usuarios, roles } = require('./models');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    const hashedPassword = await bcrypt.hash('superadmin', 10);

    const superAdminRoles = await roles.create({ description: 'Super Admin', status: true });
    const genericoRoles = await roles.create({ description: 'Generico', status: true });
    await usuarios.create({
        username: 'superadmin',
        password: hashedPassword,
        email: 'superadmin@example.com',
        name: 'Usuario Super Admin',
        status: true,
        roleId: superAdminRoles.id,
    });

    console.log('Database seeded successfully');
};

seedDatabase();