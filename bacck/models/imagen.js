const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    taskId: { type: Number, required: true }, // ID de la tarea en MySQL
    data: Buffer,
    contentType: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', ImageSchema);
