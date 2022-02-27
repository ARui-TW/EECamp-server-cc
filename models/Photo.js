import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['FrontPage', 'Shirt'],
    required: true,
  },
});

// Image is a model which has a schema imageSchema

export default mongoose.model('Photo', photoSchema);
