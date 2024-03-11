import express from 'express';
import { getPosts, agregarPost, like, eliminarPost } from '../src/controllers/posts.controller.js';
const router = express.Router();

router.get('/posts', getPosts)
router.post('/posts', agregarPost)
router.put('/posts/like/:id', like)
router.delete('/posts/:id', eliminarPost)

export default router


