import React from 'react';
import { Doctor } from '../types';
import DoctorCard from './DoctorCard';

interface DoctorsListProps {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
}

const DoctorsList: React.FC<DoctorsListProps> = ({ doctors, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-pulse text-xl text-gray-600">Loading doctors...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No doctors found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {doctors.map(doctor => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorsList;