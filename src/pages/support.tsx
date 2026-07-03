import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import DialogModal from '../components/DialogModal';
import { useAuth } from '../contexts/AuthContext';
import { supportService } from '../services/supportService';

import container3 from '../assets/container3.svg';
import container4 from '../assets/container4.svg';
import container6 from '../assets/container6.svg';
import container8 from '../assets/container8.svg';
import container10 from '../assets/container10.svg';
import container14 from '../assets/container14.svg';
import container17 from '../assets/container17.svg';
import container19 from '../assets/container19.svg';
import container21 from '../assets/container21.svg';
import container22 from '../assets/container22.svg';
import container31 from '../assets/container31.svg';
import container36 from '../assets/container36.svg';
import container44 from '../assets/container44.svg';
import container45 from '../assets/container45.svg';
import image0 from '../assets/image0.svg';


type NavItem = { label: string; active?: boolean };

type SupportCardProps = {
  iconSrc: string;
  title: string;
  description: React.ReactNode;
  variant?: 'blue' | 'red' | 'indigo';
};

function SupportCard({ iconSrc, title, description, variant = 'blue' }: SupportCardProps) {
  const variantBg =
    variant === 'red'
      ? 'bg-[#eff4ff]'
      : variant === 'indigo'
        ? 'bg-[#eff4ff]'
        : 'bg-[#eff4ff]';
  const iconBg =
    variant === 'red' ? 'bg-[#ffdad6]' : 'bg-[#dbe1ff]';

  return (
    <div
      className={`rounded-lg border border-border p-6 flex flex-col gap-4 items-start ${variantBg}`}
    >
      <div className={`rounded flex items-center justify-center w-12 h-12 ${iconBg}`}>
        <img className="h-auto" src={iconSrc} alt="" />
      </div>
      <div className="text-ink text-left text-h3">{title}</div>
      <div className="text-slate text-left text-p3">{description}</div>
    </div>
  );
}

function AccordionItem({
  iconSrc,
  question,
  isOpen,
  onToggle,
  children,
}: {
  iconSrc: string;
  question: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border py-6 flex flex-col gap-4 items-start self-stretch">
      <button
        type="button"
        className="flex items-center justify-between self-stretch text-left cursor-pointer"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="text-ink text-left text-h3 flex-1">{question}</div>
        <img 
          className="h-auto transform transition-transform duration-300" // Added transform and transition for smooth rotation
          style={{ rotate: isOpen ? '180deg' : '0deg' }} // Rotate the arrow based on accordion state
          src={iconSrc} 
          alt="" 
        />
      </button>

      <div
        className={
          isOpen
            ? 'opacity-100 max-h-[240px] transition-all duration-300 ease-out'
            : 'opacity-0 max-h-0 overflow-hidden transition-all duration-200 ease-in'
        }
      >
        <div className="pt-2">{children}</div>
      </div>
    </div>
  );
}


function FooterLink({ children }: { children: React.ReactNode }) {
  return (
    <div className="opacity-80">
      <div className="text-[#d9e3f6] text-left text-p3">{children}</div>
    </div>
  );
}

