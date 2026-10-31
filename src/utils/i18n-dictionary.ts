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
    chat: string;
    profile: string;
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
      chat: "Trò chuyện nội bộ",
      profile: "Hồ sơ cá nhân",
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
      chat: "Internal Chat",
      profile: "Profile",
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
    },
  },
};

export type Locale = "vi" | "en";
export type TranslationType = TranslationContent;
