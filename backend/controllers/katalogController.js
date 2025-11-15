import Katalog from '../models/katalogModel.js';
import asyncHandler from 'express-async-handler';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Get all catalog items with filtering and pagination
// @route   GET /api/katalog
// @access  Public
const getKatalog = asyncHandler(async (req, res) => {
  const {
    search,
    kategori,
    status,
    page = 1,
    limit = 10,
    sort = 'createdAt',
    order = 'desc'
  } = req.query;

  // Build query
  let query = {};
  
  // Search by name or description
  if (search) {
    query.$or = [
      { nama: { $regex: search, $options: 'i' } },
      { deskripsi: { $regex: search, $options: 'i' } }
    ];
  }

  // Filter by category
  if (kategori && kategori !== 'semua') {
    query.kategori = kategori;
  }

  // Filter by status
  if (status && status !== 'semua') {
    query.status = status;
  }

  // Sort
  const sortOrder = order === 'desc' ? -1 : 1;
  const sortOptions = {};
  sortOptions[sort] = sortOrder;

  // Pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  // Execute query
  const katalog = await Katalog.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(limitNum)
    .lean();

  // Get total count for pagination
  const total = await Katalog.countDocuments(query);
  const totalPages = Math.ceil(total / limitNum);

  res.json({
    success: true,
    data: katalog,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages,
      hasNext: pageNum < totalPages,
      hasPrev: pageNum > 1
    }
  });
});

// @desc    Get single catalog item
// @route   GET /api/katalog/:id
// @access  Public
const getKatalogById = asyncHandler(async (req, res) => {
  const katalog = await Katalog.findById(req.params.id);

  if (!katalog) {
    res.status(404);
    throw new Error('Barang tidak ditemukan');
  }

  res.json({
    success: true,
    data: katalog
  });
});

// @desc    Create new catalog item
// @route   POST /api/katalog
// @access  Private/Admin
const createKatalog = asyncHandler(async (req, res) => {
  const {
    nama,
    kategori,
    status,
    harga,
    stok,
    maksPeminjaman,
    kualitas,
    deskripsi,
    lokasi,
    spesifikasi
  } = req.body;

  // Basic validation
  if (!nama || !kategori || !harga || !stok || !deskripsi) {
    res.status(400);
    throw new Error('Data wajib tidak lengkap');
  }

  // Process specifications
  let processedSpesifikasi = [];
  if (spesifikasi && Array.isArray(spesifikasi)) {
    processedSpesifikasi = spesifikasi.filter(spec => spec.trim() !== '').map(spec => {
      // Split by colon or use as name only
      const parts = spec.split(':');
      if (parts.length >= 2) {
        return {
          nama: parts[0].trim(),
          nilai: parts.slice(1).join(':').trim()
        };
      } else {
        return {
          nama: 'Spesifikasi',
          nilai: spec.trim()
        };
      }
    });
  }

  // Process images from request
  const gambar = [];
  if (req.files && req.files.length > 0) {
    req.files.forEach((file, index) => {
      gambar.push({
        url: `/uploads/${file.filename}`,
        namaFile: file.filename,
        isThumbnail: index === 0 // First image as thumbnail
      });
    });
  }

  const katalog = await Katalog.create({
    nama,
    gambar,
    kategori,
    status: status || 'tersedia',
    harga: parseInt(harga),
    stok: parseInt(stok),
    maksPeminjaman,
    kualitas: kualitas || 'Bagus',
    deskripsi,
    lokasi: lokasi || 'Gudang Utama',
    spesifikasi: processedSpesifikasi,
    totalDipinjam: 0,
    rating: 0
  });

  res.status(201).json({
    success: true,
    message: 'Barang berhasil ditambahkan',
    data: katalog
  });
});

