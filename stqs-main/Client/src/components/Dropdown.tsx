import { useState } from 'react';
import { dropdownProps } from '@/interfaces/components';

function Dropdown({ optionList, selected, setSelected }: dropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('');

  // Toggle - Open dorp down list
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setFilter(''); // Clear filter when dropdown opens
  };

  // Toggle - set clicked options
  const handleOptionClick = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  // Filter - filter options based on use input
  const filteredOptions = optionList.filter((option) =>
    option.symbol.toLowerCase().includes(filter.toLowerCase()) ||
    option.type.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className='w-full relative'>
      {/* Drop down box */}
      <div
        onClick={toggleDropdown}
        className={`cursor-pointer bg-tertiary hover:bg-purple-950 rounded-md border border-cyan-800 text-left px-4 py-1 ${selected ? "text-white" : "text-gray-500"} text-sm`}
      >
        {selected || 'Select to navigate...'}
      </div>

      {/* Drop down list */}
      {isOpen && (
        <div className='absolute top-full left-0 right-0 z-20 bg-tertiary border-t-0'>
          {/* Filter Keywords */}
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Type to filter..."
            className='px-4 py-1 w-full text-sm bg-gray-95'
          />
          <ul className='max-h-[10em] overflow-scroll overflow-x-auto'>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.symbol}
                  onClick={() => handleOptionClick(option.symbol)}
                  className='py-1 px-4 text-sm text-left cursor-pointer text-gray-400 bg-gray-900 hover:bg-black hover:text-cyan-300'
                >
                  <div className='flex flex-row place-content-between'>
                    <span>{option.symbol}</span>
                    <span className='text-[10px] text-gray-500'>({option.type})</span>
                  </div>
                </li>
              ))
            ) : (
              <li className='p-2 px-4 text-sm bg-gray-900 text-gray-400'>No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
