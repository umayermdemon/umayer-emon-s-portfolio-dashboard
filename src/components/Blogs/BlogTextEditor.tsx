import TextEditor from "../ui/core/BlogTextEditor/TextEditor";

const BlogTextEditor = () => {
  return (
    <div className="container mx-auto p-8 space-y-6 bg-[#112240] rounded-xl shadow-lg border border-[#233554]">
      <h1 className="text-3xl font-bold text-center text-[#00BFFF] mb-4">
        Create Blog
      </h1>
      <TextEditor />
    </div>
  );
};

export default BlogTextEditor;
