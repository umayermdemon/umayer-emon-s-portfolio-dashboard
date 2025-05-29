import AllBlogsTable from "@/components/Blogs/AllBlogsTable";
import { getAllBlogs } from "@/services/blogs";

const AllBlogs = async () => {
  const res = await getAllBlogs();
  const blogs = res?.data;
  return (
    <div className="w-full p-4">
      <div className="border-b-2 border-gray-700 pb-4 my-4 text-center">
        <h1 className="text-4xl font-bold text-white">All Blogs</h1>
        <p className="text-gray-300">Manage all blogs here.</p>
      </div>
      {blogs ? (
        <AllBlogsTable blogs={blogs} />
      ) : (
        <p className="text-white text-center">No blogs found.</p>
      )}
    </div>
  );
};

export default AllBlogs;
