const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId; // Khai báo ObjectId
// Kiểm tra xem model 'MonHoc' đã tồn tại chưa, nếu có thì sử dụng model đã tồn tại.
const monHocSchema = new Schema({
  tenMonHoc: {
    type: String,
    required: true,
  },
  maBoMon: {
    type: mongoose.Schema.Types.ObjectId, // Tham chiếu đến Bộ Môn
    ref: 'BoMon', // Mối quan hệ với BoMon
    required: true,
  },
  moTa: {
    type: String,
    required: true,
  },
});
  
  const MonHoc = mongoose.model('MonHoc', monHocSchema);
  