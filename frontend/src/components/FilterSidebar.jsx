import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const FilterSidebar = ({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  setPriceRange,
  allProducts = [],
  priceRange,
}) => {
  const [openMenu, setOpenMenu] = useState(false); // 🔥 mobile

  const Categories = allProducts.map((p) => p.category);
  const UniqueCategory = ["All", ...new Set(Categories)];

  const Brands = allProducts.map((p) => p.brand);
  const UniqueBrand = ["All", ...new Set(Brands)];

  const handleCategoryClick = (val) => {
    setCategory(val);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const hamdleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= priceRange[1]) setPriceRange([value, priceRange[1]]);
  };

  const hamdleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= priceRange[0]) {
      setPriceRange([priceRange[0], value]);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriceRange([0, 999999]);
  };

  return (
    <>
      {/* HAMBURGER  */}
      <button
        onClick={() => setOpenMenu(true)}
          className="md:hidden absolute top-20 left-2 bg-pink-500 text-white p-2 rounded z-40"

      >
        ☰
      </button>

      {openMenu && (
        <div className="fixed inset-0 z-50">
          
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenMenu(false)}
          ></div>

          {/* Sidebar LEFT */}
          <div className="absolute top-0 left-0 w-[75%] max-w-[300px] h-full bg-white p-4 shadow-lg overflow-y-auto">
            
            <button
              onClick={() => setOpenMenu(false)}
              className="mb-4 text-red-500"
            >
              ✕ Close
            </button>

            <div className="bg-gray-100 p-4 rounded-md h-max w-full">
              
              <Input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
              />

              <h1 className="mt-5 font-semibold text-xl">Category</h1>
              <div className="flex flex-col gap-2 mt-3">
                {UniqueCategory.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={category == item}
                      onChange={() => handleCategoryClick(item)}
                    />
                    <label>{item}</label>
                  </div>
                ))}
              </div>

              <h1 className="mt-5 font-semibold text-xl">Brand</h1>
              <select
                className="bg-white w-full p-2 border-gray-200 border-2 rounded-md"
                value={brand}
                onChange={handleBrandChange}
              >
                {UniqueBrand.map((item, index) => (
                  <option key={index} value={item}>
                    {item?.toUpperCase()}
                  </option>
                ))}
              </select>

              <h1 className="mt-5 font-semibold text-xl mb-3">
                Price Range
              </h1>
              <div className="flex flex-col gap-2">
                <label>
                  ₹{priceRange[0]} - ₹{priceRange[1]}
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={hamdleMinChange}
                    className="w-28 p-1 border rounded"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={hamdleMaxChange}
                    className="w-28 p-1 border rounded"
                  />
                </div>

                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={priceRange[0]}
                  onChange={hamdleMinChange}
                />
                <input
                  type="range"
                  min="0"
                  max="999999"
                  value={priceRange[1]}
                  onChange={hamdleMaxChange}
                />
              </div>

              <Button
                onClick={resetFilters}
                className="bg-pink-600 text-white w-full mt-5"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <div className="bg-gray-100 p-4 rounded-md h-max hidden md:block w-64">
        
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
        />

        <h1 className="mt-5 font-semibold text-xl">Category</h1>
        <div className="flex flex-col gap-2 mt-3">
          {UniqueCategory.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="radio"
                checked={category == item}
                onChange={() => handleCategoryClick(item)}
              />
              <label>{item}</label>
            </div>
          ))}
        </div>

        <h1 className="mt-5 font-semibold text-xl">Brand</h1>
        <select
          className="bg-white w-full p-2 border-gray-200 border-2 rounded-md"
          value={brand}
          onChange={handleBrandChange}
        >
          {UniqueBrand.map((item, index) => (
            <option key={index} value={item}>
              {item?.toUpperCase()}
            </option>
          ))}
        </select>

        <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
        <div className="flex flex-col gap-2">
          <label>
            ₹{priceRange[0]} - ₹{priceRange[1]}
          </label>

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={hamdleMinChange}
              className="w-28 p-1 border rounded"
            />
            <span>-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={hamdleMaxChange}
              className="w-28 p-1 border rounded"
            />
          </div>

          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange[0]}
            onChange={hamdleMinChange}
          />
          <input
            type="range"
            min="0"
            max="999999"
            value={priceRange[1]}
            onChange={hamdleMaxChange}
          />
        </div>

        <Button
          onClick={resetFilters}
          className="bg-pink-600 text-white w-full mt-5"
        >
          Reset Filters
        </Button>
      </div>
    </>
  );
};

export default FilterSidebar;