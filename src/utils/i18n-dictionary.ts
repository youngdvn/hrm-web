export interface TranslationContent {
  common: {
    appName: string;
    appSubTitle: string;
    dashboard: string;
    employees: string;
    departments: string;
    positions: string;
    attendance: string;
    leaves: string;
    payroll: string;
    contracts: string;
    chat: string;
    profile: string;
    auditLogs: string;
    logout: string;
    search: string;
    reset: string;
    add: string;
    edit: string;
    delete: string;
    cancel: string;
    save: string;
    actions: string;
    confirmDelete: string;
    status: string;
    all: string;
    filter: string;
    loading: string;
    success: string;
    error: string;
    viewDetails: string;
    close: string;
    back: string;
    confirm: string;
    records: string;
    export: string;
    notes: string;
    reason: string;
    time: string;
    date: string;
    month: string;
    year: string;
    allDepartments: string;
    allPositions: string;
    allStatuses: string;
    noData: string;
    viewAll: string;
    unassigned: string;
  };
  auth: {
    loginTitle: string;
    loginSubTitle: string;
    email: string;
    password: string;
    emailRequired: string;
    passwordRequired: string;
    loginBtn: string;
    quickLogin: string;
    loginSuccess: string;
    logoutSuccess: string;
    unauthorized: string;
  };
  employee: {
    title: string;
    subtitle: string;
    addNew: string;
    editEmployee: string;
    employeeCode: string;
    fullName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    male: string;
    female: string;
    other: string;
    dateOfBirth: string;
    hireDate: string;
    department: string;
    position: string;
    manager: string;
    address: string;
    status: string;
    statusActive: string;
    statusProbation: string;
    statusOnLeave: string;
    statusTerminated: string;
    createSuccess: string;
    updateSuccess: string;
    deleteSuccess: string;
    searchPlaceholder: string;
    selectDepartment: string;
    selectPosition: string;
    selectStatus: string;
    createAccount: string;
    role: string;
    initialPassword: string;
    defaultPasswordTip: string;
  };
  dashboard: {
    title: string;
    welcome: string;
    totalEmployees: string;
    activeEmployees: string;
    probationEmployees: string;
    totalDepartments: string;
    employeeDistribution: string;
    workStatusRatio: string;
    expiringContractsTitle: string;
    internalDirectory: string;
    employeeDirectory: string;
    employeeDirectoryDesc: string;
    leaveRequest: string;
    leaveRequestDesc: string;
    myPayslips: string;
    myPayslipsDesc: string;
    profileSecurity: string;
    profileSecurityDesc: string;
  };
  department: {
    title: string;
    subtitle: string;
    addNew: string;
    edit: string;
    code: string;
    name: string;
    description: string;
    employeeCount: string;
    confirmDelete: string;
    createSuccess: string;
    updateSuccess: string;
    deleteSuccess: string;
  };
  position: {
    title: string;
    subtitle: string;
    addNew: string;
    edit: string;
    code: string;
    positionTitle: string;
    description: string;
    employeeCount: string;
    confirmDelete: string;
    createSuccess: string;
    updateSuccess: string;
    deleteSuccess: string;
  };
  attendance: {
    title: string;
    subtitle: string;
    todayStatus: string;
    clockIn: string;
    clockOut: string;
    clockInSuccess: string;
    clockOutSuccess: string;
    alreadyClockedIn: string;
    alreadyClockedOut: string;
    checkInTime: string;
    checkOutTime: string;
    workHours: string;
    overtime: string;
    fixedShift: string;
    shiftHours: string;
    statusOnTime: string;
    statusLate: string;
    statusLeave: string;
    statusAbsent: string;
    statusHalfDay: string;
    statusFullDay: string;
    filterMonth: string;
    exportExcel: string;
    statusEarlyLeave: string;
    myHistoryTab: string;
    companyAttendanceTab: string;
    filterByStatus: string;
    notesPlaceholder: string;
    after1730Ot: string;
    checkedIn: string;
    notCheckedIn: string;
    notCheckedOut: string;
    shiftStartAt: string;
    recentHistory: string;
    noRecords: string;
    hoursUnit: string;
    clockInLateSuccess: string;
    clockInOnTimeSuccess: string;
    totalWorkHoursLabel: string;
  };
  leave: {
    title: string;
    subtitle: string;
    createRequest: string;
    annualBalance: string;
    remainingDays: string;
    usedDays: string;
    totalDays: string;
    daysUnit: string;
    leaveType: string;
    typeAnnual: string;
    typeSick: string;
    typeUnpaid: string;
    typeMaternity: string;
    typeBereavement: string;
    typeOther: string;
    dateRange: string;
    reason: string;
    approve: string;
    reject: string;
    rejectReason: string;
    statusPending: string;
    statusApproved: string;
    statusRejected: string;
    createSuccess: string;
    approveSuccess: string;
    rejectSuccess: string;
  };
  contract: {
    title: string;
    subtitle: string;
    createContract: string;
    editContract: string;
    contractNumber: string;
    contractType: string;
    typeProbation: string;
    typeDefinite: string;
    typeIndefinite: string;
    typeSeasonal: string;
    typeInternship: string;
    startDate: string;
    endDate: string;
    baseSalary: string;
    allowance: string;
    totalSalary: string;
    statusDraft: string;
    statusActive: string;
    statusExpired: string;
    statusTerminated: string;
    createSuccess: string;
    updateSuccess: string;
  };
  payroll: {
    title: string;
    subtitle: string;
    createPeriod: string;
    periodName: string;
    month: string;
    year: string;
    totalGross: string;
    totalNet: string;
    statusDraft: string;
    statusOpen: string;
    statusProcessing: string;
    statusClosed: string;
    calculate: string;
    closePeriod: string;
    viewPayslips: string;
    latestPayslip: string;
    latestPeriod: string;
    noPayslips: string;
    calculatingFirstPeriod: string;
    createSuccess: string;
    calculateSuccess: string;
    closeSuccess: string;
  };
  chat: {
    title: string;
    searchPlaceholder: string;
    onlineUsers: string;
    noColleagues: string;
    noMessages: string;
    inputPlaceholder: string;
    send: string;
    typing: string;
    you: string;
    selectConversation: string;
  };
  notification: {
    title: string;
    sendNotification: string;
    sendBtn: string;
    markAllRead: string;
    noNotifications: string;
    targetAll: string;
    targetSpecific: string;
    selectRecipient: string;
    notificationTitle: string;
    notificationMessage: string;
    linkOptional: string;
    sendSuccess: string;
  };
  audit: {
    title: string;
    subtitle: string;
    action: string;
    entity: string;
    user: string;
    ipAddress: string;
    timestamp: string;
    details: string;
    viewJson: string;
  };
  profile: {
    title: string;
    subtitle: string;
    personalInfo: string;
    accountSettings: string;
    changePassword: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    updatePasswordBtn: string;
    avatarChange: string;
    avatarUploadSuccess: string;
    passwordSuccess: string;
  };
}

