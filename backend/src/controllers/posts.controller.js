import {
  obtenerPosts,
  crearPost,
  agregarLike,
  eliminarUnPost,
} from "../models/post.model.js";

import { findError } from "../utils/utils.js"

const getPosts = async (req, res) => {
  try {
    const posts = await obtenerPosts();
    //res.status(200).json({posts: posts}) para el desafio 'like-me' esto tiene que venir vacio
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener" });
    console.error("Error al procesar", error);
  }
};

const agregarPost = async (req, res) => {
  try {
    const post = req.body;
    //const { post } = req.body;
    const nuevoPost = await crearPost(post);
    res.status(201).json(nuevoPost);
    //res.status(201).json({post: nuevoPost})
  } catch (error) {
    const errorFound = findError(error.code)
    res.status(errorFound[0].status).json({error: errorFound[0].message})
  }
};

const like = async (req, res) => {
  try {
    const { id } = req.params;
    const darLike = await agregarLike(id);
    res.status(201).json(darLike);
  } catch (error) {
    //res.send(error)
    const errorFound = findError(error.code)
    res.status(errorFound[0].status).json({error: errorFound[0].message})
  }
};

const eliminarPost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await eliminarUnPost(id);
    // if (deletePost === 0){
    //  return res.status(404).json({error: "No se encontró el registro."});
    // }
    res.status(204).json({message: "Se eliminó el registro."})
  } catch (error) {
    const errorFound = findError(error.code)
    res.status(errorFound[0].status).json({error: errorFound[0].message})
  }
};

export { getPosts, agregarPost, like, eliminarPost };
