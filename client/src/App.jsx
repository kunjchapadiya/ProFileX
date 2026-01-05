import React from 'react';
import Header from './components/Header.jsx';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import PersonalInfo from './Forms/Personal-Info.jsx';
import Footer from './components/Footer.jsx';
import EducationInfo from './Forms/Education-Info.jsx';
import ExperienceInfo from './Forms/Experience-Info.jsx';
import Skills from './Forms/Skills.jsx';
import Certification from './Forms/Certification.jsx';
import Projects from './Forms/Projects.jsx';
import Languages from './Forms/Languages.jsx';
import Social from './Forms/Social.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';
import TemplateSelection from './pages/TemplateSelection.jsx';
import ViewResume from './pages/ViewResume.jsx';
import Temp1 from './Templates/Temp1.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Temp2 from './Templates/Temp2.jsx';
import Temp3 from './Templates/Temp3.jsx';
import Temp4 from './Templates/Temp4.jsx';
import Temp5 from './Templates/Temp5.jsx';
import Temp6 from './Templates/Temp6.jsx';

const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/personal-info" element={<ProtectedRoute><PersonalInfo /></ProtectedRoute>} />
        <Route path="/education-info" element={<ProtectedRoute><EducationInfo /></ProtectedRoute>} />
        <Route path='/experience-info' element={<ProtectedRoute><ExperienceInfo /></ProtectedRoute>} />
        <Route path='/skills' element={<ProtectedRoute><Skills /></ProtectedRoute>} />
        <Route path='/certifications' element={<ProtectedRoute><Certification /></ProtectedRoute>} />
        <Route path='/projects' element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path='/languages' element={<ProtectedRoute><Languages /></ProtectedRoute>} />
        <Route path='/social' element={<ProtectedRoute><Social /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path="/temp1" element={<ProtectedRoute><Temp1 /></ProtectedRoute>} />
        <Route path="/temp2" element={<ProtectedRoute><Temp2 /></ProtectedRoute>} />
        <Route path="/temp3" element={<ProtectedRoute><Temp3 /></ProtectedRoute>} />
        <Route path="/temp4" element={<ProtectedRoute><Temp4 /></ProtectedRoute>} />
        <Route path="/temp5" element={<ProtectedRoute><Temp5 /></ProtectedRoute>} />
        <Route path="/temp6" element={<ProtectedRoute><Temp6 /></ProtectedRoute>} />

        <Route path="/template-selection" element={<ProtectedRoute><TemplateSelection /></ProtectedRoute>} />
        <Route path="/view-resume" element={<ProtectedRoute><ViewResume /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </Router >
  );
};

export default App;
