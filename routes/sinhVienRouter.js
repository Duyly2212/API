const express = require('express');
const sinhvien = require('../models/sinhvienModels'); // Import model SinhVien
const router = express.Router();
const JWT = require('jsonwebtoken');
const config = require("../ulti/config");

// API đăng nhập
router.post('/login', async function (req, res) {
  try {
      const { sdt, pass } = req.body;
      const checkUser = await sinhvien.findOne({ sdt: sdt, matkhau: pass });

      if (checkUser == null) {
          res.status(400).json({ status: false, message: "Tên đăng nhập hoặc mật khẩu không đúng" });
      } else {
          var token = JWT.sign({sdt: sdt}, config.SECRETKEY, {expiresIn: '30s'});
          var reftoken = JWT.sign({sdt: sdt}, config.SECRETKEY, {expiresIn: '1h'});

          res.status(200).json({ status: true, message: "Đăng nhập thành công", token: token, reftoken: reftoken });
      }
  } catch (e) {
      console.error("Lỗi xảy ra khi đăng nhập:", e); // In chi tiết lỗi vào console
      res.status(400).json({ status: false, message: "Đã có lỗi xảy ra" });
  }
});

// Truy vấn tất cả Sinh Viên
router.get('/', async (req, res) => {
  try {
    const sinhViens = await sinhvien.find().populate('maBoMon');
    res.status(200).json(sinhViens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm Sinh Viên mới
router.post('/', async (req, res) => {
  const newSinhvien = new sinhvien({
    hoTen: req.body.hoTen,
    maBoMon: req.body.maBoMon,
    tuoi: req.body.tuoi,
    email: req.body.email,
    sdt: req.body.sdt,
    diaChi: req.body.diaChi,
    ngayTao: new Date(),
    ngayCapNhat: new Date()
  });

  try {
    const savedSinhvien = await newSinhvien.save();
    res.status(201).json(savedSinhvien);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Sửa thông tin Sinh Viên
router.put('/:id', async (req, res) => {
  try {
    const sinhvien = await sinhvien.findById(req.params.id);
    if (!sinhvien) return res.status(404).json({ message: 'Sinhvien not found' });

    sinhvien.hoTen = req.body.hoTen || sinhvien.hoTen;
    sinhvien.maBoMon = req.body.maBoMon || sinhvien.maBoMon;
    sinhvien.tuoi = req.body.tuoi || sinhvien.tuoi;
    sinhvien.email = req.body.email || sinhvien.email;
    sinhvien.sdt = req.body.sdt || sinhvien.sdt;
    sinhvien.diaChi = req.body.diaChi || sinhvien.diaChi;
    sinhvien.ngayCapNhat = new Date();

    const updatedSinhvien = await sinhvien.save();
    res.status(200).json(updatedSinhvien);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa Sinh Viên
router.delete('/:id', async (req, res) => {
  try {
    const sinhvien = await sinhvien.findById(req.params.id);
    if (!sinhvien) return res.status(404).json({ message: 'Sinhvien not found' });

    await sinhvien.remove();
    res.status(200).json({ message: 'Sinhvien deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
