const { Sequelize } = require('sequelize');
const modelDefiners = [
  require('./models/user'),
  require('./models/organization'),
  require('./models/department'),
  require('./models/employee')
];

const sequelize = new Sequelize(
  'mysql://api-user:UnUgTLdwZ2ksWeWm9D6B@db:3306/resync-db',
  {
    retry: {
      max: 5,
      backoffBase: 1000
    }
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// console.log(modelDefiners);

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}
const { organization, department, employee } = sequelize.models;
organization.hasMany(department);
department.belongsTo(organization);
department.hasMany(employee);
employee.belongsTo(department);
// create tables in db if not exists
// sequelize.sync({ force: true }); // drop all tables and recreate
sequelize.sync();
// console.log(sequelize);
module.exports = sequelize;
