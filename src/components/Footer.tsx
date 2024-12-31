import React from 'react';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>© {new Date().getFullYear()}</span>
          <p> ServAcosta. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/AntonioAF-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-gray-700"
            >
              <Github className="w-4 h-4" />
              <span>Source</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}