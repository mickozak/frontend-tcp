"use client"; // Ensures client-side rendering for Next.js

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";

// Typy dla problemu i notatek roboczych
interface Problem {
  number: string;
  sys_id: string;
  impact: string;
  urgency: string;
  priority: string;
  short_description: string;
}

interface WorkNote {
  sys_id: string;
  value: string;
  sys_created_on: string;
  sys_created_by: string;
}

interface ProblemDetailsProps {
  id: string; // Typ id, może być string lub number, w zależności od Twojej aplikacji
}

const ProblemDetails: React.FC<ProblemDetailsProps> = ({ id }) => {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [workNotesArr, setWorkNotesArr] = useState<WorkNote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [workNotes, setWorkNotes] = useState<string>("");
  const router = useRouter();

  /**
   * Fetches the problem details based on the provided ID.
   * Sets the problem state and handles loading states.
   */
  const fetchProblemData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/problem/${id}`
      );
      setProblem(response.data.problem);
      setWorkNotesArr(response.data.workNotes);
    } catch (error) {
      console.error("Error fetching problem details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProblemData();
    }
  }, [id]);

  /**
   * Handles the update of problem details.
   * Sends a PUT request with updated data.
   */
  const handleUpdate = async () => {
    if (problem) {
      try {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/problem/${id}`,
          problem
        );
        alert("Problem updated successfully");
      } catch (error) {
        console.error("Error updating problem:", error);
      }
    }
  };

  /**
   * Handles adding a new work note for the problem.
   * Sends a PUT request to update the work notes.
   */
  const handleAddWorkNotes = async () => {
    try {
      const newWorkNote = { work_notes: workNotes };
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/problem/${id}`,
        newWorkNote
      );
      setWorkNotes(""); // Clear the input
      alert("New work note added");
      // Refresh the problem details after adding work note
      fetchProblemData(); // Correctly call the fetch function here
    } catch (error) {
      console.error("Error adding work note:", error);
    }
  };

  /**
   * Refreshes the problem details by fetching the latest data.
   */
  const handleRefresh = () => {
    setLoading(true); // Show loading while fetching
    fetchProblemData();
  };

  /**
   * Navigates the user back to the homepage.
   */
  const handleBackToHome = () => {
    router.push("/");
  };

  // Sort work notes by creation date in descending order
  const sortedWorkNotes = workNotesArr.sort(
    (a, b) => new Date(b.sys_created_on).getTime() - new Date(a.sys_created_on).getTime()
  );

  if (loading)
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-white">Problem details</h2>

      {/* Wrapper for buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={handleBackToHome}
          className="mb-6 bg-gray-500 text-white px-6 py-3 rounded-lg transition duration-300 transform hover:bg-gray-600 hover:scale-105 w-[150px] border border-sky-500"
        >
          Back
        </button>
        <button
          onClick={handleUpdate}
          className="mb-6 bg-green-500 text-white px-6 py-3 rounded-lg transition duration-300 transform hover:bg-green-600 hover:scale-105 w-[150px] border border-sky-500"
        >
          Update
        </button>
        <button
          onClick={handleRefresh}
          className="mb-6 bg-blue-500 text-white px-6 py-3 rounded-lg transition duration-300 transform hover:bg-blue-600 hover:scale-105 w-[150px] border border-sky-500"
        >
          Refresh
        </button>
      </div>

      {/* Problem details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block font-medium text-white">Number:</label>
          <input
            type="text"
            value={problem?.number || ""}
            onChange={(e) => setProblem({ ...problem!, number: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            disabled
          />
        </div>
        <div>
          <label className="block font-medium text-white">ID:</label>
          <input
            type="text"
            value={problem?.sys_id || ""}
            onChange={(e) => setProblem({ ...problem!, sys_id: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg bg-white text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            disabled
          />
        </div>
        <div>
          <label className="block font-medium text-white">Impact:</label>
          <input
            type="text"
            value={problem?.impact || ""}
            onChange={(e) => setProblem({ ...problem!, impact: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg bg-white text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            disabled
          />
        </div>
        <div>
          <label className="block font-medium text-white">Urgency:</label>
          <input
            type="text"
            value={problem?.urgency || ""}
            onChange={(e) => setProblem({ ...problem!, urgency: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg bg-white text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            disabled
          />
        </div>
        <div>
          <label className="block font-medium text-white">Priority:</label>
          <input
            type="text"
            value={problem?.priority || ""}
            onChange={(e) => setProblem({ ...problem!, priority: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg bg-white text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            disabled
          />
        </div>
        <div>
          <label className="block font-medium text-white">Short Description:</label>
          <textarea
            value={problem?.short_description || ""}
            onChange={(e) => setProblem({ ...problem!, short_description: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>
      </div>

      <div className="mt-8">
        <label className="block font-medium text-white">Work Notes:</label>

        {/* Check if work notes are available and render accordingly */}
        {sortedWorkNotes.length > 0 ? (
          <div className="space-y-4 mt-4 mb-4">
            {sortedWorkNotes.map((note) => (
              <div
                key={note.sys_id}
                className="p-4 bg-gray-200 rounded-lg shadow-md"
              >
                <p className="font-medium text-gray-800">{note.value}</p>
                <p className="text-sm text-gray-600">
                  Created on: {new Date(note.sys_created_on).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  By: {note.sys_created_by}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 mb-4 text-gray-600">No work notes available.</p>
        )}

        {/* Text area to add new work note */}
        <textarea
          value={workNotes}
          onChange={(e) => setWorkNotes(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
        <button
          onClick={handleAddWorkNotes}
          className="mt-4 mb-6 bg-blue-500 text-white px-6 py-3 rounded-lg transition duration-300 transform hover:bg-blue-600 hover:scale-105 w-[150px] border border-sky-500"
        >
          Post
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ProblemDetails;
