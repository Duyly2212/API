const express = require('express');
const Khoa = require('../models/khoaModels'); // Import model Khoa
const router = express.Router();

// Truy vấn tất cả Khoa
router.get('/', async (req, res) => {
  try {
    const khoas = await Khoa.find();
    res.status(200).json(khoas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm Khoa mới
router.post('/', async (req, res) => {
  const khoa = new Khoa({
    tenKhoa: req.body.tenKhoa,
    moTa: req.body.moTa
  });

  try {
    const newKhoa = await khoa.save();
    res.status(201).json(newKhoa);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Sửa thông tin Khoa
router.put('/:id', async (req, res) => {
  try {
    const khoa = await Khoa.findById(req.params.id);
    if (!khoa) return res.status(404).json({ message: 'Khoa not found' });

    khoa.tenKhoa = req.body.tenKhoa || khoa.tenKhoa;
    khoa.moTa = req.body.moTa || khoa.moTa;

    const updatedKhoa = await khoa.save();
    res.status(200).json(updatedKhoa);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa Khoa
router.delete('/:id', async (req, res) => {
  try {
    const khoa = await Khoa.findById(req.params.id);
    if (!khoa) return res.status(404).json({ message: 'Khoa not found' });

    await khoa.remove();
    res.status(200).json({ message: 'Khoa deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
