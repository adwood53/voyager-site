// src/app/not-found.js
import Link from 'next/link';
import Navbar from '@/src/app/components/Navbar';
import Footer from '@/src/app/components/Footer';

// This ensures proper 404 status code
export const metadata = {
  title: 'Page Not Found | Voyager',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-darkBg text-textLight">
      <Navbar />
      <div className="container-voyager py-20 text-center">
        <h1 className="text-6xl font-heading text-primary mb-8">
          404
        </h1>
        <h2 className="text-3xl mb-6">Page Not Found</h2>
        <p className="text-xl mb-10 max-w-md mx-auto opacity-80">
          The page you are looking for might have been removed, had
          its name changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="bg-primary text-textLight font-medium px-8 py-3 rounded-md hover:bg-accent transition-all inline-block"
        >
          Return to Home
        </Link>
      </div>
      <Footer />
    </main>
  );
}
