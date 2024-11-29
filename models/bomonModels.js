const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId; // Khai báo ObjectId

// Tạo Schema cho Bộ Môn
const boMonSchema = new Schema({
    id: { type: ObjectId },
    tenBoMon: {
      type: String,
      required: true,
    },
    maKhoa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Khoa',
      required: true,
    },
    moTa: {
      type: String,
      required: true,
    },
  });
  

// Tạo model từ Schema
const BoMon = mongoose.model('BoMon', boMonSchema);

module.exports = BoMon;
