import { Link, NavLink, useNavigate } from "react-router-dom";
import {Button} from '@/components/ui/button'
import { Menu, Plus,X } from "lucide-react";
import { useState } from "react";



import { useToast } from "../../hooks/use-toast";
import { useMutation } from "react-query";
import { LogoutUser } from "../../api/QueryFunctions";
function Navbar() {
  
    const {toast }=useToast()
    const navigate=useNavigate()
    const [menuopen, setmenuopen] = useState(false)
    const mutation=useMutation({
      mutationFn:()=>LogoutUser(),
      onSuccess:()=>{
        toast({title:"bye for now",description:"Logging out"});
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
      }
    })
    const handlemenu=()=>{
        setmenuopen(menu=>!menu)
    }
    const onLogoutHandler = () => {
       mutation.mutate()
      };
  return (
    <nav className="p-3 flex bg-red=500 justify-between items-center sticky top-0 bg-white">
      <Link className="flex gap-2 items-center">
        <img src="/logo.png" className="w-10 h-10 object-cover" alt="logo" />
        <span className="font-bold text-lg">NodeBlog</span>
      </Link>
      <div className="nav-menu  gap-12 hidden md:flex items-center">
        <NavLink to={'/'} className={({isActive})=>isActive?"font-medium text-orange-500 underline underline-offset-8 decoration-2":"font-medium hover:text-orange-500"}>Blogs</NavLink>
        <NavLink to={'/myblogs'} className={({isActive})=>isActive?"font-medium text-orange-500 underline underline-offset-8 decoration-2":"font-medium hover:text-orange-500"}>My Blogs</NavLink>
        {/* <Link onClick={onLogoutHandler} className="font-medium p-1  rounded-md shadow-md border-red-500 border border-2 hover:text-red-600 hover:bg-red-500 hover:text-white " >Logout</Link> */}
        <Button variant="outline" className="text-red-500 border border-2 border-red-500 py-1 hover:bg-red-500 hover:text-white" onClick={onLogoutHandler}>Logout</Button>
      </div>
      <Button asChild="true" variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-100 hover:text-orange-500   relative hidden md:flex">
      <span className="gap-2 flex items-center">
      <Link to="/create-blog">Create Blog</Link>
      <Plus/>
      </span>
    </Button>
      <Menu size={45} className="p-2 md:hidden" onClick={handlemenu}/>
      <div className={`${menuopen?"":"hidden"} fixed bg-white inset-0 md:hidden p-3`}>
        <div className="navbar flex justify-between">
        <Link className="flex gap-2 items-center">
        <img src="/logo.png" className="w-10 h-10 object-cover" alt="logo" />
        <span className="font-bold text-lg">NodeBlog</span>
      </Link>
      {menuopen?<X size={45} className="p-2 md:hidden" onClick={handlemenu}/>:<Menu size={45} className="p-2 md:hidden"  onClick={handlemenu}/>}
        </div>
        <div className="display flex flex-col gap-2 mt-10">
            <Link onClick={handlemenu} className="m-3 p-3 font-medium hover:bg-orange-200 rounded-sm" to={"/"}>Blogs</Link>
            <Link onClick={handlemenu} className="m-3 p-3 font-medium hover:bg-orange-200 rounded-sm" to={"/myblogs"}>My Blogs</Link>
            <Link onClick={onLogoutHandler} className="m-3 p-3 font-medium hover:text-orange-500 " >Logout</Link>
        </div>
        <hr  className="border-2"/>
        <div className="display flex flex-col gap-2 ">
        <Button asChild="true" variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-100 hover:text-orange-500  mt-6 relative ">
      <span className="gap-2 flex items-center">
      <Link to="/create-blog">Create Blog</Link>
      <Plus/>
      </span>
    </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
