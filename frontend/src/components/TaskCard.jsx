// Thêm 'useMemo' vào import
import React, { useState, useRef, useEffect, useMemo } from "react"; 
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2, MoreVertical } from "lucide-react";
import { Input } from "./ui/input";
import api from "@/lib/axios";
import { toast } from "sonner";

const isMobileDevice = () => {
    return typeof window !== 'undefined' && window.innerWidth < 640;
};

const TaskCard = ({ task, index, handleTaskChanged, searchTerm }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const cardRef = useRef(null);
  
  const [isMobile, setIsMobile] = useState(isMobileDevice());

  useEffect(() => {
    const handleResize = () => {
        setIsMobile(isMobileDevice());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isEditing) {
        setEditedTitle(task.title || "");
    }
  }, [task.title, isEditing]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target) && showMobileMenu) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMobileMenu]); 

  // --- LOGIC  ---
  const highlightedTitle = useMemo(() => {
    if (!searchTerm || !searchTerm.trim()) {
      return task.title; 
    }

    const escapedHighlight = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
   
    const regex = new RegExp(`(${escapedHighlight})`, 'gi');
    const parts = task.title.split(regex);

    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) && part.toLowerCase() === searchTerm.toLowerCase() ? (
            <mark key={i} className="bg-yellow-300 text-black rounded-sm px-0.5">
              {part}
            </mark>
          ) : (
            <React.Fragment key={i}>{part}</React.Fragment>
          )
        )}
      </span>
    );
  }, [task.title, searchTerm]); 


  // --- CÁC HÀM XỬ LÝ API ---

  const toggleTaskStatus = async () => {
    if (isUpdating) return; 
    try {
      setIsUpdating(true);
      const newStatus = task.status === "complete" ? "active" : "complete";
      const completedAt = newStatus === "complete" ? new Date() : null;

      await api.put(`/tasks/${task._id}`, {
        status: newStatus,
        completedAt: completedAt
      });
      toast.success(
        newStatus === "complete" 
          ? "Nhiệm vụ đã hoàn thành!" 
          : "Nhiệm vụ đã được đánh dấu chưa hoàn thành."
      );
      handleTaskChanged(); 
    } catch (error) {
      console.error("Lỗi xảy ra khi cập nhật task:", error);
      toast.error("Lỗi xảy ra khi cập nhật nhiệm vụ.");
    } finally {
      setIsUpdating(false); 
    }
  };

  const deleteTask = async () => {
    if (isUpdating) return; 
    try {
      setIsUpdating(true);
      await api.delete(`/tasks/${task._id}`);
      toast.success("Nhiệm vụ đã xóa.");
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi xảy ra khi xóa task:", error);
      toast.error("Lỗi xảy ra khi xóa nhiệm vụ.");
    } finally {
      setIsUpdating(false);
    }
  };

  const updateTask = async () => {
    if (isUpdating) return;
    if (!editedTitle.trim()) {
      toast.error("Tiêu đề không được để trống.");
      return;
    }

    try {
      setIsUpdating(true);
      setIsEditing(false); 
      await api.put(`/tasks/${task._id}`, {
        title: editedTitle,
      });
      toast.success(`Nhiệm vụ đã đổi thành "${editedTitle}"`);
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi xảy ra khi update task.", error);
      toast.error("Lỗi xảy ra khi cập nhập nhiệm vụ.");
    } finally {
        setIsUpdating(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateTask();
    } else if (event.key === "Escape") {
      setEditedTitle(task.title); 
      setIsEditing(false);
    }
  };

  // --- PHẦN GIAO DIỆN  ---
  return (
    <div ref={cardRef} className="relative">
      <Card 
        className={cn(
          "relative p-3 sm:p-4 lg:p-6 group",
          "bg-white/40 backdrop-blur-xl border border-white/60",
          "shadow-lg hover:shadow-2xl",
          "transition-all duration-300",
          "rounded-xl sm:rounded-2xl",
          "animate-fadeIn",
          task.status === "complete" && "opacity-75",
          isUpdating && "opacity-50 pointer-events-none" 
        )}
        style={{ 
          animationDelay: `${index * 50}ms`,
        }}
      >
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          {/* Nút tick hoàn thành nhiệm vụ */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full",
              "transition-all duration-300 hover:scale-110",
              "border-2",
              task.status === "complete" 
                ? "bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 text-white" 
                : "border-gray-300 hover:border-purple-500 text-gray-400 hover:text-purple-500"
            )}
            onClick={toggleTaskStatus}
            disabled={isUpdating}
          >
            {task.status === "complete" ? (
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Circle className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </Button>

          {/* Phần nội dung */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={updateTask} 
                placeholder="Cần phải làm gì?"
                className="h-9 sm:h-10 text-sm sm:text-base border-2 border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-lg"
                type="text"
                autoFocus
                disabled={isUpdating}
              />
            ) : (
              <div>
                <p 
                  className={cn(
                    "text-sm sm:text-base lg:text-lg font-medium",
                    "transition-all duration-200",
                    "break-words",
                    task.status === "complete" 
                      ? "line-through text-gray-400" 
                      : "text-gray-800",
                    isMobile && "cursor-pointer" 
                  )}
                  onClick={() => {
                    if (isMobile && !isUpdating) {
                      setIsEditing(true);
                    }
                  }}
                >
                  {highlightedTitle}
                </p>
                
                {/* Hiển thị ngày tháng ( mobile) */}
                <div className="flex sm:hidden items-center gap-2 mt-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(task.createdAt).toLocaleDateString('vi-VN')}</span>
                  {task.completedAt && (
                    <>
                      <span>→</span>
                      <span className="text-green-500">
                        {new Date(task.completedAt).toLocaleDateString('vi-VN')}
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Hiển thị ngày tháng ( desktop) */}
          <div className="hidden sm:flex items-center gap-2">
            <Calendar className="w-3 h-3 lg:w-4 lg:h-4 text-gray-500" />
            <span className="text-xs lg:text-sm text-gray-500">
              {new Date(task.createdAt).toLocaleDateString('vi-VN')}
            </span>
            {task.completedAt && (
              <>
                <span className="text-xs lg:text-sm text-gray-500">→</span>
                <Calendar className="w-3 h-3 lg:w-4 lg:h-4 text-green-500" />
                <span className="text-xs lg:text-sm text-green-500">
                  {new Date(task.completedAt).toLocaleDateString('vi-VN')}
                </span>
              </>
            )}
          </div>

          {/* Các nút Sửa/Xóa ( desktop ) */}
          <div className="hidden sm:flex gap-2">
            <div className="relative group/edit">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "w-8 h-8 lg:w-9 lg:h-9 rounded-xl",
                  "transition-all duration-300",
                  "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/80", 
                  "hover:scale-110 hover:shadow-md",
                  "active:scale-95",
                  isUpdating && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => setIsEditing(!isEditing)} 
                disabled={isUpdating}
              >
                <SquarePen className="w-4 h-4" />
              </Button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover/edit:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10 shadow-lg">
                {isEditing ? "Hủy" : "Chỉnh sửa"}
              </span>
            </div>

            <div className="relative group/delete">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "w-8 h-8 lg:w-9 lg:h-9 rounded-xl",
                  "transition-all duration-300",
                  "text-gray-600 hover:text-rose-600 hover:bg-rose-50/80", 
                  "hover:scale-110 hover:shadow-md",
                  "active:scale-95",
                  isUpdating && "opacity-50 cursor-not-allowed"
                )}
                onClick={deleteTask}
                disabled={isUpdating}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover/delete:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10 shadow-lg">
                Xóa
              </span>
            </div>
          </div>

          {/* Nút '...' ( mobile ) */}
          <button
            className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={(e) => {
                e.stopPropagation(); 
                setShowMobileMenu(!showMobileMenu);
            }}
            disabled={isUpdating}
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </Card>

      {/* Menu Popover */}
      {showMobileMenu && (
        <div 
            className="sm:hidden absolute top-14 right-4 z-50 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 animate-fadeIn"
            onClick={(e) => e.stopPropagation()} 
        >
            <div className="space-y-2">
              {/* Nút Sửa */}
              <button
                onClick={() => {
                  setIsEditing(true);
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center gap-4 p-3 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                disabled={isUpdating}
              >
                <SquarePen className="w-5 h-5" />
                <span className="font-medium text-base">Chỉnh sửa</span>
              </button>
              
              <button
                onClick={() => {
                  toggleTaskStatus();
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center gap-4 p-3 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                disabled={isUpdating}
              >
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium text-base whitespace-nowrap">
                  {task.status === "complete" ? "Chưa hoàn thành" : "Đã hoàn thành"}
                </span>
              </button>
              
              {/* Nút Xóa */}
              <button
                onClick={() => {
                  deleteTask();
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center gap-4 p-3 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                disabled={isUpdating}
              >
                <Trash2 className="w-5 h-5" />
                <span className="font-medium text-base">Xóa nhiệm vụ</span>
              </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;