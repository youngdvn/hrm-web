"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  Typography,
  Button,
  Tag,
  Row,
  Col,
  Table,
  Modal,
  Form,
  Input,
  Select,
  Divider,
} from "antd";
import {
  CheckOutlined,
  ThunderboltOutlined,
  GlobalOutlined,
  ShoppingCartOutlined,
  RocketOutlined,
  CrownOutlined,
  SafetyCertificateOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  GiftOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { request, parseApiError } from "@/lib/api-client";
import { message } from "@/lib/antd-app";
import { Customer, Product } from "@/types/sales.types";
import { Employee } from "@/types/employee.types";

const { Title, Text, Paragraph } = Typography;

export default function WebPackagesPage() {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  // Fetch Customers for order selection
  const { data: customers = [] } = useQuery<Customer[]>({
    queryKey: ["customers-list-select"],
    queryFn: async () => {
      const res = await request.get<any>("sales/customers", { limit: 100 });
      return Array.isArray(res.data) ? res.data : res.data?.items || [];
    },
  });

  // Fetch Employees for sales rep
  const { data: employees = [] } = useQuery<Employee[]>({
    queryKey: ["employees-select"],
    queryFn: async () => {
      const res = await request.get<any>("employees", { limit: 100 });
      return Array.isArray(res.data) ? res.data : res.data?.items || [];
    },
  });

  // Fetch Products to match package ID
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["sales-products"],
    queryFn: async () => {
      const res = await request.get<Product[]>("sales/products");
      return res.data || [];
    },
  });

  // Create Order Mutation
  const createOrderMutation = useMutation({
    mutationFn: async (values: any) => {
      // Find or create customer
      let customerId = values.customerId;
      if (!customerId) {
        // Auto create lead customer
        const newCustRes = await request.post<Customer>("sales/customers", {
          name: values.customerName,
          phone: values.customerPhone,
          email: values.customerEmail,
          company: values.customerCompany,
          status: "LEAD",
          notes: `Đăng ký gói dịch vụ web: ${selectedPackage?.name}`,
        });
        customerId = newCustRes.data?.id;
      }

      // Find matching product
      const product = products.find((p) => p.code === selectedPackage?.productCode);
      const productId = product?.id || products[0]?.id;

      // Find first sales rep or default
      const salesRepId = values.salesRepId || employees[0]?.id;

      return request.post("sales/orders", {
        customerId,
        salesRepId,
        discount: values.discount || 0,
        commissionRate: 5,
        notes: `Đơn hàng thiết kế web: ${selectedPackage?.name}. Ghi chú: ${values.notes || "Không"}`,
        items: [
          {
            productId,
            quantity: 1,
            unitPrice: selectedPackage?.price,
          },
        ],
      });
    },
    onSuccess: () => {
      message.success("Đã tạo đơn hàng thành công! Đơn hàng đã được lưu vào hệ thống Bán hàng.");
      queryClient.invalidateQueries({ queryKey: ["sales-orders"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      setModalOpen(false);
      form.resetFields();
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  const packages = [
    {
      id: "basic",
      productCode: "WEB-BASIC",
      name: "Gói Cơ Bản (Landing Page)",
      badge: "Khởi Nghiệp & Dịch Vụ",
      badgeColor: "blue",
      price: 8900000,
      priceStr: "8.900.000 ₫",
      timeline: "5 - 7 ngày làm việc",
      target: "Doanh nghiệp mới thành lập, phòng khám, công ty luật, spa hoặc chiến dịch giới thiệu sản phẩm đơn.",
      icon: <GlobalOutlined className="text-2xl text-blue-600" />,
      features: [
        "1 Trang Landing Page chuẩn UX tối ưu tỷ lệ chuyển đổi",
        "Giao diện chuẩn Responsive (Mobile / Tablet / Desktop)",
        "Tối ưu SEO On-Page chuẩn Google Lighthouse 95+",
        "Tích hợp nút Gọi ngay, Zalo Chat, Form nhận lead",
        "Tặng Tên miền quốc tế .com / .net (1 năm)",
        "Tặng Hosting NVMe tốc độ cao 5GB (1 năm)",
        "Chứng chỉ bảo mật SSL Let's Encrypt miễn phí",
        "Bảo hành kỹ thuật & Hỗ trợ vận hành 12 tháng",
      ],
      border: "border-slate-200",
      btnVariant: "default",
    },
    {
      id: "standard",
      productCode: "WEB-STANDARD",
      name: "Gói Doanh Nghiệp Tiêu Chuẩn",
      badge: "★ Được Chọn Nhiều Nhất",
      badgeColor: "gold",
      popular: true,
      price: 18500000,
      priceStr: "18.500.000 ₫",
      timeline: "10 - 14 ngày làm việc",
      target: "Công ty sản xuất, thương mại, bất động sản, tài chính cần website giới thiệu năng lực đa trang chuyên nghiệp.",
      icon: <ThunderboltOutlined className="text-2xl text-amber-500" />,
      features: [
        "Thiết kế UI/UX độc quyền theo bộ nhận diện thương hiệu",
        "Cấu trúc 5 - 10 trang: Trang chủ, Giới thiệu, Sản phẩm, Dự án, Tin tức, Tuyển dụng, Liên hệ",
        "Hệ thống quản trị nội dung CMS tiếng Việt dễ dùng",
        "Tối ưu tốc độ tải trang dưới 1.5 giây",
        "Tích hợp Google Analytics 4, Facebook Pixel, Google Tag Manager",
        "Tặng Tên miền .vn hoặc .com cao cấp (1 năm)",
        "Tặng Hosting Cloud 15GB băng thông không giới hạn (1 năm)",
        "Tặng 5 Email doanh nghiệp theo tên miền (user@company.vn)",
        "Bàn giao 100% mã nguồn & Hướng dẫn sử dụng 1-1",
        "Bảo hành kỹ thuật trọn đời khi dùng hosting hệ thống",
      ],
      border: "border-blue-500 ring-2 ring-blue-500/20 shadow-lg",
      btnVariant: "primary",
    },
    {
      id: "ecommerce",
      productCode: "WEB-ECOMMERCE",
      name: "Gói Bán Hàng E-Commerce",
      badge: "Bán Hàng Trực Tuyến",
      badgeColor: "green",
      price: 29900000,
      priceStr: "29.900.000 ₫",
      timeline: "15 - 20 ngày làm việc",
      target: "Thương hiệu bán lẻ, chuỗi cửa hàng, thời trang, mỹ phẩm, thực phẩm cần bán hàng và thu tiền tự động.",
      icon: <ShoppingCartOutlined className="text-2xl text-emerald-600" />,
      features: [
        "Tất cả quyền lợi của Gói Doanh Nghiệp Tiêu Chuẩn",
        "Quản lý danh mục sản phẩm không giới hạn, biến thể (màu, size, giá)",
        "Giỏ hàng & Cổng thanh toán: Quét mã VietQR tự động, VNPAY, MoMo, COD",
        "Quản lý đơn hàng, tồn kho, tự động tính phí vận chuyển GHN/GHTK",
        "Tự động gửi email thông báo xác nhận đơn cho khách & chủ shop",
        "Hệ thống mã giảm giá, voucher khuyến mãi, flash sale",
        "Tặng Cloud Server SSD 30GB chuyên dụng cho E-commerce (1 năm)",
        "Tặng 10 Email doanh nghiệp theo tên miền",
        "Bảo hành & Hỗ trợ kỹ thuật ưu tiên 24/7 trong 12 tháng",
      ],
      border: "border-slate-200",
      btnVariant: "default",
    },
    {
      id: "enterprise",
      productCode: "WEB-ENTERPRISE",
      name: "Gói Web App & Portal Theo Yêu Cầu",
      badge: "Quy Mô Lớn & Tùy Biến",
      badgeColor: "purple",
      price: 55000000,
      priceStr: "Từ 55.000.000 ₫",
      timeline: "25 - 45 ngày làm việc",
      target: "Tập đoàn, trường học, bệnh viện hoặc startup cần nền tảng web portal, cổng thông tin nội bộ kết nối API.",
      icon: <CrownOutlined className="text-2xl text-purple-600" />,
      features: [
        "Lập trình Full-stack hiện đại: Next.js 16 + Node.js + PostgreSQL",
        "Thiết kế toàn diện Design System trên Figma trước khi code",
        "Cổng thông tin khách hàng (Customer Portal), tra cứu dữ liệu thời gian thực",
        "Tích hợp API đa hệ thống: Đồng bộ HRM, CRM, ERP, Hóa đơn điện tử",
        "Phân quyền người dùng đa cấp độ (RBAC), bảo mật 2 lớp 2FA",
        "Kiến trúc chịu tải cao (High Availability), chống tấn công DDoS",
        "Tặng Hạ tầng Cloud Server riêng biệt cấu hình cao (1 năm)",
        "Cam kết SLA hỗ trợ kỹ thuật ưu tiên 24/7 trong 24 tháng",
      ],
      border: "border-slate-200",
      btnVariant: "default",
    },
  ];

  const handleSelectPackage = (pkg: any) => {
    setSelectedPackage(pkg);
    form.resetFields();
    form.setFieldsValue({
      packageCode: pkg.name,
      price: pkg.price,
      discount: 0,
    });
    setModalOpen(true);
  };

  const comparisonData = [
    {
      feature: "Thiết kế UI/UX độc quyền",
      basic: "Template chuẩn UX",
      standard: "Thiết kế độc quyền Figma",
      ecommerce: "Thiết kế độc quyền Figma",
      enterprise: "Design System toàn diện",
    },
    {
      feature: "Số lượng trang hiển thị",
      basic: "1 Trang (Landing Page)",
      standard: "5 - 10 Trang đa ngành",
      ecommerce: "Không giới hạn sản phẩm",
      enterprise: "Kiến trúc Portal đa module",
    },
    {
      feature: "Chuẩn Responsive (Mobile/PC)",
      basic: <CheckOutlined className="text-emerald-500 font-bold" />,
      standard: <CheckOutlined className="text-emerald-500 font-bold" />,
      ecommerce: <CheckOutlined className="text-emerald-500 font-bold" />,
      enterprise: <CheckOutlined className="text-emerald-500 font-bold" />,
    },
    {
      feature: "Hệ thống quản trị nội dung CMS",
      basic: "Cơ bản",
      standard: "Tiếng Việt dễ dùng",
      ecommerce: "Chuyên sâu E-commerce",
      enterprise: "CMS + Dashboard phân quyền",
    },
    {
      feature: "Giỏ hàng & Cổng thanh toán online",
      basic: <CloseOutlined className="text-slate-300" />,
      standard: <CloseOutlined className="text-slate-300" />,
      ecommerce: "VietQR, VNPAY, MoMo, COD",
      enterprise: "Cổng thanh toán tùy chỉnh",
    },
    {
      feature: "Tối ưu SEO & Google PageSpeed 90+",
      basic: <CheckOutlined className="text-emerald-500 font-bold" />,
      standard: <CheckOutlined className="text-emerald-500 font-bold" />,
      ecommerce: <CheckOutlined className="text-emerald-500 font-bold" />,
      enterprise: <CheckOutlined className="text-emerald-500 font-bold" />,
    },
    {
      feature: "Tặng kèm Tên miền + Hosting (1 Năm)",
      basic: "Tên miền .com + 5GB",
      standard: "Tên miền .vn + 15GB Cloud",
      ecommerce: "Tên miền .vn + 30GB Cloud",
      enterprise: "Cloud Server cấu hình cao",
    },
    {
      feature: "Tặng Email Doanh Nghiệp",
      basic: <CloseOutlined className="text-slate-300" />,
      standard: "5 Email công ty",
      ecommerce: "10 Email công ty",
      enterprise: "Không giới hạn",
    },
    {
      feature: "Thời hạn bảo hành kỹ thuật",
      basic: "12 Tháng",
      standard: "Trọn đời hệ thống",
      ecommerce: "12 Tháng (Ưu tiên)",
      enterprise: "24 Tháng (SLA 24/7)",
    },
  ];

  const comparisonColumns = [
    {
      title: "Tính Năng & Quyền Lợi",
      dataIndex: "feature",
      key: "feature",
      width: 250,
      render: (val: string) => <span className="font-semibold text-slate-800">{val}</span>,
    },
    {
      title: "Gói Cơ Bản",
      dataIndex: "basic",
      key: "basic",
      align: "center" as const,
      render: (val: any) => <span className="text-xs text-slate-700">{val}</span>,
    },
    {
      title: (
        <span className="text-blue-600 font-bold">
          Gói Tiêu Chuẩn ★
        </span>
      ),
      dataIndex: "standard",
      key: "standard",
      align: "center" as const,
      className: "bg-blue-50/40",
      render: (val: any) => <span className="text-xs font-semibold text-blue-900">{val}</span>,
    },
    {
      title: "Gói Bán Hàng",
      dataIndex: "ecommerce",
      key: "ecommerce",
      align: "center" as const,
      render: (val: any) => <span className="text-xs text-slate-700">{val}</span>,
    },
    {
      title: "Gói Cao Cấp",
      dataIndex: "enterprise",
      key: "enterprise",
      align: "center" as const,
      render: (val: any) => <span className="text-xs text-slate-700">{val}</span>,
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Hero Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-4">
            <RocketOutlined />
            <span>Giải Pháp Thiết Kế & Lập Trình Website Doanh Nghiệp Chuyên Nghiệp</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Nâng Tầm Thương Hiệu Số. <br className="hidden sm:inline" />
            Bứt Phá Doanh Thu Cùng Website Đẳng Cấp.
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Từ Landing Page quảng cáo chuẩn SEO, Website doanh nghiệp nhận diện độc quyền đến Cổng thương mại điện tử E-Commerce và Web App Portal theo yêu cầu.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1.5">
              <CheckOutlined className="text-emerald-400 font-bold" /> Tặng Tên Miền & Hosting 1 Năm
            </span>
            <span className="flex items-center gap-1.5">
              <CheckOutlined className="text-emerald-400 font-bold" /> Tối Ưu SEO & Tốc Độ Dưới 1.5s
            </span>
            <span className="flex items-center gap-1.5">
              <CheckOutlined className="text-emerald-400 font-bold" /> Bàn Giao 100% Source Code
            </span>
            <span className="flex items-center gap-1.5">
              <CheckOutlined className="text-emerald-400 font-bold" /> Bảo Hành Kỹ Thuật 12 - 24 Tháng
            </span>
          </div>
        </div>
      </div>

      {/* 4 Pricing Cards Grid */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Bảng Giá Các Gói Dịch Vụ Thiết Kế Website
          </h2>
          <p className="text-slate-500 text-sm mt-1.5">
            Bảng giá minh bạch, trọn gói không phát sinh chi phí ẩn. Hỗ trợ xuất hóa đơn VAT tài chính.
          </p>
        </div>

        <Row gutter={[20, 20]} align="stretch">
          {packages.map((pkg) => (
            <Col xs={24} md={12} lg={6} key={pkg.id}>
              <div
                className={`bg-white rounded-2xl p-6 border ${pkg.border} flex flex-col justify-between h-full relative hover:shadow-xl transition-all duration-200`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                      Phổ Biến Nhất
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                      {pkg.icon}
                    </div>
                    <Tag color={pkg.badgeColor} className="text-[10px] m-0 font-medium">
                      {pkg.badge}
                    </Tag>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[36px] line-clamp-2">
                    {pkg.target}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="text-2xl font-black text-slate-900 tracking-tight">
                      {pkg.priceStr}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <ClockCircleOutlined />
                      <span>Thời gian: {pkg.timeline}</span>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2.5">
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckOutlined className="text-emerald-500 mt-0.5 shrink-0 font-bold" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 space-y-2">
                  <Link href={`/packages/${pkg.id}`} target="_blank" className="block">
                    <Button
                      block
                      className="rounded-xl font-semibold border-blue-400 text-blue-600 hover:bg-blue-50 h-9 text-xs"
                    >
                      Xem Trang Chi Tiết Gói ↗
                    </Button>
                  </Link>
                  <Button
                    type={pkg.btnVariant as any}
                    block
                    size="large"
                    onClick={() => handleSelectPackage(pkg)}
                    className={
                      pkg.popular
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-none text-white font-semibold shadow-md shadow-blue-500/20"
                        : "font-semibold"
                    }
                  >
                    Đăng Ký Gói Này
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Feature Comparison Table */}
      <Card
        title={
          <span className="font-bold text-slate-900 text-base flex items-center gap-2">
            <SafetyCertificateOutlined className="text-blue-600" />
            Bảng So Sánh Quyền Lợi & Tính Năng Chi Tiết Giữa Các Gói
          </span>
        }
        className="rounded-2xl border border-slate-200 shadow-xs"
      >
        <Table
          rowKey="feature"
          columns={comparisonColumns}
          dataSource={comparisonData}
          pagination={false}
          scroll={{ x: 750 }}
          className="border border-slate-100 rounded-lg text-xs"
        />
      </Card>

      {/* 5-Step Workflow Section */}
      <div className="rounded-2xl bg-slate-100/70 p-8 border border-slate-200/80">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Quy Trình Chuẩn
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            5 Bước Triển Khai Website Chuyên Nghiệp
          </h3>
        </div>

        <Row gutter={[16, 16]}>
          {[
            { step: "1", title: "Khảo Sát & Wireframe", desc: "Tiếp nhận nhu cầu, nghiên cứu đối thủ, thống nhất cấu trúc sitemap và khung sườn website." },
            { step: "2", title: "Thiết Kế UI/UX", desc: "Phác thảo giao diện độc quyền trên Figma, phối màu theo phong thủy & thương hiệu doanh nghiệp." },
            { step: "3", title: "Lập Trình Full-Stack", desc: "Lập trình mã nguồn tối ưu tốc độ, responsive 100% thiết bị, chuẩn bảo mật và tích hợp cổng thanh toán." },
            { step: "4", title: "Kiểm Thử & Đào Tạo", desc: "Chạy thử nghiệm bảo mật, tối ưu Google PageSpeed 90+, bàn giao video và hướng dẫn sử dụng 1-1." },
            { step: "5", title: "Go-Live & Bảo Hành", desc: "Kích hoạt tên miền chính thức, trỏ DNS, sao lưu định kỳ và bảo hành kỹ thuật 12 - 24 tháng." },
          ].map((item, i) => (
            <Col xs={24} sm={12} lg={4} key={i} className="flex-1">
              <div className="bg-white p-4 rounded-xl border border-slate-200 h-full flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-3">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* 1-Click Order / Quotation Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <ShoppingCartOutlined className="text-blue-600" />
            <span className="font-bold text-slate-900">
              Đăng Ký Tư Vấn & Lên Đơn Hàng Dịch Vụ Website
            </span>
          </div>
        }
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
        confirmLoading={createOrderMutation.isPending}
        width={650}
        okText="Xác Nhận Tạo Đơn Hàng"
        cancelText="Hủy"
      >
        <div className="mb-4 p-3.5 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-between">
          <div>
            <div className="text-xs text-blue-600 font-medium">Gói dịch vụ đã chọn:</div>
            <div className="text-base font-bold text-slate-900">{selectedPackage?.name}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500">Giá trọn gói:</div>
            <div className="text-lg font-black text-blue-700">{selectedPackage?.priceStr}</div>
          </div>
        </div>

        <Form form={form} layout="vertical" onFinish={(vals) => createOrderMutation.mutate(vals)}>
          <Form.Item label="Chọn Khách Hàng Có Sẵn (Nếu có trong CRM)" name="customerId">
            <Select
              placeholder="Chọn khách hàng đã lưu trong hệ thống (hoặc để trống để tạo mới)"
              allowClear
              showSearch
              optionFilterProp="label"
              options={customers.map((c) => ({
                value: c.id,
                label: `${c.code} - ${c.name} ${c.company ? `(${c.company})` : ""}`,
              }))}
            />
          </Form.Item>

          <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider my-3 pb-1 border-b border-slate-100">
            HOẶC ĐIỀN THÔNG TIN KHÁCH HÀNG MỚI
          </div>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Họ & Tên Người Đặt" name="customerName">
                <Input placeholder="Nguyễn Văn A" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Số Điện Thoại Liên Hệ" name="customerPhone">
                <Input placeholder="0901234567" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Email Nhận Báo Giá & Hợp Đồng" name="customerEmail">
                <Input placeholder="email@company.vn" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tên Công Ty / Doanh Nghiệp" name="customerCompany">
                <Input placeholder="Công ty TNHH..." />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Sales Phụ Trách Đơn Hàng" name="salesRepId">
                <Select
                  placeholder="Gán nhân viên kinh doanh"
                  allowClear
                  options={employees.map((e) => ({
                    value: e.id,
                    label: `${e.employeeCode} - ${e.firstName} ${e.lastName}`,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Chiết Khấu / Ưu Đãi (VNĐ)" name="discount" initialValue={0}>
                <Input placeholder="Giảm giá nếu có" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Yêu Cầu Tính Năng Cụ Thể / Ghi Chú" name="notes">
            <Input.TextArea
              rows={2}
              placeholder="Ví dụ: Cần tích hợp thanh toán VietQR, cần giao diện tông màu xanh lá cây, bàn giao trước ngày 20..."
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
