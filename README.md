# ToDoList - Ứng dụng Quản lý Công việc Cá Nhân

Một ứng dụng web đơn giản nhưng mạnh mẽ giúp bạn quản lý các nhiệm vụ hàng ngày, theo dõi tiến độ và nâng cao năng suất.

** Link Demo Trực Tuyến:** [https://todolist-l88c.onrender.com](https://todolist-l88c.onrender.com)

##  Tính Năng Nổi Bật

* **Thêm Nhiệm Vụ:** Tạo nhanh các công việc cần làm.
* **Quản lý Trạng Thái:** Dễ dàng đánh dấu nhiệm vụ là "Đang làm" hoặc "Hoàn thành".
* **Sửa & Xóa:** Chỉnh sửa tên hoặc loại bỏ các nhiệm vụ không cần thiết.
* **Lọc Thông Minh:**
    * Lọc theo trạng thái (Tất cả / Đang làm / Hoàn thành).
    * Lọc theo thời gian (Hôm nay / Sắp tới / Quá hạn / Tất cả).
* **Tìm Kiếm Nhanh:** Tìm kiếm nhiệm vụ theo tiêu đề với tính năng tô sáng kết quả.
* **Phân Trang:** Hiển thị danh sách nhiệm vụ một cách gọn gàng, dễ điều hướng.
* **Thống Kê Trực Quan:** Xem tổng số nhiệm vụ, số lượng đang làm và đã hoàn thành.
* **Theo Dõi Tiến Độ:** Thanh tiến trình và thông điệp động viên dựa trên tỷ lệ hoàn thành.
* **Thiết Kế Responsive:** Giao diện đẹp mắt và hoạt động mượt mà trên cả điện thoại, máy tính bảng và máy tính.

##  Công Nghệ Sử Dụng

* **Frontend:**
    * React (với Vite)
    * Tailwind CSS
    * Shadcn UI (cho các component giao diện)
    * Axios (gọi API)
    * Sonner (hiển thị thông báo)
    * Lucide React (icons)
* **Backend:**
    * Node.js
    * Express.js
    * MongoDB (với Mongoose)
    * Cors
    * Dotenv

##  Cài Đặt và Chạy Dự Án (Local)

**Yêu cầu:**
* Node.js (phiên bản 16 trở lên)
* npm hoặc yarn
* MongoDB (cài đặt local hoặc sử dụng dịch vụ cloud như MongoDB Atlas)

**Các bước:**

1.  **Clone Repository:**
    ```bash
    git clone <URL_REPOSITORY_CỦA_BẠN>
    cd ToDoList 
    ```

2.  **Cài đặt Backend:**
    ```bash
    cd backend 
    npm install 
    # Hoặc: yarn install
    ```
    * Tạo file `.env` trong thư mục `backend` và thêm các biến môi trường cần thiết:
        ```env
        PORT=5001 # Hoặc cổng bạn muốn
        DATABASE_URL=<CHUỖI_KẾT_NỐI_MONGODB_CỦA_BẠN> 
        # Ví dụ: mongodb://localhost:27017/todolist hoặc chuỗi kết nối Atlas
        NODE_ENV=development # Quan trọng để bật CORS cho localhost
        ```
    * Khởi động server backend:
        ```bash
        npm run dev # Nếu bạn cấu hình nodemon
        # Hoặc: npm start 
        # Hoặc: node server.js
        ```
    * Server backend sẽ chạy tại `http://localhost:5001` (hoặc cổng bạn đặt).

3.  **Cài đặt Frontend:**
    * Mở một terminal **khác**.
    ```bash
    cd ../frontend 
    npm install
    # Hoặc: yarn install
    ```
    * Khởi động server frontend (Vite):
        ```bash
        npm run dev
        # Hoặc: yarn dev
        ```
    * Frontend sẽ chạy tại `http://localhost:5173` (hoặc cổng Vite tự chọn).

4.  **Truy cập:** Mở trình duyệt và truy cập `http://localhost:5173`.

##  Credit

Made by **Nguyễn Thanh Sơn** ❤️
