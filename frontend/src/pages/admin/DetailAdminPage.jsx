import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Package,
  Calendar, 
  Users, 
  MapPin, 
  Star, 
  Shield, 
  Clock,
  CheckCircle,
  Truck,
  Eye,
  MoreVertical,
  Share2
} from 'lucide-react';

const DetailAdminPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Mock data - dalam implementasi nyata, data ini akan diambil dari API berdasarkan ID
  const barangDetail = {
    id: parseInt(id),
    nama: "Tenda Dome 4 Person",
    gambar: [
      "https://images.unsplash.com/photo-1571687949921-1306bfb24c72?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&h=600&fit=crop&crop=center"
    ],
    kategori: "outdoor",
    status: "tersedia",
    totalDipinjam: 42,
    maksPeminjaman: "7 hari",
    kualitas: "Bagus",
    deskripsi: "Tenda dome kapasitas 4 orang dengan desain modern dan material berkualitas tinggi. Dilengkapi dengan waterproof coating yang membuatnya tahan terhadap hujan dan embun. Cocok untuk camping keluarga atau kegiatan outdoor kelompok kecil.",
    spesifikasi: [
      "Kapasitas: 4 orang",
      "Material: Polyester 210T dengan coating PU 3000mm",
      "Dimensi: 220 x 220 x 130 cm",
      "Berat: 3.8 kg",
      "Warna: Orange/Abu-abu",
      "Frame: Aluminium alloy",
      "Waterproof: Yes (3000mm)"
    ],
    harga: 25000,
    rating: 4.8,
    totalUlasan: 24,
    lokasi: "Gudang Utama",
    stok: 5,
    kondisi: "Baik",
    catatan: "Barang sudah termasuk tas carrier dan poles tenda",
    createdAt: "2024-01-15",
    updatedAt: "2024-12-01"
  };

  const relatedBarang = [
    {
      id: 3,
      nama: "Sleeping Bag -5°C",
      gambar: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=300&fit=crop&crop=center",
      harga: 12000,
      status: "tersedia"
    },
    {
      id: 4,
      nama: "Carrier 60L Expedition",
      gambar: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop&crop=center",
      harga: 20000,
      status: "tersedia"
    },
    {
      id: 11,
      nama: "Cooler Box 50L",
      gambar: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
      harga: 12000,
      status: "tersedia"
    }
  ];

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/barang/${barangDetail.id}`;
    if (navigator.share) {
      navigator.share({
        title: barangDetail.nama,
        text: barangDetail.deskripsi,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Link berhasil disalin!');
      });
    }
  };

  const handleEdit = () => {
    navigate(`/admin/editkatalog/${barangDetail.id}`);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Simulasi delete action
    console.log('Menghapus barang dengan ID:', barangDetail.id);
    alert('Barang berhasil dihapus!');
    navigate('/admin/barang');
  };

  const toggleStatus = () => {
    // Simulasi toggle status
    const newStatus = barangDetail.status === 'tersedia' ? 'tidak_tersedia' : 'tersedia';
    console.log('Mengubah status menjadi:', newStatus);
    alert(`Status berhasil diubah menjadi ${newStatus === 'tersedia' ? 'Tersedia' : 'Tidak Tersedia'}`);
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  const getStatusColor = (status) => {
    return status === 'tersedia' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getStatusText = (status) => {
    return status === 'tersedia' ? 'Tersedia' : 'Tidak Tersedia';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/admin/daftarkatalog')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Katalog</span>
          </button>

          {/* Admin Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleStatus}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                barangDetail.status === 'tersedia'
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {barangDetail.status === 'tersedia' ? 'Set Tidak Tersedia' : 'Set Tersedia'}
            </button>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleShare}
                className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all duration-300"
                title="Bagikan"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleEdit}
                className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-all duration-300"
                title="Edit Barang"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={handleDelete}
                className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all duration-300"
                title="Hapus Barang"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={barangDetail.gambar[selectedImage]}
                alt={barangDetail.nama}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {barangDetail.gambar.map((gambar, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-white rounded-xl shadow-md overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index ? 'border-blue-500 scale-105' : 'border-transparent'
                  }`}
                >
                  <img
                    src={gambar}
                    alt={`${barangDetail.nama} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full mb-3">
                    {barangDetail.kategori.toUpperCase()}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {barangDetail.nama}
                  </h1>
                </div>
              </div>

              {/* Rating and Stats */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold text-gray-800">{barangDetail.rating}</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">{barangDetail.totalUlasan} ulasan</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">{barangDetail.totalDipinjam}x dipinjam</span>
              </div>

              {/* Status */}
              <div className="flex items-center space-x-4 mb-6">
                <span className={`px-4 py-2 rounded-full font-medium ${getStatusColor(barangDetail.status)}`}>
                  {getStatusText(barangDetail.status)}
                </span>
                <span className="text-gray-600">
                  Stok: <strong>{barangDetail.stok} unit</strong>
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-4xl font-bold text-gray-800">
                  {formatRupiah(barangDetail.harga)}
                </span>
                <span className="text-gray-500">/hari</span>
              </div>
              <p className="text-gray-600 text-sm">
                Minimum peminjaman 1 hari, maksimal {barangDetail.maksPeminjaman}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <Shield className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Kualitas</p>
                    <p className="font-semibold text-gray-800">{barangDetail.kualitas}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Lokasi</p>
                    <p className="font-semibold text-gray-800">{barangDetail.lokasi}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleEdit}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Edit className="w-5 h-5" />
                <span>Edit Barang</span>
              </button>
              <button
                onClick={toggleStatus}
                className={`flex-1 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
                  barangDetail.status === 'tersedia'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                <CheckCircle className="w-5 h-5" />
                <span>
                  {barangDetail.status === 'tersedia' ? 'Set Tidak Tersedia' : 'Set Tersedia'}
                </span>
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>Informasi Admin</span>
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <Truck className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Pengambilan barang di {barangDetail.lokasi}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Clock className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Maksimal peminjaman {barangDetail.maksPeminjaman}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Users className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Total dipinjam: {barangDetail.totalDipinjam} kali</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Package className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Dibuat: {barangDetail.createdAt} • Diupdate: {barangDetail.updatedAt}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Description & Specifications */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Deskripsi Barang</h2>
              <p className="text-gray-600 leading-relaxed">
                {barangDetail.deskripsi}
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">
                  <strong>Catatan Admin:</strong> {barangDetail.catatan}
                </p>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Spesifikasi Teknis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {barangDetail.spesifikasi.map((spec, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products & Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Aksi Cepat</h2>
              <div className="space-y-3">
                <button
                  onClick={handleEdit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Barang</span>
                </button>
                <button
                  onClick={toggleStatus}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    barangDetail.status === 'tersedia'
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>
                    {barangDetail.status === 'tersedia' ? 'Set Tidak Tersedia' : 'Set Tersedia'}
                  </span>
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Hapus Barang</span>
                </button>
                <button
                  onClick={handleShare}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Bagikan</span>
                </button>
              </div>
            </div>

            {/* Related Products */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Barang Terkait</h2>
              <div className="space-y-4">
                {relatedBarang.map((barang) => (
                  <div
                    key={barang.id}
                    className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors duration-300"
                    onClick={() => navigate(`/admin/barang/detail/${barang.id}`)}
                  >
                    <img
                      src={barang.gambar}
                      alt={barang.nama}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 line-clamp-1">
                        {barang.nama}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-800">
                          {formatRupiah(barang.harga)}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          barang.status === 'tersedia' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {barang.status === 'tersedia' ? 'Tersedia' : 'Dipinjam'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Hapus Barang</h3>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus <strong>{barangDetail.nama}</strong>? 
              Tindakan ini tidak dapat dibatalkan dan semua data peminjaman terkait akan terpengaruh.
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

export default DetailAdminPage;