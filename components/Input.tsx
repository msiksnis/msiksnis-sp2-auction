import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={props.id} className="text-sm font-medium">
        {props.placeholder}
      </label>
      <input
        {...props}
        className={cn(
          "w-full rounded-md border-0 mt-1 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-sm placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:outline-none focus:border-black focus:ring-1 focus:ring-black",
          className
        )}
      />
    </div>
  );
}