const extraService = require('../services/extraService');

const getAllExtras = (req, res) => {
  extraService.getAllExtras((extras) => {
    res.json(extras);
  });
};

const getExtraById = (req, res) => {
  const extraId = parseInt(req.params.id);
  extraService.getExtraById(extraId, (extra) => {
    if (extra) {
      res.json(extra);
    } else {
      res.status(404).json({ message: 'Extra not found' });
    }
  });
};

const getExtraByUserId = (req,res) => {
  const userId = req.body.userId;
  extraService.getExtraByUserId(userId, (extra) => {
    if (extra) {
      res.json(extra);
    } else {
      res.status(404).json({ message: 'Extra not found' });
    }
  });
}

const createExtra = (req, res) => {
  const { extra_name, price } = req.body;
  const newExtra = {
    extra_name,
    price
  };
  extraService.createExtra(newExtra, (createdExtra) => {
    res.status(201).json(createdExtra);
  });
};

const updateExtra = (req, res) => {
  const extraId = parseInt(req.params.id);
  const { extra_name, price } = req.body;
  const updatedExtra = {
    extra_name,
    price
  };
  extraService.updateExtra(extraId, updatedExtra, (extra) => {
    if (extra) {
      res.json(extra);
    } else {
      res.status(404).json({ message: 'Extra not found' });
    }
  });
};

const deleteExtra = (req, res) => {
  const extraId = parseInt(req.params.id);
  extraService.deleteExtra(extraId, () => {
    res.json({ message: 'Extra deleted successfully' });
  });
};

module.exports = {
  getAllExtras,
  getExtraById,
  createExtra,
  updateExtra,
  deleteExtra,
  getExtraByUserId
};