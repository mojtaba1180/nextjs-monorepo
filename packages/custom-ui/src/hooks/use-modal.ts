import { useModalContext } from "../contexts/modal-context"
import type { ModalContextType } from "../types/modal"

export function useModal(): ModalContextType {
  return useModalContext()
}
