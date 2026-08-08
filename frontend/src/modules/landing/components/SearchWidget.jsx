import React from "react";
import { MapPin, Calendar, IndianRupee, Search } from "lucide-react";
import Button from "./Button";

function SearchWidget() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Location */}
        <div>
          <label className="text-xs text-ink-500 font-medium mb-1 block">
            Location
          </label>
          <div className="flex items-center gap-2 border border-border-light rounded-lg px-3 py-2.5">
            <MapPin className="w-4 h-4 text-ink-500 flex-shrink-0" />
            <input
              type="text"
              defaultValue="Bangalore"
              className="text-sm text-ink-900 bg-transparent outline-none w-full"
              placeholder="Enter location"
            />
          </div>
        </div>

        {/* Move-in Date */}
        <div>
          <label className="text-xs text-ink-500 font-medium mb-1 block">
            Move-in Date
          </label>
          <div className="flex items-center gap-2 border border-border-light rounded-lg px-3 py-2.5">
            <Calendar className="w-4 h-4 text-ink-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Select date"
              className="text-sm text-ink-500 bg-transparent outline-none w-full"
            />
          </div>
        </div>

        {/* Budget Range */}
        <div>
          <label className="text-xs text-ink-500 font-medium mb-1 block">
            Budget Range
          </label>
          <div className="flex items-center gap-2 border border-border-light rounded-lg px-3 py-2.5">
            <IndianRupee className="w-4 h-4 text-ink-500 flex-shrink-0" />
            <select className="text-sm text-ink-700 bg-transparent outline-none w-full cursor-pointer">
              <option>RS5,000 - RS15,000</option>
              <option>RS5,000 - RS8,000</option>
              <option>RS8,000 - RS12,000</option>
              <option>RS12,000 - RS15,000</option>
              <option>RS15,000+</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button variant="primary" className="w-full py-2.5">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchWidget;
