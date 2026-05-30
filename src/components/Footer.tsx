import { Link } from 'react-router-dom';
import { Camera, MessageSquare, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-surface-container-lowest dark:bg-inverse-surface w-full py-16 border-t border-outline-variant/30 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        
        {/* About column */}
        <div className="col-span-1 md:col-span-1 mb-8 md:mb-0">
          <Link to="/" className="font-headline text-2xl font-black text-primary dark:text-primary-fixed block mb-4 transition-transform hover:-translate-y-0.5 duration-300">
            Neomundo Tour
          </Link>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            Premium Guatapé Experiences. Discover the beauty of Colombia with unparalleled service.
          </p>
          <div className="flex gap-4">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 rounded-full bg-surface-variant dark:bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-primary-container hover:text-on-primary transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <Camera className="w-5 h-5" />
            </a>
            <a 
              href="https://wa.me/573226054919" 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 rounded-full bg-surface-variant dark:bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-secondary hover:text-on-secondary transition-all duration-300 hover:scale-110"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-label-md text-label-md text-on-surface font-bold mb-4 uppercase tracking-wider">Company</h4>
          <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
            <li>
              <a href="#" className="hover:underline decoration-primary underline-offset-4 hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline decoration-primary underline-offset-4 hover:text-primary transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline decoration-primary underline-offset-4 hover:text-primary transition-colors">
                Help Center
              </a>
            </li>
          </ul>
        </div>

        {/* Connect Column */}
        <div>
          <h4 className="font-label-md text-label-md text-on-surface font-bold mb-4 uppercase tracking-wider">Connect</h4>
          <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:underline decoration-primary underline-offset-4 hover:text-primary transition-colors">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://wa.me/573226054919" target="_blank" rel="noreferrer" className="hover:underline decoration-primary underline-offset-4 hover:text-primary transition-colors">
                WhatsApp Chat
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="font-label-md text-label-md text-on-surface font-bold mb-4 uppercase tracking-wider">Contact Us</h4>
          <div className="font-body-md text-body-md text-on-surface-variant space-y-3">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>Guatapé, Antioquia, Colombia</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <span className="font-bold text-primary dark:text-primary-fixed">+57 322 6054919</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-outline-variant/20 text-center px-margin-mobile text-on-surface-variant">
        <p>© 2024 Neomundo Tour. Premium Guatapé Experiences.</p>
      </div>
    </footer>
  );
}
