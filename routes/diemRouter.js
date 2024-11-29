const express = require('express');
const router = express.Router(); // Khởi tạo router
const Diem = require('../models/diemModels'); // Import model Diem
const JWT = require('jsonwebtoken');
const config = require("../ulti/config");
// Truy vấn tất cả điểm
router.get('/', async (req, res) => {
  try {

    const token = req.header("Authorization").split(' ')[1];
  if(token){
    JWT.verify(token, config.SECRETKEY, async function (err, id){
      if(err){
        res.status(403).json({"status": 403, "err": err});
      }else{
        const diems = await Diem.find().populate('mssv maMon'); // Populate các trường tham chiếu
        res.status(200).json(diems);
        //xử lý chức năng tương ứng với API
      }
    });
  }else{
    res.status(401).json({"status": 401});
  }

   
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm điểm mới
router.post('/', async (req, res) => {
  const diem = new Diem({
    mssv: req.body.mssv,
    maMon: req.body.maMon,
    diemGiuaKy: req.body.diemGiuaKy,
    diemCuoiKy: req.body.diemCuoiKy,
    diemTongKet: req.body.diemTongKet,
    hocKy: req.body.hocKy,
    namHoc: req.body.namHoc
  });

  try {
    const newDiem = await diem.save(); // Lưu điểm mới vào cơ sở dữ liệu
    res.status(201).json(newDiem); // Trả về điểm mới đã được lưu
  } catch (err) {
    res.status(400).json({ message: err.message }); // Trả về lỗi nếu có
  }
});

// Sửa thông tin điểm
router.put('/:id', async (req, res) => {
  try {
    const diem = await Diem.findById(req.params.id); // Tìm điểm theo ID
    if (!diem) return res.status(404).json({ message: 'Diem not found' }); // Nếu không tìm thấy điểm

    // Cập nhật các trường của điểm
    diem.diemGiuaKy = req.body.diemGiuaKy || diem.diemGiuaKy;
    diem.diemCuoiKy = req.body.diemCuoiKy || diem.diemCuoiKy;
    diem.diemTongKet = req.body.diemTongKet || diem.diemTongKet;
    diem.hocKy = req.body.hocKy || diem.hocKy;
    diem.namHoc = req.body.namHoc || diem.namHoc;

    const updatedDiem = await diem.save(); // Lưu điểm đã sửa
    res.status(200).json(updatedDiem); // Trả về điểm đã sửa
  } catch (err) {
    res.status(400).json({ message: err.message }); // Trả về lỗi nếu có
  }
});

// Xóa điểm
router.delete('/:id', async (req, res) => {
  try {
    const diem = await Diem.findById(req.params.id); // Tìm điểm theo ID
    if (!diem) return res.status(404).json({ message: 'Diem not found' }); // Nếu không tìm thấy điểm

    await diem.remove(); // Xóa điểm
    res.status(200).json({ message: 'Diem deleted' }); // Trả về thông báo xóa thành công
  } catch (err) {
    res.status(400).json({ message: err.message }); // Trả về lỗi nếu có
  }
});

module.exports = router; // Xuất router đúng cách
