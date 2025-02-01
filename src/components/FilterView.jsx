import React from 'react';

 
console.log("Filter View is being rendered");
const FilterView = ({ types, onFilterChange, activeFilters }) => {
    return (
        <div className="filter-view" style={{ color: 'black' }}>
            <h3>Filter by Type</h3>
            {types.map(type => (
                <div key={type}>
                    <label>
                        <input
                            type="checkbox"
                            checked={activeFilters.includes(type)}
                            onChange={() => onFilterChange(type)}
                        />
                        {type}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default FilterView;
