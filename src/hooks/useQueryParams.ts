import { useEffect, useState } from 'react';
import { FilterState } from '../types';

export const useQueryParams = (): [FilterState, (newFilters: FilterState) => void] => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    consultType: null,
    specialties: [],
    sortBy: null,
  });

  // Initialize filters from URL params
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    
    const search = searchParams.get('search') || '';
    const consultType = searchParams.get('consultType');
    const specialties = searchParams.getAll('specialty');
    const sortBy = searchParams.get('sortBy') as FilterState['sortBy'];
    
    setFilters({
      search,
      consultType,
      specialties,
      sortBy,
    });
  }, []);

  // Update URL when filters change
  const updateFilters = (newFilters: FilterState) => {
    const searchParams = new URLSearchParams();
    
    if (newFilters.search) {
      searchParams.set('search', newFilters.search);
    }
    
    if (newFilters.consultType) {
      searchParams.set('consultType', newFilters.consultType);
    }
    
    newFilters.specialties.forEach(specialty => {
      searchParams.append('specialty', specialty);
    });
    
    if (newFilters.sortBy) {
      searchParams.set('sortBy', newFilters.sortBy);
    }
    
    const newUrl = searchParams.toString() 
      ? `${window.location.pathname}?${searchParams.toString()}`
      : window.location.pathname;
    
    window.history.pushState({}, '', newUrl);
    setFilters(newFilters);
  };

  return [filters, updateFilters];
};