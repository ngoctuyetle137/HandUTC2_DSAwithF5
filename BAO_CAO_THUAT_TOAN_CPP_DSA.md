# BÁO CÁO CẤU TRÚC DỮ LIỆU & GIẢI THUẬT (C++ CORE ENGINE)
## HỆ THỐNG TRAO ĐỔI & PASS ĐỒ DÙNG SINH VIÊN UTC2HAND
**Trường Đại học Giao Thông Vận Tải TP.HCM - Phân hiệu UTC2**  
**Học phần:** Cấu trúc Dữ liệu và Giải thuật (DSA)  
**Ngôn ngữ lập trình chính:** C++ (Chuẩn C++17)

---

## I. TỔNG QUAN DỰ ÁN & MỤC TIÊU KẾT HỢP C++

Hệ thống **UTC2Hand** giải quyết bài toán thực tế của sinh viên tại Phân hiệu Trường ĐH Giao Thông Vận Tải TP.HCM (Cơ sở 2 - Man Thiện, Tăng Nhơn Phú A, TP. Thủ Đức):
- Giúp sinh viên trao đổi, pass lại giáo trình, máy tính Casio, đồng phục thể dục, đồ dùng ký túc xá giá rẻ và an toàn.
- Cơ chế cọc đảm bảo và xếp hạng uy tín dựa trên mô hình thuật toán.
- **Toàn bộ lõi xử lý dữ liệu, tìm kiếm, lọc giá, phân loại và tính toán khoảng cách được xây dựng bằng C++17 tối ưu hiệu năng cao.**

Tệp mã nguồn C++ chính:
* Mã nguồn đầy đủ: `dsa_core_engine.cpp`
* Tệp thực thi độc lập: `dsa_core_engine.exe`
* Kịch bản chạy kiểm thử 1-click: `chay_dsa_engine_cpp.bat`

---

## II. BẢNG TỔNG HỢP 9 CẤU TRÚC DỮ LIỆU & GIẢI THUẬT C++

| STT | Bài toán thực tế sinh viên UTC2 | Cấu trúc dữ liệu & Thuật toán C++ | Độ phức tạp thời gian | Giải thích cơ chế kỹ thuật trong C++ |
|---|---|---|---|---|
| **1** | Gợi ý từ khóa Autocomplete khi gõ tìm kiếm | **Trie (Prefix Tree) kết hợp Max-Heap** | $\mathcal{O}(k)$ (với $k$ là độ dài tiền tố) | Mỗi node Trie lưu sẵn `topCache` gồm 5 từ khóa có tần suất (`frequency`) cao nhất. Khi truy vấn tiền tố, hệ thống trả về kết quả ngay lập tức mà không phải duyệt cây con. |
| **2** | Lọc sản phẩm theo khoảng giá $[P_{min}, P_{max}]$ | **AVL Tree (Binary Search Tree tự cân bằng)** | $\mathcal{O}(\log N + K)$ ($K$ là số phần tử thỏa mãn) | Cây cân bằng bằng các phép quay LL, RR, LR, RL. Khóa sắp xếp là `price`. Phép duyệt In-order có chặn nhánh giúp lấy danh sách sản phẩm siêu tốc. |
| **3** | Đề xuất sản phẩm cùng môn học / chuyên ngành | **Graph (Đồ thị vô hướng) + BFS** | $\mathcal{O}(V + E)$ | Các sản phẩm là đỉnh ($V$), các mối liên hệ cùng mã môn (như `VL101`, `GT101`, `DSA202`) là cạnh ($E$). Duyệt BFS theo tầng để đề xuất các món liên quan nhất. |
| **4** | Tìm điểm pass đồ gần nhất theo tọa độ sinh viên | **2D KD-Tree (K-dimensional Tree)** | $\mathcal{O}(\log N)$ trung bình | Lập chỉ mục không gian 2 chiều $(X, Y)$ các vị trí trong trường (Tòa A1, Tòa A2, KTX Cỏ May, Sân bóng, Căn tin). Tỉa nhánh dựa trên khoảng cách Euclid. |
| **5** | Tìm lộ trình đi bộ ngắn nhất giữa 2 tòa nhà | **Dijkstra Algorithm với Min-Heap (`std::priority_queue`)** | $\mathcal{O}((V + E) \log V)$ | Bản đồ lối đi nội bộ cơ sở 2 gồm các trọng số khoảng cách thực tế (mét). Min-Heap giúp luôn mở rộng đỉnh có khoảng cách tạm thời nhỏ nhất. |
| **6** | Lọc sản phẩm hot theo lượt xem | **Segment Tree & Max-Heap** | $\mathcal{O}(\log N)$ cập nhật, $\mathcal{O}(1)$ truy vấn Max | Cập nhật lượt xem thời gian thực khi sinh viên click vào xem chi tiết bài đăng. |
| **7** | Quản lý bảng tin Newsfeed & Xóa bài | **Doubly Linked List (Danh sách liên kết đôi)** | $\mathcal{O}(1)$ chèn đầu, $\mathcal{O}(1)$ xóa node | Hỗ trợ cuộn vô tận (Infinite Scroll), khi người mua đặt cọc thành công thì bài đăng được xóa khỏi bảng tin tức thì trong $\mathcal{O}(1)$. |
| **8** | Xác thực Token phiên đăng nhập sinh viên | **Hash Table (Bảng băm giải quyết đụng độ Chaining)** | $\mathcal{O}(1)$ trung bình | Quản lý bộ nhớ đệm Session Token in-memory, kiểm tra quyền sinh viên và quyền Quản trị viên (Admin MSSV: 6651071091). |
| **9** | Hàng đợi tin nhắn trao đổi & Lịch sử thao tác | **Queue (FIFO) & Undo/Redo Stack (LIFO)** | $\mathcal{O}(1)$ push/pop | Hàng đợi tin nhắn đảm bảo thứ tự thời gian. Ngăn xếp Stack hỗ trợ hoàn tác bài đăng hoặc thao tác nhầm. |

