// https://auth0.com/blog/create-a-simple-and-secure-node-express-app/

// 1. Import Built-In Module
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import expressSession from 'express-session';
import Auth0Strategy from 'passport-auth0';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { findOrCreateAdopterFromAuth0 } from './services/adopter.service.js';

// 2. Import local modules
import db from './models/index.js';
import checkoutRoutes from './routes/checkout.routes.js';
import webhookRoutes from './routes/webhook.routes.js';
import userRoutes from './routes/user.routes.js';
import catRoutes from './routes/cat.routes.js';
import interestRoutes from './routes/interest.routes.js';
import creditsRoutes from './routes/credits.routes.js';
import feedRoutes from './routes/feed.routes.js';
import authRoutes from './auth.js';

// 3. Create app and define constants
const app = express();
const PORT = process.env.SERVER_PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 4. Passport.js Session configuration
const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false,
};

if (app.get('env') === 'production') {
  // Serve secure cookies, requires HTTPS
  session.cookie.secure = true;
}

// 5. Passport.js Passport configuration
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL,
  },
  async function (accessToken, refreshToken, extraParams, profile, done) {
    try {
      // Ensure an adopter record exists/updated for this Auth0 user
      await findOrCreateAdopterFromAuth0(profile);
      return done(null, profile);
    } catch (err) {
      return done(err);
    }
  }
);

// 6. Apply Middleware (like cors, express.json())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession(session));
app.use(express.json());

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Custom Middleware to check if user is authenticated
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect('/login');
};

app.get('/user', secured, (req, res, next) => {
  const { _raw, _json, ...userProfile } = req.user;
  res.render('user', {
    title: 'Profile',
    userProfile: userProfile,
  });
});

// 5. Define Routes
app.use('/api', checkoutRoutes);
app.use('/webhook', webhookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cats', catRoutes);
app.use('/api/interests', interestRoutes);
app.use('/api/credits', creditsRoutes);
app.use('/api/feeds', feedRoutes);
app.use('/', authRoutes);

// 6. Connect to Database
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// 7. Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
