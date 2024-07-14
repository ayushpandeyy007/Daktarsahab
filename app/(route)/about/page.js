import React from "react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Ayush Pandey",
    role: "Frontend Developer",
    image: "/team-member-1.jpg",
    description: "Frontend Developer",
  },
  {
    name: "Nissant Timilsina",
    role: "Frontend Developer",
    image: "/team-member-2.jpg",
    description: "Frontend Developer",
  },
  {
    name: "Rakshya Basnet",
    role: "Frontend Developer",
    image: "/team-member-3.jpg",
    description: "Frontend Developer",
  },
  {
    name: "Ritamvara thapa",
    role: "Frontend Developer",
    image: "/team-member-4.jpg",
    description: "Frontend Developer",
  },
];

function About() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our group of dedicated professionals is committed to providing you
            with the highest quality healthcare.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-indigo-600 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