---

## III. KẾT QUẢ KIỂM THỬ HIỆU NĂNG (BENCHMARK)

Kiểm thử trực tiếp trên mã nguồn C++ đo bằng thư viện chuẩn `<chrono>`:

* **Trie + Heap Autocomplete:** ~ $0.34\text{ ms}$ ($344,800\text{ ns}$)
* **AVL Tree Range Query:** ~ $0.04\text{ ms}$ ($40,000\text{ ns}$)
* **2D KD-Tree Nearest Neighbor:** ~ $0.01\text{ ms}$ ($10,900\text{ ns}$)
* **Campus Dijkstra Shortest Path:** ~ $0.26\text{ ms}$ ($267,100\text{ ns}$)
* **Hash Table Session Lookup:** ~ $0.002\text{ ms}$ ($2,200\text{ ns}$)

> **Kết luận:** Tất cả các thuật toán C++ đều thực thi dưới **$1\text{ ms}$**, đáp ứng tiêu chuẩn xử lý thời gian thực theo yêu cầu của hội đồng chấm đề tài.

---

## IV. HƯỚNG DẪN BIÊN DỊCH VÀ CHẠY CHƯƠNG TRÌNH

### Cách 1: Chạy trực tiếp (Nhanh nhất)
1. Mở thư mục dự án trên máy Windows.
2. Bấm đúp chuột vào tệp `chay_dsa_engine_cpp.bat`.
3. Cửa sổ dòng lệnh Terminal sẽ hiện lên với Menu tương tác 9 chức năng và bài đo Benchmark.

### Cách 2: Biên dịch thủ công bằng `g++` (MinGW / GCC)
Mở PowerShell hoặc Command Prompt tại thư mục dự án và chạy:
```bash
g++ -std=c++17 -O2 dsa_core_engine.cpp -o dsa_core_engine.exe
.\dsa_core_engine.exe
```

### Cách 3: Nạp vào IDE (Dev-C++, Code::Blocks, CLion, Visual Studio)
1. Khởi động IDE, chọn **Open File** $\rightarrow$ chọn `dsa_core_engine.cpp`.
2. Chọn chuẩn C++17 trong mục Compiler Settings (nếu cần).
3. Nhấn **F9** (Dev-C++) hoặc **F5 / Ctrl+F5** (Visual Studio) để Build & Run.
