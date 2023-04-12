import clsx from "clsx";
import React from "react";
import { Button } from "../buttons";
import { BtnTheme } from "../buttons/themes";
import Modal from "./Modal";
import { useModal } from "./use-modal";

interface ModalActionProps {
  title?: string;
  content?: React.ReactNode;
  children?: React.ReactNode;
  actionTheme?: BtnTheme;
  onConfirm?: () => void;
  className?: string;
  actions?: React.ReactNode;
}
export default function ModalAction({
  title,
  content,
  children,
  actionTheme = "danger",
  onConfirm,
  className,
  actions,
}: ModalActionProps) {
  const { close, open, isOpen } = useModal();
  return (
    <div onClick={open} className={clsx(className)}>
      {children}
      <Modal show={isOpen} onClose={close}>
        <Modal.Content
          title={title}
          renderActions={
            actions ?? (
              <>
                <Button theme="secondary" onClick={close}>
                  Cancel
                </Button>
                <Button theme={actionTheme} onClick={onConfirm}>
                  Confirm
                </Button>
              </>
            )
          }
        >
          {content}
        </Modal.Content>
      </Modal>
    </div>
  );
}
