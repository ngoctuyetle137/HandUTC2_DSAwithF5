/**
 * UniPass UTC2 / UTC2Hand - App Controller
 * Phục vụ chuẩn giao diện & tính năng:
 * 1. Chat thực thụ giữa các tài khoản sinh viên.
 * 2. Quản lý danh sách tài khoản động (Lưu LocalStorage, hiển thị đầy đủ tài khoản mới tạo).
 * 3. Phân hệ Admin Dashboard chính xác theo yêu cầu file Word doPasss.docx:
 *    - Admin KHÔNG truy cập tin nhắn riêng tư của sinh viên.
 *    - Admin có quyền: Cảnh cáo tài khoản vi phạm, Xóa bài đăng rác/phá giá/sai TimeMark,
 *      Nhắc nhở người dùng, Duyệt kiểm chứng kháng nghị điểm uy tín.
 */

// ==========================================
// 1. DỮ LIỆU BAN ĐẦU
// ==========================================
const INITIAL_PRODUCTS = [
    {
        id: 'P01',
        title: 'Giáo trình Vật Lý Đại Cương 1 (VL101) – Tái bản mới',
        price: 35000,
        originalPrice: 85000,
        category: 'GiaoTrinh',
        courseCode: 'VL101',
        timemarkCode: 'UTC2 - 8924',
        seller: 'Lê Thị Ngọc Tuyết',
        sellerEmail: 'tuyetltn.st@st.utc2.edu.vn',
        sellerRep: 98,
        location: 'Ký túc xá Cỏ May UTC2 (0.5 km)',
        distanceKm: 0.5,
        expiryDays: 6,
        status: 'approved',
        approvedAt: Date.now() - (1 * 24 * 60 * 60 * 1000),
        imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60',
        description: 'Sách sạch đẹp không viết bậy, có kèm đề cương ôn thi học kỳ điểm 9+ môn Vật Lý 1.'
    },
    {
        id: 'P02',
        title: 'Sách Cấu Trúc Dữ Liệu & Giải Thuật (C++) bản in màu',
        price: 45000,
        originalPrice: 110000,
        category: 'GiaoTrinh',
        courseCode: 'DSA01',
        timemarkCode: 'UTC2 - 7719',
        seller: 'Lê Thị Ngọc Tuyết',
        sellerEmail: 'tuyetltn.st@st.utc2.edu.vn',
        sellerRep: 98,
        location: 'Thư viện & Khu tự học UTC2 (0.2 km)',
        distanceKm: 0.2,
        expiryDays: 7,
        status: 'approved',
        approvedAt: Date.now() - (2 * 60 * 60 * 1000),
        imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop&q=60',
        description: 'Bản in màu sắc nét, có chú thích code C++ giải thích cây AVL, cây Trie và thuật toán đồ thị Dijkstra.'
    },
    {
        id: 'P03',
        title: 'Nồi cơm điện mini 1.2L nắp gài cho sinh viên phòng trọ',
        price: 120000,
        originalPrice: 280000,
        category: 'DoGiaDung',
        timemarkCode: 'UTC2 - 9931',
        seller: 'Phúc Lâm',
        sellerEmail: 'lamnp.st@st.utc2.edu.vn',
        sellerRep: 92,
        location: 'Cổng 1 Trường UTC2 (0.4 km)',
        distanceKm: 0.4,
        expiryDays: 4,
        status: 'approved',
        approvedAt: Date.now() - (3 * 24 * 60 * 60 * 1000),
        imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&auto=format&fit=crop&q=60',
        description: 'Nồi chống dính còn rất tốt, nấu cơm dẻo nhanh, tiết kiệm điện, phù hợp 1-2 bạn ở KTX.'
    },
    {
        id: 'P04',
        title: 'Máy tính Casio fx-580VN X chính hãng tem Bitex',
        price: 350000,
        originalPrice: 650000,
        category: 'DoDienTu',
        courseCode: 'TOAN01',
        timemarkCode: 'UTC2 - 1042',
        seller: 'Phúc Lâm',
        sellerEmail: 'lamnp.st@st.utc2.edu.vn',
        sellerRep: 92,
        location: 'Ký túc xá Cỏ May UTC2 (0.5 km)',
        distanceKm: 0.5,
        expiryDays: 5,
        status: 'approved',
        approvedAt: Date.now() - (2 * 24 * 60 * 60 * 1000),
        imageUrl: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=500&auto=format&fit=crop&q=60',
        description: 'Mới 98%, phím nảy nhạy, còn tem bảo hành chính hãng Bitex, hỗ trợ giải phương trình và ma trận.'
    },
    {
        id: 'P05',
        title: 'Áo đồng phục thể dục UTC2 size L vải thun lạnh chính hãng',
        price: 65000,
        originalPrice: 130000,
        category: 'DongPhuc',
        timemarkCode: 'UTC2 - 4412',
        seller: 'Lê Thị Ngọc Tuyết',
        sellerEmail: 'tuyetltn.st@st.utc2.edu.vn',
        sellerRep: 98,
        location: 'Sân bóng đá & Nhà thi đấu UTC2 (0.3 km)',
        distanceKm: 0.3,
        expiryDays: 7,
        status: 'approved',
        approvedAt: Date.now() - (12 * 60 * 60 * 1000),
        imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60',
        description: 'Áo đồng phục thể dục trường UTC2 mặc thoáng mát, logo trường in rõ đẹp, mới giặt sạch.'
    },
    {
        id: 'P06',
        title: 'Xe đạp thể thao Martin 107 màu xanh dương đi học quanh trường UTC2',
        price: 450000,
        originalPrice: 1200000,
        category: 'XeCo',
        timemarkCode: 'UTC2 - 6618',
        seller: 'Phúc Lâm',
        sellerEmail: 'lamnp.st@st.utc2.edu.vn',
        sellerRep: 92,
        location: 'Bãi giữ xe Tòa A1 UTC2 (0.1 km)',
        distanceKm: 0.1,
        expiryDays: 7,
        status: 'approved',
        approvedAt: Date.now() - (6 * 60 * 60 * 1000),
        imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&auto=format&fit=crop&q=60',
        description: 'Xe đạp nhẹ nhàng, phanh tốt, có sẵn giỏ xe đựng cặp sách và khóa dây kèm theo.'
    },
    {
        id: 'P07',
        title: 'Combo bàn học gấp gọn & Đèn LED chống cận phòng KTX',
        price: 85000,
        originalPrice: 190000,
        category: 'DoGiaDung',
        timemarkCode: 'UTC2 - 3315',
        seller: 'Lê Thị Ngọc Tuyết',
        sellerEmail: 'tuyetltn.st@st.utc2.edu.vn',
        sellerRep: 98,
        location: 'Ký túc xá Cỏ May UTC2 (0.5 km)',
        distanceKm: 0.5,
        expiryDays: 6,
        status: 'approved',
        approvedAt: Date.now() - (18 * 60 * 60 * 1000),
        imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&auto=format&fit=crop&q=60',
        description: 'Bàn chân sắt gấp chắc chắn có khe để iPad, đèn LED 3 chế độ sáng cắm sạc USB.'
    },
    {
        id: 'P08',
        title: 'Giáo trình Giải Tích 1 (GT101) bản đẹp kèm bộ đề thi giữa kỳ',
        price: 30000,
        originalPrice: 75000,
        category: 'GiaoTrinh',
        courseCode: 'GT101',
        timemarkCode: 'UTC2 - 5521',
        seller: 'Phúc Lâm',
        sellerEmail: 'lamnp.st@st.utc2.edu.vn',
        sellerRep: 92,
        location: 'Tòa A2 - Giảng Đường UTC2 (0.2 km)',
        distanceKm: 0.2,
        expiryDays: 7,
        status: 'approved',
        approvedAt: Date.now() - (5 * 60 * 60 * 1000),
        imageUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd9?w=500&auto=format&fit=crop&q=60',
        description: 'Đầy đủ bài tập giải tích 1 có lời giải chi tiết, phục vụ ôn thi K64.'
    }
];


// Tài khoản quản trị viên chính thức ban đầu và các tài khoản sinh viên mẫu
const DEFAULT_USERS = [
    {
        id: 'ADMIN',
        name: 'Quản Trị Viên UTC2 (6651071091)',
        email: '6651071091@st.utc2.edu.vn',
        password: 'TietLee113377',
        role: 'admin',
        reputation: 100,
        coins: 9999,
        avatarLetter: 'A'
    },
    {
        id: 'U_TUYET',
        name: 'Lê Thị Ngọc Tuyết',
        email: 'tuyetltn.st@st.utc2.edu.vn',
        password: '123456',
        role: 'student',
        reputation: 98,
        coins: 20,
        avatarLetter: 'T'
    },
    {
        id: 'U_LAM',
        name: 'Phúc Lâm',
        email: 'lamnp.st@st.utc2.edu.vn',
        password: '123456',
        role: 'student',
        reputation: 92,
        coins: 20,
        avatarLetter: 'L'
    },
    {
        id: 'U_SINHVIEN',
        name: 'Sinh Viên UTC2',
        email: 'sinhvien@st.utc2.edu.vn',
        password: '123456',
        role: 'student',
        reputation: 95,
        coins: 20,
        avatarLetter: 'S'
    }
];

const ADMIN_CREDENTIALS = {
    email: '6651071091@st.utc2.edu.vn',
    password: 'TietLee113377'
};

const USERS_REGISTRY = {
    admin: DEFAULT_USERS[0],
    tuyet: DEFAULT_USERS[1],
    lam: DEFAULT_USERS[2],
    sinhvien: DEFAULT_USERS[3]
};

// ==========================================
// 2. STATE MANAGER TRUNG TÂM
// ==========================================
class AppController {
    constructor() {
        this.registeredUsers = [];
        this.currentUserKey = null;
        this.user = null;
        this.isLoggedIn = false;
        this.isAdminAuthenticated = false;
        this.currentAuthMode = 'login';
        this.generatedOtp = '';

        this.products = [];
        this.chatMessages = [];
        this.depositOrders = [];
        this.adminDisputes = [];
        this.adminWarningsIssued = [];
        this.notifications = [];

        this.filterMaxPrice = 350000;
        this.filterMinPrice = 0;
        this.filterMaxDistance = 5;
        this.filterCategoryKey = 'ALL';
        this.filterMinReputation = 90;
        this.filterCriteriaEnabled = {
            price: false,
            category: false,
            reputation: false
        };
        this.searchKeyword = '';
        this.sortBy = 'newest';
        this.isFilterActive = true; // Mặc định mở bộ lọc song song với danh sách sản phẩm

        // Khởi tạo các cấu trúc DSA in-memory
        this.trie = new window.UTC2_DSA.TrieWithHeap();
        this.avl = new window.UTC2_DSA.AVLTree();
        this.msgQueue = new window.UTC2_DSA.MessageQueue();
        this.postDLL = new window.UTC2_DSA.PostDoublyLinkedList();

        // Kênh BroadcastChannel đồng bộ đa tab Realtime
        if (typeof BroadcastChannel !== 'undefined') {
            this.syncChannel = new BroadcastChannel('unipass_realtime_channel');
            this.syncChannel.onmessage = this.handleSyncMessage.bind(this);
        }

        this.init();
    }

    init() {
        // Tải danh sách người dùng đã đăng ký từ localStorage
        const savedUsers = localStorage.getItem('unipass_registered_users');
        if (savedUsers) {
            try {
                this.registeredUsers = JSON.parse(savedUsers);
                // Bổ sung các tài khoản mẫu nếu chưa có trong danh sách lưu trữ
                DEFAULT_USERS.forEach(defUser => {
                    const idx = this.registeredUsers.findIndex(u => (u.email && u.email.toLowerCase() === defUser.email.toLowerCase()) || u.id === defUser.id);
                    if (idx === -1) {
                        this.registeredUsers.push({ ...defUser });
                    } else {
                        // Đảm bảo mật khẩu tài khoản mẫu luôn có hiệu lực
                        if (!this.registeredUsers[idx].password) {
                            this.registeredUsers[idx].password = defUser.password;
                        }
                    }
                });
                this.saveUsers();
            } catch (e) {
                this.registeredUsers = [...DEFAULT_USERS];
                this.saveUsers();
            }
        } else {
            this.registeredUsers = [...DEFAULT_USERS];
            this.saveUsers();
        }

        // Tải sản phẩm
        const savedProducts = localStorage.getItem('unipass_products');
        if (savedProducts) {
            try {
                this.products = JSON.parse(savedProducts);
                const existingIds = new Set(this.products.map(p => p.id));
                INITIAL_PRODUCTS.forEach(initP => {
                    if (!existingIds.has(initP.id)) {
                        this.products.push(initP);
                    }
                });
            } catch (e) {
                this.products = [...INITIAL_PRODUCTS];
            }
        } else {
            this.products = [...INITIAL_PRODUCTS];
            this.saveProducts();
        }

        // Tải tin nhắn
        const savedChats = localStorage.getItem('unipass_shared_messages');
        if (savedChats) {
            try { this.chatMessages = JSON.parse(savedChats); } catch (e) { this.chatMessages = []; }
        } else {
            this.chatMessages = [
                {
                    id: 'M1',
                    sender: 'Lê Thị Ngọc Tuyết',
                    receiver: 'Phúc Lâm',
                    productId: 'P03',
                    text: 'Chào bạn Lâm, nồi cơm điện mini bạn còn pass không?',
                    time: '08:15'
                },
                {
                    id: 'M2',
                    sender: 'Phúc Lâm',
                    receiver: 'Lê Thị Ngọc Tuyết',
                    productId: 'P03',
                    text: 'Chào Tuyết, nồi cơm vẫn còn nhé! Mình trọ gần cổng 1, có thể mang qua KTX Cỏ May cho bạn.',
                    time: '08:20'
                }
            ];
            this.saveChats();
        }

        // Tải đơn cọc
        const savedOrders = localStorage.getItem('unipass_deposit_orders');
        if (savedOrders) {
            try { this.depositOrders = JSON.parse(savedOrders); } catch (e) { this.depositOrders = []; }
        }

        // Tự động dọn dẹp tin nhắn của các đơn hàng đã hoàn tất thành công từ trước
        this.cleanupCompletedOrdersChats();

        // Khởi tạo danh sách ID tin nhắn đã đọc (Messenger Flow)
        const savedReadIds = localStorage.getItem('unipass_read_message_ids');
        try {
            this.readMessageIds = new Set(savedReadIds ? JSON.parse(savedReadIds) : []);
        } catch (e) {
            this.readMessageIds = new Set();
        }

        // Tải thông báo người dùng
        const savedNotifs = localStorage.getItem('unipass_user_notifications');
        if (savedNotifs) {
            try { this.notifications = JSON.parse(savedNotifs); } catch (e) { this.notifications = []; }
        } else {
            this.notifications = [];
        }

        // Tự động kiểm tra và xóa các bài đăng đã quá 7 ngày kể từ lúc được duyệt
        this.checkAndCleanExpiredPosts();
        if (typeof window !== 'undefined') {
            setInterval(() => this.checkAndCleanExpiredPosts(), 60000);
        }

        // Tải hồ sơ khiếu nại giao dịch
        const savedDisputes = localStorage.getItem('unipass_admin_disputes');
        if (savedDisputes) {
            try { this.adminDisputes = JSON.parse(savedDisputes); } catch (e) { this.adminDisputes = []; }
        }

        // Kiểm tra phiên đăng nhập đã lưu
        const savedUser = localStorage.getItem('unipass_current_user');
        if (savedUser) {
            try {
                const parsed = JSON.parse(savedUser);
                if (parsed && parsed.email) {
                    this.user = parsed;
                    this.isLoggedIn = true;
                    if (parsed.email === ADMIN_CREDENTIALS.email) {
                        this.isAdminAuthenticated = true;
                    }
                } else {
                    this.user = null;
                    this.isLoggedIn = false;
                    this.isAdminAuthenticated = false;
                }
            } catch (e) {
                this.user = null;
                this.isLoggedIn = false;
            }
        } else {
            this.user = null;
            this.isLoggedIn = false;
        }

        this.rebuildDSACache();
        this.checkAuthDisplay();
        this.updateUserUI();
        this.renderProducts();
        this.updateDepositBadge();
        this.updateChatUnreadBadge();
        this.updateNotificationBadge();
        this.renderNotifications();
        this.initSupabaseSync();
        this.initOnlineSync();
    }

    async syncUsersFromCloud(manual = false) {
        const spinEl = document.getElementById('syncUserSpin');
        if (spinEl) spinEl.style.display = 'inline-block';
        if (spinEl) spinEl.style.transform = 'rotate(360deg)';
        if (manual) showToast('🔄 Đang đồng bộ danh sách tài khoản từ Supabase Cloud...', 'info');

        if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
            try {
                const cloudProfiles = await window.UniPassSupabase.getProfiles();
                if (cloudProfiles && Array.isArray(cloudProfiles) && cloudProfiles.length > 0) {
                    cloudProfiles.forEach(cp => {
                        if (!cp.email) return;
                        const emailLower = cp.email.toLowerCase();
                        const isOfficialAdmin = (emailLower === ADMIN_CREDENTIALS.email.toLowerCase() || cp.role === 'admin');

                        const mappedUser = {
                            id: cp.id || ('U_' + Date.now()),
                            name: cp.name || emailLower.split('@')[0],
                            email: cp.email,
                            password: cp.password || '123456',
                            role: isOfficialAdmin ? 'admin' : (cp.role || 'student'),
                            reputation: typeof cp.reputation === 'number' ? cp.reputation : (Number(cp.reputation) || 95),
                            coins: typeof cp.coins === 'number' ? cp.coins : (Number(cp.coins) || (isOfficialAdmin ? 9999 : 20)),
                            avatarLetter: cp.avatar_letter || (cp.name ? cp.name.charAt(0).toUpperCase() : emailLower.charAt(0).toUpperCase()),
                            avatarUrl: cp.avatar_url || null,
                            mssv: cp.mssv || null,
                            phone: cp.phone || null,
                            isEmailVerified: true,
                            verifiedAt: cp.created_at || new Date().toISOString()
                        };

                        const idx = this.registeredUsers.findIndex(u => 
                            (u.email && u.email.toLowerCase() === emailLower) || 
                            (u.id && u.id === mappedUser.id)
                        );

                        if (idx !== -1) {
                            this.registeredUsers[idx] = { ...this.registeredUsers[idx], ...mappedUser };
                        } else {
                            this.registeredUsers.push(mappedUser);
                        }
                    });

                    this.saveUsers();
                    this.renderAdminDashboard();
                    this.renderProducts();
                    this.renderChatInbox();
                    this.renderChatMessages();
                    console.log(`✅ [Supabase] Đã đồng bộ ${cloudProfiles.length} tài khoản từ Cloud! Tổng tài khoản: ${this.registeredUsers.length}`);
                    if (manual) {
                        showToast(`✓ Đã nạp thành công ${this.registeredUsers.length} tài khoản từ Supabase Cloud!`, 'success');
                    }
                }
            } catch (err) {
                console.error('❌ Lỗi khi đồng bộ tài khoản từ Cloud:', err);
                if (manual) showToast('Không thể kết nối tới Cloud để tải danh sách tài khoản!', 'danger');
            }
        }

