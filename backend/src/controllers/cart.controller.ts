import type { Response } from "express";
import pool from "../config/db.ts";
import type { AuthRequest } from "../middleware/jwt.middleware.ts";

export const getCartItems = async (req: AuthRequest, resp: Response) => {
  try {
    const user_id = req.user.id;
    console.log(user_id)
    const query = `
            SELECT c.id,c.user_id, c.quantity, p.name, p.photo_url, p.price 
            FROM cart_items AS c 
            JOIN products AS p ON  c.product_id = p.id
            WHERE c.user_id = $1
        `;
    const { rows } = await pool.query(query, [user_id]);
    return resp
      .status(200)
      .json({
        message: rows.length ? "Success" : "Cart is empty",
        carts: rows
      });
  } catch (error) {
    console.error(error);
    return resp
      .status(500)
      .json({ message: "Unexpected error occurred", error: error });
  }
};

export const updateCartItem = async (req:AuthRequest, resp: Response) => {
  try {
    const user_id = req.user.id;
    const {cart_id} = req.params
    const { quantity } = req.body;

    if(!cart_id || quantity === undefined ){
        return resp.status(400).json({message:"cart_id and quantity fields are required"})
    }

    if (quantity <= 0) {
      return resp.status(400).json({ message: "Quantity must be greater than 0. Use DELETE to remove item." });
    }

    const query = `
        UPDATE cart_items ci 
        SET quantity = $1 
        FROM products p
        WHERE ci.product_id = p.id
            AND ci.id = $2
            AND ci.user_id = $3
            AND p.quantity >= $1
        RETURNING ci.*, (ci.quantity * p.price) AS subtotal
    `;
    const result = await pool.query(query, [quantity, cart_id, user_id]);

    if (result.rowCount === 0) {
      return resp
        .status(400)
        .json({ message: "Update failed. Item not found or insufficient stock available." , carts: [] });
    }
    return resp
      .status(200)
      .json({ message: "Success",cart:result.rows[0] });
  } catch (error) {
    console.error(error);
    return resp
      .status(500)
      .json({ message: "Unexpected error occurred", error: error });
  }
};

export const addCartItem = async (req: AuthRequest, resp: Response) => {
  try {
    const user_id = req.user.id;
    const { product_id, quantity } = req.body;
    // check product exists
    if (!product_id || quantity === undefined) {
      return resp.status(400).json({ message: "Product and quantity required" });
    }

    const query = `
        INSERT INTO cart_items (user_id, product_id, quantity)
        SELECT $1, $2, $3
        WHERE EXISTS (SELECT 1 FROM products WHERE id = $2 AND quantity >= $3)
        ON CONFLICT (user_id, product_id) 
        DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
        RETURNING *;
    `;
    const {rows} = await pool.query(query, [user_id, product_id, quantity]);

    if(rows.length === 0){
        return resp.status(400).json({message: "Product does not exists"})
    }
    return resp
      .status(201)
      .json({ message: "Success", carts: rows });
  } catch (error) {
    console.error(error);
    return resp
      .status(500)
      .json({ message: "Unexpected error occurred", error: error });
  }
};

export const removeCartItem = async (req: AuthRequest, resp: Response) => {
  try {
    const user_id = req.user.id;
    const { cart_id } = req.params;
    const query = `
        DELETE FROM cart_items WHERE  id = $1 AND user_id = $2
    `;
    const result = await pool.query(query, [ cart_id, user_id]);
    if (result.rowCount === 0) {
      return resp
        .status(404)
        .json({ message: "cart cannot be found", carts: [] });
    }

    return resp.status(200).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return resp
      .status(500)
      .json({ message: "Unexpected error occurred", error: error });
  }
};
