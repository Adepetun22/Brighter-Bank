import React, { useState } from 'react';



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
        className="flex items-center justify-between self-stretch text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="text-ink text-left text-h3 flex-1">{question}</div>
        <img className="h-auto" src={iconSrc} alt="" />
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
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);
  const navItems: NavItem[] = [

    { label: 'Personal', active: true },
    { label: 'Business' },
    { label: 'Loans' },
    { label: 'Mortgages' },
    { label: 'Credit Cards' },
    { label: 'Investing' },
  ];

  return (
    <div className="flex flex-col items-center relative min-h-screen bg-gradient-to-r from-[#f8f9ff] to-snow">
      {/* Header */}
      <div className="w-full bg-snow border-b border-border shadow-sm">
        <div className="px-6 h-20 flex items-center justify-between max-w-[1440px] mx-auto">
          <div className="text-primary text-h2">Brighter Bank</div>

          <div className="hidden md:flex items-start gap-6">
            {navItems.map((item) => (
              <div key={item.label} className={item.active ? 'border-primary border-b-2 pb-1' : 'pb-1'}>
                <div className={item.active ? 'text-primary text-b2' : 'text-slate text-b2'}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-lg border border-primary px-4 py-2">
              <div className="text-primary text-b2 text-center">Sign In</div>
            </div>
            <div className="rounded-lg bg-primary px-6 py-2">
              <div className="text-snow text-b2 text-center">Open an Account</div>
            </div>
          </div>
        </div>
      </div>

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
              <div className="bg-primary rounded-xl py-4 px-8">
                <div className="text-snow text-b2">Search</div>
              </div>
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

              <div className="flex flex-col gap-4 self-stretch mt-6">
                <div className="flex flex-col gap-1 self-stretch">
                  <div className="text-slate text-p3">Full Name</div>
                  <div className="bg-cloud rounded border border-border py-3 px-4 self-stretch">
                    <div className="text-slate text-p2">John Doe</div>
                  </div>
                </div>

                <div className="flex flex-col gap-1 self-stretch">
                  <div className="text-slate text-p3">Email Address</div>
                  <div className="bg-cloud rounded border border-border py-3 px-4 self-stretch">
                    <div className="text-slate text-p2">john@example.com</div>
                  </div>
                </div>

                <div className="flex flex-col gap-1 self-stretch">
                  <div className="text-slate text-p3">Inquiry Type</div>
                  <div className="bg-cloud rounded border border-border py-3 px-4 self-stretch flex items-center">
                    <div className="flex-1">
                      <div className="text-ink text-p2">General Inquiry</div>
                    </div>
                    <img className="w-6 h-6" src={image0} alt="" />
                  </div>
                </div>

                <div className="flex flex-col gap-1 self-stretch">
                  <div className="text-slate text-p3">Message</div>
                  <div className="bg-cloud rounded border border-border py-3 px-4 self-stretch h-[84px]">
                    <div className="text-slate text-p2">How can we help you?</div>
                  </div>
                </div>

                <button
                  type="button"
                  className="bg-primary rounded py-3 w-full flex items-center justify-center"
                >
                  <div className="text-snow text-b2">Submit Message</div>
                </button>
              </div>
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
          </div>
        </div>

        {/* Find a Branch or ATM */}
        <div className="w-full flex flex-col gap-8">
          <div className="text-ink text-left text-h2">Find a Branch or ATM</div>

          <div className="border border-border rounded-lg overflow-hidden shadow-md">
            <div className="grid gap-6 p-0 grid-cols-1 md:grid-cols-3">
              <div className="bg-snow p-6 min-h-[500px]">
                <div className="flex flex-col gap-4">
                  <div className="bg-[#e6eeff] rounded border border-primary border-l-4 p-4">
                    <div className="text-ink text-b1">Main Street Branch</div>
                    <div className="text-slate text-p3 mt-0">123 Finance Way, Downtown</div>
                    <div className="flex items-center gap-1 mt-0">
                      <img className="h-auto" src={container36} alt="" />
                      <div className="text-tertiary text-p3">Open until 6:00 PM</div>
                    </div>
                  </div>

                  <div className="rounded p-4">
                    <div className="text-ink text-b1">Westside Hub</div>
                    <div className="text-slate text-p3">455 Commerce Ave, Westside</div>
                    <div className="text-slate text-p3">2.4 miles away</div>
                  </div>

                  <div className="rounded p-4">
                    <div className="text-ink text-b1">The Plaza ATM</div>
                    <div className="text-slate text-p3">88 Market Square (24/7 Access)</div>
                    <div className="text-slate text-p3">3.1 miles away</div>
                  </div>

                  <div className="rounded p-4">
                    <div className="text-ink text-b1">Northside Branch</div>
                    <div className="text-slate text-p3">900 Corporate Blvd</div>
                    <div className="text-slate text-p3">4.8 miles away</div>
                  </div>
                </div>
              </div>

              <div className="relative md:col-span-2 min-h-[400px] bg-[#e6eeff]">
                <div className="absolute right-4 bottom-4 flex flex-col gap-2">
                  <div className="bg-snow rounded-xl border border-border w-10 h-10 flex items-center justify-center shadow-md">
                    <img className="h-auto" src={container44} alt="" />
                  </div>
                  <div className="bg-snow rounded-xl border border-border w-10 h-10 flex items-center justify-center shadow-md">
                    <img className="h-auto" src={container45} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-[#121c2a] px-6 desktop:px-20">
        <div className="py-16 flex flex-col gap-6 items-center">
          <div className="w-full flex-col md:flex-row gap-y-4 items-center justify-between flex-wrap max-w-[1440px]">
            <div className="text-[#dbe1ff] text-h3">Brighter Bank</div>

            <div className="flex gap-[calc(var(--spacing)*4)] md:gap-6 flex-wrap items-start flex-1 max-w-[628px]">
              <FooterLink>Privacy Policy</FooterLink>
              <FooterLink>Terms of Service</FooterLink>
              <FooterLink>Security</FooterLink>
              <FooterLink>Accessibility</FooterLink>
              <FooterLink>Cookie Settings</FooterLink>
              <FooterLink>Sitemap</FooterLink>
            </div>
          </div>

          <div className="w-full border-t border-[rgba(115,118,134,0.30)] pt-6 opacity-60">
            <div className="text-[#d9e3f6] text-p3">
              © 2026 Brighter Bank. Member FDIC. Equal Housing Lender. All rights reserved. Registered in the United States and other countries.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
