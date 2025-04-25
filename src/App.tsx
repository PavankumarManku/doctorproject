import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DoctorsList from './components/DoctorsList';
import { useQueryParams } from './hooks/useQueryParams';
import { useDoctors } from './hooks/useDoctors';
import { Stethoscope } from 'lucide-react';

function App() {
  const [filters, updateFilters] = useQueryParams();
  const [searchInput, setSearchInput] = useState(filters.search);
  
  const { 
    doctors, 
    loading, 
    error, 
    allSpecialties,
    getSuggestions 
  } = useDoctors(filters);
  
  const suggestions = getSuggestions(searchInput);

  const handleSearch = (value: string) => {
    updateFilters({
      ...filters,
      search: value
    });
  };

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Stethoscope size={28} className="text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-900">Doctor Finder</h1>
            </div>
          </div>
          
          <div className="mt-4 flex justify-center">
            <SearchBar 
              value={searchInput}
              onChange={handleSearchInputChange}
              onSearch={handleSearch}
              suggestions={suggestions}
            />
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterPanel 
              filters={filters}
              allSpecialties={allSpecialties}
              onFilterChange={updateFilters}
            />
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {loading ? 'Loading...' : `${doctors.length} Doctor${doctors.length !== 1 ? 's' : ''} Found`}
                </h2>
                
                {(filters.search || filters.consultType || filters.specialties.length > 0 || filters.sortBy) && (
                  <button
                    className="text-sm text-blue-600 hover:text-blue-800"
                    onClick={() => updateFilters({
                      search: '',
                      consultType: null,
                      specialties: [],
                      sortBy: null
                    })}
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
              
              <DoctorsList 
                doctors={doctors}
                loading={loading}
                error={error}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;