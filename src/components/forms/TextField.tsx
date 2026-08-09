"use client";

import type { InputHTMLAttributes } from "react";
import { useId } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function TextField({ label, required, id, ...rest }: TextFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <div>
      <label htmlFor={fieldId} className="mb-2 block font-sans text-xs uppercase tracking-widest text-dc-white/50">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={fieldId}
        required={required}
        className="h-11 w-full border border-dc-white/20 bg-dc-bg-light px-4 font-sans text-sm text-dc-white placeholder:text-dc-white/30 focus-visible:border-dc-accent"
        {...rest}
      />
    </div>
  );
}