// @desc    Update catalog item
// @route   PUT /api/katalog/:id
// @access  Private/Admin
const updateKatalog = asyncHandler(async (req, res) => {
  const katalog = await Katalog.findById(req.params.id);

  if (!katalog) {
    res.status(404);
    throw new Error('Barang tidak ditemukan');
  }

  const {
    nama,
    kategori,
    status,
    harga,
    stok,
    maksPeminjaman,
    kualitas,
    deskripsi,
    lokasi,
    spesifikasi,
    existingImages // Array of existing image IDs to keep
  } = req.body;

  // Process specifications
  let processedSpesifikasi = [];
  if (spesifikasi && Array.isArray(spesifikasi)) {
    processedSpesifikasi = spesifikasi.filter(spec => spec.trim() !== '').map(spec => {
      const parts = spec.split(':');
      if (parts.length >= 2) {
        return {
          nama: parts[0].trim(),
          nilai: parts.slice(1).join(':').trim()
        };
      } else {
        return {
          nama: 'Spesifikasi',
          nilai: spec.trim()
        };
      }
    });
  }

  // Process existing images
  let currentGambar = katalog.gambar;
  if (existingImages) {
    // Filter existing images to keep only the ones specified
    currentGambar = currentGambar.filter(img => 
      existingImages.includes(img._id.toString())
    );
  } else {
    // If no existing images specified, keep all
    currentGambar = katalog.gambar;
  }

  // Add new images
  const newGambar = [];
  if (req.files && req.files.length > 0) {
    req.files.forEach((file, index) => {
      newGambar.push({
        url: `/uploads/${file.filename}`,
        namaFile: file.filename,
        isThumbnail: currentGambar.length === 0 && index === 0 // Set as thumbnail if no images exist
      });
    });
  }

  // Update katalog data
  const updatedData = {
    nama: nama || katalog.nama,
    kategori: kategori || katalog.kategori,
    status: status || katalog.status,
    harga: harga ? parseInt(harga) : katalog.harga,
    stok: stok ? parseInt(stok) : katalog.stok,
    maksPeminjaman: maksPeminjaman || katalog.maksPeminjaman,
    kualitas: kualitas || katalog.kualitas,
    deskripsi: deskripsi || katalog.deskripsi,
    lokasi: lokasi || katalog.lokasi,
    spesifikasi: processedSpesifikasi.length > 0 ? processedSpesifikasi : katalog.spesifikasi,
    gambar: [...currentGambar, ...newGambar]
  };

  const updatedKatalog = await Katalog.findByIdAndUpdate(
    req.params.id,
    updatedData,
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    message: 'Barang berhasil diperbarui',
    data: updatedKatalog
  });
});

// @desc    Delete catalog item
// @route   DELETE /api/katalog/:id
// @access  Private/Admin
const deleteKatalog = asyncHandler(async (req, res) => {
  const katalog = await Katalog.findById(req.params.id);

  if (!katalog) {
    res.status(404);
    throw new Error('Barang tidak ditemukan');
  }

  // Delete associated images from filesystem
  if (katalog.gambar && katalog.gambar.length > 0) {
    for (const image of katalog.gambar) {
      try {
        const imagePath = path.join(__dirname, '../uploads', image.namaFile);
        await fs.unlink(imagePath);
      } catch (error) {
        console.log(`Gagal menghapus gambar: ${image.namaFile}`, error);
      }
    }
  }

  await Katalog.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Barang berhasil dihapus'
  });
});

// @desc    Toggle item status
// @route   PATCH /api/katalog/:id/toggle-status
// @access  Private/Admin
const toggleStatus = asyncHandler(async (req, res) => {
  const katalog = await Katalog.findById(req.params.id);

  if (!katalog) {
    res.status(404);
    throw new Error('Barang tidak ditemukan');
  }

  katalog.status = katalog.status === 'tersedia' ? 'tidak_tersedia' : 'tersedia';
  await katalog.save();

  res.json({
    success: true,
    message: `Status berhasil diubah menjadi ${katalog.status}`,
    data: katalog
  });
});

// @desc    Get catalog statistics
// @route   GET /api/katalog/stats
// @access  Private/Admin
const getKatalogStats = asyncHandler(async (req, res) => {
  const stats = await Katalog.aggregate([
    {
      $group: {
        _id: null,
        totalBarang: { $sum: 1 },
        totalStok: { $sum: '$stok' },
        totalTersedia: {
          $sum: {
            $cond: [{ $eq: ['$status', 'tersedia'] }, 1, 0]
          }
        },
        totalTidakTersedia: {
          $sum: {
            $cond: [{ $eq: ['$status', 'tidak_tersedia'] }, 1, 0]
          }
        },
        totalOutdoor: {
          $sum: {
            $cond: [{ $eq: ['$kategori', 'outdoor'] }, 1, 0]
          }
        },
        totalIndoor: {
          $sum: {
            $cond: [{ $eq: ['$kategori', 'indoor'] }, 1, 0]
          }
        },
        totalDipinjam: { $sum: '$totalDipinjam' }
      }
    }
  ]);

  const result = stats[0] || {
    totalBarang: 0,
    totalStok: 0,
    totalTersedia: 0,
    totalTidakTersedia: 0,
    totalOutdoor: 0,
    totalIndoor: 0,
    totalDipinjam: 0
  };

  res.json({
    success: true,
    data: result
  });
});

export {
  getKatalog,
  getKatalogById,
  createKatalog,
  updateKatalog,
  deleteKatalog,
  toggleStatus,
  getKatalogStats
};