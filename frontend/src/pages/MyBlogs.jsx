
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux'
import { getAllBlogsOfUser } from '../api/QueryFunctions';
import BlogCard from '@/components/custom/BlogCard';
import { Suspense ,useState} from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function MyBlogs() {
  const state=useSelector((state)=>state.userData?.username);
   const [sortBy, setsortBy] = useState("-1")
  const query = useQuery({ queryKey: ['userblogdata',sortBy], queryFn:({queryKey})=> getAllBlogsOfUser(queryKey[1]),})
  console.log(state);
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
      <nav className="p-3 flex bg-gray-100 items-center h-10">
      <Select defaultValue="-1"  onValueChange={(value) => setsortBy(value)} >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort By Date" />
          </SelectTrigger>
          <SelectContent  >
            <SelectItem value="-1">Latest</SelectItem>
            <SelectItem value="1">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </nav>
     {query?.data?.data.data.map((blog)=>(<BlogCard key={blog._id} content={blog.content} title={blog.title} blogId={blog._id} ownerid={blog.owner}/>))}
      </Suspense>
    </div>
  )
}

export default MyBlogs