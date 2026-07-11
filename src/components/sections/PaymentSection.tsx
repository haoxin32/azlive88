import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Icon } from '../ui/Icon'
import { paymentMethods } from '@/data/payments'
import { siteConfig } from '@/config/site'
import { assets } from '@/config/assets'

export function PaymentSection() {
  const downloads = [
    siteConfig.androidUrl && { platform: 'android' as const, label: 'Tải trên Android', href: siteConfig.androidUrl },
    siteConfig.iosUrl && { platform: 'ios' as const, label: 'Tải trên App Store', href: siteConfig.iosUrl },
  ].filter(Boolean) as { platform: 'android' | 'ios'; label: string; href: string }[]

  const hasAppInfo = downloads.length > 0 || assets.qrCode !== null

  return (
    <section id="payment-app" aria-labelledby="payment-app-heading" className="py-10 lg:py-20">
      <Container className="flex flex-col gap-5 lg:gap-8">
        <div id="payment-app-heading">
          <SectionHeading eyebrow="Thanh toán & Ứng dụng" title="Thanh toán an toàn, sẵn sàng trên di động" />
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
          <div className="flex flex-col gap-3 rounded-lg border border-border-subtle bg-surface p-4 sm:gap-4 sm:p-6">
            <h3 className="text-base font-bold text-text-primary">Phương thức thanh toán</h3>
            <ul className="flex flex-col gap-2.5 sm:gap-3">
              {paymentMethods.map((method) => (
                <li key={method.label} className="flex items-center gap-3 text-sm text-text-secondary">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan-400/10 text-cyan-300">
                    <Icon name={method.icon} className="h-5 w-5" />
                  </span>
                  {method.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-border-subtle bg-surface p-4 sm:gap-4 sm:p-6">
            <h3 className="text-base font-bold text-text-primary">Tải ứng dụng AZLIVE88</h3>

            {hasAppInfo ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex flex-1 flex-col gap-3">
                  {downloads.map((app) => (
                    <a
                      key={app.platform}
                      href={app.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 items-center gap-3 rounded-md border border-border-subtle px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-border-strong hover:text-cyan-300"
                    >
                      <Icon name="smartphone" className="h-5 w-5" />
                      {app.label}
                    </a>
                  ))}
                </div>
                {assets.qrCode && (
                  <img
                    src={assets.qrCode.src}
                    width={assets.qrCode.width}
                    height={assets.qrCode.height}
                    alt={assets.qrCode.alt}
                    loading="lazy"
                    decoding="async"
                    className="mx-auto rounded-md border border-border-strong"
                  />
                )}
              </div>
            ) : (
              <p className="text-sm text-text-secondary">
                Ứng dụng di động đang được hoàn thiện. Trong lúc chờ, bạn có thể truy cập AZLIVE88 trực tiếp qua trình
                duyệt trên điện thoại — giao diện đã được tối ưu cho di động.
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
