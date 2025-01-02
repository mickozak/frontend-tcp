"use client";
import { useState, useEffect } from "react";
import { FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";

// TypeScript type definition for problem data
interface Problem {
  sys_id: string;
  number: string;
  short_description: string;
  sys_created_on: string;
  isNew?: string;
}

const ProblemsList = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRefresh = () => {
    setLoading(true); // Show loading while fetching
    fetchProblems();
  };

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/problems`
      );
  
      // Adding "New" flag and sorting by sys_created_on
      const updatedProblems = response.data.map((problem: Problem) => {
        const createdDate = new Date(problem.sys_created_on);
        const currentDate = new Date();
        const isNew = currentDate.getTime() - createdDate.getTime() <= 24 * 60 * 60 * 1000;
        return {
          ...problem,
          isNew: isNew ? "New" : "",
        };
      });
  
      updatedProblems.sort((a: Problem, b: Problem) => new Date(b.sys_created_on).getTime() - new Date(a.sys_created_on).getTime());
  
      setProblems(updatedProblems);
    } catch (error) {
      console.error("Error fetching problems:", error);
    } finally {
      setLoading(false);
      setDisabledBtn(false);
    }
  };
  
  

  const deleteProblem = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/problem/${id}`);
      setProblems(problems.filter((problem) => problem.sys_id !== id));
      alert(`Problem deleted successfully.`);
    } catch (error) {
      console.error("Error deleting problem:", error);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-white">All problems</h2>
      <div className="mb-4 flex flex-wrap gap-4">
        <button
          onClick={fetchProblems}
          className="text-white px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105 border border-sky-500 w-[150px]"
          style={{
            background: "#f59e0b",
          }}
        >
          Get problems
        </button>
        <button
          onClick={() => router.push("/create-problem")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-green-600 transform hover:scale-105 border border-sky-500 w-[150px]"
        >
          Create problem
        </button>
        <button
          onClick={handleRefresh}
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 border border-sky-500 w-[150px] ${
            disabledBtn
              ? "bg-gray-500 cursor-not-allowed"
              : "hover:bg-blue-600 transform hover:scale-105"
          }`}
          disabled={disabledBtn}
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : problems.length === 0 ? (
        <p>
          No problems available. Click the "Get problems" button to load them.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Number</th>
                <th className="border px-4 py-2">Short description</th>
                <th className="border px-4 py-2">Created</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem) => (
                <tr key={problem.sys_id}>
                  <td className="border px-4 py-2">{problem.number}</td>
                  <td className="border px-4 py-2">
                    {problem.short_description}
                  </td>
                  <td className="border px-4 py-2">{problem.isNew}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => router.push(`/problem/${problem.sys_id}`)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <FaInfoCircle />
                    </button>
                    <button
                      onClick={() => deleteProblem(problem.sys_id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProblemsList;