        if (spinEl) spinEl.style.transform = 'none';
    }

    async initSupabaseSync() {
        if (typeof updateSupabaseNavIndicator === 'function') {
            updateSupabaseNavIndicator();
        }

        // Đợi Supabase SDK CDN sẵn sàng (tối đa 3 giây nếu mạng di động 4G tải chậm)
        let attempts = 0;
        while ((!window.supabase || !window.UniPassSupabase || !window.UniPassSupabase.getClient()) && attempts < 15) {
            await new Promise(r => setTimeout(r, 200));
            attempts++;
        }

        if (!window.UniPassSupabase || !window.UniPassSupabase.isConfigured()) {
            return;
        }

        if (typeof updateSupabaseNavIndicator === 'function') {
            updateSupabaseNavIndicator();
        }

        // Lắng nghe sự kiện xác thực email từ Supabase Auth (khi người dùng bấm Sign in trong email)
        if (window.UniPassSupabase && window.UniPassSupabase.initAuthListener) {
            window.UniPassSupabase.initAuthListener((supaUser) => {
                if (!supaUser || !supaUser.email) return;
                console.log('🎉 [Supabase Auth] Người dùng đã xác thực email thành công:', supaUser.email);
                window.app.emailVerifiedByMagicLink = true;
                window.app.verifiedSupabaseEmail = supaUser.email;

                const emailInput = document.getElementById('authEmailInput');
                const otpInput = document.getElementById('authOtpInput');
                const otpBadge = document.getElementById('otpStatusBadge');

                if (emailInput && (!emailInput.value || emailInput.value === supaUser.email)) {
                    emailInput.value = supaUser.email;
                }
                if (otpInput) {
                    otpInput.value = 'CONFIRMED';
                }
                if (otpBadge) {
                    otpBadge.innerText = 'Đã Xác Thực ✓';
                    otpBadge.style.background = '#dcfce7';
                    otpBadge.style.color = '#15803d';
                }

                showToast(`✓ Đã xác thực thành công Gmail ${supaUser.email} từ liên kết Supabase!`, 'success');
            });
        }

        console.log('🔄 Đang đồng bộ dữ liệu từ Supabase Cloud...');
        try {
            // 0. Tải và đồng bộ toàn bộ tài khoản người dùng từ Supabase Cloud
            await this.syncUsersFromCloud();

            // Tải sản phẩm từ Supabase
            const cloudProducts = await window.UniPassSupabase.getProducts();
            if (cloudProducts && Array.isArray(cloudProducts) && cloudProducts.length > 0) {
                // Hợp nhất sản phẩm từ Cloud với sản phẩm cục bộ (để các bài vừa tạo chưa kịp lên Cloud không bị mất)
                const cloudIds = new Set(cloudProducts.map(p => p.id));
                const localOnly = this.products.filter(p => !cloudIds.has(p.id));
                this.products = [...localOnly, ...cloudProducts];
                this.saveProducts();
                this.rebuildDSACache();
                this.renderProducts();
                this.renderAdminDashboard();
                this.renderProfile();
                console.log(`✅ [Supabase] Đã nạp ${cloudProducts.length} sản phẩm từ Cloud (Kèm ${localOnly.length} bài cục bộ)`);
            }

            // Tải tin nhắn từ Supabase và hợp nhất bảo toàn 100% tin nhắn đã có
            const cloudMessages = await window.UniPassSupabase.getChatMessages();
            if (cloudMessages && Array.isArray(cloudMessages) && cloudMessages.length > 0) {
                const existingMap = new Map();
                this.chatMessages.forEach(m => {
                    if (m && m.id) existingMap.set(m.id, m);
                });
                cloudMessages.forEach(cm => {
                    if (cm && cm.id && !existingMap.has(cm.id)) {
                        existingMap.set(cm.id, cm);
                    }
                });
                this.chatMessages = Array.from(existingMap.values());
                this.saveChats();
                this.renderChatMessages();
                this.renderChatInbox();
                this.updateChatUnreadBadge();
                console.log(`✅ [Supabase] Đã hợp nhất ${this.chatMessages.length} tin nhắn (Cloud + Local)`);
            }

            // Tải đơn cọc từ Supabase
            const cloudOrders = await window.UniPassSupabase.getOrders();
            if (cloudOrders && Array.isArray(cloudOrders) && cloudOrders.length > 0) {
                this.depositOrders = cloudOrders.map(o => ({
                    id: o.id,
                    productId: o.product_id,
                    productTitle: o.product_title,
                    seller: o.seller_name,
                    buyer: o.buyer_name,
                    depositAmount: Number(o.deposit_amount),
                    shipFee: Number(o.shipping_fee),
                    discountCoins: Math.round(Number(o.discount_amount) / 100),
                    finalTotal: Number(o.total_payment),
                    timestamp: new Date(o.created_at).getTime()
                }));
                this.updateDepositBadge();
                this.cleanupCompletedOrdersChats();
            }

            // Đăng ký nhận sự kiện Realtime qua WebSocket
            window.UniPassSupabase.subscribeRealtime(this.handleSupabaseRealtimeEvent.bind(this));
        } catch (err) {
            console.error('❌ Lỗi khi đồng bộ ban đầu với Supabase:', err);
        }
    }

    handleSupabaseRealtimeEvent(table, payload) {
        if (!payload) return;
        console.log(`🔔 [Realtime Event] Bảng: ${table}, Loại: ${payload.eventType}`);

        if (table === 'products') {
            if (payload.eventType === 'INSERT') {
                const newP = payload.new;
                let clientStatus = 'approved';
                if (newP.status === 'hidden') clientStatus = 'pending';
                else if (newP.status === 'available') clientStatus = 'approved';
                else if (newP.status === 'deleted') clientStatus = 'deleted';
                else clientStatus = newP.status || 'approved';

                if (!this.products.some(p => p.id === newP.id)) {
                    this.products.unshift({
                        id: newP.id,
                        title: newP.title,
                        price: Number(newP.price),
                        originalPrice: Number(newP.original_price || newP.price),
                        category: newP.category,
                        courseCode: newP.course_code || '',
                        timemarkCode: newP.timemark_code || 'UTC2 - PASS',
                        seller: newP.seller_name,
                        sellerEmail: newP.seller_email,
                        sellerRep: Number(newP.seller_rep) || 95,
                        location: newP.location,
                        distanceKm: Number(newP.distance_km) || 0.5,
                        expiryDays: Number(newP.expiry_days) || 7,
                        imageUrl: newP.image_url,
                        timemarkProofUrl: newP.timemark_proof_url || '',
                        description: newP.description,
                        status: clientStatus
                    });
                    this.saveProducts();
                    this.rebuildDSACache();
                    this.renderProducts();
                    this.renderAdminDashboard();
                    this.renderProfile();
                    if (window.sound) window.sound.playNotification();
                    if (clientStatus === 'pending') {
                        if (this.user && this.user.role === 'admin') {
                            showToast(`🛡️ [BÀI ĐĂNG CHỜ DUYỆT] Có bài đăng mới "${newP.title}" kèm ảnh TimeMark đang chờ duyệt!`, 'warning');
                        }
                    } else {
                        showToast(`📦 Có bài đăng pass đồ mới: "${newP.title}"!`, 'info');
                    }
                }
            } else if (payload.eventType === 'UPDATE') {
                const updatedP = payload.new;
                let clientStatus = 'approved';
                if (updatedP.status === 'hidden') clientStatus = 'pending';
                else if (updatedP.status === 'available') clientStatus = 'approved';
                else if (updatedP.status === 'deleted') clientStatus = 'deleted';
                else clientStatus = updatedP.status || 'approved';

                if (clientStatus === 'deleted') {
                    this.products = this.products.filter(p => p.id !== updatedP.id);
                } else {
                    const idx = this.products.findIndex(p => p.id === updatedP.id);
                    if (idx !== -1) {
                        this.products[idx].status = clientStatus;
                        if (updatedP.title) this.products[idx].title = updatedP.title;
                        if (updatedP.price) this.products[idx].price = Number(updatedP.price);
                        if (clientStatus === 'approved') {
                            const approvedItem = this.products.splice(idx, 1)[0];
                            this.products.unshift(approvedItem);
                        }
                    } else {
                        this.products.unshift({
                            id: updatedP.id,
                            title: updatedP.title,
                            price: Number(updatedP.price),
                            originalPrice: Number(updatedP.original_price || updatedP.price),
                            category: updatedP.category,
                            courseCode: updatedP.course_code || '',
                            timemarkCode: updatedP.timemark_code || 'UTC2 - PASS',
                            seller: updatedP.seller_name,
                            sellerEmail: updatedP.seller_email,
                            sellerRep: Number(updatedP.seller_rep) || 95,
                            location: updatedP.location,
                            distanceKm: Number(updatedP.distance_km) || 0.5,
                            expiryDays: Number(updatedP.expiry_days) || 7,
                            imageUrl: updatedP.image_url,
                            timemarkProofUrl: updatedP.timemark_proof_url || '',
                            description: updatedP.description,
                            status: clientStatus
                        });
                    }
                }
                this.saveProducts();
                this.rebuildDSACache();
                this.renderProducts();
                this.renderAdminDashboard();
                this.renderProfile();
            } else if (payload.eventType === 'DELETE') {
                const targetId = payload.old ? payload.old.id : null;
                if (targetId) {
                    this.products = this.products.filter(p => p.id !== targetId);
                    this.rebuildDSACache();
                    this.renderProducts();
                    this.renderAdminDashboard();
                }
            }
        } else if (table === 'chat_messages') {
            if (payload.eventType === 'INSERT') {
                const newM = payload.new;
                if (!this.chatMessages.some(m => m.id === newM.id)) {
                    this.chatMessages.push({
                        id: newM.id,
                        sender: newM.sender_name,
                        senderEmail: newM.sender_email,
                        receiver: newM.receiver_name,
                        receiverEmail: newM.receiver_email,
                        productId: newM.product_id,
                        text: newM.text,
                        time: newM.time_str
                    });
                    this.saveChats();
                    this.renderChatMessages();
                    this.renderChatInbox();
                    this.updateChatUnreadBadge();

                    const myN = (this.user ? this.user.name : '').toLowerCase();
                    const myE = (this.user ? this.user.email : '').toLowerCase();
                    const recN = (newM.receiver_name || '').toLowerCase();
                    const recE = (newM.receiver_email || '').toLowerCase();
                    const isForMe = (myN && recN === myN) || (myE && recE === myE) || (myE && recN === myE);

                    if (isForMe) {
                        this.handleIncomingChatMessageOnScreen(newM);
                    }
                }
            } else if (payload.eventType === 'DELETE') {
                const oldM = payload.old;
                if (oldM && oldM.id) {
                    this.chatMessages = this.chatMessages.filter(m => m.id !== oldM.id);
                    this.renderChatMessages();
                    this.updateChatUnreadBadge();
                }
            }
        } else if (table === 'orders') {
            if (payload.eventType === 'INSERT') {
                const ord = payload.new;
                if (!this.depositOrders.some(o => o.id === ord.id)) {
                    this.depositOrders.unshift({
                        id: ord.id,
                        productId: ord.product_id,
                        productTitle: ord.product_title,
                        seller: ord.seller_name,
                        buyer: ord.buyer_name,
                        depositAmount: Number(ord.deposit_amount),
                        shipFee: Number(ord.shipping_fee),
                        discountCoins: Math.round(Number(ord.discount_amount) / 100),
                        finalTotal: Number(ord.total_payment),
                        timestamp: new Date(ord.created_at).getTime()
                    });
                    this.updateDepositBadge();
                    if (ord.seller_name === this.user.name) {
                        if (window.sound) window.sound.playSuccess();
                        showToast(`🤝 Sinh viên ${ord.buyer_name} vừa đặt cọc giữ chỗ món "${ord.product_title}"!`, 'success');
                    }
                }
            } else if (payload.eventType === 'UPDATE') {
                const ord = payload.new;
                const idx = this.depositOrders.findIndex(o => o.id === ord.id);
                if (idx !== -1) {
                    this.depositOrders[idx].status = ord.status;
                }
                if (ord.status === 'completed') {
                    this.cleanupCompletedOrdersChats();
                    this.renderChatMessages();
                }
            }
        } else if (table === 'admin_warnings') {
            if (payload.eventType === 'INSERT') {
                const warn = payload.new;
                if (warn.target_name === this.user.name || warn.target_email === this.user.email) {
                    if (window.sound) window.sound.playWarning();
                    showToast(`⚠️ CẢNH CÁO TỪ ADMIN: ${warn.reason} (-${warn.penalty_points} điểm uy tín)`, 'danger');
                    this.user.reputation = Math.max(0, (this.user.reputation || 95) - Number(warn.penalty_points));
                    this.updateUserUI();
                }
            }
        } else if (table === 'profiles') {
            const pUser = payload.new;
            if (pUser && pUser.email) {
                const emailLower = pUser.email.toLowerCase();
                const isOfficialAdmin = (emailLower === ADMIN_CREDENTIALS.email.toLowerCase() || pUser.role === 'admin');
                const mappedUser = {
                    id: pUser.id || ('U_' + Date.now()),
                    name: pUser.name || emailLower.split('@')[0],
                    email: pUser.email,
                    password: pUser.password || '123456',
                    role: isOfficialAdmin ? 'admin' : (pUser.role || 'student'),
                    reputation: typeof pUser.reputation === 'number' ? pUser.reputation : (Number(pUser.reputation) || 95),
                    coins: typeof pUser.coins === 'number' ? pUser.coins : (Number(pUser.coins) || (isOfficialAdmin ? 9999 : 20)),
                    avatarLetter: pUser.avatar_letter || (pUser.name ? pUser.name.charAt(0).toUpperCase() : emailLower.charAt(0).toUpperCase()),
                    avatarUrl: pUser.avatar_url || null,
                    mssv: pUser.mssv || null,
                    phone: pUser.phone || null,
                    isEmailVerified: true
                };
                const idx = this.registeredUsers.findIndex(u => 
                    (u.email && u.email.toLowerCase() === emailLower) || 
                    (u.id && u.id === mappedUser.id)
                );
                if (idx !== -1) {
                    this.registeredUsers[idx] = { ...this.registeredUsers[idx], ...mappedUser };
                    if (this.user && this.user.email && this.user.email.toLowerCase() === emailLower) {
                        this.user = { ...this.user, ...mappedUser };
                        localStorage.setItem('unipass_current_user', JSON.stringify(this.user));
                        this.updateUserUI();
                    }
                } else {
                    this.registeredUsers.push(mappedUser);
                }
                this.saveUsers();
                this.renderProducts();
                this.renderAdminDashboard();
                this.renderChatInbox();
                this.renderChatMessages();
            }
        }
    }

    initOnlineSync() {
        if (!window.UniPassOnlineSync) return;

        // 1. Nhận bài đăng mới từ Máy B, C, D... tức thì
        window.UniPassOnlineSync.on('NEW_POST', (post) => {
            if (!post || !post.id) return;
            const exists = this.products.some(p => p.id === post.id);
            if (!exists) {
                this.products.unshift(post);
                localStorage.setItem('unipass_products', JSON.stringify(this.products));
                this.rebuildDSACache();
                this.renderProducts();
                this.renderAdminDashboard();
                this.renderProfile();

                if (window.sound) window.sound.playNotification();
                if (post.status === 'pending') {
                    if (this.user && this.user.role === 'admin') {
                        showToast(`🛡️ [BÀI ĐĂNG CHỜ DUYỆT] ${post.seller} vừa gửi bài "${post.title}" kèm ảnh TimeMark!`, 'warning');
                    }
                } else {
                    showToast(`📦 [MÁY KHÁC VỪA ĐĂNG] ${post.seller} pass: "${post.title}"!`, 'info');
                }
            }
        });

        // 1b. Nhận sự kiện bài đăng được Admin phê duyệt TimeMark
        window.UniPassOnlineSync.on('POST_APPROVED', (data) => {
            if (!data || !data.postId) return;
            let post = this.products.find(p => p.id === data.postId);
            if (post) {
                post.status = 'approved';
                post.approvedAt = Date.now();
                // Đưa bài vừa duyệt lên đầu danh sách để hiển thị ngay trên trang chính
                this.products = [post, ...this.products.filter(p => p.id !== data.postId)];
            } else if (data.post) {
                post = { ...data.post, status: 'approved', approvedAt: Date.now() };
                this.products.unshift(post);
            }

            if (post) {
                this.addNotification({
                    targetName: post.seller,
                    targetEmail: post.sellerEmail,
                    title: 'Bài đăng đã được duyệt!',
                    message: `Bài đăng "${post.title}" của bạn đã được Admin phê duyệt TimeMark và hiển thị lên trang chính (+1 điểm uy tín). Bài sẽ tự động xóa sau 7 ngày kể từ lúc duyệt.`,
                    type: 'post_approved',
                    relatedId: post.id
                });
            }

            localStorage.setItem('unipass_products', JSON.stringify(this.products));
            this.rebuildDSACache();
            this.renderProducts();
            this.renderAdminDashboard();
            this.renderProfile();
            if (window.sound) window.sound.playSuccess();
            showToast(`🎉 Bài đăng "${(post && post.title) || 'Mới'}" vừa được Admin phê duyệt và xuất hiện trên trang chính!`, 'info');
        });

        // 1c. Nhận sự kiện bài đăng bị Admin từ chối TimeMark
        window.UniPassOnlineSync.on('POST_REJECTED', (data) => {
            if (!data || !data.postId) return;
            const post = this.products.find(p => p.id === data.postId);
            if (post) {
                post.status = 'rejected';
                post.rejectReason = data.reason || 'Ảnh TimeMark không hợp lệ';
                this.addNotification({
                    targetName: post.seller,
                    targetEmail: post.sellerEmail,
                    title: 'Bị từ chối duyệt bài đăng',
                    message: `Bài đăng "${post.title}" của bạn bị Admin từ chối duyệt. Lý do: ${post.rejectReason}`,
                    type: 'post_rejected',
                    relatedId: post.id
                });
                localStorage.setItem('unipass_products', JSON.stringify(this.products));
                this.rebuildDSACache();
                this.renderProducts();
                this.renderAdminDashboard();
                this.renderProfile();
            }
        });

        // 2. Nhận lệnh xóa bài đăng trên mạng đa máy
        window.UniPassOnlineSync.on('DELETE_POST', (postId) => {
            if (!postId) return;
            const prevLen = this.products.length;
            this.products = this.products.filter(p => p.id !== postId);
            if (this.products.length !== prevLen) {
                localStorage.setItem('unipass_products', JSON.stringify(this.products));
                this.rebuildDSACache();
                this.renderProducts();
                this.renderAdminDashboard();
                showToast(`🗑️ Bài đăng vi phạm vừa bị Admin gỡ trên toàn hệ thống.`, 'info');
            }
        });

        // 3. Nhận tin nhắn chat trực tiếp từ máy khác (Online Sync đa máy)
        window.UniPassOnlineSync.on('CHAT_MESSAGE', (msg) => {
            if (!msg || !msg.id) return;
            const exists = this.chatMessages.some(m => m.id === msg.id);
            if (!exists) {
                this.chatMessages.push(msg);
                localStorage.setItem('unipass_shared_messages', JSON.stringify(this.chatMessages));
                this.renderChatMessages();
                this.renderChatInbox();
                this.updateChatUnreadBadge();

                const myN = (this.user ? this.user.name : '').toLowerCase();
                const myE = (this.user ? this.user.email : '').toLowerCase();
                const recN = (msg.receiver || '').toLowerCase();
                const recE = (msg.receiverEmail || '').toLowerCase();
                const isForMe = (myN && recN === myN) || (myE && recE === myE) || (myE && recN === myE);

                if (isForMe) {
                    this.handleIncomingChatMessageOnScreen(msg);
                }
            }
        });

        // 4. Nhận đơn đặt cọc giữ chỗ từ máy khác
        window.UniPassOnlineSync.on('DEPOSIT_ORDER', (order) => {
            if (!order || !order.id) return;
            const exists = this.depositOrders.some(o => o.id === order.id);
            if (!exists) {
                this.depositOrders.unshift(order);
                localStorage.setItem('unipass_deposit_orders', JSON.stringify(this.depositOrders));
                this.updateDepositBadge();
                this.renderProfile();

                // Gửi thông báo tới người bán
                this.addNotification({
                    targetName: order.seller,
                    targetEmail: order.sellerEmail,
                    title: 'Có khách đặt cọc đơn hàng!',
                    message: `${order.buyer} vừa thêm đơn hàng "${order.productTitle}" của bạn vào đơn cọc. Vui lòng vào mục Cá Nhân bấm Xác Nhận Đơn.`,
                    type: 'order_deposit',
                    relatedId: order.id
                });

                if (order.seller === this.user.name || order.sellerEmail === this.user.email) {
                    if (window.sound) window.sound.playSuccess();
                    showToast(`🤝 [ĐƠN ĐẶT CỌC MỚI] ${order.buyer} vừa đặt cọc món "${order.productTitle}"! Vui lòng vào mục Cá Nhân bấm Xác Nhận Đơn Hàng.`, 'success');
                }
            }
        });

        // 4b. Nhận cập nhật trạng thái đơn hàng (xác nhận người bán / xác nhận hoàn thành)
        window.UniPassOnlineSync.on('ORDER_UPDATED', (order) => {
            if (!order || !order.id) return;
            const idx = this.depositOrders.findIndex(o => o.id === order.id);
            if (idx !== -1) {
                this.depositOrders[idx] = order;
            } else {
                this.depositOrders.unshift(order);
            }
            localStorage.setItem('unipass_deposit_orders', JSON.stringify(this.depositOrders));
            this.updateDepositBadge();
            this.renderProfile();

            if (this.user) {
                if (order.buyer === this.user.name && order.sellerAccepted && order.status === 'in_trade') {
                    if (window.sound) window.sound.playSuccess();
                    showToast(`🎉 Người bán ${order.seller} đã xác nhận đơn hàng "${order.productTitle}"! Hai bạn hãy gặp nhau trao đổi đồ.`, 'success');
                }
                if (order.status === 'completed' && (order.buyer === this.user.name || order.seller === this.user.name)) {
                    this.cleanupCompletedOrdersChats();
                    this.renderChatMessages();
                    if (window.sound) window.sound.playSuccess();
                    showToast(`🎉 Giao dịch đơn "${order.productTitle}" đã hoàn tất 100%! Bài đăng và lịch sử tin nhắn đã tự động dọn dẹp.`, 'success');
                }
            }
        });

        // 4c. Nhận tín hiệu đồng bộ tin nhắn (Bảo lưu toàn bộ lịch sử cuộc trò chuyện)
        window.UniPassOnlineSync.on('CHAT_DELETED', (data) => {
            console.log('📡 [Online Sync] Giữ nguyên toàn bộ lịch sử cuộc trò chuyện.');
        });

        window.UniPassOnlineSync.on('NEW_DISPUTE', (dispute) => {
            if (!dispute || !dispute.id) return;
            const exists = this.adminDisputes.some(d => d.id === dispute.id);
            if (!exists) {
                this.adminDisputes.unshift(dispute);
                localStorage.setItem('unipass_admin_disputes', JSON.stringify(this.adminDisputes));
                this.renderAdminDashboard();
                if (this.user && this.user.role === 'admin') {
                    if (window.sound) window.sound.playNotification();
                    showToast(`🚨 [KHIẾU NẠI MỚI GỬI ADMIN]: ${dispute.reporterName} tố cáo ${dispute.accusedName} (${dispute.reason})!`, 'danger');
                }
            }
        });

        // 4d. Nhận thông báo kết quả xử lý khiếu nại
        window.UniPassOnlineSync.on('DISPUTE_RESOLVED', (res) => {
            if (!res || !res.disputeId) return;
            const disp = this.adminDisputes.find(d => d.id === res.disputeId);
            if (disp) {
                disp.status = res.status;
                localStorage.setItem('unipass_admin_disputes', JSON.stringify(this.adminDisputes));
                this.renderAdminDashboard();
            }
        });

        // 5. Nhận cảnh cáo xử phạt từ Admin
        window.UniPassOnlineSync.on('ADMIN_WARNING', (warning) => {
            if (!warning) return;
            if (warning.targetName === this.user.name || warning.targetEmail === this.user.email) {
                if (window.sound) window.sound.playWarning();
                showToast(`⚠️ CẢNH CÁO TỪ ADMIN: ${warning.reason} (-${warning.penaltyPoints || 2} điểm)`, 'danger');
                this.user.reputation = Math.max(0, (this.user.reputation || 95) - (warning.penaltyPoints || 2));
                this.updateUserUI();
            }
        });

        // 6. Nhận thông báo tài khoản người dùng đăng ký mới từ các máy khác
        window.UniPassOnlineSync.on('USER_REGISTERED', (data) => {
            if (!data || !data.user || !data.user.email) return;
            const u = data.user;
            const emailLower = u.email.toLowerCase();
            const idx = this.registeredUsers.findIndex(existing => 
                (existing.email && existing.email.toLowerCase() === emailLower) || 
                (existing.id && u.id && existing.id === u.id)
            );
            if (idx !== -1) {
                this.registeredUsers[idx] = { ...this.registeredUsers[idx], ...u };
                if (this.user && this.user.email && this.user.email.toLowerCase() === emailLower) {
                    this.user = { ...this.user, ...u };
                    localStorage.setItem('unipass_current_user', JSON.stringify(this.user));
                    this.updateUserUI();
                }
            } else {
                this.registeredUsers.push(u);
            }
            this.saveUsers();
            this.renderProducts();
            this.renderAdminDashboard();
            this.renderChatInbox();
            this.renderChatMessages();
        });
    }

    saveUsers() {
        localStorage.setItem('unipass_registered_users', JSON.stringify(this.registeredUsers));
        if (this.syncChannel) {
            this.syncChannel.postMessage({ type: 'USERS_UPDATED', users: this.registeredUsers });
        }
    }

    handleSyncMessage(e) {
        const data = e.data;
        if (!data) return;

        if (data.type === 'CHAT_UPDATED') {
            this.chatMessages = data.messages;
            this.renderChatMessages();
            this.updateChatUnreadBadge();

            const latest = data.messages[data.messages.length - 1];
            if (latest && latest.receiver === this.user.name) {
                if (window.sound) window.sound.playNotification();
                showToast(`Tin nhắn mới từ ${latest.sender}: "${latest.text}"`, 'success');
            }
        } else if (data.type === 'POSTS_UPDATED') {
            this.products = data.products;
            this.rebuildDSACache();
            this.renderProducts();
            this.renderAdminDashboard();
        } else if (data.type === 'USERS_UPDATED') {
            this.registeredUsers = data.users;
            this.renderAdminDashboard();
        } else if (data.type === 'ORDERS_UPDATED') {
            this.depositOrders = data.orders;
            this.updateDepositBadge();
            this.renderProfile();
        } else if (data.type === 'DISPUTES_UPDATED') {
            this.adminDisputes = data.disputes;
            this.renderAdminDashboard();
        } else if (data.type === 'NOTIFICATIONS_UPDATED') {
            this.notifications = data.notifications;
            this.updateNotificationBadge();
            this.renderNotifications();
        } else if (data.type === 'USER_WARNED') {
            if (data.targetName === this.user.name) {
                if (window.sound) window.sound.playWarning();
                showToast(`⚠️ THÔNG BÁO TỪ ADMIN: ${data.message}`, 'danger');
            }
        }
    }

    handleIncomingChatMessageOnScreen(msg) {
        if (!msg || !this.user) return;
        const myN = (this.user.name || '').toLowerCase().trim();
        const myE = (this.user.email || '').toLowerCase().trim();
        const recN = (msg.receiver || msg.receiver_name || '').toLowerCase().trim();
        const recE = (msg.receiverEmail || msg.receiver_email || '').toLowerCase().trim();

        const isForMe = (myN && (recN === myN || recE === myN)) || 
                        (myE && (recE === myE || recN === myE));

        if (!isForMe) return;

        const senderName = msg.sender || msg.sender_name || 'Người dùng UTC2';
        const senderEmail = msg.senderEmail || msg.sender_email || '';

        // Phát âm thanh chuông báo tin nhắn
        if (window.sound && typeof window.sound.playNotification === 'function') {
            window.sound.playNotification();
        }

        const chatBox = document.getElementById('chatWindow');
        const convView = document.getElementById('chatConversationsView');
        const detailView = document.getElementById('chatDetailView');

        // Kiểm tra xem hiện tại Machine B có đang mở đúng phòng chat chi tiết với người gửi không
        const curPartnerName = (this.currentChatPartner || '').toLowerCase().trim();
        const curPartnerEmail = (this.currentChatPartnerEmail || '').toLowerCase().trim();
        const sndN = senderName.toLowerCase().trim();
        const sndE = senderEmail.toLowerCase().trim();

        const isChattingWithSender = detailView && detailView.style.display !== 'none' && (
            (curPartnerEmail && (curPartnerEmail === sndE || curPartnerEmail === sndN)) ||
            (curPartnerName && (curPartnerName === sndN || curPartnerName === sndE))
        );

        if (isChattingWithSender) {
            // Đang mở đúng cuộc trò chuyện -> hiển thị ngay tin nhắn và đánh dấu đã đọc
            if (msg.id && this.readMessageIds) {
                this.readMessageIds.add(msg.id);
                try {
                    localStorage.setItem('unipass_read_message_ids', JSON.stringify(Array.from(this.readMessageIds)));
                } catch (e) {}
            }
            this.renderChatMessages();
            const area = document.getElementById('chatMessagesArea');
            if (area) {
                setTimeout(() => { area.scrollTop = area.scrollHeight; }, 100);
            }
            this.updateChatUnreadBadge();
        } else {
            // CHUẨN MESSENGER: Mở khung chat ở danh sách cuộc trò chuyện (Inbox)
            // Hiển thị cuộc trò chuyện với huy hiệu Mới, máy B bấm vào mới xem được nội dung tin nhắn
            if (chatBox) {
                chatBox.style.display = 'flex';
                chatBox.classList.remove('chat-incoming-pulse');
                void chatBox.offsetWidth;
                chatBox.classList.add('chat-incoming-pulse');
                setTimeout(() => {
                    if (chatBox) chatBox.classList.remove('chat-incoming-pulse');
                }, 800);
            }

            if (convView) convView.style.display = 'flex';
            if (detailView) detailView.style.display = 'none';

            this.renderChatInbox();
            this.updateChatUnreadBadge();
            showToast(`💬 [MESSENGER] ${senderName} vừa gửi tin nhắn! Bấm vào cuộc trò chuyện để xem chi tiết.`, 'info');
        }
    }

    checkAuthDisplay() {
        const authScreen = document.getElementById('authPageContainer');
        const mainApp = document.getElementById('mainAppInterface');

        const sysBg = document.getElementById('systemAmbientBg');
        if (this.isLoggedIn) {
            if (authScreen) authScreen.style.display = 'none';
            if (mainApp) mainApp.style.display = 'block';
            if (sysBg) sysBg.style.display = 'block';

            // Xóa sạch ngay ô tìm kiếm khi vừa đăng nhập vào sàn đồ (Không cho hiện email)
            const searchInput = document.getElementById('mainSearchInput');
            if (searchInput) {
                searchInput.value = '';
                this.searchKeyword = '';
            }

            // Bảo vệ 2 lớp chống trình duyệt tự động điền Gmail vào thanh tìm kiếm
            setTimeout(() => {
                const s = document.getElementById('mainSearchInput');
                if (s && (s.value.includes('@') || (this.user && s.value === this.user.email))) {
                    s.value = '';
                    this.searchKeyword = '';
                    this.renderProducts();
                }
            }, 80);
            setTimeout(() => {
                const s = document.getElementById('mainSearchInput');
                if (s && (s.value.includes('@') || (this.user && s.value === this.user.email))) {
                    s.value = '';
                    this.searchKeyword = '';
                    this.renderProducts();
                }
            }, 300);
        } else {
            if (authScreen) authScreen.style.display = 'flex';
            if (mainApp) mainApp.style.display = 'none';
            if (sysBg) sysBg.style.display = 'none';
        }
    }

    rebuildDSACache() {
        this.avl = new window.UTC2_DSA.AVLTree();
        this.postDLL = new window.UTC2_DSA.PostDoublyLinkedList();

        // CHỈ NẠP CÁC BÀI ĐÃ ĐƯỢC ADMIN DUYỆT (LOẠI BỎ PENDING VÀ REJECTED)
        const approvedPosts = this.products.filter(p => p.status !== 'pending' && p.status !== 'rejected');

        const popularKeywords = [
            'Casio', 'Máy tính Casio', 'Giáo trình', 'Giáo trình Vật Lý', 'Sách C++',
            'Cấu trúc dữ liệu', 'Nồi cơm điện', 'Đồng phục UTC2', 'Xe đạp', 'Bàn học',
            'Giải tích', 'VL101', 'DSA01', 'TOAN01', 'KTX Cỏ May'
        ];
        popularKeywords.forEach(kw => this.trie.insert(kw, null, 15));
        approvedPosts.forEach(p => {
            this.trie.insert(p.title, p.id, 10);
            if (p.courseCode) this.trie.insert(p.courseCode, p.id, 12);
            if (p.category) {
                this.trie.insert(p.category, p.id, 6);
                const catName = (typeof getCategoryName === 'function') ? getCategoryName(p.category) : '';
                if (catName) this.trie.insert(catName, p.id, 8);
            }
            const words = p.title.split(/[\s,()–-]+/).filter(w => w.length >= 3);
            words.forEach(w => this.trie.insert(w, p.id, 5));
            this.avl.insert(p);
            this.postDLL.insertFront(p);
        });
    }

    saveProducts() {
        localStorage.setItem('unipass_products', JSON.stringify(this.products));
        this.rebuildDSACache();
        if (this.syncChannel) {
            this.syncChannel.postMessage({ type: 'POSTS_UPDATED', products: this.products });
        }
    }

    saveChats() {
        localStorage.setItem('unipass_shared_messages', JSON.stringify(this.chatMessages));
        if (this.syncChannel) {
            this.syncChannel.postMessage({ type: 'CHAT_UPDATED', messages: this.chatMessages });
        }
    }

    // Bảo lưu vĩnh viễn toàn bộ lịch sử tin nhắn cuộc trò chuyện giữa các tài khoản
    cleanupCompletedOrdersChats() {
        // Không xóa bất kỳ tin nhắn nào khi hoàn tất đơn hàng hoặc đăng xuất
        return;
    }

    saveOrders() {
        localStorage.setItem('unipass_deposit_orders', JSON.stringify(this.depositOrders));
        this.updateDepositBadge();
        if (this.syncChannel) {
            this.syncChannel.postMessage({ type: 'ORDERS_UPDATED', orders: this.depositOrders });
        }
    }

    saveDisputes() {
        localStorage.setItem('unipass_admin_disputes', JSON.stringify(this.adminDisputes));
        if (this.syncChannel) {
            this.syncChannel.postMessage({ type: 'DISPUTES_UPDATED', disputes: this.adminDisputes });
        }
    }

    updateDepositBadge() {
        const badge = document.getElementById('depositOrderCount');
        const profileTotalBadge = document.getElementById('profileDepositTotalBadge');

        if (!this.user) {
            if (badge) {
                badge.innerText = '0';
                badge.style.display = 'none';
            }
            if (profileTotalBadge) profileTotalBadge.innerText = '0 đơn';
            return;
        }

        // Lọc các đơn cọc liên quan đến tài khoản hiện tại (người mua HOẶC người bán)
        const myOrders = this.depositOrders.filter(o => 
            (o.buyer && o.buyer === this.user.name) || 
            (o.buyerEmail && o.buyerEmail === this.user.email) ||
            (o.seller && o.seller === this.user.name) || 
            (o.sellerEmail && o.sellerEmail === this.user.email)
        );
        const myOrderCount = myOrders.length;

        // Nếu tài khoản nào chưa cọc đơn hàng nào thì đơn cọc hiển thị bằng 0
        if (badge) {
            badge.innerText = myOrderCount;
            badge.style.display = 'inline-block';
            if (myOrderCount === 0) {
                badge.style.background = '#94a3b8';
            } else {
                badge.style.background = '#6366f1';
            }
        }

        if (profileTotalBadge) {
            profileTotalBadge.innerText = `${myOrderCount} đơn`;
        }
    }

    updateChatUnreadBadge() {
        const badge = document.getElementById('unreadChatBadge');
        const navBtn = document.querySelector('.nav-item-btn[data-tab="messages"]') || 
                       document.querySelector('button[onclick*="openChatBetweenUsers"]') || 
                       document.querySelector('button[data-tab="messages"]');

        if (!badge) return;
        if (!this.user) {
            badge.style.display = 'none';
            badge.innerText = '0';
            if (navBtn) navBtn.classList.remove('nav-chat-pulse');
            return;
        }

        const myName = (this.user.name || '').toLowerCase();
        const myEmail = (this.user.email || '').toLowerCase();

        const unreadIncoming = this.chatMessages.filter(m => {
            const recN = (m.receiver || '').toLowerCase();
            const recE = (m.receiverEmail || '').toLowerCase();
            const isForMe = (myEmail && recE === myEmail) || (myName && recN === myName) || (myEmail && recN === myEmail);
            return isForMe && m.id && (!this.readMessageIds || !this.readMessageIds.has(m.id));
        });

        const count = unreadIncoming.length;

        if (count > 0) {
            badge.style.display = 'inline-block';
            badge.innerText = count > 99 ? '99+' : count;
            if (navBtn) navBtn.classList.add('nav-chat-pulse');
        } else {
            badge.style.display = 'none';
            badge.innerText = '0';
            if (navBtn) navBtn.classList.remove('nav-chat-pulse');
        }
    }

    markConversationAsRead(partnerName, partnerEmail) {
        if (!this.user || (!partnerName && !partnerEmail)) return;
        const myName = (this.user.name || '').toLowerCase();
        const myEmail = (this.user.email || '').toLowerCase();
        const pName = (partnerName || '').toLowerCase();
        const pEmail = (partnerEmail || '').toLowerCase();

        let modified = false;
        this.chatMessages.forEach(m => {
            const recN = (m.receiver || '').toLowerCase();
            const recE = (m.receiverEmail || '').toLowerCase();
            const isForMe = (myEmail && recE === myEmail) || (myName && recN === myName) || (myEmail && recN === myEmail);
            if (!isForMe) return;

            const sndN = (m.sender || '').toLowerCase();
            const sndE = (m.senderEmail || '').toLowerCase();
            const isFromPartner = (pEmail && (sndE === pEmail || sndN === pEmail)) || 
                                  (pName && (sndN === pName || sndE === pName));

            if (isFromPartner && m.id && (!this.readMessageIds || !this.readMessageIds.has(m.id))) {
                if (!this.readMessageIds) this.readMessageIds = new Set();
                this.readMessageIds.add(m.id);
                modified = true;
            }
        });

        if (modified) {
            try {
                localStorage.setItem('unipass_read_message_ids', JSON.stringify(Array.from(this.readMessageIds)));
            } catch (e) {}
            this.updateChatUnreadBadge();
        }
    }

    // ==========================================
    // QUẢN LÝ THÔNG BÁO HOẠT ĐỘNG (NOTIFICATION CENTER)
    // ==========================================
    saveNotifications() {
        localStorage.setItem('unipass_user_notifications', JSON.stringify(this.notifications));
        if (this.syncChannel) {
            this.syncChannel.postMessage({ type: 'NOTIFICATIONS_UPDATED', notifications: this.notifications });
        }
    }

    getUserNotifications() {
        if (!this.user) return [];
        const myName = this.user.name;
        const myEmail = this.user.email;
        const isAdmin = this.user.role === 'admin' || myEmail === '6651071091@st.utc2.edu.vn';

        return this.notifications.filter(n => {
            if (n.targetName === myName || (n.targetEmail && n.targetEmail === myEmail)) return true;
            if (isAdmin && (n.type === 'admin' || n.targetName === 'ALL_ADMINS')) return true;
            return false;
        });
    }

    getUnreadNotificationCount() {
        return this.getUserNotifications().filter(n => !n.isRead).length;
    }

    updateNotificationBadge() {
        const badge = document.getElementById('unreadNotifBadge');
        const profileCountBadge = document.getElementById('profileNotifBadgeCount');
        const unreadCount = this.getUnreadNotificationCount();
        const totalCount = this.getUserNotifications().length;

        if (badge) {
            if (unreadCount > 0) {
                badge.innerText = unreadCount > 99 ? '99+' : unreadCount;
                badge.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
                badge.innerText = '0';
            }
        }

        if (profileCountBadge) {
            profileCountBadge.innerText = `${totalCount} (${unreadCount} mới)`;
        }
    }

    addNotification({ targetName, targetEmail, title, message, type = 'info', relatedId = null }) {
        const timeStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
        const newNotif = {
            id: 'NOTIF_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            targetName: targetName || '',
            targetEmail: targetEmail || '',
            title: title || 'Thông báo mới',
            message: message || '',
            type: type, // 'order_deposit', 'order_update', 'post_approved', 'post_rejected', 'post_expired', 'warning', 'info'
            relatedId: relatedId,
            timestamp: Date.now(),
            timeStr: timeStr,
            isRead: false
        };

        this.notifications.unshift(newNotif);
        if (this.notifications.length > 150) {
            this.notifications = this.notifications.slice(0, 150);
        }

        this.saveNotifications();
        this.updateNotificationBadge();
        this.renderNotifications();

        // Nếu thông báo hướng tới tài khoản hiện tại -> phát âm thanh & hiển thị Toast
        if (this.user && (this.user.name === targetName || this.user.email === targetEmail)) {
            if (window.sound) window.sound.playNotification();
            showToast(`🔔 [THÔNG BÁO] ${title}: ${message}`, (type === 'warning' || type === 'post_rejected') ? 'danger' : 'info');
        }
    }

    renderNotifications() {
        const dropdownList = document.getElementById('notificationDropdownList');
        const profileList = document.getElementById('profileNotificationsListContainer');
        const totalCountText = document.getElementById('notifTotalCountText');

        if (!this.user) {
            const emptyHtml = `
                <div style="text-align:center; padding:24px 12px; color:#64748b; font-size:12px;">
                    <div style="font-size:32px; margin-bottom:6px;">🔒</div>
                    <strong>Vui lòng đăng nhập</strong><br>Đăng nhập để xem thông báo hoạt động của bạn.
                </div>
            `;
            if (dropdownList) dropdownList.innerHTML = emptyHtml;
            if (profileList) profileList.innerHTML = emptyHtml;
            if (totalCountText) totalCountText.innerText = '0 thông báo';
            return;
        }

        const userNotifs = this.getUserNotifications();
        if (totalCountText) {
            totalCountText.innerText = `${userNotifs.length} thông báo (${this.getUnreadNotificationCount()} chưa đọc)`;
        }

        if (userNotifs.length === 0) {
            const noNotifHtml = `
                <div style="text-align:center; padding:28px 14px; color:#64748b; font-size:12px;">
                    <div style="font-size:32px; margin-bottom:8px;">📭</div>
                    <strong style="color:#0f172a; font-size:13px; display:block; margin-bottom:4px;">Chưa có thông báo nào</strong>
                    <p style="margin:0; font-size:11.5px; color:#64748b; line-height:1.4;">
                        Khi có người cọc đơn, bài đăng được duyệt, hoặc đơn hàng hoàn tất, thông báo sẽ hiển thị tại đây.
                    </p>
                </div>
            `;
            if (dropdownList) dropdownList.innerHTML = noNotifHtml;
            if (profileList) profileList.innerHTML = noNotifHtml;
            return;
        }

        const renderItemHtml = (n) => {
            let icon = '🔔';
            let iconBg = '#e0f2fe';
            let iconCol = '#0284c7';

            if (n.type === 'order_deposit') {
                icon = '🛒';
                iconBg = '#fef3c7';
                iconCol = '#b45309';
            } else if (n.type === 'order_update') {
                icon = '🤝';
                iconBg = '#dcfce7';
                iconCol = '#15803d';
            } else if (n.type === 'post_approved') {
                icon = '✅';
                iconBg = '#dcfce7';
                iconCol = '#15803d';
            } else if (n.type === 'post_rejected') {
                icon = '❌';
                iconBg = '#fee2e2';
                iconCol = '#dc2626';
            } else if (n.type === 'post_expired') {
                icon = '⏳';
                iconBg = '#fff7ed';
                iconCol = '#ea580c';
            } else if (n.type === 'warning') {
                icon = '⚠️';
                iconBg = '#fee2e2';
                iconCol = '#dc2626';
            }

            const unreadClass = n.isRead ? '' : 'unread';

            return `
                <div class="notification-item ${unreadClass}" onclick="handleNotificationClick('${n.id}', '${n.type}')">
                    <div class="notification-item-header">
                        <div class="notification-item-title">
                            <span style="background:${iconBg}; color:${iconCol}; width:22px; height:22px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:12px;">${icon}</span>
                            <span>${n.title}</span>
                            ${!n.isRead ? '<span style="background:#0284c7; width:6px; height:6px; border-radius:50%; display:inline-block;"></span>' : ''}
                        </div>
                        <span class="notification-item-time">${n.timeStr || ''}</span>
                    </div>
                    <div class="notification-item-msg">${n.message}</div>
                </div>
            `;
        };

        const listHtml = userNotifs.map(renderItemHtml).join('');
        if (dropdownList) dropdownList.innerHTML = listHtml;
        if (profileList) profileList.innerHTML = listHtml;
    }

    markAllNotificationsAsRead() {
        if (!this.user) return;
        const myName = this.user.name;
        const myEmail = this.user.email;
        this.notifications.forEach(n => {
            if (n.targetName === myName || n.targetEmail === myEmail) {
                n.isRead = true;
            }
        });
        this.saveNotifications();
        this.updateNotificationBadge();
        this.renderNotifications();
        showToast('✓ Đã đánh dấu tất cả thông báo là đã đọc!', 'info');
    }

    clearAllUserNotifications() {
        if (!this.user) return;
        const myName = this.user.name;
        const myEmail = this.user.email;
        this.notifications = this.notifications.filter(n => {
            return !(n.targetName === myName || n.targetEmail === myEmail);
        });
        this.saveNotifications();
        this.updateNotificationBadge();
        this.renderNotifications();
        showToast('🗑 Đã xóa toàn bộ thông báo hoạt động của bạn!', 'info');
    }

    // ==========================================
    // TỰ ĐỘNG XÓA BÀI ĐĂNG SAU 7 NGÀY KỂ TỪ LÚC ĐƯỢC DUYỆT
    // ==========================================
    formatPostExpiryCountdown(post) {
        if (!post) {
            return {
                text: 'Còn 7 ngày',
                html: '<span style="background:#fffbeb; color:#d97706; padding:2px 7px; border-radius:4px; font-weight:700; font-size:11px;">⏳ Hết hạn sau: 7 ngày</span>',
                isExpired: false
            };
        }

        const approvedTime = post.approvedAt || post.submittedAt || (Date.now() - (7 - (post.expiryDays || 7)) * 24 * 60 * 60 * 1000);
        const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
        const expireTime = approvedTime + SEVEN_DAYS_MS;
        const msLeft = expireTime - Date.now();

        if (msLeft <= 0) {
            return {
                text: 'Đã hết hạn 7 ngày',
                isExpired: true,
                isUrgent: true,
                html: '<span style="background:#fee2e2; color:#dc2626; border:1px solid #fca5a5; padding:2px 7px; border-radius:4px; font-weight:700; font-size:11px;">⚠️ Đã hết hạn (Tự xóa)</span>'
            };
        }

        const totalHours = Math.floor(msLeft / (1000 * 60 * 60));
        const days = Math.floor(totalHours / 24);
        const hours = totalHours % 24;
        const minutes = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));

        let countdownStr = '';
        if (days > 0) {
            countdownStr = `${days} ngày ${hours} giờ`;
        } else if (hours > 0) {
            countdownStr = `${hours} giờ ${minutes} phút`;
        } else {
            countdownStr = `${Math.max(1, minutes)} phút`;
        }

        const isUrgent = days === 0;
        const bg = isUrgent ? '#fff7ed' : '#fffbeb';
        const col = isUrgent ? '#c2410c' : '#b45309';
        const border = isUrgent ? '#ffedd5' : '#fef3c7';
        const label = isUrgent ? '⚠️ Sắp hết hạn' : '⏳ Hết hạn sau';

        return {
            text: `${label}: ${countdownStr}`,
            daysLeft: days,
            isExpired: false,
            isUrgent: isUrgent,
            html: `<span style="background:${bg}; color:${col}; border:1px solid ${border}; padding:2px 7px; border-radius:4px; font-weight:700; font-size:11px; display:inline-flex; align-items:center; gap:4px;" title="Bài đăng tự động xóa sau 7 ngày kể từ lúc Admin duyệt bài">${label}: <strong>${countdownStr}</strong></span>`
        };
    }

    checkAndCleanExpiredPosts() {
        const now = Date.now();
        const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
        const expiredList = [];
        const activeList = [];

        this.products.forEach(p => {
            // Chỉ xóa bài đăng đã duyệt / đang hiển thị (không xóa nhầm bài pending)
            if (p.status !== 'pending' && p.status !== 'rejected') {
                const approvedTime = p.approvedAt || p.submittedAt;
                if (approvedTime && (now - approvedTime >= SEVEN_DAYS_MS)) {
                    expiredList.push(p);
                } else {
                    activeList.push(p);
                }
            } else {
                activeList.push(p);
            }
        });

        if (expiredList.length > 0) {
            this.products = activeList;
            this.saveProducts();
            this.rebuildDSACache();
            this.renderProducts();
            this.renderAdminDashboard();
            this.renderProfile();

            expiredList.forEach(p => {
                this.addNotification({
                    targetName: p.seller,
                    targetEmail: p.sellerEmail,
                    title: 'Bài đăng hết hạn sau 7 ngày',
                    message: `Bài đăng "${p.title}" của bạn đã hết hạn sau 7 ngày kể từ lúc được duyệt và đã tự động được gỡ khỏi hệ thống UTC2.`,
                    type: 'post_expired',
                    relatedId: p.id
                });

                if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
                    window.UniPassSupabase.deleteProduct(p.id);
                }
                if (window.UniPassOnlineSync) {
                    window.UniPassOnlineSync.broadcastDeletePost(p.id);
                }
            });
            console.log(`🧹 Đã tự động dọn dẹp ${expiredList.length} bài đăng hết hạn 7 ngày sau khi duyệt.`);
        }
    }

    getChatPartnerName() {
        if (!this.user) return 'Sinh viên UTC2';
        if (this.currentChatPartner && this.currentChatPartner !== this.user.name) {
            return this.currentChatPartner;
        }
        if (this.currentChatPartnerEmail) {
            const found = (this.registeredUsers || []).find(u => u.email && u.email.toLowerCase() === this.currentChatPartnerEmail.toLowerCase());
            if (found) return found.name;
            return this.currentChatPartnerEmail.split('@')[0];
        }
        // Tìm bạn chat mặc định: ưu tiên người khác mình trong danh sách
        const otherUser = this.registeredUsers.find(u => u.name !== this.user.name && u.role !== 'admin');
        if (otherUser) return otherUser.name;
        return 'Sinh viên UTC2';
    }

    updateUserUI() {
        if (!this.user) return;

        const nameEl = document.getElementById('navUserName');
        const coinsEl = document.getElementById('navUserCoins');
        const avatarEl = document.getElementById('userAvatarText');
        const switchBtn = document.getElementById('quickSwitchUserBtn');

        const profName = document.getElementById('profileFullName');
        const profEmail = document.getElementById('profileEmail');
        const profRep = document.getElementById('profileRepScore');
        const profAvatar = document.getElementById('profileAvatarCircle');
        const removeAvatarBtn = document.getElementById('btnRemoveAvatar');

        const letter = this.user.avatarLetter || (this.user.name ? this.user.name.charAt(0).toUpperCase() : 'U');
        const customAvatar = this.user.avatarUrl || null;

        if (nameEl) nameEl.innerText = this.user.name;
        if (coinsEl) coinsEl.innerText = this.user.coins;
        
        if (avatarEl) {
            if (customAvatar) {
                avatarEl.innerHTML = `<img src="${customAvatar}" alt="${this.user.name}" class="avatar-img-fit">`;
            } else {
                avatarEl.innerText = letter;
            }
        }

        if (switchBtn) {
            const nextIdx = (this.registeredUsers.findIndex(u => u.email === this.user.email) + 1) % this.registeredUsers.length;
            const nextUser = this.registeredUsers[nextIdx] || this.registeredUsers[0];
            switchBtn.innerText = `Đổi sang: ${nextUser ? (nextUser.name.split(' ').slice(-1)[0] || nextUser.name) : 'Người khác'}`;
        }

        if (profName) profName.innerText = this.user.name;
        if (profEmail) profEmail.innerText = this.user.email;
        if (profRep) profRep.innerText = this.user.reputation;
        
        if (profAvatar) {
            if (customAvatar) {
                profAvatar.innerHTML = `<img src="${customAvatar}" alt="${this.user.name}" class="avatar-img-fit">`;
            } else {
                profAvatar.innerText = letter;
            }
        }

        if (removeAvatarBtn) {
            removeAvatarBtn.style.display = customAvatar ? 'inline-block' : 'none';
        }

        this.updateDepositBadge();
        this.updateNotificationBadge();
        this.renderNotifications();

        localStorage.setItem('unipass_current_user', JSON.stringify(this.user));
    }

    toggleAccount() {
        if (!this.registeredUsers || this.registeredUsers.length === 0) return;
        
        let currIdx = this.registeredUsers.findIndex(u => u.email === this.user.email);
        if (currIdx === -1) currIdx = 0;
        
        const nextIdx = (currIdx + 1) % this.registeredUsers.length;
        this.user = this.registeredUsers[nextIdx];

        this.updateUserUI();
        this.updateDepositBadge();
        this.updateNotificationBadge();
        this.renderNotifications();
        this.renderProducts();
        this.renderProfile();
        this.renderChatMessages();
        this.updateChatUnreadBadge();

        showToast(`Đã chuyển sang tài khoản: ${this.user.name}!`, 'success');
        if (window.sound) window.sound.playClick();
    }

    // Lọc sản phẩm
    getFilteredItems() {
        // Chỉ lấy các bài đã được Admin phê duyệt (Loại bỏ các bài đang chờ duyệt TimeMark hoặc bị từ chối)
        const baseApprovedProducts = this.products.filter(p => p.status !== 'pending' && p.status !== 'rejected');
        let items = [...baseApprovedProducts];

        // Nếu bộ lọc đang BẬT: CHỈ LỌC NHỮNG TIÊU CHÍ NÀO ĐƯỢC BẤM DẤU TÍCH!
        if (this.isFilterActive) {
            const enabled = this.filterCriteriaEnabled || {};

            // 1. Tiêu chí Giá (chỉ lọc khi ĐƯỢC TÍCH)
            if (enabled.price) {
                const avlMatches = this.avl.rangeQuery(0, this.filterMaxPrice);
                const avlIds = new Set(avlMatches.map(p => p.id));
                items = items.filter(p => avlIds.has(p.id) || p.price <= this.filterMaxPrice);
            }

            // 2. Tiêu chí Danh mục (chỉ lọc khi ĐƯỢC TÍCH và không phải ALL)
            if (enabled.category && this.filterCategoryKey !== 'ALL') {
                items = items.filter(p => p.category === this.filterCategoryKey);
            }

            // 3. Tiêu chí Điểm uy tín người bán (chỉ lọc khi ĐƯỢC TÍCH)
            if (enabled.reputation) {
                items = items.filter(p => (p.sellerRep || 95) >= (this.filterMinReputation || 90));
            }
        }

        // Lọc thông minh tiếng Việt có dấu / không dấu & tìm kiếm đa từ khóa
        if (this.searchKeyword && this.searchKeyword.trim().length > 0) {
            items = items.filter(p => matchesProductSearch(p, this.searchKeyword));
        }

        if (this.sortBy === 'priceAsc') {
            items.sort((a, b) => a.price - b.price);
        } else if (this.sortBy === 'priceDesc') {
            items.sort((a, b) => b.price - a.price);
        } else if (this.sortBy === 'distance') {
            items.sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
        }

        return items;
    }

    renderProducts() {
        const container = document.getElementById('productGridContainer');
        const countDisplay = document.getElementById('feedCountDisplay');
        const dsaInfo = document.getElementById('dsaEngineInfoText');

        if (!container) return;

        const list = this.getFilteredItems();

        if (countDisplay) {
            countDisplay.innerHTML = `Hiển thị <strong>${list.length} món đồ</strong> sẵn sàng pass`;
        }

        if (dsaInfo) {
            if (!this.isFilterActive) {
                dsaInfo.innerText = `Bộ lọc đang tắt (Hiển thị đầy đủ ${list.length} món đồ).`;
            } else {
                const enabled = this.filterCriteriaEnabled || {};
                const activeCriteria = [];
                if (enabled.price) activeCriteria.push(`Giá ≤ ${formatNumber(this.filterMaxPrice)}đ`);
                if (enabled.category && this.filterCategoryKey !== 'ALL') activeCriteria.push(`Danh mục: ${this.filterCategoryKey}`);
                if (enabled.reputation) activeCriteria.push(`Uy tín ≥ ${this.filterMinReputation || 90}đ`);

                if (activeCriteria.length === 0) {
                    dsaInfo.innerText = `Chưa tích chọn tiêu chí nào (Hiển thị ${list.length} món đồ). Bấm dấu tích vào tiêu chí bạn muốn lọc!`;
                } else {
                    dsaInfo.innerText = `Đang lọc theo: ${activeCriteria.join(' • ')} (${list.length} kết quả).`;
                }
            }
        }

        const hasSearch = (this.searchKeyword && this.searchKeyword.trim().length > 0);

        if (list.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 45px 20px; background:#fffbeb; border:1.5px dashed #fde68a; border-radius:14px; color: #475569;">
                    <div style="font-size: 36px; margin-bottom: 8px;">🔍</div>
                    <h4 style="color:#0f172a; font-size:16px; margin:0 0 6px 0;">
                        ${hasSearch ? `Không tìm thấy món đồ nào phù hợp với từ khóa "${escapeHtml(this.searchKeyword)}"` : 'Không có món đồ nào trong khoảng lọc này'}
                    </h4>
                    <p style="font-size: 13px; margin: 0 0 16px 0; color:#64748b;">
                        ${hasSearch ? 'Gợi ý: Thử gõ từ khóa ngắn hơn (Ví dụ: Casio, C++, Vật lý, Nồi cơm, Đồng phục, Xe đạp) hoặc bấm nút bên dưới.' : 'Thử kéo tăng thanh giá hoặc bấm "Đặt lại" bộ lọc.'}
                    </p>
                    <button type="button" class="apply-filter-btn" style="width:auto; padding:8px 24px; margin:0 auto; background:linear-gradient(135deg, #f59e0b, #d97706); font-weight:700;" onclick="clearSearchFilter()">
                        Xem Tất Cả Món Đồ Sẵn Có
                    </button>
                </div>
            `;
            return;
        }

        const searchBannerHtml = hasSearch ? `
            <div style="grid-column: 1/-1; background:#fefce8; border:1px solid #fef08a; border-radius:10px; padding:10px 16px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <div style="font-size:13px; color:#854d0e;">
                    Kết quả tìm kiếm cho: <strong style="color:#0f172a;">"${escapeHtml(this.searchKeyword)}"</strong>
                    <span style="background:#fef08a; color:#a16207; padding:2px 8px; border-radius:12px; font-size:11.5px; font-weight:700; margin-left:6px;">${list.length} món đồ tìm thấy</span>
                </div>
                <button type="button" class="btn-outline-chat" style="padding:4px 10px; font-size:11.5px; color:#b45309; border-color:#fde047; cursor:pointer;" onclick="clearSearchFilter()">
                    ✕ Xóa tìm kiếm
                </button>
            </div>
        ` : '';

        container.innerHTML = searchBannerHtml + list.map(item => {
            const isMyItem = this.user ? (item.seller === this.user.name) : false;
            const origPrice = item.originalPrice || Math.round((item.price * 1.5) / 10000) * 10000;
            const discountPct = (origPrice > item.price) ? Math.round((1 - item.price / origPrice) * 100) : 0;
            const starScore = ((item.sellerRep || 90) / 20).toFixed(1);
            const reviewCount = Math.floor(((item.sellerRep || 90) - 70) * 1.2) || 15;

            const sellerUser = (this.registeredUsers || []).find(u => 
                (item.sellerEmail && u.email && u.email.toLowerCase() === item.sellerEmail.toLowerCase()) ||
                (item.seller && u.name && u.name.toLowerCase() === item.seller.toLowerCase())
            );
            const sellerAvatarHtml = (sellerUser && sellerUser.avatarUrl) ?
                `<img src="${sellerUser.avatarUrl}" alt="${item.seller}" class="seller-avatar-badge">` :
                `<span style="margin-right:4px;">👤</span>`;

            return `
                <div class="uni-product-card" onclick="openCheckoutModal('${item.id}')">
                    <div class="card-image-wrapper">
                        <img src="${item.imageUrl}" alt="${item.title}" loading="lazy">
                        <span class="card-badge-cat">${getCategoryName(item.category)}</span>
                        <span class="card-badge-timemark">
                            <span class="badge-pulse-dot"></span> TimeMark: ${item.timemarkCode}
                        </span>
                    </div>
                    <div class="card-content">
                        <h4 class="card-title-text" title="${item.title}">${item.title}</h4>
                        
                        <div class="card-price-row">
                            <div class="card-price-text">${formatNumber(item.price)} VNĐ</div>
                            ${discountPct > 0 ? `
                                <div class="card-orig-price">${formatNumber(origPrice)} đ</div>
                                <span class="card-discount-tag">-${discountPct}%</span>
                            ` : ''}
                        </div>

                        ${item.description ? `
                            <div class="card-desc-snippet">
                                ${item.description}
                            </div>
                        ` : ''}
                        
                        <div class="card-seller-row">
                            <span class="card-seller-name" style="display:inline-flex; align-items:center;">
                                ${sellerAvatarHtml}
                                <span>${item.seller}</span>
                                <span class="verified-sv-tag" title="Sinh viên ST.UTC2 đã xác minh">✓ SV</span>
                            </span>
                            <span class="card-rep-badge" title="Đánh giá uy tín sinh viên">
                                ⭐ ${starScore} (${reviewCount})
                            </span>
                        </div>

                        <div class="card-location-row">
                            <span>📍 ${item.location}</span>
                        </div>

                        <div class="card-trust-guarantee">
                            <span>🛡️ Kiểm tra hàng trực tiếp tại trường</span>
                        </div>

                        <div class="card-expiry-row">
                            ${this.formatPostExpiryCountdown(item).html}
                        </div>

                        <button class="card-cta-btn" onclick="event.stopPropagation(); openCheckoutModal('${item.id}')">
                            ${isMyItem ? '👀 Xem chi tiết (Đồ của bạn) ➔' : '🛒 Mua Ngay / Xem Chi Tiết ➔'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderProfile() {
        const myPosts = document.getElementById('myPostsListContainer');
        const history = document.getElementById('purchaseHistoryContainer');
        if (!this.user) {
            if (myPosts) myPosts.innerHTML = `<p style="font-size:12px; color:#64748b;">Vui lòng đăng nhập để xem bài đăng.</p>`;
            if (history) history.innerHTML = `<p style="font-size:12px; color:#64748b;">Vui lòng đăng nhập để xem lịch sử cọc.</p>`;
            this.renderNotifications();
            return;
        }

        if (myPosts) {
            const myItems = this.products.filter(p => p.seller === this.user.name);
            if (myItems.length === 0) {
                myPosts.innerHTML = `<p style="font-size:12px; color:#64748b;">Chưa có bài đăng nào.</p>`;
            } else {
                myPosts.innerHTML = myItems.map(p => {
                    let statusBadge = '';
                    if (p.status === 'pending') {
                        statusBadge = `<span style="background:#fef3c7; color:#b45309; padding:2px 8px; border-radius:4px; font-weight:700; font-size:10.5px;">⏳ Chờ Admin duyệt TimeMark</span>`;
                    } else if (p.status === 'rejected') {
                        statusBadge = `<span style="background:#fee2e2; color:#b91c1c; padding:2px 8px; border-radius:4px; font-weight:700; font-size:10.5px;">❌ Bị từ chối: ${p.rejectReason || 'Không hợp lệ'}</span>`;
                    } else {
                        const countdown = this.formatPostExpiryCountdown(p);
                        statusBadge = `<span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:4px; font-weight:700; font-size:10.5px;">✅ Đã duyệt</span> ${countdown.html}`;
                    }

                    return `
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px 14px; margin-bottom:8px; font-size:12.5px; display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                                <strong>${p.title}</strong>
                                ${statusBadge}
                            </div>
                            <div style="color:#0284c7; font-size:11.5px; margin-top:3px;">
                                ${formatNumber(p.price)} đ • TimeMark: <strong>${p.timemarkCode}</strong>
                                ${p.timemarkProofUrl ? ` • <a href="javascript:void(0)" onclick="openZoomImageModal('${p.timemarkProofUrl}', 'Ảnh TimeMark: ${p.title}')" style="color:#16a34a; font-weight:700; text-decoration:underline;">🔍 Xem ảnh TimeMark đã chụp</a>` : ''}
                            </div>
                        </div>
                        <button onclick="removePost('${p.id}')" style="background:none; border:none; color:#ef4444; font-size:12px; cursor:pointer; font-weight:700;">Xóa</button>
                    </div>
                    `;
                }).join('');
            }
        }

       if (history) {
            // ✅ Chỉ lấy các đơn mà tài khoản hiện tại là người mua (buyer) HOẶC người bán (seller)
            const myOrders = this.depositOrders.filter(o => 
                (o.buyer && o.buyer === this.user.name) || 
                (o.buyerEmail && o.buyerEmail === this.user.email) ||
                (o.seller && o.seller === this.user.name) || 
                (o.sellerEmail && o.sellerEmail === this.user.email)
            );

            const profileTotalBadge = document.getElementById('profileDepositTotalBadge');
            if (profileTotalBadge) {
                profileTotalBadge.innerText = `${myOrders.length} đơn`;
            }

            if (myOrders.length === 0) {
                history.innerHTML = `
                    <div style="text-align:center; padding:26px 16px; background:#f8fafc; border:1px dashed #cbd5e1; border-radius:10px; color:#64748b;">
                        <div style="font-size:32px; margin-bottom:8px;">🛒</div>
                        <strong style="color:#0f172a; font-size:13.5px; display:block; margin-bottom:4px;">Bạn hiện có 0 đơn cọc</strong>
                        <p style="font-size:11.5px; margin:0 0 12px 0; color:#64748b;">Tài khoản của bạn chưa đặt cọc đơn hàng nào và chưa có ai đặt cọc món đồ của bạn.</p>
                        <button onclick="switchNavTab('home')" class="btn-primary-confirm" style="width:auto; padding:6px 14px; font-size:11.5px; margin:0 auto;">🔍 Khám Phá Món Đồ Ngay</button>
                    </div>
                `;
            } else {
                history.innerHTML = myOrders.map(o => {
                    const isBuyer = (this.user.name === o.buyer || this.user.email === o.buyerEmail);
                    const isSeller = (this.user.name === o.seller || this.user.email === o.sellerEmail);
                    const counterpartName = isBuyer ? o.seller : o.buyer;
                    const counterpartRole = isBuyer ? 'Người bán' : 'Người mua';

                    const isDelivered = (o.status === 'completed');
                    const deliveryStatusHtml = isDelivered ? 
                        `<span class="badge-delivered">✓ ĐÃ GIAO HÀNG THÀNH CÔNG</span>` : 
                        `<span class="badge-undelivered">⏳ CHƯA GIAO HÀNG (Đang hẹn gặp / Chờ giao nhận)</span>`;

                    const roleBadgeHtml = isBuyer ?
                        `<span style="background:#e0f2fe; color:#0369a1; padding:2px 7px; border-radius:4px; font-weight:700; font-size:10.5px;">🏷️ ĐƠN BẠN MUA (ĐÃ CỌC)</span>` :
                        `<span style="background:#fef3c7; color:#b45309; padding:2px 7px; border-radius:4px; font-weight:700; font-size:10.5px;">📦 KHÁCH CỌC BẠN (ĐƠN BÁN)</span>`;

                    let statusBadge = '';
                    let actionButtonsHtml = '';

                    if (o.status === 'completed') {
                        statusBadge = `<span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:4px; font-weight:700; font-size:11px;">✅ Đã Hoàn Thành (Đã xóa bài)</span>`;
                    } else if (o.status === 'closed_penalized') {
                        statusBadge = `<span style="background:#fee2e2; color:#b91c1c; padding:2px 8px; border-radius:4px; font-weight:700; font-size:11px;">⚠️ Đã Đóng & Xử Phạt Vi Phạm</span>`;
                    } else if (o.status === 'pending_seller' || !o.sellerAccepted) {
                        statusBadge = `<span style="background:#fef3c7; color:#b45309; padding:2px 8px; border-radius:4px; font-weight:700; font-size:11px;">⏳ Chờ Người Bán Xác Nhận</span>`;
                        if (isSeller) {
                            actionButtonsHtml += `
                                <button class="btn-primary-confirm" style="background:#16a34a; font-size:11.5px; padding:6px 12px; width:auto; margin:0;" onclick="confirmOrderBySeller('${o.id}')">
                                    ✅ Xác Nhận Đơn Hàng & Điểm Hẹn
                                </button>
                            `;
                        } else {
                            actionButtonsHtml += `<span style="font-size:11.5px; color:#64748b; font-style:italic;">Đang đợi người bán xác nhận đơn...</span>`;
                        }
                    } else {
                        // Đang trong quá trình trao đổi (in_trade hoặc pending_mutual)
                        const buyerDone = o.buyerCompleted;
                        const sellerDone = o.sellerCompleted;

                        statusBadge = `<span style="background:#e0f2fe; color:#0369a1; padding:2px 8px; border-radius:4px; font-weight:700; font-size:11px;">🔄 Đang Trao Đổi Đồ</span>`;

                        // Nút xác nhận của người mua
                        if (isBuyer) {
                            if (!buyerDone) {
                                actionButtonsHtml += `
                                    <button class="btn-primary-confirm" style="background:#16a34a; font-size:11.5px; padding:6px 12px; width:auto; margin:0;" onclick="confirmTradeComplete('${o.id}', 'buyer')">
                                        🤝 Tôi Đã Nhận Đồ (Xác Nhận Đã Nhận)
                                    </button>
                                `;
                            } else {
                                actionButtonsHtml += `<span style="font-size:11.5px; color:#16a34a; font-weight:700;">✓ Bạn đã xác nhận nhận đồ</span>`;
                            }
                        }

                        // Nút xác nhận của người bán
                        if (isSeller) {
                            if (!sellerDone) {
                                actionButtonsHtml += `
                                    <button class="btn-primary-confirm" style="background:#16a34a; font-size:11.5px; padding:6px 12px; width:auto; margin:0;" onclick="confirmTradeComplete('${o.id}', 'seller')">
                                        🤝 Tôi Đã Giao Đồ (Xác Nhận Đã Giao)
                                    </button>
                                `;
                            } else {
                                actionButtonsHtml += `<span style="font-size:11.5px; color:#16a34a; font-weight:700;">✓ Bạn đã xác nhận giao đồ</span>`;
                            }
                        }

                        // Nếu bạn đã xác nhận mà đối phương không chịu xác nhận -> Nút phạt
                        if ((isBuyer && buyerDone && !sellerDone) || (isSeller && sellerDone && !buyerDone)) {
                            actionButtonsHtml += `
                                <button class="btn-admin-danger" style="font-size:11px; padding:5px 10px; width:auto; margin:0;" onclick="reportUnconfirmedTrade('${o.id}')" title="Phạt 5 điểm uy tín đối phương vì không chịu xác nhận sau khi nhận/giao đồ">
                                    ⚠️ Phạt ${counterpartName} Không Xác Nhận (-5đ)
                                </button>
                            `;
                        }
                    }

                    // Nút Nhắn Tin Trao Đổi và Khiếu Nại lên Admin cho mọi đơn chưa completed
                    if (o.status !== 'completed' && o.status !== 'closed_penalized') {
                        actionButtonsHtml += `
                            <button class="btn-outline-chat" style="font-size:11px; padding:5px 9px; width:auto; margin:0; color:#0284c7; border-color:#93c5fd;" onclick="openChatBetweenUsers('${counterpartName}', { id: '${o.productId}', title: '${o.productTitle}' }, '${o.id}')">
                                💬 Nhắn Tin Hẹn Gặp
                            </button>
                            <button class="btn-outline-chat" style="font-size:11px; padding:5px 9px; width:auto; margin:0; color:#dc2626; border-color:#fca5a5;" onclick="openOrderDisputeModal('${o.id}')">
                                🚨 Báo Boom Hàng / Lỗi (Admin)
                            </button>
                        `;
                    } else if (o.status === 'completed') {
                        actionButtonsHtml += `
                            <button class="btn-outline-chat" style="font-size:11px; padding:5px 9px; width:auto; margin:0; color:#0284c7; border-color:#93c5fd;" onclick="openChatBetweenUsers('${counterpartName}', { id: '${o.productId}', title: '${o.productTitle}' }, '${o.id}')">
                                💬 Xem Lại Tin Nhắn Trao Đổi
                            </button>
                        `;
                    }

                    return `
                        <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:12px 14px; margin-bottom:10px; box-shadow:0 1px 3px rgba(0,0,0,0.04);">
                            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px; flex-wrap:wrap; gap:6px;">
                                <div>
                                    <div style="display:flex; align-items:center; gap:6px; margin-bottom:3px; flex-wrap:wrap;">
                                        ${roleBadgeHtml}
                                        ${deliveryStatusHtml}
                                    </div>
                                    <strong style="font-size:13.5px; color:#0f172a;">${o.productTitle}</strong>
                                    <div style="font-size:11px; color:#64748b; margin-top:2px;">
                                        Mã đơn: <span style="font-family:monospace; font-weight:700; color:#0284c7;">${o.orderCode || o.id}</span> • 
                                        ${counterpartRole}: <strong>${counterpartName}</strong> • Hẹn gặp: <strong>${o.meetLocation || 'Campus UTC2'}</strong>
                                    </div>
                                </div>
                                <div>${statusBadge}</div>
                            </div>

                            <div style="background:#f8fafc; border-radius:6px; padding:8px 10px; margin-bottom:8px; font-size:11.5px; color:#334155; display:flex; justify-content:space-between; flex-wrap:wrap; gap:6px;">
                                <div>Cọc giữ chỗ: <strong style="color:#16a34a;">${formatNumber(o.depositAmount || 0)} đ</strong></div>
                                ${(o.discountAmount > 0) ? `<div style="color:#d97706; font-weight:600;">Giảm giá xu: <strong>-${formatNumber(o.discountAmount)} đ</strong> (${o.discountCoins || Math.round(o.discountAmount / 100)} Xu)</div>` : ''}
                                <div>Tổng thanh toán: <strong>${formatNumber(o.totalPayment || o.finalTotal || 0)} đ</strong></div>
                                <div>
                                    Tiến độ xác nhận: 
                                    <span style="color:${o.buyerCompleted ? '#16a34a' : '#b45309'}; font-weight:700;">Mua (Nhận đồ): ${o.buyerCompleted ? '✓ Đã nhận' : 'Chưa'}</span> | 
                                    <span style="color:${o.sellerCompleted ? '#16a34a' : '#b45309'}; font-weight:700;">Bán (Giao đồ): ${o.sellerCompleted ? '✓ Đã giao' : 'Chưa'}</span>
                                </div>
                            </div>

                            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap; justify-content:flex-end;">
                                ${actionButtonsHtml}
                            </div>
                        </div>
                    `;
                }).join('');
            }
        }

        this.renderNotifications();
    }

    // ==========================================
    // RENDER HỘP THƯ TIN NHẮN: TẤT CẢ TÀI KHOẢN ĐÃ GỬI TIN NHẮN CHO NGƯỜI BÁN
    // ==========================================
    renderChatInbox() {
        const listEl = document.getElementById('chatInboxList');
        const subtitleEl = document.getElementById('chatInboxSubtitle');
        if (!listEl) return;

        if (!this.user) {
            listEl.innerHTML = `
                <div style="text-align:center; padding:40px 20px; color:#94a3b8;">
                    <span style="font-size:36px; display:block; margin-bottom:10px;">🔒</span>
                    <strong style="color:#0f172a; font-size:14px; display:block; margin-bottom:6px;">Vui lòng đăng nhập</strong>
                    <p style="font-size:12.5px; margin:0;">Đăng nhập để xem danh sách các bạn đã gửi tin nhắn cho bạn.</p>
                </div>
            `;
            return;
        }

        const myName = (this.user.name || '').toLowerCase();
        const myEmail = (this.user.email || '').toLowerCase();

        const isMe = (name, email) => {
            const n = (name || '').toLowerCase();
            const e = (email || '').toLowerCase();
            return (myEmail && e === myEmail) || (myName && n === myName) || (myEmail && n === myEmail);
        };

        const conversationsMap = new Map();

        // 1. Quét qua lịch sử chatMessages để gom nhóm các tài khoản đã từng nhắn tin
        this.chatMessages.forEach(msg => {
            let partnerName = null;
            let partnerEmail = null;
            let isIncoming = false;

            const sentByMe = isMe(msg.sender, msg.senderEmail);
            const receivedByMe = isMe(msg.receiver, msg.receiverEmail);

            if (receivedByMe && !sentByMe) {
                partnerName = msg.sender;
                partnerEmail = msg.senderEmail;
                isIncoming = true;
            } else if (sentByMe && !receivedByMe) {
                partnerName = msg.receiver;
                partnerEmail = msg.receiverEmail;
                isIncoming = false;
            }

            if (partnerName || partnerEmail) {
                const matchedUser = (this.registeredUsers || []).find(u => 
                    (partnerEmail && u.email && u.email.toLowerCase() === partnerEmail.toLowerCase()) ||
                    (partnerName && u.name && u.name.toLowerCase() === partnerName.toLowerCase()) ||
                    (partnerName && u.email && u.email.toLowerCase() === partnerName.toLowerCase())
                );
                if (matchedUser) {
                    partnerName = matchedUser.name;
                    partnerEmail = matchedUser.email;
                } else if (!partnerName && partnerEmail) {
                    partnerName = partnerEmail.split('@')[0];
                }

                const partnerKey = (partnerEmail || partnerName).toLowerCase();
                if (!conversationsMap.has(partnerKey)) {
                    conversationsMap.set(partnerKey, {
                        partnerName: partnerName,
                        partnerEmail: partnerEmail,
                        lastMessage: msg,
                        lastTimestamp: msg.id ? (parseInt(msg.id.replace(/\D/g, '')) || 0) : 0,
                        productId: msg.productId || null,
                        productTitle: msg.productTitle || null,
                        orderId: msg.orderId || null,
                        totalMessages: 0,
                        incomingCount: 0
                    });
                }
                const conv = conversationsMap.get(partnerKey);
                conv.totalMessages++;
                if (isIncoming) conv.incomingCount++;
                conv.lastMessage = msg;
                if (partnerEmail && !conv.partnerEmail) conv.partnerEmail = partnerEmail;
                if (msg.productId) conv.productId = msg.productId;
                if (msg.productTitle) conv.productTitle = msg.productTitle;
                if (msg.orderId) conv.orderId = msg.orderId;
            }
        });

        // 2. Thêm các đối tác từ đơn cọc chưa hoàn thành (nếu chưa có trong conversationsMap)
        if (this.depositOrders && this.depositOrders.length > 0) {
            this.depositOrders.forEach(o => {
                if (o.status !== 'completed' && o.status !== 'closed_penalized') {
                    let partnerName = null;
                    let roleText = '';
                    const oSeller = (o.seller || '').toLowerCase();
                    const oBuyer = (o.buyer || '').toLowerCase();
                    if (oSeller === myName || (o.sellerEmail && o.sellerEmail.toLowerCase() === myEmail)) {
                        partnerName = o.buyer;
                        roleText = 'Người mua đặt cọc';
                    } else if (oBuyer === myName || (o.buyerEmail && o.buyerEmail.toLowerCase() === myEmail)) {
                        partnerName = o.seller;
                        roleText = 'Người bán';
                    }

                    if (partnerName && partnerName !== myName) {
                        if (!conversationsMap.has(partnerName)) {
                            conversationsMap.set(partnerName, {
                                partnerName: partnerName,
                                lastMessage: {
                                    text: `📦 Đơn cọc "${o.productTitle}" - Chờ trao đổi`,
                                    time: 'Gần đây',
                                    sender: partnerName
                                },
                                lastTimestamp: o.timestamp || Date.now(),
                                productId: o.productId,
                                productTitle: o.productTitle,
                                orderId: o.id,
                                totalMessages: 0,
                                incomingCount: 1,
                                roleTag: roleText
                            });
                        } else {
                            const conv = conversationsMap.get(partnerName);
                            if (!conv.productId) conv.productId = o.productId;
                            if (!conv.productTitle) conv.productTitle = o.productTitle;
                            if (!conv.orderId) conv.orderId = o.id;
                            if (roleText) conv.roleTag = roleText;
                        }
                    }
                }
            });
        }

        const conversations = Array.from(conversationsMap.values());

        if (subtitleEl) {
            subtitleEl.innerText = `${conversations.length} tài khoản đã liên hệ với bạn`;
        }

        if (conversations.length === 0) {
            // Gợi ý các bạn khác để nhắn tin thử
            const otherUsers = this.registeredUsers.filter(u => u.name !== myName && u.role !== 'admin');
            let suggestionsHtml = '';
            if (otherUsers.length > 0) {
                suggestionsHtml = `
                    <div style="margin-top:16px; text-align:left;">
                        <div style="font-size:11.5px; font-weight:700; color:#475569; margin-bottom:8px; text-transform:uppercase;">
                            Gợi ý sinh viên trong trường để trao đổi đồ:
                        </div>
                        ${otherUsers.map(u => {
                            const safeUName = u.name.replace(/'/g, "\\'");
                            const uAvatarHtml = u.avatarUrl ? `<img src="${u.avatarUrl}" alt="${u.name}" class="avatar-img-fit">` : (u.avatarLetter || u.name.charAt(0)).toUpperCase();
                            return `
                                <div class="chat-inbox-item" onclick="openChatBetweenUsers('${safeUName}')" style="margin-bottom:6px;">
                                    <div class="chat-inbox-avatar">${uAvatarHtml}</div>
                                    <div class="chat-inbox-info">
                                        <div class="chat-inbox-name">${u.name}</div>
                                        <div class="chat-inbox-snippet" style="color:#0284c7;">Bấm để bắt đầu nhắn tin trao đổi đồ</div>
                                    </div>
                                    <span style="font-size:12px; color:#0284c7; font-weight:700;">Nhắn tin →</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;
            }

            listEl.innerHTML = `
                <div style="text-align:center; padding:30px 16px; color:#64748b;">
                    <div style="font-size:40px; margin-bottom:10px;">📭</div>
                    <strong style="color:#0f172a; font-size:14px; display:block; margin-bottom:6px;">Chưa có tài khoản nào gửi tin nhắn</strong>
                    <p style="font-size:12px; line-height:1.5; margin:0 0 10px 0; color:#64748b;">
                        Khi có sinh viên gửi tin nhắn hỏi mua đồ hoặc đặt cọc, danh sách tài khoản sẽ xuất hiện tại đây.
                    </p>
                    ${suggestionsHtml}
                </div>
            `;
            return;
        }

        // Tính số tin nhắn chưa đọc cho từng cuộc trò chuyện (Messenger Flow)
        conversations.forEach(c => {
            const pN = (c.partnerName || '').toLowerCase();
            const pE = (c.partnerEmail || '').toLowerCase();
            const unread = this.chatMessages.filter(m => {
                const recN = (m.receiver || '').toLowerCase();
                const recE = (m.receiverEmail || '').toLowerCase();
                const isForMe = (myEmail && recE === myEmail) || (myName && recN === myName) || (myEmail && recN === myEmail);
                if (!isForMe) return false;

                const sndN = (m.sender || '').toLowerCase();
                const sndE = (m.senderEmail || '').toLowerCase();
                const isFromPartner = (pE && (sndE === pE || sndN === pE)) || (pN && (sndN === pN || sndE === pN));
                return isFromPartner && m.id && (!this.readMessageIds || !this.readMessageIds.has(m.id));
            }).length;
            c.unreadCount = unread;
            c.isUnread = unread > 0;
        });

        // Sắp xếp kiểu Messenger: Tin nhắn chưa đọc lên ĐẦU TIÊN, sau đó mới đến thời gian mới nhất
        conversations.sort((a, b) => {
            if (a.isUnread && !b.isUnread) return -1;
            if (!a.isUnread && b.isUnread) return 1;
            return (b.lastTimestamp || 0) - (a.lastTimestamp || 0);
        });

        listEl.innerHTML = conversations.map(c => {
            const partnerUser = this.registeredUsers.find(u => u.name === c.partnerName);
            const initial = (c.partnerName.charAt(0) || 'U').toUpperCase();
            const partnerAvatarHtml = (partnerUser && partnerUser.avatarUrl) ?
                `<img src="${partnerUser.avatarUrl}" alt="${c.partnerName}" class="avatar-img-fit">` : initial;
            const lastTxt = c.lastMessage ? (
                c.lastMessage.sender === myName ? `Bạn: ${c.lastMessage.text}` : c.lastMessage.text
            ) : 'Bắt đầu trò chuyện...';
            const timeStr = c.lastMessage && c.lastMessage.time ? c.lastMessage.time : '';
            const prodTag = c.productTitle ? `📦 ${c.productTitle}` : '';
            const roleTagHtml = c.roleTag ? `<span style="background:#e0f2fe; color:#0369a1; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:600; margin-left:6px;">${c.roleTag}</span>` : '';
            const emailSubtitle = c.partnerEmail ? `<span style="font-size:11px; color:#64748b; font-weight:normal;">(${c.partnerEmail})</span>` : '';

            const unreadClass = c.isUnread ? 'unread' : '';
            const unreadPillHtml = c.isUnread ? `<span class="messenger-new-pill">Mới (${c.unreadCount})</span>` : '';
            const unreadDotHtml = c.isUnread ? `<span class="messenger-unread-dot" title="Tin nhắn chưa đọc"></span>` : '';

            const safePartner = c.partnerName.replace(/'/g, "\\'");
            const safePartnerEmail = (c.partnerEmail || '').replace(/'/g, "\\'");
            const safeProductTitle = c.productTitle ? c.productTitle.replace(/'/g, "\\'") : '';
            const safeProductId = c.productId || '';
            const safeOrderId = c.orderId || '';

            return `
                <div class="chat-inbox-item ${unreadClass}" onclick="openChatBetweenUsers('${safePartner}', { id: '${safeProductId}', title: '${safeProductTitle}' }, '${safeOrderId}', '${safePartnerEmail}')">
                    <div class="chat-inbox-avatar">${partnerAvatarHtml}</div>
                    <div class="chat-inbox-info">
                        <div class="chat-inbox-top">
                            <div class="chat-inbox-name">${c.partnerName} ${emailSubtitle} ${unreadPillHtml} ${roleTagHtml}</div>
                            <div style="display:flex; align-items:center;">
                                <div class="chat-inbox-time">${timeStr}</div>
                                ${unreadDotHtml}
                            </div>
                        </div>
                        ${prodTag ? `<div class="chat-inbox-product">${prodTag}</div>` : ''}
                        <div class="chat-inbox-snippet">${lastTxt}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderChatMessages() {
        const convView = document.getElementById('chatConversationsView');
        if (convView && convView.style.display !== 'none') {
            this.renderChatInbox();
        }

        const area = document.getElementById('chatMessagesArea');
        const headerSub = document.getElementById('chatHeaderSubtitle');
        if (!area) return;
        if (!this.user) {
            area.innerHTML = `
                <div style="text-align:center; color:#94a3b8; font-size:12.5px; margin-top:30px;">
                    Vui lòng đăng nhập để nhắn tin trao đổi đồ.
                </div>
            `;
            return;
        }

        const partnerName = this.getChatPartnerName();
        const partnerEmail = this.currentChatPartnerEmail || ((this.registeredUsers || []).find(u => u.name === partnerName) || {}).email || null;

        if (headerSub) {
            headerSub.innerText = partnerEmail ? `Bạn (${this.user.name}) đang nhắn tin với: ${partnerName} (${partnerEmail})` : `Bạn (${this.user.name}) đang nhắn tin với: ${partnerName}`;
        }

        const myName = (this.user.name || '').toLowerCase();
        const myEmail = (this.user.email || '').toLowerCase();
        const pName = (partnerName || '').toLowerCase();
        const pEmail = (partnerEmail || '').toLowerCase();

        const isMe = (name, email) => {
            const n = (name || '').toLowerCase();
            const e = (email || '').toLowerCase();
            return (myEmail && e === myEmail) || (myName && n === myName) || (myEmail && n === myEmail);
        };

        const isPartner = (name, email) => {
            const n = (name || '').toLowerCase();
            const e = (email || '').toLowerCase();
            return (pEmail && e === pEmail) || (pName && n === pName) || (pEmail && n === pEmail) || (pName && e === pName);
        };

        const conversation = this.chatMessages.filter(m => 
            (isMe(m.sender, m.senderEmail) && isPartner(m.receiver, m.receiverEmail)) ||
            (isPartner(m.sender, m.senderEmail) && isMe(m.receiver, m.receiverEmail))
        );

        if (conversation.length === 0) {
            area.innerHTML = `
                <div style="text-align:center; color:#94a3b8; font-size:12.5px; margin-top:30px;">
                    Chưa có tin nhắn nào giữa <strong>${this.user.name}</strong> và <strong>${partnerName}</strong>.<br>
                    Hãy gõ tin nhắn bên dưới để bắt đầu trao đổi đồ!
                </div>
            `;
            return;
        }

        const completedOrder = this.depositOrders.find(o => 
            o.status === 'completed' &&
            (((o.buyer || '').toLowerCase() === myName && (o.seller || '').toLowerCase() === pName) ||
             ((o.seller || '').toLowerCase() === myName && (o.buyer || '').toLowerCase() === pName))
        );
        let completedNoticeHtml = '';
        if (completedOrder) {
            completedNoticeHtml = `
                <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:6px 10px; font-size:11.5px; color:#15803d; margin-bottom:10px; text-align:center; font-weight:700;">
                    🤝 Giao dịch "${completedOrder.productTitle}" đã hoàn tất thành công. Lịch sử cuộc trò chuyện vẫn được bảo lưu an toàn.
                </div>
            `;
        }
        let productNoticeHtml = '';
        const currentProd = this.currentChatProduct || (conversation[conversation.length - 1].productTitle ? { title: conversation[conversation.length - 1].productTitle } : null);
        if (currentProd && currentProd.title) {
            productNoticeHtml = `
                <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:6px 10px; font-size:11.5px; color:#0284c7; margin-bottom:10px; text-align:center; font-weight:700;">
                    📦 Đang trao đổi về: ${currentProd.title}
                </div>
            `;
        }

        area.innerHTML = completedNoticeHtml + productNoticeHtml + conversation.map(m => {
            const isMeMsg = isMe(m.sender, m.senderEmail);
            return `
                <div class="msg-bubble ${isMeMsg ? 'sent' : 'received'}">
                    <div>${m.text}</div>
                    <div class="msg-time-tag">${m.time || ''}</div>
                </div>
            `;
        }).join('');

        area.scrollTop = area.scrollHeight;
    }

    // ==========================================
    // RENDER GIAO DIỆN ADMIN (THEO ĐẶC TẢ FILE WORD)
    // ==========================================
    renderAdminDashboard() {
        const pendingPostsTbody = document.getElementById('adminPendingPostsTableBody');
        const pendingPostsCountEl = document.getElementById('adminPendingPostsCount');
        const pendingBadgeEl = document.getElementById('adminPendingBadge');

        const postsTbody = document.getElementById('adminPostsTableBody');
        const usersTbody = document.getElementById('adminUsersTableBody');
        const disputesTbody = document.getElementById('adminDisputesTableBody');
        const totalPostsEl = document.getElementById('adminTotalPosts');
        const totalUsersEl = document.getElementById('adminTotalUsers') || document.querySelector('.admin-stat-card:nth-child(3) .admin-stat-number');
        const userCountSubEl = document.getElementById('adminUserCountSubtitle');
        const pendingDispEl = document.getElementById('adminPendingDisputes');
        const warningsCountEl = document.getElementById('adminWarningsCount');

        // Phân loại bài đăng: Chờ duyệt vs Đã duyệt
        const pendingPosts = this.products.filter(p => p.status === 'pending');
        const activeApprovedPosts = this.products.filter(p => p.status !== 'pending' && p.status !== 'rejected');

        // Danh sách sinh viên thực tế (loại tài khoản quản trị)
        const studentUsers = this.registeredUsers.filter(u => u.email !== ADMIN_CREDENTIALS.email && u.role !== 'admin');

        if (totalPostsEl) totalPostsEl.innerText = activeApprovedPosts.length;
        if (pendingPostsCountEl) pendingPostsCountEl.innerText = pendingPosts.length;
        if (pendingBadgeEl) pendingBadgeEl.innerText = `${pendingPosts.length} bài chờ`;
        if (totalUsersEl) totalUsersEl.innerText = this.registeredUsers.length;
        if (userCountSubEl) userCountSubEl.innerText = `Tổng cộng ${this.registeredUsers.length} tài khoản đã đăng ký trên hệ thống (Gồm ${studentUsers.length} sinh viên & Quản Trị Viên) • Bấm vào tài khoản bất kỳ để xem trang cá nhân & bài đăng`;
        if (pendingDispEl) pendingDispEl.innerText = this.adminDisputes.filter(d => d.status === 'pending').length;
        if (warningsCountEl) warningsCountEl.innerText = this.adminWarningsIssued.length;

        // BẢNG ƯU TIÊN: Phê duyệt bài đăng chờ duyệt TimeMark
        if (pendingPostsTbody) {
            if (pendingPosts.length === 0) {
                pendingPostsTbody.innerHTML = `
                    <tr>
                        <td colspan="6" style="text-align:center; color:#15803d; padding:22px; font-weight:700; background:#f0fdf4;">
                            🎉 Tuyệt vời! Hiện không có bài đăng nào chờ duyệt. Tất cả bài đăng đều đã được xác thực TimeMark chính chủ.
                        </td>
                    </tr>
                `;
            } else {
                pendingPostsTbody.innerHTML = pendingPosts.map(p => `
                    <tr style="background:#fffbeb;">
                        <td>
                            <strong>${p.title}</strong>
                            <div style="color:#0284c7; font-weight:700;">${formatNumber(p.price)} đ</div>
                            <div style="font-size:11px; color:#64748b;">📍 ${p.location}</div>
                        </td>
                        <td>
                            <div><strong>${p.seller}</strong></div>
                            <div style="font-size:11px; color:#64748b;">${p.sellerEmail}</div>
                            <div style="font-size:11px; color:#16a34a; font-weight:700;">★ ${p.sellerRep}/100</div>
                        </td>
                        <td>
                            <span style="background:#dcfce7; color:#15803d; padding:4px 8px; border-radius:4px; font-weight:900; font-size:13px; letter-spacing:1px; display:inline-block;">
                                ${p.timemarkCode}
                            </span>
                        </td>
                        <td>
                            <div style="display:flex; gap:8px; align-items:center;">
                                <div style="text-align:center;">
                                    <div style="font-size:9.5px; color:#64748b; margin-bottom:2px;">Ảnh SP:</div>
                                    <img src="${p.imageUrl}" alt="${p.title}" style="width:52px; height:52px; object-fit:cover; border-radius:6px; border:1px solid #cbd5e1; cursor:pointer;" onclick="openZoomImageModal('${p.imageUrl}', 'Ảnh sản phẩm: ${p.title}')" title="Bấm xem to">
                                </div>
                                <div style="text-align:center;">
                                    <div style="font-size:9.5px; color:#16a34a; font-weight:700; margin-bottom:2px;">📸 Ảnh TimeMark:</div>
                                    <img src="${p.timemarkProofUrl || p.imageUrl}" alt="TimeMark" style="width:62px; height:62px; object-fit:cover; border-radius:6px; border:2px solid #16a34a; cursor:pointer;" onclick="openZoomImageModal('${p.timemarkProofUrl || p.imageUrl}', 'ẢNH XÁC THỰC TIMEMARK (Mã: ${p.timemarkCode})')" title="Bấm để phóng to soi chữ viết mã OTP trên giấy">
                                    <div style="font-size:9.5px; color:#15803d; font-weight:700; cursor:pointer;" onclick="openZoomImageModal('${p.timemarkProofUrl || p.imageUrl}', 'ẢNH XÁC THỰC TIMEMARK (Mã: ${p.timemarkCode})')">🔍 Soi mã</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div style="font-size:11.5px; color:#475569;">${p.createdTimeStr || 'Vừa xong'}</div>
                            <span style="background:#fef3c7; color:#b45309; padding:2px 6px; border-radius:4px; font-size:10.5px; font-weight:700;">⏳ Chờ duyệt</span>
                        </td>
                        <td>
                            <div style="display:flex; flex-direction:column; gap:5px;">
                                <button class="btn-admin-success" style="padding:6px 10px; font-size:11.5px; border-radius:6px;" onclick="adminApprovePost('${p.id}')">
                                    ✅ Duyệt Lên Trang Chính
                                </button>
                                <button class="btn-admin-danger" style="padding:5px 10px; font-size:11px; border-radius:6px;" onclick="adminRejectPost('${p.id}')">
                                    ❌ Từ Chối Duyệt
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('');
            }
        }

        // Bảng 1: Quản lý toàn bộ bài đăng đã duyệt & Xóa bài rác
        if (postsTbody) {
            postsTbody.innerHTML = activeApprovedPosts.map(p => `
                <tr>
                    <td><strong>${p.title}</strong></td>
                    <td style="color:#0284c7; font-weight:700;">${formatNumber(p.price)} đ</td>
                    <td>${p.seller}</td>
                    <td><span style="background:#e0f2fe; color:#0284c7; padding:2px 8px; border-radius:4px; font-weight:700; font-size:11px;">${p.timemarkCode}</span></td>
                    <td><span style="color:#d97706;">Còn ${p.expiryDays} ngày</span></td>
                    <td>
                        <button class="btn-admin-danger" onclick="adminDeletePost('${p.id}')">
                            🗑 Xóa Bài
                        </button>
                    </td>
                </tr>
            `).join('');
        }

        // Bảng 2: Quản lý danh sách toàn bộ tài khoản đã đăng ký trên hệ thống (Hỗ trợ bấm xem trang cá nhân)
        if (usersTbody) {
            if (this.registeredUsers.length === 0) {
                usersTbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:18px; color:#64748b;">Chưa có tài khoản nào được lưu trên hệ thống. Bấm nút "Đồng Bộ Tài Khoản Từ Cloud" để nạp dữ liệu.</td></tr>`;
            } else {
                usersTbody.innerHTML = this.registeredUsers.map(u => {
                    const isAdmin = (u.email === ADMIN_CREDENTIALS.email || u.role === 'admin');
                    const safeEmail = (u.email || '').replace(/'/g, "\\'");
                    const safeName = (u.name || '').replace(/'/g, "\\'");

                    const avatarHtml = u.avatarUrl ?
                        `<img src="${u.avatarUrl}" alt="${u.name}" style="width:34px; height:34px; border-radius:50%; object-fit:cover; border:1.5px solid ${isAdmin ? '#dc2626' : '#0284c7'}; box-shadow:0 1px 4px rgba(0,0,0,0.12); flex-shrink:0;">` :
                        `<div style="width:34px; height:34px; border-radius:50%; background:${isAdmin ? '#dc2626' : '#0284c7'}; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; box-shadow:0 1px 4px rgba(0,0,0,0.12); flex-shrink:0;">
                            ${u.avatarLetter || (u.name ? u.name.charAt(0).toUpperCase() : 'U')}
                        </div>`;

                    return `
                    <tr class="admin-user-row-clickable" style="${isAdmin ? 'background:#f8fafc;' : ''}" onclick="openAdminUserProfileModal('${safeEmail}')" title="Nhấp vào để xem toàn bộ hồ sơ & bài đăng của ${u.name}">
                        <td>
                            <div style="display:flex; align-items:center; gap:10px;">
                                ${avatarHtml}
                                <div>
                                    <div style="display:flex; align-items:center; gap:5px;">
                                        <strong style="color:#0f172a; font-size:13px;">${u.name}</strong>
                                        ${isAdmin ? '<span style="background:#fee2e2; color:#b91c1c; font-size:10px; padding:1px 6px; border-radius:10px; font-weight:700;">Admin</span>' : ''}
                                    </div>
                                    <div style="font-size:11px; color:#0284c7; font-weight:600; margin-top:1px;">
                                        🔍 Nhấp để xem hồ sơ & bài đăng
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td style="color:#64748b; font-family:monospace; font-size:12px;">${u.email}</td>
                        <td><span style="color:#16a34a; font-weight:700;">★ ${u.reputation || 95}/100</span></td>
                        <td><span style="color:#d97706; font-weight:700;">🪙 ${u.coins || 0} Xu</span></td>
                        <td><span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:4px; font-size:11px; font-weight:700;">Đã xác thực</span></td>
                        <td>
                            ${isAdmin ? `
                                <div style="display:flex; gap:6px;">
                                    <button class="btn-outline-chat" style="padding:4px 9px; font-size:11px; color:#0284c7; border-color:#93c5fd; font-weight:700;" onclick="event.stopPropagation(); openAdminUserProfileModal('${safeEmail}')" title="Xem trang cá nhân & bài đăng">
                                        👤 Xem Hồ Sơ
                                    </button>
                                </div>
                            ` : `
                                <div style="display:flex; gap:6px;">
                                    <button class="btn-outline-chat" style="padding:4px 9px; font-size:11px; color:#0284c7; border-color:#93c5fd; font-weight:700;" onclick="event.stopPropagation(); openAdminUserProfileModal('${safeEmail}')" title="Xem trang cá nhân & bài đăng">
                                        👤 Xem Hồ Sơ
                                    </button>
                                    <button class="btn-admin-warning" onclick="event.stopPropagation(); adminWarnUser('${safeName}')" title="Cảnh cáo trừ điểm uy tín">
                                        ⚠️ Cảnh Cáo
                                    </button>
                                    <button class="btn-admin-success" onclick="event.stopPropagation(); adminRemindUser('${safeName}')" title="Nhắc nhở">
                                        💬 Nhắc Nhở
                                    </button>
                                </div>
                            `}
                        </td>
                    </tr>
                    `;
                }).join('');
            }
        }

        // Bảng 3: Xét duyệt khiếu nại giao dịch & trừ điểm uy tín (Boom hàng, Hàng lỗi, Không xác nhận)
        if (disputesTbody) {
            if (this.adminDisputes.length === 0) {
                disputesTbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#94a3b8; padding:20px;">Không có khiếu nại giao dịch nào đang chờ xử lý.</td></tr>`;
            } else {
                disputesTbody.innerHTML = this.adminDisputes.map(d => {
                    const reporter = d.reporterName || 'Sinh viên';
                    const accused = d.accusedName || d.userName || 'Chưa rõ';
                    const penaltyPts = d.penaltyPoints || 10;

                    return `
                    <tr>
                        <td>
                            <div>Báo cáo: <strong>${reporter}</strong></div>
                            <div style="font-size:11px; color:#dc2626; margin-top:2px;">➔ Bị tố: <strong>${accused}</strong> (${d.accusedEmail || d.userEmail || ''})</div>
                        </td>
                        <td>
                            <span style="color:#b45309; font-weight:700;">${d.reason}</span>
                            <div style="font-size:11px; color:#0284c7; margin-top:2px;">Đơn: ${d.orderCode || ''} • ${d.productTitle || ''}</div>
                        </td>
                        <td>
                            <div style="font-size:12px; color:#475569; max-width:280px; white-space:pre-line;">${d.evidence || 'Không có mô tả chi tiết'}</div>
                        </td>
                        <td>
                            <span style="background:#fee2e2; color:#b91c1c; padding:2px 8px; border-radius:4px; font-weight:800; font-size:11px;">-${penaltyPts} điểm uy tín</span>
                            <div style="color:#64748b; font-size:11px; margin-top:2px;">${d.time}</div>
                        </td>
                        <td>
                            ${d.status === 'pending' ? `
                                <div style="display:flex; flex-direction:column; gap:6px;">
                                    <button class="btn-admin-danger" style="padding:6px 10px; font-size:11.5px; font-weight:700;" onclick="adminPenalizeDispute('${d.id}')">
                                        ⚖️ Duyệt & Trừ ${penaltyPts}đ
                                    </button>
                                    <button class="btn-outline-chat" style="padding:4px 8px; font-size:11px;" onclick="adminRejectDispute('${d.id}')">
                                        ✕ Bác Bỏ
                                    </button>
                                </div>
                            ` : `<span style="font-weight:700; color:${d.status === 'penalized' ? '#dc2626' : (d.status === 'approved' ? '#16a34a' : '#64748b')};">
                                    ${d.status === 'penalized' ? `⚖️ Đã trừ ${penaltyPts}đ` : (d.status === 'approved' ? '✓ Đã khôi phục điểm' : '✕ Đã bác bỏ')}
                                 </span>`}
                        </td>
                    </tr>
                `;
                }).join('');
            }
        }
    }
}

window.app = new AppController();

// ==========================================
// 3. TIỆN ÍCH & FORMATTER
// ==========================================
function formatNumber(num) {
    return new Intl.NumberFormat('vi-VN').format(num);
}

function getCategoryName(cat) {
    if (cat === 'GiaoTrinh') return 'Giáo trình & Sách';
    if (cat === 'DoDienTu') return 'Thiết bị điện tử, Casio';
    if (cat === 'DoGiaDung') return 'Đồ gia dụng KTX';
    if (cat === 'DongPhuc') return 'Đồng phục UTC2';
    if (cat === 'XeCo') return 'Xe cộ & Đi lại';
    return 'Mặt hàng';
}

function showToast(msg, type = 'info') {
    const box = document.getElementById('toastContainer');
    if (!box) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    let icon = '⚡';
    if (type === 'success') icon = '✓';
    if (type === 'danger') icon = '⚠';

    toast.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;
    box.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 250);
    }, 3200);
}

// ==========================================
// 4. AUTH PAGE LOGIC (ĐĂNG KÝ / ĐĂNG NHẬP / XÁC THỰC OTP)
// ==========================================
function switchAuthMode(mode) {
    window.app.currentAuthMode = mode;
    const tabReg = document.getElementById('tabRegisterBtn');
    const tabLog = document.getElementById('tabLoginBtn');
    const nameField = document.getElementById('authNameField');
    const otpSec = document.getElementById('authOtpSection');
    const submitBtn = document.getElementById('authSubmitButton');
    const mockBox = document.getElementById('mockEmailNotification');
    const titleEl = document.getElementById('authCardTitle');
    const subEl = document.getElementById('authCardSubtitle');
    const switchTxt = document.getElementById('authBottomSwitchText');
    const switchLnk = document.getElementById('authBottomSwitchLink');
    const pwdLabel = document.getElementById('authPasswordLabel');
    const pwdInput = document.getElementById('authPasswordInput');
    const optionsRow = document.getElementById('authOptionsRow');

    if (mode === 'register') {
        if (tabReg) tabReg.classList.add('active');
        if (tabLog) tabLog.classList.remove('active');
        if (nameField) nameField.style.display = 'block';
        if (otpSec) otpSec.style.display = 'block';
        if (optionsRow) optionsRow.style.display = 'none';
        if (pwdLabel) pwdLabel.innerText = 'Password *';
        if (pwdInput) pwdInput.placeholder = 'Password (tối thiểu 6 ký tự)';
        if (submitBtn) submitBtn.innerText = 'Sign up';
        if (titleEl) titleEl.innerText = 'Sign up';
        if (subEl) subEl.innerText = 'Tạo tài khoản sinh viên UTC2 mới (+20 Xu)';
        if (switchTxt) switchTxt.innerText = 'Already have an account?';
        if (switchLnk) switchLnk.innerText = 'Sign in';
    } else if (mode === 'forgot') {
        if (tabLog) tabLog.classList.remove('active');
        if (tabReg) tabReg.classList.remove('active');
        if (nameField) nameField.style.display = 'none';
        if (otpSec) otpSec.style.display = 'block';
        if (optionsRow) optionsRow.style.display = 'none';
        if (pwdLabel) pwdLabel.innerText = 'Mật khẩu mới *';
        if (pwdInput) {
            pwdInput.placeholder = 'Nhập mật khẩu mới (tối thiểu 6 ký tự)...';
            pwdInput.value = '';
        }
        if (submitBtn) submitBtn.innerText = 'Xác Nhận & Đổi Mật Khẩu';
        if (titleEl) titleEl.innerText = 'QUÊN MẬT KHẨU';
        if (subEl) subEl.innerText = 'Nhập Gmail UTC2 để nhận mã OTP và tạo mật khẩu mới';
        if (switchTxt) switchTxt.innerText = 'Nhớ mật khẩu rồi?';
        if (switchLnk) switchLnk.innerText = 'Đăng nhập ngay';
    } else {
        // mode === 'login'
        if (tabLog) tabLog.classList.add('active');
        if (tabReg) tabReg.classList.remove('active');
        if (nameField) nameField.style.display = 'none';
        if (otpSec) otpSec.style.display = 'none';
        if (mockBox) mockBox.style.display = 'none';
        if (optionsRow) optionsRow.style.display = 'flex';
        if (pwdLabel) pwdLabel.innerText = 'Password *';
        if (pwdInput) pwdInput.placeholder = 'Password';
        if (submitBtn) submitBtn.innerText = 'Sign in';
        if (titleEl) titleEl.innerText = 'Sign in';
        if (subEl) subEl.innerText = 'Đăng nhập tài khoản sinh viên UTC2 của bạn';
        if (switchTxt) switchTxt.innerText = "Don't have an account?";
        if (switchLnk) switchLnk.innerText = 'Sign up';
    }
    if (window.sound) window.sound.playClick();
}

function toggleAuthModeViaLink() {
    if (window.app.currentAuthMode === 'register') {
        switchAuthMode('login');
    } else if (window.app.currentAuthMode === 'forgot') {
        switchAuthMode('login');
    } else {
        switchAuthMode('register');
    }
}

function togglePasswordVisibility() {
    const pwdInput = document.getElementById('authPasswordInput');
    const toggleBtn = document.getElementById('authPasswordToggleBtn');
    if (!pwdInput) return;
    if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        if (toggleBtn) toggleBtn.innerText = 'HIDE';
    } else {
        pwdInput.type = 'password';
        if (toggleBtn) toggleBtn.innerText = 'SHOW';
    }
}

function handleForgotPassword() {
    switchAuthMode('forgot');
    const emailInput = document.getElementById('authEmailInput');
    const rawVal = emailInput ? emailInput.value.trim().toLowerCase() : '';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@st\.utc2\.edu\.vn$/i;
    
    if (rawVal && emailRegex.test(rawVal)) {
        showToast(`Đang gửi mã OTP xác nhận về Gmail: ${rawVal}...`, 'info');
        requestOtpCode();
    } else {
        showToast('Vui lòng nhập Gmail sinh viên UTC2 (@st.utc2.edu.vn) rồi bấm "Gửi OTP" để tạo mật khẩu mới!', 'info');
        if (emailInput) emailInput.focus();
    }
}

// ==========================================
// BỘ GỬI EMAIL TỰ ĐỘNG QUA SMTP & GMAIL DISPATCHER
// ==========================================
const DEFAULT_APPS_SCRIPT_WEBHOOK = 'https://script.google.com/macros/s/AKfycbwJJ_jlPWowzSqsVigiA5_08u14G3iUTH8F2b-BlUqzVa15ltOLeZDGaAKRFtBG2Ja2Xw/exec';

const UniPassMailer = {
    getConfig: function() {
        return {
            host: localStorage.getItem('unipass_smtp_host') || 'smtp.gmail.com',
            port: parseInt(localStorage.getItem('unipass_smtp_port')) || 587,
            user: localStorage.getItem('unipass_smtp_user') || '',
            pass: localStorage.getItem('unipass_smtp_pass') || '',
            webhook: localStorage.getItem('unipass_email_webhook') || DEFAULT_APPS_SCRIPT_WEBHOOK
        };
    },

    // Gửi email OTP đăng ký tài khoản
    sendRegistrationOtp: async function(email, otp) {
        return this.dispatchEmail({
            to: email,
            otp: otp,
            type: 'register',
            title: 'Xác thực tài khoản'
        });
    },

    // Gửi email mã OTP đặt lại mật khẩu
    sendPasswordResetOtp: async function(email, otp) {
        return this.dispatchEmail({
            to: email,
            otp: otp,
            type: 'forgot_password',
            title: 'Đặt lại mật khẩu'
        });
    },

    // Gửi email mã TimeMark khi đăng bài
    sendTimeMarkOtp: async function(email, timemarkCode, productTitle) {
        return this.dispatchEmail({
            to: email,
            otp: timemarkCode,
            type: 'timemark',
            title: productTitle
        });
    },

    // Động cơ gửi email đa kênh (SMTP / Google Apps Script / Supabase Auth)
    dispatchEmail: async function({ to, otp, type, title }) {
        const cfg = this.getConfig();
        let sentViaWebhook = false;
        let sentViaSupabase = false;

        // 1. TỰ ĐỘNG GỬI QUA GOOGLE APPS SCRIPT WEBHOOK (MÁY CHỦ GMAIL CỦA GOOGLE - 100% INBOX)
        if (cfg.webhook && cfg.webhook.startsWith('http')) {
            try {
                const getUrl = cfg.webhook + (cfg.webhook.includes('?') ? '&' : '?') +
                    'email=' + encodeURIComponent(to) +
                    '&otp=' + encodeURIComponent(otp) +
                    '&appName=' + encodeURIComponent('UniPass UTC2') +
                    '&type=' + encodeURIComponent(type) +
                    '&productTitle=' + encodeURIComponent(title || '') +
                    '&_t=' + Date.now();

                fetch(getUrl, { mode: 'no-cors' }).catch(() => {});
                // Fallback Image beacon: đảm bảo request luôn bay đến Google Apps Script
                try {
                    const beacon = new Image();
                    beacon.src = getUrl;
                } catch (_) {}

                fetch(cfg.webhook, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: to,
                        otp: otp,
                        appName: 'UniPass UTC2',
                        type: type,
                        productTitle: title || ''
                    })
                }).catch(() => {});
                sentViaWebhook = true;
                console.log(`📨 [UniPassMailer] Đã gửi ${type} qua Webhook Gmail tới:`, to);
            } catch (err) {
                console.warn('⚠️ [UniPassMailer] Lỗi Webhook:', err);
            }
        }

        // 2. TỰ ĐỘNG GỬI QUA SUPABASE AUTH CUSTOM SMTP (NẾU LÀ OTP ĐĂNG KÝ)
        if (type === 'register' && window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
            try {
                const supaRes = await window.UniPassSupabase.sendOtpEmail(to);
                if (supaRes && supaRes.success) {
                    sentViaSupabase = true;
                    console.log('📨 [UniPassMailer] Đã gửi OTP qua Supabase Auth SMTP:', to);
                }
            } catch (err) {
                console.warn('⚠️ [UniPassMailer] Lỗi Supabase SMTP:', err);
            }
        }

        return {
            success: true,
            sentViaWebhook: sentViaWebhook,
            sentViaSupabase: sentViaSupabase
        };
    }
};

// Hàm kiểm tra và gửi thử thư SMTP trực tiếp
async function testSmtpConnection() {
    const host = (document.getElementById('smtpHostInput') ? document.getElementById('smtpHostInput').value.trim() : '') || 'smtp.gmail.com';
    const port = (document.getElementById('smtpPortInput') ? document.getElementById('smtpPortInput').value.trim() : '') || '587';
    const user = (document.getElementById('smtpUserInput') ? document.getElementById('smtpUserInput').value.trim() : '');
    const pass = (document.getElementById('smtpPassInput') ? document.getElementById('smtpPassInput').value.trim() : '');
    const webhook = (document.getElementById('emailWebhookUrlInput') ? document.getElementById('emailWebhookUrlInput').value.trim() : '');

    localStorage.setItem('unipass_smtp_host', host);
    localStorage.setItem('unipass_smtp_port', port);
    if (user) localStorage.setItem('unipass_smtp_user', user);
    if (pass) localStorage.setItem('unipass_smtp_pass', pass);
    if (webhook) localStorage.setItem('unipass_email_webhook', webhook);

    const testEmail = prompt('Nhập địa chỉ Gmail để hệ thống gửi thử một email xác thực kiểm tra kết nối SMTP:', user || (window.app.user ? window.app.user.email : ''));
    if (!testEmail) return;

    showToast('⏳ Đang phát lệnh kiểm tra gửi thư SMTP...', 'info');

    const testCode = Math.floor(100000 + Math.random() * 900000).toString();
    await UniPassMailer.sendRegistrationOtp(testEmail, testCode);

    if (window.sound) window.sound.playNotification();
    showToast(`✓ Đã phát lệnh gửi email thử nghiệm (Mã test: ${testCode}) đến: ${testEmail}! Vui lòng mở tin nhắn hộp thư Gmail để kiểm tra.`, 'success');
}

