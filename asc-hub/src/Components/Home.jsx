import React, { useEffect, useRef, useState } from "react";
import EmployeeCard from "./EmployeeCard";
import WorkshopCard from "./WorkshopCard";
import DropDownList from "./DropDownList";
import LinkCard from "./LinkCard";
import {
  faClock,
  faLocationDot,
  faEnvelope,
  faPhone,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ascLogo from "../assets/asc-logo.jpg";
import { ACTIONS, callAPI } from "../api";
import WorkshopsModal from "./WorkshopsModal";
import { getUpcoming } from "../assets/utility";

const Home = () => {
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    callAPI({ method: "GET", action: ACTIONS.HOME }).then(setData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── NAV ── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={ascLogo}
              alt="ASC Logo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-bold text-gray-900 leading-tight">
                Academic Support Center
              </p>
              <p className="text-xs text-gray-400 leading-tight">
                American University of Sharjah
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-500 font-medium">
            <a
              href="#services"
              className="hover:text-gray-900 transition-colors"
            >
              Services
            </a>
            <a
              href="#workshops"
              className="hover:text-gray-900 transition-colors"
            >
              Workshops
            </a>
            <a href="#team" className="hover:text-gray-900 transition-colors">
              Team
            </a>
            <a
              href="#contact"
              className="hover:text-gray-900 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#3d8cc4] mb-4">
              Your Academic Home
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
              We're here to help
              <br />
              you <span className="text-[#c8a135]">succeed.</span>
            </h1>
            <p className="text-gray-500 text-base leading-relaxed max-w-md mb-8">
              Welcome to the Academic Support Center; we’re glad you’re here!
              Our goal is to help you think about university education as a
              world of possibilities. We recognize academic coaching as a
              critical component of the educational experience at AUS. Discover
              how we can support your success.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href="#workshops"
                className="bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                View Workshops{" "}
                <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
              </a>
              <a
                href="#contact"
                className="border border-gray-200 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-full hover:border-gray-400 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="shrink-0">
            <img
              src={ascLogo}
              alt="ASC"
              className="w-44 h-44 md:w-56 md:h-56 rounded-full object-cover shadow-xl border-4 border-white ring-1 ring-gray-100"
            />
          </div>
        </div>
      </section>

      {/* ── QUICK LINK CARDS ── */}
      <section id="services" className="max-w-6xl mx-auto px-6 py-14">
        {data?.quick_links && (
          <>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-6">
              Quick Access
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {data.quick_links.map((resource) => (
                <LinkCard
                  key={resource.title}
                  title={resource.title}
                  icon={resource.icon}
                  link={resource.link}
                  color={resource.color}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* ── WORKSHOPS ── */}
      <section id="workshops" className="bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">
                Live & Upcoming
              </h2>
              <h3 className="text-2xl font-bold text-gray-900">Workshops</h3>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="text-sm text-[#3d8cc4] font-medium hover:underline flex items-center gap-1 cursor-pointer"
            >
              See all{" "}
              <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.workshops &&
              getUpcoming(data.workshops)
                .slice(0, 3)
                .map((ws) => (
                  <WorkshopCard
                    title={ws.title}
                    category={ws.category}
                    datetime={ws.datetime}
                    facilitator={ws.facilitator}
                    meetLink={ws.meetLink}
                    location={ws.location}
                    week={ws.week}
                  />
                ))}
          </div>
        </div>
      </section>

      {/* ── RESOURCES DROPDOWNS ── */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">
          Explore
        </h2>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Resources & Support
        </h3>
        <div className="grid md:grid-cols-2 gap-3 items-start">
          {data?.resources &&
            data.resources.map((rs) => (
              <DropDownList title={rs.title} listContent={rs.items} />
            ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">
            Meet the Team
          </h2>
          <h3 className="text-2xl font-bold text-gray-900 mb-10">Our Staff</h3>

          {data?.staff &&
            (() => {
              const byType = (type) =>
                data.staff.filter(
                  (s) =>
                    s.type
                      .trim()
                      .toLowerCase()
                      .replace(/[\s-]+/g, "_") === type,
                );

              const sections = [
                {
                  type: "faculty",
                  label: "Faculty",
                  accent: "bg-[#3d8cc4]",
                  description:
                    "Our academic coaches are experienced university faculty who provide in-depth guidance on academics, course planning, and university life. As the most seasoned members of the ASC, they bring a wealth of knowledge to every session.",
                },
                {
                  type: "peer_mentor",
                  label: "Student Peer Mentors",
                  accent: "bg-[#4a9e6d]",
                  description:
                    "Peer mentors are fellow students who hold regular office hours for one-on-one sessions. Whether you need academic advice or just want to talk through university life, they're here to listen and help.",
                },
                {
                  type: "ambassador",
                  label: "Student Ambassadors",
                  accent: "bg-[#c8a135]",
                  description:
                    "Ambassadors are the face of the ASC on campus. They run workshops, raise awareness about our services, and make sure every student knows where to find support.",
                },
              ];

              return sections.map(({ type, label, accent, description }) => {
                const members = byType(type);
                if (!members.length) return null;

                return (
                  <div key={type} className="mb-16">
                    {/* Section header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8 mb-8">
                      <div className="shrink-0">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                          {label}
                        </h4>
                        <div className={`w-10 h-0.5 ${accent} rounded-full`} />
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed mt-3 sm:mt-0 max-w-xl">
                        {description}
                      </p>
                    </div>

                    {/* Cards */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {members
                        .sort(
                          (a, b) =>
                            (a.college || "").localeCompare(b.college || "") ||
                            (a.major || "").localeCompare(b.major || "") ||
                            (a.name || "").localeCompare(b.name || ""),
                        )
                        .map((s, i) => (
                          <EmployeeCard
                            key={i}
                            name={s.name}
                            college={s.college}
                            major={s.major}
                            officeHrs={s.office_hours}
                            color={s.color}
                            bookingLink={s.booking_link}
                            type={s.type}
                          />
                        ))}
                    </div>
                  </div>
                );
              });
            })()}
        </div>
      </section>
      {/* ── CONTACT ── */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">
          Reach Out
        </h2>
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: faEnvelope,
              label: "Email",
              value: "asc@aus.edu",
              href: "mailto:asc@aus.edu",
              color: "text-[#c8a135]",
            },
            {
              icon: faPhone,
              label: "Phone",
              value: "06 515 2096",
              href: "tel:065152096",
              color: "text-[#4a9e6d]",
            },
            {
              icon: faClock,
              label: "Hours",
              value: "Mon – Thu, 8 AM – 5 PM",
              href: null,
              color: "text-[#3d8cc4]",
            },
            {
              icon: faLocationDot,
              label: "Location",
              value: "Main Building, M-M01",
              href: null,
              color: "text-[#b85450]",
            },
          ].map(({ icon, label, value, href, color }) => (
            <div
              key={label}
              className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-sm transition-shadow"
            >
              <FontAwesomeIcon
                icon={icon}
                className={`${color} text-lg mb-3`}
              />
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
                {label}
              </p>
              {href ? (
                <a
                  href={href}
                  className="text-sm font-semibold text-gray-800 hover:underline"
                >
                  {value}
                </a>
              ) : (
                <p className="text-sm font-semibold text-gray-800">{value}</p>
              )}
            </div>
          ))}
        </div>
      </section>
      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src={ascLogo}
              alt="ASC"
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="text-xs text-gray-400">
              © 2026 Academic Support Center · AUS
            </span>
          </div>
          <div className="flex gap-1">
            {[
              "bg-[#c8a135]",
              "bg-[#8a72a8]",
              "bg-[#b85450]",
              "bg-[#4a9e6d]",
              "bg-[#3d8cc4]",
              "bg-[#c47a5a]",
            ].map((c, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
            ))}
          </div>
        </div>
      </footer>
      {/* ── MODAL ── */}
      {showModal && (
        <WorkshopsModal
          workshops={data?.workshops ?? []}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Home;
