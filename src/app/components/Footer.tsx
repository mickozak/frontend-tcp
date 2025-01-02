"use client";

/**
 * Footer component that displays a copyright message and the task details.
 *
 * The component renders a footer element with the current year and a message
 * indicating that the rights are reserved to Michael Kozak for the recruitment task
 * at The Cloud People.
 *
 * @component
 * @example
 * // Example usage:
 * <Footer />
 *
 * @returns {JSX.Element} The rendered footer element.
 */
const Footer = () => {
  return (
    <footer className=" text-white py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm mb-2">
          &copy; {new Date().getFullYear()} Michael Kozak. All rights reserved.
          Recruitment task - The Cloud People.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
