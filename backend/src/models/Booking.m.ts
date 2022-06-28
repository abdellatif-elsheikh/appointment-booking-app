import db from '../database';
import Error from '../interfaces/error.interface';
import Booking from '../types/booking.type';

class BookingModel {
  async index(): Promise<Booking[]> {
    try {
      const conn = await db.connect();
      const bookings = await conn.query('SELECT * FROM bookings');
      conn.release();
      return bookings.rows;
    } catch (error) {
      throw new Error(
        `can't find any bookings\n Error ${(error as Error).message}`
      );
    }
  }

  async create(booking: Booking): Promise<Booking> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO bookings (title, price, date, description, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const result = await conn.query(sql, [
        booking.title,
        booking.price,
        booking.date,
        booking.description,
        booking.user_id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `can't create booking\n Error ${(error as Error).message}`
      );
    }
  }

  async getOne(id: number): Promise<Booking> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM bookings WHERE id=$1';
      const booking = await conn.query(sql, [id]);
      conn.release();
      return booking.rows[0];
    } catch (error) {
      throw new Error(
        `can't git this booking\n Error ${(error as Error).message}`
      );
    }
  }

  async getBookingsByUserId(user_id: string): Promise<Booking[]> {
    try {
      const conn = await db.connect();
      const sql = `
      SELECT b.id as id, b.title as title, b.price as price, b.date as date, b.description as desc,
      JSON_BUILD_OBJECT('user_id', u.id, 'user_name', u.user_name, 'first_name', u.first_name, 'last_name', u.last_name) as user
      FROM bookings b JOIN users u ON b.user_id = u.id 
      WHERE user_id=$1
      `;
      const booking = await conn.query(sql, [user_id]);
      conn.release();
      return booking.rows;
    } catch (error) {
      throw new Error(
        `can't git this booking\n Error ${(error as Error).message}`
      );
    }
  }

  async update(id: number, booking: Booking): Promise<Booking> {
    try {
      const conn = await db.connect();
      const sql =
        'UPDATE bookings SET title=$1, price=$2, date=$3, description=$4, user_id=$5 WHERE id=$6 RETURNING *';
      const result = await conn.query(sql, [
        booking.title,
        booking.price,
        booking.date,
        booking.description,
        booking.user_id,
        id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `can't update this booking\n Error ${(error as Error).message}`
      );
    }
  }

  async delete(id: number): Promise<Booking> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM bookings WHERE id=$1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `can't delete this booking\n Error ${(error as Error).message}`
      );
    }
  }
}

export default BookingModel;
