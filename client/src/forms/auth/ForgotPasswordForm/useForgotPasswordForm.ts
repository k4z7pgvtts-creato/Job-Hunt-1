import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthService from "@/services/auth.service";
import { IForgotPasswordPayload } from "@/interfaces/models";

const FORM_INITIAL_VALUES = {
  email: "",
};

const useForgotPasswordForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
  });

  const form = useFormik({
    initialValues: FORM_INITIAL_VALUES,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      setSuccessMessage("");
      setErrorMessage("");
      try {
        setSubmitting(true);
        const payload: IForgotPasswordPayload = { email: values.email };
        const authService = new AuthService();
        await authService.forgotPassword(payload);
        setSuccessMessage(
          "If an account exists for that email, a reset link has been sent."
        );
        form.resetForm();
      } catch (error: any) {
        console.error(error);
        setErrorMessage(
          error?.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return {
    form,
    successMessage,
    errorMessage,
  };
};

export default useForgotPasswordForm;