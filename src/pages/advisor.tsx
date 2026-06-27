import { useAuth } from '../contexts/AuthContext';

export default function AdvisorPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-[#f8f9ff] px-6 py-16">
      <div className="mx-auto w-full max-w-[1200px] flex flex-col gap-12 items-start justify-start">

        {/* Header */}
        <div className="flex flex-col gap-4 items-start self-stretch">
          <h1 className="text-[#004ac6] text-h1">
            Talk to an Advisor
          </h1>
          <p className="text-slate text-p1 max-w-2xl">
            Connect with a dedicated financial advisor who can help you achieve your business goals.
          </p>
        </div>

        {/* Contact Options */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-snow rounded-lg border border-border p-8 flex flex-col gap-4">
            <h3 className="text-ink text-h3">Phone Consultation</h3>
            <p className="text-slate text-p2">
              Call us directly to schedule a time that works for you.
            </p>
            <button type="button" className="btn btn-primary rounded-lg px-6 py-3">
              <span className="text-snow text-b2">Call Now</span>
            </button>
          </div>

          <div className="bg-snow rounded-lg border border-border p-8 flex flex-col gap-4">
            <h3 className="text-ink text-h3">Schedule Meeting</h3>
            <p className="text-slate text-p2">
              Book a virtual or in-person meeting at your convenience.
            </p>
            <button type="button" className="btn btn-primary rounded-lg px-6 py-3">
              <span className="text-snow text-b2">Schedule</span>
            </button>
          </div>

          <div className="bg-snow rounded-lg border border-border p-8 flex flex-col gap-4 md:col-span-2">
            <h3 className="text-ink text-h3">Live Chat</h3>
            <p className="text-slate text-p2">
              Chat with an advisor now for immediate assistance.
            </p>
            <button type="button" className="btn btn-primary rounded-lg px-6 py-3">
              <span className="text-snow text-b2">Start Chat</span>
            </button>
          </div>
        </div>

        {/* Advisor Hours */}
        <div className="w-full bg-snow rounded-lg border border-border p-8">
          <h2 className="text-ink text-h2 mb-4">Advisor Availability</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-ink text-b2">Monday - Friday</span>
              <span className="text-slate text-p2 block">9:00 AM - 6:00 PM EST</span>
            </div>
            <div>
              <span className="text-ink text-b2">Saturday</span>
              <span className="text-slate text-p2 block">10:00 AM - 4:00 PM EST</span>
            </div>
            <div>
              <span className="text-ink text-b2">Sunday</span>
              <span className="text-slate text-p2 block">Closed</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}