import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from '@/components/Header';
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery, searchTerm]);

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks || []);
      setActiveTaskCount(res.data.activeCount || 0);
      setCompleteTaskCount(res.data.completeCount || 0);
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất tasks:", error);
      toast.error("Lỗi xảy ra khi truy xuất tasks.");
    }
  };

  const handleTaskChanged = () => {
    fetchTasks();
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter và search
  const filteredTasks = taskBuffer.filter((task) => {
    const matchesFilter = 
      filter === "all" || 
      (filter === "active" && task.status === "active") ||
      (filter === "completed" && task.status === "complete");
    
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);
  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  useEffect(() => {
    if (visibleTasks.length === 0 && page > 1 && filteredTasks.length > 0) {
      setPage(page - 1);
    }
  }, [visibleTasks.length, page, filteredTasks.length]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-x-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-60 h-60 sm:w-80 sm:h-80 bg-purple-300 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-60 h-60 sm:w-80 sm:h-80 bg-pink-300 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-40 right-1/3 w-60 h-60 sm:w-80 sm:h-80 bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container pt-4 sm:pt-6 lg:pt-8 pb-8 mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {/* Header with Stats */}
          <Header 
            totalTasks={taskBuffer.length}
            activeCount={activeTaskCount}
            completeCount={completeTaskCount}
          />
          
          {/* Add Task */}
          <AddTask handleNewTaskAdded={handleTaskChanged} />

          {/* Stats and Filter with Search */}
          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {/* Task List */}
          <TaskList 
            filteredTask={visibleTasks}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
            searchTerm={searchTerm}
          />

          {/* Pagination & DateTimeFilter */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter 
              dateQuery={dateQuery} 
              setDateQuery={setDateQuery}
            />
          </div>

          {/* Footer with Progress */}
          <Footer
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;