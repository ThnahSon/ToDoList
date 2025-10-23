import React from 'react';
import { Sparkles, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = ({ totalTasks = 0, activeCount = 0, completeCount = 0 }) => {
  return (
    <header className={cn(
      "bg-white/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl",
      "p-4 sm:p-6 lg:p-8",
      "shadow-2xl border border-white/60",
      "animate-fadeIn"
    )}>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-3 text-center sm:text-center">
          <div className="relative">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 animate-pulse" />
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ToDoList
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Quản lý công việc hiệu quả và nâng cao hiệu suất của bạn!
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Total Tasks */}
        <div className={cn(
          "bg-gradient-to-br from-purple-500 to-purple-600",
          "rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5",
          "text-white shadow-lg hover:shadow-2xl",
          "transform hover:-translate-y-1 transition-all duration-300",
          "cursor-pointer"
        )}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-purple-100 text-xs sm:text-sm font-medium">Tổng nhiệm vụ</p>
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-purple-200" />
            </div>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">{totalTasks}</p>
          </div>
        </div>

        {/* Active Tasks */}
        <div className={cn(
          "bg-gradient-to-br from-blue-500 to-blue-600",
          "rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5",
          "text-white shadow-lg hover:shadow-2xl",
          "transform hover:-translate-y-1 transition-all duration-300",
          "cursor-pointer"
        )}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-blue-100 text-xs sm:text-sm font-medium">Đang làm</p>
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-200" />
            </div>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">{activeCount}</p>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className={cn(
          "col-span-2 lg:col-span-1",
          "bg-gradient-to-br from-green-500 to-green-600",
          "rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5",
          "text-white shadow-lg hover:shadow-2xl",
          "transform hover:-translate-y-1 transition-all duration-300",
          "cursor-pointer"
        )}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-green-100 text-xs sm:text-sm font-medium">Hoàn thành</p>
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-green-200" />
            </div>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">{completeCount}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;