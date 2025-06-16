import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get in touch with us for any questions about our IoT Waste Tracker solution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Contact Information */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Mail className="h-6 w-6 text-blue-600" />
              Get in Touch
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <a href="mailto:contact@freshfridge.com" className="text-gray-700 hover:text-blue-600">
                contact@freshfridge.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-blue-600" />
              <a href="tel:+1234567890" className="text-gray-700 hover:text-blue-600">
                +1 (234) 567-890
              </a>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-blue-600 mt-1" />
              <span className="text-gray-700">
                1 Washington Square<br />
                San Jose, CA 95192
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Office Hours */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Clock className="h-6 w-6 text-purple-600" />
              Office Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Monday - Friday</span>
                <span className="text-gray-700">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Saturday</span>
                <span className="text-gray-700">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Sunday</span>
                <span className="text-gray-700">Closed</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 