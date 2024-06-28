import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  textarea?: false;
  label?: string;
  grow?: boolean;
  flexBasis?: string;
};

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  textarea: true;
  rows: number;
  label?: string;
  grow?: boolean;
  flexBasis?: string;
};

type CustomInputProps = InputProps | TextareaProps;

const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  CustomInputProps
>(
  (
    { className, textarea, label, grow = false, flexBasis = "auto", ...props },
    ref
  ) => {
    const inputClassName = cn(
      "w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-sm placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:outline-none focus:border-black focus:ring-1 focus:ring-black",
      className
    );

    const wrapperClassName = cn(grow ? `flex-grow ${flexBasis}` : "");

    const labelContent = label || props.placeholder;

    if (textarea) {
      const textareaProps = props as TextareaProps;
      return (
        <div className={wrapperClassName}>
          <label htmlFor={textareaProps.id} className="text-sm font-medium">
            {labelContent}
          </label>
          <textarea
            {...textareaProps}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={textareaProps.rows || 3}
            className={inputClassName}
          />
        </div>
      );
    } else {
      const inputProps = props as InputProps;
      return (
        <div className={wrapperClassName}>
          <label htmlFor={inputProps.id} className="text-sm font-medium">
            {labelContent}
          </label>
          <input
            {...inputProps}
            ref={ref as React.Ref<HTMLInputElement>}
            className={inputClassName}
          />
        </div>
      );
    }
  }
);

Input.displayName = "Input";

export default Input;