export const translations: Record<"vi" | "en", TranslationContent> = {
  vi: {
    common: {
      appName: "HRM Portal",
      appSubTitle: "Hệ thống Quản lý Nhân sự Doanh nghiệp",
      dashboard: "Bảng điều khiển",
      employees: "Quản lý Nhân sự",
      departments: "Phòng ban",
      positions: "Chức vụ",
      attendance: "Chấm công",
      leaves: "Nghỉ phép",
      payroll: "Tính lương",
      contracts: "Hợp đồng lao động",
      chat: "Trò chuyện nội bộ",
      profile: "Hồ sơ cá nhân",
      auditLogs: "Nhật ký hệ thống",
      logout: "Đăng xuất",
      search: "Tìm kiếm",
      reset: "Đặt lại",
      add: "Thêm mới",
      edit: "Chỉnh sửa",
      delete: "Xóa",
      cancel: "Hủy bỏ",
      save: "Lưu lại",
      actions: "Thao tác",
      confirmDelete: "Bạn có chắc chắn muốn xóa bản ghi này?",
      status: "Trạng thái",
      all: "Tất cả",
      filter: "Bộ lọc",
      loading: "Đang tải dữ liệu...",
      success: "Thành công",
      error: "Đã xảy ra lỗi",
      viewDetails: "Xem chi tiết",
      close: "Đóng",
      back: "Quay lại",
      confirm: "Xác nhận",
      records: "bản ghi",
      export: "Xuất dữ liệu",
      notes: "Ghi chú",
      reason: "Lý do",
      time: "Thời gian",
      date: "Ngày",
      month: "Tháng",
      year: "Năm",
      allDepartments: "Tất cả phòng ban",
      allPositions: "Tất cả chức vụ",
      allStatuses: "Tất cả trạng thái",
      noData: "Không có dữ liệu hiển thị",
      viewAll: "Xem tất cả",
      unassigned: "Chưa phân bổ",
    },
    auth: {
      loginTitle: "Đăng nhập HRM",
      loginSubTitle: "Chào mừng bạn quay trở lại! Vui lòng đăng nhập để tiếp tục.",
      email: "Email đăng nhập",
      password: "Mật khẩu",
      emailRequired: "Vui lòng nhập email hợp lệ",
      passwordRequired: "Mật khẩu tối thiểu 6 ký tự",
      loginBtn: "Đăng nhập ngay",
      quickLogin: "Tài khoản kiểm thử nhanh (Demo)",
      loginSuccess: "Đăng nhập thành công!",
      logoutSuccess: "Đã đăng xuất an toàn.",
      unauthorized: "Bạn không có quyền truy cập trang này.",
    },
    employee: {
      title: "Danh sách Nhân sự",
      subtitle: "Quản lý thông tin hồ sơ, phòng ban và chức vụ của toàn bộ nhân viên.",
      addNew: "Thêm nhân viên",
      editEmployee: "Cập nhật thông tin nhân viên",
      employeeCode: "Mã nhân viên",
      fullName: "Họ và tên",
      firstName: "Tên",
      lastName: "Họ đệm",
      email: "Email",
      phone: "Số điện thoại",
      gender: "Giới tính",
      male: "Nam",
      female: "Nữ",
      other: "Khác",
      dateOfBirth: "Ngày sinh",
      hireDate: "Ngày vào làm",
      department: "Phòng ban",
      position: "Chức vụ",
      manager: "Người quản lý",
      address: "Địa chỉ thường trú",
      status: "Trạng thái",
      statusActive: "Đang làm việc",
      statusProbation: "Thử việc",
      statusOnLeave: "Nghỉ phép dài hạn",
      statusTerminated: "Đã nghỉ việc",
      createSuccess: "Thêm nhân viên mới thành công!",
      updateSuccess: "Cập nhật thông tin nhân viên thành công!",
      deleteSuccess: "Xóa nhân viên thành công!",
      searchPlaceholder: "Tìm theo mã, tên hoặc email...",
      selectDepartment: "Chọn phòng ban",
      selectPosition: "Chọn chức vụ",
      selectStatus: "Chọn trạng thái",
      createAccount: "Cấp tài khoản đăng nhập hệ thống",
      role: "Phân quyền (Role)",
      initialPassword: "Mật khẩu tùy chọn",
      defaultPasswordTip: "Tài khoản sẽ dùng Email để đăng nhập.",
    },
    dashboard: {
      title: "Tổng quan Quản trị Nhân sự",
      welcome: "Chào mừng bạn trở lại hệ thống HRM",
      totalEmployees: "Tổng số nhân sự",
      activeEmployees: "Nhân viên chính thức",
      probationEmployees: "Nhân viên thử việc",
      totalDepartments: "Tổng số phòng ban",
      employeeDistribution: "Cơ cấu nhân sự theo Phòng ban",
      workStatusRatio: "Tỷ lệ trạng thái nhân viên",
      expiringContractsTitle: "Hợp đồng lao động cần gia hạn (30 ngày tới)",
      internalDirectory: "Danh bạ & Tiện ích nội bộ",
      employeeDirectory: "Danh bạ nhân sự",
      employeeDirectoryDesc: "Tra cứu thông tin đồng nghiệp",
      leaveRequest: "Đơn xin nghỉ phép",
      leaveRequestDesc: "Nộp và theo dõi trạng thái duyệt",
      myPayslips: "Phiếu lương của tôi",
      myPayslipsDesc: "Tra cứu chi tiết thu nhập",
      profileSecurity: "Hồ sơ & Bảo mật",
      profileSecurityDesc: "Đổi mật khẩu, xem hồ sơ",
    },
    department: {
      title: "Quản lý Phòng ban",
      subtitle: "Quản lý cơ cấu các phòng ban và bộ phận trong doanh nghiệp.",
      addNew: "Thêm phòng ban",
      edit: "Cập nhật phòng ban",
      code: "Mã phòng ban",
      name: "Tên phòng ban",
      description: "Mô tả",
      employeeCount: "Số nhân sự",
      confirmDelete: "Bạn có chắc chắn muốn xóa phòng ban này?",
      createSuccess: "Tạo phòng ban thành công!",
      updateSuccess: "Cập nhật phòng ban thành công!",
      deleteSuccess: "Xóa phòng ban thành công!",
    },
    position: {
      title: "Quản lý Chức vụ",
      subtitle: "Quản lý các chức danh, vị trí công việc và trách nhiệm tương ứng.",
      addNew: "Thêm chức vụ",
      edit: "Cập nhật chức vụ",
      code: "Mã chức vụ",
      positionTitle: "Tên chức vụ / Vị trí",
      description: "Mô tả công việc",
      employeeCount: "Số nhân sự đảm nhiệm",
      confirmDelete: "Bạn có chắc muốn xóa chức vụ này?",
      createSuccess: "Tạo chức vụ thành công!",
      updateSuccess: "Cập nhật chức vụ thành công!",
      deleteSuccess: "Xóa chức vụ thành công!",
    },
    attendance: {
      title: "Bảng Chấm Công",
      subtitle: "Theo dõi thời gian vào/ra, tính công và giờ tăng ca của nhân sự.",
      todayStatus: "Trạng thái hôm nay",
      clockIn: "Chấm công vào",
      clockOut: "Chấm công ra",
      clockInSuccess: "Chấm công vào thành công!",
      clockOutSuccess: "Chấm công ra thành công!",
      alreadyClockedIn: "Đã chấm công vào hôm nay",
      alreadyClockedOut: "Đã hoàn thành chấm công hôm nay",
      checkInTime: "Giờ vào",
      checkOutTime: "Giờ ra",
      workHours: "Số giờ làm",
      overtime: "Tăng ca (OT)",
      fixedShift: "Ca cố định",
      shiftHours: "Ca làm việc: 08:30 - 17:30 • Sau 17:30 tính Tăng ca (OT)",
      statusOnTime: "Đúng giờ",
      statusLate: "Đi muộn",
      statusLeave: "Nghỉ phép",
      statusAbsent: "Không đủ công",
      statusHalfDay: "Nửa ngày",
      statusFullDay: "Đủ công",
      filterMonth: "Chọn tháng",
      exportExcel: "Xuất Excel",
      statusEarlyLeave: "Về sớm",
      myHistoryTab: "Lịch sử chấm công của tôi",
      companyAttendanceTab: "Chấm công toàn công ty",
      filterByStatus: "Lọc theo trạng thái",
      notesPlaceholder: "Ghi chú check-in/out (tùy chọn)...",
      after1730Ot: "Sau 17:30 tính Tăng ca (OT)",
      checkedIn: "Đã Check-in",
      notCheckedIn: "Chưa Check-in",
      notCheckedOut: "Chưa check-out",
      shiftStartAt: "Ca làm việc bắt đầu 08:30",
      recentHistory: "Lịch sử Chấm công gần đây",
      noRecords: "Chưa có dữ liệu chấm công",
      hoursUnit: "giờ",
      clockInLateSuccess: "Check-in thành công (Ghi nhận đi muộn)",
      clockInOnTimeSuccess: "Check-in thành công đúng giờ!",
      totalWorkHoursLabel: "Tổng giờ làm",
    },
    leave: {
      title: "Quản lý Nghỉ phép",
      subtitle: "Tạo đơn xin nghỉ và phê duyệt các yêu cầu nghỉ phép của nhân sự.",
      createRequest: "Tạo đơn nghỉ phép",
      annualBalance: "Quỹ phép năm",
      remainingDays: "Ngày phép còn lại",
      usedDays: "Đã sử dụng",
      totalDays: "Tổng ngày phép",
      daysUnit: "ngày",
      leaveType: "Loại nghỉ phép",
      typeAnnual: "Nghỉ phép năm",
      typeSick: "Nghỉ ốm",
      typeUnpaid: "Nghỉ không lương",
      typeMaternity: "Nghỉ thai sản",
      typeBereavement: "Nghỉ tang",
      typeOther: "Khác",
      dateRange: "Thời gian nghỉ",
      reason: "Lý do xin nghỉ",
      approve: "Phê duyệt",
      reject: "Từ chối",
      rejectReason: "Lý do từ chối",
      statusPending: "Chờ duyệt",
      statusApproved: "Đã duyệt",
      statusRejected: "Bị từ chối",
      createSuccess: "Gửi đơn xin nghỉ phép thành công!",
      approveSuccess: "Đã phê duyệt đơn nghỉ phép!",
      rejectSuccess: "Đã từ chối đơn nghỉ phép!",
    },
    contract: {
      title: "Hợp đồng Lao động",
      subtitle: "Quản lý thời hạn, lương thỏa thuận và loại hợp đồng của nhân sự.",
      createContract: "Thêm hợp đồng mới",
      editContract: "Chỉnh sửa hợp đồng",
      contractNumber: "Số hợp đồng",
      contractType: "Loại hợp đồng",
      typeProbation: "Thử việc",
      typeDefinite: "Có thời hạn",
      typeIndefinite: "Không thời hạn",
      typeSeasonal: "Thời vụ",
      typeInternship: "Thực tập",
      startDate: "Ngày bắt đầu",
      endDate: "Ngày kết thúc",
      baseSalary: "Lương cơ bản",
      allowance: "Phụ cấp",
      totalSalary: "Tổng thu nhập",
      statusDraft: "Bản nháp",
      statusActive: "Hiệu lực",
      statusExpired: "Hết hạn",
      statusTerminated: "Đã chấm dứt",
      createSuccess: "Tạo hợp đồng thành công!",
      updateSuccess: "Cập nhật hợp đồng thành công!",
    },
    payroll: {
      title: "Bảng Lương Doanh Nghiệp",
      subtitle: "Tính toán và quản lý các kỳ trả lương hàng tháng cho nhân viên.",
      createPeriod: "Tạo kỳ lương mới",
      periodName: "Tên kỳ lương",
      month: "Tháng",
      year: "Năm",
      totalGross: "Tổng lương gộp",
      totalNet: "Tổng thực lĩnh",
      statusDraft: "Nháp",
      statusOpen: "Đang mở",
      statusProcessing: "Đang xử lý",
      statusClosed: "Đã chốt",
      calculate: "Tính lương",
      closePeriod: "Đóng kỳ lương",
      viewPayslips: "Xem phiếu lương",
      latestPayslip: "Phiếu lương gần nhất",
      latestPeriod: "Kỳ lương gần nhất",
      noPayslips: "Chưa có phiếu lương",
      calculatingFirstPeriod: "Kỳ lương đầu tiên đang tính",
      createSuccess: "Tạo kỳ lương thành công!",
      calculateSuccess: "Đã tính lương cho kỳ thành công!",
      closeSuccess: "Đã chốt kỳ lương thành công!",
    },
    chat: {
      title: "Trò chuyện nội bộ",
      searchPlaceholder: "Tìm theo tên, email, phòng ban...",
      onlineUsers: "đang online",
      noColleagues: "Không tìm thấy đồng nghiệp nào",
      noMessages: "Chưa có tin nhắn",
      inputPlaceholder: "Nhập tin nhắn... (Enter để gửi)",
      send: "Gửi",
      typing: "đang soạn tin...",
      you: "Bạn",
      selectConversation: "Chọn một đồng nghiệp bên trái để bắt đầu trò chuyện",
    },
    notification: {
      title: "Thông báo",
      sendNotification: "Soạn thông báo nội bộ",
      sendBtn: "Gửi tin",
      markAllRead: "Đã đọc",
      noNotifications: "Không có thông báo mới",
      targetAll: "Toàn bộ nhân sự",
      targetSpecific: "Gửi riêng cá nhân",
      selectRecipient: "Chọn người nhận",
      notificationTitle: "Tiêu đề thông báo",
      notificationMessage: "Nội dung thông báo",
      linkOptional: "Đường dẫn chuyển hướng (tùy chọn)",
      sendSuccess: "Gửi thông báo thành công!",
    },
    audit: {
      title: "Nhật ký Hoạt động",
      subtitle: "Theo dõi mọi thao tác thay đổi dữ liệu trong toàn hệ thống.",
      action: "Hành động",
      entity: "Đối tượng",
      user: "Người thực hiện",
      ipAddress: "Địa chỉ IP",
      timestamp: "Thời gian",
      details: "Chi tiết",
      viewJson: "Xem dữ liệu JSON",
    },
    profile: {
      title: "Hồ sơ cá nhân",
      subtitle: "Xem thông tin tài khoản và đổi mật khẩu bảo mật.",
      personalInfo: "Thông tin nhân sự",
      accountSettings: "Bảo mật tài khoản",
      changePassword: "Đổi mật khẩu",
      currentPassword: "Mật khẩu hiện tại",
      newPassword: "Mật khẩu mới",
      confirmPassword: "Xác nhận mật khẩu mới",
      updatePasswordBtn: "Cập nhật mật khẩu",
      avatarChange: "Thay đổi ảnh đại diện",
      avatarUploadSuccess: "Cập nhật ảnh đại diện thành công!",
      passwordSuccess: "Đổi mật khẩu thành công!",
    },
  },
  en: {
    common: {
      appName: "HRM Portal",
      appSubTitle: "Enterprise Human Resource Management System",
      dashboard: "Dashboard",
      employees: "Employees",
      departments: "Departments",
      positions: "Positions",
      attendance: "Attendance",
      leaves: "Leaves",
      payroll: "Payroll",
      contracts: "Employment Contracts",
      chat: "Internal Chat",
      profile: "Profile",
      auditLogs: "Audit Logs",
      logout: "Log out",
      search: "Search",
      reset: "Reset",
      add: "Add New",
      edit: "Edit",
      delete: "Delete",
      cancel: "Cancel",
      save: "Save",
      actions: "Actions",
      confirmDelete: "Are you sure you want to delete this record?",
      status: "Status",
      all: "All",
      filter: "Filter",
      loading: "Loading data...",
      success: "Success",
      error: "An error occurred",
      viewDetails: "View Details",
      close: "Close",
      back: "Back",
      confirm: "Confirm",
      records: "records",
      export: "Export Data",
      notes: "Notes",
      reason: "Reason",
      time: "Time",
      date: "Date",
      month: "Month",
      year: "Year",
      allDepartments: "All departments",
      allPositions: "All positions",
      allStatuses: "All statuses",
      noData: "No data available",
      viewAll: "View all",
      unassigned: "Unassigned",
    },
    auth: {
      loginTitle: "Sign in to HRM",
      loginSubTitle: "Welcome back! Please enter your credentials to continue.",
      email: "Email address",
      password: "Password",
      emailRequired: "Please enter a valid email",
      passwordRequired: "Password must be at least 6 characters",
      loginBtn: "Sign In",
      quickLogin: "Quick Test Accounts (Demo)",
      loginSuccess: "Signed in successfully!",
      logoutSuccess: "Logged out safely.",
      unauthorized: "You do not have permission to access this page.",
    },
    employee: {
      title: "Employee Directory",
      subtitle: "Manage profiles, departments, and roles across the organization.",
      addNew: "Add Employee",
      editEmployee: "Edit Employee",
      employeeCode: "Employee Code",
      fullName: "Full Name",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      gender: "Gender",
      male: "Male",
      female: "Female",
      other: "Other",
      dateOfBirth: "Date of Birth",
      hireDate: "Hire Date",
      department: "Department",
      position: "Position",
      manager: "Direct Manager",
      address: "Residential Address",
      status: "Status",
      statusActive: "Active",
      statusProbation: "Probation",
      statusOnLeave: "On Leave",
      statusTerminated: "Terminated",
      createSuccess: "Employee created successfully!",
      updateSuccess: "Employee updated successfully!",
      deleteSuccess: "Employee deleted successfully!",
      searchPlaceholder: "Search by code, name, or email...",
      selectDepartment: "Select department",
      selectPosition: "Select position",
      selectStatus: "Select status",
      createAccount: "Grant system user account",
      role: "System Role",
      initialPassword: "Custom initial password",
      defaultPasswordTip: "Account uses employee email for authentication.",
    },
    dashboard: {
      title: "HR Analytics Dashboard",
      welcome: "Welcome back to HRM Portal",
      totalEmployees: "Total Employees",
      activeEmployees: "Active Staff",
      probationEmployees: "Probationary Staff",
      totalDepartments: "Departments",
      employeeDistribution: "Headcount by Department",
      workStatusRatio: "Staff Status Distribution",
      expiringContractsTitle: "Contracts Expiring Soon (Next 30 Days)",
      internalDirectory: "Directory & Internal Tools",
      employeeDirectory: "Employee Directory",
      employeeDirectoryDesc: "Look up colleague contacts and profiles",
      leaveRequest: "Leave Request",
      leaveRequestDesc: "Submit and track leave approval status",
      myPayslips: "My Payslips",
      myPayslipsDesc: "View earnings and deduction breakdown",
      profileSecurity: "Profile & Security",
      profileSecurityDesc: "Change password and view profile info",
    },
    department: {
      title: "Department Management",
      subtitle: "Manage organizational departments and functional divisions.",
      addNew: "Add Department",
      edit: "Edit Department",
      code: "Department Code",
      name: "Department Name",
      description: "Description",
      employeeCount: "Headcount",
      confirmDelete: "Are you sure you want to delete this department?",
      createSuccess: "Department created successfully!",
      updateSuccess: "Department updated successfully!",
      deleteSuccess: "Department deleted successfully!",
    },
    position: {
      title: "Position Management",
      subtitle: "Manage job titles, positions, and associated roles.",
      addNew: "Add Position",
      edit: "Edit Position",
      code: "Position Code",
      positionTitle: "Position Title",
      description: "Job Description",
      employeeCount: "Assigned Staff",
      confirmDelete: "Are you sure you want to delete this position?",
      createSuccess: "Position created successfully!",
      updateSuccess: "Position updated successfully!",
      deleteSuccess: "Position deleted successfully!",
    },
    attendance: {
      title: "Attendance Management",
      subtitle: "Track employee clock-ins, daily working hours, and overtime.",
      todayStatus: "Today's Status",
      clockIn: "Clock In",
      clockOut: "Clock Out",
      clockInSuccess: "Clock-in recorded successfully!",
      clockOutSuccess: "Clock-out recorded successfully!",
      alreadyClockedIn: "Already clocked in today",
      alreadyClockedOut: "Already finished workday",
      checkInTime: "Clock-in",
      checkOutTime: "Clock-out",
      workHours: "Working Hours",
      overtime: "Overtime (OT)",
      fixedShift: "Standard Shift",
      shiftHours: "Shift: 08:30 - 17:30 • Hours after 17:30 count as Overtime",
      statusOnTime: "On Time",
      statusLate: "Late",
      statusLeave: "On Leave",
      statusAbsent: "Insufficient Hours",
      statusHalfDay: "Half Day",
      statusFullDay: "Full Day",
      filterMonth: "Select Month",
      exportExcel: "Export Excel",
      statusEarlyLeave: "Early Leave",
      myHistoryTab: "My Attendance History",
      companyAttendanceTab: "Company Attendance",
      filterByStatus: "Filter by status",
      notesPlaceholder: "Check-in/out notes (optional)...",
      after1730Ot: "After 17:30 counts as Overtime (OT)",
      checkedIn: "Clocked In",
      notCheckedIn: "Not Clocked In",
      notCheckedOut: "Not Clocked Out",
      shiftStartAt: "Work shift starts at 08:30",
      recentHistory: "Recent Attendance History",
      noRecords: "No attendance records found",
      hoursUnit: "hours",
      clockInLateSuccess: "Clock-in successful (Recorded as late)",
      clockInOnTimeSuccess: "Clock-in successful on time!",
      totalWorkHoursLabel: "Total working hours",
    },
    leave: {
      title: "Leave Management",
      subtitle: "Submit time-off requests and review employee balances.",
      createRequest: "Request Leave",
      annualBalance: "Annual Leave Balance",
      remainingDays: "Remaining Days",
      usedDays: "Used Days",
      totalDays: "Total Days",
      daysUnit: "days",
      leaveType: "Leave Type",
      typeAnnual: "Annual Leave",
      typeSick: "Sick Leave",
      typeUnpaid: "Unpaid Leave",
      typeMaternity: "Maternity Leave",
      typeBereavement: "Bereavement Leave",
      typeOther: "Other",
      dateRange: "Leave Dates",
      reason: "Reason",
      approve: "Approve",
      reject: "Reject",
      rejectReason: "Rejection Reason",
      statusPending: "Pending",
      statusApproved: "Approved",
      statusRejected: "Rejected",
      createSuccess: "Leave request submitted successfully!",
      approveSuccess: "Leave request approved!",
      rejectSuccess: "Leave request rejected!",
    },
    contract: {
      title: "Employment Contracts",
      subtitle: "Manage employment contracts, salary terms, and agreements.",
      createContract: "New Contract",
      editContract: "Edit Contract",
      contractNumber: "Contract Number",
      contractType: "Contract Type",
      typeProbation: "Probation",
      typeDefinite: "Definite Term",
      typeIndefinite: "Indefinite Term",
      typeSeasonal: "Seasonal",
      typeInternship: "Internship",
      startDate: "Start Date",
      endDate: "End Date",
      baseSalary: "Base Salary",
      allowance: "Allowance",
      totalSalary: "Total Compensation",
      statusDraft: "Draft",
      statusActive: "Active",
      statusExpired: "Expired",
      statusTerminated: "Terminated",
      createSuccess: "Contract created successfully!",
      updateSuccess: "Contract updated successfully!",
    },
    payroll: {
      title: "Payroll Management",
      subtitle: "Calculate and oversee monthly salary cycles and payslips.",
      createPeriod: "New Payroll Period",
      periodName: "Period Name",
      month: "Month",
      year: "Year",
      totalGross: "Total Gross",
      totalNet: "Total Net",
      statusDraft: "Draft",
      statusOpen: "Open",
      statusProcessing: "Processing",
      statusClosed: "Closed",
      calculate: "Run Payroll",
      closePeriod: "Close Period",
      viewPayslips: "View Payslips",
      latestPayslip: "Latest Payslip",
      latestPeriod: "Latest payroll period",
      noPayslips: "No payslips available",
      calculatingFirstPeriod: "First payroll period is in progress",
      createSuccess: "Payroll period created successfully!",
      calculateSuccess: "Payroll calculated successfully!",
      closeSuccess: "Payroll period closed successfully!",
    },
    chat: {
      title: "Internal Chat",
      searchPlaceholder: "Search by name, email, department...",
      onlineUsers: "online",
      noColleagues: "No colleagues found",
      noMessages: "No messages yet",
      inputPlaceholder: "Type a message... (Press Enter to send)",
      send: "Send",
      typing: "is typing...",
      you: "You",
      selectConversation: "Select a colleague on the left to start chatting",
    },
    notification: {
      title: "Notifications",
      sendNotification: "Compose Notification",
      sendBtn: "Send",
      markAllRead: "Mark all as read",
      noNotifications: "No new notifications",
      targetAll: "All Employees",
      targetSpecific: "Specific Employee",
      selectRecipient: "Select recipient",
      notificationTitle: "Title",
      notificationMessage: "Message",
      linkOptional: "Redirect link (optional)",
      sendSuccess: "Notification sent successfully!",
    },
    audit: {
      title: "Audit Logs",
      subtitle: "Track all administrative actions and system data changes.",
      action: "Action",
      entity: "Entity",
      user: "Performed By",
      ipAddress: "IP Address",
      timestamp: "Timestamp",
      details: "Details",
      viewJson: "View JSON Payload",
    },
    profile: {
      title: "Personal Profile",
      subtitle: "View account details and manage security settings.",
      personalInfo: "Personal Information",
      accountSettings: "Account Security",
      changePassword: "Change Password",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm New Password",
      updatePasswordBtn: "Update Password",
      avatarChange: "Change Avatar",
      avatarUploadSuccess: "Avatar updated successfully!",
      passwordSuccess: "Password changed successfully!",
    },
  },
};

export type Locale = "vi" | "en";
export type TranslationType = TranslationContent;
