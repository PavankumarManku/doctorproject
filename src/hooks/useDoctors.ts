import { useEffect, useState, useMemo } from 'react';
import { Doctor, FilterState } from '../types';
import { fetchDoctors } from '../api/doctorsApi';

export const useDoctors = (filters: FilterState) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allSpecialties, setAllSpecialties] = useState<string[]>([]);

  useEffect(() => {
    const getDoctors = async () => {
      setLoading(true);
      try {
        const data = await fetchDoctors();
        setDoctors(data);
        
        // Extract all unique specialties
        const specialties = new Set<string>();
        data.forEach(doctor => {
          doctor.specialty.forEach(s => specialties.add(s));
        });
        setAllSpecialties(Array.from(specialties).sort());
        
      } catch (err) {
        setError('Failed to fetch doctors');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    getDoctors();
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors
      .filter(doctor => {
        // Filter by search term
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          const doctorNameLower = doctor.name.toLowerCase();
          if (!doctorNameLower.includes(searchLower)) {
            return false;
          }
        }
        
        // Filter by consultation type
        if (filters.consultType) {
          if (!doctor.consultType.includes(filters.consultType)) {
            return false;
          }
        }
        
        // Filter by specialties
        if (filters.specialties.length > 0) {
          const hasMatchingSpecialty = doctor.specialty.some(doctorSpecialty => 
            filters.specialties.includes(doctorSpecialty)
          );
          if (!hasMatchingSpecialty) {
            return false;
          }
        }
        
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'fees') {
          // Sort by fees (low to high)
          return a.fee - b.fee;
        }
        if (filters.sortBy === 'experience') {
          // Sort by experience (high to low)
          const expA = typeof a.experience === 'number' ? a.experience : 0;
          const expB = typeof b.experience === 'number' ? b.experience : 0;
          return expB - expA;
        }
        return 0;
      });
  }, [doctors, filters.search, filters.consultType, filters.specialties, filters.sortBy]);

  // Get suggestions for autocomplete
  const getSuggestions = (query: string): string[] => {
    if (!query) return [];
    
    const queryLower = query.toLowerCase();
    const matchingDoctors = doctors.filter(doctor => 
      doctor.name.toLowerCase().includes(queryLower)
    );
    
    return matchingDoctors
      .map(doctor => doctor.name)
      .slice(0, 3); // Return top 3 matches
  };

  return {
    doctors: filteredDoctors,
    loading,
    error,
    allSpecialties,
    getSuggestions
  };
};