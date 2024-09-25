import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useToast } from "../../hooks/use-toast";
import { useQueryClient, useMutation } from "react-query";
import { deleteBlogById } from "../../api/QueryFunctions";
function BlogCard({ title, content, ownerid, blogId }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => {
      return deleteBlogById(id);
    },
    onSuccess: () => {
      toast({ title: "Blog Deleted Successfully", variant: "destructive" });
      queryClient.invalidateQueries({ queryKey: ["getallblogs"] });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
  const { toast } = useToast();
  const loggedInUser = useSelector((state) => state.userData.id);
  console.log("blog card state", loggedInUser === ownerid);
  const handleDelete = () => {
    mutation.mutate(blogId);
  };
  return (
    <Card className="sm:col-span-2 mt-4">
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-balance max-w-[95%] line-clamp-3 leading-relaxed text-ellipsis ">
          {content}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-5">
        <Link className="font-bold text-blue-500" to={`/blog/${blogId}`}>
          See Blog{" "}
        </Link>
        {loggedInUser === ownerid ? (
          <>
            <Link
              className="font-bold text-orange-500"
              to={`/edit-blog/${blogId}`}
            >
              Edit Blog{" "}
            </Link>
            <Button
              variant="outline"
              className="font-bold text-red-500"
              onClick={handleDelete}
            >
              Delete Blog{" "}
            </Button>
          </>
        ) : (
          <></>
        )}
      </CardFooter>
    </Card>
  );
}
BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  ownerid: PropTypes.string.isRequired,
  blogId: PropTypes.string.isRequired,
};

export default BlogCard;
