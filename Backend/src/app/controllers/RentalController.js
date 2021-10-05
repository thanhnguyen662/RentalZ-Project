const prisma = require('../models/prisma');

class RentalController {
   createRentalForm = async (req, res, next) => {
      try {
         const isExist = await prisma.rental.findUnique({
            where: { address: req.body.address },
         });

         if (isExist) return res.json({ message: 'Exist' });

         const response = await prisma.rental.create({
            data: {
               name: req.body.name,
               address: req.body.address,
               startDate: new Date(req.body.startDate),
               endDate: new Date(req.body.endDate),
               propertyType: req.body.propertyType,
               bedRoom: req.body.bedRoom,
               furnitureType: req.body.furnitureType,
               price: Number(req.body.rentPrice),
               note: req.body.note,
            },
         });
         return res.json({ ...response, message: 'Success' });
      } catch (error) {
         return next(error);
      }
   };

   getRentalForm = async (req, res, next) => {
      try {
         const response = await prisma.rental.findMany();
         return res.json(response);
      } catch (error) {
         return next(error);
      }
   };

   deleteRentalForm = async (req, res, next) => {
      try {
         const response = await prisma.rental.delete({
            where: { id: req.body.rentalId },
         });
         return res.json(response);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new RentalController();
