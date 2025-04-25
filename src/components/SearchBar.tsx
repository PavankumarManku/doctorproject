import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  suggestions: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch, suggestions }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setShowSuggestions(newValue.length > 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(value);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl">
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-gray-400" size={20} />
        <input
          type="text"
          data-testid="autocomplete-input"
          className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search doctor by name..."
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(value.length > 0)}
        />
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li 
                key={index} 
                data-testid="suggestion-item"
                className="px-4 py-2 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;