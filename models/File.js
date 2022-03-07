import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
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
    default: '',
  },
  type: {
    type: String,
    enum: ['FrontPage', 'Shirt', 'Consent'],
    required: true,
  },
});

// Image is a model which has a schema imageSchema

export default mongoose.model('File', fileSchema);
