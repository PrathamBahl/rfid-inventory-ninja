import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Linkedin, Mail, MapPin } from 'lucide-react';

interface Advisor {
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
  email?: string;
  image?: string;
  location?: string;
}

const advisors: Advisor[] = [
  {
    name: "Sanskar Pal",
    role: "Code Advisor",
    bio: "Computer Engineering student at San Jose State University with experience as an Ex-Intern at Lucid Motors. Providing technical guidance and code architecture expertise for the RFID Inventory Ninja project, focusing on modern web technologies and efficient system design.",
    linkedin: "https://www.linkedin.com/in/sanskar-pal-493691225/",
    email: "sanskar.pal@sjsu.edu",
    image: "/advisors/sanskar-pal.jpg",
    location: "1 Washington Sq, San Jose, CA"
  }
];

export function ProjectAdvisors() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Project Advisors
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advisors.map((advisor, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-col items-center text-center">
              {advisor.image && (
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-blue-100 shadow-md">
                  <img
                    src={advisor.image}
                    alt={advisor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardTitle className="text-xl font-bold">{advisor.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{advisor.role}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 text-center">{advisor.bio}</p>
              {advisor.location && (
                <div className="flex items-center justify-center gap-1 text-gray-600 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{advisor.location}</span>
                </div>
              )}
              <div className="flex justify-center gap-4">
                {advisor.linkedin && (
                  <a
                    href={advisor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {advisor.email && (
                  <a
                    href={`mailto:${advisor.email}`}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="h-5 w-5" />
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