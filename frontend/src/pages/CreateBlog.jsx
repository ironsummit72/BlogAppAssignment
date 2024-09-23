import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {Textarea} from '../components/ui/textarea'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useMutation } from "react-query";

import { useToast } from "../hooks/use-toast";
import BlogSchema from "../validation/BlogValidation";

import { createBlogQueryFunction } from "../api/QueryFunctions";
function CreateBlog() {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: (data) => createBlogQueryFunction(data),
    onSuccess: (data) => {
      console.log("success");
      toast({
        title: "success",
        description: data.data.message,
      });
      form.reset();
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
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function onSubmit(values) {
    mutation.mutate(values);
  }
  return (
    <main className="flex-grow  mx-auto px-4 py-8 h-screen">
      <Card className='h-full'>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Blog</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Article Title" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your blog title.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        type="content"
                        placeholder="write content"
                        rows={20}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                     Write your blog content here 
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Publish Blog
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}

export default CreateBlog;
