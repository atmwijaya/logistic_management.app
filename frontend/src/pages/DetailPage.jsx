import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Share2, 
  Calendar, 
  Users, 
  MapPin, 
  Star, 
  Shield, 
  Clock, 
  CheckCircle,
  Truck,
  Package,
  Heart
} from 'lucide-react';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

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
    createdAt: "2024-01-15"
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
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: barangDetail.nama,
        text: barangDetail.deskripsi,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Link berhasil disalin!');
      }).catch(() => {
        prompt('Salin link berikut:', shareUrl);
      });
    }
  };

  const handlePinjam = () => {
    navigate(`/pinjam/${barangDetail.id}`);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors duration-300 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Katalog</span>
        </button>

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
                  <h1 className="text-3xl font-bold text-slate-800 mb-2">
                    {barangDetail.nama}
                  </h1>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center space-x-4 mb-6">
                <span className={`px-4 py-2 rounded-full font-medium ${getStatusColor(barangDetail.status)}`}>
                  {getStatusText(barangDetail.status)}
                </span>
                <span className="text-slate-600">
                  Stok: <strong>{barangDetail.stok} unit</strong>
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-4xl font-bold text-slate-800">
                  {formatRupiah(barangDetail.harga)}
                </span>
                <span className="text-slate-500">/hari</span>
              </div>
              <p className="text-slate-600 text-sm">
                Minimum peminjaman 1 hari, maksimal {barangDetail.maksPeminjaman}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100">
                <div className="flex items-center space-x-3">
                  <Shield className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-sm text-slate-500">Kualitas</p>
                    <p className="font-semibold text-slate-800">{barangDetail.kualitas}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-sm text-slate-500">Lokasi</p>
                    <p className="font-semibold text-slate-800">{barangDetail.lokasi}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleShare}
                className="flex-1 bg-white border border-slate-300 text-slate-700 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Share2 className="w-5 h-5" />
                <span>Bagikan</span>
              </button>
              <button
                onClick={handlePinjam}
                disabled={barangDetail.status !== 'tersedia'}
                className={`flex-1 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
                  barangDetail.status === 'tersedia'
                    ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Package className="w-5 h-5" />
                <span>Pinjam Sekarang</span>
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>Informasi Penting</span>
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
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
                  <span>DP 50% diperlukan untuk pemesanan</span>
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
              <h2 className="text-xl font-bold text-slate-800 mb-4">Deskripsi Barang</h2>
              <p className="text-slate-600 leading-relaxed">
                {barangDetail.deskripsi}
              </p>
              <div className="mt-4 p-4 bg-slate-50 rounded-xl">
                <p className="text-sm text-slate-600">
                  <strong>Catatan:</strong> {barangDetail.catatan}
                </p>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Spesifikasi Teknis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {barangDetail.spesifikasi.map((spec, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-slate-600">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Barang Terkait</h2>
            <div className="space-y-4">
              {relatedBarang.map((barang) => (
                <div
                  key={barang.id}
                  className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/barang/${barang.id}`)}
                >
                  <div className="flex space-x-4">
                    <img
                      src={barang.gambar}
                      alt={barang.nama}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 line-clamp-2">
                        {barang.nama}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-lg font-bold text-slate-800">
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;