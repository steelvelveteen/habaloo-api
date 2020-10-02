import http from 'http';
import { app } from './app';
require('dotenv/config');
import mongoose from 'mongoose';

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
});

const uri = process.env.HABALOO_DB_URI;

if (uri !== undefined) {
    mongoose.connect(
        uri.toString(),
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        },
        () => {
            console.log('Connected to MongoDB on ATLAS ..')
        }
    );
} else {
    console.log('Error. Connection string not found');
}

