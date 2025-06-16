import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Link } from 'react-router-dom';
import { Package, Shield, Clock, BarChart } from 'lucide-react';

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Smart Inventory Management for Modern Kitchens
            </h1>
            <p className="text-xl mb-8">
              Fresh Fridge revolutionizes food safety and inventory tracking with cutting-edge RFID technology.
              Keep your kitchen organized, reduce waste, and ensure food safety.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold"
              >
                <Link to="/inventory">Get Started</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold"
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Fresh Fridge?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white transition-all duration-300 hover:shadow-lg hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-6 w-6 text-blue-600" />
                  Smart Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Real-time RFID tracking of all inventory items with automatic expiry notifications.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white transition-all duration-300 hover:shadow-lg hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-green-600" />
                  Food Safety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ensure food safety with automated expiry tracking and temperature monitoring.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white transition-all duration-300 hover:shadow-lg hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-6 w-6 text-purple-600" />
                  Time Saving
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Reduce manual inventory checks and paperwork with automated tracking.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white transition-all duration-300 hover:shadow-lg hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-6 w-6 text-orange-600" />
                  Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get insights into inventory patterns and optimize your stock management.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all duration-300 hover:shadow-xl">
            <CardContent className="py-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Transform Your Kitchen?
                </h2>
                <p className="text-xl mb-8">
                  Join the growing number of businesses that trust Fresh Fridge for their inventory management needs.
                </p>
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
} 