import React, { useState } from 'react';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar';
import { CreateSnitchModal } from '../components/CreateSnitchModal';

// Only background has gradient
const GradientBackground = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #E3F2FD 0%,
    #90CAF9 20%,
    #64B5F6 40%,
    #42A5F5 60%,
    #2196F3 80%,
    #1E88E5 100%
  );
  animation: gradientShift 15s ease infinite;
  background-size: 400% 400%;

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const DashboardScreen = ({ walletAddress, onDisconnect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateSnitch = (formData) => {
    // Handle the form submission here
    console.log('New Snitch Data:', formData);
    // You can add API call here to save the data
  };

  return (
    <GradientBackground>
      {/* White Navbar */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto">
          <Navbar 
            walletAddress={walletAddress} 
            onDisconnect={onDisconnect}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Content */}
        <div className="space-y-12">
          {/* Create Snitch Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Create Your First Snitch
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Start by creating a new snitch to track and monitor blockchain activities
              </p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="
                  bg-blue-500 hover:bg-blue-600 
                  text-white
                  px-8 py-4 rounded-xl
                  font-bold text-lg
                  transform transition-all duration-300
                  hover:scale-105 hover:shadow-xl
                  active:scale-100
                "
              >
                Make a Snitch
              </button>
            </div>
          </div>

          {/* Community Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Community Snitches
            </h2>
            <p className="text-white/80 mb-8">
              Explore and follow snitches created by the community
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Snitch Cards */}
              {[1, 2, 3].map((index) => (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Popular Snitch #{index}
                    </h3>
                    <p className="text-gray-600">
                      Description of the snitch...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CreateSnitchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateSnitch}
      />
    </GradientBackground>
  );
};

export default DashboardScreen; 