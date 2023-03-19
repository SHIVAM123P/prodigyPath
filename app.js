const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const session = require('express-session');

const path = require('path');
const mime = require('mime');
const app = express();
app.use(cookieParser());


app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

	if (req.method == 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
		return res.status(200).json({});
	}

	next();
});
app.use(express.json({ limit: '150mb' }));
app.use(express.urlencoded({ limit: '150mb', extended: true }));

app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname + '/views/'),  path.join(__dirname + '/views/layout/')]);
app.use(expressLayouts);
app.set('layout', path.join(__dirname + '/views/layout/_layout'));
app.set('layout extractScripts', true);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))


// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public'), {
//   // Set the correct MIME type for static files
// //   setHeaders: function (res, path) {
// //     const mimeType = mime.getType(path);
// //     if (mimeType) {
// //       res.set('Content-Type', mimeType);
// //     }
// //   }
// }));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(error => {
    console.error(error);
  });
  

// Set up routes
const indexRoute = require('./routes/indexRoutes');
app.use('/', indexRoute);
const enrollRoute = require('./routes/enrollRoutes');
app.use('/enroll', enrollRoute)

const blogsRoute = require('./routes/blogRoutes')
app.use('/', blogsRoute)
// Start the server
const port = process.env.PORT || 5004;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
