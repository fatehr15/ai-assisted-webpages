import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Info,
  Calendar,
  Mail,
  ArrowUp,
  Linkedin,
  Instagram,
  Disc as Discord,
  Send
} from 'lucide-react';
import { useSoundContext } from './SoundContext';

const Footer: React.FC = () => {
  const { playHover } = useSoundContext();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'About', path: '/about', icon: Info },
    { label: 'Activities', path: '/activities', icon: Calendar },
    { label: 'Contact', path: '/contact', icon: Mail }
  ];

  const socialLinks = [
    { icon: Discord, href: 'https://discord.gg/NR4dq67xw4', label: 'Discord' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/cyber-innovators-club/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/cyber_innovators_club/', label: 'Instagram' },
    { icon: Send, href: 'https://t.me/CIC_Enscs', label: 'Telegram' }
  ];

  return (
    <footer className="relative bg-gradient-to-r from-blue-zodiac to-blue-900 text-white pt-12">
      {/* Top Wave SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none h-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-full">
          <path d="M0,0V40C150,80,300,0,450,20C600,40,750,80,900,40C1050,0,1200,60,1200,60V0Z" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Logos */}
        <div className="flex justify-center items-center space-x-12 mb-10">
          <img src="https://i.ibb.co/JFMNDbpV/CIC-yellow.png" alt="CIC Logo" className="h-14 opacity-75 hover:opacity-100 transition" />
          <img src="https://i.ibb.co/S4PW8kdG/removebg-preview-1.png" alt="ENSCS Logo" className="h-14 opacity-75 hover:opacity-100 transition" />
          <img src="https://i.ibb.co/hFrPTGCv/Sec-Yellow.png" alt="Sec Bootcamp Logo" className="h-14 opacity-75 hover:opacity-100 transition" />
        </div>

        {/* Grid Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, path, icon: Icon }) => (
                <li key={label}>
                  <Link to={path}
                        onMouseEnter={playHover}
                        className="flex items-center space-x-2 hover:text-yellow-300 transition">
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Emails */}
          <div>
            <h4 className="text-lg font-bold mb-4">Get in Touch</h4>
            <div className="space-y-2">
              <a href="mailto:secbootcamp@gmail.com"
                 onMouseEnter={playHover}
                 className="flex items-center space-x-2 hover:text-yellow-300 transition">
                <Mail className="w-5 h-5" />
                <span>secbootcamp@gmail.com</span>
              </a>
              <a href="mailto:cyberinnovatorsclub@enscs.edu.dz"
                 className="flex items-center space-x-2 hover:text-yellow-300 transition">
                <Mail className="w-5 h-5" />
                <span>cyberinnovatorsclub@enscs.edu.dz</span>
              </a>
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-bold mb-3">Connect With Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a key={label}
                     href={href}
                     onMouseEnter={playHover}
                     className="p-2 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition"
                     target="_blank"
                     rel="noopener noreferrer"
                     aria-label={label}>
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Tagline & Back-to-Top */}
          <div className="flex flex-col justify-between">
            <p className="italic mb-6">"Empowering the next generation of cybersecurity innovators."</p>
            <button onClick={scrollToTop}
                    onMouseEnter={playHover}
                    className="self-end p-3 bg-yellow-400 text-blue-900 rounded-full hover:scale-110 transform transition">
              <ArrowUp className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white border-opacity-20 pt-6 pb-4 text-center text-sm text-white">
          © {year} Cyber Innovators Club. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;