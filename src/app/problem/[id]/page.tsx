"use client";

import { useParams } from "next/navigation";
import ProblemDetails from "@/app/components/ProblemDetails";

/**
 * ProblemPage component that fetches and displays details of a problem.
 *
 * Uses `useParams` from `next/navigation` to get the `id` parameter from the URL.
 * If the `id` is missing, a loading message is displayed.
 * Otherwise, it renders the `ProblemDetails` component with the `id` passed as a prop.
 *
 * @returns {JSX.Element} The rendered JSX for the page.
 */
const ProblemPage = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  if (!id) {
    return <p>Loading...</p>;
  }

  return <ProblemDetails id={id} />;
};

export default ProblemPage;
