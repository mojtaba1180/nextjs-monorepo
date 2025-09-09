import { ReactNode } from "react"

export type ModalType = "dialog" | "responsive"

export interface ModalConfig {
  id: string
  type: ModalType
  title?: string
  description?: string
  view: ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "full"
  closable?: boolean
  onClose?: () => void
  className?: string
  overlayClassName?: string
}

export interface ModalState {
  isOpen: boolean
  config: ModalConfig | null
}

export interface ModalContextType {
  modals: Record<string, ModalState>
  openModal: (config: ModalConfig) => void
  closeModal: (id: string) => void
  closeAllModals: () => void
  isModalOpen: (id: string) => boolean
}
