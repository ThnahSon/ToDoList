import React, { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import api from "@/lib/axios";
import { cn } from '@/lib/utils';

const AddTask = ({ handleNewTaskAdded }) => { 
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addTask = async () => {
    if (!newTaskTitle.trim()) {
      toast.error("Bạn cần nhập nội dung của nhiệm vụ.");
      return;
    }

    try {
      setIsSubmitting(true);
      const savedTitle = newTaskTitle;
      await api.post("/tasks", { title: newTaskTitle });

      setNewTaskTitle("");
      toast.success(`Nhiệm vụ "${savedTitle}" đã được thêm vào.`);
      
      if (handleNewTaskAdded) {
        handleNewTaskAdded();
      }
    } catch (error) {
      console.error("Lỗi xảy ra khi thêm task:", error);
      toast.error("Lỗi xảy ra khi thêm nhiệm vụ mới.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !isSubmitting) {
      event.preventDefault();
      addTask();
    }
  };

  return (
    <Card className={cn(
      "bg-white/40 backdrop-blur-xl border border-white/60",
      "rounded-xl sm:rounded-2xl lg:rounded-3xl",
      "p-4 sm:p-5 lg:p-6",
      "shadow-xl hover:shadow-2xl",
      "transition-all duration-300",
      "animate-fadeIn"
    )} style={{ animationDelay: '0.1s' }}>
      <form className="flex flex-col sm:flex-row items-stretch gap-3" onSubmit={(e) => e.preventDefault()}>
        <Input
          type="text"
          placeholder="Thêm nhiệm vụ mới..."
          className={cn(
            "flex-1 px-4 sm:px-5 lg:px-6 py-3 sm:py-3.5 lg:py-4",
            "text-sm sm:text-base",
            "rounded-xl sm:rounded-2xl",
            "bg-white/80 text-gray-800 placeholder-gray-400",
            "border-2 border-gray-200",
            "focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20",
            "transition-all duration-300 outline-none"
          )}
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isSubmitting}
        />
        <Button
          type="button"
          className={cn(
            "px-6 sm:px-7 lg:px-8 py-3 sm:py-3.5 lg:py-4",
            "bg-gradient-to-r from-purple-600 to-pink-600",
            "hover:from-purple-700 hover:to-pink-700",
            "text-white rounded-xl sm:rounded-2xl font-semibold",
            "shadow-lg hover:shadow-xl",
            "transform hover:scale-105 active:scale-95",
            "transition-all duration-300",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
            "flex items-center justify-center gap-2",
            "min-w-[120px] sm:min-w-[140px]"
          )}
          onClick={addTask}
          disabled={!newTaskTitle.trim() || isSubmitting}
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">
            {isSubmitting ? "Đang thêm..." : "Thêm"}
          </span>
        </Button>
      </form>
    </Card>
  );
};

export default AddTask;