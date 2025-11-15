import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Share2, 
  Grid, 
  List, 
  Plus, 
  Edit, 
  Trash2, 
  Package,
  Eye,
  EyeOff,
  MoreVertical
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const KatalogAdminPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [statusFilter, setStatusFilter] = useState('semua');
  const [layoutMode, setLayoutMode] = useState('grid'); // 'grid' or 'list'
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBarang, setSelectedBarang] = useState(null);
  const [barangData, setBarangData] = useState([]);

  // Data barang awal
  const initialBarangData = [
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
      lokasi: "Gudang Utama",
      stok: 5,
      createdAt: "2024-01-15"
    },
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
      lokasi: "Gudang Utama",
      stok: 3,
      createdAt: "2024-01-10"
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
      lokasi: "Gudang A",
      stok: 8,
      createdAt: "2024-01-08"
    },
    {
      id: 4,
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
      lokasi: "Gudang Utama",
      stok: 12,
      createdAt: "2024-01-05"
    },
    {
      id: 5,
      nama: "Speaker Bluetooth Outdoor",
      gambar: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop&crop=center",
      kategori: "outdoor",
      status: "tidak_tersedia",
      totalDipinjam: 33,
      maksPeminjaman: "10 hari",
      kualitas: "Sangat Bagus",
      deskripsi: "Speaker Bluetooth tahan air dan debu, suara jernih dengan baterai tahan lama hingga 12 jam.",
      harga: 18000,
      rating: 4.7,
      lokasi: "Gudang B",
      stok: 2,
      createdAt: "2024-01-03"
    },
    {
      id: 6,
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
      lokasi: "Gudang A",
      stok: 6,
      createdAt: "2024-01-02"
    }
  ];

  useEffect(() => {
    setBarangData(initialBarangData);
  }, []);

  // Filter barang
  const filteredBarang = barangData.filter(barang => {
    const matchesSearch = barang.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         barang.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'semua' || barang.kategori === selectedCategory;
    const matchesStatus = statusFilter === 'semua' || barang.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

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

  const handleShare = (barangId) => {
    const shareUrl = `${window.location.origin}/katalog/${barangId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Link berhasil disalin!');
    });
  };

  const handleEdit = (barang) => {
    // Navigate to edit page
    navigate(`/admin/editkatalog/${barang.id}`);
  };

  const handleDelete = (barang) => {
    setSelectedBarang(barang);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setBarangData(prev => prev.filter(item => item.id !== selectedBarang.id));
    setShowDeleteModal(false);
    setSelectedBarang(null);
  };

  const handleAddNew = () => {
    // Navigate to add new item page
    navigate('/admin/createkatalog');
  };

  const handleDetail = (barangId) => {
    navigate(`/admin/katalog/${barangId}`);
  };

  const toggleStatus = (barangId) => {
    setBarangData(prev => prev.map(item => 
      item.id === barangId 
        ? { ...item, status: item.status === 'tersedia' ? 'tidak_tersedia' : 'tersedia' }
        : item
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Kelola Katalog Barang</h1>
              <p className="text-gray-600">Kelola semua barang inventaris Racana Diponegoro</p>
            </div>
            <button
              onClick={handleAddNew}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Tambah Barang</span>
            </button>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            
            {/* Search Bar */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari barang..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="semua">Semua Status</option>
                <option value="tersedia">Tersedia</option>
                <option value="tidak_tersedia">Tidak Tersedia</option>
              </select>
            </div>

            {/* Layout Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  layoutMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setLayoutMode('list')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  layoutMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-gray-600">
              Menampilkan {filteredBarang.length} barang
            </span>
          </div>
        </div>

        {/* Grid Layout */}
        {layoutMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredBarang.map((barang) => (
              <div
                key={barang.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                onClick={() => handleDetail(barang.id)}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={barang.gambar}
                    alt={barang.nama}
                    className="w-full h-48 object-cover"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(barang.status)}`}>
                      {getStatusText(barang.status)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title and Category */}
                  <div className="mb-3">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full mb-2">
                      {barang.kategori.toUpperCase()}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                      {barang.nama}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {barang.deskripsi}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Stok:</span> {barang.stok}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Dipinjam:</span> {barang.totalDipinjam}x
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Maks:</span> {barang.maksPeminjaman}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className={`px-2 py-1 rounded-full text-xs ${getKualitasColor(barang.kualitas)}`}>
                        {barang.kualitas}
                      </span>
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-800">{formatRupiah(barang.harga)}</span>
                      <span className="text-gray-500 text-sm block">/hari</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleShare(barang.id)}
                        className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all duration-300"
                        title="Bagikan"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(barang)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all duration-300"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(barang)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all duration-300"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List Layout */}
        {layoutMode === 'list' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Barang</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Kategori</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Stok</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Harga</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBarang.map((barang) => (
                  <tr key={barang.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={barang.gambar}
                          alt={barang.nama}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{barang.nama}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{barang.deskripsi}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                        {barang.kategori.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleStatus(barang.id)}
                          className={`w-8 h-4 rounded-full transition-colors duration-300 ${
                            barang.status === 'tersedia' ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <div className={`w-3 h-3 bg-white rounded-full transform transition-transform duration-300 ${
                            barang.status === 'tersedia' ? 'translate-x-4' : 'translate-x-1'
                          }`}></div>
                        </button>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(barang.status)}`}>
                          {getStatusText(barang.status)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium text-gray-900">{barang.stok}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-gray-900">{formatRupiah(barang.harga)}</span>
                      <span className="text-gray-500 text-sm block">/hari</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleShare(barang.id)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                          title="Bagikan"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(barang)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(barang)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBarang.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Tidak ada barang yang ditemukan</p>
              </div>
            )}
          </div>
        )}

        {/* No Results */}
        {filteredBarang.length === 0 && layoutMode === 'grid' && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Barang tidak ditemukan</h3>
            <p className="text-gray-500 mb-6">
              Coba ubah filter pencarian atau tambah barang baru
            </p>
            <button
              onClick={handleAddNew}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
            >
              Tambah Barang Baru
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Hapus Barang</h3>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus <strong>{selectedBarang?.nama}</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-300"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors duration-300"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KatalogAdminPage;