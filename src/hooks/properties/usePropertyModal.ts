import type { FormikProps } from "formik";
import type { PropertyFormData } from "../../shared/types/types";

interface UsePropertyModalProps {
  formik: FormikProps<PropertyFormData>;
  onOpenChange: (open: boolean) => void;
  clearError: () => void;
}

export const usePropertyModal = ({
  formik,
  onOpenChange,
  clearError,
}: UsePropertyModalProps) => {
  const close = () => {
    formik.resetForm();
    clearError();
    onOpenChange(false);
  };

  return {
    close,
  };
};
