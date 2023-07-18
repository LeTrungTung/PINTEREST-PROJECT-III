//Import Modal

const uploadImageModel = require('../models/uploadImage.model');

const postImage = (req, res) => {
  if (!req.body) return;

  const newImage = {
    userCreateId: Number(req.body.userCreateId),
    linkImage: req.body.linkImage,
    categoryImage: req.body.categoryImage,
    titleImage: req.body.titleImage,
    description: req.body.description,
    sourceImage: req.body.sourceImage,
  };

  uploadImageModel.modelPostImage(newImage, res);
};

module.exports = {
  postImage,
};
