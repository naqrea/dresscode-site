"use client";

import type { TextareaHTMLAttributes } from "react";
import { useId } from "react";

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function TextAreaField({ label, required, id, ...rest }: TextAreaFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <div>
      <label htmlFor={fieldId} className="mb-2 block font-sans text-xs uppercase tracking-widest text-dc-white/50">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <textarea
        id={fieldId}
        required={required}
        rows={4}
        className="w-full resize-none border border-dc-white/20 bg-dc-bg-light px-4 py-3 font-sans text-sm text-dc-white placeholder:text-dc-white/30 focus-visible:border-dc-accent"
        {...rest}
      />
    </div>
  );
}
