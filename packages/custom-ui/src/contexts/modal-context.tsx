"use client"

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from "react"
import { ModalConfig, ModalState, ModalContextType } from "../types/modal"

// Action types
type ModalAction =
  | { type: "OPEN_MODAL"; payload: ModalConfig }
  | { type: "CLOSE_MODAL"; payload: string }
  | { type: "CLOSE_ALL_MODALS" }

// Initial state
const initialState: Record<string, ModalState> = {}

// Reducer
function modalReducer(
  state: Record<string, ModalState>,
  action: ModalAction
): Record<string, ModalState> {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        [action.payload.id]: {
          isOpen: true,
          config: action.payload
        }
      }
    case "CLOSE_MODAL":
      return {
        ...state,
        [action.payload]: {
          isOpen: false,
          config: state[action.payload]?.config || null
        }
      }
    case "CLOSE_ALL_MODALS":
      const newState = { ...state }
      Object.keys(newState).forEach(key => {
        if (newState[key]) {
          newState[key] = { 
            isOpen: false,
            config: newState[key].config
          }
        }
      })
      return newState
    default:
      return state
  }
}

// Context
const ModalContext = createContext<ModalContextType | undefined>(undefined)

// Provider component
interface ModalProviderProps {
  children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modals, dispatch] = useReducer(modalReducer, initialState)

  const openModal = useCallback((config: ModalConfig) => {
    dispatch({ type: "OPEN_MODAL", payload: config })
  }, [])

  const closeModal = useCallback((id: string) => {
    const modal = modals[id]
    if (modal?.config?.onClose) {
      modal.config.onClose()
    }
    dispatch({ type: "CLOSE_MODAL", payload: id })
  }, [modals])

  const closeAllModals = useCallback(() => {
    dispatch({ type: "CLOSE_ALL_MODALS" })
  }, [])

  const isModalOpen = useCallback((id: string) => {
    return Boolean(modals[id]?.isOpen)
  }, [modals])

  const value: ModalContextType = {
    modals,
    openModal,
    closeModal,
    closeAllModals,
    isModalOpen
  }

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  )
}

// Hook to use modal context
export function useModalContext(): ModalContextType {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider")
  }
  return context
}
