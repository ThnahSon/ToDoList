import React from "react";
import { Card } from "./ui/card";
import { Circle, CheckCircle2, ListTodo } from "lucide-react";
import { cn } from "@/lib/utils";

const TaskEmptyState = ({ filter }) => {
  const getEmptyStateContent = () => {
    switch(filter) {
      case "active":
        return {
          icon: <Circle className="w-16 h-16 sm:w-20 sm:h-20 text-blue-300" />,
          title: "Không có nhiệm vụ nào đang làm",
          subtitle: 'Chuyển sang "Tất cả" để thấy những nhiệm vụ đã hoàn thành.',
          emoji: "🎯"
        };
      case "completed":
        return {
          icon: <CheckCircle2 className="w-16 h-16 sm:w-20 sm:h-20 text-green-300" />,
          title: "Chưa có nhiệm vụ nào hoàn thành",
          subtitle: 'Chuyển sang "Tất cả" để thấy những nhiệm vụ đang làm.',
          emoji: "✅"
        };
      default:
        return {
          icon: <ListTodo className="w-16 h-16 sm:w-20 sm:h-20 text-purple-300" />,
          title: "Chưa có nhiệm vụ nào",
          subtitle: "Thêm nhiệm vụ đầu tiên vào để bắt đầu!",
          emoji: "📝"
        };
    }
  };

  const { icon, title, subtitle, emoji } = getEmptyStateContent();

  return (
    <Card className={cn(
      "p-8 sm:p-12 lg:p-16 text-center",
      "border-0 bg-white/40 backdrop-blur-xl",
      "shadow-xl border border-white/60",
      "rounded-xl sm:rounded-2xl lg:rounded-3xl",
      "animate-fadeIn"
    )}>
      <div className="space-y-4 sm:space-y-6">
        {/* Icon with animation */}
        <div className="flex justify-center">
          <div className="relative">
            {icon}
            <div className="absolute inset-0 blur-2xl opacity-30">
              {icon}
            </div>
          </div>
        </div>

        {/* Emoji */}
        <div className="text-4xl sm:text-5xl lg:text-6xl animate-bounce">
          {emoji}
        </div>

        {/* Text Content */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className={cn(
            "font-bold text-gray-800",
            "text-lg sm:text-xl lg:text-2xl"
          )}>
            {title}
          </h3>

          <p className={cn(
            "text-gray-600 max-w-md mx-auto",
            "text-sm sm:text-base"
          )}>
            {subtitle}
          </p>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center gap-2 pt-4">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </Card>
  );
};

export default TaskEmptyState;