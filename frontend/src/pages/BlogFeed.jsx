import { useQuery } from "react-query";
import { getAllBlogs } from "../api/QueryFunctions";
import BlogCard from "@/components/custom/BlogCard";

function BlogFeed() {
  const query = useQuery({ queryKey: ["getallblogs"], queryFn: getAllBlogs });

  if (query.data) {
    return (
      <div>
        {query?.data?.data.data.map((blog) => (
          <BlogCard
            key={blog._id}
            content={blog.content}
            title={blog.title}
            blogId={blog._id}
            ownerid={blog.owner}
          />
        ))}
      </div>
    );
  } else {
    return <div className="w-full h-screen flex justify-center items-center"><h1 className="text-3xl">No Blogs</h1></div>;
  }
}

export default BlogFeed;
