import React from "react";
import { Badge } from "./ui/badge";
import { FilterType } from "@/lib/data";
import { Filter, Search, Clock, CheckCircle2 } from "lucide-react"; 
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const StatsAndFilters = ({
  completedTasksCount = 0,
  activeTasksCount = 0,
  filter = "all",
  setFilter,
  searchTerm = "",
  setSearchTerm
}) => {
  return (
    <div className={cn(
      "bg-white/40 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl",
      "p-4 sm:p-5 lg:p-6",
      "shadow-xl border border-white/60",
      "animate-fadeIn"
    )} style={{ animationDelay: '0.2s' }}>
      {/* Stats Badges */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
        <Badge
          variant="secondary"
          className={cn(
            "bg-blue-50 text-blue-700 border-2 border-blue-200",
            "px-3 sm:px-4 py-1.5 sm:py-2",
            "text-xs sm:text-sm font-semibold",
            "rounded-lg flex items-center gap-1.5"
          )}
        >
          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
          {activeTasksCount} {FilterType.active}
        </Badge>
        <Badge
          variant="secondary"
          className={cn(
            "bg-green-50 text-green-700 border-2 border-green-200",
            "px-3 sm:px-4 py-1.5 sm:py-2",
            "text-xs sm:text-sm font-semibold",
            "rounded-lg flex items-center gap-1.5"
          )}
        >
          <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
          {completedTasksCount} {FilterType.completed}
        </Badge>
      </div>

      {/* Search Bar */}
      {setSearchTerm && (
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Tìm kiếm nhiệm vụ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={cn(
              "w-full pl-11 sm:pl-12 pr-4 py-2.5 sm:py-3",
              "rounded-xl bg-white/80 text-gray-800 placeholder-gray-400",
              "border-2 border-gray-200",
              "focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20",
              "transition-all duration-300 outline-none",
              "text-sm sm:text-base"
            )}
          />
        </div>
      )}

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(FilterType).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "default" : "ghost"}
            size="sm"
            className={cn(
              "flex-1 sm:flex-none",
              "px-4 sm:px-6 py-2 sm:py-2.5",
              "rounded-xl font-medium",
              "transition-all duration-300",
              "text-xs sm:text-sm",
              "flex items-center justify-center gap-1.5",
              filter === type 
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105 hover:shadow-xl" 
                : "bg-white/80 text-gray-700 hover:bg-white hover:scale-105"
            )}
            onClick={() => setFilter(type)}
          >
            <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
            {FilterType[type]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StatsAndFilters;