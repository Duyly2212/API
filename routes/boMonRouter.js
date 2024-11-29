const express = require('express');
const bomon = require('../models/bomonModels'); // Import model BoMon
const router = express.Router();
const JWT = require('jsonwebtoken');
const config = require("../ulti/config");

// Truy vấn tất cả Bộ Môn
router.get('/', async (req, res) => {
  try {const token = req.header("Authorization").split(' ')[1];
    if(token){
      JWT.verify(token, config.SECRETKEY, async function (err, id){
        if(err){
          res.status(403).json({"status": 403, "err": err});
        }else{
          //xử lý chức năng tương ứng với API
          const boMons = await bomon.find().populate('maKhoa');
           res.status(200).json(boMons);
        }
      });
    }else{
      res.status(401).json({"status": 401});
    }
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm Bộ Môn mới
router.post('/', async (req, res) => {
  const newBomon = new bomon({
    tenBoMon: req.body.tenBoMon,
    maKhoa: req.body.maKhoa,
    moTa: req.body.moTa
  });

  try {
    const savedBomon = await newBomon.save();
    res.status(201).json(savedBomon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Sửa thông tin Bộ Môn
router.put('/:id', async (req, res) => {
  try {
    const boMon = await bomon.findById(req.params.id);
    if (!boMon) return res.status(404).json({ message: 'Bomon not found' });

    boMon.tenBoMon = req.body.tenBoMon || boMon.tenBoMon;
    boMon.maKhoa = req.body.maKhoa || boMon.maKhoa;
    boMon.moTa = req.body.moTa || boMon.moTa;

    const updatedBomon = await boMon.save();
    res.status(200).json(updatedBomon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa Bộ Môn
router.delete('/:id', async (req, res) => {
  try {
    const boMon = await bomon.findById(req.params.id);
    if (!boMon) return res.status(404).json({ message: 'Bomon not found' });

    await boMon.remove();
    res.status(200).json({ message: 'Bomon deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
