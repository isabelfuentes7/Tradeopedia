const express = require('express');
const multer = require('multer');
const morgan = require('morgan');
const routes = require('./routes');
const sequelize = require('./config/connection');
const path = require('path');

const helpers = require('./utils/helpers');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

const session = require('express-session');

const app = express();

/////////////////////////////////////////////
// Morgan Middleware
app.use(morgan('dev'));
/////////////////////////////////////////////

const PORT = process.env.PORT || 4001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'abdullahsaint',
  cookie: {
    // Session will automatically expire in 10 minutes
    expires: 10 * 60 * 1000,
  },
  resave: true,
  rolling: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

/////////////////////////////////////////////
// MIDDLEWARE: REQUEST TIME
/////////////////////////////////////////////

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/////////////////////////////////////////////
app.use(routes);

/////////////////////////////////////////////
// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
});
