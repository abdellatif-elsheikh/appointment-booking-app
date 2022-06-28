import { Router } from 'express';
import users from './api/users.route';
import bookings from './api/booking.route';

const routes = Router();

routes.use('/users', users);
routes.use('/booking', bookings);

export default routes;
