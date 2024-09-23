
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment/moment";

import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import propTypes from "prop-types";
import { CreateCommentSchema } from "../../validation/CommentValidation";
import { useMutation, useQuery } from "react-query";
import { addCommentToBlog, getCommentsByBlogs } from "../../api/QueryFunctions";
import { useToast } from "../../hooks/use-toast";
import { Badge } from "@/components/ui/badge";
export default function CommentSection({ className, blogId,authorId }) {
  const {toast} = useToast();
  const commentQuery = useQuery({
    queryKey: ["comments"],
    queryFn: () => getCommentsByBlogs(blogId),
  });
  console.log(commentQuery.data?.data?.data[0], "comments");
  const mutation = useMutation({
    mutationFn: (data) => {
      return addCommentToBlog(blogId, data);
    },
    onSuccess: (data) => {
      toast({
        title: "comment added successfully",
      });
      console.log("On success Data",data);
      commentQuery.refetch();
      form.reset()
    },
  });

  const form = useForm({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      content: "",
    },
  });
  const onSubmit = (data) => {
    mutation.mutate(data);
  };
  return (
    <div className={twMerge("max-w-2xl mx-auto p-4 space-y-6", className)}>
      <h2 className="text-lg ">Comments ({commentQuery.data?.data?.data.length})</h2>
      
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment Box</FormLabel>
                <FormControl>
                  <Textarea
                    type="content"
                    placeholder="Type Comment "
                    rows={2}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Post Comment</Button>
        </form>
      </Form>
      <div className="space-y-6">
        {commentQuery?.data?.data?.data?.map((comment) => (
          <div key={comment._id} className="flex space-x-4">
          <Avatar className="w-10 h-10">
            <AvatarFallback>{comment.fullname[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="font-medium">{comment.fullname} {authorId==comment.user? <Badge className='text-green-500' variant="outline">Author</Badge>: <Badge className='text-orange-500' variant="outline">User</Badge>} <span className="text-sm text-gray-500"> {moment(comment.createdAt).format("DD-MMM-YYYY")}</span></p>
            <p className="text-sm text-gray-500">{comment.content}</p>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}
CommentSection.propTypes = {
  className: propTypes.string,
  blogId: propTypes.string.isRequired,
  authorId: propTypes.string.isRequired,
};
