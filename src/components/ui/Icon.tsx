import {
  Shield,
  ShieldCheck,
  Zap,
  Headset,
  Cpu,
  Lock,
  Settings,
  BadgeCheck,
  Trophy,
  Gamepad2,
  Video,
  Gem,
  Fish,
  Ticket,
  Users,
  Activity,
  TrendingUp,
  Clock,
  Landmark,
  Wallet,
  CreditCard,
  MessageCircle,
  Send,
  Menu,
  X,
  ChevronDown,
  Star,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Award,
  MonitorSmartphone,
  Smartphone,
  QrCode,
  type LucideIcon,
} from 'lucide-react'

const iconMap = {
  shield: Shield,
  'shield-check': ShieldCheck,
  zap: Zap,
  headset: Headset,
  cpu: Cpu,
  lock: Lock,
  settings: Settings,
  'badge-check': BadgeCheck,
  trophy: Trophy,
  gamepad: Gamepad2,
  video: Video,
  gem: Gem,
  fish: Fish,
  ticket: Ticket,
  users: Users,
  activity: Activity,
  'trending-up': TrendingUp,
  clock: Clock,
  landmark: Landmark,
  wallet: Wallet,
  'credit-card': CreditCard,
  facebook: MessageCircle,
  send: Send,
  youtube: Video,
  menu: Menu,
  x: X,
  'chevron-down': ChevronDown,
  star: Star,
  'arrow-right': ArrowRight,
  'check-circle': CheckCircle2,
  'x-circle': XCircle,
  award: Award,
  'monitor-smartphone': MonitorSmartphone,
  smartphone: Smartphone,
  'qr-code': QrCode,
} as const satisfies Record<string, LucideIcon>

export type IconName = keyof typeof iconMap

export interface IconProps {
  name: IconName
  className?: string
  'aria-hidden'?: boolean
}

export function Icon({ name, className, ...rest }: IconProps) {
  const Component = iconMap[name]
  return <Component className={className} aria-hidden={rest['aria-hidden'] ?? true} />
}
