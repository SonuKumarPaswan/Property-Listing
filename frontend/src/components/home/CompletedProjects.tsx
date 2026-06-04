
import {
    FaBuildingShield,
    FaIdCard,
    FaMedal,
    FaFaceSmile as FaSmile,
} from "react-icons/fa6";

const stats = [
  {
    icon: <FaSmile />,
    value: "96K+",
    title: "Happy Clients",
  },
  {
    icon: <FaIdCard />,
    value: "362K",
    title: "Customer Ratings",
  },
  {
    icon: <FaBuildingShield />,
    value: "69K+",
    title: "Projects Delivered",
  },
  {
    icon: <FaMedal />,
    value: "236+",
    title: "Business Awards",
  },
];

const CompletedProjects = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-slate-100 to-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-gray-200 shadow-lg hover:-translate-y-2 transition-all duration-300 p-10 text-center"
            >
              {/* Icon */}
              <div className="w-24 h-24 mx-auto rounded-full bg-red-50 flex items-center justify-center text-4xl text-orange-500 mb-6">
                {item.icon}
              </div>

              {/* Number */}
              <h2 className="text-5xl font-bold text-slate-900 mb-3">
                {item.value}
              </h2>

              {/* Title */}
              <p className="text-gray-600 text-lg">{item.title}</p>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-orange-500 rounded-full"></div>
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