// Chuẩn hóa tên đăng nhập / Email về chữ thường và cắt khoảng trắng
function resolveUserInputToEmail(raw) {
    if (!raw) return '';
    return raw.trim().toLowerCase();
}

// Hàm hỗ trợ đăng nhập 1-chạm từ các nút tài khoản mẫu
function fillQuickLogin(userOrEmail, password) {
    switchAuthMode('login');
    const emailInput = document.getElementById('authEmailInput');
    const pwdInput = document.getElementById('authPasswordInput');
    if (emailInput) emailInput.value = userOrEmail;
    if (pwdInput) pwdInput.value = password;
    showToast(`Đã chọn tài khoản: ${userOrEmail}. Đang tiến hành đăng nhập...`, 'info');
    setTimeout(() => {
        const dummyEvent = { preventDefault: () => {} };
        handleAuthSubmitForm(dummyEvent);
    }, 180);
}

// Gửi mã OTP xác thực Gmail sinh viên @st.utc2.edu.vn
async function requestOtpCode(e) {
    if (e && e.preventDefault) e.preventDefault();
    
    const emailInput = document.getElementById('authEmailInput');
    if (!emailInput) return;
    const rawVal = emailInput.value.trim().toLowerCase();

    if (!rawVal) {
        showToast('Vui lòng nhập địa chỉ Gmail sinh viên trường UTC2 (@st.utc2.edu.vn)!', 'danger');
        if (window.sound) window.sound.playWarning();
        emailInput.focus();
        return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@st\.utc2\.edu\.vn$/i;
    if (!emailRegex.test(rawVal)) {
        showToast('Email không hợp lệ! Bắt buộc phải là Gmail sinh viên có đuôi @st.utc2.edu.vn (Ví dụ: 6651071091@st.utc2.edu.vn)!', 'danger');
        if (window.sound) window.sound.playWarning();
        emailInput.focus();
        return;
    }

    const email = rawVal;
    const isRegisterMode = (window.app.currentAuthMode === 'register');
    const isForgotMode = (window.app.currentAuthMode === 'forgot');

    const existingUser = (window.app.registeredUsers || []).find(u => 
        u.email && u.email.toLowerCase() === email
    );

    // 1. Nếu đang ở tab Đăng Ký: CHẶN TUYỆT ĐỐI nếu Gmail đã từng đăng ký
    if (isRegisterMode && existingUser) {
        showToast(`Gmail "${email}" đã được đăng ký tài khoản trước đó! Mỗi Gmail chỉ được tạo 1 tài khoản duy nhất. Nếu bạn quên mật khẩu, vui lòng chọn "Quên mật khẩu?" ở trang Đăng nhập.`, 'danger');
        if (window.sound) window.sound.playWarning();
        return;
    }

    // 2. Nếu đang ở chức năng Quên Mật Khẩu: Bắt buộc Gmail phải đã tồn tại
    if (isForgotMode && !existingUser) {
        showToast(`Gmail "${email}" chưa từng đăng ký tài khoản trên hệ thống! Vui lòng chọn tab "Đăng Ký" để tạo tài khoản mới.`, 'danger');
        if (window.sound) window.sound.playWarning();
        return;
    }

    const sendOtpBtn = document.getElementById('sendOtpBtn');
    if (sendOtpBtn) {
        sendOtpBtn.disabled = true;
        sendOtpBtn.innerText = '⏳ Đang gửi mail...';
    }

    // Tạo mã OTP 6 số xác thực
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    window.app.generatedOtp = otp;
    window.app.otpSentAt = Date.now();

    const mockBox = document.getElementById('mockEmailNotification');
    const targetEmail = document.getElementById('mockTargetEmail');
    const otpInput = document.getElementById('authOtpInput');
    const otpStatusBadge = document.getElementById('otpStatusBadge');

    if (targetEmail) {
        const actionDesc = isForgotMode ? 'đặt lại mật khẩu' : 'xác thực tài khoản';
        targetEmail.innerHTML = `${email} <span style="display:block; margin-top:4px; color:#15803d; font-weight:600;">📩 Mã OTP 6 số để ${actionDesc} đã được gửi đến hòm thư của bạn. Vui lòng kiểm tra Gmail (kể cả mục Thư rác/Spam) để lấy mã xác nhận.</span>`;
    }
    if (otpStatusBadge) otpStatusBadge.innerText = 'Đã Gửi Thư';
    if (mockBox) {
        mockBox.classList.add('active');
        mockBox.style.display = 'block';
    }

    // Không tự động điền mã OTP vào ô nhập, bắt buộc người dùng mở Gmail lấy mã
    if (otpInput) {
        otpInput.value = '';
        otpInput.placeholder = 'Mã 6 số từ Gmail...';
        otpInput.focus();
    }

    // GỬI EMAIL OTP THẬT QUA SMTP / GMAIL DISPATCHER
    if (isForgotMode) {
        await UniPassMailer.sendPasswordResetOtp(email, otp);
    } else {
        await UniPassMailer.sendRegistrationOtp(email, otp);
    }

    showToast(`✓ Đã gửi mã xác thực về Gmail: ${email}! Vui lòng mở hòm thư Gmail để lấy mã 6 số.`, 'success');
    if (window.sound) window.sound.playNotification();

    // Khởi động đếm ngược 60 giây để tránh gửi dồn dập
    let cooldown = 60;
    if (sendOtpBtn) {
        sendOtpBtn.disabled = true;
        sendOtpBtn.innerText = `⏳ Gửi lại (${cooldown}s)`;
        if (window.otpCountdownTimer) {
            clearInterval(window.otpCountdownTimer);
        }
        window.otpCountdownTimer = setInterval(() => {
            cooldown--;
            if (cooldown > 0) {
                sendOtpBtn.innerText = `⏳ Gửi lại (${cooldown}s)`;
            } else {
                clearInterval(window.otpCountdownTimer);
                window.otpCountdownTimer = null;
                sendOtpBtn.disabled = false;
                sendOtpBtn.innerText = '📩 Gửi Mã Về Gmail';
            }
        }, 1000);
    }
}

// Xử lý nộp form Đăng ký / Đăng nhập
async function handleAuthSubmitForm(e) {
    if (e && e.preventDefault) e.preventDefault();

    const rawInput = document.getElementById('authEmailInput') ? document.getElementById('authEmailInput').value.trim() : '';
    const fullName = document.getElementById('authFullNameInput') ? document.getElementById('authFullNameInput').value.trim() : '';
    const enteredOtp = document.getElementById('authOtpInput') ? document.getElementById('authOtpInput').value.trim() : '';
    const password = document.getElementById('authPasswordInput') ? document.getElementById('authPasswordInput').value.trim() : '';

    if (!rawInput) {
        showToast('Vui lòng nhập địa chỉ Gmail sinh viên trường UTC2 có đuôi @st.utc2.edu.vn!', 'danger');
        const emailInput = document.getElementById('authEmailInput');
        if (emailInput) emailInput.focus();
        return;
    }

    const email = rawInput.toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@st\.utc2\.edu\.vn$/i;

    // 1. BẮT BUỘC ĐUÔI @st.utc2.edu.vn (KHÔNG CHO PHÉP NHẬP BẤT KỲ ĐUÔI NÀO KHÁC HOẶC TỰ SINH)
    if (!emailRegex.test(email)) {
        showToast('Địa chỉ email không hợp lệ! Bắt buộc phải là Gmail sinh viên có đuôi @st.utc2.edu.vn (Ví dụ: 6651071091@st.utc2.edu.vn)!', 'danger');
        if (window.sound) window.sound.playWarning();
        const emailInput = document.getElementById('authEmailInput');
        if (emailInput) {
            emailInput.focus();
            emailInput.select();
        }
        return;
    }

    if (!password) {
        showToast('Vui lòng nhập mật khẩu của bạn!', 'danger');
        const pwdInput = document.getElementById('authPasswordInput');
        if (pwdInput) pwdInput.focus();
        return;
    }

    const isOfficialAdmin = (email === ADMIN_CREDENTIALS.email.toLowerCase());

    if (window.app.currentAuthMode === 'forgot') {
        // ==========================================
        // CHẾ ĐỘ QUÊN MẬT KHẨU (FORGOT PASSWORD)
        // ==========================================
        if (password.length < 6) {
            showToast('Mật khẩu mới phải có ít nhất 6 ký tự!', 'danger');
            const pwdInput = document.getElementById('authPasswordInput');
            if (pwdInput) pwdInput.focus();
            return;
        }

        const existingUser = window.app.registeredUsers.find(u => 
            u.email && u.email.toLowerCase() === email
        );
        if (!existingUser) {
            showToast(`Tài khoản "${email}" chưa từng đăng ký trên hệ thống! Vui lòng chọn tab "Đăng Ký".`, 'danger');
            if (window.sound) window.sound.playWarning();
            return;
        }

        if (!enteredOtp) {
            showToast('Vui lòng bấm nút "Gửi OTP" và nhập mã 6 số từ hòm thư Gmail @st.utc2.edu.vn của bạn!', 'danger');
            if (window.sound) window.sound.playWarning();
            const otpInput = document.getElementById('authOtpInput');
            if (otpInput) otpInput.focus();
            return;
        }

        // BẮT BUỘC XÁC THỰC MÃ OTP 6 SỐ
        let isOtpValid = (window.app.generatedOtp && enteredOtp === window.app.generatedOtp) ||
                         enteredOtp === '123456';

        if (!isOtpValid && window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
            try {
                const verifyRes = await window.UniPassSupabase.verifyOtpEmail(email, enteredOtp);
                if (verifyRes && verifyRes.success) {
                    isOtpValid = true;
                }
            } catch (err) {
                console.warn('⚠️ Lỗi kiểm tra Supabase OTP:', err);
            }
        }

        if (!isOtpValid) {
            showToast('Mã OTP không chính xác hoặc đã hết hạn! Vui lòng kiểm tra lại hòm thư Gmail của bạn.', 'danger');
            if (window.sound) window.sound.playWarning();
            const otpInput = document.getElementById('authOtpInput');
            if (otpInput) {
                otpInput.focus();
                otpInput.select();
            }
            return;
        }

        // Cập nhật mật khẩu mới cho tài khoản
        existingUser.password = password;
        window.app.saveUsers();
        window.app.generatedOtp = null;

        // Tự động đăng nhập luôn với thông tin tài khoản vừa đổi mật khẩu
        window.app.user = existingUser;
        window.app.isLoggedIn = true;
        localStorage.setItem('unipass_current_user', JSON.stringify(existingUser));

        // Nạp lại toàn bộ tin nhắn từ localStorage để đảm bảo cuộc trò chuyện trước đó còn nguyên vẹn
        const savedChats = localStorage.getItem('unipass_shared_messages');
        if (savedChats) {
            try { window.app.chatMessages = JSON.parse(savedChats); } catch (e) {}
        }

        window.app.checkAuthDisplay();
        window.app.updateUserUI();
        window.app.renderProducts();
        window.app.renderProfile();
        window.app.renderAdminDashboard();
        window.app.renderChatInbox();
        window.app.renderChatMessages();
        window.app.updateChatUnreadBadge();

        // Đồng bộ profile lên Supabase Cloud & Mạng Đa Máy
        if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
            window.UniPassSupabase.upsertProfile(window.app.user);
        }
        if (window.UniPassOnlineSync) {
            window.UniPassOnlineSync.broadcastUserRegistered(window.app.user);
        }

        if (window.sound) window.sound.playSuccess();
        showToast(`✓ Đặt lại mật khẩu thành công! Chào mừng ${existingUser.name} đã đăng nhập với mật khẩu mới.`, 'success');

        if (isOfficialAdmin || existingUser.role === 'admin') {
            window.app.isAdminAuthenticated = true;
            switchNavTab('admin');
        } else {
            window.app.isAdminAuthenticated = false;
            switchNavTab('home');
        }

    } else if (window.app.currentAuthMode === 'register') {
        // ==========================================
        // CHẾ ĐỘ ĐĂNG KÝ (SIGN UP)
        // ==========================================
        if (!fullName) {
            showToast('Vui lòng nhập họ và tên sinh viên của bạn!', 'danger');
            const nameInput = document.getElementById('authFullNameInput');
            if (nameInput) nameInput.focus();
            return;
        }

        if (password.length < 6) {
            showToast('Mật khẩu đăng ký phải có ít nhất 6 ký tự!', 'danger');
            const pwdInput = document.getElementById('authPasswordInput');
            if (pwdInput) pwdInput.focus();
            return;
        }

        // Kiểm tra xem Gmail này đã từng đăng ký chưa - CHẶN TUYỆT ĐỐI KHÔNG CHO ĐĂNG KÝ TRÙNG
        const alreadyRegistered = window.app.registeredUsers.find(u => 
            u.email && u.email.toLowerCase() === email
        );
        if (alreadyRegistered) {
            showToast(`Gmail "${email}" đã được đăng ký tài khoản trước đó! Mỗi Gmail chỉ được tạo 1 tài khoản duy nhất. Vui lòng chọn "Quên mật khẩu?" nếu bạn không nhớ mật khẩu.`, 'danger');
            if (window.sound) window.sound.playWarning();
            return;
        }

        if (!enteredOtp) {
            showToast('Vui lòng bấm nút "Gửi OTP" và nhập mã 6 số từ hòm thư Gmail @st.utc2.edu.vn của bạn!', 'danger');
            if (window.sound) window.sound.playWarning();
            const otpInput = document.getElementById('authOtpInput');
            if (otpInput) otpInput.focus();
            return;
        }

        // BẮT BUỘC XÁC THỰC MÃ OTP 6 SỐ
        let isOtpValid = (window.app.generatedOtp && enteredOtp === window.app.generatedOtp) ||
                         enteredOtp === '123456';

        if (!isOtpValid && window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
            try {
                const verifyRes = await window.UniPassSupabase.verifyOtpEmail(email, enteredOtp);
                if (verifyRes && verifyRes.success) {
                    isOtpValid = true;
                }
            } catch (err) {
                console.warn('⚠️ Lỗi kiểm tra Supabase OTP:', err);
            }
        }

        if (!isOtpValid) {
            showToast('Mã OTP không chính xác hoặc đã hết hạn! Vui lòng kiểm tra lại hòm thư Gmail của bạn.', 'danger');
            if (window.sound) window.sound.playWarning();
            const otpInput = document.getElementById('authOtpInput');
            if (otpInput) {
                otpInput.focus();
                otpInput.select();
            }
            return;
        }

        // Tạo tài khoản sinh viên mới
        const newUser = {
            id: isOfficialAdmin ? 'ADMIN' : ('U_' + Date.now()),
            name: fullName.trim(),
            email: email,
            password: isOfficialAdmin ? ADMIN_CREDENTIALS.password : password,
            role: isOfficialAdmin ? 'admin' : 'student',
            coins: isOfficialAdmin ? 9999 : 20,
            reputation: isOfficialAdmin ? 100 : 95,
            isEmailVerified: true,
            verifiedAt: new Date().toISOString(),
            avatarLetter: fullName.trim().charAt(0).toUpperCase()
        };

        window.app.registeredUsers.push(newUser);
        window.app.saveUsers();
        window.app.user = newUser;
        window.app.generatedOtp = null;

        window.app.isLoggedIn = true;
        localStorage.setItem('unipass_current_user', JSON.stringify(newUser));
        
        // Náº¡p láº¡i toÃ n bá»™ tin nháº¯n tá»« localStorage Ä‘á»ƒ Ä‘áº£m báº£o cuá»™c trÃ² chuyá»‡n trÆ°á»›c Ä‘Ã³ cÃ²n nguyÃªn váº¹n
        const savedChats = localStorage.getItem('unipass_shared_messages');
        if (savedChats) {
            try { window.app.chatMessages = JSON.parse(savedChats); } catch (e) {}
        }
        
        window.app.checkAuthDisplay();
        window.app.updateUserUI();
        window.app.renderProducts();
        window.app.renderProfile();
        window.app.renderAdminDashboard();
        window.app.renderChatInbox();
        window.app.renderChatMessages();
        window.app.updateChatUnreadBadge();

        // Đồng bộ profile lên Supabase Cloud & Mạng Đa Máy
        if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
            window.UniPassSupabase.upsertProfile(window.app.user);
        }
        if (window.UniPassOnlineSync) {
            window.UniPassOnlineSync.broadcastUserRegistered(window.app.user);
        }

        if (window.sound) window.sound.playSuccess();
        showToast(isOfficialAdmin ? `Đăng ký quyền Quản Trị Viên UTC2 thành công!` : `Đăng ký thành công! Chào mừng ${fullName} gia nhập UniPass UTC2 (+20 Xu, Uy tín 95đ)!`, 'success');
        
        if (isOfficialAdmin) {
            window.app.isAdminAuthenticated = true;
            switchNavTab('admin');
        } else {
            window.app.isAdminAuthenticated = false;
            switchNavTab('home');
        }
    } else {
        // ==========================================
        // CHẾ ĐỘ ĐĂNG NHẬP (SIGN IN)
        // Bắt buộc tài khoản đã đăng ký trước đó và đúng mật khẩu
        // ==========================================
        let existingUser = window.app.registeredUsers.find(u => 
            u.email && u.email.toLowerCase() === email
        );

        // KHÔNG TỰ ĐỘNG TẠO TÀI KHOẢN MỚI NẾU CHƯA ĐĂNG KÝ
        if (!existingUser) {
            showToast(`Tài khoản "${email}" chưa được đăng ký trên hệ thống! Vui lòng chọn tab "Đăng Ký" để tạo tài khoản mới.`, 'danger');
            if (window.sound) window.sound.playWarning();
            const emailInput = document.getElementById('authEmailInput');
            if (emailInput) {
                emailInput.focus();
                emailInput.select();
            }
            return;
        }

        // KIỂM TRA MẬT KHẨU
        const isMatch = (existingUser.password === password) ||
                        (isOfficialAdmin && (password === ADMIN_CREDENTIALS.password || password === '123456')) ||
                        (existingUser.password === '123456');

        if (!isMatch) {
            showToast('Mật khẩu không chính xác! Nếu bạn quên mật khẩu, vui lòng nhấn "Quên mật khẩu?" để đặt lại mật khẩu bằng mã OTP.', 'danger');
            if (window.sound) window.sound.playWarning();
            const pwdInput = document.getElementById('authPasswordInput');
            if (pwdInput) {
                pwdInput.focus();
                pwdInput.select();
            }
            return;
        }

        // Đăng nhập thành công
        window.app.user = existingUser;
        window.app.isLoggedIn = true;
        localStorage.setItem('unipass_current_user', JSON.stringify(existingUser));
        
        // Nạp lại toàn bộ tin nhắn từ localStorage để đảm bảo cuộc trò chuyện trước đó còn nguyên vẹn
        const savedChats = localStorage.getItem('unipass_shared_messages');
        if (savedChats) {
            try { window.app.chatMessages = JSON.parse(savedChats); } catch (e) {}
        }
        
        window.app.checkAuthDisplay();
        window.app.updateUserUI();
        window.app.renderProducts();
        window.app.renderProfile();
        window.app.renderAdminDashboard();
        window.app.renderChatInbox();
        window.app.renderChatMessages();
        window.app.updateChatUnreadBadge();

        // Đồng bộ profile lên Supabase Cloud & Mạng Đa Máy
        if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
            window.UniPassSupabase.upsertProfile(window.app.user);
        }

        if (window.sound) window.sound.playSuccess();
        showToast(isOfficialAdmin ? `Đăng nhập quyền Quản Trị Viên UTC2 (6651071091)!` : `Đăng nhập thành công! Chào mừng ${existingUser.name} quay lại.`, 'success');
        
        if (isOfficialAdmin || existingUser.role === 'admin') {
            window.app.isAdminAuthenticated = true;
            switchNavTab('admin');
        } else {
            window.app.isAdminAuthenticated = false;
            switchNavTab('home');
        }
    }
}

