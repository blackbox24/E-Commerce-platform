// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} E-Commerce. All rights reserved.</p>
      </div>
    </footer>
  );
}
