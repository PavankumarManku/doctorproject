import { Doctor } from '../types';

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format received from API');
    }
    
    // Transform the API data to match our Doctor interface
    return data.map(doctor => ({
      id: Number(doctor.id),
      name: doctor.name,
      specialty: doctor.specialities.map(s => s.name),
      experience: parseInt(doctor.experience),
      fee: parseInt(doctor.fees.replace(/[^\d]/g, '')),
      consultType: [
        ...(doctor.video_consult ? ['Video Consult'] : []),
        ...(doctor.in_clinic ? ['In Clinic'] : [])
      ] as ('Video Consult' | 'In Clinic')[],
      imageUrl: doctor.photo !== 'null' ? doctor.photo : undefined
    }));
  } catch (error) {
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      url: API_URL
    });
    throw new Error('Failed to fetch doctors. Please try again later.');
  }
};