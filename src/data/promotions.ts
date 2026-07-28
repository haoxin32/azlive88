import type { IconName } from '@/components/ui/Icon'

export interface PromoDetail {
  label: string
  value: string
}

export interface Promotion {
  id: string
  pillLabel: string
  pillIcon: IconName
  title: string
  imageSrc: string
  imageAlt: string
  details: PromoDetail[]
  highlight?: string
}

export const promotions: Promotion[] = [
  {
    id: 'sports-first-deposit',
    pillLabel: 'Nạp đầu Thể thao 200%',
    pillIcon: 'trophy',
    title: 'NẠP ĐẦU - CỰC NGẦU NHẬN TỚI 200%',
    imageSrc: '/images/categories/promo-sports-200.jpg',
    imageAlt: 'Nạp đầu - Cực ngầu nhận tới 200%',
    details: [
      { label: 'Thời gian khuyến mãi', value: 'Dài hạn' },
      { label: 'Hội viên áp dụng', value: 'Tất cả hội viên' },
      { label: 'Sảnh trò chơi áp dụng', value: 'Toàn bộ các sảnh thể thao' },
      {
        label: 'Nội dung khuyến mãi',
        value:
          'Trong thời gian diễn ra khuyến mãi, toàn bộ hội viên khi nạp XU lần đầu tiên có trị giá từ 200.000 XU trở lên có thể lựa chọn tham gia khuyến mãi tặng 100% nạp đầu Thể Thao lên tới tối đa 2.000.000 XU.',
      },
      {
        label: 'Điều kiện',
        value:
          'Hội viên cần hoàn thành 8 vòng cược tiền thưởng tại các sảnh quy định trước khi thực hiện lệnh rút tiền. Doanh thu hợp lệ không tính cho các đơn cược hoà, huỷ hoặc bán cược sớm.',
      },
    ],
  },
  {
    id: 'reload-20',
    pillLabel: 'Nạp lại 20%',
    pillIcon: 'badge-check',
    title: 'THƯỞNG NẠP LẠI 20%',
    imageSrc: '/images/categories/promo-reload-20.jpg',
    imageAlt: 'Thưởng nạp lại 20%',
    details: [
      { label: 'Thời gian khuyến mãi', value: 'Dài hạn' },
      { label: 'Hội viên áp dụng', value: 'Tất cả hội viên' },
      { label: 'Sảnh trò chơi áp dụng', value: 'Tất cả các sảnh trò chơi' },
      {
        label: 'Nội dung khuyến mãi',
        value:
          'Trong thời gian diễn ra khuyến mãi, toàn bộ hội viên khi nạp XU lần đầu tiên có trị giá từ 200.000 XU trở lên có thể lựa chọn tham gia khuyến mãi tặng 100% nạp đầu Bắn Cá lên tới tối đa 2.000.000 XU.',
      },
      {
        label: 'Điều kiện',
        value: 'Tiền thưởng cần hoàn thành 3 vòng doanh thu hữu hiệu tại các sảnh trò chơi trước khi thực hiện lệnh rút tiền.',
      },
    ],
  },
  {
    id: 'fishing-az-von',
    pillLabel: 'AZ Cấp Vốn bắn cá',
    pillIcon: 'fish',
    title: 'CÀNG BẮN CÀNG LỚN - AZ CẤP VỐN',
    imageSrc: '/images/categories/banca.jpg',
    imageAlt: 'Càng bắn càng lớn - AZ Cấp Vốn',
    details: [
      { label: 'Thời gian khuyến mãi', value: 'Dài hạn' },
      { label: 'Hội viên áp dụng', value: 'Tất cả hội viên' },
      { label: 'Sảnh trò chơi áp dụng', value: 'Bắn cá - Slot nổ hũ' },
      {
        label: 'Nội dung khuyến mãi',
        value:
          'Trong thời gian diễn ra khuyến mãi, toàn bộ hội viên khi nạp XU lần đầu tiên có trị giá từ 200.000 XU trở lên có thể lựa chọn tham gia khuyến mãi tặng 100% nạp đầu Bắn Cá lên tới tối đa 2.000.000 XU.',
      },
      {
        label: 'Điều kiện',
        value:
          'Hội viên cần hoàn thành 18 vòng doanh thu hữu hiệu của tiền thưởng tại các sảnh Điện Tử trước khi thực hiện lệnh rút tiền.',
      },
    ],
  },
  {
    id: 'fishing-daily',
    pillLabel: 'Tiếp đạn mỗi ngày',
    pillIcon: 'gift',
    title: 'TIẾP ĐẠN MỖI NGÀY - CÀNG BẮN CÀNG VUI',
    imageSrc: '/images/categories/slot100.jpg',
    imageAlt: 'Tiếp đạn mỗi ngày - Càng bắn càng vui',
    details: [
      { label: 'Thời gian khuyến mãi', value: 'Dài hạn' },
      { label: 'Hội viên áp dụng', value: 'Tất cả hội viên' },
      { label: 'Sảnh trò chơi áp dụng', value: 'Bắn cá - Slot nổ hũ' },
      {
        label: 'Nội dung khuyến mãi',
        value:
          'Trong thời gian diễn ra khuyến mãi, toàn bộ hội viên khi nạp XU lần đầu tiên có trị giá từ 100.000 XU trở lên có thể lựa chọn tham gia khuyến mãi tặng 100% NẠP ĐẦU MỖI NGÀY bắn cá lên tới tối đa 100.000 XU.',
      },
      {
        label: 'Điều kiện',
        value:
          'Hội viên cần hoàn thành 10 vòng doanh thu hữu hiệu của tiền thưởng tại các sảnh Điện Tử trước khi thực hiện lệnh rút tiền.',
      },
    ],
    highlight: 'Chỉ áp dụng khi đăng ký theo đường link này!',
  },
]

export const generalPromoTerms = {
  method: [
    {
      label: 'Phương thức yêu cầu',
      value:
        'Sau khi đủ điều kiện, tiền thưởng sẽ tự động được phân phối đến hộp thư hoặc ví của bạn. Nếu bạn muốn biết thêm, xin vui lòng liên hệ với chúng tôi.',
    },
    { label: 'Thời gian hoạt động', value: 'Hiệu lực vĩnh viễn' },
  ],
  notes: [
    'Các cược bị hệ thống phát hiện và xác định là cược bất thường sẽ không được tính vào bất kỳ chương trình khuyến mãi nào.',
    'Chỉ những cược đã được quyết toán và có kết quả giao dịch hợp lệ mới được tính. Nếu phát hiện cược đối ứng để tạo cược không rủi ro, hành vi cày doanh số, arbitrage hoặc các hành vi cược bất thường khác, người tham gia sẽ bị huỷ tư cách ngay lập tức.',
    'Nếu phát hiện bất kỳ thành viên nào tham gia chương trình bằng hình thức không hợp lệ như thông đồng, giả mạo danh tính, làm giả thông tin, gian lận, arbitrage hoặc lạm dụng chương trình khuyến mãi, tư cách tham gia sẽ bị huỷ ngay và các khoản tiền liên quan có thể bị đóng băng.',
    'AZLIVE88 có quyền kéo dài, rút ngắn, chấm dứt hoặc sửa đổi nội dung của sự kiện này.',
    'Để tránh những hiểu lầm về cách diễn đạt, AZLIVE88 có quyền đưa ra quyết định cuối cùng về sự kiện này.',
  ],
}
