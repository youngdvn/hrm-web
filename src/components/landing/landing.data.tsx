import React from "react";
import {
  GlobalOutlined,
  ThunderboltOutlined,
  ShoppingCartOutlined,
  CrownOutlined,
  CheckOutlined,
  CloseOutlined,
  LaptopOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { WebPackage, AdvantageItem, WorkflowStep, PortfolioProject } from "./types";

export function getLandingPackages(isVi: boolean): WebPackage[] {
  return [
    {
      id: "basic",
      code: "WEB-BASIC",
      name: isVi ? "Gói Cơ Bản (Landing Page)" : "Basic Landing Page",
      badge: isVi ? "Khởi Nghiệp & Dịch Vụ" : "Startup & Services",
      badgeColor: "blue",
      price: 8900000,
      priceStr: "8.900.000 ₫",
      timeline: isVi ? "5 - 7 ngày" : "5 - 7 days",
      target: isVi
        ? "Doanh nghiệp mới, phòng khám, luật sư, spa hoặc chiến dịch quảng cáo ra mắt 1 sản phẩm."
        : "Startups, law firms, clinics, spas, or single-product launch campaigns.",
      tagline: isVi
        ? "Tối ưu hóa tỷ lệ chuyển đổi, bứt phá doanh số cho chiến dịch quảng cáo"
        : "High-converting landing page crafted for maximum marketing ROI",
      fullDescription: isVi
        ? "Gói Cơ Bản (Landing Page) được thiết kế đặc thù cho các chiến dịch ra mắt sản phẩm mới, chạy quảng cáo Google Ads, Facebook Ads hoặc giới thiệu dịch vụ chuyên nghiệp. Mọi chi tiết trên trang đều được tính toán theo tâm lý học hành vi người dùng (CRO) để tối đa hóa tỷ lệ khách hàng để lại thông tin hoặc bấm gọi hotline ngay."
        : "Engineered specifically for paid marketing campaigns, product launches, and professional services. Focused entirely on Conversion Rate Optimization (CRO).",
      icon: <GlobalOutlined className="text-2xl text-blue-600" />,
      features: isVi
        ? [
            "1 Trang Landing Page chuẩn UX tối ưu tỷ lệ chuyển đổi",
            "Giao diện chuẩn Responsive (Mobile / Tablet / PC)",
            "Tối ưu SEO On-Page chuẩn Google Lighthouse 95+",
            "Tích hợp nút Gọi ngay, Zalo Chat, Form nhận lead",
            "Tặng Tên miền quốc tế .com / .net (1 năm)",
            "Tặng Hosting NVMe tốc độ cao 5GB (1 năm)",
            "Chứng chỉ bảo mật SSL Let's Encrypt miễn phí",
            "Bảo hành kỹ thuật & Vận hành 12 tháng",
          ]
        : [
            "1-page high-converting UX Landing Page",
            "100% Responsive for Mobile / Tablet / PC",
            "On-Page SEO optimized (Google Lighthouse 95+)",
            "Call-to-action buttons, Zalo Chat & lead form",
            "Free .com/.net domain name (1 year)",
            "Free NVMe High-Speed Hosting 5GB (1 year)",
            "Free Let's Encrypt SSL Security Certificate",
            "12-month technical warranty & support",
          ],
      suitableFor: isVi
        ? [
            "Doanh nghiệp mới thành lập muốn ra mắt nhanh với chi phí tiết kiệm",
            "Phòng khám, nha khoa, thẩm mỹ viện, spa, salon",
            "Văn phòng luật sư, công ty tư vấn tài chính, du học",
            "Chiến dịch chạy quảng cáo Facebook Ads, Google Ads cho 1 sản phẩm / dịch vụ chủ lực",
            "Trang giới thiệu sự kiện, hội thảo, khóa học online",
          ]
        : [
            "Early-stage startups needing a rapid, cost-effective launch",
            "Dental clinics, medical practices, beauty spas",
            "Law firms, financial and study abroad consultancies",
            "Dedicated PPC and social ad lead-generation funnels",
            "Event, webinar, and masterclass registration portals",
          ],
      deliverables: [
        {
          category: isVi ? "Giao diện & Trải nghiệm (UI/UX)" : "UI/UX & Mobile Experience",
          iconName: "LaptopOutlined",
          items: isVi
            ? [
                "1 Trang Landing Page dài từ 7 - 10 phân đoạn nội dung logic (Hero, Pain Points, Giải pháp, Tính năng, Bảng giá, Testimonials, FAQ, CTA)",
                "Thiết kế 100% Responsive mượt mà trên iPhone, Samsung, iPad và Desktop",
                "Hiệu ứng chuyển động vi mô (Micro-interactions) tinh tế, tăng cảm xúc tương tác",
                "Nút Gọi Hotline rung lắc nổi bật, Popup Zalo Chat và Form nhận tư vấn tự động",
              ]
            : [
                "7-10 logical conversion sections (Hero, Pain points, Solutions, Proof, FAQ, CTA)",
                "100% mobile responsive fluid viewport on iOS and Android",
                "Subtle micro-animations encouraging user engagement",
                "Floating call button, Zalo chat integration, and lead capture form",
              ],
        },
        {
          category: isVi ? "Tốc độ & Kỹ thuật SEO" : "Speed & SEO Architecture",
          iconName: "ThunderboltOutlined",
          items: isVi
            ? [
                "Điểm Google PageSpeed Insights trên 90+ cả Mobile lẫn Desktop",
                "Tự động nén ảnh WebP thế hệ mới, tải trang dưới 1.2 giây",
                "Cấu trúc Schema.org JSON-LD chuẩn SEO On-Page",
                "Thẻ Meta OpenGraph hiển thị ảnh và tiêu đề đẹp mắt khi chia sẻ Zalo / Facebook",
              ]
            : [
                "Google PageSpeed Insights 90+ on mobile & desktop",
                "Modern WebP image compression with sub-1.2s load time",
                "Schema.org JSON-LD structured data for Google rankings",
                "Rich OpenGraph tags for Facebook & Zalo social sharing",
              ],
        },
        {
          category: isVi ? "Hạ tầng & Quà tặng miễn phí" : "Infrastructure & Inclusions",
          iconName: "GiftOutlined",
          items: isVi
            ? [
                "Tặng miễn phí Tên miền quốc tế (.com / .net) thời hạn 1 năm",
                "Tặng Cloud Hosting NVMe 5GB tốc độ cao, băng thông không giới hạn (1 năm)",
                "Cấp chứng chỉ bảo mật mã hóa SSL Let's Encrypt trọn đời",
                "Cài đặt Google Analytics 4 và Facebook Pixel để theo dõi chuyển đổi quảng cáo",
              ]
            : [
                "Free 1-year international domain registration (.com / .net)",
                "Free 1-year NVMe High-Speed Cloud Hosting 5GB with unlimited bandwidth",
                "Free Let's Encrypt SSL security certificate",
                "GA4 and Facebook Pixel conversion tracking installation",
              ],
        },
        {
          category: isVi ? "Bàn giao & Bảo hành" : "Handover & Warranty",
          iconName: "SafetyCertificateOutlined",
          items: isVi
            ? [
                "Bàn giao 100% source code không mã hóa cho khách hàng toàn quyền sở hữu",
                "Video hướng dẫn thay đổi nội dung, hình ảnh và quản trị đơn giản",
                "Bảo hành và khắc phục sự cố kỹ thuật 24/7 trong suốt 12 tháng",
                "Hỗ trợ xuất hóa đơn VAT tài chính hợp lệ cho doanh nghiệp",
              ]
            : [
                "100% unencrypted source code ownership handover",
                "Video guide for non-technical content and image updates",
                "12 months of active 24/7 technical warranty and maintenance",
                "Official VAT corporate tax invoices included",
              ],
        },
      ],
      milestones: [
        {
          step: "1",
          phase: isVi ? "Tiếp nhận & Lên dàn ý (Wireframe)" : "Brief & Wireframing",
          duration: isVi ? "Ngày 1 - 2" : "Day 1 - 2",
          description: isVi
            ? "Thu thập thông tin dịch vụ, phân tích đối tượng khách hàng mục tiêu, phác thảo cấu trúc nội dung và các lời kêu gọi hành động (CTA)."
            : "Collect requirements, define customer persona, and outline conversion-driven section layout.",
        },
        {
          step: "2",
          phase: isVi ? "Thiết kế giao diện Figma" : "Figma Visual Design",
          duration: isVi ? "Ngày 3 - 4" : "Day 3 - 4",
          description: isVi
            ? "Phác thảo giao diện trực quan, phối màu theo nhận diện thương hiệu và gửi khách hàng duyệt trước khi lập trình."
            : "High-fidelity mockups crafted in Figma tailored to brand colors and customer sign-off.",
        },
        {
          step: "3",
          phase: isVi ? "Lập trình & Tối ưu tốc độ" : "Coding & Speed Optimization",
          duration: isVi ? "Ngày 5 - 6" : "Day 5 - 6",
          description: isVi
            ? "Lập trình mã nguồn Next.js / Tailwind CSS, kết nối Form nhận lead, gắn mã theo dõi và tối ưu Google PageSpeed 95+."
            : "Develop with clean Next.js/Tailwind CSS, integrate forms, analytics, and optimize speed.",
        },
        {
          step: "4",
          phase: isVi ? "Nghiệm thu & Bàn giao Go-Live" : "QA, Domain Launch & Handover",
          duration: isVi ? "Ngày 7" : "Day 7",
          description: isVi
            ? "Trỏ tên miền chính thức, cấu hình SSL, bàn giao source code và kích hoạt bảo hành kỹ thuật 12 tháng."
            : "DNS mapping, SSL activation, source code handover, and warranty activation.",
        },
      ],
      techStack: [
        { name: "Next.js 16", desc: isVi ? "Framework React hiện đại nhất, render siêu tốc" : "Modern React SSR framework" },
        { name: "Tailwind CSS v4", desc: isVi ? "Giao diện siêu nhẹ, responsive hoàn hảo mọi thiết bị" : "Ultra-light responsive styling" },
        { name: "Cloudflare CDN", desc: isVi ? "Mạng phân phối nội dung toàn cầu, chống DDoS" : "Global CDN & security layer" },
        { name: "SSL Let's Encrypt", desc: isVi ? "Mã hóa bảo mật 256-bit chuẩn ngân hàng" : "256-bit HTTPS encryption" },
      ],
      freeGifts: [
        { name: isVi ? "Tên miền quốc tế (.com/.net)" : "International Domain (.com/.net)", value: "350.000 ₫", desc: isVi ? "Miễn phí năm đầu tiên" : "Free 1st year" },
        { name: isVi ? "Hosting NVMe Cloud 5GB" : "NVMe Cloud Hosting 5GB", value: "1.200.000 ₫", desc: isVi ? "Băng thông không giới hạn, máy chủ Singapore/VN" : "Unlimited bandwidth" },
        { name: isVi ? "Cài đặt GA4 & Facebook Pixel" : "Analytics & Pixel Tracking", value: "800.000 ₫", desc: isVi ? "Đo lường chính xác chuyển đổi quảng cáo" : "Turnkey setup" },
        { name: isVi ? "Bảo mật SSL Let's Encrypt" : "SSL Security Certificate", value: "500.000 ₫", desc: isVi ? "Cài đặt và tự động gia hạn" : "Lifetime auto-renewal" },
      ],
      packageFaqs: [
        {
          q: isVi ? "Gói này có chỉnh sửa được nội dung sau khi bàn giao không?" : "Can I edit content after project handover?",
          a: isVi ? "Có. Chúng tôi bàn giao toàn bộ mã nguồn sạch cùng tài liệu và video hướng dẫn từng bước. Bạn có thể tự thay đổi số điện thoại, hình ảnh, văn bản dễ dàng." : "Yes. Complete source code and a video walkthrough are provided for easy content updates.",
        },
        {
          q: isVi ? "Sau này tôi muốn nâng cấp lên website nhiều trang thì có phải làm lại từ đầu không?" : "Can I upgrade to a multi-page site later without starting over?",
          a: isVi ? "Hoàn toàn không. Kiến trúc mã nguồn được xây dựng theo mô-đun chuẩn Next.js, chúng tôi có thể mở rộng thêm các trang con và tính năng mới mà giữ nguyên toàn bộ giao diện và dữ liệu cũ." : "No. Modular architecture allows easy expansion into multi-page sites seamlessly.",
        },
        {
          q: isVi ? "Sau 1 năm chi phí duy trì là bao nhiêu?" : "What are the renewal fees after the first year?",
          a: isVi ? "Từ năm thứ 2 trở đi, bạn chỉ cần duy trì chi phí Tên miền và Hosting cơ bản (khoảng 1.200.000 ₫ - 1.500.000 ₫/năm), không phát sinh bất kỳ phí phần mềm nào khác." : "Only standard domain and hosting renewal fees apply (~$50-$70/year). No software fees.",
        },
      ],
      border: "border-slate-200",
      popular: false,
    },
    {
      id: "standard",
      code: "WEB-STANDARD",
      name: isVi ? "Gói Doanh Nghiệp Tiêu Chuẩn" : "Standard Business Web",
      badge: isVi ? "★ Được Chọn Nhiều Nhất" : "★ Most Popular",
      badgeColor: "gold",
      price: 18500000,
      priceStr: "18.500.000 ₫",
      timeline: isVi ? "10 - 14 ngày" : "10 - 14 days",
      target: isVi
        ? "Công ty sản xuất, thương mại, bất động sản, tài chính cần website đa trang chuyên nghiệp."
        : "Manufacturing, trading, real estate, and finance firms requiring a multi-page portal.",
      tagline: isVi
        ? "Xây dựng nhận diện thương hiệu số đẳng cấp, độc quyền và chuẩn SEO cho doanh nghiệp"
        : "Tailored corporate web identity with custom design & lightning performance",
      fullDescription: isVi
        ? "Gói Doanh Nghiệp Tiêu Chuẩn là giải pháp website toàn diện dành cho các công ty muốn khẳng định uy tín và vị thế trên thị trường. Giao diện được thiết kế độc quyền 100% trên Figma theo đúng nhận diện thương hiệu, kết hợp hệ quản trị CMS tiếng Việt trực quan cho phép tự quản lý tin tức, dịch vụ, dự án mà không cần kiến thức kỹ thuật."
        : "Our flagship solution for corporate credibility. Features 100% custom UI/UX design matching corporate brand guidelines and an intuitive visual CMS for non-technical team members.",
      icon: <ThunderboltOutlined className="text-2xl text-amber-500" />,
      features: isVi
        ? [
            "Thiết kế UI/UX độc quyền theo bộ nhận diện thương hiệu",
            "Cấu trúc 5 - 10 trang: Trang chủ, Giới thiệu, Sản phẩm, Tin tức...",
            "Hệ quản trị CMS tiếng Việt trực quan, tự sửa ảnh & bài viết",
            "Tối ưu tốc độ tải trang dưới 1.5 giây",
            "Tích hợp Google Analytics 4, Facebook Pixel, Google Tag Manager",
            "Tặng Tên miền .vn hoặc .com cao cấp (1 năm)",
            "Tặng Hosting Cloud 15GB băng thông không giới hạn (1 năm)",
            "Tặng 5 Email doanh nghiệp theo tên miền (user@company.vn)",
            "Bàn giao 100% mã nguồn & Hướng dẫn sử dụng 1-1",
            "Bảo hành kỹ thuật trọn đời khi dùng hosting hệ thống",
          ]
        : [
            "Exclusive UI/UX design tailored to brand identity",
            "5 - 10 pages: Home, About, Services, Projects, News, Contact",
            "Easy-to-use CMS for non-technical content management",
            "Optimized page load speed under 1.5 seconds",
            "Integrated GA4, Facebook Pixel, Google Tag Manager",
            "Free premium .vn or .com domain (1 year)",
            "Free 15GB Unlimited Bandwidth Cloud Hosting (1 year)",
            "Free 5 branded corporate emails (user@company.vn)",
            "Full source code ownership & 1-on-1 walkthrough",
            "Lifetime technical warranty on managed hosting",
          ],
      suitableFor: isVi
        ? [
            "Công ty sản xuất, xuất nhập khẩu, thương mại, gia công",
            "Doanh nghiệp bất động sản, xây dựng, kiến trúc nội thất",
            "Tổ chức tài chính, quỹ đầu tư, bảo hiểm, kiểm toán",
            "Khách sạn, khu nghỉ dưỡng, công ty du lịch lữ hành",
            "Các doanh nghiệp muốn thay thế website cũ lỗi thời, chậm chạp bằng website chuẩn quốc tế",
          ]
        : [
            "Manufacturing, export-import, and trading enterprises",
            "Real estate developers, construction, and architecture studios",
            "Financial institutions, auditing, and investment firms",
            "Hotels, luxury resorts, and travel agencies",
            "Companies upgrading outdated legacy websites to modern web standards",
          ],
      deliverables: [
        {
          category: isVi ? "Cấu trúc trang & Thiết kế độc quyền" : "Page Structure & Custom UI",
          iconName: "LaptopOutlined",
          items: isVi
            ? [
                "Cấu trúc từ 5 - 10 trang chuyên biệt: Trang chủ, Giới thiệu công ty & Năng lực, Danh mục Dịch vụ/Sản phẩm, Chi tiết dự án, Tin tức & Sự kiện, Tuyển dụng, Liên hệ",
                "Thiết kế 100% độc quyền trên Figma theo chuẩn Brand Guidelines & phong thủy màu sắc công ty",
                "Banner tương tác slider, thư viện ảnh dự án chất lượng cao, bản đồ Google Maps tương tác",
                "Cổng nhận yêu cầu báo giá tự động gửi thông báo về email ban giám đốc ngay tức thì",
              ]
            : [
                "5-10 tailored pages: Home, About & Profile, Services, Projects, News, Careers, Contact",
                "100% bespoke Figma UI design matching brand aesthetics",
                "Interactive media galleries, project case studies, and dynamic Google Maps",
                "Automated quote request engine with instant leadership email dispatch",
              ],
        },
        {
          category: isVi ? "Hệ quản trị nội dung CMS Tiếng Việt" : "Visual CMS Management",
          iconName: "RocketOutlined",
          items: isVi
            ? [
                "Hệ quản trị CMS độc quyền 100% bằng Tiếng Việt thân thiện, không cần biết code",
                "Dễ dàng đăng bài viết tin tức chuẩn SEO, thay đổi banner, cập nhật dự án mới",
                "Trình soạn thảo văn bản phong phú (Rich-text editor) hỗ trợ chèn video, bảng biểu, tài liệu PDF",
                "Quản lý danh sách khách hàng liên hệ và xuất file Excel báo cáo định kỳ",
              ]
            : [
                "Intuitive visual CMS tailored in Vietnamese & English with zero coding required",
                "Effortless SEO blog publishing, banner rotation, and project showcase management",
                "Rich text editor with embedded YouTube, tables, and downloadable PDF brochures",
                "Customer inquiry directory with instant Excel export capabilities",
              ],
        },
        {
          category: isVi ? "Hạ tầng & Email Doanh Nghiệp" : "Infrastructure & Corporate Email",
          iconName: "GiftOutlined",
          items: isVi
            ? [
                "Tặng Tên miền quốc gia thương hiệu .vn hoặc quốc tế .com cao cấp (1 năm)",
                "Tặng Cloud Hosting SSD 15GB chuyên dụng cho doanh nghiệp, băng thông không giới hạn",
                "Tặng 5 tài khoản Email doanh nghiệp theo tên miền (ví dụ: contact@tencongty.vn)",
                "Chứng chỉ bảo mật SSL cao cấp và sao lưu dữ liệu tự động hàng tuần",
              ]
            : [
                "Free 1-year premium domain (.vn or .com)",
                "Free 15GB SSD Cloud Hosting with unlimited bandwidth",
                "5 corporate branded email mailboxes (e.g. contact@company.vn)",
                "High-grade SSL and automated offsite weekly backups",
              ],
        },
        {
          category: isVi ? "Bàn giao & Cam kết bảo hành" : "Handover & Lifetime SLA",
          iconName: "SafetyCertificateOutlined",
          items: isVi
            ? [
                "Bàn giao 100% source code, file thiết kế gốc Figma và quyền sở hữu máy chủ",
                "Tổ chức buổi đào tạo hướng dẫn sử dụng 1-1 trực tiếp hoặc qua Zoom",
                "Bảo hành kỹ thuật trọn đời khi duy trì hạ tầng hosting hệ thống",
                "Hỗ trợ kỹ thuật trực tiếp 24/7 qua nhóm Zalo riêng biệt",
              ]
            : [
                "100% source code, Figma design files, and database ownership handover",
                "Personalized 1-on-1 walkthrough training session for your staff",
                "Lifetime technical warranty on our managed infrastructure",
                "Direct 24/7 dedicated support desk via private communication channel",
              ],
        },
      ],
      milestones: [
        {
          step: "1",
          phase: isVi ? "Khảo sát, Sitemap & Wireframe" : "Discovery & Sitemap Architecture",
          duration: isVi ? "Ngày 1 - 3" : "Day 1 - 3",
          description: isVi
            ? "Làm việc cùng ban lãnh đạo doanh nghiệp để thống nhất cấu trúc 5 - 10 trang, sitemap và tài liệu thương hiệu."
            : "Review brand materials, sitemap structure, and project goals with company stakeholders.",
        },
        {
          step: "2",
          phase: isVi ? "Thiết kế UI/UX trên Figma" : "Exclusive Figma Design",
          duration: isVi ? "Ngày 4 - 7" : "Day 4 - 7",
          description: isVi
            ? "Thiết kế chi tiết từng trang trên Figma, hỗ trợ chỉnh sửa theo phản hồi đến khi khách hàng hoàn toàn ưng ý."
            : "Full prototype design on Figma with revisions based on stakeholder review.",
        },
        {
          step: "3",
          phase: isVi ? "Lập trình Web & Tích hợp CMS" : "Full-Stack Coding & CMS Setup",
          duration: isVi ? "Ngày 8 - 11" : "Day 8 - 11",
          description: isVi
            ? "Lập trình frontend Next.js 16, backend CMS quản trị, cài đặt bộ lọc dự án và tối ưu tốc độ dưới 1.5s."
            : "Next.js 16 frontend, visual CMS engine, dynamic project filters, and sub-1.5s speed optimization.",
        },
        {
          step: "4",
          phase: isVi ? "Đào tạo quản trị, Go-Live & Nghiệm thu" : "Staff Training, Go-Live & Sign-off",
          duration: isVi ? "Ngày 12 - 14" : "Day 12 - 14",
          description: isVi
            ? "Đào tạo nhân sự nhập liệu bài viết, trỏ tên miền chính thức, bàn giao mã nguồn và hợp đồng bảo hành."
            : "Train client team on CMS updates, map production domain, and hand over source code.",
        },
      ],
      techStack: [
        { name: "Next.js 16 (App Router)", desc: isVi ? "Kiến trúc Server Components tải nhanh vượt trội" : "Blazing fast SSR & Server Components" },
        { name: "TypeScript & Tailwind CSS", desc: isVi ? "Mã nguồn sạch, chuẩn bảo mật và dễ mở rộng" : "Type-safe robust architecture" },
        { name: "Ant Design 6 CMS", desc: isVi ? "Giao diện quản trị chuyên nghiệp chuẩn quốc tế" : "Enterprise-grade admin panel" },
        { name: "Cloudflare CDN & SSL", desc: isVi ? "Tối ưu phân phối toàn cầu và bảo mật đa tầng" : "Global CDN and automated SSL" },
      ],
      freeGifts: [
        { name: isVi ? "Tên miền .vn hoặc .com cao cấp" : "Premium Domain (.vn / .com)", value: "750.000 ₫", desc: isVi ? "Miễn phí năm đầu tiên" : "Free 1st year" },
        { name: isVi ? "Cloud Hosting SSD 15GB Doanh Nghiệp" : "Enterprise SSD Cloud Hosting 15GB", value: "2.400.000 ₫", desc: isVi ? "Băng thông không giới hạn, sao lưu tự động" : "Unlimited bandwidth" },
        { name: isVi ? "5 Email doanh nghiệp theo tên miền" : "5 Branded Corporate Emails", value: "1.500.000 ₫", desc: isVi ? "Đẳng cấp trao đổi thư từ với đối tác" : "Free 1st year" },
        { name: isVi ? "File thiết kế gốc UI/UX Figma" : "Complete Master Figma UI System", value: "5.000.000 ₫", desc: isVi ? "Bàn giao toàn bộ bản quyền thiết kế" : "Full IP ownership" },
      ],
      packageFaqs: [
        {
          q: isVi ? "Chúng tôi có thể tự thêm nhân viên để quản trị website được không?" : "Can we add multiple team members to manage content?",
          a: isVi ? "Có. Hệ quản trị CMS cho phép tạo nhiều tài khoản cho nhân viên biên tập nội dung, nhân viên kinh doanh với phân quyền rõ ràng." : "Yes. You can create multiple user accounts for editors and marketing team members.",
        },
        {
          q: isVi ? "Website có chuẩn SEO để lên top Google được không?" : "Is the website architected for top Google rankings?",
          a: isVi ? "100% chuẩn SEO On-Page. Mã nguồn được tối ưu Semantic HTML5, Schema JSON-LD, Sitemap XML tự động và thẻ OpenGraph mạng xã hội." : "100% On-Page SEO optimized with Semantic HTML5, Schema JSON-LD, and automated XML sitemaps.",
        },
        {
          q: isVi ? "Chính sách bảo hành trọn đời nghĩa là như thế nào?" : "What does the lifetime warranty cover?",
          a: isVi ? "Khi bạn sử dụng hạ tầng hosting do chúng tôi cung cấp và quản lý, mọi lỗi phát sinh do kỹ thuật, tương thích trình duyệt hay cập nhật hệ thống đều được chúng tôi sửa chữa hoàn toàn miễn phí trọn đời." : "As long as your website runs on our managed hosting, all technical bugs are patched free of charge forever.",
        },
      ],
      border: "border-blue-500 ring-2 ring-blue-500/20 shadow-xl",
      popular: true,
    },
    {
      id: "ecommerce",
      code: "WEB-ECOMMERCE",
      name: isVi ? "Gói Bán Hàng E-Commerce" : "E-Commerce Pro Store",
      badge: isVi ? "Bán Hàng Online" : "Online Retail",
      badgeColor: "green",
      price: 29900000,
      priceStr: "29.900.000 ₫",
      timeline: isVi ? "15 - 20 ngày" : "15 - 20 days",
      target: isVi
        ? "Chuỗi cửa hàng, thời trang, mỹ phẩm, đồ gia dụng cần bán hàng và thu tiền trực tuyến tự động."
        : "Retail stores, fashion, beauty, food brands selling products and processing online orders.",
      tagline: isVi
        ? "Cỗ máy bán hàng online tự động 24/7 với cổng thanh toán QR ngân hàng và quản lý kho thông minh"
        : "Automated 24/7 online store with instant VietQR payments & inventory sync",
      fullDescription: isVi
        ? "Gói Bán Hàng E-Commerce biến website thành một cửa hàng trực tuyến thông minh hoạt động 24/7. Tích hợp thanh toán quét mã VietQR tự động nhận diện tiền về tài khoản, quản lý biến thể sản phẩm, tồn kho, tự động tính phí ship và gửi email xác nhận cho khách hàng ngay khi đặt hàng thành công."
        : "An intelligent end-to-end e-commerce engine operating around the clock. Features automated VietQR bank payments, inventory control, automated shipping rate calculation, and promo code engines.",
      icon: <ShoppingCartOutlined className="text-2xl text-emerald-600" />,
      features: isVi
        ? [
            "Tất cả quyền lợi của Gói Doanh Nghiệp Tiêu Chuẩn",
            "Quản lý danh mục sản phẩm không giới hạn, biến thể (size, màu)",
            "Thanh toán trực tuyến: Quét mã VietQR tự động, VNPAY, MoMo, COD",
            "Quản lý đơn hàng, tồn kho, tự động tính phí ship GHN/GHTK",
            "Tự động gửi email xác nhận đơn cho khách hàng & chủ shop",
            "Hệ thống tạo mã giảm giá, voucher khuyến mãi, flash sale",
            "Tặng Cloud Server SSD 30GB chuyên dụng cho E-commerce (1 năm)",
            "Tặng 10 Email doanh nghiệp theo tên miền",
            "Bảo hành & Hỗ trợ kỹ thuật ưu tiên 24/7 trong 12 tháng",
          ]
        : [
            "All Standard Business package privileges",
            "Unlimited product catalog with variants (color, size, price)",
            "Instant payments: VietQR scan, VNPAY, MoMo, COD",
            "Order & inventory management with automated shipping rates",
            "Automated order confirmation emails to customer & store admin",
            "Promo code engine, flash sale & discount campaign tools",
            "Free Dedicated E-Commerce SSD Cloud Server 30GB (1 year)",
            "Free 10 corporate branded email accounts",
            "Priority 24/7 technical assistance for 12 months",
          ],
      suitableFor: isVi
        ? [
            "Cửa hàng và chuỗi bán lẻ thời trang, giày dép, phụ kiện",
            "Thương hiệu mỹ phẩm, làm đẹp, thực phẩm chức năng",
            "Siêu thị thực phẩm sạch, nông sản, đồ uống",
            "Doanh nghiệp phân phối thiết bị điện máy, đồ gia dụng, nội thất",
            "Các chủ shop kinh doanh đa kênh muốn tự chủ kênh bán lẻ mà không phụ thuộc vào sàn TMĐT",
          ]
        : [
            "Fashion, footwear, and lifestyle retail brands",
            "Cosmetics, skincare, and health supplement businesses",
            "Organic grocery stores and specialty food delivery",
            "Electronics, appliances, and home furniture distributors",
            "Brands seeking direct-to-consumer (D2C) independence from marketplaces",
          ],
      deliverables: [
        {
          category: isVi ? "Quản lý sản phẩm & Giỏ hàng chuyên sâu" : "Catalog & Shopping Cart",
          iconName: "ShoppingCartOutlined",
          items: isVi
            ? [
                "Danh mục sản phẩm không giới hạn, hỗ trợ biến thể phức tạp (màu sắc, kích thước, dung tích, giá biến thiên)",
                "Bộ lọc sản phẩm thông minh đa tiêu chí (theo khoảng giá, thương hiệu, đánh giá sao, tình trạng còn hàng)",
                "Giỏ hàng Ajax tiện lợi, hiển thị popup thêm vào giỏ tức thì không cần tải lại trang",
                "Quản lý tồn kho tự động, cảnh báo khi sản phẩm sắp hết hàng",
              ]
            : [
                "Unlimited product catalog with dynamic variants (color, size, weight, variable price)",
                "Multi-faceted search filters (price range, brand, ratings, stock availability)",
                "Seamless Ajax slide-in shopping cart with zero page reloads",
                "Automated inventory management with low-stock threshold alerts",
              ],
        },
        {
          category: isVi ? "Cổng thanh toán & Vận chuyển tự động" : "Payment & Shipping Gateways",
          iconName: "ThunderboltOutlined",
          items: isVi
            ? [
                "Thanh toán quét mã VietQR tự động: Tạo mã QR động kèm nội dung đơn hàng, hệ thống tự động xác nhận khi tiền về",
                "Tích hợp các cổng thanh toán online phổ biến: VNPAY, MoMo, thẻ nội địa ATM, thẻ quốc tế Visa/MasterCard",
                "Hỗ trợ thanh toán khi nhận hàng (COD) với tùy chọn xác thực số điện thoại OTP",
                "Tự động tính phí vận chuyển thông minh theo địa chỉ nhận hàng kết nối API GHTK / GHN",
              ]
            : [
                "Dynamic VietQR scan payments with instant automated payment reconciliation",
                "Full integration of VNPAY, MoMo, domestic ATM, and Visa/MasterCard gateways",
                "COD order support with optional phone OTP confirmation",
                "Real-time shipping fee calculation connected to GHN/GHTK APIs",
              ],
        },
        {
          category: isVi ? "Công cụ Marketing & Tăng doanh số" : "Marketing & Promotional Engine",
          iconName: "RocketOutlined",
          items: isVi
            ? [
                "Hệ thống tạo mã giảm giá, voucher khuyến mãi, freeship và giảm theo phần trăm đơn hàng",
                "Tính năng tạo chiến dịch Flash Sale theo khung giờ đếm ngược (Countdown timer)",
                "Tự động gửi email xác nhận đơn hàng kèm hóa đơn chi tiết cho khách và thông báo Telegram/Zalo cho chủ shop",
                "Báo cáo biểu đồ doanh thu theo ngày, tuần, tháng, phân tích sản phẩm bán chạy nhất",
              ]
            : [
                "Coupon code engine for percentage discounts, fixed vouchers, and free shipping",
                "Flash Sale campaign scheduler with real-time countdown timers",
                "Automated order confirmation emails and Telegram/Zalo order notifications",
                "Live revenue analytics dashboard with top-selling product insights",
              ],
        },
        {
          category: isVi ? "Hạ tầng E-Commerce & Bảo mật" : "Cloud Server & SLA",
          iconName: "SafetyCertificateOutlined",
          items: isVi
            ? [
                "Tặng Cloud Server SSD 30GB chuyên dụng cho E-commerce, chịu tải hàng nghìn đơn hàng đồng thời",
                "Tặng 10 Email doanh nghiệp theo tên miền (sales@company.vn, order@company.vn)",
                "Cài đặt chứng chỉ bảo mật mã hóa giao dịch SSL EV",
                "Đội ngũ kỹ thuật hỗ trợ ưu tiên 24/7 giải quyết sự cố tức thì trong vòng 15 phút",
              ]
            : [
                "Free 30GB Dedicated SSD E-Commerce Cloud Server handling high concurrent traffic",
                "10 branded corporate emails (sales@company.vn, support@company.vn)",
                "High-grade transaction SSL encryption",
                "Priority 24/7 technical assistance SLA with 15-minute response time",
              ],
        },
      ],
      milestones: [
        {
          step: "1",
          phase: isVi ? "Khảo sát mô hình bán hàng & UX E-Commerce" : "E-Commerce Strategy & Flow",
          duration: isVi ? "Ngày 1 - 4" : "Day 1 - 4",
          description: isVi
            ? "Xác định cấu trúc danh mục sản phẩm, chính sách thanh toán, phí vận chuyển và luồng mua hàng (Checkout flow)."
            : "Define product taxonomies, payment gateways, shipping methods, and checkout funnels.",
        },
        {
          step: "2",
          phase: isVi ? "Thiết kế UI/UX Gian hàng trên Figma" : "Storefront Figma Design",
          duration: isVi ? "Ngày 5 - 9" : "Day 5 - 9",
          description: isVi
            ? "Thiết kế chi tiết Trang chủ, Trang danh mục, Trang chi tiết sản phẩm, Giỏ hàng và Trang thanh toán tối ưu chuyển đổi."
            : "Design Home, Catalog, Product details, Cart, and streamlined Checkout screens.",
        },
        {
          step: "3",
          phase: isVi ? "Lập trình Cổng thanh toán & Vận chuyển" : "Payment & Shipping Integration",
          duration: isVi ? "Ngày 10 - 16" : "Day 10 - 16",
          description: isVi
            ? "Lập trình hệ thống quản lý kho, kết nối VietQR quét mã tự động, VNPAY, tích hợp API đơn vị vận chuyển."
            : "Develop inventory database, VietQR automated scan logic, VNPAY, and shipping rate APIs.",
        },
        {
          step: "4",
          phase: isVi ? "Test đặt hàng, Đào tạo quản lý đơn & Bàn giao" : "Test Orders, Staff Training & Launch",
          duration: isVi ? "Ngày 17 - 20" : "Day 17 - 20",
          description: isVi
            ? "Chạy thử nghiệm toàn bộ quy trình mua hàng thực tế, đào tạo nhân viên xử lý đơn và bàn giao go-live."
            : "Simulate end-to-end purchasing, train fulfillment staff on order processing, and go live.",
        },
      ],
      techStack: [
        { name: "Next.js 16 + Zustand", desc: isVi ? "Xử lý giỏ hàng và danh mục siêu mượt không lag" : "Smooth client-side cart & state management" },
        { name: "VietQR API Open Banking", desc: isVi ? "Tự động nhận diện tiền về tài khoản ngân hàng" : "Instant automated bank transfer reconciliation" },
        { name: "PostgreSQL Database", desc: isVi ? "Cơ sở dữ liệu lưu trữ hàng triệu sản phẩm và đơn hàng an toàn" : "Robust enterprise-grade relational database" },
        { name: "VNPAY / MoMo SDK", desc: isVi ? "Cổng thanh toán trực tuyến tiêu chuẩn ngân hàng" : "PCI-DSS compliant payment gateways" },
      ],
      freeGifts: [
        { name: isVi ? "Tên miền .vn hoặc .com cao cấp" : "Premium Domain (.vn / .com)", value: "750.000 ₫", desc: isVi ? "Miễn phí năm đầu tiên" : "Free 1st year" },
        { name: isVi ? "Cloud Server E-Commerce SSD 30GB" : "Dedicated E-Commerce SSD Server 30GB", value: "3.600.000 ₫", desc: isVi ? "Tối ưu tải cao, chịu nghẽn mạng" : "High concurrency" },
        { name: isVi ? "10 Email doanh nghiệp chuyên nghiệp" : "10 Branded Corporate Emails", value: "3.000.000 ₫", desc: isVi ? "Chia phòng ban: sales, cskh, order..." : "For all department teams" },
        { name: isVi ? "Tích hợp miễn phí cổng VietQR" : "Free VietQR Gateway Integration", value: "2.000.000 ₫", desc: isVi ? "Không phụ thuộc bên thứ 3" : "Zero recurring gateway fee" },
      ],
      packageFaqs: [
        {
          q: isVi ? "Khách chuyển khoản quét mã VietQR thì tiền về đâu?" : "Where do customer VietQR payments go?",
          a: isVi ? "Tiền về thẳng 100% tài khoản ngân hàng chính chủ của công ty bạn ngay lập tức, không qua ví trung gian và không bị giữ tiền hay mất chiết khấu." : "100% of customer funds transfer directly to your designated business bank account immediately.",
        },
        {
          q: isVi ? "Website có giới hạn số lượng sản phẩm đăng lên không?" : "Is there any limit to the number of products I can upload?",
          a: isVi ? "Hoàn toàn không giới hạn. Bạn có thể đăng tải từ hàng trăm đến hàng chục nghìn sản phẩm cùng nhiều biến thể mà không bị tính thêm bất kỳ khoản phí nào." : "Zero limits. Upload hundreds or tens of thousands of products with full variant support.",
        },
        {
          q: isVi ? "Tôi có thể xuất hóa đơn điện tử cho khách hàng mua hàng không?" : "Can we integrate electronic VAT invoicing for customer orders?",
          a: isVi ? "Có. Hệ thống có sẵn API để kết nối trực tiếp với các nhà cung cấp hóa đơn điện tử như VNPT, Viettel, MISA meInvoice khi bạn có nhu cầu." : "Yes. APIs are ready to connect to e-invoicing providers such as MISA, VNPT, and Viettel.",
        },
      ],
      border: "border-slate-200",
      popular: false,
    },
    {
      id: "enterprise",
      code: "WEB-ENTERPRISE",
      name: isVi ? "Gói Web App & Portal Theo Yêu Cầu" : "Enterprise Web Portal",
      badge: isVi ? "Quy Mô Lớn" : "Custom Architecture",
      badgeColor: "purple",
      price: 55000000,
      priceStr: isVi ? "Từ 55.000.000 ₫" : "From $2,200",
      timeline: isVi ? "25 - 45 ngày" : "25 - 45 days",
      target: isVi
        ? "Tập đoàn, trường học, bệnh viện hoặc startup cần nền tảng web portal, cổng nội bộ kết nối API."
        : "Corporations, universities, hospitals, or startups needing bespoke web portals and APIs.",
      tagline: isVi
        ? "Kiến trúc Full-Stack tùy biến cao cấp cho tập đoàn, trường học, bệnh viện và cổng nội bộ API"
        : "Bespoke full-stack architecture for enterprise portals & interconnected systems",
      fullDescription: isVi
        ? "Gói Web App & Portal Theo Yêu Cầu giải quyết các bài toán vận hành phức tạp với kiến trúc phân quyền đa cấp độ (RBAC), cổng thông tin khách hàng thời gian thực (Customer Portal), và kết nối API hai chiều với hệ thống ERP, CRM, HRM nội bộ hoặc hóa đơn điện tử."
        : "Engineered for complex workflows, high concurrency, and multi-system orchestration. Features granular Role-Based Access Control (RBAC), real-time Customer Portals, and bi-directional API synchronizations.",
      icon: <CrownOutlined className="text-2xl text-purple-600" />,
      features: isVi
        ? [
            "Lập trình Full-Stack hiện đại: Next.js 16 + Node.js + PostgreSQL",
            "Thiết kế toàn diện Design System trên Figma trước khi code",
            "Cổng thông tin khách hàng (Customer Portal) tra cứu theo thời gian thực",
            "Tích hợp API đa hệ thống: Đồng bộ HRM, CRM, ERP, Hóa đơn điện tử",
            "Phân quyền người dùng đa cấp độ (RBAC), bảo mật 2 lớp 2FA",
            "Kiến trúc chịu tải cao (High Availability), chống tấn công DDoS",
            "Tặng Hạ tầng Cloud Server riêng biệt cấu hình cao (1 năm)",
            "Cam kết SLA hỗ trợ kỹ thuật ưu tiên 24/7 trong 24 tháng",
          ]
        : [
            "Modern Full-Stack architecture: Next.js 16 + Node.js + PostgreSQL",
            "Complete Enterprise Design System on Figma prior to coding",
            "Real-time Customer Portal with live account lookup",
            "Seamless API integrations: HRM, CRM, ERP, e-Invoicing",
            "Multi-tier Role-Based Access Control (RBAC) & 2FA security",
            "High-availability architecture resilient against DDoS spikes",
            "Free dedicated high-performance Cloud Server (1 year)",
            "Strict 24/7 priority SLA support agreement for 24 months",
          ],
      suitableFor: isVi
        ? [
            "Tập đoàn đa quốc gia và tổng công ty nhiều chi nhánh",
            "Hệ thống trường đại học, học viện, trung tâm đào tạo trực tuyến",
            "Bệnh viện, phòng khám quy mô lớn với hồ sơ bệnh án điện tử",
            "Startup công nghệ (SaaS, FinTech, EdTech) cần MVP hoặc sản phẩm hoàn thiện",
            "Doanh nghiệp cần cổng thông tin đối tác B2B (Vendor / Partner Extranet)",
          ]
        : [
            "Multinational corporations and multi-branch enterprises",
            "Universities, academies, and online learning platforms",
            "Hospitals and clinic chains requiring electronic patient records",
            "Tech startups (SaaS, FinTech, EdTech) building scalable MVPs",
            "Enterprises requiring dedicated B2B partner and supplier extranets",
          ],
      deliverables: [
        {
          category: isVi ? "Cổng thông tin & Phân quyền đa cấp độ" : "Portal Architecture & RBAC",
          iconName: "LaptopOutlined",
          items: isVi
            ? [
                "Cổng thông tin khách hàng (Customer Portal) bảo mật: Đăng nhập, tra cứu hồ sơ, theo dõi tiến độ hợp đồng, xuất hóa đơn",
                "Phân quyền người dùng RBAC linh hoạt (Super Admin, Quản lý chi nhánh, Kế toán, Kinh doanh, Khách hàng)",
                "Bảo mật xác thực 2 lớp (2FA qua Google Authenticator / SMS OTP) bảo vệ tài khoản quản trị",
                "Ghi log kiểm toán (Audit Trail) lưu trữ toàn bộ lịch sử thao tác của người dùng",
              ]
            : [
                "Secure Customer Portal: Profile management, contract tracking, live records, and statements",
                "Granular Role-Based Access Control (Super Admin, Branch Managers, Accountants, Sales, Clients)",
                "Two-Factor Authentication (2FA via Authenticator / SMS OTP) for administrative security",
                "Immutable Audit Trail logging all user modifications and system events",
              ],
        },
        {
          category: isVi ? "Tích hợp API đa hệ thống" : "Multi-System API Integration",
          iconName: "ThunderboltOutlined",
          items: isVi
            ? [
                "Đồng bộ hai chiều với hệ thống ERP, CRM, HRM nội bộ theo thời gian thực",
                "Kết nối cổng Hóa đơn điện tử (MISA, Viettel, VNPT) tự động phát hành hóa đơn",
                "Kết nối máy chấm công vân tay / FaceID và GPS di động",
                "Webhook và kiến trúc API RESTful / GraphQL chuẩn tài liệu Swagger / OpenAPI",
              ]
            : [
                "Bi-directional real-time sync with internal ERP, CRM, and HRM backbones",
                "Automated electronic invoice generation via VNPT, Viettel, and MISA gateways",
                "Biometric fingerprint, FaceID, and mobile GPS attendance synchronization",
                "RESTful & GraphQL API architecture with complete interactive Swagger documentation",
              ],
        },
        {
          category: isVi ? "Hạ tầng chịu tải cao & Bảo mật tối đa" : "High Availability & Cloud",
          iconName: "SafetyCertificateOutlined",
          items: isVi
            ? [
                "Kiến trúc chịu tải cao (High Availability), Auto-scaling xử lý hàng chục nghìn lượt truy cập đồng thời",
                "Triển khai Docker Container, cơ sở dữ liệu phân cụm (Clustered PostgreSQL)",
                "Hệ thống tường lửa ứng dụng web (WAF) và chống tấn công DDoS đa tầng",
                "Cơ chế sao lưu dữ liệu tự động theo thời gian thực (Point-in-time Recovery)",
              ]
            : [
                "High-availability architecture with auto-scaling handling tens of thousands of concurrent users",
                "Containerized Docker infrastructure with clustered PostgreSQL database",
                "Multi-layered Web Application Firewall (WAF) and DDoS mitigation",
                "Automated point-in-time database disaster recovery backup routines",
              ],
        },
        {
          category: isVi ? "Cam kết SLA & Hợp đồng bảo hành" : "24/7 SLA Agreement",
          iconName: "GiftOutlined",
          items: isVi
            ? [
                "Tặng Hạ tầng Cloud Server riêng biệt cấu hình cao trong 1 năm đầu tiên",
                "Bàn giao 100% bản quyền mã nguồn, tài liệu kiến trúc kỹ thuật và sơ đồ cơ sở dữ liệu ERD",
                "Cam kết thỏa thuận mức dịch vụ (SLA 24/7) bảo hành kỹ thuật ưu tiên trong suốt 24 tháng",
                "Hỗ trợ chuyên gia kỹ thuật cao cấp trực tiếp giải quyết vấn đề trong 15 phút",
              ]
            : [
                "Free dedicated high-performance Cloud Server infrastructure for 1 full year",
                "Complete IP handover of unencrypted code, database schemas, and architectural blueprints",
                "Strict 24-month priority 24/7 Service Level Agreement (SLA)",
                "Senior software architect response within 15 minutes for critical incidents",
              ],
        },
      ],
      milestones: [
        {
          step: "1",
          phase: isVi ? "Phân tích yêu cầu & Thiết kế kiến trúc" : "Architectural Specification",
          duration: isVi ? "Ngày 1 - 7" : "Day 1 - 7",
          description: isVi
            ? "Lập tài liệu đặc tả yêu cầu phần mềm (SRS), thiết kế sơ đồ cơ sở dữ liệu (ERD) và cấu trúc API."
            : "Formulate Software Requirements Specification (SRS), ERD database schema, and API architecture.",
        },
        {
          step: "2",
          phase: isVi ? "Xây dựng trọn bộ Design System Figma" : "Master Design System",
          duration: isVi ? "Ngày 8 - 16" : "Day 8 - 16",
          description: isVi
            ? "Thiết kế toàn bộ màn hình tương tác, cổng khách hàng, bảng điều khiển quản trị và duyệt mẫu prototype."
            : "High-fidelity interactive prototype covering all portals and admin dashboard workflows.",
        },
        {
          step: "3",
          phase: isVi ? "Lập trình Full-Stack & Tích hợp API" : "Full-Stack Development & API Sync",
          duration: isVi ? "Ngày 17 - 35" : "Day 17 - 35",
          description: isVi
            ? "Phát triển frontend Next.js, backend Node.js, thiết lập cơ sở dữ liệu, phân quyền RBAC và tích hợp các cổng API."
            : "Develop Next.js frontend, Node.js backend, RBAC engine, and third-party API integrations.",
        },
        {
          step: "4",
          phase: isVi ? "Kiểm thử bảo mật, UAT & Bàn giao" : "Security Pen-test, UAT & Sign-off",
          duration: isVi ? "Ngày 36 - 45" : "Day 36 - 45",
          description: isVi
            ? "Kiểm thử tải (Load testing), kiểm thử thâm nhập bảo mật (Pen-test), đào tạo quản trị và ký biên bản nghiệm thu."
            : "Stress load testing, vulnerability assessment, stakeholder training, and production sign-off.",
        },
      ],
      techStack: [
        { name: "Next.js 16 + Node.js", desc: isVi ? "Full-stack hiệu năng cao, chuẩn kiến trúc Microservices" : "High-performance full-stack TypeScript" },
        { name: "PostgreSQL & Prisma ORM", desc: isVi ? "Cơ sở dữ liệu quan hệ mạnh mẽ, toàn vẹn dữ liệu giao dịch" : "Enterprise relational database with ACID guarantees" },
        { name: "Docker & Kubernetes Ready", desc: isVi ? "Đóng gói container độc lập, dễ dàng mở rộng quy mô" : "Containerized auto-scaling deployment" },
        { name: "OAuth2 & JWT & 2FA", desc: isVi ? "Bảo mật xác thực đa yếu tố chuẩn ngân hàng số" : "Bank-grade authentication security" },
      ],
      freeGifts: [
        { name: isVi ? "Cloud Server riêng biệt cấu hình cao" : "Dedicated Cloud Server Infrastructure", value: "12.000.000 ₫", desc: isVi ? "Miễn phí năm đầu tiên" : "Free 1st year" },
        { name: isVi ? "Bản quyền trọn bộ Design System Figma" : "Enterprise Design System on Figma", value: "15.000.000 ₫", desc: isVi ? "Sở hữu toàn bộ tài nguyên thiết kế" : "Full UI/UX IP ownership" },
        { name: isVi ? "Bộ tài liệu kỹ thuật API Swagger" : "Interactive Swagger API Documentation", value: "5.000.000 ₫", desc: isVi ? "Dễ dàng tích hợp với các bên thứ 3" : "Ready for partner dev teams" },
        { name: isVi ? "Gói SLA Hỗ trợ kỹ thuật ưu tiên 24 tháng" : "24-Month Priority Technical SLA", value: "24.000.000 ₫", desc: isVi ? "Kèm kỹ sư trực tiếp hỗ trợ 24/7" : "Dedicated senior support" },
      ],
      packageFaqs: [
        {
          q: isVi ? "Hệ thống có kết nối được với phần mềm CRM/ERP sẵn có của công ty tôi không?" : "Can the web portal integrate with our existing ERP or CRM?",
          a: isVi ? "Hoàn toàn có thể. Chúng tôi hỗ trợ kết nối qua API RESTful, GraphQL, Webhook hoặc kết nối cơ sở dữ liệu an toàn để đồng bộ dữ liệu hai chiều với SAP, Odoo, Salesforce, HubSpot, Fast hay MISA." : "Yes. Seamless integration via RESTful APIs, Webhooks, or direct database connections with SAP, Odoo, Salesforce, and MISA.",
        },
        {
          q: isVi ? "Sau này chúng tôi có quyền tự phát triển thêm tính năng mà không cần đơn vị bạn không?" : "Can our internal dev team expand features without depending on your agency?",
          a: isVi ? "Có, 100%. Chúng tôi bàn giao toàn bộ mã nguồn sạch chuẩn TypeScript, tài liệu thiết kế kiến trúc và sơ đồ cơ sở dữ liệu, cho phép đội ngũ lập trình nội bộ của bạn tiếp quản và phát triển dễ dàng." : "Yes, 100%. Clean TypeScript code, ERD diagrams, and technical documentation allow easy in-house continuation.",
        },
        {
          q: isVi ? "Cam kết bảo mật thông tin và dữ liệu doanh nghiệp như thế nào?" : "How is corporate data and IP protected?",
          a: isVi ? "Chúng tôi ký thỏa thuận bảo mật thông tin (NDA) có giá trị pháp lý trước khi tiếp nhận dự án, cam kết không tiết lộ bất kỳ thông tin kinh doanh, dữ liệu khách hàng hay mã nguồn nào cho bên thứ ba." : "A strict legally binding Non-Disclosure Agreement (NDA) protects all data, code, and trade secrets.",
        },
      ],
      border: "border-slate-200",
      popular: false,
    },
  ];
}

export function getPackageById(id: string, isVi: boolean): WebPackage | undefined {
  const pkgs = getLandingPackages(isVi);
  return pkgs.find((p) => p.id === id || p.code.toLowerCase() === id.toLowerCase());
}

export function getComparisonData(isVi: boolean) {
  const comparisonData = [
    {
      feature: isVi ? "Thiết kế UI/UX độc quyền" : "Custom UI/UX Design",
      basic: isVi ? "Template chuẩn UX" : "UX Template",
      standard: isVi ? "Thiết kế độc quyền Figma" : "Exclusive Figma Design",
      ecommerce: isVi ? "Thiết kế độc quyền Figma" : "Exclusive Figma Design",
      enterprise: isVi ? "Design System toàn diện" : "Full Design System",
    },
    {
      feature: isVi ? "Số lượng trang hiển thị" : "Number of Pages",
      basic: isVi ? "1 Trang (Landing Page)" : "1 Page (Landing)",
      standard: isVi ? "5 - 10 Trang đa ngành" : "5 - 10 Pages",
      ecommerce: isVi ? "Không giới hạn sản phẩm" : "Unlimited Products",
      enterprise: isVi ? "Kiến trúc Portal đa module" : "Modular Web App",
    },
    {
      feature: isVi ? "Chuẩn Responsive (Mobile/PC)" : "100% Mobile Responsive",
      basic: <CheckOutlined className="text-emerald-500 font-bold" />,
      standard: <CheckOutlined className="text-emerald-500 font-bold" />,
      ecommerce: <CheckOutlined className="text-emerald-500 font-bold" />,
      enterprise: <CheckOutlined className="text-emerald-500 font-bold" />,
    },
    {
      feature: isVi ? "Hệ thống quản trị nội dung CMS" : "CMS Admin Dashboard",
      basic: isVi ? "Cơ bản" : "Basic",
      standard: isVi ? "Trực quan dễ dùng" : "Intuitive Admin",
      ecommerce: isVi ? "Chuyên sâu E-Commerce" : "E-Commerce Suite",
      enterprise: isVi ? "CMS + RBAC đa cấp độ" : "Custom CMS & RBAC",
    },
    {
      feature: isVi ? "Giỏ hàng & Cổng thanh toán online" : "Online Payment Gateways",
      basic: <CloseOutlined className="text-slate-300" />,
      standard: <CloseOutlined className="text-slate-300" />,
      ecommerce: "VietQR, VNPAY, MoMo, COD",
      enterprise: isVi ? "Cổng thanh toán tùy chỉnh" : "Custom Gateways",
    },
    {
      feature: isVi ? "Tối ưu SEO & Google PageSpeed 90+" : "SEO & PageSpeed 90+",
      basic: <CheckOutlined className="text-emerald-500 font-bold" />,
      standard: <CheckOutlined className="text-emerald-500 font-bold" />,
      ecommerce: <CheckOutlined className="text-emerald-500 font-bold" />,
      enterprise: <CheckOutlined className="text-emerald-500 font-bold" />,
    },
    {
      feature: isVi ? "Tặng Tên miền & Hosting (1 Năm)" : "Free Domain & Hosting",
      basic: "Tên miền .com + 5GB",
      standard: "Tên miền .vn + 15GB Cloud",
      ecommerce: "Tên miền .vn + 30GB Cloud",
      enterprise: "Dedicated Cloud Server",
    },
    {
      feature: isVi ? "Tặng Email Doanh Nghiệp" : "Corporate Branded Emails",
      basic: <CloseOutlined className="text-slate-300" />,
      standard: isVi ? "5 Email công ty" : "5 Emails",
      ecommerce: isVi ? "10 Email công ty" : "10 Emails",
      enterprise: isVi ? "Không giới hạn" : "Unlimited",
    },
    {
      feature: isVi ? "Thời hạn bảo hành kỹ thuật" : "Warranty Period",
      basic: isVi ? "12 Tháng" : "12 Months",
      standard: isVi ? "Trọn đời hệ thống" : "Lifetime on Hosting",
      ecommerce: isVi ? "12 Tháng (Ưu tiên)" : "12 Months Priority",
      enterprise: isVi ? "24 Tháng (SLA 24/7)" : "24 Months SLA",
    },
  ];

  const comparisonColumns = [
    {
      title: isVi ? "Tính Năng & Quyền Lợi" : "Features & Deliverables",
      dataIndex: "feature",
      key: "feature",
      width: 260,
      render: (val: string) => <span className="font-semibold text-slate-800">{val}</span>,
    },
    {
      title: isVi ? "Gói Cơ Bản" : "Basic",
      dataIndex: "basic",
      key: "basic",
      align: "center" as const,
      render: (val: any) => <span className="text-xs text-slate-700">{val}</span>,
    },
    {
      title: <span className="text-blue-600 font-bold">{isVi ? "Gói Tiêu Chuẩn ★" : "Standard ★"}</span>,
      dataIndex: "standard",
      key: "standard",
      align: "center" as const,
      className: "bg-blue-50/50",
      render: (val: any) => <span className="text-xs font-semibold text-blue-900">{val}</span>,
    },
    {
      title: isVi ? "Gói Bán Hàng" : "E-Commerce",
      dataIndex: "ecommerce",
      key: "ecommerce",
      align: "center" as const,
      render: (val: any) => <span className="text-xs text-slate-700">{val}</span>,
    },
    {
      title: isVi ? "Gói Cao Cấp" : "Enterprise",
      dataIndex: "enterprise",
      key: "enterprise",
      align: "center" as const,
      render: (val: any) => <span className="text-xs text-slate-700">{val}</span>,
    },
  ];

  return { comparisonData, comparisonColumns };
}

export function getFaqItems(isVi: boolean) {
  return [
    {
      key: "1",
      label: (
        <span className="font-semibold text-slate-800 text-sm">
          {isVi
            ? "1. Doanh nghiệp tôi có được bàn giao 100% mã nguồn (Source Code) không?"
            : "1. Will our company receive 100% full source code ownership?"}
        </span>
      ),
      children: (
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          {isVi
            ? "Có, 100%. Sau khi nghiệm thu và bàn giao dự án, chúng tôi bàn giao toàn bộ mã nguồn không mã hóa, cơ sở dữ liệu và toàn quyền sở hữu cho doanh nghiệp của bạn, không có ràng buộc độc quyền hay phụ thuộc kỹ thuật."
            : "Yes, 100%. Upon project sign-off, we hand over full unencrypted source code, databases, and administrative ownership with zero proprietary lock-in."}
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <span className="font-semibold text-slate-800 text-sm">
          {isVi
            ? "2. Thời gian hoàn thiện website có đảm bảo đúng tiến độ hợp đồng không?"
            : "2. Is the project timeline strictly guaranteed in the contract?"}
        </span>
      ),
      children: (
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          {isVi
            ? "Chúng tôi cam kết tiến độ bằng điều khoản phạt hợp đồng rõ ràng. Mỗi dự án đều có Project Manager chuyên trách theo dõi từng mốc (Milestone): từ Wireframe, UI Figma đến Lập trình và Kiểm thử."
            : "Timeline is legally guaranteed in our service agreement with clear milestones managed by a dedicated Project Manager."}
        </p>
      ),
    },
    {
      key: "3",
      label: (
        <span className="font-semibold text-slate-800 text-sm">
          {isVi
            ? "3. Người không rành công nghệ có tự quản trị và sửa nội dung website được không?"
            : "3. Can non-technical team members easily manage the website content?"}
        </span>
      ),
      children: (
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          {isVi
            ? "Hoàn toàn dễ dàng. Hệ thống quản trị nội dung (CMS) được thiết kế 100% bằng Tiếng Việt trực quan. Chúng tôi kèm theo buổi đào tạo 1-1 và bộ video hướng dẫn chi tiết từng thao tác đăng bài, thêm sản phẩm và xem báo cáo đơn hàng."
            : "Absolutely. Our intuitive visual CMS is designed for non-technical users, complete with 1-on-1 walkthrough training and video tutorials."}
        </p>
      ),
    },
    {
      key: "4",
      label: (
        <span className="font-semibold text-slate-800 text-sm">
          {isVi
            ? "4. Chi phí trọn gói có phát sinh thêm khoản nào khác không?"
            : "4. Are there any hidden or recurring additional fees?"}
        </span>
      ),
      children: (
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          {isVi
            ? "Không. Báo giá của chúng tôi là trọn gói (đã bao gồm Tên miền 1 năm, Hosting Cloud 1 năm, Chứng chỉ bảo mật SSL và Bảo hành kỹ thuật). Hỗ trợ xuất hóa đơn VAT tài chính hợp lệ cho doanh nghiệp."
            : "Zero hidden fees. Turnkey packages include domain, high-speed cloud hosting, SSL, and warranty with official VAT invoices."}
        </p>
      ),
    },
    {
      key: "5",
      label: (
        <span className="font-semibold text-slate-800 text-sm">
          {isVi
            ? "5. Chính sách bảo hành và hỗ trợ sau khi website đi vào hoạt động thế nào?"
            : "5. What is the technical warranty and maintenance SLA after launch?"}
        </span>
      ),
      children: (
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          {isVi
            ? "Chúng tôi bảo hành kỹ thuật từ 12 đến 24 tháng (và trọn đời khi sử dụng hạ tầng hosting của chúng tôi). Đội ngũ kỹ thuật trực 24/7, xử lý các sự cố phát sinh trong vòng 15 - 30 phút."
            : "12 to 24 months of warranty (and lifetime on managed hosting) backed by 24/7 technical monitoring with a 15-30 minute incident SLA."}
        </p>
      ),
    },
  ];
}

export function getAdvantages(isVi: boolean): AdvantageItem[] {
  return [
    {
      icon: <ThunderboltOutlined className="text-2xl text-amber-500" />,
      bg: "bg-amber-50",
      title: isVi ? "Tốc Độ Tối Ưu Dưới 1.5s" : "Sub-1.5s Superfast Speed",
      desc: isVi
        ? "Điểm số Google PageSpeed Insights 90+. Tối ưu nén ảnh WebP, CDN toàn cầu và mã nguồn Next.js tinh gọn."
        : "Google PageSpeed Insights 90+. Global CDN, modern WebP asset compression, and clean modular code.",
    },
    {
      icon: <LaptopOutlined className="text-2xl text-blue-600" />,
      bg: "bg-blue-50",
      title: isVi ? "Thiết Kế UI/UX Độc Quyền" : "Custom Brand UI/UX Design",
      desc: isVi
        ? "Phác thảo 100% trên Figma theo bộ nhận diện và phong thủy doanh nghiệp. Không dùng template mẫu sao chép rập khuôn."
        : "Crafted exclusively on Figma matching your visual identity. Zero cookie-cutter or generic themes.",
    },
    {
      icon: <GlobalOutlined className="text-2xl text-indigo-600" />,
      bg: "bg-indigo-50",
      title: isVi ? "Chuẩn 100% Responsive & Mobile" : "100% Mobile & Tablet Responsive",
      desc: isVi
        ? "Hiển thị sắc nét, mượt mà trên iPhone, Android, iPad, Laptop và màn hình lớn 4K."
        : "Pixel-perfect fluid layouts across all screen resolutions, iOS, Android, and desktop displays.",
    },
    {
      icon: <RocketOutlined className="text-2xl text-purple-600" />,
      bg: "bg-purple-50",
      title: isVi ? "Tối Ưu Chuẩn SEO On-Page" : "Advanced Google SEO Architecture",
      desc: isVi
        ? "Cấu trúc Schema JSON-LD, sitemap XML tự động, thẻ meta OpenGraph mạng xã hội và URL chuẩn tối ưu xếp hạng."
        : "Schema markup, automated XML sitemaps, OpenGraph tags, and canonical semantic URLs for top Google ranks.",
    },
    {
      icon: <ShoppingCartOutlined className="text-2xl text-emerald-600" />,
      bg: "bg-emerald-50",
      title: isVi ? "Tích Hợp Thanh Toán VietQR Tự Động" : "Automated VietQR & Payment Gateways",
      desc: isVi
        ? "Khách hàng quét mã QR ngân hàng là hệ thống tự nhận diện tiền về tài khoản, VNPAY, MoMo không gián đoạn."
        : "Instant QR bank transfer verification, automated invoice reconciliation, VNPAY and MoMo gateways.",
    },
    {
      icon: <SafetyCertificateOutlined className="text-2xl text-rose-600" />,
      bg: "bg-rose-50",
      title: isVi ? "Bảo Mật Đa Tầng & Bàn Giao Source Code" : "Bank-Grade Security & Source Code",
      desc: isVi
        ? "Cấp SSL miễn phí, chống tấn công DDoS, sao lưu dữ liệu tự động hàng tuần và bàn giao toàn bộ mã nguồn."
        : "Free SSL, DDoS protection, automated off-site backups, and complete unencrypted source code ownership.",
    },
  ];
}

export function getWorkflowSteps(isVi: boolean): WorkflowStep[] {
  return [
    {
      step: "1",
      title: isVi ? "Khảo Sát & Wireframe" : "Discovery & Sitemap",
      desc: isVi
        ? "Nghiên cứu đối thủ, thống nhất mục tiêu kinh doanh, phân tích sitemap và cấu trúc trang."
        : "Analyze market competitors, align conversion goals, and structure page wireframes.",
    },
    {
      step: "2",
      title: isVi ? "Thiết Kế UI/UX Figma" : "Figma UI/UX Mockups",
      desc: isVi
        ? "Phác thảo giao diện độc quyền, phối màu theo nhận diện thương hiệu và duyệt trước khi lập trình."
        : "Custom high-fidelity UI design matching brand aesthetics with interactive Figma prototypes.",
    },
    {
      step: "3",
      title: isVi ? "Lập Trình Full-Stack" : "Full-Stack Engineering",
      desc: isVi
        ? "Lập trình mã nguồn tối ưu tốc độ, chuẩn responsive 100% thiết bị và tích hợp các tính năng."
        : "Develop with clean Next.js & Node.js code, mobile responsiveness, and payment gateways.",
    },
    {
      step: "4",
      title: isVi ? "Kiểm Thử & Đào Tạo" : "QA & Client Training",
      desc: isVi
        ? "Kiểm thử bảo mật, tối ưu PageSpeed 90+, bàn giao video và hướng dẫn quản trị nội dung 1-1."
        : "Rigorous security checks, PageSpeed optimization, and personalized 1-on-1 admin training.",
    },
    {
      step: "5",
      title: isVi ? "Go-Live & Bảo Hành" : "Go-Live & Warranty",
      desc: isVi
        ? "Kích hoạt tên miền chính thức, trỏ DNS, sao lưu định kỳ và bảo hành kỹ thuật 12 - 24 tháng."
        : "Official domain launch, DNS setup, automated backup schedules, and active warranty care.",
    },
  ];
}

export function getPortfolioProjects(isVi: boolean): PortfolioProject[] {
  return [
    {
      title: "AlphaTech Group Corporate Portal",
      category: isVi ? "Doanh Nghiệp Công Nghệ & B2B" : "Technology & B2B",
      desc: isVi
        ? "Website tập đoàn công nghệ đa quốc gia, tích hợp cổng thông tin đối tác và tuyển dụng thông minh."
        : "Multinational tech enterprise portal with partner extranet and ATS recruitment portal.",
      badge: "Full-Stack Next.js",
      color: "blue",
    },
    {
      title: "GreenMart Organic Store & Delivery",
      category: isVi ? "Bán Hàng E-Commerce & Thực Phẩm" : "E-Commerce & Retail",
      desc: isVi
        ? "Website thương mại điện tử với thanh toán quét mã VietQR tự động, quản lý đơn hàng & giao hàng hỏa tốc."
        : "Online supermarket with automated VietQR payments and multi-branch delivery logistics.",
      badge: "VietQR E-Commerce",
      color: "green",
    },
    {
      title: "Serenity International Hospital",
      category: isVi ? "Y Tế & Phòng Khám Đa Khoa" : "Healthcare & Clinic",
      desc: isVi
        ? "Website phòng khám chuẩn quốc tế với hệ thống đặt lịch khám trực tuyến và tra cứu hồ sơ bệnh án điện tử."
        : "Clinical portal featuring online appointment scheduling and patient record lookup.",
      badge: "Booking Portal",
      color: "cyan",
    },
    {
      title: "Hoa Sen Real Estate Holdings",
      category: isVi ? "Bất Động Sản & Dự Án Đô Thị" : "Real Estate & Architecture",
      desc: isVi
        ? "Website giới thiệu các dự án bất động sản cao cấp tích hợp sa bàn thực tế ảo VR 360° và bảng tính lãi vay ngân hàng."
        : "Luxury property portal featuring interactive 360° VR tours and automated mortgage calculator.",
      badge: "Interactive VR 360",
      color: "purple",
    },
  ];
}
