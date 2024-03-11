import { v4 as uuidv4 } from "uuid";
import pool from "../../db/conectionDB.js";

const obtenerPosts = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");
    return rows;
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    throw error;
  }
};

const crearPost = async ({ descripcion, titulo, url }) => {
  try {
    const newId = uuidv4();
    const result = await pool.query(
      "INSERT INTO posts (id,titulo,img,descripcion, likes) VALUES ($1,$2,$3,$4,0) RETURNING *",
      [newId, titulo, url, descripcion]
    );
    //console.log(result.rows);
    return result.rows[0];
  } catch (error) {
    console.error("Error al insertar", error);
    throw error;
  }
};

const agregarLike = async (id) => {
  try {
    //vamos a ver si ya existe like.
    const likesDelPost = await pool.query(
      "SELECT likes FROM posts WHERE id = $1",
      [id]
    );
    const cantidadLikesPost = likesDelPost.rows[0].likes;

    //aca preguntamos si la cantidad de post es igual a 1 then 0, si no 1. ya que le sacaremos el like si tiene al volver a pinchar.
    //const nuevosLikes = cantidadLikesPost === 1 ? 0 : 1;

    //tambien podemos programarlo de manera incremental, como se muestra en el desafio.
    const nuevosLikes = cantidadLikesPost + 1;

    // Actualiza la cantidad de likes en la base de datos
    const result = await pool.query(
      "UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *",
      [nuevosLikes, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al dar like", error);
    throw error;
  }
};

const eliminarUnPost = async (id) => {
  try {
    const result = await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error al eliminar", error);
    throw error;
  }
};

export { obtenerPosts, crearPost, agregarLike, eliminarUnPost };
