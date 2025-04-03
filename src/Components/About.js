import React from "react";
import { FaUniversity, FaUserGraduate, FaCertificate, FaUserTie } from "react-icons/fa";
import "./About.css";

const About = () => {
    return (
        <div className="about-container">
            {/* Project Title */}
            <div className="header">
                <h1>Smart Irrigation System for Precision Farming</h1>
                <p className="subtitle">A PROJECT REPORT</p>
            </div>

            {/* Student Info Section */}
            <div className="card">
                <FaUserGraduate className="icon" />
                <h2>Submitted By</h2>
                <ul className="students">
                    <li>HARIHARA KRISHNAN S (721821106005)</li>
                    <li>RAGHAVANKUTTY (721821106015)</li>
                    <li>VIKASH G (721821106027)</li>
                    <li>SIDDARTHAN Y K (721821106304)</li>
                </ul>
            </div>

            {/* Degree Information */}
            <div className="card">
                <FaUniversity className="icon" />
                <h2>Bachelor of Engineering</h2>
                <p>Electronics and Communication Engineering</p>
                <p>Rathinam Technical Campus, Coimbatore-21</p>
                <p>ANNA UNIVERSITY: CHENNAI 600 025</p>
                <p className="year">April 2025</p>
            </div>

            {/* Bonafide Certificate */}
            <div className="card certificate">
                <FaCertificate className="icon" />
                <h2>Bonafide Certificate</h2>
                <p>Certified that this project report <strong>"Smart Irrigation System for Precision Farming"</strong> is the bonafide work of:</p>
                <ul>
                    <li>HARIHARA KRISHNAN S (721821106005)</li>
                    <li>RAGHAVANKUTTY (721821106015)</li>
                    <li>VIKASH G (721821106027)</li>
                    <li>SIDDARTHAN Y K (721821106304)</li>
                </ul>
                <p>Who carried out the project work under my supervision.</p>
            </div>

            {/* Signature Section */}
            <div className="signatures">
                <div className="card">
                    <FaUserTie className="icon" />
                    <h3>Mr. NAVEEN KUMAR</h3>
                    <p>Head of the Department</p>
                    <p>Electronics and Communication Engineering</p>
                    <p>Rathinam Technical Campus, Coimbatore-21</p>
                </div>
                <div className="card">
                    <FaUserTie className="icon" />
                    <h3>Ms. SUMITRA JOHN</h3>
                    <p>Supervisor | Assistant Professor</p>
                    <p>Electronics and Communication Engineering</p>
                    <p>Rathinam Technical Campus, Coimbatore-21</p>
                </div>
            </div>
        </div>
    );
};

export default About;
