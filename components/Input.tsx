import * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  textarea?: false;
<<<<<<< HEAD
  label?: string;
=======
  label?: string | null;
>>>>>>> 6f81d2ed69fc40b2e54f9ba91d41bca24f9ec54c
};

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  textarea: true;
  rows: number;
<<<<<<< HEAD
  label?: string;
=======
  label?: string | null;
>>>>>>> 6f81d2ed69fc40b2e54f9ba91d41bca24f9ec54c
};

type CustomInputProps = InputProps | TextareaProps;

<<<<<<< HEAD
export default function Input({
  className,
  textarea,
  label,
  ...props
}: CustomInputProps) {
  const inputClassName = cn(
    "w-full rounded-md border-0 mt-1 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-sm placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:outline-none focus:border-black focus:ring-1 focus:ring-black",
    className
  );

  // If 'label' prop is provided, use it as the label content. Otherwise, use the 'placeholder' prop for the label content.
  const labelContent = label || props.placeholder;

  // Conditionally render textarea or input based on the textarea prop. By default, it renders an input element.
  if (textarea) {
    const textareaProps = props as TextareaProps;
    return (
      <div>
        <label htmlFor={textareaProps.id} className="text-sm font-medium">
          {labelContent}
        </label>
        <textarea
          {...textareaProps}
          rows={textareaProps.rows || 3}
          className={inputClassName}
        />
      </div>
    );
  } else {
    const inputProps = props as InputProps;
    return (
      <div>
        <label htmlFor={inputProps.id} className="text-sm font-medium">
=======
const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, textarea, label, ...props }, ref) => {
    const inputClassName = cn(
      "w-full rounded-md border-0 mt-1 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-sm placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:outline-none focus:border-black focus:ring-1 focus:ring-black",
      className
    );

    // Determines what is used as a label content
    const labelContent = label !== undefined ? label : props.placeholder;

    // Conditionally renders the label only if 'label' is not explicitly an empty string
    const labelElement =
      label !== "" ? (
        <label htmlFor={props.id} className="text-sm font-medium">
>>>>>>> 6f81d2ed69fc40b2e54f9ba91d41bca24f9ec54c
          {labelContent}
        </label>
      ) : null;

    // Conditionaly render textarea or input based on the textarea prop. By default, it renders an input element.
    if (textarea) {
      const textareaProps = props as TextareaProps;
      return (
        <div>
          <label htmlFor={textareaProps.id} className="text-sm font-medium">
            {labelElement}
          </label>
          <textarea
            {...textareaProps}
            rows={textareaProps.rows || 3}
            className={inputClassName}
          />
        </div>
      );
    } else {
      const inputProps = props as InputProps;
      return (
        <div>
          <label htmlFor={inputProps.id} className="text-sm font-medium">
            {labelElement}
          </label>
          <input {...inputProps} className={inputClassName} />
        </div>
      );
    }
  }
);

Input.displayName = "Input";

export default Input;
