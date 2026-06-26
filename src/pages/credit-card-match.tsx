import { useLocation, Link } from 'react-router-dom';
import goldHorizonCard from '../assets/gold-horizon-card0.png';
import blackZenithCard from '../assets/black-zenith-card0.png';
import blueSparkCard from '../assets/blue-spark-card0.png';

interface LocationState {
  spend: number;
}

const MIN = 500;

function getRecommendedCard(spend: number): 'spark' | 'horizon' | 'zenith' {
  if (spend < 3000) return 'spark';
  if (spend < 7000) return 'horizon';
  return 'zenith';
}

export default function CreditCardMatchPage() {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const spend = state?.spend ?? 3500;
  const yearly = Math.round(spend * 12 * 0.03);

  const cardData = {
    spark: {
      name: 'Spark Blue',
      image: blueSparkCard,
      rate: '1.5% Unlimited',
      fee: '$0',
      intro: '$200 Bonus',
      description: 'Perfect for everyday spending with consistent cash back on all purchases.',
    },
    horizon: {
      name: 'Horizon Gold',
      image: goldHorizonCard,
      rate: '3% Dining & Travel',
      fee: '$95',
      intro: '60,000 Points',
      description: 'Best for frequent diners and travelers who want premium rewards.',
    },
    zenith: {
      name: 'Zenith Black',
      image: blackZenithCard,
      rate: '5x Points on Flights',
      fee: '$450',
      intro: '100,000 Points',
      description: 'Ultimate rewards for high spenders and luxury travel enthusiasts.',
    },
  };

  const recommendedKey = getRecommendedCard(spend);

  return (
    <div className="bg-[#f8f9ff] px-6 py-16">
      <div className="mx-auto w-full max-w-[1200px] flex flex-col gap-12 items-center justify-start">

        {/* Header */}
        <div className="flex flex-col gap-4 items-center justify-start self-stretch">
          <h1 className="text-[#004ac6] text-center text-h1">
            Your Recommended Card
          </h1>
          <p className="text-slate text-center text-p1 max-w-2xl">
            Based on your monthly spending of ${spend.toLocaleString()}, we found the perfect match for your lifestyle.
          </p>
        </div>

        {/* Result Card */}
        <div className="bg-snow rounded-lg border border-border p-8 tablet:p-16 flex flex-col gap-0 items-center justify-center self-stretch shadow-sm max-w-2xl w-full">
          <div className="flex flex-col tablet:flex-row gap-8 items-center">
            <img src={cardData[recommendedKey].image} alt={cardData[recommendedKey].name} className="rounded w-32 h-32 object-cover" />
            <div className="flex flex-col gap-3 items-start">
              <h2 className="text-ink text-h2">{cardData[recommendedKey].name}</h2>
              <p className="text-slate text-p2 max-w-sm">
                {cardData[recommendedKey].description}
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-slate text-b3">Rewards Rate:</span>
                  <span className="text-ink text-b2 font-semibold">{cardData[recommendedKey].rate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate text-b3">Annual Fee:</span>
                  <span className="text-ink text-b2 font-semibold">{cardData[recommendedKey].fee}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate text-b3">Intro Offer:</span>
                  <span className="text-ink text-b2 font-semibold">{cardData[recommendedKey].intro}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col tablet:flex-row gap-4 w-full">
            <Link to="/credit-cards" className="btn btn-secondary rounded-lg px-6 py-3 text-b2 text-center">
              Compare Other Cards
            </Link>
            <button type="button" className="btn btn-primary rounded-lg px-6 py-3 text-b2 text-center">
              <span className="text-snow">Apply Now</span>
            </button>
          </div>
        </div>

        {/* Estimated Rewards */}
        <div className="bg-[#eff4ff] rounded-lg p-6 tablet:p-8 flex flex-col gap-2 items-center self-stretch max-w-2xl">
          <span className="text-ink text-p3 uppercase tracking-[0.7px]">ESTIMATED YEARLY REWARDS</span>
          <span className="text-[#004ac6] text-[48px] leading-[56px] font-bold">
            ${yearly.toLocaleString()}
          </span>
          <span className="text-slate text-p2">
            Based on ${spend.toLocaleString()} monthly spending × 12 months
          </span>
        </div>

      </div>
    </div>
  );
}