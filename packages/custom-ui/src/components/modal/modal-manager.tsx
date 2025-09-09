"use client"

import React from "react"
import { useModalContext } from "../../contexts/modal-context"
import { DialogModal } from "./dialog-modal"
import { ResponsiveModal } from "./responsive-modal"

export function ModalManager() {
  const { modals, closeModal } = useModalContext()

  return (
    <>
      {Object.entries(modals).map(([id, modalState]) => {
        if (!modalState.isOpen || !modalState.config) return null

        const { config } = modalState
        const handleClose = () => closeModal(id)

        if (config.type === "dialog") {
          return (
            <DialogModal
              key={id}
              config={config}
              isOpen={modalState.isOpen}
              onClose={handleClose}
            />
          )
        }

        if (config.type === "responsive") {
          return (
            <ResponsiveModal
              key={id}
              config={config}
              isOpen={modalState.isOpen}
              onClose={handleClose}
            />
          )
        }

        return null
      })}
    </>
  )
}
