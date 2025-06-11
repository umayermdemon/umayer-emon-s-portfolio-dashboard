import AllSkillsTable from "@/components/Skills/AllSkillsTable";
import { getAllSkills } from "@/services/skills";

const AllSkills = async () => {
  const res = await getAllSkills();
  const skills = res?.data;
  return (
    <div className="w-full p-4">
      <div className="border-b-2 border-gray-700 pb-4 my-4 text-center">
        <h1 className="text-4xl font-bold text-white">All Skills</h1>
        <p className="text-gray-300">Manage all skills here.</p>
      </div>
      {skills ? (
        <AllSkillsTable skills={skills} />
      ) : (
        <p className="text-white text-center">No skills found.</p>
      )}
    </div>
  );
};

export default AllSkills;
