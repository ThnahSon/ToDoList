import React from "react";
import { cn } from "@/lib/utils";

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
  const totalTasks = completedTasksCount + activeTasksCount;
  
  if (totalTasks === 0) return null;

  const getMotivationalMessage = () => {
    const completionRate = totalTasks > 0 ? (completedTasksCount / totalTasks) * 100 : 0;

    if (completionRate === 100) {
      return {
        emoji: "🎉",
        message: "Xuất sắc! Bạn đã hoàn thành tất cả nhiệm vụ!",
        color: "text-green-600"
      };
    } else if (completionRate >= 75) {
      return {
        emoji: "🌟",
        message: `Tuyệt vời! Bạn đã hoàn thành ${completedTasksCount} việc, còn ${activeTasksCount} việc nữa thôi!`,
        color: "text-blue-600"
      };
    } else if (completionRate >= 50) {
      return {
        emoji: "💪",
        message: `Đang tiến bộ tốt! ${completedTasksCount} hoàn thành, ${activeTasksCount} đang làm. Cố lên!`,
        color: "text-purple-600"
      };
    } else if (completedTasksCount > 0) {
      return {
        emoji: "🚀",
        message: `Bắt đầu tốt rồi! Đã hoàn thành ${completedTasksCount} việc, tiếp tục nào!`,
        color: "text-orange-600"
      };
    } else {
      return {
        emoji: "✨",
        message: `Hãy bắt đầu làm ${activeTasksCount} nhiệm vụ nào!`,
        color: "text-gray-600"
      };
    }
  };

  const { emoji, message, color } = getMotivationalMessage();

  return (
    <footer className={cn(
      "text-center py-4 sm:py-6",
      "bg-white/40 backdrop-blur-xl rounded-xl sm:rounded-2xl",
      "shadow-lg border border-white/60",
      "animate-fadeIn"
    )}>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4">
        <span className="text-2xl sm:text-3xl animate-bounce">{emoji}</span>
        <p className={cn(
          "text-sm sm:text-base lg:text-lg font-semibold",
          color
        )}>
          {message}
        </p>
      </div>
      
      {/* Progress Bar */}
      {totalTasks > 0 && (
        <div className="mt-4 px-6 sm:px-8">
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-500 ease-out",
                "bg-gradient-to-r from-purple-500 to-pink-500"
              )}
              style={{ width: `${(completedTasksCount / totalTasks) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs sm:text-sm text-gray-600">
            <span>{completedTasksCount} hoàn thành</span>
            <span>{Math.round((completedTasksCount / totalTasks) * 100)}%</span>
            <span>{activeTasksCount} đang làm</span>
          </div>
        </div>
      )}
      <div className="mt-4 pt-4 border-t border-gray-200/50 text-center text-sm text-gray-500">
        <p>Made by Nguyễn Thanh Sơn ❤️</p>
      </div>
    </footer>
  );
};

export default Footer;