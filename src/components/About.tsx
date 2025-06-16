import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Target, Lightbulb, Users, Building2, Mail, Phone, MapPin, Cpu, Database, ListChecks, LinkedinIcon } from 'lucide-react';

interface Founders {
  name: string;
  role: string;
  bio: string;
  image?: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  github?: string;
  linkedin?: string;
  email?: string;
}

interface Advisor {
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
}

const boardMembers: Founders[] = [
  {
    name: "Pratham",
    role: "Founder",
    bio: "Leading strategic initiatives and driving innovation in food management solutions.",
    image: "/board/pratham.jpg"
  },
  {
    name: "Hailey",
    role: "CEO",
    bio: "At the helm of Fresh Fridge, Hailey leads our mission to revolutionize food waste management and set new global standards.",
    image: "/board/hailey.jpg"
  },
  {
    name: "George",
    role: "Founder",
    bio: "Bringing expertise in sustainable practices and food industry innovation.",
    image: "/board/george.jpg"
  },
  {
    name: "Angelo",
    role: "Founder",
    bio: "Driving technological advancement and operational excellence in our solutions.",
    image: "/board/angelo.jpg"
  }
];

const teamMembers: TeamMember[] = [
  // ... existing team members ...
];

const advisors: Advisor[] = [
  {
    name: "Sanskar Pal",
    role: "Code Advisor",
    bio: "Experienced software engineer providing technical guidance and code architecture expertise for the RFID Inventory Ninja project.",
    linkedin: "https://linkedin.com/in/sanskar-pal"
  }
];

export function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Vision Section */}
      <section className="mb-16">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Lightbulb className="h-6 w-6 text-blue-600" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700">
              To be one of the leading providers of food management solutions focusing on reduction of waste by 2030.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Mission Section */}
      <section className="mb-16">
        <Card className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Target className="h-6 w-6 text-green-600" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700">
              To lead the world in sustainable food tracking solutions in reducing food waste to set a new global standard.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* IoT Waste Tracker Section */}
      <section className="mb-16">
        <Card className="bg-gradient-to-r from-indigo-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Cpu className="h-6 w-6 text-indigo-600" />
              Our Solution: IoT Waste Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-lg text-gray-700">
                The IoT Waste Tracker is an advanced, smart refrigerator management system that utilizes radio frequency identification (RFID) sensor technology to monitor and track refrigerated food items on an app.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Database className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Smart Database Integration</h3>
                    <p className="text-gray-700">
                      RFID is linked to a database that contains pre-established expiration dates for the food item that is scanned.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <ListChecks className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Priority-Based Organization</h3>
                    <p className="text-gray-700">
                      By order of expiration, the food item is put on a list visible to the user by priority.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-indigo-600">Key Benefits</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Reduces food waste</li>
                  <li>Stretches your money further</li>
                  <li>Promotes sustainable food consumption habits</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Board Members Section */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Users className="h-6 w-6 text-purple-600" />
              Board Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {boardMembers.map((member) => (
                <Card key={member.name} className="bg-white">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <Users className="h-16 w-16 text-gray-400" />
                        )}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                      <p className="text-blue-600 mb-4">{member.role}</p>
                      <p className="text-gray-600">{member.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Advisors Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Project Advisors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advisors.map((advisor, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold">{advisor.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{advisor.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{advisor.bio}</p>
                {advisor.linkedin && (
                  <a
                    href={advisor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <LinkedinIcon className="h-5 w-5 mr-2" />
                    LinkedIn Profile
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <section>
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Building2 className="h-6 w-6 text-purple-600" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-purple-600" />
                    <a href="mailto:contact@freshfridge.com" className="text-gray-700 hover:text-purple-600">
                      contact@freshfridge.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-purple-600" />
                    <a href="tel:+1234567890" className="text-gray-700 hover:text-purple-600">
                      +1 (234) 567-890
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <span className="text-gray-700">
                      123 Innovation Drive<br />
                      Tech City, TC 12345
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
                <div className="space-y-2 text-gray-700">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 