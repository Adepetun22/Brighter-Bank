import lifestyleImage from '../assets/left-side-lifestyle-image0.png';
import protectionIcon from '../assets/protection-icon0.svg';
import lockIcon from '../assets/lock-icon-3420.svg';

export default function OpenAnAccountPage() {
  return (
    <div className="grid tablet:grid-cols-2 grid-cols-1 min-h-screen">
      {/* Left — hero image panel */}
      <div
        className="hidden tablet:flex flex-col justify-end pt-[607px] px-24 pb-24 gap-2.5 relative overflow-hidden"
        style={{
          background: `url(${lifestyleImage}) center / cover no-repeat`,
        }}
      >
        {/* gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,74,198,0.2) 0%, rgba(0,74,198,0) 100%)',
          }}
        />
        <div
          className="flex flex-col gap-3 items-start max-w-md relative z-10"
          style={{
            boxShadow:
              '0px 10px 8px 0px rgba(0,0,0,0.04), 0px 4px 3px 0px rgba(0,0,0,0.1)',
          }}
        >
          <h1 className="text-snow text-h1">
            Unlock your
            <br />
            financial potential.
          </h1>
          <p className="text-snow text-p1 opacity-90">
            Join over 2 million customers who trust
            <br />
            Brighter Bank for their journey.
          </p>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="bg-snow flex flex-col justify-center px-6 py-12 tablet:px-24 tablet:py-16">
        {/* Progress */}
        <div className="pb-16 w-full max-w-[520px]">
          <div className="flex flex-row items-end justify-between mb-2">
            <span
              className="text-primary text-p2 font-normal uppercase"
              style={{ letterSpacing: '0.8px' }}
            >
              STEP 1 OF 4
            </span>
            <span className="text-slate text-p2">Personal Details</span>
          </div>
          <div className="bg-[#e6eeff] rounded-xl h-1.5 relative overflow-hidden">
            <div className="bg-primary w-[25%] absolute inset-y-0 left-0" />
          </div>
        </div>

        {/* Form content */}
        <div className="flex flex-col gap-2 w-full max-w-[520px]">
          <h2 className="text-ink text-h2">
            Start your brighter
            <br />
            journey today.
          </h2>
          <p className="text-slate text-p2">
            It takes less than 5 minutes to set up your account.
          </p>

          <div className="pt-6 pb-14 flex flex-col gap-10">
            {/* Fields */}
            <div className="flex flex-col gap-2">
              <span className="text-ink text-b1">Tell us about yourself</span>

              {/* Legal Name */}
              <div className="pt-2 flex flex-col gap-1">
                <label className="text-ink text-p2">Legal Name</label>
                <div className="bg-snow rounded border border-border px-4 py-3.5 overflow-hidden">
                  <input
                    type="text"
                    placeholder="As it appears on your ID"
                    className="w-full text-p2 text-ink bg-transparent outline-none placeholder:text-slate/50"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-ink text-p2">Email Address</label>
                <div className="bg-snow rounded border border-border px-4 py-3.5 overflow-hidden">
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full text-p2 text-ink bg-transparent outline-none placeholder:text-slate/50"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <label className="text-ink text-p2">Phone Number</label>
                <div className="relative">
                  <div className="bg-snow rounded border border-border pl-12 pr-4 py-3.5 overflow-hidden">
                    <input
                      type="tel"
                      placeholder="(555) 000-0000"
                      className="w-full text-p2 text-ink bg-transparent outline-none placeholder:text-slate/50"
                    />
                  </div>
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate text-p2">
                    +1
                  </span>
                </div>
              </div>
            </div>

            {/* Continue button */}
            <button
              type="button"
              className="btn btn-primary w-full py-4 rounded"
              style={{
                boxShadow:
                  '0px 2px 4px -2px rgba(0,0,0,0.1), 0px 4px 6px -1px rgba(0,0,0,0.1)',
              }}
            >
              <span className="text-snow text-p2">Continue</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="bg-cloud rounded-lg border border-border/50 p-4 flex flex-row flex-wrap gap-8 items-center justify-center">
            <div className="flex flex-row gap-[11px] items-center">
              <img src={protectionIcon} alt="FDIC" className="h-6 w-auto" />
              <span className="text-ink text-p2">Member FDIC</span>
            </div>
            <div className="bg-border w-px h-4" />
            <div className="flex flex-row gap-[11px] items-center">
              <img src={lockIcon} alt="Encryption" className="h-6 w-auto" />
              <span className="text-ink text-p2">256-bit Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
