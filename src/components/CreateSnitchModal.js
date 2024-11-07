import React, { useState } from 'react';
import { ethers, BrowserProvider } from 'ethers';
import { uploadToIPFS } from '../services/ipfs';
import { CONTRACT_ADDRESS } from '../contracts/config';
import ContractABI from '../contracts/SnitchPlatform.json';

const categories = [
  { id: 'police', label: 'Police' },
  { id: 'customs', label: 'Customs' },
  { id: 'income-tax', label: 'Income Tax' }
];

export const CreateSnitchModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    city: '',
    location: '',
    media: null
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // 1. Upload media to IPFS if exists
      let mediaCID = '';
      if (formData.media) {
        setIsUploading(true);
        mediaCID = await uploadToIPFS(formData.media);
        setIsUploading(false);
      }

      // 2. Get contract instance
      if (!window.ethereum) throw new Error('Please install MetaMask');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI.abi, signer);

      // 3. Submit transaction based on category
      let transaction;
      switch (formData.category.toLowerCase()) {
        case 'police':
          transaction = await contract.submitPoliceReport(
            formData.description,
            formData.category,
            formData.location || '',
            formData.city,
            mediaCID
          );
          break;

        case 'customs':
          transaction = await contract.submitCustomsReport(
            formData.description,
            formData.category,
            formData.location || '',
            formData.city,
            mediaCID
          );
          break;

        case 'income-tax':
          transaction = await contract.submitIncomeTaxReport(
            formData.description,
            formData.category,
            formData.location || '',
            formData.city,
            mediaCID
          );
          break;

        default:
          throw new Error('Invalid category selected');
      }

      // 4. Wait for transaction to be mined
      const receipt = await transaction.wait();
      setTxHash(receipt.hash);

      // 5. Show success message and close modal
      alert('Snitch created successfully!');
      onClose();

    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to create snitch');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Create a Snitch</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Description *
              </label>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Describe the situation..."
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Category *
              </label>
              <select
                required
                name="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                City *
              </label>
              <input
                required
                type="text"
                name="city"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter city name"
              />
            </div>

            {/* Location (Optional) */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Location <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter specific location"
              />
            </div>

            {/* Media Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Media <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <input
                type="file"
                onChange={(e) => setFormData(prev => ({ ...prev, media: e.target.files[0] }))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                accept="image/*,video/*"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 rounded-xl">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                disabled={isUploading || isSubmitting}
                className="px-6 py-2.5 text-gray-700 font-semibold hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading || isSubmitting}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                {isUploading ? 'Uploading to IPFS...' : 
                 isSubmitting ? 'Creating Snitch...' : 
                 'Create Snitch'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 