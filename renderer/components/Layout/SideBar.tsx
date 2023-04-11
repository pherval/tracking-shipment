import { Variants, motion } from "framer-motion";
import { forwardRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { useLayoutContext } from ".";
import { useShortcut } from "../../hooks";
import { Shipment } from "../../shipment.interface";
import { Modal, ModalContent } from "../modal";
import TrackingForm, { ModalFormValues } from "../TrackingForm";
import Toolbar from "../Toolbar";
import { Button } from "../buttons";

interface SideBarProps {
  children: React.ReactNode;
  onNewTracking?: (value: Shipment) => void;
}

const variants: Variants = {
  open: {
    width: "initial",
    opacity: 1,
    x: 0,
  },
  closed: {
    width: 0,
    opacity: 0,
    x: "-100%",
  },
};
export default forwardRef<HTMLDivElement, SideBarProps>(function SideBar(
  { children, onNewTracking },
  ref
): JSX.Element | null {
  const { showSideBar } = useLayoutContext();
  const [showModal, setShowModal] = useState(false);

  // TODO: melhorar para outras plataformas e usar atalho local do electron
  useShortcut(() => setShowModal(true), {
    shortcut: { code: "KeyN", metaKey: true },
  });

  const submit: SubmitHandler<ModalFormValues> = ({
    trackingNumber,
    description,
  }) => {
    // TODO: melhorar validações
    if (!trackingNumber) {
      throw new Error("Tracking number is required");
    }

    onNewTracking?.({
      id: trackingNumber,
      trackingNumber,
      description,
      routes: [],
    });

    setShowModal(false);
  };

  return (
    <motion.div
      ref={ref}
      animate={showSideBar ? "open" : "closed"}
      variants={variants}
      className="flex flex-col justify-between shadow-inner dark:text-white"
    >
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ModalContent title="Add Shipment">
          <TrackingForm
            onSubmit={submit}
            onCancel={() => setShowModal(false)}
          ></TrackingForm>
        </ModalContent>
      </Modal>

      <div className="px-6 mt-10 flex flex-col gap-6 h-full overflow-y-scroll">
        {children}
      </div>

      <Toolbar align="left">
        <Button
          theme="flat"
          border="none"
          LeftIcon={FiPlus}
          onClick={() => setShowModal(true)}
        >
          Add Shipment
        </Button>
      </Toolbar>
    </motion.div>
  );
});