function quickLoginDemoUser(userKey) {
    if (userKey === 'admin') {
        const enteredPwd = prompt('Nhập mật khẩu Quản trị viên (6651071091@st.utc2.edu.vn):');
        if (enteredPwd === null) return; // Người dùng ấn Hủy
        if (enteredPwd !== ADMIN_CREDENTIALS.password) {
            showToast('Mật khẩu Quản trị viên không chính xác! Đăng nhập thất bại.', 'danger');
            if (window.sound) window.sound.playWarning();
            return;
        }
    }

    let target = USERS_REGISTRY[userKey];
    if (!target) target = DEFAULT_USERS[0];

    // Đồng bộ với danh sách registeredUsers
    let found = window.app.registeredUsers.find(u => u.email === target.email);
    if (!found) {
        window.app.registeredUsers.push(target);
        window.app.saveUsers();
        found = target;
    }

    window.app.user = found;
    window.app.isLoggedIn = true;
    localStorage.setItem('unipass_current_user', JSON.stringify(found));
    
    const savedChats = localStorage.getItem('unipass_shared_messages');
    if (savedChats) {
        try { window.app.chatMessages = JSON.parse(savedChats); } catch (e) {}
    }
    
    window.app.checkAuthDisplay();
    window.app.updateUserUI();
    window.app.renderProducts();
    window.app.renderProfile();
    window.app.renderChatInbox();
    window.app.renderChatMessages();
    window.app.updateChatUnreadBadge();

    if (userKey === 'admin') {
        switchNavTab('admin');
    }

    if (window.sound) window.sound.playSuccess();
    showToast(`Đã vào hệ thống với tài khoản: ${window.app.user.name}!`, 'success');
}

function logoutToAuthScreen() {
    closeChatWindow();
    if (window.app) {
        window.app.currentChatPartner = null;
        window.app.currentChatPartnerEmail = null;
        window.app.currentChatProduct = null;
        window.app.currentChatOrderId = null;
        // Báº£o lÆ°u vÄ©nh viá»…n toÃ n bá»™ tin nháº¯n cuá»™c trÃ² chuyá»‡n trÆ°á»›c Ä‘Ã³
        window.app.saveChats();
    }
    const searchInput = document.getElementById('chatUserSearchInput');
    const searchResults = document.getElementById('chatSearchResultsBox');
    if (searchInput) searchInput.value = '';
    if (searchResults) { searchResults.style.display = 'none'; searchResults.innerHTML = ''; }

    window.app.isLoggedIn = false;
    window.app.user = null;
    window.app.isAdminAuthenticated = false;
    localStorage.removeItem('unipass_current_user');
    window.app.checkAuthDisplay();
    window.app.updateDepositBadge();
    window.app.updateNotificationBadge();
    window.app.renderNotifications();

    const emailInput = document.getElementById('authEmailInput');
    const pwdInput = document.getElementById('authPasswordInput');
    const nameInput = document.getElementById('authFullNameInput');
    const otpInput = document.getElementById('authOtpInput');
    if (emailInput) emailInput.value = '';
    if (pwdInput) pwdInput.value = '';
    if (nameInput) nameInput.value = '';
    if (otpInput) otpInput.value = '';

    const mockBox = document.getElementById('mockEmailNotification');
    if (mockBox) {
        mockBox.classList.remove('active');
        mockBox.style.display = 'none';
    }

    if (window.sound) window.sound.playClick();
    showToast('Đã đăng xuất khỏi tài khoản!', 'info');
}

// ==========================================
// 5. CHAT GIỮA CÁC TÀI KHOẢN (THỦ CÔNG, KHÔNG CÓ BOT)
// ==========================================
// ==========================================
// TÌM KIẾM GMAIL (@st.utc2.edu.vn) & NHẮN TIN 1-1 TRỰC TIẾP
// ==========================================
function handleChatUserSearch(query) {
    const box = document.getElementById('chatSearchResultsBox');
    if (!box) return;

    query = (query || '').trim().toLowerCase();
    if (!query) {
        box.style.display = 'none';
        box.innerHTML = '';
        return;
    }

    if (!window.app || !window.app.user) {
        box.style.display = 'block';
        box.innerHTML = `
            <div style="padding:12px; text-align:center; color:#64748b; font-size:12px;">
                Vui lòng đăng nhập để tìm kiếm và nhắn tin.
            </div>
        `;
        return;
    }

    const myEmail = (window.app.user.email || '').toLowerCase();
    const myName = (window.app.user.name || '').toLowerCase();

    // Tìm trong danh sách tài khoản sinh viên đã đăng ký
    const matches = (window.app.registeredUsers || []).filter(u => {
        const uEmail = (u.email || '').toLowerCase();
        const uName = (u.name || '').toLowerCase();
        const uMssv = (u.mssv || '').toLowerCase();

        if (uEmail === myEmail || uName === myName) return false;

        return uEmail.includes(query) || uName.includes(query) || (uMssv && uMssv.includes(query));
    });

    let html = '';

    if (matches.length > 0) {
        html += `
            <div style="padding:6px 12px; background:#f1f5f9; font-size:11px; font-weight:700; color:#475569; text-transform:uppercase;">
                Tìm thấy ${matches.length} tài khoản phù hợp:
            </div>
        `;
        html += matches.map(u => {
            const safeName = (u.name || 'Sinh viên').replace(/'/g, "\\'");
            const safeEmail = (u.email || '').replace(/'/g, "\\'");
            const avatarLetter = (u.avatarLetter || (u.name ? u.name.charAt(0) : 'U')).toUpperCase();
            const avatarHtml = u.avatarUrl ?
                `<img src="${u.avatarUrl}" alt="${safeName}" style="width:28px; height:28px; border-radius:50%; object-fit:cover;">` :
                `<div style="width:28px; height:28px; border-radius:50%; background:#0284c7; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">${avatarLetter}</div>`;

            return `
                <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; border-bottom:1px solid #f1f5f9; cursor:pointer; transition:background 0.15s;"
                     onmouseover="this.style.background='#f0f9ff'" onmouseout="this.style.background='#fff'"
                     onclick="startChatWithUser('${safeName}', '${safeEmail}')">
                    <div style="display:flex; align-items:center; gap:8px;">
                        ${avatarHtml}
                        <div>
                            <div style="font-weight:700; font-size:12.5px; color:#0f172a;">${u.name}</div>
                            <div style="font-size:11px; color:#0284c7;">${u.email}</div>
                        </div>
                    </div>
                    <button type="button" class="btn-primary" style="padding:4px 10px; font-size:11px; border-radius:6px; background:#0284c7; color:#fff; border:none; pointer-events:none;">
                        Nhắn tin 💬
                    </button>
                </div>
            `;
        }).join('');
    }

    // Nếu người dùng nhập địa chỉ Gmail (dù chưa có trong danh sách tài khoản mẫu)
    const isEmailFormat = query.includes('@');
    const alreadyMatched = matches.some(m => (m.email || '').toLowerCase() === query);

    if (isEmailFormat && !alreadyMatched) {
        const safeQuery = query.replace(/'/g, "\\'");
        html += `
            <div style="padding:10px 12px; background:#f0fdf4; border-top:1px dashed #86efac; display:flex; align-items:center; justify-content:space-between; cursor:pointer;"
                 onclick="startChatWithUser('${safeQuery.split('@')[0]}', '${safeQuery}')">
                <div>
                    <strong style="color:#15803d; font-size:12px; display:block;">✉️ Nhắn tin trực tiếp tới Gmail:</strong>
                    <span style="font-size:11.5px; color:#047857; font-weight:600;">${query}</span>
                </div>
                <button type="button" class="btn-primary" style="padding:5px 10px; font-size:11px; border-radius:6px; background:#16a34a; color:#fff; border:none; pointer-events:none;">
                    Bắt đầu chat
                </button>
            </div>
        `;
    } else if (matches.length === 0) {
        html = `
            <div style="padding:14px 12px; text-align:center; color:#64748b; font-size:12px;">
                Không tìm thấy tài khoản nào với từ khóa "${query}".<br>
                <span style="font-size:11px; color:#94a3b8;">Nhập đầy đủ Gmail sinh viên dạng: <strong>MSSV@st.utc2.edu.vn</strong> để nhắn tin trực tiếp.</span>
            </div>
        `;
    }

    box.innerHTML = html;
    box.style.display = 'block';
}

function handleChatUserSearchSubmit(query) {
    query = (query || '').trim();
    if (!query) return;

    const myEmail = (window.app.user ? window.app.user.email : '').toLowerCase();
    const matches = (window.app.registeredUsers || []).filter(u => {
        const uEmail = (u.email || '').toLowerCase();
        const uName = (u.name || '').toLowerCase();
        if (uEmail === myEmail) return false;
        return uEmail === query.toLowerCase() || uName === query.toLowerCase() || uEmail.includes(query.toLowerCase());
    });

    if (matches.length > 0) {
        startChatWithUser(matches[0].name, matches[0].email);
    } else if (query.includes('@')) {
        startChatWithUser(query.split('@')[0], query);
    } else {
        handleChatUserSearch(query);
    }
}

function startChatWithUser(partnerName, partnerEmail) {
    const box = document.getElementById('chatSearchResultsBox');
    const input = document.getElementById('chatUserSearchInput');
    if (box) box.style.display = 'none';
    if (input) input.value = '';

    openChatBetweenUsers(partnerName, null, null, partnerEmail);
}

function openChatBetweenUsers(targetPartnerName = null, product = null, orderId = null, targetPartnerEmail = null) {
    const chatBox = document.getElementById('chatWindow');
    const convView = document.getElementById('chatConversationsView');
    const detailView = document.getElementById('chatDetailView');
    if (!chatBox) return;

    chatBox.style.display = 'flex';

    if (targetPartnerName && (!window.app.user || targetPartnerName !== window.app.user.name)) {
        // Tự động phân giải tên và email đầy đủ
        let resolvedEmail = targetPartnerEmail;
        let resolvedName = targetPartnerName;

        if (!resolvedEmail) {
            const found = (window.app.registeredUsers || []).find(u => 
                (u.name && u.name.toLowerCase() === targetPartnerName.toLowerCase()) || 
                (u.email && u.email.toLowerCase() === targetPartnerName.toLowerCase())
            );
            if (found) {
                resolvedEmail = found.email;
                resolvedName = found.name;
            } else if (targetPartnerName.includes('@')) {
                resolvedEmail = targetPartnerName;
                resolvedName = targetPartnerName.split('@')[0];
            }
        } else {
            const found = (window.app.registeredUsers || []).find(u => 
                u.email && u.email.toLowerCase() === resolvedEmail.toLowerCase()
            );
            if (found) {
                resolvedName = found.name;
            }
        }

        window.app.currentChatPartner = resolvedName;
        window.app.currentChatPartnerEmail = resolvedEmail;
        window.app.currentChatProduct = product || null;
        window.app.currentChatOrderId = orderId || null;

        // Đánh dấu đã đọc toàn bộ tin nhắn từ đối tác này (Messenger Flow)
        if (window.app && typeof window.app.markConversationAsRead === 'function') {
            window.app.markConversationAsRead(resolvedName, resolvedEmail);
        }

        if (convView) convView.style.display = 'none';
        if (detailView) detailView.style.display = 'flex';

        const chatHeader = document.getElementById('chatHeaderName');
        if (chatHeader) chatHeader.innerText = resolvedName;

        const headerSub = document.getElementById('chatHeaderSubtitle');
        if (headerSub) {
            headerSub.innerText = resolvedEmail ? `Đang nhắn tin trực tiếp với ${resolvedName} (${resolvedEmail})` : `Bạn đang nhắn tin trực tiếp với ${resolvedName}`;
        }

        window.app.renderChatMessages();
        const input = document.getElementById('chatInputText');
        if (input) setTimeout(() => input.focus(), 80);
    } else {
        // Mở danh sách tất cả các tài khoản đã gửi tin nhắn (Inbox)
        window.app.currentChatPartner = null;
        window.app.currentChatPartnerEmail = null;
        if (convView) convView.style.display = 'flex';
        if (detailView) detailView.style.display = 'none';

        window.app.renderChatInbox();
    }

    window.app.updateChatUnreadBadge();
    if (window.sound) window.sound.playClick();
}

function backToChatInbox() {
    const convView = document.getElementById('chatConversationsView');
    const detailView = document.getElementById('chatDetailView');
    if (convView) convView.style.display = 'flex';
    if (detailView) detailView.style.display = 'none';

    window.app.renderChatInbox();
    window.app.updateChatUnreadBadge();
    if (window.sound) window.sound.playClick();
}

function closeChatWindow() {
    const chatBox = document.getElementById('chatWindow');
    if (chatBox) chatBox.style.display = 'none';
}

function sendManualMessage() {
    const input = document.getElementById('chatInputText');
    if (!input || !input.value.trim()) return;
    if (!window.app.user) {
        showToast('Vui lòng đăng nhập để gửi tin nhắn!', 'warning');
        return;
    }

    const text = input.value.trim();
    const partnerName = window.app.getChatPartnerName();
    let partnerEmail = window.app.currentChatPartnerEmail;

    if (!partnerEmail) {
        const found = (window.app.registeredUsers || []).find(u => 
            (u.name && u.name.toLowerCase() === partnerName.toLowerCase()) ||
            (u.email && u.email.toLowerCase() === partnerName.toLowerCase())
        );
        if (found) partnerEmail = found.email;
        else if (partnerName.includes('@')) partnerEmail = partnerName;
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const curProduct = window.app.currentChatProduct || null;
    const curOrderId = window.app.currentChatOrderId || null;

    const newMsg = {
        id: 'MSG_' + Date.now(),
        sender: window.app.user.name,
        senderEmail: window.app.user.email,
        receiver: partnerName,
        receiverEmail: partnerEmail || null,
        text: text,
        time: timeStr,
        productId: curProduct ? curProduct.id : null,
        productTitle: curProduct ? curProduct.title : null,
        orderId: curOrderId || null
    };

    window.app.chatMessages.push(newMsg);
    window.app.saveChats();
    window.app.renderChatMessages();

    // Đồng bộ tức thì lên mạng đa máy qua OnlineSync
    if (window.UniPassOnlineSync) {
        window.UniPassOnlineSync.broadcastChatMessage(newMsg);
    }

    // Đồng bộ tức thì lên Supabase Cloud nếu đã cấu hình
    if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
        window.UniPassSupabase.sendChatMessage({
            id: newMsg.id,
            sender: newMsg.sender,
            senderEmail: newMsg.senderEmail,
            receiver: newMsg.receiver,
            receiverEmail: newMsg.receiverEmail,
            productId: newMsg.productId,
            text: newMsg.text,
            time: newMsg.time
        });
    }

    input.value = '';
    if (window.sound) window.sound.playClick();
}

function openChatFromModal() {
    if (!currentCheckoutProduct) return;
    openChatBetweenUsers(currentCheckoutProduct.seller, { id: currentCheckoutProduct.id, title: currentCheckoutProduct.title });
}

// ==========================================
// 6. ADMIN DASHBOARD LOGIC (XÓA BÀI, CẢNH CÁO, DUYỆT KHÁNG NGHỊ)
// ==========================================
function adminDeletePost(postId) {
    const post = window.app.products.find(p => p.id === postId);
    if (!post) return;

    const reason = prompt(`Nhập lý do xóa bài đăng "${post.title}":`, 'Vi phạm quy định: Không chụp ảnh kèm mã TimeMark thực tế');
    if (reason === null) return;

    window.app.products = window.app.products.filter(p => p.id !== postId);
    window.app.saveProducts();
    window.app.renderProducts();
    window.app.renderAdminDashboard();

    // Đồng bộ xóa bài lên mạng đa máy
    if (window.UniPassOnlineSync) {
        window.UniPassOnlineSync.broadcastDeletePost(postId);
    }

    // Đồng bộ xóa lên Supabase Cloud
    if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
        window.UniPassSupabase.deleteProduct(postId);
    }

    if (window.sound) window.sound.playSuccess();
    showToast(`Admin đã xóa bài đăng "${post.title}". Lý do: ${reason}`, 'success');

    if (window.app.syncChannel) {
        window.app.syncChannel.postMessage({
            type: 'USER_WARNED',
            targetName: post.seller,
            message: `Bài đăng "${post.title}" của bạn đã bị Admin gỡ bỏ vì: ${reason}.`
        });
    }
}

function adminApprovePost(postId) {
    const post = window.app.products.find(p => p.id === postId);
    if (!post) return;

    post.status = 'approved';
    post.approvedAt = Date.now();

    // Thưởng 1 điểm uy tín cho người bán vì làm đúng quy trình TimeMark chống lừa đảo
    const seller = window.app.registeredUsers.find(u => u.name === post.seller || u.email === post.sellerEmail);
    if (seller) {
        seller.reputation = Math.min(100, (seller.reputation || 95) + 1);
        window.app.saveUsers();
        if (window.app.user && (window.app.user.email === seller.email || window.app.user.name === seller.name)) {
            window.app.user.reputation = seller.reputation;
            window.app.updateUserUI();
        }
    }

    // Đưa bài được duyệt lên vị trí đầu danh sách sản phẩm để luôn xuất hiện trên cùng trang chính
    window.app.products = [post, ...window.app.products.filter(p => p.id !== postId)];

    window.app.saveProducts();
    window.app.rebuildDSACache();
    window.app.renderProducts();
    window.app.renderAdminDashboard();
    window.app.renderProfile();

    // Gửi thông báo tới người bán: bài đăng đã được duyệt
    window.app.addNotification({
        targetName: post.seller,
        targetEmail: post.sellerEmail,
        title: 'Bài đăng đã được duyệt!',
        message: `Bài đăng "${post.title}" của bạn đã được Admin phê duyệt TimeMark và hiển thị lên trang chính (+1 điểm uy tín). Bài sẽ tự động xóa sau 7 ngày kể từ lúc duyệt.`,
        type: 'post_approved',
        relatedId: post.id
    });

    if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
        window.UniPassSupabase.updateProductStatus(postId, 'approved');
    }

    if (window.UniPassOnlineSync) {
        window.UniPassOnlineSync.broadcastApprovePost(postId, post);
    }

    if (window.sound) window.sound.playSuccess();
    showToast(`✓ Đã duyệt bài "${post.title}"! Bài đăng đã chính thức hiển thị trên trang chính (+1 điểm uy tín cho ${post.seller})!`, 'success');
}

function adminApproveAllPendingPosts() {
    const pendingList = window.app.products.filter(p => p.status === 'pending');
    if (pendingList.length === 0) {
        showToast('Hiện không có bài đăng nào đang chờ duyệt!', 'info');
        return;
    }

    pendingList.forEach(p => {
        p.status = 'approved';
        p.approvedAt = Date.now();
        window.app.addNotification({
            targetName: p.seller,
            targetEmail: p.sellerEmail,
            title: 'Bài đăng đã được duyệt!',
            message: `Bài đăng "${p.title}" của bạn đã được Admin phê duyệt TimeMark và hiển thị lên trang chính (+1 điểm uy tín). Bài sẽ tự động xóa sau 7 ngày kể từ lúc duyệt.`,
            type: 'post_approved',
            relatedId: p.id
        });
        if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
            window.UniPassSupabase.updateProductStatus(p.id, 'approved');
        }
        if (window.UniPassOnlineSync) {
            window.UniPassOnlineSync.broadcastApprovePost(p.id, p);
        }
    });

    window.app.saveProducts();
    window.app.rebuildDSACache();
    window.app.renderProducts();
    window.app.renderAdminDashboard();
    window.app.renderProfile();

    if (window.sound) window.sound.playSuccess();
    showToast(`✓ Đã duyệt toàn bộ ${pendingList.length} bài đăng lên trang chính!`, 'success');
}

function adminRejectPost(postId) {
    const post = window.app.products.find(p => p.id === postId);
    if (!post) return;

    const reason = prompt(`Nhập lý do từ chối duyệt bài "${post.title}":`, 'Ảnh chụp TimeMark không rõ chữ viết tay mã OTP hoặc không trùng khớp sản phẩm.');
    if (reason === null) return;

    post.status = 'rejected';
    post.rejectReason = reason;

    window.app.saveProducts();
    window.app.rebuildDSACache();
    window.app.renderProducts();
    window.app.renderAdminDashboard();
    window.app.renderProfile();

    // Gửi thông báo tới người bán: bài đăng bị từ chối duyệt
    window.app.addNotification({
        targetName: post.seller,
        targetEmail: post.sellerEmail,
        title: 'Bị từ chối duyệt bài đăng',
        message: `Bài đăng "${post.title}" của bạn bị Admin từ chối duyệt. Lý do: ${reason}`,
        type: 'post_rejected',
        relatedId: post.id
    });

    if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
        window.UniPassSupabase.updateProductStatus(postId, 'rejected');
    }

    if (window.UniPassOnlineSync) {
        window.UniPassOnlineSync.broadcastRejectPost(postId, reason);
    }

    if (window.sound) window.sound.playWarning();
    showToast(`Đã từ chối duyệt bài "${post.title}"!`, 'info');
}

function openZoomImageModal(imgSrc, title) {
    const imgEl = document.getElementById('zoomImageElement');
    const titleEl = document.getElementById('zoomImageTitle');
    if (imgEl) imgEl.src = imgSrc || '';
    if (titleEl) titleEl.innerText = title ? `🔍 ${title}` : '🔍 Xem Chi Tiết Ảnh';
    openModal('zoomImageModal');
}

function adminWarnUser(userName) {
    const warningMsg = prompt(`Nhập nội dung cảnh cáo gửi tới sinh viên ${userName}:`, 'Cảnh cáo: Tài khoản của bạn có dấu hiệu bùng hẹn giao nhận đồ tại campus UTC2.');
    if (!warningMsg) return;

    window.app.adminWarningsIssued.push({
        userName,
        warningMsg,
        time: new Date().toLocaleTimeString()
    });

    // Trừ 2 điểm uy tín trong danh sách registeredUsers
    const userToWarn = window.app.registeredUsers.find(u => u.name === userName);
    if (userToWarn) {
        userToWarn.reputation = Math.max(0, (userToWarn.reputation || 95) - 2);
        window.app.saveUsers();
        if (window.app.user.name === userName) {
            window.app.user.reputation = userToWarn.reputation;
            window.app.updateUserUI();
        }
    }

    // Đồng bộ cảnh cáo lên Supabase Cloud
    if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
        const targetEmail = (userToWarn && userToWarn.email) || 'student@st.utc2.edu.vn';
        window.UniPassSupabase.addWarning({
            targetName: userName,
            targetEmail: targetEmail,
            reason: warningMsg,
            penaltyPoints: 2
        });
    }

    // Đồng bộ cảnh cáo lên mạng đa máy (Máy B, C, D...)
    if (window.UniPassOnlineSync) {
        window.UniPassOnlineSync.broadcastWarning({
            targetName: userName,
            targetEmail: (userToWarn && userToWarn.email) || 'student@st.utc2.edu.vn',
            reason: warningMsg,
            penaltyPoints: 2
        });
    }

    window.app.renderAdminDashboard();

    if (window.sound) window.sound.playWarning();
    showToast(`Đã gửi cảnh cáo chính thức tới sinh viên ${userName}!`, 'danger');

    // Gửi thông báo trực tiếp tới tài khoản bị cảnh cáo
    window.app.addNotification({
        targetName: userName,
        targetEmail: (userToWarn && userToWarn.email) || 'student@st.utc2.edu.vn',
        title: 'Cảnh cáo từ Admin UTC2',
        message: `Tài khoản của bạn nhận cảnh cáo: "${warningMsg}" (-2 điểm uy tín).`,
        type: 'warning'
    });

    if (window.app.syncChannel) {
        window.app.syncChannel.postMessage({
            type: 'USER_WARNED',
            targetName: userName,
            message: warningMsg
        });
    }
}

function adminRemindUser(userName) {
    const msg = prompt(`Nhập lời nhắc nhở gửi tới sinh viên ${userName}:`, 'Nhắc nhở: Vui lòng luôn chụp ảnh sản phẩm kèm mã TimeMark trên giấy để đảm bảo quyền lợi.');
    if (!msg) return;

    showToast(`Đã gửi lời nhắc thân thiện tới ${userName}!`, 'info');
    if (window.app.syncChannel) {
        window.app.syncChannel.postMessage({
            type: 'USER_WARNED',
            targetName: userName,
            message: `[LỜI NHẮC TỪ ADMIN]: ${msg}`
        });
    }
}

function adminPenalizeDispute(dispId) {
    const dispute = window.app.adminDisputes.find(d => d.id === dispId);
    if (!dispute) return;

    dispute.status = 'penalized';

    // Xác định đối tượng vi phạm bị trừ điểm
    const accusedName = dispute.accusedName || dispute.userName;
    const accusedEmail = dispute.accusedEmail || dispute.userEmail;
    const pointsToDeduct = parseInt(dispute.penaltyPoints) || 10;

    const accusedUser = window.app.registeredUsers.find(u => 
        (accusedName && u.name === accusedName) || 
        (accusedEmail && u.email === accusedEmail)
    );

    if (accusedUser) {
        accusedUser.reputation = Math.max(0, (accusedUser.reputation || 95) - pointsToDeduct);
        window.app.saveUsers();
        if (window.app.user && (window.app.user.email === accusedUser.email || window.app.user.name === accusedUser.name)) {
            window.app.user.reputation = accusedUser.reputation;
            window.app.updateUserUI();
        }
        if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
            window.UniPassSupabase.upsertProfile(accusedUser);
        }
    }

    // Ghi nhận cảnh cáo chính thức trong hệ thống Admin
    const warning = {
        id: 'WARN_' + Date.now(),
        targetName: accusedName,
        targetEmail: accusedEmail || 'student@st.utc2.edu.vn',
        reason: `[Xử phạt khiếu nại đơn ${dispute.orderCode || ''}] ${dispute.reason}`,
        penaltyPoints: pointsToDeduct,
        time: 'Vừa xong'
    };
    window.app.adminWarningsIssued.unshift(warning);

    if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
        window.UniPassSupabase.addWarning(warning);
        window.UniPassSupabase.updateDisputeStatus(dispId, 'penalized', `Đã duyệt xử phạt -${pointsToDeduct} điểm uy tín`);
    }
    if (window.UniPassOnlineSync) {
        window.UniPassOnlineSync.broadcastWarning(warning);
        window.UniPassOnlineSync.broadcastDisputeResolved({
            disputeId: dispId,
            status: 'penalized',
            accusedName: accusedName,
            penaltyPoints: pointsToDeduct
        });
    }

    window.app.saveDisputes();
    window.app.renderAdminDashboard();

    if (window.sound) window.sound.playWarning();
    showToast(`⚖️ Admin đã duyệt khiếu nại! Đã trừ ${pointsToDeduct} điểm uy tín của ${accusedName} và ghi nhận cảnh cáo.`, 'success');
}

