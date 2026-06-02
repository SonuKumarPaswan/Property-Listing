import React from "react";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";


type Service = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    title: "Bed Rooms",
    description: "Comfortable and stylish rooms designed for modern living.",
    icon: "🏠",
  },
  {
    title: "Workspace Solutions",
    description: "Co-working space arrangements",
    icon: <HiMiniBuildingOffice2 />,
  },
  {
    title: "Facility Management Services",
    description: "Dedicated facility management with vendor coordination.",
    icon: "🛠️",
  },
  {
    title: "Modern Kitchen",
    description: "Elegant kitchen spaces with smart and practical design.",
    icon: "🍳",
  },
  {
    title: "Parking Space",
    description: "Safe and convenient parking for residents and visitors.",
    icon: "🚗",
  },
  {
    title: "24/7 Security",
    description: "Reliable security service for complete peace of mind.",
    icon: "🛡️",
  },
];

const ServicesProvider: React.FC = () => {
  return (
    <section className="services-section">
      <style>{`
        .services-section {
          padding: 80px 20px;
          background: #f8fafc;
        }

        .services-container {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .services-title {
          font-size: 56px;
          font-weight: 800;
          color: #08131b;
          margin-bottom: 18px;
        }

        .services-subtitle {
          font-size: 20px;
          color: #7b7b7b;
          max-width: 820px;
          margin: 0 auto 60px;
          line-height: 1.6;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .service-card {
          background: #fff;
          border: 2px solid #000;
          border-radius: 28px;
          min-height: 440px;
          padding: 48px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 6px 6px 0 #000;
          transition: transform 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-4px);
        }

        .service-icon {
          width: 110px;
          height: 110px;
          border-radius: 18px;
          background: rgba(30, 136, 229, 0.08);
          color: #1e88e5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          margin-bottom: 28px;
        }

        .service-title {
          font-size: 30px;
          font-weight: 600;
          color: #111;
          margin-bottom: 18px;
        }

        .service-description {
          font-size: 18px;
          color: #7a7a7a;
          line-height: 1.8;
          margin-bottom: 34px;
          max-width: 280px;
        }

        .service-link {
          text-decoration: none;
          color: #111;
          font-size: 18px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .service-link span {
          font-size: 22px;
        }

        @media (max-width: 992px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr;
          }

          .services-title {
            font-size: 40px;
          }

          .service-card {
            min-height: auto;
          }
        }
      `}</style>

      <div className="services-container">
        <h2 className="services-title">Services Provide For You</h2>
        <p className="services-subtitle">
          Discover premium property services designed to match your lifestyle needs.
        </p>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <a href="#" className="service-link">
                Learn More <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesProvider;
