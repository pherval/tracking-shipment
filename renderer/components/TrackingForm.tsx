import React, { useEffect } from "react";
import FormField from "./FormField";
import Button, { ButtonIcon } from "./Button";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineDescription } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { Shipment } from "../shipment.interface";

export interface ModalFormValues {
  trackingNumber: string;
  description?: string;
}

interface TrackingFormProps {
  onSubmit: SubmitHandler<ModalFormValues>;
  onCancel?: () => void;
  data?: Shipment;
}

export default function TrackingForm({
  onSubmit,
  onCancel,
  data,
}: TrackingFormProps) {
  const { register, handleSubmit, setFocus, reset, setValue } =
    useForm<ModalFormValues>();

  useEffect(() => {
    if (data) {
      setValue("trackingNumber", data.trackingNumber);
      setValue("description", data.description);
    }
  }, [data, setValue]);

  useEffect(() => {
    setFocus("trackingNumber");
  }, [setFocus]);

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(async (...args) => {
        try {
          await onSubmit(...args);
          reset();
        } catch (err) {
          alert(err);
        }
      })}
    >
      <div className="flex flex-col gap-2">
        <FormField
          placeholder="Tracking number"
          leftAdornment={
            <ButtonIcon>
              <TbTruckDelivery />
            </ButtonIcon>
          }
          {...register("trackingNumber", { required: true })}
        />
        <FormField
          placeholder="Description"
          leftAdornment={
            <ButtonIcon>
              <MdOutlineDescription />
            </ButtonIcon>
          }
          {...register("description")}
        />
      </div>
      <div className="flex gap-3 ">
        <Button theme="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Start Tracking</Button>
      </div>
    </form>
  );
}
