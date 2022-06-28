import { Request, Response, NextFunction } from 'express';
import BookingModel from '../models/booking.m';
import schema from '../validators/booking.v';

const bookingModel = new BookingModel();

export const index = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const bookings = await bookingModel.index();
    if (!bookings[0]) {
      return res.status(404).json({
        status: 404,
        message: 'No bookings found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(422).json({
        status: 422,
        message: validation.error.message,
      });
    }
    const booking = await bookingModel.create(req.body);
    return res.status(200).json({
      status: 200,
      message: 'booking created successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const { id } = req.params;
    const booking = await bookingModel.getOne(id as unknown as number);
    if (!booking) {
      return res.status(404).json({
        status: 404,
        message: 'booking not found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookingsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const { id } = req.params;
    const bookings = await bookingModel.getBookingsByUserId(id);
    if (!bookings) {
      return res.status(404).json({
        status: 404,
        message: 'no bookings found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(422).json({
        status: 422,
        message: validation.error.message,
      });
    }
    const { id } = req.params;
    const booking = await bookingModel.update(
      id as unknown as number,
      req.body
    );
    return res.status(200).json({
      status: 200,
      message: 'booking updated successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const { id } = req.params;
    const booking = await bookingModel.getOne(id as unknown as number);
    if (!booking) {
      return res.status(404).json({
        status: 404,
        message: 'cant delete this booking',
      });
    }
    await bookingModel.delete(id as unknown as number);
    return res.status(200).json({
      status: 200,
      message: 'deleted successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};
