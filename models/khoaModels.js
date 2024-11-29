const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Khai báo Schema từ mongoose
const ObjectId = Schema.ObjectId; // Khai báo ObjectId

// Tạo Schema cho Khoa
const khoaSchema = new Schema({
    id: { type: ObjectId },
  tenKhoa: {
    type: String,
    required: true,  // Tên khoa là bắt buộc
  },
  moTa: {
    type: String,
    required: true,  // Mô tả là bắt buộc
  },
});

// Tạo model từ Schema
const Khoa = mongoose.model('Khoa', khoaSchema);

module.exports = Khoa;
