const serviceService = require('../services/cleaningService');

const getAllServices = (req, res) => {
  serviceService.getAllServices((services) => {
    res.json(services);
  });
};

const getServiceById = (req, res) => {
  const serviceId = parseInt(req.params.id);
  serviceService.getServiceById(serviceId, (service) => {
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  });
};

const createService = (req, res) => {
  const { service_name, price } = req.body;
  const newService = {
    service_name,
    price
  };
  serviceService.createService(newService, (createdService) => {
    res.status(201).json(createdService);
  });
};

const updateService = (req, res) => {
  const serviceId = parseInt(req.params.id);
  const { service_name, price } = req.body;
  const updatedService = {
    service_name,
    price
  };
  serviceService.updateService(serviceId, updatedService, (service) => {
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  });
};

const deleteService = (req, res) => {
  const serviceId = parseInt(req.params.id);
  serviceService.deleteService(serviceId, () => {
    res.json({ message: 'Service deleted successfully' });
  });
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};