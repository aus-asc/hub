import React, { useEffect, useRef, useState } from "react";
import EmployeeCard from "../Components/Home/EmployeeCard";
import WorkshopCard from "../Components/Home/WorkshopCard";
import DropDownList from "../Components/Home/DropDownList";
import LinkCard from "../Components/Home/LinkCard";
import {
  faClock,
  faLocationDot,
  faEnvelope,
  faPhone,
  faChevronRight,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ascLogo from "../assets/asc-logo.jpg";
import { ACTIONS, callAPI } from "../api";
import WorkshopsModal from "../Components/Home/WorkshopsModal";
import { getUpcoming } from "../scripts/Home/utility";
import { Footer } from "../Components/Footer";

/* ── Skeleton primitives ── */
const Shimmer = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
);

const LinkCardSkeleton = () => (
  <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center gap-2.5">
    <Shimmer className="w-10 h-10 rounded-full" />
    <Shimmer className="h-3 w-16" />
  </div>
);

const WorkshopCardSkeleton = () => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3">
    <Shimmer className="h-5 w-20 rounded-full" />
    <Shimmer className="h-4 w-3/4" />
    <Shimmer className="h-3 w-1/2" />
    <Shimmer className="h-3 w-2/3" />
    <Shimmer className="h-7 w-24 rounded-full mt-1" />
  </div>
);

const EmployeeCardSkeleton = () => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3">
    <Shimmer className="w-11 h-11 rounded-full" />
    <Shimmer className="h-4 w-32" />
    <Shimmer className="h-3 w-24" />
    <div className="border-t border-gray-50 pt-3 mt-1 space-y-2">
      <Shimmer className="h-2 w-20" />
      <Shimmer className="h-3 w-36" />
      <Shimmer className="h-3 w-28" />
    </div>
  </div>
);

const DropDownSkeleton = () => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3">
    <Shimmer className="h-4 w-40" />
    <Shimmer className="h-3 w-full" />
    <Shimmer className="h-3 w-5/6" />
  </div>
);

