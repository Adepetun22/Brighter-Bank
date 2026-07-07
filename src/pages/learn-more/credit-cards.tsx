import { NavLink } from 'react-router-dom';
import creditCardImage from '../../assets/credit-card.webp';
import blueSparkCard from '../../assets/blue-spark-card0.png';
import goldHorizonCard from '../../assets/gold-horizon-card0.png';
import blackZenithCard from '../../assets/black-zenith-card0.png';
import container0 from '../../assets/container0.svg';
import containerK20 from '../../assets/container-k-20.svg';
import container1 from '../../assets/container1.svg';

const CHECK = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M8.6 14.6L15.65 7.55L14.25 6.15L8.6 11.8L5.75 8.95L4.35 10.35L8.6 14.6ZM10 20C8.617 20 7.317 19.738 6.1 19.213C4.883 18.688 3.825 17.975 2.925 17.075C2.025 16.175 1.313 15.117 0.788 13.9C0.263 12.683 0 11.383 0 10C0 8.617 0.263 7.317 0.788 6.1C1.313 4.883 2.025 3.825 2.925 2.925C3.825 2.025 4.883 1.313 6.1 0.788C7.317 0.263 8.617 0 10 0C11.383 0 12.683 0.263 13.9 0.788C15.117 1.313 16.175 2.025 17.075 2.925C17.975 3.825 18.688 4.883 19.213 6.1C19.738 7.317 20 8.617 20 10C20 11.383 19.738 12.683 19.213 13.9C18.688 15.117 17.975 16.175 17.075 17.075C16.175 17.975 15.117 18.688 13.9 19.213C12.683 19.738 11.383 20 10 20ZM10 18C12.233 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.233 18 10C18 7.767 17.225 5.875 15.675 4.325C14.125 2.775 12.233 2 10 2C7.767 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.767 2 10C2 12.233 2.775 14.125 4.325 15.675C5.875 17.225 7.767 18 10 18Z" fill="#10B981" />
  </svg>
);

const cards = [
  {
    img: blueSparkCard,
    name: 'Spark Blue',
    tag: 'Everyday Cashback',
    tagColor: 'bg-[#e6eeff] text-primary',
    reward: '1.5%',
    rewardLabel: 'Unlimited cashback',
    fee: '$0',
    intro: '$200 bonus',
    highlight: false,
    perks: ['1.5% on all purchases', 'No annual fee', '$200 welcome bonus', 'Zero foreign transaction fees'],
  },
  {
    img: goldHorizonCard,
    name: 'Horizon Gold',
    tag: 'Most Popular',
    tagColor: 'bg-[#fef3c7] text-[#855300]',
    reward: '3%',
    rewardLabel: 'Dining & Travel',
    fee: '$95',
    intro: '60,000 pts',
    highlight: true,
    perks: ['3% on dining & travel', '1.5% on everything else', '60,000 point welcome bonus', 'Airport lounge access'],
  },
  {
    img: blackZenithCard,
    name: 'Zenith Black',
    tag: 'Premium',
    tagColor: 'bg-[#f3f4f6] text-ink',
    reward: '5x',
    rewardLabel: 'Points on flights',
    fee: '$450',
    intro: '100,000 pts',
    highlight: false,
    perks: ['5x points on flights', '3x on hotels & dining', 'Unlimited lounge access', 'Concierge service 24/7'],
  },
];

const features = [
  { icon: container0,    bg: 'bg-[#6ffbbe]', title: 'Zero Liability',   desc: "You're never responsible for unauthorized charges. Our fraud team monitors every transaction 24/7." },
  { icon: containerK20, bg: 'bg-[#dbe1ff]', title: 'Instant Freeze',   desc: 'Lost your card? Freeze it instantly from the app in seconds — and unfreeze just as fast.' },
  { icon: container1,   bg: 'bg-[#ffddb8]', title: 'Real-Time Alerts', desc: 'Get instant push notifications for every purchase so you always know where your money is going.' },
];

const faqs = [
  { q: 'How do I redeem my rewards?',              a: 'Rewards can be redeemed as statement credits, direct deposits, gift cards, or travel bookings directly from your account dashboard.' },
  { q: 'Is there a foreign transaction fee?',      a: 'No. All Brighter credit cards have zero foreign transaction fees — perfect for international travel or online purchases in other currencies.' },
  { q: 'How long does approval take?',             a: 'Most applicants receive an instant decision. In some cases, we may need 1–3 business days to verify additional information.' },
  { q: 'Can I upgrade my card later?',             a: 'Yes. You can upgrade from Spark Blue to Horizon Gold or Zenith Black at any time without closing your existing account or affecting your credit score.' },
];

