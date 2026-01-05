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
const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/personal-info" element={<PersonalInfo />} />
        <Route path="/education-info" element={<EducationInfo />} />
        <Route path='/experience-info' element={<ExperienceInfo />} />
        <Route path='/skills' element={<Skills />} />
        <Route path='/certifications' element={<Certification />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/languages' element={<Languages />} />
        <Route path='/social' element={<Social />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path="/temp1" element={<Temp1 />} />
        <Route path="/temp2" element={<Temp1 />} /> {/* Temporary mapping if needed, but I'll add imports */}
        <Route path="/template-selection" element={<TemplateSelection />} />
        <Route path="/view-resume" element={<ViewResume />} />
      </Routes>
      <Footer />
    </Router >
  );
};

export default App;