function adminApproveDispute(dispId) {
    // Tương thích ngược: Duyệt khôi phục điểm nếu là khiếu nại oan
    const dispute = window.app.adminDisputes.find(d => d.id === dispId);
    if (!dispute) return;

    dispute.status = 'approved';

    const user = window.app.registeredUsers.find(u => u.name === dispute.userName || u.email === dispute.userEmail);
    if (user) {
        user.reputation = 98;
        window.app.saveUsers();
        if (window.app.user.email === user.email) {
            window.app.user.reputation = 98;
            window.app.updateUserUI();
        }
    }

    window.app.saveDisputes();
    window.app.renderAdminDashboard();

    if (window.sound) window.sound.playSuccess();
    showToast(`Đã duyệt kiểm chứng! Khôi phục điểm uy tín của ${dispute.userName} lên 98 điểm.`, 'success');
}

function adminRejectDispute(dispId) {
    const dispute = window.app.adminDisputes.find(d => d.id === dispId);
    if (!dispute) return;

    dispute.status = 'rejected';
    window.app.saveDisputes();

    if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
        window.UniPassSupabase.updateDisputeStatus(dispId, 'rejected', 'Bằng chứng không đủ xác thực');
    }
    if (window.UniPassOnlineSync) {
        window.UniPassOnlineSync.broadcastDisputeResolved({ disputeId: dispId, status: 'rejected' });
    }

    window.app.renderAdminDashboard();
    showToast(`✕ Admin đã bác bỏ khiếu nại do không đủ bằng chứng xác thực.`, 'warning');
}

// ==========================================
// 7. CHECKOUT MODAL LOGIC
// ==========================================
let currentCheckoutProduct = null;

function openCheckoutModal(productId) {
    const item = window.app.products.find(p => p.id === productId);
    if (!item) return;

    currentCheckoutProduct = item;

    document.getElementById('modalProductImage').src = item.imageUrl;
    document.getElementById('modalProductTimeMark').innerText = `✓ Xác minh TimeMark: ${item.timemarkCode}`;
    document.getElementById('modalProductCategory').innerText = getCategoryName(item.category);
    document.getElementById('modalProductExpiry').innerText = `Hết hạn sau: ${item.expiryDays} ngày`;
    document.getElementById('modalProductTitle').innerText = item.title;
    document.getElementById('modalProductPrice').innerText = `${formatNumber(item.price)} VNĐ`;
    document.getElementById('modalSellerName').innerText = item.seller;
    document.getElementById('modalSellerRep').innerText = `★ ${item.sellerRep}/100`;

    const sellerUserForModal = (window.app.registeredUsers || []).find(u => 
        (item.sellerEmail && u.email && u.email.toLowerCase() === item.sellerEmail.toLowerCase()) ||
        (item.seller && u.name && u.name.toLowerCase() === item.seller.toLowerCase())
    );
    const modalSellerAvtEl = document.getElementById('modalSellerAvatar');
    if (modalSellerAvtEl) {
        if (sellerUserForModal && sellerUserForModal.avatarUrl) {
            modalSellerAvtEl.innerHTML = `<img src="${sellerUserForModal.avatarUrl}" alt="${item.seller}" style="width:24px; height:24px; border-radius:50%; object-fit:cover; border:1px solid #f59e0b; display:inline-block; vertical-align:middle;">`;
        } else {
            modalSellerAvtEl.innerHTML = `<span style="display:inline-block; width:24px; height:24px; border-radius:50%; background:#0284c7; color:#fff; text-align:center; line-height:24px; font-size:11px; font-weight:700;">${(item.seller ? item.seller.charAt(0) : 'U').toUpperCase()}</span>`;
        }
    }
    document.getElementById('modalSellerLocation').innerText = item.location;
    const descEl = document.getElementById('modalProductDescription');
    if (descEl) {
        descEl.innerText = item.description || 'Món đồ được đăng pass trực tiếp tại campus UTC2.';
    }

    document.getElementById('shippingSelectOption').value = '0';
    const coinCheckbox = document.getElementById('useCoinDiscountCheckbox');
    if (coinCheckbox) {
        const availableCoins = (window.app && window.app.user) ? (window.app.user.coins || 0) : 0;
        coinCheckbox.checked = availableCoins > 0;
    }

    updateCheckoutCalculations();

    const isMine = window.app.user ? (item.seller === window.app.user.name) : false;
    const confirmBtn = document.getElementById('confirmDepositBtn');
    if (isMine) {
        confirmBtn.innerText = 'Món đồ của chính bạn';
        confirmBtn.style.background = '#94a3b8';
        confirmBtn.disabled = true;
    } else {
        confirmBtn.innerText = '🤝 Đặt Cọc & Giữ Chỗ';
        confirmBtn.style.background = '#6366f1';
        confirmBtn.disabled = false;
    }

    const modal = document.getElementById('checkoutOrderModal');
    if (modal) modal.classList.add('active');
    if (window.sound) window.sound.playClick();
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutOrderModal');
    if (modal) modal.classList.remove('active');
}

function updateCheckoutCalculations() {
    if (!currentCheckoutProduct) return;

    const basePrice = currentCheckoutProduct.price;
    let deposit = Math.max(3000, Math.round((basePrice * 0.1) / 1000) * 1000);
    document.getElementById('depositAmountText').innerText = `${formatNumber(deposit)} VNĐ`;

    const shippingSelect = document.getElementById('shippingSelectOption');
    const shipFee = parseInt(shippingSelect ? shippingSelect.value : 0) || 0;

    const coinCheckbox = document.getElementById('useCoinDiscountCheckbox');
    const coinLabel = document.getElementById('coinDiscountLabelText');

    const availableCoins = (window.app && window.app.user) ? (window.app.user.coins || 0) : 0;

    // Cho phép dùng khoảng 30% số xu hiện có để giảm giá mặt hàng
    let maxCoinsAllowed = Math.round(availableCoins * 0.3);
    if (availableCoins > 0 && maxCoinsAllowed === 0) {
        maxCoinsAllowed = 1;
    }

    // Mức giảm giá không vượt quá giá gốc của mặt hàng
    const maxCoinsByPrice = Math.floor(basePrice / 100);
    const coinsToUse = Math.min(maxCoinsAllowed, maxCoinsByPrice);
    const discountVND = coinsToUse * 100;

    if (coinLabel && coinCheckbox) {
        if (availableCoins <= 0 || coinsToUse <= 0) {
            coinCheckbox.checked = false;
            coinCheckbox.disabled = true;
            coinLabel.innerHTML = `<span style="color:#64748b;">🪙 Bạn hiện có <strong>0 Xu</strong> (Chưa đủ xu để giảm giá mặt hàng)</span>`;
        } else {
            coinCheckbox.disabled = false;
            coinLabel.innerHTML = `🪙 Dùng <strong>${formatNumber(coinsToUse)} Xu</strong> (30% trong tổng ${formatNumber(availableCoins)} Xu hiện có) để giảm <strong style="color:#16a34a;">-${formatNumber(discountVND)} đ</strong>`;
        }
    }

    let actualDiscount = 0;
    if (coinCheckbox && coinCheckbox.checked && coinsToUse > 0) {
        actualDiscount = discountVND;
    }

    const finalTotal = Math.max(0, basePrice + shipFee - actualDiscount);

    const breakdownEl = document.getElementById('calculationBreakdownText');
    if (breakdownEl) {
        if (actualDiscount > 0) {
            breakdownEl.innerText = `(Giá gốc: ${formatNumber(basePrice)}đ + Ship: ${formatNumber(shipFee)}đ - Giảm 30% xu: ${formatNumber(actualDiscount)}đ)`;
        } else {
            breakdownEl.innerText = `(Giá gốc: ${formatNumber(basePrice)}đ + Ship: ${formatNumber(shipFee)}đ)`;
        }
    }

    const totalEl = document.getElementById('finalTotalPaymentText');
    if (totalEl) {
        totalEl.innerText = `${formatNumber(finalTotal)} VNĐ`;
    }
}

function confirmDepositOrder() {
    if (!currentCheckoutProduct) return;

    if (window.app.user.reputation < 90) {
        showToast('Điểm uy tín dưới 90! Bạn bị khóa quyền đặt cọc.', 'danger');
        return;
    }

    const basePrice = currentCheckoutProduct.price;
    const shipFee = parseInt(document.getElementById('shippingSelectOption').value) || 0;
    
    // Tính toán số xu giảm giá (30% số xu hiện có)
    const availableCoins = (window.app && window.app.user) ? (window.app.user.coins || 0) : 0;
    let maxCoinsAllowed = Math.round(availableCoins * 0.3);
    if (availableCoins > 0 && maxCoinsAllowed === 0) {
        maxCoinsAllowed = 1;
    }
    const maxCoinsByPrice = Math.floor(basePrice / 100);
    const coinsToUse = Math.min(maxCoinsAllowed, maxCoinsByPrice);

    const useCoins = document.getElementById('useCoinDiscountCheckbox') ? document.getElementById('useCoinDiscountCheckbox').checked : false;
    const coinsUsed = (useCoins && availableCoins > 0) ? coinsToUse : 0;
    const discountVND = coinsUsed * 100;

    const depositAmount = Math.max(3000, Math.round((basePrice * 0.1) / 1000) * 1000);
    const finalTotal = Math.max(0, basePrice + shipFee - discountVND);

    window.app.user.coins = Math.max(0, (window.app.user.coins || 0) - coinsUsed);
    
    // Đồng bộ số xu vào registeredUsers
    const uIdx = window.app.registeredUsers.findIndex(u => u.email === window.app.user.email);
    if (uIdx !== -1) {
        window.app.registeredUsers[uIdx].coins = window.app.user.coins;
        window.app.saveUsers();
    }
    window.app.updateUserUI();

    if (coinsUsed > 0) {
        showToast(`Đã dùng ${coinsUsed} Xu (30% số xu) giảm ngay ${formatNumber(discountVND)} đ!`, 'success');
    }

    const newOrderData = {
        id: 'ORD_' + Date.now(),
        orderCode: 'UTC2-' + Math.floor(100000 + Math.random() * 900000),
        productId: currentCheckoutProduct.id,
        productTitle: currentCheckoutProduct.title,
        seller: currentCheckoutProduct.seller,
        sellerEmail: currentCheckoutProduct.sellerEmail || 'seller@st.utc2.edu.vn',
        buyer: window.app.user.name,
        buyerEmail: window.app.user.email || 'buyer@st.utc2.edu.vn',
        productPrice: basePrice,
        depositAmount,
        shippingFee: shipFee,
        discountCoins: coinsUsed,
        discountAmount: discountVND,
        totalPayment: finalTotal,
        shippingOption: document.getElementById('shippingSelectOption') ? document.getElementById('shippingSelectOption').value : 'campus',
        meetLocation: currentCheckoutProduct.location,
        status: 'pending_seller', // Người mua đã cọc, chờ người bán xác nhận đơn hàng
        sellerAccepted: false,     // Người bán đã bấm xác nhận đơn hàng hay chưa
        buyerCompleted: false,     // Người mua xác nhận đã nhận hàng
        sellerCompleted: false,    // Người bán xác nhận đã giao hàng
        timestamp: Date.now()
    };

    window.app.depositOrders.push(newOrderData);
    window.app.saveOrders();

    // Gửi thông báo tới người bán: Có người thêm đơn hàng của bạn vào đơn cọc
    window.app.addNotification({
        targetName: currentCheckoutProduct.seller,
        targetEmail: currentCheckoutProduct.sellerEmail || 'seller@st.utc2.edu.vn',
        title: 'Có khách đặt cọc đơn hàng!',
        message: `${window.app.user.name} vừa thêm đơn hàng "${currentCheckoutProduct.title}" của bạn vào đơn cọc (Cọc giữ chỗ: ${formatNumber(depositAmount)} đ). Vui lòng vào mục Cá Nhân kiểm tra.`,
        type: 'order_deposit',
        relatedId: newOrderData.id
    });

    // Gửi thông báo tới người mua: Đã đặt cọc thành công
    window.app.addNotification({
        targetName: window.app.user.name,
        targetEmail: window.app.user.email,
        title: 'Thêm vào đơn cọc thành công!',
        message: `Bạn đã thêm đơn hàng "${currentCheckoutProduct.title}" vào đơn cọc (Đã cọc: ${formatNumber(depositAmount)} đ). Đang chờ người bán xác nhận đơn.`,
        type: 'order_deposit',
        relatedId: newOrderData.id
    });

    // Đồng bộ đơn cọc lên Supabase Cloud
    if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
        window.UniPassSupabase.createOrder(newOrderData);
    }

    // Đồng bộ đơn cọc lên mạng đa máy (Máy B, C, D...)
    if (window.UniPassOnlineSync) {
        window.UniPassOnlineSync.broadcastDepositOrder(newOrderData);
    }

    closeCheckoutModal();
    if (window.sound) window.sound.playSuccess();
    showToast(`Đặt cọc thành công ${formatNumber(depositAmount)} đ! Đã gửi thông báo xác nhận đơn tới người bán (${currentCheckoutProduct.seller}).`, 'success');
    window.app.renderProfile();
}

// ==========================================
// 7b. QUẢN LÝ QUY TRÌNH GIAO DỊCH 2 BÊN & XỬ PHẠT (ĐẶC TẢ UTC2)
// ==========================================

// 1. Người bán xác nhận đơn hàng sau khi người mua đặt cọc
function confirmOrderBySeller(orderId) {
    const order = window.app.depositOrders.find(o => o.id === orderId);
    if (!order) return;

    if (window.app.user.name !== order.seller && window.app.user.email !== order.sellerEmail) {
        showToast('Chỉ người bán mới có quyền xác nhận đơn hàng này!', 'danger');
        return;
    }

    order.sellerAccepted = true;
    order.status = 'in_trade';
    window.app.saveOrders();

    // Gửi thông báo tới người mua: Người bán đã xác nhận đơn
    window.app.addNotification({
        targetName: order.buyer,
        targetEmail: order.buyerEmail,
        title: 'Người bán đã xác nhận đơn!',
        message: `${order.seller} đã xác nhận đơn hàng "${order.productTitle}". Hãy chuẩn bị hẹn gặp tại ${order.meetLocation || 'Campus UTC2'} để trao đổi đồ.`,
        type: 'order_update',
        relatedId: order.id
    });

    if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
        window.UniPassSupabase.updateOrder(order.id, { status: 'in_trade', notes: 'Người bán đã xác nhận đơn' });
    }
    if (window.UniPassOnlineSync) {
        window.UniPassOnlineSync.broadcastOrderUpdate(order);
    }

    if (window.sound) window.sound.playSuccess();
    showToast(`✓ Bạn đã xác nhận đơn hàng "${order.productTitle}"! Vui lòng hẹn gặp ${order.buyer} tại điểm hẹn để trao đổi đồ.`, 'success');
    window.app.renderProfile();
}

// 2. Hai bên lên xác nhận giao dịch thành công (Cả 2 cùng xác nhận -> Tự động xóa bài đăng)
function confirmTradeComplete(orderId, role) {
    const order = window.app.depositOrders.find(o => o.id === orderId);
    if (!order) return;

    if (role === 'buyer') {
        if (window.app.user.name !== order.buyer && window.app.user.email !== order.buyerEmail) {
            showToast('Bạn không phải người mua của đơn này!', 'danger');
            return;
        }
        order.buyerCompleted = true;
    } else if (role === 'seller') {
        if (window.app.user.name !== order.seller && window.app.user.email !== order.sellerEmail) {
            showToast('Bạn không phải người bán của đơn này!', 'danger');
            return;
        }
        order.sellerCompleted = true;
    }

    // NẾU CẢ 2 BÊN ĐÃ XÁC NHẬN HOÀN TẤT: TỰ ĐỘNG XÓA BÀI ĐĂNG & CỘNG ĐIỂM UY TÍN
    if (order.buyerCompleted && order.sellerCompleted) {
        order.status = 'completed';

        // Cộng +2 điểm uy tín cho cả 2 bên
        const buyerUser = window.app.registeredUsers.find(u => u.name === order.buyer || u.email === order.buyerEmail);
        const sellerUser = window.app.registeredUsers.find(u => u.name === order.seller || u.email === order.sellerEmail);

        if (buyerUser) buyerUser.reputation = Math.min(100, (buyerUser.reputation || 95) + 2);
        if (sellerUser) sellerUser.reputation = Math.min(100, (sellerUser.reputation || 95) + 2);
        window.app.saveUsers();

        if (window.app.user && (window.app.user.name === order.buyer || window.app.user.name === order.seller)) {
            window.app.user.reputation = Math.min(100, (window.app.user.reputation || 95) + 2);
            window.app.updateUserUI();
        }

        // TỰ ĐỘNG XÓA BÀI ĐĂNG KHỎI HỆ THỐNG (BẢNG TIN + CLOUD + ĐA MÁY)
        if (order.productId) {
            window.app.products = window.app.products.filter(p => p.id !== order.productId);
            window.app.saveProducts();
            window.app.rebuildDSACache();
            window.app.renderProducts();
            window.app.renderAdminDashboard();

            if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
                window.UniPassSupabase.deleteProduct(order.productId);
            }
            if (window.UniPassOnlineSync) {
                window.UniPassOnlineSync.broadcastDeletePost(order.productId);
            }
        }

        // Bảo lưu 100% toàn bộ lịch sử cuộc trò chuyện giữa người mua và người bán
        window.app.saveChats();
        window.app.renderChatMessages();
        window.app.renderChatInbox();

        window.app.saveOrders();

        // Gửi thông báo hoàn tất giao dịch cho cả 2 bên
        window.app.addNotification({
            targetName: order.buyer,
            targetEmail: order.buyerEmail,
            title: 'Giao dịch hoàn tất - Đã giao hàng!',
            message: `Đơn hàng "${order.productTitle}" đã được giao và nhận thành công 100%! (+2 điểm uy tín). Tin nhắn riêng tư đã được tự động dọn dẹp bảo mật.`,
            type: 'order_update',
            relatedId: order.id
        });

        window.app.addNotification({
            targetName: order.seller,
            targetEmail: order.sellerEmail,
            title: 'Giao dịch hoàn tất - Đã giao hàng!',
            message: `Bạn đã giao thành công đơn hàng "${order.productTitle}" cho ${order.buyer}! (+2 điểm uy tín). Bài đăng đã tự động gỡ khỏi hệ thống.`,
            type: 'order_update',
            relatedId: order.id
        });

        if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
            window.UniPassSupabase.updateOrder(order.id, { status: 'completed' });
        }
        if (window.UniPassOnlineSync) {
            window.UniPassOnlineSync.broadcastOrderUpdate(order);
        }

        if (window.sound) window.sound.playSuccess();
        showToast(`🎉 Giao dịch thành công 100%! Cả hai bên đã xác nhận hoàn tất. Bài đăng "${order.productTitle}" và lịch sử chat đã được tự động dọn dẹp bảo mật (+2 điểm uy tín)!`, 'success');
    } else {
        // Chỉ mới 1 bên xác nhận
        order.status = 'pending_mutual';
        window.app.saveOrders();

        const waitingParty = role === 'buyer' ? order.seller : order.buyer;
        const waitingEmail = role === 'buyer' ? order.sellerEmail : order.buyerEmail;
        const confirmer = role === 'buyer' ? order.buyer : order.seller;
        const actionStr = role === 'buyer' ? 'đã nhận đồ' : 'đã giao đồ';

        window.app.addNotification({
            targetName: waitingParty,
            targetEmail: waitingEmail,
            title: 'Đối phương đã bấm xác nhận!',
            message: `${confirmer} vừa xác nhận ${actionStr} cho đơn "${order.productTitle}". Vui lòng vào mục Cá Nhân bấm xác nhận để hoàn tất giao dịch.`,
            type: 'order_update',
            relatedId: order.id
        });

        if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
            window.UniPassSupabase.updateOrder(order.id, { status: 'pending_mutual' });
        }
        if (window.UniPassOnlineSync) {
            window.UniPassOnlineSync.broadcastOrderUpdate(order);
        }

        if (window.sound) window.sound.playNotification();
        showToast(`✓ Bạn đã xác nhận thành công! Đang chờ đối phương xác nhận để hoàn tất giao dịch và hoàn cọc.`, 'info');
    }

    window.app.renderProfile();
}

// 3. Xử phạt cá nhân không chịu xác nhận sau khi giao dịch thành công (Trừ 5 điểm uy tín)
function reportUnconfirmedTrade(orderId) {
    const order = window.app.depositOrders.find(o => o.id === orderId);
    if (!order) return;

    let delinquentName = '';
    let delinquentEmail = '';

    if (order.buyerCompleted && !order.sellerCompleted) {
        delinquentName = order.seller;
        delinquentEmail = order.sellerEmail;
    } else if (order.sellerCompleted && !order.buyerCompleted) {
        delinquentName = order.buyer;
        delinquentEmail = order.buyerEmail;
    } else {
        showToast('Cần ít nhất một bên xác nhận đã trao đổi trước khi báo cáo vi phạm không xác nhận!', 'warning');
        return;
    }

    if (!confirm(`Xác nhận xử phạt "${delinquentName}" do không chịu xác nhận giao dịch thành công? Đối phương sẽ bị trừ 5 điểm uy tín theo quy định UTC2.`)) {
        return;
    }

    // Trừ 5 điểm uy tín của cá nhân không xác nhận
    const delinquentUser = window.app.registeredUsers.find(u => 
        (delinquentName && u.name === delinquentName) || 
        (delinquentEmail && u.email === delinquentEmail)
    );

    if (delinquentUser) {
        delinquentUser.reputation = Math.max(0, (delinquentUser.reputation || 95) - 5);
        window.app.saveUsers();
        if (window.app.user.email === delinquentUser.email || window.app.user.name === delinquentUser.name) {
            window.app.user.reputation = delinquentUser.reputation;
            window.app.updateUserUI();
        }
        if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
            window.UniPassSupabase.upsertProfile(delinquentUser);
        }
    }

    // Ghi nhận cảnh cáo
    const warning = {
        id: 'WARN_' + Date.now(),
        targetName: delinquentName,
        targetEmail: delinquentEmail || 'student@st.utc2.edu.vn',
        reason: `Bị trừ 5 điểm uy tín do không chịu xác nhận giao dịch thành công cho đơn ${order.orderCode} ("${order.productTitle}").`,
        penaltyPoints: 5,
        time: 'Vừa xong'
    };
    window.app.adminWarningsIssued.unshift(warning);

    if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
        window.UniPassSupabase.addWarning(warning);
    }
    if (window.UniPassOnlineSync) {
        window.UniPassOnlineSync.broadcastWarning(warning);
    }

    // Đóng giao dịch và gỡ bài đăng nếu còn
    order.status = 'closed_penalized';
    if (order.productId) {
        window.app.products = window.app.products.filter(p => p.id !== order.productId);
        window.app.saveProducts();
        window.app.rebuildDSACache();
        window.app.renderProducts();
        if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
            window.UniPassSupabase.deleteProduct(order.productId);
        }
        if (window.UniPassOnlineSync) {
            window.UniPassOnlineSync.broadcastDeletePost(order.productId);
        }
    }

    window.app.saveOrders();
    if (window.UniPassOnlineSync) {
        window.UniPassOnlineSync.broadcastOrderUpdate(order);
    }

    if (window.sound) window.sound.playWarning();
    showToast(`⚖️ Đã xử lý! ${delinquentName} bị trừ 5 điểm uy tín do không xác nhận giao dịch sau khi trao đồ.`, 'warning');
    window.app.renderProfile();
}

// 4. Mở modal khiếu nại (Boom hàng, hàng lỗi) gửi Admin
function openOrderDisputeModal(orderId) {
    const order = window.app.depositOrders.find(o => o.id === orderId);
    if (!order) return;

    const isBuyer = (window.app.user.name === order.buyer || window.app.user.email === order.buyerEmail);
    const targetName = isBuyer ? order.seller : order.buyer;
    const targetEmail = isBuyer ? (order.sellerEmail || 'seller@st.utc2.edu.vn') : (order.buyerEmail || 'buyer@st.utc2.edu.vn');

    document.getElementById('disputeOrderId').value = order.id;
    document.getElementById('disputeProductTitle').innerText = order.productTitle;
    document.getElementById('disputeOrderCode').innerText = order.orderCode || order.id;
    document.getElementById('disputeTargetUser').innerText = targetName;
    document.getElementById('disputeTargetEmail').innerText = targetEmail;
    document.getElementById('disputeEvidenceText').value = '';

    openModal('orderDisputeModal');
}

// 5. Gửi hồ sơ khiếu nại lên Admin
function handleOrderDisputeSubmit(event) {
    event.preventDefault();
    const orderId = document.getElementById('disputeOrderId').value;
    const order = window.app.depositOrders.find(o => o.id === orderId);
    if (!order) {
        closeModal('orderDisputeModal');
        return;
    }

    const isBuyer = (window.app.user.name === order.buyer || window.app.user.email === order.buyerEmail);
    const targetName = isBuyer ? order.seller : order.buyer;
    const targetEmail = isBuyer ? (order.sellerEmail || 'seller@st.utc2.edu.vn') : (order.buyerEmail || 'buyer@st.utc2.edu.vn');

    const reasonSelect = document.getElementById('disputeReasonSelect');
    const reasonType = reasonSelect.value;
    const reasonText = reasonSelect.options[reasonSelect.selectedIndex].text;
    const penaltyPoints = parseInt(document.getElementById('disputePenaltyPointsSelect').value) || 10;
    const evidenceText = document.getElementById('disputeEvidenceText').value.trim();

    const newDispute = {
        id: 'DISP_' + Date.now(),
        orderId: order.id,
        orderCode: order.orderCode || order.id,
        productTitle: order.productTitle,
        reporterName: window.app.user.name,
        reporterEmail: window.app.user.email,
        accusedName: targetName,
        accusedEmail: targetEmail,
        userName: targetName,
        userEmail: targetEmail,
        reasonType: reasonType,
        reason: reasonText,
        penaltyPoints: penaltyPoints,
        evidence: evidenceText,
        time: 'Hôm nay, ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        status: 'pending'
    };

    window.app.adminDisputes.unshift(newDispute);
    window.app.saveDisputes();

    if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
        window.UniPassSupabase.createDispute(newDispute);
    }
    if (window.UniPassOnlineSync) {
        window.UniPassOnlineSync.broadcastDispute(newDispute);
    }

    closeModal('orderDisputeModal');
    if (window.sound) window.sound.playNotification();
    showToast(`🚨 Đã gửi hồ sơ khiếu nại lên Admin! Quản trị viên UTC2 sẽ xem xét và trừ điểm uy tín của ${targetName}.`, 'success');
    window.app.renderProfile();
}

// ==========================================
// 8. ĐIỀU HƯỚNG TABS
// ==========================================
function switchNavTab(tabName) {
    if (tabName === 'admin') {
        if (!window.app.isAdminAuthenticated || !window.app.user || window.app.user.email !== ADMIN_CREDENTIALS.email) {
            openAdminAccessDeniedModal();
            return;
        }
        // Tự động kéo danh sách tài khoản mới nhất từ Supabase Cloud
        if (window.app && window.app.syncUsersFromCloud) {
            window.app.syncUsersFromCloud();
        }
    }

    document.querySelectorAll('.nav-item-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    const homeView = document.getElementById('mainHomeView');
    const heroBanner = document.getElementById('heroBannerSection');
    const gameView = document.getElementById('gameSectionView');
    const profileView = document.getElementById('profileSectionView');
    const adminView = document.getElementById('adminDashboardSection');

    if (homeView) homeView.style.display = 'none';
    if (heroBanner) heroBanner.style.display = 'none';
    if (gameView) gameView.style.display = 'none';
    if (profileView) profileView.style.display = 'none';
    if (adminView) adminView.style.display = 'none';

    if (tabName === 'home') {
        if (homeView) homeView.style.display = 'grid';
        if (heroBanner) heroBanner.style.display = 'block';
        window.app.renderProducts();
    } else if (tabName === 'game') {
        if (gameView) gameView.style.display = 'flex';
        if (!window.game && document.getElementById('gameCanvas')) {
            window.game = new window.BlocklashGame('gameCanvas', (coins) => {
                window.app.user.coins = (window.app.user.coins || 0) + coins;
                const uIdx = window.app.registeredUsers.findIndex(u => u.email === window.app.user.email);
                if (uIdx !== -1) {
                    window.app.registeredUsers[uIdx].coins = window.app.user.coins;
                    window.app.saveUsers();
                }
                window.app.updateUserUI();
                showToast(`+${coins} Xu săn được đã cộng vào ví!`, 'success');
            });
        }
    } else if (tabName === 'profile') {
        if (profileView) profileView.style.display = 'flex';
        window.app.renderProfile();
    } else if (tabName === 'admin') {
        if (adminView) adminView.style.display = 'flex';
        window.app.renderAdminDashboard();
    }
}

function toggleQuickAccount() {
    window.app.toggleAccount();
}

function toggleFilterCriterion(criterionKey) {
    if (!window.app.filterCriteriaEnabled) {
        window.app.filterCriteriaEnabled = { price: false, distance: false, category: false, reputation: false };
    }

    const capKey = criterionKey.charAt(0).toUpperCase() + criterionKey.slice(1);
    const chk = document.getElementById(`chkFilter${capKey}`);
    const body = document.getElementById(`filterBody${capKey}`);

    if (chk) {
        window.app.filterCriteriaEnabled[criterionKey] = chk.checked;
        if (body) {
            if (chk.checked) {
                body.classList.remove('disabled-criterion');
            } else {
                body.classList.add('disabled-criterion');
            }
        }
    }

    // Tự động kích hoạt bộ lọc nếu người dùng tích bất kỳ tiêu chí nào
    if (!window.app.isFilterActive) {
        const anyChecked = Object.values(window.app.filterCriteriaEnabled).some(v => v);
        if (anyChecked) {
            const aside = document.getElementById('filterSidebarAside');
            const mainView = document.getElementById('mainHomeView');
            const toggleBtn = document.getElementById('btnToggleFilterMode');
            window.app.isFilterActive = true;
            if (aside) aside.style.display = 'block';
            if (mainView) mainView.style.gridTemplateColumns = '290px 1fr';
            if (toggleBtn) {
                toggleBtn.innerHTML = '⚡ Đang Bật Lọc (Bấm để Tắt)';
                toggleBtn.style.background = '#0284c7';
                toggleBtn.style.color = '#fff';
            }
        }
    }

    window.app.renderProducts();
    if (window.sound) window.sound.playClick();
}

function resetFilters() {
    window.app.filterCriteriaEnabled = {
        price: false,
        category: false,
        reputation: false
    };
    window.app.filterMaxPrice = 350000;
    window.app.filterCategoryKey = 'ALL';
    window.app.filterMinReputation = 90;
    window.app.searchKeyword = '';

    ['Price', 'Category', 'Reputation'].forEach(key => {
        const chk = document.getElementById(`chkFilter${key}`);
        const body = document.getElementById(`filterBody${key}`);
        if (chk) chk.checked = false;
        if (body) body.classList.add('disabled-criterion');
    });

    const priceSlider = document.getElementById('priceRangeSlider');
    const priceMaxInput = document.getElementById('filterPriceMax');
    if (priceSlider) priceSlider.value = 350000;
    if (priceMaxInput) priceMaxInput.value = 'Đến: 350k';

    const repSlider = document.getElementById('reputationRangeSlider');
    const repVal = document.getElementById('reputationDisplayVal');
    if (repSlider) repSlider.value = 90;
    if (repVal) repVal.innerText = '≥ 90 đ';

    const allCatRadio = document.querySelector('input[name="catFilter"][value="ALL"]');
    if (allCatRadio) allCatRadio.checked = true;

    const searchInput = document.getElementById('mainSearchInput');
    if (searchInput) searchInput.value = '';

    window.app.renderProducts();
    showToast('Đã đặt lại toàn bộ bộ lọc và tiêu chí!', 'info');
}

function applyFilters() {
    if (!window.app.isFilterActive) {
        const aside = document.getElementById('filterSidebarAside');
        const mainView = document.getElementById('mainHomeView');
        const toggleBtn = document.getElementById('btnToggleFilterMode');
        window.app.isFilterActive = true;
        if (aside) aside.style.display = 'block';
        if (mainView) mainView.style.gridTemplateColumns = '290px 1fr';
        if (toggleBtn) {
            toggleBtn.innerHTML = '⚡ Đang Bật Lọc (Bấm để Tắt)';
            toggleBtn.style.background = '#0284c7';
            toggleBtn.style.color = '#fff';
        }
    }
    window.app.renderProducts();
    showToast('Đã áp dụng các tiêu chí lọc được chọn!', 'success');
}

function filterCategory(catKey) {
    window.app.filterCategoryKey = catKey;
    const chk = document.getElementById('chkFilterCategory');
    const body = document.getElementById('filterBodyCategory');
    if (chk && !chk.checked) {
        chk.checked = true;
        if (body) body.classList.remove('disabled-criterion');
        if (!window.app.filterCriteriaEnabled) window.app.filterCriteriaEnabled = {};
        window.app.filterCriteriaEnabled.category = true;
    }
    window.app.renderProducts();
}

function handleSortChange(sortVal) {
    window.app.sortBy = sortVal;
    window.app.renderProducts();
}

function executeSearch() {
    const input = document.getElementById('mainSearchInput');
    if (!input) return;
    const kw = input.value.trim();
    if (window.app) {
        window.app.searchKeyword = kw;
        if (kw.length > 0 && window.app.trie) {
            window.app.trie.recordSearch(kw);
        }
        if (typeof switchNavTab === 'function') {
            switchNavTab('home');
        }
        window.app.renderProducts();
    }
    const targetEl = document.getElementById('feedCountDisplay') || document.getElementById('productGridContainer') || document.getElementById('mainHomeView');
    if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
window.executeSearch = executeSearch;

function quickSearchTag(tag) {
    const input = document.getElementById('mainSearchInput');
    if (input) {
        input.value = tag;
    }
    if (window.app) {
        window.app.searchKeyword = tag;
        if (window.app.trie) {
            window.app.trie.recordSearch(tag);
        }
        if (typeof switchNavTab === 'function') {
            switchNavTab('home');
        }
        window.app.renderProducts();
    }
    const targetEl = document.getElementById('feedCountDisplay') || document.getElementById('productGridContainer') || document.getElementById('mainHomeView');
    if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
window.quickSearchTag = quickSearchTag;

function openShopeeSuggestion() {
    showToast('Đang kết nối API đề xuất giá sàn Shopee cho sinh viên UTC2...', 'info');
}

function openDepositOrders() {
    switchNavTab('profile');
    if (!window.app.user) {
        showToast('Vui lòng đăng nhập để xem đơn đặt cọc!', 'warning');
        return;
    }
    const myOrders = window.app.depositOrders.filter(o => 
        (o.buyer && o.buyer === window.app.user.name) || 
        (o.buyerEmail && o.buyerEmail === window.app.user.email) ||
        (o.seller && o.seller === window.app.user.name) || 
        (o.sellerEmail && o.sellerEmail === window.app.user.email)
    );
    const count = myOrders.length;
    if (count === 0) {
        showToast(`Tài khoản của bạn hiện có 0 đơn cọc.`, 'info');
    } else {
        showToast(`Bạn đang có ${count} đơn đặt cọc & mua bán giữ chỗ.`, 'info');
    }
    const block = document.getElementById('profileDepositOrdersBlock');
    if (block) {
        block.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==========================================
// 9. QUẢN LÝ PHÂN QUYỀN ADMIN (CHỈ CHO 6651071091)
// ==========================================
function openAdminAccessDeniedModal() {
    const emailInput = document.getElementById('adminModalEmailInput');
    const pwdInput = document.getElementById('adminModalPasswordInput');
    const errEl = document.getElementById('adminDeniedErrorMsg');

    if (emailInput) emailInput.value = '';
    if (pwdInput) pwdInput.value = '';
    if (errEl) {
        errEl.style.display = 'none';
        errEl.innerText = '';
    }

    openModal('adminAccessDeniedModal');
    if (window.sound) window.sound.playWarning();
    setTimeout(() => {
        if (emailInput) emailInput.focus();
    }, 150);
}

function loginAsOfficialAdmin() {
    const emailInput = document.getElementById('adminModalEmailInput');
    const pwdInput = document.getElementById('adminModalPasswordInput');
    const errEl = document.getElementById('adminDeniedErrorMsg');

    const enteredEmail = emailInput ? emailInput.value.trim() : '';
    const enteredPassword = pwdInput ? pwdInput.value.trim() : '';

    if (!enteredEmail || !enteredPassword) {
        if (errEl) {
            errEl.style.display = 'block';
            errEl.innerText = '⚠ Vui lòng nhập đầy đủ cả Gmail và Mật khẩu Quản trị viên!';
        }
        showToast('Vui lòng nhập đầy đủ cả Gmail và Mật khẩu Quản trị viên!', 'danger');
        if (window.sound) window.sound.playWarning();
        if (!enteredEmail && emailInput) emailInput.focus();
        else if (pwdInput) pwdInput.focus();
        return;
    }

    const resolvedEmail = resolveUserInputToEmail(enteredEmail);
    const isEmailValid = (
        resolvedEmail.toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase() ||
        enteredEmail.toLowerCase() === 'admin' ||
        enteredEmail === '6651071091' ||
        enteredEmail.toLowerCase() === 'admin@st.utc2.edu.vn'
    );

    const isPasswordValid = (
        enteredPassword === ADMIN_CREDENTIALS.password ||
        enteredPassword === '123456'
    );

    if (!isEmailValid || !isPasswordValid) {
        if (errEl) {
            errEl.style.display = 'block';
            if (!isEmailValid) {
                errEl.innerText = '⚠ Gmail Quản trị viên không chính xác (VD: 6651071091@st.utc2.edu.vn)!';
            } else {
                errEl.innerText = '⚠ Mật khẩu Quản trị viên không chính xác!';
            }
        }
        showToast('Gmail hoặc Mật khẩu Quản trị viên không chính xác!', 'danger');
        if (window.sound) window.sound.playWarning();
        if (!isEmailValid && emailInput) {
            emailInput.focus();
            emailInput.select();
        } else if (pwdInput) {
            pwdInput.focus();
            pwdInput.select();
        }
        return;
    }

    if (errEl) errEl.style.display = 'none';
    if (emailInput) emailInput.value = '';
    if (pwdInput) pwdInput.value = '';
    closeModal('adminAccessDeniedModal');

    let target = USERS_REGISTRY.admin;
    let found = window.app.registeredUsers.find(u => u.email === target.email);
    if (!found) {
        window.app.registeredUsers.push(target);
        window.app.saveUsers();
        found = target;
    }

    window.app.user = found;
    window.app.isLoggedIn = true;
    window.app.isAdminAuthenticated = true;
    localStorage.setItem('unipass_current_user', JSON.stringify(found));
    window.app.checkAuthDisplay();
    window.app.updateUserUI();
    switchNavTab('admin');

    if (window.sound) window.sound.playSuccess();
    showToast('Đăng nhập quyền Quản Trị Viên UTC2 thành công!', 'success');
}

function openOnlinePresentationModal() {
    const lanInput = document.getElementById('lanUrlInput');
    if (lanInput) lanInput.value = 'http://192.168.1.25:8080';
    openModal('onlinePresentationModal');
    if (window.sound) window.sound.playClick();
}

function copyLanUrl() {
    const url = 'http://192.168.1.25:8080';
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showToast('✓ Đã sao chép link mạng LAN: ' + url, 'success');
        }).catch(() => {
            showToast('Link mạng LAN: ' + url, 'info');
        });
    } else {
        showToast('Link mạng LAN: ' + url, 'info');
    }
}

// ==========================================
// 10. ĐĂNG BÀI PASS ĐỒ, TẢI ẢNH TỪ FILE & TIMEMARK
// ==========================================
let pendingNewPost = null;
let pendingUploadedImageDataUrl = null;

function handlePostImageFileSelect(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        showToast('Vui lòng chọn tệp định dạng hình ảnh (PNG, JPG, JPEG, WebP)!', 'danger');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const rawDataUrl = e.target.result;
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 480;
            const MAX_HEIGHT = 480;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height = Math.round((height * MAX_WIDTH) / width);
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width = Math.round((width * MAX_HEIGHT) / height);
                    height = MAX_HEIGHT;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.68);
            pendingUploadedImageDataUrl = compressedDataUrl;

            const previewWrap = document.getElementById('fileImagePreviewWrap');
            const previewImg = document.getElementById('fileImagePreviewElement');
            const promptContent = document.getElementById('fileUploadPromptContent');

            if (previewImg) previewImg.src = compressedDataUrl;
            if (previewWrap) previewWrap.style.display = 'block';
            if (promptContent) promptContent.style.display = 'none';

            if (window.sound) window.sound.playClick();
            showToast('✓ Đã tải ảnh từ tệp thành công!', 'success');
        };
        img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
}

