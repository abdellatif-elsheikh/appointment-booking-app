import { Router } from 'express';
import * as bookingsController from '../../controllers/booking.c';

const bookings = Router();

bookings
  .route('/')
  .get(bookingsController.index)
  .post(bookingsController.create);

bookings
  .route('/:id')
  .get(bookingsController.getOne)
  .put(bookingsController.update)
  .delete(bookingsController.deleteOne);

bookings.route('/user/:id').get(bookingsController.getBookingsByUserId);
export default bookings;
