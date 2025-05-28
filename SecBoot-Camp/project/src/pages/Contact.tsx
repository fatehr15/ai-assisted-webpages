import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Linkedin, Instagram, Github, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return 'Invalid email format';
    if (!formData.subject) return 'Subject is required';
    if (!formData.message.trim()) return 'Message is required';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      setSubmitStatus('error');
      playError();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (error) throw error;

      setSubmitStatus('success');
      playSuccess();
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to submit form. Please try again later.');
      playError();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-golden-dream mb-8"
        >
          Contact Us
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-blue-zodiac/30 backdrop-blur-sm p-6 rounded-lg border border-hippie-blue/30"
          >
            <h2 className="text-2xl font-semibold text-citrine-white mb-6">Send us a message</h2>
            
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-lg ${
                  submitStatus === 'success' 
                    ? 'bg-green-500/20 border border-green-500' 
                    : 'bg-red-500/20 border border-red-500'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {submitStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-green-500">Message sent successfully!</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <span className="text-red-500">{errorMessage}</span>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-citrine-white mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-blue-zodiac/50 border border-hippie-blue/30 rounded-lg px-4 py-2 text-citrine-white focus:outline-none focus:border-golden-dream focus:ring-1 focus:ring-golden-dream transition-all duration-300"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-citrine-white mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-blue-zodiac/50 border border-hippie-blue/30 rounded-lg px-4 py-2 text-citrine-white focus:outline-none focus:border-golden-dream focus:ring-1 focus:ring-golden-dream transition-all duration-300"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-citrine-white mb-2">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-blue-zodiac/50 border border-hippie-blue/30 rounded-lg px-4 py-2 text-citrine-white focus:outline-none focus:border-golden-dream focus:ring-1 focus:ring-golden-dream transition-all duration-300"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="cic">CIC Membership</option>
                  <option value="event">Event Information</option>
                  <option value="support">Technical Support</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-citrine-white mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-blue-zodiac/50 border border-hippie-blue/30 rounded-lg px-4 py-2 text-citrine-white focus:outline-none focus:border-golden-dream focus:ring-1 focus:ring-golden-dream transition-all duration-300"
                  placeholder="Your message"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 bg-golden-dream text-blue-zodiac rounded-lg font-semibold 
                         hover:bg-hippie-blue transform hover:scale-105 transition-all duration-300
                         shadow-[0_0_15px_rgba(240,214,55,0.5)] flex items-center justify-center
                         disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Send className="w-5 h-5 mr-2" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* CIC Membership Card */}
         <div className="bg-blue-zodiac/30 backdrop-blur-sm p-6 rounded-lg border border-golden-dream/30">
              <div className="flex items-center mb-4">
              <img 
  src="https://i.ibb.co/JFMNDbpV/CIC-yellow.png" 
  alt="CIC-yellow" 
  style={{ width: '60px', height: 'auto' }}
/>
                <h2 className="text-2xl font-semibold text-golden-dream">Join CIC</h2>
              </div>
              <p className="text-hippie-blue mb-4">
                Interested in becoming a member of the Cyber Innovators Club? Send us a message with the subject "CIC Membership" and we'll guide you through the process.
              </p>
              <ul className="space-y-2 text-citrine-white mb-4">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-golden-dream rounded-full mr-2" />
                  Access to exclusive workshops and events
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-golden-dream rounded-full mr-2" />
                  Mentorship opportunities
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-golden-dream rounded-full mr-2" />
                  Networking with industry professionals
                </li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="bg-blue-zodiac/30 backdrop-blur-sm p-6 rounded-lg border border-hippie-blue/30">
              <h2 className="text-2xl font-semibold text-citrine-white mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-hippie-blue">
                  <Mail className="w-5 h-5" />
                  <span>cyberinnovatorsclub@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-hippie-blue">
                  <Phone className="w-5 h-5" />
                  <span>+213 123 456 789</span>
                </div>
                <div className="flex items-center space-x-3 text-hippie-blue">
                  <MapPin className="w-5 h-5" />
                  <span>National School in Cyber Security, Sidi Abdellah, Algiers, Algeria</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-blue-zodiac/30 backdrop-blur-sm p-6 rounded-lg border border-hippie-blue/30">
              <h2 className="text-2xl font-semibold text-citrine-white mb-6">Follow Us</h2>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: '#' },
                  { icon: Twitter, href: '#' },
                  { icon: Linkedin, href: '#' },
                  { icon: Instagram, href: '#' },
                  { icon: Github, href: '#' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-3 rounded-full bg-blue-zodiac/50 border border-hippie-blue/30 
                             hover:border-golden-dream hover:text-golden-dream text-hippie-blue
                             transition-all duration-300 transform hover:scale-110"
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-blue-zodiac/30 backdrop-blur-sm p-6 rounded-lg border border-hippie-blue/30">
              <h2 className="text-2xl font-semibold text-citrine-white mb-6">Location</h2>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.5951112972387!2d2.8891666!3d36.7069444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQyJzI1LjAiTiAywrA1MycyMS4wIkU!5e0!3m2!1sen!2sdz!4v1635789012345!5m2!1sen!2sdz"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;