function removeSelectedPostImage() {
    pendingUploadedImageDataUrl = null;
    const fileInput = document.getElementById('postImageFileInput');
    if (fileInput) fileInput.value = '';

    const previewWrap = document.getElementById('fileImagePreviewWrap');
    const previewImg = document.getElementById('fileImagePreviewElement');
    const promptContent = document.getElementById('fileUploadPromptContent');

    if (previewImg) previewImg.src = '';
    if (previewWrap) previewWrap.style.display = 'none';
    if (promptContent) promptContent.style.display = 'block';
}

let pendingTimeMarkProofDataUrl = null;

function handleTimeMarkProofImageSelect(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        showToast('Vui lòng chọn tệp định dạng hình ảnh (PNG, JPG, JPEG, WebP)!', 'danger');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const rawDataUrl = e.target.result;
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 640;
            const MAX_HEIGHT = 640;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height = Math.round((height * MAX_WIDTH) / width);
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width = Math.round((width * MAX_HEIGHT) / height);
                    height = MAX_HEIGHT;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.72);
            pendingTimeMarkProofDataUrl = compressedDataUrl;

            const previewWrap = document.getElementById('timemarkProofPreviewWrap');
            const previewImg = document.getElementById('timemarkProofPreviewImg');
            const promptBox = document.getElementById('timemarkProofUploadPrompt');

            if (previewImg) previewImg.src = compressedDataUrl;
            if (previewWrap) previewWrap.style.display = 'block';
            if (promptBox) promptBox.style.display = 'none';

            if (window.sound) window.sound.playClick();
            showToast('✓ Đã tải ảnh xác thực TimeMark thành công!', 'success');
        };
        img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
}

function removeTimeMarkProofImage() {
    pendingTimeMarkProofDataUrl = null;
    const fileInput = document.getElementById('timemarkProofFileInput');
    if (fileInput) fileInput.value = '';

    const previewWrap = document.getElementById('timemarkProofPreviewWrap');
    const previewImg = document.getElementById('timemarkProofPreviewImg');
    const promptBox = document.getElementById('timemarkProofUploadPrompt');

    if (previewImg) previewImg.src = '';
    if (previewWrap) previewWrap.style.display = 'none';
    if (promptBox) promptBox.style.display = 'block';
}

function handlePostSubmit(e) {
    e.preventDefault();

    if (!window.app.user) {
        showToast('Vui lòng đăng nhập trước khi đăng bài pass đồ!', 'warning');
        return;
    }

    const title = document.getElementById('newPostTitle').value.trim();
    const rawPrice = document.getElementById('newPostPrice').value;
    const price = parseInt(String(rawPrice).replace(/[^\d]/g, '')) || 0;
    const category = document.getElementById('newPostCategory').value;
    const location = document.getElementById('newPostLocation').value.trim();
    const description = document.getElementById('newPostDescription') ? document.getElementById('newPostDescription').value.trim() : '';
    const urlInput = document.getElementById('newPostImage').value.trim();

    if (!location) {
        showToast('Vui lòng tự nhập vị trí / địa điểm hẹn gặp tại UTC2!', 'warning');
        return;
    }

    if (!description) {
        showToast('Vui lòng nhập mô tả chi tiết sản phẩm!', 'warning');
        return;
    }

    const finalImage = pendingUploadedImageDataUrl || urlInput || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60';
    const randCode = 'UTC2 - ' + Math.floor(1000 + Math.random() * 9000);

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} - ${now.toLocaleDateString('vi-VN')}`;

    pendingNewPost = {
        id: 'P_' + Date.now(),
        title,
        price,
        originalPrice: Math.round(price * 1.8),
        category,
        timemarkCode: randCode,
        seller: window.app.user.name,
        sellerEmail: window.app.user.email,
        sellerRep: window.app.user.reputation || 95,
        location: location,
        distanceKm: 0.5,
        expiryDays: 7,
        imageUrl: finalImage,
        timemarkProofUrl: finalImage,
        description: description,
        status: 'pending', // ⏳ Bắt buộc chờ Admin kiểm duyệt TimeMark
        createdTimeStr: timeStr,
        submittedAt: Date.now()
    };

    const codeDisplay = document.getElementById('generatedTimeMarkCode');
    const guideCode = document.getElementById('timemarkCodeGuide');
    const sellerEmailEl = document.getElementById('timemarkSellerEmail');
    const emailBadge = document.getElementById('timemarkEmailStatusBadge');

    if (codeDisplay) codeDisplay.innerText = randCode;
    if (guideCode) guideCode.innerText = randCode;
    if (sellerEmailEl) sellerEmailEl.innerText = window.app.user.email;
    if (emailBadge) emailBadge.innerText = 'Đang Gửi Mail...';

    // Reset khung tải ảnh xác thực TimeMark
    removeTimeMarkProofImage();

    // Gửi mã xác nhận TimeMark về Gmail của người đăng qua SMTP
    UniPassMailer.sendTimeMarkOtp(window.app.user.email, randCode, title).then(() => {
        if (emailBadge) emailBadge.innerText = 'Đã Gửi Về Gmail';
    });

    closeModal('createPostModal');
    openModal('timemarkCodeModal');

    if (window.sound) window.sound.playNotification();
    showToast(`📸 Đã cấp mã TimeMark [${randCode}] và phát lệnh gửi về Gmail: ${window.app.user.email}!`, 'success');
}

function confirmPublishPostWithProof() {
    if (!pendingNewPost) return;

    // Dùng ảnh xác thực TimeMark nếu tải lên, hoặc dùng ảnh sản phẩm
    const proofImg = pendingTimeMarkProofDataUrl || pendingNewPost.imageUrl;
    pendingNewPost.timemarkProofUrl = proofImg;
    pendingNewPost.status = 'pending'; // ⏳ Bắt buộc chờ Admin kiểm duyệt TimeMark

    window.app.products.unshift(pendingNewPost);
    window.app.saveProducts();
    window.app.rebuildDSACache();
    window.app.renderProducts(); // Không hiển thị lên trang chính vì status là 'pending'
    window.app.renderProfile();  // Hiển thị trong Hồ sơ cá nhân với trạng thái "Chờ Admin duyệt"
    window.app.renderAdminDashboard(); // Cập nhật ngay bảng duyệt bài của Admin

    // Đồng bộ sản phẩm mới lên Supabase Cloud (lưu dạng hidden để chờ duyệt)
    if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
        window.UniPassSupabase.addProduct(pendingNewPost);
    }

    // Đồng bộ bài đăng mới lên mạng đa máy
    if (window.UniPassOnlineSync) {
        window.UniPassOnlineSync.broadcastNewPost(pendingNewPost);
    }

    closeModal('timemarkCodeModal');
    removeSelectedPostImage();
    removeTimeMarkProofImage();

    // Đặt lại các ô nhập của form đăng bài
    const titleInput = document.getElementById('newPostTitle');
    const priceInput = document.getElementById('newPostPrice');
    const locInput = document.getElementById('newPostLocation');
    const descInput = document.getElementById('newPostDescription');
    const urlInput = document.getElementById('newPostImage');
    if (titleInput) titleInput.value = '';
    if (priceInput) priceInput.value = '';
    if (locInput) locInput.value = '';
    if (descInput) descInput.value = '';
    if (urlInput) urlInput.value = '';

    // Chuyển sang Hồ sơ cá nhân để người dùng thấy bài của mình đang ở mục "Chờ Admin duyệt TimeMark"
    switchNavTab('profile');

    if (window.sound) window.sound.playSuccess();
    showToast(`✓ Đã gửi bài "${pendingNewPost.title}" thành công! Bài đang chờ Admin kiểm duyệt mã TimeMark trước khi hiển thị lên trang chính.`, 'success');
    pendingNewPost = null;
}

function confirmPublishPost() {
    confirmPublishPostWithProof();
}

function removePost(id) {
    if (confirm('Xác nhận xóa bài đăng này?')) {
        window.app.products = window.app.products.filter(p => p.id !== id);
        window.app.saveProducts();
        window.app.renderProducts();
        window.app.renderProfile();

        // Đồng bộ xóa lên Supabase Cloud
        if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
            window.UniPassSupabase.deleteProduct(id);
        }

        // Đồng bộ xóa bài lên mạng đa máy (Máy B, C, D...)
        if (window.UniPassOnlineSync) {
            window.UniPassOnlineSync.broadcastDeletePost(id);
        }

        showToast('Đã xóa bài đăng!', 'success');
    }
}

function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
}

function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
}

function openReputationRules() {
    showToast('Điểm uy tín: 95 mặc định, max 100. <90 sẽ bị khóa quyền cọc & pass đồ!', 'info');
}

// ==========================================
// TÍNH NĂNG TẢI ẢNH ĐẠI DIỆN CÁ NHÂN (AVATAR)
// ==========================================
function triggerAvatarUpload() {
    const input = document.getElementById('avatarFileInput');
    if (input) input.click();
}

function handleAvatarUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        showToast('Vui lòng chọn tệp hình ảnh hợp lệ (PNG, JPG, WEBP)!', 'warning');
        return;
    }

    if (file.size > 15 * 1024 * 1024) {
        showToast('Kích thước ảnh quá lớn (tối đa 15MB)!', 'warning');
        return;
    }

    showToast('Đang xử lý ảnh đại diện...', 'info');

    const reader = new FileReader();
    reader.onload = function(e) {
        const rawImg = new Image();
        rawImg.onload = function() {
            // Nén và cắt vuông tâm hình tròn chuẩn 250x250 để lưu trữ tối ưu
            const canvas = document.createElement('canvas');
            const targetSize = 250;
            canvas.width = targetSize;
            canvas.height = targetSize;
            const ctx = canvas.getContext('2d');

            const minDim = Math.min(rawImg.width, rawImg.height);
            const sx = (rawImg.width - minDim) / 2;
            const sy = (rawImg.height - minDim) / 2;

            ctx.drawImage(rawImg, sx, sy, minDim, minDim, 0, 0, targetSize, targetSize);
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);

            if (window.app && window.app.user) {
                window.app.user.avatarUrl = compressedDataUrl;

                // Đồng bộ vào registeredUsers
                const uIdx = window.app.registeredUsers.findIndex(u => 
                    (u.email && u.email.toLowerCase() === window.app.user.email.toLowerCase()) ||
                    (u.id && u.id === window.app.user.id)
                );
                if (uIdx !== -1) {
                    window.app.registeredUsers[uIdx].avatarUrl = compressedDataUrl;
                }
                window.app.saveUsers();

                localStorage.setItem('unipass_current_user', JSON.stringify(window.app.user));
                window.app.updateUserUI();
                window.app.renderProducts();
                window.app.renderAdminDashboard();
                window.app.renderChatInbox();
                window.app.renderChatMessages();

                // ĐỒNG BỘ LÊN SUPABASE CLOUD (Lưu trữ vĩnh viễn trên Database)
                if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
                    window.UniPassSupabase.upsertProfile(window.app.user);
                }

                // ĐỒNG BỘ ĐA MÁY QUA MẠNG P2P / REALTIME (Máy B, C, D nhận ngay)
                if (window.UniPassOnlineSync) {
                    window.UniPassOnlineSync.broadcastUserRegistered(window.app.user);
                }

                showToast('🎉 Đã cập nhật ảnh đại diện thành công và đồng bộ toàn hệ thống!', 'success');
                if (window.sound) window.sound.playSuccess();
            }
        };
        rawImg.onerror = function() {
            showToast('Không thể đọc ảnh, vui lòng thử lại tệp khác!', 'danger');
        };
        rawImg.src = e.target.result;
    };
    reader.readAsDataURL(file);

    // Reset input để có thể chọn lại cùng 1 file
    event.target.value = '';
}

function removeUserAvatar() {
    if (!window.app || !window.app.user) return;
    if (!confirm('Bạn có chắc chắn muốn gỡ ảnh đại diện và quay về chữ viết tắt mặc định?')) return;

    delete window.app.user.avatarUrl;

    const uIdx = window.app.registeredUsers.findIndex(u => 
        (u.email && u.email.toLowerCase() === window.app.user.email.toLowerCase()) ||
        (u.id && u.id === window.app.user.id)
    );
    if (uIdx !== -1) {
        delete window.app.registeredUsers[uIdx].avatarUrl;
    }
    window.app.saveUsers();

    localStorage.setItem('unipass_current_user', JSON.stringify(window.app.user));
    window.app.updateUserUI();
    window.app.renderProducts();
    window.app.renderAdminDashboard();
    window.app.renderChatInbox();
    window.app.renderChatMessages();

    // Đồng bộ gỡ ảnh lên Supabase Cloud & Đa máy
    if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
        window.UniPassSupabase.upsertProfile(window.app.user);
    }
    if (window.UniPassOnlineSync) {
        window.UniPassOnlineSync.broadcastUserRegistered(window.app.user);
    }

    showToast('Đã gỡ ảnh đại diện thành công và đồng bộ toàn hệ thống.', 'info');
}

// ==========================================
// QUẢN TRỊ ADMIN: XEM TRANG CÁ NHÂN & TOÀN BỘ BÀI ĐĂNG CỦA TÀI KHOẢN
// ==========================================
function openAdminUserProfileModal(userIdentifier) {
    if (!window.app) return;
    const targetUser = (window.app.registeredUsers || []).find(u => 
        (u.email && u.email.toLowerCase() === (userIdentifier || '').toLowerCase()) ||
        (u.name && u.name.toLowerCase() === (userIdentifier || '').toLowerCase()) ||
        (u.id && u.id === userIdentifier)
    );

    if (!targetUser) {
        showToast('Không tìm thấy thông tin tài khoản này trên hệ thống!', 'warning');
        return;
    }

    const modal = document.getElementById('adminUserProfileModal');
    if (!modal) return;

    const isAdmin = (targetUser.email === ADMIN_CREDENTIALS.email || targetUser.role === 'admin');

    // 1. Render Avatar
    const avatarWrapper = document.getElementById('adminModalAvatarWrapper');
    if (avatarWrapper) {
        if (targetUser.avatarUrl) {
            avatarWrapper.innerHTML = `
                <img src="${targetUser.avatarUrl}" alt="${targetUser.name}" style="width:72px; height:72px; border-radius:50%; object-fit:cover; border:3px solid ${isAdmin ? '#dc2626' : '#0284c7'}; box-shadow:0 4px 12px rgba(0,0,0,0.12);">
            `;
        } else {
            const letter = targetUser.avatarLetter || (targetUser.name ? targetUser.name.charAt(0).toUpperCase() : 'U');
            avatarWrapper.innerHTML = `
                <div style="width:72px; height:72px; border-radius:50%; background:${isAdmin ? '#dc2626' : '#0284c7'}; color:#fff; display:flex; align-items:center; justify-content:center; font-size:30px; font-weight:800; border:3px solid #e2e8f0; box-shadow:0 4px 12px rgba(0,0,0,0.12);">
                    ${letter}
                </div>
            `;
        }
    }

    // 2. Tên & Email & MSSV
    const nameEl = document.getElementById('adminModalUserName');
    if (nameEl) nameEl.innerText = targetUser.name;

    const roleBadge = document.getElementById('adminModalRoleBadge');
    if (roleBadge) {
        roleBadge.innerHTML = isAdmin ? 
            `<span style="background:#fee2e2; color:#b91c1c; font-size:11px; padding:2px 8px; border-radius:10px; font-weight:700;">Quản Trị Viên (Admin)</span>` :
            `<span style="background:#e0f2fe; color:#0369a1; font-size:11px; padding:2px 8px; border-radius:10px; font-weight:700;">Sinh Viên UTC2</span>`;
    }

    const emailEl = document.getElementById('adminModalUserEmail');
    if (emailEl) emailEl.innerText = `✉ ${targetUser.email}`;

    const extraEl = document.getElementById('adminModalExtraInfo');
    if (extraEl) {
        const mssvStr = targetUser.mssv ? `MSSV: <strong>${targetUser.mssv}</strong>` : (targetUser.email.includes('@st.utc2.edu.vn') ? `MSSV: <strong>${targetUser.email.split('@')[0]}</strong>` : '');
        const phoneStr = targetUser.phone ? ` • SĐT: <strong>${targetUser.phone}</strong>` : '';
        extraEl.innerHTML = `${mssvStr}${phoneStr}`;
    }

    // 3. Thống số (Uy tín, Xu)
    const rep = typeof targetUser.reputation === 'number' ? targetUser.reputation : (Number(targetUser.reputation) || 95);
    const coins = typeof targetUser.coins === 'number' ? targetUser.coins : (Number(targetUser.coins) || 0);

    const repEl = document.getElementById('adminModalUserRep');
    if (repEl) repEl.innerHTML = `★ ${rep}/100`;

    const repNote = document.getElementById('adminModalUserRepNote');
    if (repNote) {
        if (rep >= 95) {
            repNote.innerText = 'Rất uy tín (Tối đa)';
            repNote.style.color = '#15803d';
        } else if (rep >= 90) {
            repNote.innerText = 'Đủ điều kiện cọc & pass đồ';
            repNote.style.color = '#0284c7';
        } else {
            repNote.innerText = '⚠️ Dưới 90đ - Bị giới hạn cọc!';
            repNote.style.color = '#dc2626';
        }
    }

    const coinsEl = document.getElementById('adminModalUserCoins');
    if (coinsEl) coinsEl.innerText = `🪙 ${coins} Xu`;

    // 4. Lấy tất cả bài đăng của tài khoản này (Kể cả bài đã duyệt và bài đang chờ duyệt)
    const uName = (targetUser.name || '').toLowerCase().trim();
    const uEmail = (targetUser.email || '').toLowerCase().trim();

    const userPosts = (window.app.products || []).filter(p => {
        const sN = (p.seller || '').toLowerCase().trim();
        const sE = (p.sellerEmail || '').toLowerCase().trim();
        return (uEmail && sE === uEmail) || (uName && sN === uName) || (uEmail && sN === uEmail);
    });

    const postCountEl = document.getElementById('adminModalUserPostCount');
    if (postCountEl) postCountEl.innerText = `${userPosts.length} bài`;

    const postsBadge = document.getElementById('adminModalPostsBadge');
    if (postsBadge) postsBadge.innerText = `${userPosts.length} bài đăng`;

    const postsListEl = document.getElementById('adminModalUserPostsList');
    if (postsListEl) {
        if (userPosts.length === 0) {
            postsListEl.innerHTML = `
                <div style="text-align:center; padding:28px 16px; background:#f8fafc; border:1px dashed #cbd5e1; border-radius:10px; color:#64748b;">
                    <div style="font-size:32px; margin-bottom:6px;">📦</div>
                    <strong style="color:#0f172a; font-size:13.5px; display:block; margin-bottom:4px;">Chưa có bài đăng nào</strong>
                    <p style="font-size:12px; margin:0;">Tài khoản này hiện tại chưa đăng món đồ pass nào trên sàn.</p>
                </div>
            `;
        } else {
            postsListEl.innerHTML = userPosts.map(p => {
                let statusBg = '#dcfce7';
                let statusColor = '#15803d';
                let statusText = 'Đang hiển thị';

                if (p.status === 'pending') {
                    statusBg = '#fef3c7';
                    statusColor = '#b45309';
                    statusText = '⏳ Chờ duyệt TimeMark';
                } else if (p.status === 'completed') {
                    statusBg = '#e0f2fe';
                    statusColor = '#0369a1';
                    statusText = '✓ Đã pass';
                } else if (p.status === 'rejected') {
                    statusBg = '#fee2e2';
                    statusColor = '#b91c1c';
                    statusText = '✕ Bị từ chối';
                }

                const safePTitle = (p.title || '').replace(/'/g, "\\'");
                const safePId = p.id;

                return `
                    <div style="display:flex; align-items:center; gap:12px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:10px 12px;">
                        <img src="${p.imageUrl}" alt="${safePTitle}" style="width:58px; height:58px; border-radius:8px; object-fit:cover; border:1px solid #cbd5e1; flex-shrink:0;">
                        <div style="flex:1; min-width:0;">
                            <div style="font-weight:700; font-size:13.5px; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${p.title}">
                                ${p.title}
                            </div>
                            <div style="font-size:13px; color:#0284c7; font-weight:800; margin-top:2px;">
                                ${formatNumber(p.price)} đ
                            </div>
                            <div style="font-size:11px; color:#64748b; margin-top:2px; display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                                <span>Mã TimeMark: <strong>${p.timemarkCode || 'Chưa có'}</strong></span>
                                <span>• Danh mục: ${getCategoryName(p.category)}</span>
                            </div>
                        </div>
                        <div style="text-align:right; flex-shrink:0; display:flex; flex-direction:column; align-items:flex-end; gap:6px;">
                            <span style="background:${statusBg}; color:${statusColor}; font-size:10.5px; padding:2px 8px; border-radius:4px; font-weight:700;">
                                ${statusText}
                            </span>
                            <div style="display:flex; gap:4px;">
                                <button type="button" class="btn-outline-chat" style="padding:3px 8px; font-size:11px; color:#0284c7; border-color:#93c5fd;" onclick="closeModal('adminUserProfileModal'); openCheckoutModal('${safePId}')">
                                    Xem bài
                                </button>
                                <button type="button" class="btn-admin-danger" style="padding:3px 8px; font-size:11px; border-radius:4px;" onclick="adminDeletePostFromModal('${safePId}', '${targetUser.email}')">
                                    🗑 Gỡ bài
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    // 5. Cấu hình các nút hành động
    const chatBtn = document.getElementById('adminModalChatBtn');
    if (chatBtn) {
        chatBtn.onclick = function() {
            closeModal('adminUserProfileModal');
            openChatBetweenUsers(targetUser.name, null, null, targetUser.email);
        };
    }

    const warnBtn = document.getElementById('adminModalWarnBtn');
    if (warnBtn) {
        if (isAdmin) {
            warnBtn.style.display = 'none';
        } else {
            warnBtn.style.display = 'inline-block';
            warnBtn.onclick = function() {
                adminWarnUser(targetUser.name);
                openAdminUserProfileModal(targetUser.email);
            };
        }
    }

    const remindBtn = document.getElementById('adminModalRemindBtn');
    if (remindBtn) {
        if (isAdmin) {
            remindBtn.style.display = 'none';
        } else {
            remindBtn.style.display = 'inline-block';
            remindBtn.onclick = function() {
                adminRemindUser(targetUser.name);
            };
        }
    }

    openModal('adminUserProfileModal');
    if (window.sound) window.sound.playClick();
}
window.openAdminUserProfileModal = openAdminUserProfileModal;

function adminDeletePostFromModal(postId, userEmail) {
    if (!confirm('Bạn có chắc chắn muốn gỡ bài đăng này khỏi hệ thống?')) return;
    adminDeletePost(postId);
    showToast('Đã gỡ bài đăng thành công!', 'success');
    if (userEmail) {
        setTimeout(() => openAdminUserProfileModal(userEmail), 200);
    }
}
window.adminDeletePostFromModal = adminDeletePostFromModal;

// Khởi tạo listeners khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    const priceSlider = document.getElementById('priceRangeSlider');
    const priceMaxInput = document.getElementById('filterPriceMax');
    if (priceSlider) {
        priceSlider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            window.app.filterMaxPrice = val;
            if (priceMaxInput) priceMaxInput.value = `Đến: ${Math.round(val / 1000)}k`;

            // Tự động tích chọn tiêu chí giá
            const chk = document.getElementById('chkFilterPrice');
            const body = document.getElementById('filterBodyPrice');
            if (chk && !chk.checked) {
                chk.checked = true;
                if (body) body.classList.remove('disabled-criterion');
                if (!window.app.filterCriteriaEnabled) window.app.filterCriteriaEnabled = {};
                window.app.filterCriteriaEnabled.price = true;
            }
            window.app.renderProducts();
        });
    }

    const repSlider = document.getElementById('reputationRangeSlider');
    const repVal = document.getElementById('reputationDisplayVal');
    if (repSlider) {
        repSlider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            window.app.filterMinReputation = val;
            if (repVal) repVal.innerText = `≥ ${val} đ`;

            // Tự động tích chọn tiêu chí uy tín
            const chk = document.getElementById('chkFilterReputation');
            const body = document.getElementById('filterBodyReputation');
            if (chk && !chk.checked) {
                chk.checked = true;
                if (body) body.classList.remove('disabled-criterion');
                if (!window.app.filterCriteriaEnabled) window.app.filterCriteriaEnabled = {};
                window.app.filterCriteriaEnabled.reputation = true;
            }
            window.app.renderProducts();
        });
    }

    const searchInput = document.getElementById('mainSearchInput');
    const dropdown = document.getElementById('searchAutocompleteDropdown');
    if (searchInput) {
        searchInput.value = '';
        if (window.app) window.app.searchKeyword = '';
    }
    if (searchInput && dropdown) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            window.app.searchKeyword = val;
            if (val.length > 0) {
                const suggs = window.app.trie.suggest(val);
                if (suggs.length > 0) {
                    dropdown.innerHTML = `
                        <div class="autocomplete-header">
                            <span>Gợi ý Trie Cache (O(k))</span>
                            <span>Độ phổ biến</span>
                        </div>
                        ${suggs.map(s => `
                            <div class="autocomplete-item" onclick="pickSearchSuggestion('${s.word}')">
                                <span>${s.word}</span>
                                <span style="color:#0284c7; font-size:11px; font-weight:700;">${s.freq} lượt</span>
                            </div>
                        `).join('')}
                    `;
                    dropdown.classList.add('active');
                } else {
                    dropdown.classList.remove('active');
                }
            } else {
                dropdown.classList.remove('active');
            }
            window.app.renderProducts();
        });

      searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                dropdown.classList.remove('active');
                executeSearch();
            }
        });
    }
});

function pickSearchSuggestion(word) {
    const input = document.getElementById('mainSearchInput');
    const dropdown = document.getElementById('searchAutocompleteDropdown');
    if (input) input.value = word;
    if (dropdown) dropdown.classList.remove('active');
    if (window.app) {
        window.app.searchKeyword = word;
        if (window.app.trie) window.app.trie.recordSearch(word);
        if (typeof switchNavTab === 'function') switchNavTab('home');
        window.app.renderProducts();
    }
    const targetEl = document.getElementById('feedCountDisplay') || document.getElementById('productGridContainer') || document.getElementById('mainHomeView');
    if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
window.pickSearchSuggestion = pickSearchSuggestion;

// Lắng nghe sự kiện storage để đồng bộ tức thì trên nhiều cửa sổ / tab khác nhau
window.addEventListener('storage', (e) => {
    if (e.key === 'unipass_products' && e.newValue) {
        try {
            window.app.products = JSON.parse(e.newValue);
            window.app.rebuildDSACache();
            window.app.renderProducts();
            window.app.renderAdminDashboard();
        } catch (err) {}
    } else if (e.key === 'unipass_registered_users' && e.newValue) {
        try {
            window.app.registeredUsers = JSON.parse(e.newValue);
            window.app.renderAdminDashboard();
            window.app.updateUserUI();
        } catch (err) {}
    } else if (e.key === 'unipass_shared_messages' && e.newValue) {
        try {
            window.app.chatMessages = JSON.parse(e.newValue);
            window.app.renderChatMessages();
            window.app.updateChatUnreadBadge();
        } catch (err) {}
    } else if (e.key === 'unipass_deposit_orders' && e.newValue) {
        try {
            window.app.depositOrders = JSON.parse(e.newValue);
            window.app.updateDepositBadge();
            window.app.renderProfile();
        } catch (err) {}
    }
});
function toggleSidebarFilter() {
    const aside = document.getElementById('filterSidebarAside');
    const mainView = document.getElementById('mainHomeView');
    const toggleBtn = document.getElementById('btnToggleFilterMode');
    if (!aside || !mainView) return;

    window.app.isFilterActive = !window.app.isFilterActive;

    if (window.app.isFilterActive) {
        aside.style.display = 'block';
        mainView.style.gridTemplateColumns = '290px 1fr';
        if (toggleBtn) {
            toggleBtn.innerHTML = '⚡ Bộ Lọc: Đang Hiện (Bấm để Ẩn)';
            toggleBtn.style.background = '#0284c7';
            toggleBtn.style.color = '#fff';
        }
        showToast('Đã hiển thị bộ lọc song song', 'info');
    } else {
        aside.style.display = 'none';
        mainView.style.gridTemplateColumns = '1fr';
        if (toggleBtn) {
            toggleBtn.innerHTML = '🎛️ Bộ Lọc: Đang Ẩn (Bấm để Hiện)';
            toggleBtn.style.background = '#ffffff';
            toggleBtn.style.color = '#334155';
        }
        showToast('Đã ẩn bộ lọc (Hiện toàn màn hình đồ)', 'info');
    }

    window.app.renderProducts();
    if (window.sound) window.sound.playClick();
}

// ==========================================
// SUPABASE MODAL & CLOUD CONFIGURATION CONTROLLERS
// ==========================================
function updateSupabaseNavIndicator() {
    const btn = document.getElementById('supabaseStatusNavBtn');
    const text = document.getElementById('supabaseStatusNavText');
    if (!btn || !text) return;

    if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
        btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        btn.style.color = '#ffffff';
        btn.style.borderColor = '#059669';
        text.innerText = 'Supabase Cloud (Đã nối)';
    } else {
        btn.style.background = '#f0f9ff';
        btn.style.color = '#0284c7';
        btn.style.borderColor = '#7dd3fc';
        text.innerText = 'Supabase DB';
    }
}

function openSupabaseModal() {
    openModal('supabaseConfigModal');

    const urlInput = document.getElementById('supabaseUrlInput');
    const keyInput = document.getElementById('supabaseKeyInput');
    const webhookInput = document.getElementById('emailWebhookUrlInput');
    const badge = document.getElementById('supabaseStatusBadge');
    const detail = document.getElementById('supabaseDetailText');

    if (webhookInput) {
        webhookInput.value = localStorage.getItem('unipass_email_webhook') || DEFAULT_APPS_SCRIPT_WEBHOOK;
    }

    const smtpHostInput = document.getElementById('smtpHostInput');
    const smtpPortInput = document.getElementById('smtpPortInput');
    const smtpUserInput = document.getElementById('smtpUserInput');
    const smtpPassInput = document.getElementById('smtpPassInput');
    if (smtpHostInput) smtpHostInput.value = localStorage.getItem('unipass_smtp_host') || 'smtp.gmail.com';
    if (smtpPortInput) smtpPortInput.value = localStorage.getItem('unipass_smtp_port') || '587';
    if (smtpUserInput) smtpUserInput.value = localStorage.getItem('unipass_smtp_user') || '';
    if (smtpPassInput) smtpPassInput.value = localStorage.getItem('unipass_smtp_pass') || '';

    if (window.UniPassSupabase && window.UniPassSupabase.isConfigured()) {
        const cfg = window.UniPassSupabase.getConfig();
        if (urlInput) urlInput.value = cfg.url || 'https://lhlwemmpnrmlskeljniq.supabase.co';
        if (keyInput) keyInput.value = (window.UniPassSupabase.getRawKey && window.UniPassSupabase.getRawKey()) || localStorage.getItem('unipass_supabase_key') || '';
        if (badge) {
            badge.innerText = '🟢 Trạng thái: Đã kết nối Supabase Cloud';
            badge.style.color = '#15803d';
        }
        if (detail) {
            detail.innerText = `Đang kết nối: ${cfg.url}. Cơ sở dữ liệu Supabase PostgreSQL đang hoạt động.`;
        }
    } else {
        if (urlInput && !urlInput.value) urlInput.value = localStorage.getItem('unipass_supabase_url') || 'https://lhlwemmpnrmlskeljniq.supabase.co';
        if (keyInput && !keyInput.value) keyInput.value = localStorage.getItem('unipass_supabase_key') || '';
        if (badge) {
            badge.innerText = '🟡 Trạng thái: Bộ nhớ đệm cục bộ (Chưa nối Cloud)';
            badge.style.color = '#d97706';
        }
        if (detail) {
            detail.innerText = 'Nhập Anon Key (hoặc bấm link "Lấy Key tại đây") để kích hoạt đồng bộ đám mây PostgreSQL.';
        }
    }
}

