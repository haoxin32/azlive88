export interface PaymentMethod {
  icon: 'landmark' | 'wallet' | 'credit-card'
  label: string
}

export const paymentMethods: PaymentMethod[] = [
  { icon: 'landmark', label: 'Chuyển khoản ngân hàng' },
  { icon: 'wallet', label: 'Ví điện tử' },
  { icon: 'credit-card', label: 'Cổng thanh toán trực tuyến' },
]
