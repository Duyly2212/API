const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId; // Khai báo ObjectId
// Tạo Schema cho Sinh Viên
const sinhVienSchema = new Schema({
    id: { type: ObjectId },
  hoTen: {
    type: String, // Tên sinh viên
    required: true,  // Bắt buộc
  },
  maBoMon: {
    type: mongoose.Schema.Types.ObjectId,  // Sử dụng ObjectId tham chiếu đến Bộ Môn
    ref: 'BoMon',  // Tên mô hình Bộ Môn
    required: true,  // Mã bộ môn là bắt buộc
  },
  tuoi: {
    type: Number,  // Tuổi sinh viên
    required: true,  // Tuổi là bắt buộc
  },
  email: {
    type: String,  // Địa chỉ email
    required: true,  // Email là bắt buộc
    unique: true,  // Đảm bảo email là duy nhất
  },
  sdt: {
    type: String,  // Số điện thoại
    required: true,  // Số điện thoại là bắt buộc
  },
  diaChi: {
    type: String,  // Địa chỉ
    required: true,  // Địa chỉ là bắt buộc
  },
  ngayTao: {
    type: Date,  // Ngày tạo
    default: Date.now,  // Mặc định là thời gian hiện tại
  },
  ngayCapNhat: {
    type: Date,  // Ngày cập nhật
    default: Date.now,  // Mặc định là thời gian hiện tại
  },
  matkhau:{
    type : String
  }
});

// Tạo model từ Schema
const SinhVien = mongoose.model('SinhVien', sinhVienSchema);

module.exports = SinhVien;
