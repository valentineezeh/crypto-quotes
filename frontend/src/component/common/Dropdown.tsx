import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import { FixedSizeList as List } from 'react-window';
import { SelectedOptionsProps } from '../Form'

type Option = {
  id: number;
  name: string;
  symbol: string;
}

type Options = {
  options?: Option[];
  setSelectedOption:  (selectedOption: SelectedOptionsProps) => void;
  selectedOption: SelectedOptionsProps,
  error: string
  setValue?: (value: string) => void;
}

type RenderOptionProps = {
  index: number;
  style: CSSProperties;
}

export const LargeSelect = ({
  options,
  setSelectedOption,
  selectedOption,
  error,
  setValue
}: Options) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(setValue) {
      setValue(selectedOption.value.toString())
    }
  }, [setValue, selectedOption])

  useEffect(() => {
    const handleOnClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as HTMLElement)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOnClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleOnClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption({
      ...selectedOption,
      value: option.id,
      name: option.name,
      symbol: option.symbol
    })
  };

  const renderOption: React.FC<RenderOptionProps> = ({ index, style }) => (
    <div className='listItem' data-testid='listItem' key={options![index].id} style={style} onClick={() => {
      handleOptionClick(options![index])
      setIsOpen(false)
      }}>
      {options![index].name} - {options![index].symbol}
    </div>
  );


  return (
    <div className='dropdown-container' data-testid='dropdown-container'>
      <label htmlFor="email">Select crypto type: </label>
      <div
        onClick={toggleDropdown}
        className='select-dropdown'
        data-testid='select-dropdown'
        >
        {selectedOption.value === 0 ?  'Select a crypto' : `${selectedOption.name} - ${selectedOption.symbol}`}
      </div>
      {isOpen && (
        <div
          className='dropDown-option'
          ref={selectRef}
          data-testid='dropDown-option'
          >
          <List
            className='list'
            height={200}
            itemCount={options!.length}
            itemSize={35}
            width={'100%'}
          >
            {renderOption}
          </List>
        </div>
      )}
      <p className='error'>{error}</p>
    </div>
  );
};

export default LargeSelect;
