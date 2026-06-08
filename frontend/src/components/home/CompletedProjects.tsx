"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import {
  FaBuildingShield,
  FaIdCard,
  FaMedal,
  FaFaceSmile as FaSmile,
} from "react-icons/fa6";

const stats = [
  {
    icon: <FaSmile />,
    value: 96,
    suffix: "K+",
    progress: 96,
    title: "Happy Clients",
  },
  {
    icon: <FaIdCard />,
    value: 362,
    suffix: "K",
    progress: 85,
    title: "Customer Ratings",
  },
  {
    icon: <FaBuildingShield />,
    value: 69,
    suffix: "K+",
    progress: 75,
    title: "Projects Delivered",
  },
  {
    icon: <FaMedal />,
    value: 236,
    suffix: "+",
    progress: 90,
    title: "Business Awards",
  },
];

const CompletedProjects = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-r from-slate-100 to-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="text-blue-600 uppercase tracking-widest font-semibold">
            Our Achievements
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
            Numbers That Define Us
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Delivering excellence in real estate with trusted service,
            successful projects, and thousands of satisfied clients.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 p-8 text-center"
            >
              {/* Icon */}
              <div className="w-24 h-24 mx-auto rounded-full bg-orange-50 flex items-center justify-center text-4xl text-orange-500 mb-6">
                {item.icon}
              </div>

              {/* Counter */}
              <h2 className="text-5xl font-bold text-slate-900 mb-3">
                {inView && (
                  <CountUp
                    start={0}
                    end={item.value}
                    duration={3}
                    suffix={item.suffix}
                  />
                )}
              </h2>

              {/* Title */}
              <p className="text-gray-600 text-lg mb-6">
                {item.title}
              </p>

              {/* Progress Bar */}
              <div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full transition-all ease-out duration-[3000ms]"
                    style={{
                      width: inView ? `${item.progress}%` : "0%",
                    }}
                  />
                </div>

                <div className="flex justify-end mt-2">
                  <span className="text-sm font-medium text-orange-500">
                    {item.progress}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompletedProjects;