const app = require('./app');
const connectDB = require('./config/mongoDB');
const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'})


connectDB();

console.log('bxvvxcc');

app.listen(process.env.PORT, () => {
	console.log(`server started on port:' ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});