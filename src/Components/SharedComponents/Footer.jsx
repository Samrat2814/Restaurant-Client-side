import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-orange-500">Flame&Fork🔥🍴</h2>
            <p className="mt-2 text-gray-400">
              Savor the best flavors, one bite at a time!
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-orange-500">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/foods"
                  className="text-gray-400 hover:text-orange-500"
                >
                  All Foods
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-gray-400 hover:text-orange-500"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-orange-500"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300">Follow Us</h3>
            <div className="flex justify-center md:justify-start mt-3 space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Flame&Fork. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
