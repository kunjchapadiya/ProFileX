import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">

      {/* Hero Section */}
      <div className="relative overflow-visible bg-white">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-10 pb-20 lg:flex lg:items-center lg:gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
              Land your dream job with <span className="text-[#2DC08D]">ProFileX</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Create a professional, ATS-friendly resume in minutes. tailored to your unique skills and the job you want.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate('/template-selection')}
                className="px-8 py-4 bg-[#2DC08D] text-white rounded-lg font-bold text-lg hover:bg-[#25a075] transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Create Your Resume
              </button>
              <button
                onClick={() => navigate('/about')}
                className="px-8 py-4 bg-white text-gray-700 border border-gray-300 rounded-lg font-bold text-lg hover:bg-gray-50 transition shadow-sm"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
            <div className="w-full max-w-lg">
              <DotLottieReact
                src="https://lottie.host/67a101e7-db85-4361-b6be-07d3f6a6bcd3/0aADa3jE0x.lottie"
                loop
                autoplay
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why choose ProFileX?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">We provide the tools you need to stand out from the crowd.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "ATS Friendly", icon: "🚀", desc: "Our templates are designed to pass Applicant Tracking Systems." },
              { title: "Smart Formatting", icon: "✨", desc: "No more struggling with margins and fonts. We handle it for you." },
              { title: "Real-time Preview", icon: "👁️", desc: "See your changes instantly as you type. What you see is what you get." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition border-t-4 border-[#2DC08D]">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How it works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="relative">
              <div className="w-16 h-16 bg-[#2DC08D] text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-6 z-10 relative">1</div>
              <h3 className="text-xl font-bold mb-2">Pick a Template</h3>
              <p className="text-gray-600">Choose from our wide range of professional designs.</p>
            </div>
            <div className="relative">
              <div className="w-16 h-16 bg-[#2DC08D] text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-6 z-10 relative">2</div>
              <h3 className="text-xl font-bold mb-2">Fill in your Details</h3>
              <p className="text-gray-600">Enter your experience, skills, and education effortlessly.</p>
            </div>
            <div className="relative">
              <div className="w-16 h-16 bg-[#2DC08D] text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-6 z-10 relative">3</div>
              <h3 className="text-xl font-bold mb-2">Download & Apply</h3>
              <p className="text-gray-600">Export your resume as PDF and start applying instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to upgrade your career?</h2>
        <p className="text-xl mb-8 opacity-90">Join thousands of job seekers who found success with ProFileX.</p>
        <button
          onClick={() => navigate('/template-selection')}
          className="px-10 py-4 bg-[#2DC08D] text-white rounded-lg font-bold text-lg hover:bg-[#25a075] transition shadow-lg transform hover:scale-105"
        >
          Get Started for Free
        </button>
      </section>

    </div>
  );
};

export default Home;