export default function SupportPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);
  const [activeLocationId, setActiveLocationId] = useState<'main' | 'westside' | 'plaza' | 'northside'>('main');
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Account help request');
  const [message, setMessage] = useState('How can we help you?');
  const [category, setCategory] = useState<'account' | 'technical' | 'security' | 'payment' | 'other'>('account');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showSupportSuccess, setShowSupportSuccess] = useState(false);
  const [supportError, setSupportError] = useState<string | null>(null);
  const [submittingSupport, setSubmittingSupport] = useState(false);
  const mapIframeRef = React.useRef<HTMLIFrameElement>(null);
  const navItems: NavItem[] = [

    { label: 'Personal', active: true },
    { label: 'Business' },
    { label: 'Loans' },
    { label: 'Mortgages' },
    { label: 'Credit Cards' },
    { label: 'Investing' },
  ];

  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));
  };

  const sendToMap = (id: string) => {
    mapIframeRef.current?.contentWindow?.postMessage({ type: 'SET_ACTIVE_LOCATION', id }, '*');
  };

  const mapSetActiveLocation = (id: 'main' | 'westside' | 'plaza' | 'northside') => {
    setActiveLocationId(id);
    sendToMap(id);
  };

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    if (!subject.trim()) {
      setSupportError('Subject is required.');
      return;
    }
    if (!message.trim()) {
      setSupportError('Message cannot be empty.');
      return;
    }

    setSupportError(null);
    setSubmittingSupport(true);

    try {
      await supportService.createTicket({
        subject: subject.trim(),
        message: message.trim(),
        category,
        priority,
      });
      setShowSupportSuccess(true);
      setFullName('');
      setEmail('');
      setSubject('Account help request');
      setMessage('How can we help you?');
      setCategory('account');
      setPriority('medium');
    } catch (error) {
      console.error('Support ticket error', error);
      if ((error as any)?.code === '401') {
        setShowLoginPrompt(true);
      } else {
        setSupportError('Unable to send your message. Please try again later.');
      }
    } finally {
      setSubmittingSupport(false);
    }
  };

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === 'MAP_READY') {
        // Map signals it's ready — ensure overlay is removed and center map
        setMapLoaded(true);
        sendToMap(activeLocationId);
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="flex flex-col items-center relative min-h-screen bg-gradient-to-r from-[#f8f9ff] to-snow">

      {/* Hero + Search */}
      <div className="w-full max-w-[1200px] px-6 py-16 flex flex-col gap-12 items-center">
        <div className="w-full max-w-3xl flex flex-col gap-8">
          <h1 className="text-primary text-center text-h1">We're here to help, anytime.</h1>

          <div className="relative w-full">
            <div className="bg-snow rounded-xl border border-border py-6 pr-6 pl-16 shadow-sm">
              <input
                className="w-full outline-none bg-transparent text-slate text-left text-p2 placeholder:text-slate"
                type="text"
                aria-label="Search for answers, topics, or services"
                placeholder="Search for answers, topics, or services..."
              />
            </div>

            <div className="absolute left-6 top-1/2 -translate-y-1/2">
              <img className="h-auto" src={container3} alt="" />
            </div>

            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <button type="button" className="btn btn-primary rounded-xl py-4 px-8">
                <div className="text-snow text-b2">Search</div>
              </button>
            </div>
          </div>
        </div>

        {/* Quick cards grid */}
        <div className="w-full grid gap-6 grid-cols-2 md:grid-cols-4">
          <SupportCard
            iconSrc={container4}
            title="FAQ"
            description={
              <>
                Find instant answers to
                <br />
                common questions about your
                <br />
                account and services.
              </>
            }
          />
          <SupportCard
            iconSrc={container6}
            title="Contact"
            description={
              <>
                Get in touch with our expert
                <br />
                team via chat, phone, or
                <br />
                secure message.
              </>
            }
          />
          <SupportCard
            iconSrc={container8}
            title="Security Center"
            variant="red"
            description={
              <>
                Protect your identity and
                <br />
                assets with our latest security
                <br />
                protocols and alerts.
              </>
            }
          />
          <SupportCard
            iconSrc={container10}
            title="Locator"
            description={
              <>
                Find the nearest Brighter Bank
                <br />
                branch or ATM location in your
                <br />
                area.
              </>
            }
          />
        </div>

        {/* FAQ + Message + Locate */}
        <div className="w-full grid gap-16 grid-cols-1 desktop:grid-cols-12">
          {/* Left: FAQ */}
          <div className="desktop:col-span-7">
            <div className="flex flex-col gap-8">
              <div className="text-ink text-left text-h2">Frequently Asked Questions</div>

              <div className="flex flex-col gap-4 self-stretch">
                {(() => {
                  const faqs = [
                    {
                      iconSrc: container14,
                      question: 'How do I reset my online banking password?',
                      answer: (
                        <div className="text-slate text-left text-p2">
                          You can reset your password by clicking 'Forgot Password' on the sign-in screen.
                          <br />
                          We'll send a verification code to your registered mobile number or email to help you
                          <br />
                          set a new one securely.
                        </div>
                      ),
                    },
                    {
                      iconSrc: container17,
                      question: 'What should I do if my card is lost or stolen?',
                      answer: (
                        <div className="text-slate text-left text-p2">
                          If your card is lost or stolen, contact us immediately to freeze your account.
                          <br />
                          After confirmation, we’ll help you with a replacement card and any necessary security steps.
                        </div>
                      ),
                    },
                    {
                      iconSrc: container19,
                      question: 'How long do international transfers take?',
                      answer: (
                        <div className="text-slate text-left text-p2">
                          International transfers can take anywhere from 1–5 business days depending on the destination
                          <br />
                          and processing requirements. You can track status in your account once initiated.
                        </div>
                      ),
                    },
                    {
                      iconSrc: container21,
                      question: 'Can I open a joint account online?',
                      answer: (
                        <div className="text-slate text-left text-p2">
                          Yes. You can apply for a joint account online. Both applicants will need to verify their details
                          <br />
                          and complete the required consent steps before approval.
                        </div>
                      ),
                    },
                  ];

                  return faqs.map((faq, index) => (
                    <AccordionItem
                      key={faq.question}
                      iconSrc={faq.iconSrc}
                      question={faq.question}
                      isOpen={index === openFaqIndex}
                      onToggle={() => setOpenFaqIndex(index === openFaqIndex ? -1 : index)}
                    >
                      {faq.answer}
                    </AccordionItem>
                  ));
                })()}
              </div>


              <div className="flex items-center gap-2">
                <div className="text-primary text-b2">View all FAQs</div>
                <img className="h-auto" src={container22} alt="" />
              </div>
            </div>
          </div>

          {/* Right: Message + Security */}
          <div className="desktop:col-span-5 flex flex-col gap-6">
            <div className="bg-snow rounded-lg border border-border p-8 shadow-sm">
              <div className="text-ink text-left text-h3">Send us a message</div>

              <form
                className="flex flex-col gap-4 self-stretch mt-6"
                onSubmit={handleSupportSubmit}
              >
                <div className="flex flex-col gap-1 self-stretch">
                  <div className="text-slate text-p3">Full Name</div>
                  <input
                    className="bg-cloud rounded border border-border py-3 px-4 self-stretch text-ink text-p2 outline-none"
                    type="text"
                    placeholder="John Doe"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1 self-stretch">
                  <div className="text-slate text-p3">Email Address</div>
                  <input
                    className="bg-cloud rounded border border-border py-3 px-4 self-stretch text-ink text-p2 outline-none"
                    type="email"
                    placeholder="john@example.com"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1 self-stretch">
                  <div className="text-slate text-p3">Subject</div>
                  <input
                    className="bg-cloud rounded border border-border py-3 px-4 self-stretch text-ink text-p2 outline-none"
                    type="text"
                    placeholder="What can we help with?"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1 self-stretch">
                  <div className="text-slate text-p3">Inquiry Type</div>
                  <label className="bg-cloud rounded border border-border py-3 px-4 self-stretch flex items-center gap-3">
                    <select
                      className="flex-1 bg-transparent outline-none text-ink text-p2"
                      name="inquiryType"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                    >
                      <option value="account">Account</option>
                      <option value="technical">Technical</option>
                      <option value="security">Security</option>
                      <option value="payment">Payment</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>

                <div className="flex flex-col gap-1 self-stretch">
                  <div className="text-slate text-p3">Priority</div>
                  <label className="bg-cloud rounded border border-border py-3 px-4 self-stretch flex items-center gap-3">
                    <select
                      className="flex-1 bg-transparent outline-none text-ink text-p2"
                      name="priority"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </label>
                </div>

                <div className="flex flex-col gap-1 self-stretch">
                  <div className="text-slate text-p3">Message</div>
                  <textarea
                    className="bg-cloud rounded border border-border py-3 px-4 self-stretch h-[84px] text-ink text-p2 outline-none resize-none"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {supportError ? (
                  <div className="text-error text-p3">{supportError}</div>
                ) : null}

                <button
                  type="submit"
                  disabled={submittingSupport}
                  className={`btn btn-primary rounded-lg py-3 w-full flex items-center justify-center ${submittingSupport ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  <div className="text-snow text-b2">{submittingSupport ? 'Sending...' : 'Submit Message'}</div>
                </button>
              </form>
            </div>

            <div className="bg-[#ffdad6] rounded border border-[rgba(239,68,68,0.20)] p-4 flex gap-4 items-start">
              <img className="h-auto" src={container31} alt="" />
              <div className="flex flex-col gap-0">
                <div className="text-[#93000a] text-p3 font-semibold">Security Alert</div>
                <div className="text-[#93000a] text-p3">
                  Never share your password or OTP with anyone,
                  <br />
                  including bank staff. Learn more.
                </div>
              </div>
            </div>

            <DialogModal
              open={showLoginPrompt}
              title="Login required"
              description="Please sign in before submitting a secure support ticket."
              primaryLabel="Go to Login"
              onPrimary={() => {
                setShowLoginPrompt(false);
                navigate('/login');
              }}
              secondaryLabel="Cancel"
              onSecondary={() => setShowLoginPrompt(false)}
              onClose={() => setShowLoginPrompt(false)}
            />

            <DialogModal
              open={showSupportSuccess}
              title="Message sent"
              description="Your request has been submitted. Our support team will contact you soon."
              primaryLabel="Continue"
              onPrimary={() => setShowSupportSuccess(false)}
              onClose={() => setShowSupportSuccess(false)}
            />
          </div>
        </div>

        {/* Find a Branch or ATM */}
        <div className="w-full flex flex-col gap-8">
          <div className="text-ink text-left text-h2">Find a Branch or ATM</div>

          <div className="border border-border rounded-lg overflow-hidden shadow-md">
            <div className="grid gap-6 p-0 grid-cols-1 md:grid-cols-3">
              <div className="bg-snow p-6 min-h-[500px]">
                <div className="flex flex-col gap-4">
                  <button
                    type="button"
                    onClick={() => mapSetActiveLocation('main')}
                    className={
                      activeLocationId === 'main'
                        ? 'bg-[#e6eeff] rounded border border-primary border-l-4 p-4 text-left'
                        : 'rounded p-4 text-left'
                    }
                  >
                    <div className="text-ink text-b1">Main Street Branch</div>
                    <div className="text-slate text-p3 mt-0">123 Finance Way, Downtown</div>
                    <div className="flex items-center gap-1 mt-0">
                      <img className="h-auto" src={container36} alt="" />
                      <div className="text-tertiary text-p3">Open until 6:00 PM</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => mapSetActiveLocation('westside')}
                    className={
                      activeLocationId === 'westside'
                        ? 'bg-[#e6eeff] rounded border border-primary border-l-4 p-4 text-left'
                        : 'rounded p-4 text-left'
                    }
                  >
                    <div className="text-ink text-b1">Westside Hub</div>
                    <div className="text-slate text-p3">455 Commerce Ave, Westside</div>
                    <div className="text-slate text-p3">2.4 miles away</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => mapSetActiveLocation('plaza')}
                    className={
                      activeLocationId === 'plaza'
                        ? 'bg-[#e6eeff] rounded border border-primary border-l-4 p-4 text-left'
                        : 'rounded p-4 text-left'
                    }
                  >
                    <div className="text-ink text-b1">The Plaza ATM</div>
                    <div className="text-slate text-p3">88 Market Square (24/7 Access)</div>
                    <div className="text-slate text-p3">3.1 miles away</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => mapSetActiveLocation('northside')}
                    className={
                      activeLocationId === 'northside'
                        ? 'bg-[#e6eeff] rounded border border-primary border-l-4 p-4 text-left'
                        : 'rounded p-4 text-left'
                    }
                  >
                    <div className="text-ink text-b1">Northside Branch</div>
                    <div className="text-slate text-p3">900 Corporate Blvd</div>
                    <div className="text-slate text-p3">4.8 miles away</div>
                  </button>
                </div>
              </div>

              <div className="relative md:col-span-2 min-h-[400px] bg-[#e6eeff]">
                <iframe
                  ref={mapIframeRef}
                  title="3D Map Locator"
                    className="absolute inset-0 w-full h-full"
                    onLoad={() => setMapLoaded(true)}
                  sandbox="allow-scripts allow-same-origin"
                  src="/map.html"
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
                />

                  {!mapLoaded ? <LoadingSpinner overlay message="Loading map..." /> : null}

                  <div className="absolute right-4 bottom-4 flex flex-col gap-2 z-10" style={{ display: 'none' }}>
                  <div className="bg-snow rounded-xl border border-border w-10 h-10 flex items-center justify-center shadow-md" onClick={handleZoomIn}>
                    <img className="h-auto" alt="" src="data:image/svg+xml,%3csvg%20width='14'%20height='14'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M6%208H0V6H6V0H8V6H14V8H8V14H6V8Z'%20fill='%23004AC6'/%3e%3c/svg%3e" />
                  </div>
                  <div className="bg-snow rounded-xl border border-border w-10 h-10 flex items-center justify-center shadow-md" onClick={handleZoomOut}>
                    <img className="h-auto" alt="" src="data:image/svg+xml,%3csvg%20width='14'%20height='2'%20viewBox='0%200%2014%202'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M0%202V0H14V2H0Z'%20fill='%23004AC6'/%3e%3c/svg%3e" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}
