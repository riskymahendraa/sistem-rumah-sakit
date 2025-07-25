import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({ placeholder = "Cari..." }) => {
    return (
        <div className="relative w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <SearchIcon />
            </span>
            <input
                type="text"
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default SearchInput;