export default function CreditCardsLearnMorePage() {
  return (
    <div className="flex flex-col bg-cloud">

      {/* Hero */}
      <section className="w-full bg-snow px-6 tablet:px-10 desktop:px-24 pt-16 pb-20">
        <div className="mx-auto max-w-[1200px] grid gap-12 desktop:grid-cols-2 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex rounded-xl bg-cloud px-3 py-1 w-max">
              <span className="text-primary text-b3 uppercase">Featured</span>
            </div>
            <h1 className="text-ink text-h1">Brighter Credit Cards</h1>
            <p className="text-slate text-p1">
              Enjoy the freedom of spending with rewards and no annual fees. From everyday cashback to premium travel perks — there's a card for every lifestyle.
            </p>
            <div className="flex flex-col gap-3">
              {['No annual fees on entry-level cards', 'Rewards on every purchase', 'Zero foreign transaction fees'].map(f => (
                <div key={f} className="flex items-center gap-3">
                  {CHECK}
                  <span className="text-ink text-p2">{f}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <NavLink to="/credit-cards" className="btn btn-primary rounded-lg px-8 py-4">
                <span className="text-snow text-b1">Compare All Cards</span>
              </NavLink>
              <NavLink to="/" className="btn btn-secondary rounded-lg px-8 py-4">
                <span className="text-b1">Back to Home</span>
              </NavLink>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src={creditCardImage} alt="Brighter Credit Cards" className="w-full h-[420px] object-cover" />
          </div>
        </div>
      </section>

      {/* Card lineup */}
      <section className="w-full px-6 tablet:px-10 desktop:px-24 py-20">
        <div className="mx-auto max-w-[1200px] flex flex-col gap-12">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-primary text-b3 uppercase tracking-[1.4px]">Our Cards</p>
            <h2 className="text-ink text-h2">Find your perfect match</h2>
            <p className="text-slate text-p2 max-w-xl">Three cards. One for every stage of your financial journey.</p>
          </div>
          <div className="grid gap-6 tablet:grid-cols-3">
            {cards.map(c => (
              <article
                key={c.name}
                className={`rounded-xl border p-8 flex flex-col gap-5 shadow-sm ${
                  c.highlight ? 'border-primary bg-[#eff4ff]' : 'border-border bg-snow'
                }`}
              >
                <div className="flex items-center justify-between">
                  <img src={c.img} alt={c.name} className="w-16 h-16 rounded-lg object-cover" />
                  <span className={`text-b3 rounded-lg px-3 py-1 ${c.tagColor}`}>{c.tag}</span>
                </div>
                <div>
                  <h3 className="text-ink text-h3">{c.name}</h3>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-primary font-extrabold text-[36px] leading-none">{c.reward}</span>
                    <span className="text-slate text-p3">{c.rewardLabel}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {c.perks.map(p => (
                    <div key={p} className="flex items-center gap-2">
                      {CHECK}
                      <span className="text-ink text-p3">{p}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 flex justify-between text-p3">
                  <span className="text-slate">Annual fee: <strong className="text-ink">{c.fee}</strong></span>
                  <span className="text-slate">Intro: <strong className="text-ink">{c.intro}</strong></span>
                </div>
                <NavLink
                  to="/credit-cards"
                  className={`btn rounded-lg py-3 text-center text-b2 ${c.highlight ? 'btn-primary' : 'btn-secondary'}`}
                >
                  <span className={c.highlight ? 'text-snow' : 'text-primary'}>Apply Now</span>
                </NavLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Security features */}
      <section className="w-full px-6 tablet:px-10 desktop:px-24 py-20 bg-snow">
        <div className="mx-auto max-w-[1200px] flex flex-col gap-12">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-primary text-b3 uppercase tracking-[1.4px]">Security First</p>
            <h2 className="text-ink text-h2">Your card. Your control.</h2>
          </div>
          <div className="grid gap-6 tablet:grid-cols-3">
            {features.map(f => (
              <article key={f.title} className="rounded-xl border border-border bg-cloud p-8 shadow-sm flex flex-col gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${f.bg}`}>
                  <img src={f.icon} alt="" className="h-auto w-6" />
                </div>
                <h3 className="text-ink text-h3">{f.title}</h3>
                <p className="text-slate text-p2">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full px-6 tablet:px-10 desktop:px-24 py-20">
        <div className="mx-auto max-w-[800px] flex flex-col gap-10">
          <h2 className="text-ink text-h2 text-center">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-border bg-snow p-6 shadow-sm">
                <p className="text-ink text-b2">{q}</p>
                <p className="text-slate text-p2 mt-2">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-6 tablet:px-10 desktop:px-24 pb-24">
        <div className="mx-auto max-w-[1200px] bg-snow rounded-2xl border border-border p-10 tablet:p-16 flex flex-col items-center gap-6 text-center shadow-sm">
          <h2 className="text-ink text-h2">Ready to find your card?</h2>
          <p className="text-slate text-p2 max-w-xl">Use our rewards calculator to see exactly how much you could earn based on your spending habits.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <NavLink to="/credit-cards" className="btn btn-primary rounded-lg px-10 py-4">
              <span className="text-snow text-b1">See My Card Match</span>
            </NavLink>
            <NavLink to="/open-an-account" className="btn btn-secondary rounded-lg px-10 py-4">
              <span className="text-b1">Open an Account First</span>
            </NavLink>
          </div>
        </div>
      </section>

    </div>
  );
}
