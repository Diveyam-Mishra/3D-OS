// Load environment variables from .env file
require('dotenv').config();

import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import compression from 'compression';

// For TypeScript compatibility with Express
interface EmailRequest {
  name: string;
  company?: string;
  email: string;
  message: string;
}

const app = express();
// Use process.env.PORT for Vercel compatibility
const port = process.env.PORT || 8080;
console.log('Server is starting...');
// Configure CORS to allow requests from various origins
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://127.0.0.1:3000', 
    'https://divsportfolio.netlify.app', 
    'https://portfolio-website-ten-omega.vercel.app',
    'https://portfolio-website-yourusername.vercel.app', // Replace with your actual Vercel subdomain
    'https://your-custom-domain.com', // If you have a custom domain
    '*'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 204
}));
app.use(compression());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Handle OPTIONS requests for CORS preflight
app.options('/api/send-email', cors());

// Handle POST requests to /api route
app.post('/api/send-email', (req: express.Request, res: express.Response) => {
    const { name, company, email, message } = req.body as EmailRequest;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    transporter
        .verify()
        .then(() => {
            transporter
                .sendMail({
                    from: `"${name}" <diveyammishra@gmail.com>`, // sender address
                    to: 'mishradiveyam@gmail.com, diveyammishra@gmail.com', // list of receivers
                    subject: `${name} <${email}> ${
                        company ? `from ${company}` : ''
                    } submitted a contact form`, // Subject line
                    text: `${message}`, // plain text body
                })                .then((info: any) => {
                    console.log({ info });
                    res.json({ message: 'success' });
                })
                .catch((e: Error) => {
                    console.error(e);
                    res.status(500).send(e.message);
                });
        })
        .catch((e: Error) => {
            console.error(e);
            res.status(500).send(e.message);
        });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

// Export the Express API for Vercel
export default app;