const Home = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    callAPI({ method: "GET", action: ACTIONS.HOME }).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  // Close mobile nav on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileNavOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── NAV ── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={ascLogo}
              alt="ASC Logo"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-bold text-gray-900 leading-tight">
                Academic Support Center
              </p>
              <p className="text-xs text-gray-400 leading-tight hidden sm:block">
                American University of Sharjah
              </p>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-500 font-medium">
            {["services", "workshops", "team", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="hover:text-gray-900 transition-colors capitalize"
              >
                {id}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={() => setMobileNavOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon
              icon={mobileNavOpen ? faXmark : faBars}
              className="text-gray-600 text-sm"
            />
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileNavOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
            {["services", "workshops", "team", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMobileNavOpen(false)}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 py-2.5 px-3 rounded-xl hover:bg-gray-50 transition-colors capitalize"
              >
                {id}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20 lg:py-24 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#3d8cc4] mb-4">
              Your Academic Home
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 sm:mb-5">
              We're here to help
              <br />
              you <span className="text-[#c8a135]">succeed.</span>
            </h1>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-md mb-6 sm:mb-8 mx-auto md:mx-0">
              Welcome to the Academic Support Center; we're glad you're here!
              Our goal is to help you think about university education as a
              world of possibilities. We recognize academic coaching as a
              critical component of the educational experience at AUS. Discover
              how we can support your success.
            </p>
            <div className="flex gap-3 flex-wrap justify-center md:justify-start">
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
              className="w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-full object-cover shadow-xl border-4 border-white ring-1 ring-gray-100"
            />
          </div>
        </div>
      </section>

      {/* ── QUICK LINK CARDS ── */}
      <section
        id="services"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14"
      >
        <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-6">
          Quick Access
        </h2>
        {loading ? (
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <LinkCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          data?.quick_links && (
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <LinkCard
                title={"Lock-in Lounge"}
                icon={"fa-lock"}
                link={"/hub/lock_in_lounge"}
                color={"#20B2AA"}
                targetBlank={false}
              ></LinkCard>
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
          )
        )}
      </section>

      {/* ── WORKSHOPS ── */}
      <section id="workshops" className="bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex items-end justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">
                Live & Upcoming
              </h2>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Workshops
              </h3>
            </div>
            {!loading && (
              <button
                onClick={() => setShowModal(true)}
                className="text-sm text-[#3d8cc4] font-medium hover:underline flex items-center gap-1 cursor-pointer"
              >
                See all{" "}
                <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
              </button>
            )}
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <WorkshopCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.workshops &&
                getUpcoming(data.workshops)
                  .slice(0, 3)
                  .map((ws, i) => (
                    <WorkshopCard
                      key={i}
                      title={ws.title}
                      category={ws.category}
                      datetime={ws.datetime}
                      facilitator={ws.facilitator}
                      meetLink={ws.meet_link}
                      location={ws.location}
                      week={ws.week}
                    />
                  ))}
            </div>
          )}
        </div>
      </section>

      {/* ── RESOURCES DROPDOWNS ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">
          Explore
        </h2>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
          Resources & Support
        </h3>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <DropDownSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-3 items-start">
            {data?.resources &&
              data.resources.map((rs) => (
                <DropDownList
                  key={rs.title}
                  title={rs.title}
                  listContent={rs.items}
                />
              ))}
          </div>
        )}
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">
            Meet the Team
          </h2>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 sm:mb-10">
            Our Staff
          </h3>

          {loading ? (
            <div className="space-y-12">
              {Array.from({ length: 2 }).map((_, si) => (
                <div key={si}>
                  <div className="mb-6">
                    <Shimmer className="h-5 w-32 mb-2" />
                    <Shimmer className="h-0.5 w-10" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <EmployeeCardSkeleton key={i} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            data?.staff &&
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
                  <div key={type} className="mb-12 sm:mb-16">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8 mb-6 sm:mb-8">
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

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 items-start">
                      {members
                        .sort((a, b) => {
                          if (type === "faculty") {
                            const aHasLink = !!a.booking_link;
                            const bHasLink = !!b.booking_link;

                            // 1. No booking link first
                            if (aHasLink !== bHasLink) {
                              return aHasLink ? 1 : -1;
                            }

                            const aMajor = (a.major || "").toLowerCase();
                            const bMajor = (b.major || "").toLowerCase();

                            const aIsCoach = aMajor.includes("coach");
                            const bIsCoach = bMajor.includes("coach");

                            // 2. Coaches first
                            if (aIsCoach !== bIsCoach) {
                              return aIsCoach ? -1 : 1;
                            }

                            // 3. Among coaches → seniors first
                            if (aIsCoach && bIsCoach) {
                              const aIsSenior = aMajor.includes("senior");
                              const bIsSenior = bMajor.includes("senior");

                              if (aIsSenior !== bIsSenior) {
                                return aIsSenior ? -1 : 1;
                              }

                              // 4. Among senior coaches → name A → Z
                              if (aIsSenior && bIsSenior) {
                                return (a.name || "").localeCompare(
                                  b.name || "",
                                );
                              }
                            }
                          }

                          return (
                            (a.college || "").localeCompare(b.college || "") ||
                            (a.major || "").localeCompare(b.major || "") ||
                            (a.name || "").localeCompare(b.name || "")
                          );
                        })
                        .map((s, i) => (
                          <EmployeeCard
                            key={i}
                            name={s.name}
                            college={s.college}
                            major={s.major}
                            officeHrs={s.office_hours}
                            color={s.color}
                            bookingLink={s.booking_link}
                            meetingLink={s.meeting_link}
                            type={s.type}
                          />
                        ))}
                    </div>
                  </div>
                );
              });
            })()
          )}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14"
      >
        <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">
          Reach Out
        </h2>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
          Get in Touch
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
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
              className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 hover:shadow-sm transition-shadow"
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
                  className="text-xs sm:text-sm font-semibold text-gray-800 hover:underline break-all"
                >
                  {value}
                </a>
              ) : (
                <p className="text-xs sm:text-sm font-semibold text-gray-800">
                  {value}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer></Footer>

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
