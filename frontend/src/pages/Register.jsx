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
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterFormSchema } from "../validation/FormSchemas";
import { useMutation } from "react-query";

import { RegisterUser } from "../api/QueryFunctions";
import { useToast } from "../hooks/use-toast";
function LoginWithEmail() {

  const navigate=useNavigate()
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: (data) => RegisterUser(data),
    onSuccess: (data) => {
      console.log("success");
      toast({
        title: "success",
        description: data.data.message + " Redirecting to Login ",
      });
      setTimeout(() => {
       navigate("/login");
      }, 2000);
    },
    onError: (err) => {
      console.log(err.response.data);

      toast({
        title: "Failed",
        description: err.response.data.message,
      });
    },
  });
  const form = useForm({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      confirmpassword: "",
    },
  });
  function onSubmit(values) {
    mutation.mutate(values);
  }
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-full  md:h-auto sm:w-[50%] lg:w-[40%]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create an Account
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. sumit@gmail.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Sumit" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Mondal" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <span className="text-gray-500 ">
            Already have an account?{" "}
            <Link className="font-bold text-blue-500" to={"/login"}>
              Login
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginWithEmail;
