"use client";

import Image from "next/image";
import dashboard from "@assets/home/dashboard.png";
import jobs from "@assets/home/jobs.png";
import job_detail from "@assets/home/job_detail.png";
import status from "@assets/home/status.png";
import Link from "next/link";
import Button from "@components/Button";
import Logo from "@components/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@context/AuthContext";
import Loader from "@components/Loader";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faHeart);

export default function LandingPage() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading || (!isLoading && isAuthenticated())) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between bg-primary p-6 shadow-md">
        <div className="flex items-center gap-6">
          <Logo />
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Link href={"/login"}>
            <Button type="primary" text="Login" />
          </Link>
          <Link href={"/signup"}>
            <Button type="secondary" text="Signup" />
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative bg-white py-20 mb-32">
          <div className="container mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-extrabold leading-tight mb-6">
              Welcome to <span className="text-primary">JobPulse</span>
            </h1>
            <p className="text-2xl md:text-4xl mb-8">
              Streamline your job application process with ease.
            </p>
            <Link href={"/signup"} className="mt-8">
              <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-12 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                Get Started
              </button>
            </Link>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mt-24 bg-gray-50">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-primary mb-6">
              Why Choose JobPulse?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Efficiency
                </h3>
                <p className="text-gray-600">
                  Manage all your job applications in one place, saving time and
                  reducing stress.
                </p>
              </div>
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Organization
                </h3>
                <p className="text-gray-600">
                  Keep track of your progress with intuitive tools and features
                  designed to help you stay organized.
                </p>
              </div>
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Success
                </h3>
                <p className="text-gray-600">
                  Increase your chances of landing your dream job with our
                  comprehensive job tracking system.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Information cards */}
        <section className="p-8 mt-48">
          <div className="grid grid-cols-1 gap-16">
            <h2 className="text-4xl font-bold text-primary mb-6 flex justify-center text-center">
              Explore JobPulse Features
            </h2>

            <div className="flex flex-col items-center md:items-start md:flex-row gap-12 p-6 bg-white shadow-lg rounded-lg">
              <Image
                className="w-full md:w-1/2 rounded-lg shadow"
                src={dashboard}
                alt="dashboard"
              />
              <div className="text-center md:w-1/2 md:text-left md:pr-6">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">
                  Dashboard
                </h2>
                <p className="text-gray-600 text-xl">
                  Gain a comprehensive overview of your job applications with
                  our intuitive dashboard. Monitor your progress, view key
                  metrics, and access insights that help you stay organized and
                  on top of your job search.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start md:flex-row-reverse gap-12 p-6 bg-white shadow-lg rounded-lg">
              <Image
                className="w-full md:w-1/2 rounded-lg shadow"
                src={jobs}
                alt="jobs page"
              />
              <div className="text-center md:w-1/2 md:text-left md:pr-6">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">
                  Kanban Boards
                </h2>
                <p className="text-gray-600 text-xl">
                  Easily manage your job applications with our intuitive Kanban
                  boards. Track the status of each application and move them
                  through different stages with a simple interface.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start md:flex-row gap-12 p-6 bg-white shadow-lg rounded-lg">
              <Image
                className="w-full md:w-1/2 rounded-lg shadow"
                src={status}
                alt="status page"
              />
              <div className="text-center md:w-1/2 md:text-right md:pr-6">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">
                  Timeline Management
                </h2>
                <p className="text-gray-600 text-xl">
                  Keep track of your application timelines effortlessly. View
                  the timely updates posted on your application and track
                  important dates. Never miss a follow-up with our powerful
                  timeline management features.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start md:flex-row-reverse gap-12 p-6 bg-white shadow-lg rounded-lg">
              <Image
                className="w-full md:w-1/2 rounded-lg shadow"
                src={job_detail}
                alt="job detail page"
              />
              <div className="text-center md:w-1/2 md:text-left md:pl-6">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">
                  Progress Tracking
                </h2>
                <p className="text-gray-600 text-xl">
                  Add comments and notes to each job application to track your
                  progress. Stay on top of every detail and ensure that
                  you&apos;re always prepared for your next interview.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center p-6 bg-primary text-white mt-12">
        <p>JobPulse 2024. All rights reserved.</p>
        <div className="flex justify-center items-center p-2">
          Made with &nbsp;{" "}
          <FontAwesomeIcon icon={faHeart} className="text-red-500" />
          &nbsp; by&nbsp;
          <a
            href="https://www.linkedin.com/in/yuvrajsinghrathore833/"
            target={"_blank"}
            rel={"noreferrer"}
            className="transition duration-300 underline"
          >
            Yuvraj Singh Rathore
          </a>
        </div>
      </footer>
    </div>
  );
}
