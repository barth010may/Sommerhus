import Head from "next/head";
import DatePicker from "../components/DatePicker";
import { useState } from "react";
import emailjs from "emailjs-com";

export default function form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedDate, setSelectedDate] = useState([]);
  const [errors, setErrors] = useState({ firstName: "", lastName: "" });

  const validateInput = (name, value) => {
    if (name === "firstName") {
      if (value.trim() === "") {
        return "Fornavn er nødvendigt";
      }
      if (value.length > 20) {
        return "Dit fornavn er for langt";
      }
    }
    if (name === "lastName") {
      if (value.trim() === "") {
        return "Efternavn er nødvendigt";
      }
      if (value.length > 20) {
        return "Dit efternavn er for langt";
      }
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName") setFirstName(value);
    if (name === "lastName") setLastName(value);

    // Validate the input and update errors
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateInput(name, value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate all fields
    const firstNameError = validateInput("firstName", firstName);
    const lastNameError = validateInput("lastName", lastName);

    if (firstNameError || lastNameError) {
      setErrors({ firstName: firstNameError, lastName: lastNameError });
      return;
    }

    // Prepare email data
    const templateParams = {
      firstName,
      lastName,
      startDate: selectedDate[0]?.toLocaleDateString("da-DK"), // Format date to Danish format
      endDate: selectedDate[1]?.toLocaleDateString("da-DK"), // Format date to Danish format
    };

    // Send email using EmailJS
    emailjs
      .send(
        "service_or79l6j", // Replace with your EmailJS service ID
        "template_ox1o0c6", // Replace with your EmailJS template ID
        templateParams,
        "eNLGD-6jaeg6HuZRm" // Replace with your EmailJS user ID
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Email sent successfully!");
        },
        (error) => {
          console.error("FAILED...", error);
          alert("Failed to send email. Please try again.");
        }
      );
  };

  return (
    <div className="bg-gradient-to-t relative h-screen w-screen">
      <Head>
        <title>Book Sommerhus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img
        className="absolute inset-0 w-full h-full object-cover mix-blend-multiply filter brightness-50 blur-sm"
        alt="main background image"
        src="/Sommerhus_pic1.jpg"
      />

      <form
        method="post"
        className="absolute inset-0 flex flex-col justify-center items-center mx-auto text-center"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {/* First Name Input */}
          <div>
            <label
              htmlFor="first_name"
              className={`block mb-2 text-sm font-medium ${
                errors.firstName ? "text-red-700" : "text-white"
              }`}
            >
              Fornavn
            </label>
            <input
              type="text"
              id="first_name"
              name="firstName"
              value={firstName}
              onChange={handleInputChange}
              className={`${
                errors.firstName
                  ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                  : "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              } text-sm rounded-lg block w-full p-2.5`}
              placeholder="John"
            />
            {errors.firstName && (
              <p className="mt-2 text-sm text-red-600">
                <span className="font-medium">Oops!</span> {errors.firstName}
              </p>
            )}
          </div>
          {/* Last Name Input */}
          <div>
            <label
              htmlFor="last_name"
              className={`block mb-2 text-sm font-medium ${
                errors.lastName ? "text-red-700" : "text-white"
              }`}
            >
              Efternavn
            </label>
            <input
              type="text"
              id="last_name"
              name="lastName"
              value={lastName}
              onChange={handleInputChange}
              className={`${
                errors.lastName
                  ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                  : "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              } text-sm rounded-lg block w-full p-2.5`}
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="mt-2 text-sm text-red-600">
                <span className="font-medium">Oops!</span> {errors.lastName}
              </p>
            )}
          </div>
        </div>
        <div className="w-1/10">
          <DatePicker onChange={(dates) => setSelectedDate(dates)} />
        </div>
        <div className="my-5">
          <button
            onClick={handleSubmit}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
