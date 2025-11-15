import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance dengan base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Admin API key (simpan di .env untuk production)
const ADMIN_API_KEY = 'racana_admin_secret_2024';

// Interceptor untuk request
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Katalog API functions
export const katalogAPI = {
  // Get all items dengan filter
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/katalog', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Gagal mengambil data katalog');
    }
  },

  // Get single item by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/katalog/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Gagal mengambil data barang');
    }
  },

  // Create new item
  create: async (formData) => {
    try {
      const response = await api.post('/katalog', formData, {
        headers: {
          'x-api-key': ADMIN_API_KEY,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Gagal menambah barang');
    }
  },

  // Update item
  update: async (id, formData) => {
    try {
      const response = await api.put(`/katalog/${id}`, formData, {
        headers: {
          'x-api-key': ADMIN_API_KEY,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Gagal mengupdate barang');
    }
  },

  // Delete item
  delete: async (id) => {
    try {
      const response = await api.delete(`/katalog/${id}`, {
        headers: {
          'x-api-key': ADMIN_API_KEY
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Gagal menghapus barang');
    }
  },

  // Toggle status
  toggleStatus: async (id) => {
    try {
      const response = await api.patch(`/katalog/${id}/toggle-status`, {}, {
        headers: {
          'x-api-key': ADMIN_API_KEY
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Gagal mengubah status');
    }
  },

  // Get statistics
  getStats: async () => {
    try {
      const response = await api.get('/katalog/stats', {
        headers: {
          'x-api-key': ADMIN_API_KEY
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Gagal mengambil statistik');
    }
  }
};

export default api;