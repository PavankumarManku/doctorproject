import React from 'react';
import { FilterState } from '../types';

interface FilterPanelProps {
  filters: FilterState;
  allSpecialties: string[];
  onFilterChange: (newFilters: FilterState) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  filters, 
  allSpecialties,
  onFilterChange 
}) => {
  const handleConsultTypeChange = (type: string) => {
    onFilterChange({
      ...filters,
      consultType: filters.consultType === type ? null : type
    });
  };

  const handleSpecialtyChange = (specialty: string) => {
    let newSpecialties = [...filters.specialties];
    
    if (newSpecialties.includes(specialty)) {
      newSpecialties = newSpecialties.filter(s => s !== specialty);
    } else {
      newSpecialties.push(specialty);
    }
    
    onFilterChange({
      ...filters,
      specialties: newSpecialties
    });
  };

  const handleSortChange = (sortBy: FilterState['sortBy']) => {
    onFilterChange({
      ...filters,
      sortBy: filters.sortBy === sortBy ? null : sortBy
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="mb-6">
        <h3 
          className="text-lg font-semibold mb-3 text-gray-800"
          data-testid="filter-header-moc"
        >
          Consultation Mode
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              data-testid="filter-video-consult"
              checked={filters.consultType === 'Video Consult'}
              onChange={() => handleConsultTypeChange('Video Consult')}
              className="form-radio h-4 w-4 text-blue-500"
            />
            <span className="text-gray-700">Video Consult</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              data-testid="filter-in-clinic"
              checked={filters.consultType === 'In Clinic'}
              onChange={() => handleConsultTypeChange('In Clinic')}
              className="form-radio h-4 w-4 text-blue-500"
            />
            <span className="text-gray-700">In Clinic</span>
          </label>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 
          className="text-lg font-semibold mb-3 text-gray-800"
          data-testid="filter-header-speciality"
        >
          Speciality
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {allSpecialties.map((specialty) => (
            <label 
              key={specialty} 
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                data-testid={`filter-specialty-${specialty.replace('/', '-')}`}
                checked={filters.specialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <span className="text-gray-700">{specialty}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <h3 
          className="text-lg font-semibold mb-3 text-gray-800"
          data-testid="filter-header-sort"
        >
          Sort By
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              data-testid="sort-fees"
              checked={filters.sortBy === 'fees'}
              onChange={() => handleSortChange('fees')}
              className="form-radio h-4 w-4 text-blue-500"
            />
            <span className="text-gray-700">Fees (Low to High)</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              data-testid="sort-experience"
              checked={filters.sortBy === 'experience'}
              onChange={() => handleSortChange('experience')}
              className="form-radio h-4 w-4 text-blue-500"
            />
            <span className="text-gray-700">Experience (High to Low)</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;