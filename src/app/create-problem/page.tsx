"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Footer from "../components/Footer";

/**
 * CreateProblem Component
 *
 * This component allows users to create a new problem by providing a short description
 * and a detailed description. It communicates with an API to submit the data and handles
 * routing to the home page upon successful creation.
 *
 * @returns {JSX.Element} Rendered CreateProblem component.
 */
const CreateProblem = () => {
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  /**
   * Handles navigation back to the home page.
   *
   * @function handleBackToHome
   * @returns {void}
   */
  const handleBackToHome = () => {
    router.push("/");
  };

  /**
   * Handles the creation of a new problem by sending a POST request to the API.
   * It passes the short description and detailed description of the problem.
   * If successful, the user is alerted with the problem number and redirected to the home page.
   *
   * @async
   * @function handleCreate
   * @returns {void}
   */
  const handleCreate = async () => {
    if (!shortDescription || !description) {
      alert("Both short description and description are required.");
      return;
    }

    try {
      const newProblem = {
        short_description: shortDescription,
        description: description,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/problem`,
        newProblem
      );
      alert(`Problem ${response.data.number} created successfully.`);

      router.push(`/problem/${response.data.sys_id}`);
    } catch (error) {
      console.error("Error creating problem:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-white">Create new problem</h2>
      <button
        onClick={handleBackToHome}
        className="mb-6 bg-gray-500 text-white px-6 py-3 rounded-lg transition duration-300 transform hover:bg-gray-600 hover:scale-105 w-[150px] border border-sky-500"
      >
        Back
      </button>
      <button
        onClick={handleCreate}
        className="mt-6 ml-4 bg-green-500 text-white px-6 py-3 rounded-lg transition duration-300 transform hover:bg-green-600 hover:scale-105 w-[150px] border border-sky-500"
      >
        Create
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium text-white">
            *Short Description:
          </label>
          <input
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
            placeholder="Enter short description"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium text-white">*Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
            placeholder="Enter description"
          />
        </div>
        <p>* The field is required</p>
      </div>
      <Footer />
    </div>
  );
};

export default CreateProblem;
