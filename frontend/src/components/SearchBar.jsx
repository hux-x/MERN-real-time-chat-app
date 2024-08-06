import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <form className="mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search chats"
        className="w-full px-3 py-2 text-[#4a5d23] border border-[#71a0a5] rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#71a0a5] focus:border-[#71a0a5] transition-all duration-300 ease-in-out bg-white"
      />
    </form>
  );
};

export default SearchBar;
