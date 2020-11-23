const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const config = {
  port: process.env.PORT || 3000
};

const routes = {
  users: require('./routes/users'),
  organizations: require('./routes/organizations'),
  departments: require('./routes/departments'),
  employees: require('./routes/employees')
};

// log all incoming requests
app.use((req, res, next) => {
  console.log(req.method + ' ' + req.url);
  next();
});

app.get('/', (req, res) => {
  res.send('hello');
});

for ([route, router] of Object.entries(routes)) {
  app.use('/api/' + route, router);
}

app.listen(config.port, e => {
  console.log('listening on port ' + config.port);
});
