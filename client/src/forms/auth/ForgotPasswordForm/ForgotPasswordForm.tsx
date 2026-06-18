import useForgotPasswordForm from "./useForgotPasswordForm";
import FieldError from "@/components/core-ui/FieldError";
import Alert from "@/components/core-ui/Alert";

const ForgotPasswordForm = () => {
  const { form, successMessage, errorMessage } = useForgotPasswordForm();

  return (
    <>
      {successMessage && (
        <div className="mb-4">
          <Alert type="success" message={successMessage} />
        </div>
      )}
      {errorMessage && (
        <div className="mb-4">
          <Alert type="error" message={errorMessage} />
        </div>
      )}
      <form className="space-y-6" onSubmit={form.handleSubmit} noValidate>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
            <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              readOnly={form.isSubmitting}
              value={form.values.email}
              onChange={form.handleChange}
            />
            {form.errors.email && <FieldError error={form.errors.email} />}
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={form.isSubmitting}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {form.isSubmitting ? "Sending..." : "Continue"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ForgotPasswordForm;