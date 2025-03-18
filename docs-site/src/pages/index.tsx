import React from 'react';
import Layout from '@theme/Layout';

export default function Home() {
  return (
    <Layout title="AI Learning Hub" description="Your Open AI Learning Hub">
      <header className="hero hero--primary">
        <div className="container">
          <h1 className="hero__title">Welcome to AI Learning Hub 🚀</h1>
          <p className="hero__subtitle">Explore AI Product, Engineering, & Storytelling.</p>
          <a className="button button--secondary button--lg" href="/docs/intro">
            Get Started
          </a>
        </div>
      </header>
    </Layout>
  );
}
