"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { loginUser } from "@/services/auth";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const LoginPage = () => {
  const form = useForm();
  const {
    formState: { isSubmitting },
  } = form;
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await loginUser(data);
    if (res?.success) {
      router.push(redirect || "/");
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block mb-1 font-medium">Id</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    type="password"
                    className="w-full border border-gray-300 rounded px-3 py-2 "
                    required
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer">
            {isSubmitting ? "Logging...." : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
