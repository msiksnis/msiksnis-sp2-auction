import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  textarea?: false;
};

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  textarea: true;
  rows: number;
};

type CustomInputProps = InputProps | TextareaProps;

export default function Input({
  className,
  textarea,
  ...props
}: CustomInputProps) {
  const inputClassName = cn(
    "w-full rounded-md border-0 mt-1 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-sm placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:outline-none focus:border-black focus:ring-1 focus:ring-black",
    className
  );

  // Conditionaly render textarea or input based on the textarea prop. By default, it renders an input element.
  if (textarea) {
    const textareaProps = props as TextareaProps;
    return (
      <div>
        <label htmlFor={textareaProps.id} className="text-sm font-medium">
          {textareaProps.placeholder}
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
          {inputProps.placeholder}
        </label>
        <input {...inputProps} className={inputClassName} />
      </div>
    );
  }
}
