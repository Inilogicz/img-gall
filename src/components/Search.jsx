import React from 'react';

const Search = ({ searchTerm, onSearch }) => (
  <div className="search">
    <input
      type="text"
      placeholder="Search by tag"
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
);

export default Search;
