"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "../actions";
import { toast } from "sonner";
import { loginFormSchema } from "@/db/schema";
import { useRouter } from "next/navigation";

export default function LogInForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { isSubmitting, isDirty, isValid } = form.formState;

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    login(values).then((result) => {
      if ("success" in result) return router.replace("/home");
      else if ("error" in result) return toast.error(result.error);
      else toast.error("Some error has occurred");
    });
  }

  return (
    <>
      <small>Log into your account.</small>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex min-w-72 flex-col space-y-2.5"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="username" {...field} />
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
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={!isValid || !isDirty || isSubmitting}
            size="sm"
            type="submit"
            className="self-center px-10"
          >
            Login
          </Button>
        </form>
      </Form>
    </>
  );
}
