import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                <MapPin size={20} />
              </div>

              <span className="text-xl font-bold">
                Apex<span className="text-gray-400">Homes</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-gray-400">
              Discover beautiful places to stay, from peaceful retreats
              to unforgettable city escapes.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="rounded-full bg-white/10 p-2.5 transition hover:bg-white/20"
              >
                <Instagram size={17} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="rounded-full bg-white/10 p-2.5 transition hover:bg-white/20"
              >
                <Facebook size={17} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="rounded-full bg-white/10 p-2.5 transition hover:bg-white/20"
              >
                <Twitter size={17} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold">Explore</h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-400">
              <li>
                <Link className="hover:text-white" to="/explore">
                  All stays
                </Link>
              </li>

              <li>
                <Link className="hover:text-white" to="/explore?type=apartment">
                  Apartments
                </Link>
              </li>

              <li>
                <Link className="hover:text-white" to="/explore?type=villa">
                  Villas
                </Link>
              </li>

              <li>
                <Link className="hover:text-white" to="/explore?type=house">
                  Houses
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">ApexHomes</h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-400">
              <li>
                <Link className="hover:text-white" to="/about">
                  About us
                </Link>
              </li>

              <li>
                <Link className="hover:text-white" to="/contact">
                  Contact
                </Link>
              </li>

              <li>
                <Link className="hover:text-white" to="/faq">
                  FAQs
                </Link>
              </li>

              <li>
                <Link className="hover:text-white" to="/booking-lookup">
                  Find my booking
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold">Need help?</h3>

            <div className="mt-5 space-y-4 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <Mail size={17} className="mt-0.5 shrink-0" />
                <span>hello@apexhomes.com</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0" />
                <span>Globally</span>
              </div>
            </div>

            <Link
              to="/explore?assistant=true"
              className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              Ask Apex AI
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} ApexHomes. All rights reserved.</p>

          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-white">
              Privacy
            </Link>

            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;