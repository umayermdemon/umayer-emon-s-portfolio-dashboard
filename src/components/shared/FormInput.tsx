import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { Control, FieldValues } from "react-hook-form";

type InputProps = {
  control: Control<FieldValues>;
  name: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder: string;
};

export const FormInput = ({
  control,
  name,
  label,
  type = "text",
  placeholder,
}: InputProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="font-bold text-[#00BFFF]">{label}</FormLabel>
        <FormControl>
          <Input
            {...field}
            type={type}
            value={field.value || ""}
            placeholder={placeholder}
            className="bg-[#0A192F] text-white border-[#233554] focus:border-[#00BFFF] focus:ring-[#00BFFF]"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
