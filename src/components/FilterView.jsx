import React, { useState, useEffect } from 'react';
import './FilterView.css'; // Ensure the stylesheet is correctly linked

const FilterView = ({ types, onFilterChange, activeFilters }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const visible = currentScrollPos > 100; // Adjust as needed
            setIsVisible(visible);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`filter-view ${isVisible ? 'visible' : ''}`}>
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
