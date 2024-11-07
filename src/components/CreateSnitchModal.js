import React, { useState } from 'react';
import { uploadToIPFS } from '../services/ipfs';

const categories = [
  { id: 'police', label: 'Police' },
  { id: 'customs', label: 'Customs' },
  { id: 'income-tax', label: 'Income Tax' }
];

export const CreateSnitchModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    city: '',
    location: '',
    media: null
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (e.g., 10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size must be less than 10MB');
        return;
      }
      
      // Validate file type
      if (!file.type.match('image.*|video.*')) {
        setUploadError('Only image and video files are allowed');
        return;
      }

      setFormData(prev => ({ ...prev, media: file }));
      setUploadError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadError('');
    
    try {
      let mediaCID = '';
      
      if (formData.media) {
        setIsUploading(true);
        setUploadProgress(0);
        
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => Math.min(prev + 10, 90));
        }, 500);

        // Upload to IPFS
        mediaCID = await uploadToIPFS(formData.media);
        
        clearInterval(progressInterval);
        setUploadProgress(100);
      }

      // Submit form data with CID
      await onSubmit({ ...formData, mediaCID });
      onClose();
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Create a Snitch</h2>
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Description *
              </label>
              <textarea
                name="description"
                required
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Describe the situation in detail..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Category *
              </label>
              <select
                name="category"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
                value={formData.category}
                onChange={handleChange}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 1rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label}
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
                type="text"
                name="city"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter city name"
                value={formData.city}
                onChange={handleChange}
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter specific location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            {/* Media Upload with Progress */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Media <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="media"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              
              {/* Upload Progress */}
              {isUploading && (
                <div className="mt-2">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}

              {/* Error Message */}
              {uploadError && (
                <p className="text-sm text-red-600 mt-1">
                  {uploadError}
                </p>
              )}

              <p className="text-sm text-gray-500">
                Supported formats: Images and Videos (Max size: 10MB)
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                disabled={isUploading}
                className="px-6 py-2.5 text-gray-700 font-semibold hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                {isUploading ? 'Uploading...' : 'Create Snitch'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 