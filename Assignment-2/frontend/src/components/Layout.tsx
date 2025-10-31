import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4 font-bold text-xl">
        Task Manager
      </header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-200 text-center py-2 text-sm text-gray-600">
        &copy; 2025 Task Manager, All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
