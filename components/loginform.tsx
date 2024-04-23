import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import redirect  from "next/navigation";

const formSchema = z.object({
  id: z.string().min(2).max(20),
  password: z.string().min(2).max(20),
})

export function PostForm(poster_id:string,token:string) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id:"",
      password: ""
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    
    const logintry = async () =>{
        const AuthResponse = await fetch("/api/login",
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"id":values.id,"pw":values.password})
        });
        return AuthResponse.ok;       
    }
    if (await logintry()) {
        redirect("/report");
    }
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="your ID" {...field} >ID</Input>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"password"}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} >Password</Input>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="SubmitButton">Submit</Button>
      </form>
    </Form>
  )
}
