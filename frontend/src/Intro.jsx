
import React from 'react';
import { Link } from 'react-router-dom';
import './Intro.css';

const Intro = () => {
  return (
    <div className="intro-page">
      <div className="bg-orb orb-one" />
      <div className="bg-orb orb-two" />

      <nav className="intro-navbar">
        <div className="brand">
          <span className="brand-dot" />
          BMI Sphere
        </div>
        <div className="nav-actions">
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/signup" className="nav-link nav-link-cta">
            Sign Up
          </Link>
        </div>
      </nav>

      <main className="intro-showcase">
        <section className="hero-copy">
          <div className="avatar-ring">BM</div>
          <h1 className="intro-title">Smart BMI Dashboard UI</h1>
          <p className="intro-paragraph">
            Calculate your Body Mass Index in seconds with a sleek dashboard experience. This website gives you instant
            BMI score analysis, category status, and practical health direction in one place.
          </p>
          <div className="hero-actions">
            <Link to="/login" className="hero-btn hero-btn-primary">
              Get Started
            </Link>
            <Link to="/signup" className="hero-btn hero-btn-outline">
              Create Account
            </Link>
          </div>
        </section>

        <section className="preview-panel">
          <div className="preview-topbar">
            <span />
            <span />
            <span />
          </div>
          <div className="preview-hero">
            <h2>Track Your BMI Journey</h2>
            <p>Modern health dashboard with instant feedback.</p>
            <Link to="/login" className="preview-link">
              Try Now
            </Link>
          </div>
          <div className="preview-stats">
            <article className="stat-card">
              <h3>Normal</h3>
              <p>18.5 - 24.9</p>
            </article>
            <article className="stat-card">
              <h3>Overweight</h3>
              <p>25.0 - 29.9</p>
            </article>
            <article className="stat-card">
              <h3>Obese</h3>
              <p>30+</p>
            </article>
          </div>
        </section>
      </main>

      <section id="about-bmi" className="about-sections">
        <article className="about-card">
          <h2>What Is BMI?</h2>
          <p>
            BMI means Body Mass Index. It compares your weight to your height and gives a number that helps classify
            your health range: underweight, normal, overweight, or obese.
          </p>
        </article>

        <article className="about-card">
          <h2>Why Use This Calculator?</h2>
          <p>
            You can quickly check your current BMI, understand where you stand, and use the result as a simple first
            signal to improve nutrition, activity, and overall lifestyle.
          </p>
        </article>

        <article className="about-card">
          <h2>How It Helps You</h2>
          <p>
            After calculation, the app shows your BMI category and practical suggestions. This makes it easier to plan
            your next steps toward healthier routines.
          </p>
        </article>
      </section>
    </div>
  );
};

export default Intro;
