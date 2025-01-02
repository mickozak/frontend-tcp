import React from "react";
import { FaGithub } from "react-icons/fa"; // Import the GitHub icon from react-icons
import ProblemList from "./components/ProblemsList";
import Footer from "./components/Footer";

/**
 * The Home component displays the main page of the application.
 * It contains usage instructions, information about the frontend and backend technologies,
 * and a list of problems fetched from the service.
 *
 * @returns {JSX.Element} The rendered component displaying application instructions and the list of problems.
 */
const Home = () => {
  return (
    <div style={{ minHeight: "100vh", padding: "20px" }}>
      <div
        style={{
          border: "1px solid #fff",
          color: "#fff",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <p>
          <strong>
            Integration with an external system – instructions: This application
            connects to a ServiceNow instance and supports CRUD operations.
          </strong>
        </p>
        <br />
        <ul>
          <li>
            After clicking the "Get problems" button, all problems are fetched.
          </li>
          <li>
            After clicking the "Create problem" button, the user is redirected
            to the "Create new problem" page. The fields "Short description"
            and "Description" must be filled out before clicking "Create".
          </li>
          <li>
            On the main page, after fetching all problems, a specific problem can
            be deleted by clicking the "trash" icon.
          </li>
          <li>
            You can view details of a specific problem by clicking the "i" icon.
            After being redirected to the details page, sample data is displayed,
            and the "Short description" field can be updated. The remaining fields
            are read-only. Additionally, you can add a new work note by filling in
            the "work note" field and clicking "Post".
          </li>
          <li>The "Back" button is also implemented.</li>
        </ul>
        <br />
        <p>General: Back-end VPS (OVH), Front-end VPS (OVH), Browser - Safari (resolution: 1024 x 820)</p>
        <div className="flex">
          <p>
            Front-end: Next (React, Axios, React Icons, Tailwind CSS) – GitHub repository:
          </p>{" "}
          <a
            href="https://github.com/mickozak/frontend-tcp" // Replace with the actual repository link
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", textDecoration: "none", fontSize: "24px" }}
            className="ml-4"
          >
            <FaGithub />
          </a>
        </div>
        <div className="flex">
          <p>
            Back-end: Node (Express, Axios, CORS, dotenv), ServiceNow – GitHub repository:
          </p>{" "}
          <a
            href="https://github.com/mickozak/backend-tcp" // Replace with the actual repository link
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", textDecoration: "none", fontSize: "24px" }}
            className="ml-4"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      {/* Problems list */}
      <ProblemList />
      <Footer />
    </div>
  );
};

export default Home;