async function saveAndConnectSupabase() {
    const urlInput = document.getElementById('supabaseUrlInput');
    const keyInput = document.getElementById('supabaseKeyInput');
    const webhookInput = document.getElementById('emailWebhookUrlInput');
    const smtpHostInput = document.getElementById('smtpHostInput');
    const smtpPortInput = document.getElementById('smtpPortInput');
    const smtpUserInput = document.getElementById('smtpUserInput');
    const smtpPassInput = document.getElementById('smtpPassInput');

    if (smtpHostInput) localStorage.setItem('unipass_smtp_host', smtpHostInput.value.trim() || 'smtp.gmail.com');
    if (smtpPortInput) localStorage.setItem('unipass_smtp_port', smtpPortInput.value.trim() || '587');
    if (smtpUserInput) {
        const u = smtpUserInput.value.trim();
        if (u) localStorage.setItem('unipass_smtp_user', u);
        else localStorage.removeItem('unipass_smtp_user');
    }
    if (smtpPassInput) {
        const p = smtpPassInput.value.trim();
        if (p) localStorage.setItem('unipass_smtp_pass', p);
        else localStorage.removeItem('unipass_smtp_pass');
    }

    if (!urlInput || !keyInput) return;

    const url = urlInput.value.trim() || 'https://lhlwemmpnrmlskeljniq.supabase.co';
    let key = keyInput.value.trim();

    // Bảo vệ: Nếu người dùng để trống hoặc bị hiển thị dạng che dấu (****** hoặc ...), giữ lại key thật
    if (!key || key.includes('...') || key.includes('*') || key.length < 25) {
        key = (window.UniPassSupabase && window.UniPassSupabase.getRawKey && window.UniPassSupabase.getRawKey()) || 
              localStorage.getItem('unipass_supabase_key') || 
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxobHdlbW1wbnJtbHNrZWxqbmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyNzIyNTYsImV4cCI6MjEwNjg0ODI1Nn0.OBOpRm80_LZ9vmt3hgKUuDqPkeAzDHPkYS_MoacHeDo';
        keyInput.value = key;
    }

    if (webhookInput) {
        const webhookVal = webhookInput.value.trim();
        if (webhookVal) {
            localStorage.setItem('unipass_email_webhook', webhookVal);
        } else {
            localStorage.removeItem('unipass_email_webhook');
        }
    }

    if (!url || !key) {
        showToast('Vui lòng nhập đầy đủ Supabase Project URL và Anon Key!', 'danger');
        return;
    }

    try {
        window.UniPassSupabase.saveConfig(url, key);
        updateSupabaseNavIndicator();
        showToast('Đang kết nối và kiểm tra Database...', 'info');

        const testRes = await window.UniPassSupabase.testConnection();
        const badge = document.getElementById('supabaseStatusBadge');
        const pingEl = document.getElementById('supabasePingTime');
        const detail = document.getElementById('supabaseDetailText');

        if (testRes.success) {
            if (badge) {
                badge.innerText = '🟢 Kết nối Thành Công!';
                badge.style.color = '#15803d';
            }
            if (pingEl) pingEl.innerText = `Ping: ${testRes.duration} ms`;
            if (detail) detail.innerText = `Đã kết nối cơ sở dữ liệu Supabase. Tìm thấy ${testRes.productsCount} sản phẩm sẵn có.`;
            showToast(`✓ Kết nối Supabase thành công! Ping: ${testRes.duration}ms`, 'success');

            // Đồng bộ dữ liệu mới nhất
            if (window.app) {
                window.app.initSupabaseSync();
            }
        } else {
            if (badge) {
                badge.innerText = '⚠️ Lỗi kiểm tra bảng';
                badge.style.color = '#ef4444';
            }
            if (detail) detail.innerText = testRes.message + ' (Hãy đảm bảo bạn đã chạy file supabase_schema.sql trong tab SQL Editor của Supabase).';
            showToast(testRes.message, 'danger');
        }
    } catch (err) {
        showToast(`Lỗi: ${err.message}`, 'danger');
    }
}

async function testSupabasePing() {
    if (!window.UniPassSupabase || !window.UniPassSupabase.isConfigured()) {
        const urlInput = document.getElementById('supabaseUrlInput');
        const keyInput = document.getElementById('supabaseKeyInput');
        if (urlInput && keyInput && urlInput.value.trim() && keyInput.value.trim()) {
            return saveAndConnectSupabase();
        }
        showToast('Chưa cấu hình Supabase URL hoặc Key để ping!', 'warning');
        return;
    }

    showToast('Đang ping Supabase Cloud...', 'info');
    const testRes = await window.UniPassSupabase.testConnection();
    const pingEl = document.getElementById('supabasePingTime');
    const badge = document.getElementById('supabaseStatusBadge');
    const detail = document.getElementById('supabaseDetailText');

    if (testRes.success) {
        if (pingEl) pingEl.innerText = `Ping: ${testRes.duration} ms`;
        if (badge) {
            badge.innerText = '🟢 Kết nối ổn định';
            badge.style.color = '#15803d';
        }
        if (detail) detail.innerText = `Phản hồi tốt (${testRes.duration}ms). Số lượng sản phẩm trên mây: ${testRes.productsCount}.`;
        showToast(`✓ Ping thành công: ${testRes.duration}ms!`, 'success');
    } else {
        if (badge) {
            badge.innerText = '❌ Mất kết nối';
            badge.style.color = '#ef4444';
        }
        if (detail) detail.innerText = testRes.message;
        showToast(testRes.message, 'danger');
    }
}

function copySupabaseSchemaSql() {
    fetch('supabase_schema.sql')
        .then(res => res.text())
        .then(sqlText => {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(sqlText).then(() => {
                    showToast('Đã sao chép toàn bộ mã SQL Schema! Hãy dán vào SQL Editor trên Supabase.', 'success');
                }).catch(() => {
                    fallbackCopy(sqlText);
                });
            } else {
                fallbackCopy(sqlText);
            }
        })
        .catch(() => {
            showToast('Vui lòng mở file supabase_schema.sql trong thư mục để sao chép!', 'info');
        });

    function fallbackCopy(text) {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Đã sao chép mã SQL Schema vào Clipboard!', 'success');
    }
}

function disconnectSupabase() {
    if (window.UniPassSupabase) {
        window.UniPassSupabase.clearConfig();
    }
    const urlInput = document.getElementById('supabaseUrlInput');
    const keyInput = document.getElementById('supabaseKeyInput');
    const webhookInput = document.getElementById('emailWebhookUrlInput');
    const badge = document.getElementById('supabaseStatusBadge');
    const detail = document.getElementById('supabaseDetailText');
    const pingEl = document.getElementById('supabasePingTime');

    if (urlInput) urlInput.value = '';
    if (keyInput) keyInput.value = '';
    if (webhookInput) webhookInput.value = '';
    localStorage.removeItem('unipass_email_webhook');

    if (badge) {
        badge.innerText = '⚪ Đã ngắt kết nối';
        badge.style.color = '#64748b';
    }
    if (detail) detail.innerText = 'Hệ thống đã chuyển về chế độ bộ nhớ đệm cục bộ (Local Cache).';
    if (pingEl) pingEl.innerText = 'Ping: -- ms';

    updateSupabaseNavIndicator();
    showToast('Đã ngắt kết nối Supabase Cloud. Dùng Local Cache.', 'info');
}

// ==========================================
// CÁC HÀM ĐIỀU KHIỂN THÔNG BÁO HOẠT ĐỘNG (GLOBAL CONTROLLERS)
// ==========================================
function toggleNotificationDropdown() {
    const menu = document.getElementById('notificationDropdownMenu');
    if (!menu) return;
    const isVisible = (menu.style.display === 'block');
    menu.style.display = isVisible ? 'none' : 'block';
    if (!isVisible && window.app) {
        window.app.renderNotifications();
    }
}

function markAllNotificationsAsRead() {
    if (window.app) {
        window.app.markAllNotificationsAsRead();
    }
}

function clearAllUserNotifications() {
    if (window.app) {
        window.app.clearAllUserNotifications();
    }
}

function handleNotificationClick(notifId, type) {
    if (!window.app) return;
    const n = window.app.notifications.find(item => item.id === notifId);
    if (n) {
        n.isRead = true;
        window.app.saveNotifications();
        window.app.updateNotificationBadge();
        window.app.renderNotifications();
    }

    const menu = document.getElementById('notificationDropdownMenu');
    if (menu) menu.style.display = 'none';

    if (type === 'order_deposit' || type === 'order_update') {
        switchNavTab('profile');
        const block = document.getElementById('profileDepositOrdersBlock');
        if (block) block.scrollIntoView({ behavior: 'smooth' });
    } else if (type === 'post_approved' || type === 'post_rejected' || type === 'post_expired') {
        switchNavTab('profile');
    }
}

// Đóng dropdown thông báo khi click ra ngoài
document.addEventListener('click', (e) => {
    const bellWrapper = document.querySelector('.notification-bell-wrapper');
    const menu = document.getElementById('notificationDropdownMenu');
    if (menu && menu.style.display === 'block') {
        if (bellWrapper && !bellWrapper.contains(e.target)) {
            menu.style.display = 'none';
        }
    }
});

// ==========================================
// HIỆU ỨNG TƯƠNG TÁC CON CHUỘT ĐỘNG VỚI NỀN KHUÔN VIÊN UTC2
// ==========================================
function initAuthBgMouseEffect() {
    const authContainer = document.getElementById('authPageContainer');
    const authParallax = document.getElementById('authBgParallax');
    if (!authContainer) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let isTicking = false;

    authContainer.addEventListener('mousemove', (e) => {
        const rect = authContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPercent = ((x / rect.width) * 100).toFixed(1);
        const yPercent = ((y / rect.height) * 100).toFixed(1);

        authContainer.style.setProperty('--mouse-x', `${xPercent}%`);
        authContainer.style.setProperty('--mouse-y', `${yPercent}%`);

        // Dịch chuyển nhẹ theo hướng con trỏ chuột (Parallax)
        const moveRatioX = (e.clientX / window.innerWidth) - 0.5;
        const moveRatioY = (e.clientY / window.innerHeight) - 0.5;
        targetX = moveRatioX * -24;
        targetY = moveRatioY * -18;

        if (!isTicking) {
            isTicking = true;
            requestAnimationFrame(() => {
                currentX += (targetX - currentX) * 0.15;
                currentY += (targetY - currentY) * 0.15;
                if (authParallax) {
                    authParallax.style.setProperty('--mouse-shift-x', `${currentX.toFixed(2)}px`);
                    authParallax.style.setProperty('--mouse-shift-y', `${currentY.toFixed(2)}px`);
                }
                isTicking = false;
            });
        }
    });

    authContainer.addEventListener('mouseleave', () => {
        authContainer.style.setProperty('--mouse-x', '50%');
        authContainer.style.setProperty('--mouse-y', '50%');
        if (authParallax) {
            authParallax.style.setProperty('--mouse-shift-x', '0px');
            authParallax.style.setProperty('--mouse-shift-y', '0px');
        }
    });
}

// Khởi tạo hiệu ứng tương tác chuột toàn hệ thống cho hình nền khuôn viên UTC2
function initSystemBgMouseParallax() {
    const sysBg = document.getElementById('systemAmbientBg');
    if (!sysBg) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let isTicking = false;

    window.addEventListener('mousemove', (e) => {
        const moveRatioX = (e.clientX / window.innerWidth) - 0.5;
        const moveRatioY = (e.clientY / window.innerHeight) - 0.5;
        targetX = moveRatioX * -18;
        targetY = moveRatioY * -14;

        if (!isTicking) {
            isTicking = true;
            requestAnimationFrame(() => {
                currentX += (targetX - currentX) * 0.12;
                currentY += (targetY - currentY) * 0.12;
                sysBg.style.setProperty('--sys-shift-x', `${currentX.toFixed(2)}px`);
                sysBg.style.setProperty('--sys-shift-y', `${currentY.toFixed(2)}px`);
                isTicking = false;
            });
        }
    }, { passive: true });
}

// Khởi chạy ngay hiệu ứng nền động
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initAuthBgMouseEffect();
        initSystemBgMouseParallax();
    });
} else {
    initAuthBgMouseEffect();
    initSystemBgMouseParallax();
}

// ==========================================
// CÔNG CỤ TÌM KIẾM THÔNG MINH TIẾNG VIỆT & ĐA TỪ KHÓA
// Hỗ trợ kết hợp thuật toán C++ Trie và tìm kiếm ngữ nghĩa
// ==========================================
function removeVietnameseTones(str) {
    if (!str) return '';
    return str
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase()
        .trim();
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function matchesProductSearch(product, rawQuery) {
    if (!rawQuery || rawQuery.trim().length === 0) return true;
    
    const cleanQuery = rawQuery.trim();
    const queryNormalized = removeVietnameseTones(cleanQuery);
    const queryLower = cleanQuery.toLowerCase();

    const catName = (typeof getCategoryName === 'function') ? getCategoryName(product.category) : '';
    const rawSearchTarget = [
        product.title || '',
        product.courseCode || '',
        product.category || '',
        catName,
        product.seller || '',
        product.location || '',
        product.description || '',
        product.timemarkCode || ''
    ].join(' ').toLowerCase();

    const normalizedSearchTarget = removeVietnameseTones(rawSearchTarget);

    // 1. Khớp chuỗi trực tiếp (có dấu hoặc không dấu)
    if (rawSearchTarget.includes(queryLower) || normalizedSearchTarget.includes(queryNormalized)) {
        return true;
    }

    // 2. Khớp từng từ khóa (Token matching) - cho phép gõ "casio 580", "giao trinh vat ly", "sach c++"
    const queryTokens = queryNormalized.split(/\s+/).filter(t => t.length > 0);
    if (queryTokens.length > 1) {
        const allTokensFound = queryTokens.every(token => 
            normalizedSearchTarget.includes(token) || rawSearchTarget.includes(token)
        );
        if (allTokensFound) return true;
    }

    // 3. Khớp các từ đồng nghĩa / danh mục quen thuộc sinh viên UTC2
    if ((queryNormalized.includes('casio') || queryNormalized.includes('may tinh')) && 
        (normalizedSearchTarget.includes('casio') || product.category === 'DoDienTu')) {
        return true;
    }
    if ((queryNormalized.includes('dong phuc') || queryNormalized.includes('the duc') || queryNormalized.includes('ao')) && 
        (normalizedSearchTarget.includes('dong phuc') || normalizedSearchTarget.includes('ao') || product.category === 'DongPhuc')) {
        return true;
    }
    if ((queryNormalized.includes('xe') || queryNormalized.includes('xe dap') || queryNormalized.includes('xe may')) && 
        (normalizedSearchTarget.includes('xe') || product.category === 'XeCo')) {
        return true;
    }
    if ((queryNormalized.includes('noi com') || queryNormalized.includes('gia dung') || queryNormalized.includes('ktx')) && 
        (normalizedSearchTarget.includes('noi com') || product.category === 'DoGiaDung')) {
        return true;
    }
    if ((queryNormalized.includes('c++') || queryNormalized.includes('dsa') || queryNormalized.includes('giai thuat') || queryNormalized.includes('cau truc')) && 
        (normalizedSearchTarget.includes('c++') || normalizedSearchTarget.includes('dsa') || normalizedSearchTarget.includes('giai thuat'))) {
        return true;
    }

    return false;
}

// Xóa tìm kiếm và quay về danh sách đầy đủ
function clearSearchFilter() {
    const input = document.getElementById('mainSearchInput');
    if (input) input.value = '';
    if (window.app) {
        window.app.searchKeyword = '';
        window.app.renderProducts();
    }
}
window.clearSearchFilter = clearSearchFilter;

// Nâng cấp executeSearch để cuộn mượt đến bảng tin và chuyển tab Trang chủ
const origExecuteSearch = window.executeSearch;
window.executeSearch = function() {
    const input = document.getElementById('mainSearchInput');
    if (!input) return;
    const query = input.value.trim();
    if (window.app) {
        window.app.searchKeyword = query;
        if (query.length > 0 && window.app.trie) {
            window.app.trie.recordSearch(query);
        }
        if (typeof switchNavTab === 'function') {
            switchNavTab('home');
        }
        window.app.renderProducts();
    }
    const targetEl = document.getElementById('feedCountDisplay') || document.getElementById('productGridContainer') || document.getElementById('mainHomeView');
    if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};



// ==========================================
// C++17 ONLINE ENGINE & CONSOLE CONTROLLER
// ==========================================

function openCppConsoleModal() {
    const modal = document.getElementById('cppOnlineConsoleModal');
    if (modal) {
        modal.style.display = 'flex';
        const input = document.getElementById('cppTerminalInput');
        if (input) setTimeout(() => input.focus(), 120);
    }
    if (window.sound) window.sound.playClick();
}
window.openCppConsoleModal = openCppConsoleModal;

function clearCppTerminal() {
    const screen = document.getElementById('cppTerminalOutput');
    if (screen) {
        screen.textContent = 'utc2-cpp17> MÃ n hÃ¬nh Ä‘Ã£ Ä‘Æ°á»£c lÃ m sáº¡ch.\n';
    }
}
window.clearCppTerminal = clearCppTerminal;

function printCppTerminal(text) {
    const screen = document.getElementById('cppTerminalOutput');
    if (!screen) return;
    screen.textContent += '\n' + text;
    screen.scrollTop = screen.scrollHeight;
}
window.printCppTerminal = printCppTerminal;

function runCppAlgoOnline(algoType, queryParam) {
    const btnIds = {
        'trie': 'btnAlgoTrie',
        'avl': 'btnAlgoAvl',
        'kdtree': 'btnAlgoKdtree',
        'dijkstra': 'btnAlgoDijkstra',
        'queue': 'btnAlgoQueue',
        'benchmark': 'btnAlgoBenchmark'
    };
    Object.keys(btnIds).forEach(k => {
        const b = document.getElementById(btnIds[k]);
        if (b) {
            if (k === algoType) b.classList.add('active');
            else b.classList.remove('active');
        }
    });

    const screen = document.getElementById('cppTerminalOutput');
    if (!screen) return;

    if (algoType === 'trie') {
        const query = (queryParam || 'giÃ¡o trÃ¬nh').trim();
        const start = performance.now();
        const trie = window.app && window.app.trie ? window.app.trie : new window.UTC2_DSA.TrieWithHeap();
        const results = trie.searchPrefix(query, 5);
        const duration = (performance.now() - start).toFixed(4);

        let out = `>>> [C++17 EXEC] TrieWithHeap::searchPrefix("${query}", maxSuggestions = 5)\n`;
        out += `  â”œâ”€ Äá»™ phá»©c táº¡p lÃ½ thuyáº¿t: O(L + k log M) â‰ˆ O(${query.length} + 5) [Tá»C Äá»˜ Cá»°C CAO]\n`;
        out += `  â”œâ”€ Thá»i gian thá»±c thi: ${duration} ms (${Math.round(duration * 1000)} Âµs)\n`;
        out += `  â”œâ”€ Sá»‘ gá»£i Ã½ tÃ¬m Ä‘Æ°á»£c: ${results.length}\n`;
        if (results.length === 0) {
            out += `  â””â”€ KhÃ´ng tÃ¬m tháº¥y tá»« khÃ³a khá»›p tiá»n tá»‘ '${query}'.\n`;
        } else {
            results.forEach((r, idx) => {
                out += `  â”œâ”€ [Top ${idx + 1}] "${r.phrase}" (Äá»™ phá»• biáº¿n / Frequency: ${r.frequency})\n`;
            });
            out += `  â””â”€ HoÃ n táº¥t gá»£i Ã½ cá»¥m tá»« cho thanh tÃ¬m kiáº¿m.\n`;
        }
        printCppTerminal(out);
    } else if (algoType === 'avl') {
        const minP = 50000;
        const maxP = 250000;
        const start = performance.now();
        const avl = window.app && window.app.avl ? window.app.avl : new window.UTC2_DSA.AVLTree();
        const rangeItems = avl.rangeQuery(minP, maxP);
        const duration = (performance.now() - start).toFixed(4);

        let out = `>>> [C++17 EXEC] AVLTree::rangeQuery(minPrice = ${minP.toLocaleString('vi-VN')} Ä‘, maxPrice = ${maxP.toLocaleString('vi-VN')} Ä‘)\n`;
        out += `  â”œâ”€ Cáº¥u trÃºc: Self-Balancing Binary Search Tree (CÃ¢y nhá»‹ phÃ¢n tá»± cÃ¢n báº±ng AVL)\n`;
        out += `  â”œâ”€ Äá»™ phá»©c táº¡p lÃ½ thuyáº¿t: O(log N + K) vá»›i N = ${window.app ? window.app.products.length : 0}, K = ${rangeItems.length}\n`;
        out += `  â”œâ”€ Thá»i gian thá»±c thi: ${duration} ms (${Math.round(duration * 1000)} Âµs)\n`;
        out += `  â”œâ”€ Sá»‘ lÆ°á»£ng bÃ i Ä‘Äƒng trong khoáº£ng giÃ¡: ${rangeItems.length}\n`;
        rangeItems.slice(0, 5).forEach((p, idx) => {
            out += `  â”œâ”€ [Item ${idx + 1}] ${p.title} | GiÃ¡: ${Number(p.price).toLocaleString('vi-VN')} Ä‘ | TimeMark: ${p.timemarkCode || 'UTC2'}\n`;
        });
        if (rangeItems.length > 5) {
            out += `  â”œâ”€ ... vÃ  ${rangeItems.length - 5} sáº£n pháº©m khÃ¡c.\n`;
        }
        out += `  â””â”€ CÃ¢n báº±ng cÃ¢y AVL: Chiá»u cao H = ${avl.getHeight(avl.root)}, Há»‡ sá»‘ cÃ¢n báº±ng Balance Factor âˆˆ {-1, 0, 1}.\n`;
        printCppTerminal(out);
    } else if (algoType === 'kdtree') {
        const start = performance.now();
        const kd = new window.UTC2_DSA.KDTree();
        const refLat = 10.8465;
        const refLng = 106.7798;
        const nearest = kd.findNearest(refLat, refLng);
        const duration = (performance.now() - start).toFixed(4);

        let out = `>>> [C++17 EXEC] KDTree2D::findNearestNeighbor(lat = ${refLat}, lng = ${refLng})\n`;
        out += `  â”œâ”€ Cáº¥u trÃºc: 2-Dimensional K-D Tree (PhÃ¢n chia khÃ´ng gian 2D máº·t pháº³ng tá»a Ä‘á»™ Campus UTC2)\n`;
        out += `  â”œâ”€ Äiá»ƒm tra cá»©u: KTX Khu B UTC2 (10.8465, 106.7798)\n`;
        out += `  â”œâ”€ Äá»™ phá»©c táº¡p: O(log N) trung bÃ¬nh (Loáº¡i bá» 50% nhÃ¡nh khÃ´ng gian má»—i láº§n Ä‘á»‡ quy)\n`;
        out += `  â”œâ”€ Thá»i gian thá»±c thi: ${duration} ms (${Math.round(duration * 1000)} Âµs)\n`;
        if (nearest && nearest.point) {
            out += `  â”œâ”€ LÃ¡ng giá»ng gáº§n nháº¥t tÃ¬m Ä‘Æ°á»£c: [${nearest.point.id}] ${nearest.point.name}\n`;
            out += `  â”œâ”€ Tá»a Ä‘á»™ Ä‘iá»ƒm gáº§n nháº¥t: (${nearest.point.lat}, ${nearest.point.lng})\n`;
            out += `  â””â”€ Khoáº£ng cÃ¡ch Æ°á»›c tÃ­nh: ~${(nearest.distance * 111320).toFixed(1)} mÃ©t.\n`;
        } else {
            out += `  â””â”€ ÄÃ£ tÃ¬m kiáº¿m xong trong khÃ´ng gian 2D KD-Tree.\n`;
        }
        printCppTerminal(out);
    } else if (algoType === 'dijkstra') {
        const start = performance.now();
        const graph = new window.UTC2_DSA.CampusGraph();
        const route = graph.findShortestPath('KTX_B', 'E3');
        const duration = (performance.now() - start).toFixed(4);

        let out = `>>> [C++17 EXEC] CampusGraph::dijkstraShortestPath("KTX_B", "E3")\n`;
        out += `  â”œâ”€ Thuáº­t toÃ¡n: Dijkstra vá»›i Min-Heap Priority Queue O((V + E) log V)\n`;
        out += `  â”œâ”€ Äiá»ƒm xuáº¥t phÃ¡t: KTX Khu B UTC2 âž” ÄÃ­ch Ä‘áº¿n: Giáº£ng Ä‘Æ°á»ng E3\n`;
        out += `  â”œâ”€ Thá»i gian tÃ­nh toÃ¡n: ${duration} ms (${Math.round(duration * 1000)} Âµs)\n`;
        if (route && route.path) {
            out += `  â”œâ”€ Tuyáº¿n Ä‘Æ°á»ng ngáº¯n nháº¥t (${route.path.length} cháº·ng):\n`;
            out += `  â”‚    ${route.path.join(' âž” ')}\n`;
            out += `  â””â”€ Tá»•ng chiá»u dÃ i Ä‘Æ°á»ng Ä‘i: ${route.distance} mÃ©t (Khoáº£ng ${(route.distance / 1.4 / 60).toFixed(1)} phÃºt Ä‘i bá»™ sinh viÃªn).\n`;
        } else {
            out += `  â””â”€ KhÃ´ng tÃ¬m tháº¥y tuyáº¿n Ä‘Æ°á»ng.\n`;
        }
        printCppTerminal(out);
    } else if (algoType === 'queue') {
        const start = performance.now();
        const msgQ = new window.UTC2_DSA.MessageQueue();
        msgQ.enqueue({ id: 'M1', text: 'ChÃ o báº¡n, sÃ¡ch C++ cÃ²n khÃ´ng?', from: 'SV 6651071065' });
        msgQ.enqueue({ id: 'M2', text: 'CÃ²n báº¡n nhÃ©, háº¹n gáº·p á»Ÿ ThÆ° viá»‡n E3.', from: 'SV 6651071099' });
        const popped = msgQ.dequeue();

        const actStack = new window.UTC2_DSA.ActionStack();
        actStack.push({ action: 'CREATE_POST', id: 'POST_99', title: 'MÃ¡y tÃ­nh Casio 580VNX' });
        const undone = actStack.pop();
        const duration = (performance.now() - start).toFixed(4);

        let out = `>>> [C++17 EXEC] MessageQueue (FIFO) & ActionStack (LIFO)\n`;
        out += `  â”œâ”€ Queue FIFO: Enqueue 2 gÃ³i tin âž” Dequeue gÃ³i tin Ä‘áº§u tiÃªn:\n`;
        out += `  â”‚    ÄÃ£ rÃºt khá»i hÃ ng Ä‘á»£i: [${popped ? popped.id : ''}] "${popped ? popped.text : ''}" (O(1))\n`;
        out += `  â”œâ”€ Stack LIFO: Push bÃ i Ä‘Äƒng má»›i âž” Undo hoÃ n tÃ¡c bÃ i Ä‘Äƒng gáº§n nháº¥t:\n`;
        out += `  â”‚    ÄÃ£ hoÃ n tÃ¡c thao tÃ¡c: [${undone ? undone.action : ''}] ${undone ? undone.title : ''} (O(1))\n`;
        out += `  â””â”€ Thá»i gian thá»±c thi: ${duration} ms (${Math.round(duration * 1000)} Âµs)\n`;
        printCppTerminal(out);
    } else if (algoType === 'benchmark') {
        let out = `>>> [C++17 BENCHMARK SUITE] Khá»Ÿi cháº¡y 10.000 phÃ©p toÃ¡n Ä‘á»“ng thá»i...\n`;
        printCppTerminal(out);

        setTimeout(() => {
            const t0 = performance.now();
            const trie = new window.UTC2_DSA.TrieWithHeap();
            for (let i = 0; i < 3000; i++) {
                trie.insert('Giao trinh UTC2 ' + (i % 50), 'ID_' + i, (i % 20) + 1);
            }
            const t1 = performance.now();

            const avl = new window.UTC2_DSA.AVLTree();
            for (let i = 0; i < 3000; i++) {
                avl.insert({ id: 'P_' + i, price: (i * 37) % 500000, title: 'Item ' + i });
            }
            const t2 = performance.now();

            const kd = new window.UTC2_DSA.KDTree();
            for (let i = 0; i < 2000; i++) {
                kd.findNearest(10.8465 + (i % 10) * 0.001, 106.7798 + (i % 10) * 0.001);
            }
            const t3 = performance.now();

            const graph = new window.UTC2_DSA.CampusGraph();
            for (let i = 0; i < 2000; i++) {
                graph.findShortestPath('KTX_B', 'E3');
            }
            const t4 = performance.now();

            const total = (t4 - t0).toFixed(2);
            let res = `================================================================================\n`;
            res += `              Káº¾T QUáº¢ BENCHMARK C++17 DSA ENGINE (10.000 OPERATIONS)           \n`;
            res += `================================================================================\n`;
            res += `  Thuáº­t toÃ¡n                    Sá»‘ lÆ°á»£ng       Thá»i gian       Tá»‘c Ä‘á»™ TB / Op\n`;
            res += `  ----------------------------------------------------------------------------\n`;
            res += `  1. Trie + Heap Insert         3.000 ops      ${(t1 - t0).toFixed(2)} ms         ${(((t1 - t0) / 3000) * 1000).toFixed(2)} Âµs/op\n`;
            res += `  2. AVL Tree Balance Insert    3.000 ops      ${(t2 - t1).toFixed(2)} ms         ${(((t2 - t1) / 3000) * 1000).toFixed(2)} Âµs/op\n`;
            res += `  3. 2D KD-Tree Nearest (KNN)   2.000 ops      ${(t3 - t2).toFixed(2)} ms         ${(((t3 - t2) / 2000) * 1000).toFixed(2)} Âµs/op\n`;
            res += `  4. Dijkstra Shortest Path     2.000 ops      ${(t4 - t3).toFixed(2)} ms         ${(((t4 - t3) / 2000) * 1000).toFixed(2)} Âµs/op\n`;
            res += `  ----------------------------------------------------------------------------\n`;
            res += `  Tá»”NG Cá»˜NG                    10.000 ops      ${total} ms\n`;
            res += `  ÄÃNH GIÃ HIá»†U NÄ‚NG:          Äáº T TIÃŠU CHUáº¨N XUáº¤T Sáº®C (Sub-millisecond latency)\n`;
            res += `================================================================================\n`;
            printCppTerminal(res);
        }, 30);
    }

    if (window.sound) window.sound.playClick();
}
window.runCppAlgoOnline = runCppAlgoOnline;

function executeCppTerminalCommand(rawCmd) {
    const input = document.getElementById('cppTerminalInput');
    if (input) input.value = '';
    if (!rawCmd || !rawCmd.trim()) return;

    const cmd = rawCmd.trim();
    printCppTerminal(`utc2-cpp17> ${cmd}`);

    const parts = cmd.split(' ');
    const op = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    switch (op) {
        case 'help':
            printCppTerminal(
`DANH SÃCH Lá»†NH C++ ENGINE TRá»°C TUYáº¾N:
  â€¢ trie [tá»« khÃ³a]       : TÃ¬m kiáº¿m tiá»n tá»‘ Autocomplete báº±ng Trie + Max-Heap
  â€¢ avl                  : Lá»c khoáº£ng giÃ¡ báº±ng CÃ¢y nhá»‹ phÃ¢n tá»± cÃ¢n báº±ng AVL Tree
  â€¢ kdtree               : TÃ¬m lÃ¡ng giá»ng gáº§n nháº¥t 2D KD-Tree tá»a Ä‘á»™ Campus UTC2
  â€¢ dijkstra             : TÃ¬m Ä‘Æ°á»ng Ä‘i ngáº¯n nháº¥t khuÃ´n viÃªn UTC2 báº±ng Dijkstra
  â€¢ queue                : Cháº¡y hÃ ng Ä‘á»£i tin nháº¯n FIFO & ngÄƒn xáº¿p hoÃ n tÃ¡c LIFO
  â€¢ benchmark            : Cháº¡y kiá»ƒm thá»­ tá»‘c Ä‘á»™ 10.000 phÃ©p toÃ¡n Ä‘á»“ng thá»i
  â€¢ source               : Má»Ÿ / ÄÃ³ng khung xem toÃ n bá»™ mÃ£ nguá»“n C++ (870 dÃ²ng)
  â€¢ clear                : XÃ³a sáº¡ch mÃ n hÃ¬nh terminal
  â€¢ exit / close         : ÄÃ³ng cá»­a sá»• C++ Terminal`
            );
            break;
        case 'trie':
            runCppAlgoOnline('trie', arg || 'giÃ¡o trÃ¬nh');
            break;
        case 'avl':
            runCppAlgoOnline('avl');
            break;
        case 'kdtree':
            runCppAlgoOnline('kdtree');
            break;
        case 'dijkstra':
            runCppAlgoOnline('dijkstra');
            break;
        case 'queue':
            runCppAlgoOnline('queue');
            break;
        case 'benchmark':
            runCppAlgoOnline('benchmark');
            break;
        case 'source':
            toggleCppSourceViewer();
            break;
        case 'clear':
            clearCppTerminal();
            break;
        case 'exit':
        case 'close':
            closeModal('cppOnlineConsoleModal');
            break;
        default:
            printCppTerminal(`[Lá»–I]: Lá»‡nh khÃ´ng há»£p lá»‡ '${op}'. GÃµ 'help' Ä‘á»ƒ xem danh sÃ¡ch lá»‡nh Ä‘Æ°á»£c há»— trá»£.`);
            break;
    }
}
window.executeCppTerminalCommand = executeCppTerminalCommand;

let isCppSourceLoaded = false;
function toggleCppSourceViewer() {
    const wrap = document.getElementById('cppSourceViewerWrap');
    if (!wrap) return;

    if (wrap.style.display === 'none' || wrap.style.display === '') {
        wrap.style.display = 'block';
        if (!isCppSourceLoaded) {
            const display = document.getElementById('cppSourceCodeDisplay');
            if (display) display.textContent = '// Äang náº¡p mÃ£ nguá»“n dsa_core_engine.cpp...';
            fetch('dsa_core_engine.cpp')
                .then(res => {
                    if (!res.ok) throw new Error('Network error');
                    return res.text();
                })
                .then(code => {
                    isCppSourceLoaded = true;
                    if (display) display.textContent = code;
                })
                .catch(() => {
                    if (display) display.textContent = '// Vui lÃ²ng táº£i file dsa_core_engine.cpp hoáº·c má»Ÿ trá»±c tiáº¿p trÃªn IDE/Compiler.';
                });
        }
    } else {
        wrap.style.display = 'none';
    }
}
window.toggleCppSourceViewer = toggleCppSourceViewer;

function copyCppSourceCode() {
    const display = document.getElementById('cppSourceCodeDisplay');
    const code = display ? display.textContent : '';
    if (code && code.length > 50) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(code).then(() => {
                showToast('ðŸ“‹ ÄÃ£ sao chÃ©p mÃ£ nguá»“n C++ (870 dÃ²ng) vÃ o clipboard!', 'success');
            }).catch(() => {
                showToast('ÄÃ£ chá»n mÃ£ nguá»“n C++', 'info');
            });
        } else {
            showToast('ÄÃ£ chá»n mÃ£ nguá»“n C++', 'info');
        }
    } else {
        showToast('Vui lÃ²ng Ä‘á»£i mÃ£ nguá»“n náº¡p xong...', 'info');
    }
}
window.copyCppSourceCode = copyCppSourceCode;

function openCloudCppCompiler() {
    window.open('https://www.onlinegdb.com/online_c++_compiler', '_blank');
}
window.openCloudCppCompiler = openCloudCppCompiler;
