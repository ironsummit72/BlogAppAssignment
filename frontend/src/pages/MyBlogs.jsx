
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux'
import { getAllBlogsOfUser } from '../api/QueryFunctions';
import BlogCard from '@/components/custom/BlogCard';
import { Suspense } from 'react';

function MyBlogs() {
  const state=useSelector((state)=>state.userData?.username);
  const query = useQuery({ queryKey: ['userblogdata'], queryFn: getAllBlogsOfUser, })
  console.log(state);
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
     {query?.data?.data.data.map((blog)=>(<BlogCard key={blog._id} content={blog.content} title={blog.title} blogId={blog._id} ownerid={blog.owner}/>))}
      </Suspense>
    </div>
  )
}

export default MyBlogs