import AllProjectsTable from "@/components/Projects/AllProjectsTable";
import { getAllProjects } from "@/services/projects";

const AllProjects = async () => {
  const res = await getAllProjects();
  return (
    <div className="w-full p-4">
      <div className="border-b-2 border-gray-700 pb-4 my-4 text-center">
        <h1 className="text-4xl font-bold text-white">All Projects</h1>
        <p className="text-gray-300">Manage all projects here.</p>
      </div>
      <AllProjectsTable projects={res.data} />
    </div>
  );
};

export default AllProjects;
