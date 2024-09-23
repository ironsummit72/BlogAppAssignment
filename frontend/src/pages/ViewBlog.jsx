import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getBlogById, getBlogOwnerById } from "../api/QueryFunctions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import CommentSection from "../components/custom/CommentSection";
import moment from "moment/moment";
function ViewBlog() {
  const { id } = useParams();
  const blogquery = useQuery({
    queryKey: ["blogbyid", id],
    queryFn: ({ queryKey }) => getBlogById(queryKey[1]),
  });
  const ownerquery = useQuery({
    queryKey: ["ownerbyid", blogquery?.data?.data?.data?.owner],
    queryFn: ({ queryKey }) => getBlogOwnerById(queryKey[1]),
    enabled:!!blogquery?.data?.data?.data?.owner
  });
  return (
    <main className="w-full min-h-screen flex justify-center">
      <div className="blog-content w-[80%] h-auto flex flex-col gap-10 items-center">
        <div className="heading-content max-w-[60%] flex flex-col items-center relative top-11 gap-9 mb-10">
          <h1 className="text-4xl font-bold ">
            {blogquery.data?.data?.data?.title}
          </h1>
          <div className="ownerDetails flex items-center  gap-4 flex-shrink ">
            <Avatar>
              <AvatarImage src="" alt="@shadcn" />
              <AvatarFallback>{ownerquery?.data?.data?.data?.firstname[0].toUpperCase()}{ownerquery?.data?.data?.data.lastname[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <h1 className="from-neutral-400 text-2xl flex items-center gap-2 text-balance">{ownerquery?.data?.data?.data.firstname} {ownerquery?.data?.data?.data.lastname} <Badge className='text-green-500' variant="outline">Author</Badge> <span className="text-sm text-gray-500"> {moment(blogquery.data?.data?.data?.createdAt).format("MMM DD, YYYY")}</span></h1>
          </div>
        </div>
        <p className="leading-relaxed font-light text-2xl text-balance">{blogquery.data?.data?.data?.content}</p>
      <CommentSection className={'mt-44 w-full mb-20'} blogId={id} authorId={blogquery?.data?.data?.data?.owner}/>
      </div>
    </main>
  );
}

export default ViewBlog;
