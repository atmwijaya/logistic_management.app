import React, { useState, useEffect } from 'react';
import { Search, Filter, Share2, ArrowUpDown, Calendar, MapPin, Users, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const KatalogPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [priceSort, setPriceSort] = useState('termurah');
  const [statusFilter, setStatusFilter] = useState('semua');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Data barang (sama dengan sebelumnya)
  const allBarang = [
    {
      id: 1,
      nama: "Tenda Dome 4 Person",
      gambar: "https://images.unsplash.com/photo-1571687949921-1306bfb24c72?w=400&h=300&fit=crop&crop=center",
      kategori: "outdoor",
      status: "tersedia",
      totalDipinjam: 42,
      maksPeminjaman: "7 hari",
      kualitas: "Bagus",
      deskripsi: "Tenda dome kapasitas 4 orang, waterproof, cocok untuk camping keluarga atau kelompok kecil.",
      harga: 25000,
      rating: 4.8,
      lokasi: "Gudang Utama"
    },
    // ... data lainnya sama seperti sebelumnya
    {
      id: 2,
      nama: "Kompor Portable Gas",
      gambar: "https://images.unsplash.com/photo-1606811841685-b30c2255c99a?w=400&h=300&fit=crop&crop=center",
      kategori: "outdoor",
      status: "tidak_tersedia",
      totalDipinjam: 38,
      maksPeminjaman: "14 hari",
      kualitas: "Sangat Bagus",
      deskripsi: "Kompor portable dengan sistem gas cartridge, praktis dan mudah dibawa untuk aktivitas outdoor.",
      harga: 15000,
      rating: 4.9,
      lokasi: "Gudang Utama"
    },
    {
      id: 3,
      nama: "Sleeping Bag -5°C",
      gambar: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=300&fit=crop&crop=center",
      kategori: "outdoor",
      status: "tersedia",
      totalDipinjam: 35,
      maksPeminjaman: "10 hari",
      kualitas: "Bagus",
      deskripsi: "Sleeping bag tahan hingga suhu -5°C, bahan waterproof, nyaman untuk camping di daerah dingin.",
      harga: 12000,
      rating: 4.7,
      lokasi: "Gudang A"
    },
    {
      id: 4,
      nama: "Carrier 60L Expedition",
      gambar: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop&crop=center",
      kategori: "outdoor",
      status: "tersedia",
      totalDipinjam: 28,
      maksPeminjaman: "14 hari",
      kualitas: "Sangat Bagus",
      deskripsi: "Carrier kapasitas 60 liter dengan frame internal, cocok untuk pendakian dan expedition panjang.",
      harga: 20000,
      rating: 4.9,
      lokasi: "Gudang Utama"
    },
    {
      id: 5,
      nama: "Nesting Cooking Set",
      gambar: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&crop=center",
      kategori: "outdoor",
      status: "tidak_tersedia",
      totalDipinjam: 31,
      maksPeminjaman: "21 hari",
      kualitas: "Bagus",
      deskripsi: "Set peralatan masak nesting yang praktis, terdiri dari panci, wajan, dan cangkir yang saling menyatu.",
      harga: 10000,
      rating: 4.6,
      lokasi: "Gudang B"
    },
    {
      id: 6,
      nama: "Headlamp LED Waterproof",
      gambar: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&crop=center",
      kategori: "outdoor",
      status: "tersedia",
      totalDipinjam: 45,
      maksPeminjaman: "30 hari",
      kualitas: "Baik",
      deskripsi: "Headlamp LED dengan daya tahan baterai panjang, waterproof IPX4, cocok untuk aktivitas malam.",
      harga: 8000,
      rating: 4.5,
      lokasi: "Gudang A"
    },
    {
      id: 7,
      nama: "Kursi Lipat Portable",
      gambar: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=300&fit=crop&crop=center",
      kategori: "indoor",
      status: "tersedia",
      totalDipinjam: 25,
      maksPeminjaman: "14 hari",
      kualitas: "Bagus",
      deskripsi: "Kursi lipat portable yang ringan dan mudah dibawa, cocok untuk acara indoor dan outdoor ringan.",
      harga: 7000,
      rating: 4.4,
      lokasi: "Gudang Utama"
    },
    {
      id: 8,
      nama: "Speaker Bluetooth Outdoor",
      gambar: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop&crop=center",
      kategori: "outdoor",
      status: "tersedia",
      totalDipinjam: 33,
      maksPeminjaman: "10 hari",
      kualitas: "Sangat Bagus",
      deskripsi: "Speaker Bluetooth tahan air dan debu, suara jernih dengan baterai tahan lama hingga 12 jam.",
      harga: 18000,
      rating: 4.7,
      lokasi: "Gudang B"
    },
    {
      id: 9,
      nama: "Meja Lipat Aluminium",
      gambar: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&crop=center",
      kategori: "indoor",
      status: "tersedia",
      totalDipinjam: 22,
      maksPeminjaman: "21 hari",
      kualitas: "Bagus",
      deskripsi: "Meja lipat aluminium ringan dengan permukaan melamin, cocok untuk berbagai keperluan.",
      harga: 15000,
      rating: 4.3,
      lokasi: "Gudang A"
    },
    {
      id: 10,
      nama: "Tenda Family 6 Person",
      gambar: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?w=400&h=300&fit=crop&crop=center",
      kategori: "outdoor",
      status: "tersedia",
      totalDipinjam: 18,
      maksPeminjaman: "7 hari",
      kualitas: "Sangat Bagus",
      deskripsi: "Tenda keluarga kapasitas 6 orang dengan 2 ruangan, waterproof dan tahan angin.",
      harga: 35000,
      rating: 4.9,
      lokasi: "Gudang Utama"
    },
    {
      id: 11,
      nama: "Cooler Box 50L",
      gambar: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
      kategori: "outdoor",
      status: "tersedia",
      totalDipinjam: 29,
      maksPeminjaman: "5 hari",
      kualitas: "Bagus",
      deskripsi: "Cooler box kapasitas 50 liter dengan insulasi ganda, menjaga suhu hingga 48 jam.",
      harga: 12000,
      rating: 4.6,
      lokasi: "Gudang B"
    },
    {
      id: 12,
      nama: "Hammock Double Size",
      gambar: "https://images.unsplash.com/photo-1548574502-8e53c52c5c6c?w=400&h=300&fit=crop&crop=center",
      kategori: "outdoor",
      status: "tidak_tersedia",
      totalDipinjam: 27,
      maksPeminjaman: "14 hari",
      kualitas: "Baik",
      deskripsi: "Hammock double size dengan material parasut, ringan dan mudah dibawa untuk camping.",
      harga: 9000,
      rating: 4.4,
      lokasi: "Gudang A"
    }
  ];

  // Filter dan sort data
  const filteredBarang = allBarang
    .filter(barang => {
      const matchesSearch = barang.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          barang.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'semua' || barang.kategori === selectedCategory;
      const matchesStatus = statusFilter === 'semua' || barang.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      if (priceSort === 'termurah') {
        return a.harga - b.harga;
      } else {
        return b.harga - a.harga;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredBarang.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBarang.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, priceSort, statusFilter]);

  const handleShare = (barangId, e) => {
    e.stopPropagation(); // Mencegah event bubbling ke parent
    const shareUrl = `${window.location.origin}/barang/${barangId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Link berhasil disalin!');
      }).catch(() => {
        prompt('Salin link berikut:', shareUrl);
      });
    } else {
      prompt('Salin link berikut:', shareUrl);
    }
  };

  const handlePinjam = (barangId, e) => {
    e.stopPropagation(); // Mencegah event bubbling ke parent
    navigate(`/pinjam/${barangId}`);
  };

  const handleDetail = (barangId) => {
    navigate(`/barang/${barangId}`);
  };

  const getStatusColor = (status) => {
    return status === 'tersedia' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getStatusText = (status) => {
    return status === 'tersedia' ? 'Tersedia' : 'Tidak Tersedia';
  };

  const getKualitasColor = (kualitas) => {
    switch (kualitas) {
      case 'Sangat Bagus': return 'text-green-600 bg-green-50';
      case 'Bagus': return 'text-blue-600 bg-blue-50';
      case 'Baik': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Katalog Barang</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Temukan berbagai perlengkapan outdoor dan indoor untuk kebutuhan aktivitas Anda
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            
            {/* Search Bar */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari barang..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="semua">Semua Kategori</option>
                <option value="outdoor">Outdoor</option>
                <option value="indoor">Indoor</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="semua">Semua Status</option>
                <option value="tersedia">Tersedia</option>
                <option value="tidak_tersedia">Tidak Tersedia</option>
              </select>
            </div>
          </div>

          {/* Secondary Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            
            {/* Price Sort */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Urutkan Harga
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPriceSort('termurah')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    priceSort === 'termurah' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <ArrowUpDown className="w-4 h-4" />
                  <span>Termurah</span>
                </button>
                <button
                  onClick={() => setPriceSort('termahal')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    priceSort === 'termahal' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <ArrowUpDown className="w-4 h-4" />
                  <span>Termahal</span>
                </button>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-end">
              <span className="text-slate-600">
                Menampilkan {filteredBarang.length} barang
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentItems.map((barang) => (
            <div
              key={barang.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden group cursor-pointer"
              onClick={() => handleDetail(barang.id)}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={barang.gambar}
                  alt={barang.nama}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(barang.status)}`}>
                    {getStatusText(barang.status)}
                  </span>
                </div>
                {/* Rating Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-slate-700">{barang.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title and Category */}
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full mb-2">
                    {barang.kategori.toUpperCase()}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 line-clamp-1 hover:text-blue-600 transition-colors duration-300">
                    {barang.nama}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {barang.deskripsi}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>{barang.totalDipinjam}x dipinjam</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span>Maks {barang.maksPeminjaman}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 text-green-500" />
                    <span>{barang.lokasi}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <span className={`px-2 py-1 rounded-full text-xs ${getKualitasColor(barang.kualitas)}`}>
                      {barang.kualitas}
                    </span>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-slate-800">{formatRupiah(barang.harga)}</span>
                    <span className="text-slate-500 text-sm block">/hari</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => handleShare(barang.id, e)}
                      className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all duration-300 hover:scale-105"
                      title="Bagikan"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => handlePinjam(barang.id, e)}
                      disabled={barang.status !== 'tersedia'}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        barang.status === 'tersedia'
                          ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
                          : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {barang.status === 'tersedia' ? 'Pinjam' : 'Dipinjam'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {currentItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Barang tidak ditemukan</h3>
            <p className="text-slate-500 mb-6">
              Coba ubah filter pencarian atau kata kunci yang berbeda
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('semua');
                setStatusFilter('semua');
                setPriceSort('termurah');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg p-6">
            <div className="text-slate-600 text-sm">
              Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredBarang.length)} dari {filteredBarang.length} barang
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KatalogPage;