import React, { useState } from 'react';
import web from '../utils/web'

export const postModalAwal = async (credentials) => {
  try {
    const response = await web.post('/setModal', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const InitialFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modal, setHarga] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  if (!isOpen) return null;

  const formatNumber = (number) => {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const formattedValue = value.replace(/\D/g, ''); // Menghapus karakter non-digit
    const harga = formatNumber(formattedValue); // Format angka dengan titik pemisah
    setHarga(harga);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      const responseData = await postModalAwal({ username, password, awal: modal });
      onClose();
      alert(responseData.message);
    } catch (error) {
      setError('Please check your input')
    }
  };

  const Spinner = () => (
    <div>
      <svg aria-hidden="true" role="status" class="inline w-5 h-5 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
      </svg>
      <span className='pl-1'>Loading..</span>
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black glass" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-96">
        <div className="text-center">
          <img src="img/logo.png" className="w-10 m-auto filter grayscale" />
          <h2 className="text-xl font-semibold">ACTIRY POS</h2>
          <p>CABANG SUNAGARA</p>
        </div>
        <hr className="my-2" />
        <div className='text-center'>
          <h3 className="text-lg font-bold mb-4">Modal Awal</h3>
        </div>
        {error !== '' &&
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5" role="alert">
            <strong class="font-bold">Failed! </strong>
            <span class="block sm:inline">{error}</span>
            <span onClick={() => setError('')} class="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>
          </div>
        }
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="inline-block text-gray-700 text-sm mb-2 font-semibold" htmlFor="namaKasir">
              Nama Kasir
            </label>
            <input
              type="text"
              id="namaKasir"
              name="namaKasir"
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nama Kasir"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="inline-block text-gray-700 text-sm mb-2 font-semibold" htmlFor="modalAwal">
              Modal Awal
            </label>
            <input
              type="text"
              id="modal"
              name="modal"
              value={modal}
              onChange={handleChange}
              className="shadow w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Rp 0"
              required
            />
          </div>
          <div className="mb-6">
            <label className="inline-block text-gray-700 text-sm mb-2 font-semibold" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="***********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit" disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white text-lg py-2 px-4 rounded-lg focus:outline-none hover:bg-cyan-700"
            >
              {loading ? <Spinner /> : 'Submit'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white text-lg py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InitialFormModal;
