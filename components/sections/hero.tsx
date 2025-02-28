import React from "react";

export function Hero() {
  return (
    <section id="hero" className="text-center py-16 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">
        Stay Consistent with Your Goals, No Cap.
      </h1>
      <p className="mt-4 text-lg">
        LockedIn helps you track habits, verify progress, and stay accountable.
      </p>
      <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Get Started
      </button>
    </section>
  );
}
