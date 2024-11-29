const mongoose = require('mongoose');
const { Schema } = mongoose;  // Bạn có thể trực tiếp destructure 'Schema' từ mongoose
const ObjectId = Schema.ObjectId; // Khai báo ObjectId
// Tạo Schema cho Điểm
const diemSchema = new Schema({
    id: { type: ObjectId },
  mssv: {
    type: mongoose.Schema.Types.ObjectId,  // Sử dụng ObjectId tham chiếu đến Sinh Viên
    ref: 'SinhVien',  // Tên mô hình Sinh Viên
    required: true,  // MSSV là bắt buộc
  },
  maMon: {
    type: mongoose.Schema.Types.ObjectId,  // Sử dụng ObjectId tham chiếu đến Môn Học
    ref: 'MonHoc',  // Tên mô hình Môn Học
    required: true,  // Mã môn học là bắt buộc
  },
  diemGiuaKy: {
    type: Number,  // Điểm giữa kỳ
    required: true,  // Điểm giữa kỳ là bắt buộc
    min: [0, 'Điểm giữa kỳ không thể nhỏ hơn 0'], // Điểm phải >= 0
    max: [10, 'Điểm giữa kỳ không thể lớn hơn 10'], // Điểm phải <= 10
  },
  diemCuoiKy: {
    type: Number,  // Điểm cuối kỳ
    required: true,  // Điểm cuối kỳ là bắt buộc
    min: [0, 'Điểm cuối kỳ không thể nhỏ hơn 0'], // Điểm phải >= 0
    max: [10, 'Điểm cuối kỳ không thể lớn hơn 10'], // Điểm phải <= 10
  },
  diemTongKet: {
    type: Number,  // Điểm tổng kết
    required: true,  // Điểm tổng kết là bắt buộc
    min: [0, 'Điểm tổng kết không thể nhỏ hơn 0'], // Điểm phải >= 0
    max: [10, 'Điểm tổng kết không thể lớn hơn 10'], // Điểm phải <= 10
  },
  hocKy: {
    type: Number,  // Học kỳ (1, 2 hoặc 3 tùy vào trường hợp)
    required: true,  // Học kỳ là bắt buộc
    min: [1, 'Học kỳ phải từ 1 trở lên'], // Học kỳ phải >= 1
    max: [3, 'Học kỳ không thể lớn hơn 3'], // Học kỳ phải <= 3
  },
  namHoc: {
    type: String,  // Năm học (ví dụ: "2023-2024")
    required: true,  // Năm học là bắt buộc
  },
});

// Tạo model từ Schema
const Diem = mongoose.model('Diem', diemSchema);

module.exports = Diem;
