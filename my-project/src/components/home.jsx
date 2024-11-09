import React, { useEffect, useState } from 'react';
import { MapPin, Shield, Bell, Menu, Search, Phone, Share2, AlertTriangle } from 'lucide-react';

const Home = () => {
  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                getPlaceName(latitude, longitude);
                
            },
            (error) => {
                console.error("Error getting location:", error);
            }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
    
  },[])

  const getPlaceName = async (latitude, longitude) => {
    const apiKey = "AIzaSyCuVWT0gRzk09lCQH4occxrFyc3jTgk7J4"; // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK") {
            const place = data.results[0].formatted_address;
            console.log("Location Name:", place);
            setCurrentLocation(place)
            return place;
        } else {
            console.error("Error:", data.status);
        }
    } catch (error) {
        console.error("Request failed:", error);
    }
};

  



  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-[#FB6F92] text-white p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Menu className="w-6 h-6" />
            <h1 className="text-xl font-bold">HerShield</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6" />
            <div className="w-8 h-8 rounded-full bg-[#f7285c] flex items-center justify-center">
              <span className="text-sm">JD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Location Card */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center space-x-2">
            <MapPin className="text-purple-600 w-5 h-5" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Current Location</p>
              <p className="font-semibold">{currentLocation}</p>
            </div>
            <Shield className="w-6 h-6 text-green-500" />
            <span className="text-green-500 font-bold">Safe</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for a destination..."
            className="w-full p-3 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-[#f13e6b] text-white p-6 rounded-xl flex flex-col items-center justify-center space-y-2">
            <AlertTriangle className="w-8 h-8" />
            <span className="font-bold">SOS Alert</span>
          </button>
          <button className="bg-[#991a3a] text-white p-6 rounded-xl flex flex-col items-center justify-center space-y-2">
            <Share2 className="w-8 h-8" />
            <span className="font-bold">Share Location</span>
          </button>
        </div>

        {/* Recent Safety Alerts */}
        <div className="space-y-3">
          <h2 className="font-bold text-lg">Recent Alerts Nearby</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center text-yellow-800">
              <Bell className="w-4 h-4 mr-2" />
              Poor lighting reported on Park Street (2 mins ago)
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center text-red-800">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Suspicious activity near Central Station (5 mins ago)
            </div>
          </div>
        </div>

        {/* Safe Places Nearby */}
        <div className="space-y-3">
          <h2 className="font-bold text-lg">Safe Places Nearby</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">Police Station</p>
                  <p className="text-sm text-gray-500">0.3 miles</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">24/7 Pharmacy</p>
                  <p className="text-sm text-gray-500">0.5 miles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="flex justify-around p-4">
          <button className="flex flex-col items-center text-purple-700">
            <MapPin className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <Search className="w-6 h-6" />
            <span className="text-xs mt-1">Search</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <Bell className="w-6 h-6" />
            <span className="text-xs mt-1">Alerts</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <Shield className="w-6 h-6" />
            <span className="text-xs mt-1">Safety</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;