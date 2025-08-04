const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

// Load Sequelize and models
const db = require('./models');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const likeRoutes = require('./routes/likeRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);

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
app.listen(port, () => {
  console.log(`Running on the port http://localhost:${port}`);
});

/* REQUIREMENTS
1. Your system should have a proper MVC Structure. DONE
2. The system should be able to create users. DONE. 
http://localhost:8000/api/users/create
{
  "username": "newuser",
  "email": "newuser@gmail.com",
  "password_hash": "123456789",
  "first_name": "Test",
  "last_name": "User"
}

3. The users should be able to create multiple posts. DONE. 
(posts should be very basic with title, description and image)
http://localhost:8000/api/posts/create
{
  "user_id": "1",
  "title": "Module 10",
  "description": "learn how to deploy your apps",
  "header_image_url": "https://assets.intersystems.com/dims4/default/24e2cfd/2147483647/strip/true/crop/6400x4800+0+0/resize/1290x968!/quality/90/?url=http%3A%2F%2Finter-systems-brightspot.s3.amazonaws.com%2F30%2F16%2Fdf3b816e4e5bb30ad654bb9ae160%2Fgettyimages-157334670.jpg"
}
4. Other users should be able to like the posts and comment on the posts. DONE. 
POST http://localhost:8000/api/likes/toggle
{ "user_id": 3, "post_id": 3 }
POST http://localhost:8000/api/comments/create
{ "user_id": 3, "post_id": 3, "content": "Final module!" }
 */
