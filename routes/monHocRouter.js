const express = require('express');
const MonHoc = require('../models/momhocModels'); // Import model MonHoc
const router = express.Router();

// Truy vấn tất cả Môn Học
router.get('/', async (req, res) => {
  try {
    const monHocs = await MonHoc.find().populate('maBoMon'); // Lấy tất cả môn học và thông tin về maBoMon nếu có
    res.status(200).json(monHocs); // Trả về kết quả
  } catch (err) {
    res.status(500).json({ message: err.message }); // Trả về lỗi nếu có
  }
});

module.exports = router;
