import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginWithUsernameFormSchema } from "../../../validation/FormSchemas";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { loginWithEmail } from "../../../api/QueryFunctions";
import { useToast } from "../../../hooks/use-toast";

function LoginWithUsername() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: (data) => loginWithEmail(data),
    onSuccess: (data) => {
      console.log("success");
      toast({
        title: "success",
        description: data.data.message+" Redirecting Home",
      });
      setTimeout(() => {
        return navigate('/')
      },1500)
    },
    onError: (err) => {
      console.log(err.response.data);

      toast({
        variant: "destructive",
        title: "Failed",
        description: err.response.data.message,
      
      });
    },
  });

  const form = useForm({
    resolver: zodResolver(LoginWithUsernameFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  function onSubmit(values) {
    mutation.mutate(values)
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Login With Username
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. sumit" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public username.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password"  placeholder="Enter your Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' type="submit">Login With Username</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex justify-center'>
      <span className="text-gray-500 ">Don&apos;t have an account? <Link className="font-bold text-blue-500" to={'/register'}>Register</Link></span>
      </CardFooter>
    </Card>
  );
}

export default LoginWithEmail;
