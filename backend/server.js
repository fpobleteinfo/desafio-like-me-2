import express from "express";
import cors from 'cors'
import postsRouter from './routes/post.routes.js'

const PORT = process.env.PORT || 3300;
const app = express();

app.use(cors());
app.use(express.json()); // middleware
app.use("", postsRouter); // no le ponemos api/v1 en esta oportunidad

app.listen(PORT, console.log(`¡Servidor encendido! http://localhost:${PORT}`));