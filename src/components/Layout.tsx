// src/components/Layout.tsx
import React from 'react';

interface LayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ left, right }) => (
  <div className="flex flex-col md:flex-row h-screen">
    <div className="w-full md:w-1/2 border-r">{left}</div>
    <div className="w-full md:w-1/2">{right}</div>
  </div>
);

export default Layout;
