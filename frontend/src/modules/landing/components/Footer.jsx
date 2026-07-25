import React from 'react';
import { Home } from 'lucide-react';
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa6';
import { companyLinks, supportLinks } from '../data/footerLinks';
import Button from './Button';

var socialIcons = [
  { icon: FaFacebook, label: 'Facebook' },
  { icon: FaInstagram, label: 'Instagram' },
  { icon: FaXTwitter, label: 'Twitter' },
  { icon: FaYoutube, label: 'YouTube' },
  { icon: FaLinkedin, label: 'LinkedIn' },
];

function Footer() {
  return (
    <footer className="bg-ink-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo + Social */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-white">Residio</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Your trusted partner in finding safe, comfortable & affordable stays across India.
            </p>
            <div className="flex items-center gap-2">
              {socialIcons.map(function (social) {
                var SocialIcon = social.icon;
                return (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-brand-orange hover:bg-brand-orange transition-colors"
                  >
                    <SocialIcon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="font-bold text-base mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map(function (link) {
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 text-sm hover:text-brand-orange transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="font-bold text-base mb-4">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map(function (link) {
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 text-sm hover:text-brand-orange transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-bold text-base mb-4">Newsletter</h4>
            <p className="text-white/60 text-sm mb-4">
              Subscribe to get updates on new properties and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-white/20 rounded-l-lg px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand-orange transition-colors"
              />
              <button className="bg-brand-orange hover:bg-brand-orangeDark text-white font-medium text-sm px-4 py-2.5 rounded-r-lg transition-colors cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 pt-5 flex flex-col sm:flex-row justify-between text-sm text-white/60 gap-3">
          <p>© 2025 Residio. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;