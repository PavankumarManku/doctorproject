import React from 'react';
import { Doctor } from '../types';
import { User, Video, Building, Briefcase, DollarSign } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div 
      data-testid="doctor-card" 
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 rounded-full bg-blue-100 p-3">
          <User size={28} className="text-blue-600" />
        </div>
        
        <div className="flex-1">
          <h3 
            data-testid="doctor-name"
            className="text-lg font-semibold text-gray-800"
          >
            {doctor.name}
          </h3>
          
          <div 
            data-testid="doctor-specialty"
            className="mt-1 text-gray-600"
          >
            {doctor.specialty.join(', ')}
          </div>
          
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
            <div 
              data-testid="doctor-experience"
              className="flex items-center text-gray-700"
            >
              <Briefcase size={16} className="mr-2 text-gray-500" />
              <span>{doctor.experience} years</span>
            </div>
            
            <div 
              data-testid="doctor-fee"
              className="flex items-center text-gray-700"
            >
              <DollarSign size={16} className="mr-2 text-gray-500" />
              <span>₹{doctor.fee}</span>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {doctor.consultType.map((type, index) => (
              <span 
                key={index}
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  type === 'Video Consult' 
                    ? 'bg-teal-100 text-teal-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {type === 'Video Consult' ? (
                  <Video size={12} className="mr-1" />
                ) : (
                  <Building size={12} className="mr-1" />
                )}
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;