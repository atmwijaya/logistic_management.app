import mongoose from 'mongoose';

const spesifikasiSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  nilai: {
    type: String,
    required: true
  }
});

const katalogSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, 'Nama barang wajib diisi'],
    trim: true,
    maxlength: [100, 'Nama barang maksimal 100 karakter']
  },
  gambar: [{
    url: {
      type: String,
      required: true
    },
    namaFile: {
      type: String,
      required: true
    },
    isThumbnail: {
      type: Boolean,
      default: false
    }
  }],
  kategori: {
    type: String,
    required: [true, 'Kategori wajib diisi'],
    enum: {
      values: ['outdoor', 'indoor'],
      message: 'Kategori harus outdoor atau indoor'
    }
  },
  status: {
    type: String,
    required: [true, 'Status wajib diisi'],
    enum: {
      values: ['tersedia', 'tidak_tersedia'],
      message: 'Status harus tersedia atau tidak_tersedia'
    },
    default: 'tersedia'
  },
  harga: {
    type: Number,
    required: [true, 'Harga wajib diisi'],
    min: [0, 'Harga tidak boleh negatif']
  },
  stok: {
    type: Number,
    required: [true, 'Stok wajib diisi'],
    min: [0, 'Stok tidak boleh negatif'],
    default: 0
  },
  maksPeminjaman: {
    type: String,
    required: [true, 'Maksimal peminjaman wajib diisi'],
    trim: true
  },
  kualitas: {
    type: String,
    required: [true, 'Kualitas wajib diisi'],
    enum: {
      values: ['Sangat Bagus', 'Bagus', 'Baik'],
      message: 'Kualitas harus Sangat Bagus, Bagus, atau Baik'
    }
  },
  deskripsi: {
    type: String,
    required: [true, 'Deskripsi wajib diisi'],
    minlength: [50, 'Deskripsi minimal 50 karakter'],
    maxlength: [2000, 'Deskripsi maksimal 2000 karakter']
  },
  lokasi: {
    type: String,
    required: [true, 'Lokasi wajib diisi'],
    enum: {
      values: ['Gudang Utama', 'Gudang A', 'Gudang B'],
      message: 'Lokasi harus Gudang Utama, Gudang A, atau Gudang B'
    }
  },
  spesifikasi: [spesifikasiSchema],
  totalDipinjam: {
    type: Number,
    default: 0,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index untuk pencarian
katalogSchema.index({ 
  nama: 'text', 
  deskripsi: 'text',
  kategori: 1,
  status: 1
});

// Virtual untuk URL barang
katalogSchema.virtual('url').get(function() {
  return `/katalog/${this._id}`;
});

// Method untuk update status
katalogSchema.methods.toggleStatus = function() {
  this.status = this.status === 'tersedia' ? 'tidak_tersedia' : 'tersedia';
  return this.save();
};

// Static method untuk mencari berdasarkan kategori
katalogSchema.statics.findByCategory = function(category) {
  return this.find({ kategori: category });
};

// Static method untuk barang tersedia
katalogSchema.statics.findAvailable = function() {
  return this.find({ status: 'tersedia', stok: { $gt: 0 } });
};

// Middleware untuk update updatedAt sebelum save
katalogSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Katalog', katalogSchema);