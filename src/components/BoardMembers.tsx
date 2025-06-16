import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Users, Linkedin } from 'lucide-react';

interface Founder {
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
}

const founders: Founder[] = [
  {
    name: "Pratham Bahl",
    role: "Founder & Coding Lead",
    bio: "Leading strategic initiatives and driving innovation in food management solutions. As the Coding Lead, he oversees all software development aspects and technical architecture of Fresh Fridge's solutions.",
    image: "/board/pratham.jpg",
    linkedin: "https://www.linkedin.com/in/pratham-bahl/"
  },
  {
    name: "Hailey Garibay",
    role: "CEO & Administrative Lead",
    bio: "At the helm of Fresh Fridge, Hailey leads our mission to revolutionize food waste management. As Administrative Lead, she manages company operations, strategic planning, and organizational development.",
    image: "/board/hailey.jpg",
    linkedin: "https://www.linkedin.com/in/hailey-garibay-34bb63189/"
  },
  {
    name: "George Anton Rivera",
    role: "Founder & Database Lead",
    bio: "Leading our database architecture and implementation. As Database Lead, George ensures robust data management and efficient information systems for our food tracking solutions.",
    image: "/board/george.jpg",
    linkedin: "https://www.linkedin.com/in/george-anton-rivera-337187233/"
  },
  {
    name: "Angelo Leon",
    role: "Founder & R&D Lead",
    bio: "Spearheading research and development initiatives at Fresh Fridge. As R&D Lead, Angelo drives technological innovation and explores cutting-edge solutions for food waste management.",
    image: "/board/angelo.jpg",
    linkedin: "https://www.linkedin.com/in/angelo-leon-7960601b1/"
  }
];

export function Founders() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Our Founders
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Meet the team leading Fresh Fridge's mission to revolutionize food waste management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {founders.map((member) => (
          <Card key={member.name} className="bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden border-2 border-blue-100 shadow-md">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Users className="h-16 w-16 text-blue-600" />
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-blue-600 mb-4">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin className="h-5 w-5 mr-2" />
                    <span>LinkedIn Profile</span>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 