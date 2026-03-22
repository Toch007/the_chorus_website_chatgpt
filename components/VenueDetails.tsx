"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Car,
  Navigation,
  Phone,
  ExternalLink,
  Calendar,
  Users,
} from "lucide-react";

interface VenueDetailsProps {
  className?: string;
}

export default function VenueDetails({ className = "" }: VenueDetailsProps) {
  const [showMap, setShowMap] = useState(false);

  const venueInfo = {
    name: "Nigerian Society of Engineers Hall",
    address: "1012, Sani Abacha Way, CBD, Abuja",
    date: "November 16, 2025",
    time: "5:00 PM",
    capacity: "500 seats",
    phone: "0813 109 3319", // Mr Raphael
    secondaryPhone: "0813 557 8298", // Engr Samuel
    coordinates: {
      lat: 9.0579,
      lng: 7.4951,
    },
  };

  const facilities = [
    { icon: Car, text: "Free Parking Available" },
    { icon: Users, text: "Wheelchair Accessible" },
    { icon: Clock, text: "Doors Open 4:00 PM (Red Carpet)" },
    { icon: Phone, text: "24/7 Event Support" },
  ];

  const directions = [
    "From Abuja Airport: Take Airport Road to city center (30 mins)",
    "From Wuse: Head towards CBD via Shehu Shagari Way (15 mins)",
    "From Garki: Take Herbert Macaulay Way to CBD (20 mins)",
    "Landmark: Near Central Bank of Nigeria Building",
  ];

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-yellow-300" />
                Venue Information
              </h2>
              <p className="text-gray-200">
                Everything you need to know about the location
              </p>
            </div>
            <div className="text-right text-sm text-gray-300">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {venueInfo.date}
              </div>
              <div className="flex items-center mt-1">
                <Clock className="w-4 h-4 mr-1" />
                {venueInfo.time}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Venue Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-yellow-300 mb-3">
                Location
              </h3>
              <div className="space-y-2 text-gray-200">
                <p className="font-medium text-white">{venueInfo.name}</p>
                <p className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-yellow-300" />
                  {venueInfo.address}
                </p>
                <p className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-yellow-300" />
                  Capacity: {venueInfo.capacity}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-yellow-300 mb-3">
                Facilities
              </h3>
              <div className="space-y-2">
                {facilities.map((facility, index) => (
                  <div key={index} className="flex items-center text-gray-200">
                    <facility.icon className="w-4 h-4 mr-2 text-green-400" />
                    {facility.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Toggle */}
          <div className="border-t border-white/10 pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={() => setShowMap(!showMap)}
                className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-400/30 rounded-lg px-6 py-3 text-white font-medium transition-all duration-300 flex items-center justify-center"
              >
                <MapPin className="w-5 h-5 mr-2" />
                {showMap ? "Hide Map" : "Show Map"}
              </button>

              <a
                href={`https://www.google.com/maps?q=${venueInfo.coordinates.lat},${venueInfo.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600/20 hover:bg-green-600/30 border border-green-400/30 rounded-lg px-6 py-3 text-white font-medium transition-all duration-300 flex items-center justify-center"
              >
                <Navigation className="w-5 h-5 mr-2" />
                Get Directions
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>

          {/* Map */}
          {showMap && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "400px" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="border border-white/20 rounded-lg overflow-hidden"
            >
              <iframe
                src="https://storage.googleapis.com/maps-solutions-kn8borlmk3/commutes/kl7h/commutes.html"
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                className="w-full h-full"
              />
            </motion.div>
          )}

          {/* Directions */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h3 className="text-lg font-semibold text-yellow-300 mb-3 flex items-center">
              <Navigation className="w-5 h-5 mr-2" />
              How to Get There
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {directions.map((direction, index) => (
                <div
                  key={index}
                  className="flex items-start text-sm text-gray-200"
                >
                  <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2 mr-3 flex-shrink-0" />
                  {direction}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center text-sm text-gray-300 border-t border-white/10 pt-4">
            <p>Need help? Contact us at:</p>
            <div className="space-y-1 mt-2">
              <div>
                <span className="text-gray-400">Mr Raphael: </span>
                <a
                  href={`tel:${venueInfo.phone}`}
                  className="text-yellow-300 hover:text-yellow-200 font-medium"
                >
                  {venueInfo.phone}
                </a>
              </div>
              <div>
                <span className="text-gray-400">Engr Samuel: </span>
                <a
                  href={`tel:${venueInfo.secondaryPhone}`}
                  className="text-yellow-300 hover:text-yellow-200 font-medium"
                >
                  {venueInfo.secondaryPhone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
