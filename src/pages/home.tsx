import React, { useState, lazy, Suspense, type JSX } from 'react';
import { NavLink } from 'react-router-dom';
const HeroScene = lazy(() => import('../components/HeroScene'));
import { useAuth } from '../contexts/AuthContext';
import CookieBanner from '../components/CookieBanner';
import container16Hr0 from '../assets/container-16-hr0.svg';
import container0 from '../assets/container0.svg';
import containerK20 from '../assets/container-k-20.svg';
import container1 from '../assets/container1.svg';
import container236H0 from '../assets/container-236-h0.svg';
import container236H1 from '../assets/container-236-h1.svg';
import container236H2 from '../assets/container-236-h2.svg';
import containerR86R0 from '../assets/container-r-86-r0.svg';
import containerR56T0 from '../assets/container-r-56-t0.svg';
import containerR33E0 from '../assets/container-r-33-e0.svg';
import containerR8Yd0 from '../assets/container-r-8-yd0.svg';
import containerR8Yj0 from '../assets/container-r-8-yj0.svg';
import containerR8Yl0 from '../assets/container-r-8-yl0.svg';
import containerR8Ym0 from '../assets/container-r-8-ym0.svg';
import containerR8Yx0 from '../assets/container-r-8-yx0.svg';
import containerR9Yd0 from '../assets/container-r-9-yd0.svg';
import containerR9Ya0 from '../assets/container-r-9-ya0.svg';
import containerR9Yg0 from '../assets/container-r-9-yg0.svg';
import containerR9Yj0 from '../assets/container-r-9-yj0.svg';
import containerR9Yg1 from '../assets/container-r-9-yg1.svg';
import containerF9Yt0 from '../assets/container-f-9-yt0.svg';
import containerH9Yt0 from '../assets/container-h-9-yt0.svg';
import containerD9Yt0 from '../assets/container-d-9-yt0.svg';
import containerA9Yt0 from '../assets/container-a-9-yt0.svg';
import containerP9Yt0 from '../assets/container-p-9-yt0.svg';
import image4T50 from '../assets/image-4-t-50.png';
import quoteImage1 from '../assets/quote-image-1.png';
import quoteImage2 from '../assets/quote-image-2.png';
import quoteImage3 from '../assets/quote-image-3.png';
import savingsImage from '../assets/savings-image.webp';
import creditCardImage from '../assets/credit-card.webp';

export default function HomePage() {
  type ProductTab = 'Checking' | 'Savings' | 'Credit Cards';
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<ProductTab>('Checking');
  const activeTabKey = activeTab.toLowerCase() as Lowercase<ProductTab>;
  const tabContents: Record<Lowercase<ProductTab>, JSX.Element> = {
    checking: (
      <div className="grid gap-10 desktop:grid-cols-2 rounded-xl border border-border bg-snow p-6 shadow-sm tablet:p-10">
        <img alt="Brighter product overview" className="rounded-lg h-[400px] w-full object-cover" src={quoteImage1} />
        <div className="flex flex-col gap-6">
          <div className="inline-flex rounded-xl bg-cloud px-3 py-1">
            <span className="text-primary text-b3 uppercase">MOST POPULAR</span>
          </div>
          <h3 className="text-ink text-h1">Brighter Checking</h3>
          <p className="text-slate text-p2">The only account you'll ever need. No hidden fees, instant transfers, and a sleek metal card that reflects your ambition.</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img alt="Feature check" className="h-5 w-auto" src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.6%2014.6L15.65%207.55L14.25%206.15L8.6%2011.8L5.75%208.95L4.35%2010.35L8.6%2014.6ZM10%2020C8.61667%2020%207.31667%2019.7375%206.1%2019.2125C4.88333%2018.6875%203.825%2017.975%202.925%2017.075C2.025%2016.175%201.3125%2015.1167%200.7875%2013.9C0.2625%2012.6833%200%2011.3833%200%2010C0%208.61667%200.2625%207.31667%200.7875%206.1C1.3125%204.88333%202.025%203.825%202.925%202.925C3.825%202.025%204.88333%201.3125%206.1%200.7875C7.31667%200.2625%208.61667%200%2010%200C11.3833%200%2012.6833%200.2625%2013.9%200.7875C15.1167%201.3125%2016.175%202.025%2017.075%202.925C17.975%203.825%2018.6875%204.88333%2019.2125%206.1C19.7375%207.31667%2020%208.61667%2020%2010C20%2011.3833%2019.7375%2012.6833%2019.2125%2013.9C18.6875%2015.1167%2017.975%2016.175%2017.075%2017.075C16.175%2017.975%2015.1167%2018.6875%2013.9%2019.2125C12.6833%2019.7375%2011.3833%2020%2010%2020ZM10%2018C12.2333%2018%2014.125%2017.225%2015.675%2015.675C17.225%2014.125%2018%2012.2333%2018%2010C18%207.76667%2017.225%205.875%2015.675%204.325C14.125%202.775%2012.2333%202%2010%202C7.76667%202%205.875%202.775%204.325%204.325C2.775%205.875%202%207.76667%202%2010C2%2012.2333%202.775%2014.125%204.325%2015.675C5.875%2017.225%207.76667%2018%2010%2018Z'%20fill='%2310B981'/%3e%3c/svg%3e" />
              <span className="text-ink text-p2">No monthly maintenance fees</span>
            </div>
            <div className="flex items-center gap-3">
              <img alt="Feature check" className="h-5 w-auto" src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.6%2014.6L15.65%207.55L14.25%206.15L8.6%2011.8L5.75%208.95L4.35%2010.35L8.6%2014.6V14.6M10%2020C8.61667%2020%207.31667%2019.7375%206.1%2019.2125C4.88333%2018.6875%203.825%2017.975%202.925%2017.075C2.025%2016.175%201.3125%2015.1167%200.7875%2013.9C0.2625%2012.6833%200%2011.3833%200%2010C0%208.61667%200.2625%207.31667%200.7875%206.1C1.3125%204.88333%202.025%203.825%202.925%202.925C3.825%202.025%204.88333%201.3125%206.1%200.7875C7.31667%200.2625%208.61667%200%2010%200C11.3833%200%2012.6833%200.2625%2013.9%200.7875C15.1167%201.3125%2016.175%202.025%2017.075%202.925C17.975%203.825%2018.6875%204.88333%2019.2125%206.1C19.7375%207.31667%2020%208.61667%2020%2010C20%2011.3833%2019.7375%2012.6833%2019.2125%2013.9C18.6875%2015.1167%2017.975%2016.175%2017.075%2017.075C16.175%2017.975%2015.1167%2018.6875%2013.9%2019.2125C12.6833%2019.7375%2011.3833%2020%2010%2020V20M10%2018C12.2333%2018%2014.125%2017.225%2015.675%2015.675C17.225%2014.125%2018%2012.2333%2018%2010C18%207.76667%2017.225%205.875%2015.675%204.325C14.125%202.775%2012.2333%202%2010%202C7.76667%202%205.875%202.775%204.325%204.325C2.775%205.875%202%207.76667%202%2010C2%2012.2333%202.775%2014.125%204.325%2015.675C5.875%2017.225%207.76667%2018%2010%2018V18M10%2010V10V10V10V10V10V10V10V10V10'%20fill='%2310B981'/%3e%3c/svg%3e" />
              <span className="text-ink text-p2">2-day early direct deposit</span>
            </div>
            <div className="flex items-center gap-3">
              <img alt="Feature check" className="h-5 w-auto" src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.6%2014.6L15.65%207.55L14.25%206.15L8.6%2011.8L5.75%208.95L4.35%2010.35L8.6%2014.6V14.6M10%2020C8.61667%2020%207.31667%2019.7375%206.1%2019.2125C4.88333%2018.6875%203.825%2017.975%202.925%2017.075C2.025%2016.175%201.3125%2015.1167%200.7875%2013.9C0.2625%2012.6833%200%2011.3833%200%2010C0%208.61667%200.2625%207.31667%200.7875%206.1C1.3125%204.88333%202.025%203.825%202.925%202.925C3.825%202.025%204.88333%201.3125%206.1%200.7875C7.31667%200.2625%208.61667%200%2010%200C11.3833%200%2012.6833%200.2625%2013.9%200.7875C15.1167%201.3125%2016.175%202.025%2017.075%202.925C17.975%203.825%2018.6875%204.88333%2019.2125%206.1C19.7375%207.31667%2020%208.61667%2020%2010C20%2011.3833%2019.7375%2012.6833%2019.2125%2013.9C18.6875%2015.1167%2017.975%2016.175%2017.075%2017.075C16.175%2017.975%2015.1167%2018.6875%2013.9%2019.2125C12.6833%2019.7375%2011.3833%2020%2010%2020V20M10%2018C12.2333%2018%2014.125%2017.225%2015.675%2015.675C17.225%2014.125%2018%2012.2333%2018%2010C18%207.76667%2017.225%205.875%2015.675%204.325C14.125%202.775%2012.2333%202%2010%202C7.76667%202%205.875%202.775%204.325%204.325C2.775%205.875%202%207.76667%202%2010C2%2012.2333%202.775%2014.125%204.325%2015.675C5.875%2017.225%207.76667%2018%2010%2018V18M10%2010V10V10V10V10V10V10V10V10V10'%20fill='%2310B981'/%3e%3c/svg%3e" />
              <span className="text-ink text-p2">Fee-free ATM access nationwide</span>
            </div>
          </div>
          <button type="button" className="btn btn-primary rounded-lg px-8 py-4 w-max">
            <span className="text-snow text-b1">Learn More</span>
          </button>
        </div>
      </div>
    ),
    savings: (
      <div className="grid gap-10 desktop:grid-cols-2 rounded-xl border border-border bg-snow p-6 shadow-sm tablet:p-10">
        <img alt="Savings account features" className="rounded-lg h-[400px] w-full object-cover" src={savingsImage} />
        <div className="flex flex-col gap-6">
          <div className="inline-flex rounded-xl bg-cloud px-3 py-1">
            <span className="text-primary text-b3 uppercase">FEATURED</span>
          </div>
          <h3 className="text-ink text-h1">Brighter Savings</h3>
          <p className="text-slate text-p2">Grow your money securely with competitive interest rates and no hidden fees.</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img alt="Feature check" className="h-5 w-auto" src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.6%2014.6L15.65%207.55L14.25%206.15L8.6%2011.8L5.75%208.95L4.35%2010.35L8.6%2014.6ZM10%2020C8.61667%2020%207.31667%2019.7375%206.1%2019.2125C4.88333%2018.6875%203.825%2017.975%202.925%2017.075C2.025%2016.175%201.3125%2015.1167%200.7875%2013.9C0.2625%2012.6833%200%2011.3833%200%2010C0%208.61667%200.2625%207.31667%200.7875%206.1C1.3125%204.88333%202.025%203.825%202.925%202.925C3.825%202.025%204.88333%201.3125%206.1%200.7875C7.31667%200.2625%208.61667%200%2010%200C11.3833%200%2012.6833%200.2625%2013.9%200.7875C15.1167%201.3125%2016.175%202.025%2017.075%202.925C17.975%203.825%2018.6875%204.88333%2019.2125%206.1C19.7375%207.31667%2020%208.61667%2020%2010C20%2011.3833%2019.7375%2012.6833%2019.2125%2013.9C18.6875%2015.1167%2017.975%2016.175%2017.075%2017.075C16.175%2017.975%2015.1167%2018.6875%2013.9%2019.2125C12.6833%2019.7375%2011.3833%2020%2010%2020ZM10%2018C12.2333%2018%2014.125%2017.225%2015.675%2015.675C17.225%2014.125%2018%2012.2333%2018%2010C18%207.76667%2017.225%205.875%2015.675%204.325C14.125%202.775%2012.2333%202%2010%202C7.76667%202%205.875%202.775%204.325%204.325C2.775%205.875%202%207.76667%202%2010C2%2012.2333%202.775%2014.125%204.325%2015.675C5.875%2017.225%207.76667%2018%2010%2018Z'%20fill='%2310B981'/%3e%3c/svg%3e" />
              <span className="text-ink text-p2">High-yield interest rates</span>
            </div>
            <div className="flex items-center gap-3">
              <img alt="Feature check" className="h-5 w-auto" src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.6%2014.6L15.65%207.55L14.25%206.15L8.6%2011.8L5.75%208.95L4.35%2010.35L8.6%2014.6V14.6M10%2020C8.61667%2020%207.31667%2019.7375%206.1%2019.2125C4.88333%2018.6875%203.825%2017.975%202.925%2017.075C2.025%2016.175%201.3125%2015.1167%200.7875%2013.9C0.2625%2012.6833%200%2011.3833%200%2010C0%208.61667%200.2625%207.31667%200.7875%206.1C1.3125%204.88333%202.025%203.825%202.925%202.925C3.825%202.025%204.88333%201.3125%206.1%200.7875C7.31667%200.2625%208.61667%200%2010%200C11.3833%200%2012.6833%200.2625%2013.9%200.7875C15.1167%201.3125%2016.175%202.025%2017.075%202.925C17.975%203.825%2018.6875%204.88333%2019.2125%206.1C19.7375%207.31667%2020%208.61667%2020%2010C20%2011.3833%2019.7375%2012.6833%2019.2125%2013.9C18.6875%2015.1167%2017.975%2016.175%2017.075%2017.075C16.175%2017.975%2015.1167%2018.6875%2013.9%2019.2125C12.6833%2019.7375%2011.3833%2020%2010%2020V20M10%2018C12.2333%2018%2014.125%2017.225%2015.675%2015.675C17.225%2014.125%2018%2012.2333%2018%2010C18%207.76667%2017.225%205.875%2015.675%204.325C14.125%202.775%2012.2333%202%2010%202C7.76667%202%205.875%202.775%204.325%204.325C2.775%205.875%202%207.76667%202%2010C2%2012.2333%202.775%2014.125%204.325%2015.675C5.875%2017.225%207.76667%2018%2010%2018V18M10%2010V10V10V10V10V10V10V10V10V10'%20fill='%2310B981'/%3e%3c/svg%3e" />
              <span className="text-ink text-p2">No monthly fees</span>
            </div>
            <div className="flex items-center gap-3">
              <img alt="Feature check" className="h-5 w-auto" src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.6%2014.6L15.65%207.55L14.25%206.15L8.6%2011.8L5.75%208.95L4.35%2010.35L8.6%2014.6V14.6M10%2020C8.61667%2020%207.31667%2019.7375%206.1%2019.2125C4.88333%2018.6875%203.825%2017.975%202.925%2017.075C2.025%2016.175%201.3125%2015.1167%200.7875%2013.9C0.2625%2012.6833%200%2011.3833%200%2010C0%208.61667%200.2625%207.31667%200.7875%206.1C1.3125%204.88333%202.025%203.825%202.925%202.925C3.825%202.025%204.88333%201.3125%206.1%200.7875C7.31667%200.2625%208.61667%200%2010%200C11.3833%200%2012.6833%200.2625%2013.9%200.7875C15.1167%201.3125%2016.175%202.025%2017.075%202.925C17.975%203.825%2018.6875%204.88333%2019.2125%206.1C19.7375%207.31667%2020%208.61667%2020%2010C20%2011.3833%2019.7375%2012.6833%2019.2125%2013.9C18.6875%2015.1167%2017.975%2016.175%2017.075%2017.075C16.175%2017.975%2015.1167%2018.6875%2013.9%2019.2125C12.6833%2019.7375%2011.3833%2020%2010%2020V20M10%2018C12.2333%2018%2014.125%2017.225%2015.675%2015.675C17.225%2014.125%2018%2012.2333%2018%2010C18%207.76667%2017.225%205.875%2015.675%204.325C14.125%202.775%2012.2333%202%2010%202C7.76667%202%205.875%202.775%204.325%204.325C2.775%205.875%202%207.76667%202%2010C2%2012.2333%202.775%2014.125%204.325%2015.675C5.875%2017.225%207.76667%2018%2010%2018V18M10%2010V10V10V10V10V10V10V10V10V10'%20fill='%2310B981'/%3e%3c/svg%3e" />
              <span className="text-ink text-p2">Instant transfers</span>
            </div>
          </div>
          <button type="button" className="btn btn-primary rounded-lg px-8 py-4 w-max">
            <span className="text-snow text-b1">Learn More</span>
          </button>
        </div>
      </div>
    ),
    'credit cards': (
      <div className="grid gap-10 desktop:grid-cols-2 rounded-xl border border-border bg-snow p-6 shadow-sm tablet:p-10">
        <img alt="Credit card benefits" className="rounded-lg h-[400px] w-full object-cover" src={creditCardImage} />
        <div className="flex flex-col gap-6">
          <div className="inline-flex rounded-xl bg-cloud px-3 py-1">
            <span className="text-primary text-b3 uppercase">FEATURED</span>
          </div>
          <h3 className="text-ink text-h1">Brighter Credit Cards</h3>
          <p className="text-slate text-p2">Enjoy the freedom of spending with rewards and no annual fees.</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img alt="Feature check" className="h-5 w-auto" src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.6%2014.6L15.65%207.55L14.25%206.15L8.6%2011.8L5.75%208.95L4.35%2010.35L8.6%2014.6ZM10%2020C8.61667%2020%207.31667%2019.7375%206.1%2019.2125C4.88333%2018.6875%203.825%2017.975%202.925%2017.075C2.025%2016.175%201.3125%2015.1167%200.7875%2013.9C0.2625%2012.6833%200%2011.3833%200%2010C0%208.61667%200.2625%207.31667%200.7875%206.1C1.3125%204.88333%202.025%203.825%202.925%202.925C3.825%202.025%204.88333%201.3125%206.1%200.7875C7.31667%200.2625%208.61667%200%2010%200C11.3833%200%2012.6833%200.2625%2013.9%200.7875C15.1167%201.3125%2016.175%202.025%2017.075%202.925C17.975%203.825%2018.6875%204.88333%2019.2125%206.1C19.7375%207.31667%2020%208.61667%2020%2010C20%2011.3833%2019.7375%2012.6833%2019.2125%2013.9C18.6875%2015.1167%2017.975%2016.175%2017.075%2017.075C16.175%2017.975%2015.1167%2018.6875%2013.9%2019.2125C12.6833%2019.7375%2011.3833%2020%2010%2020ZM10%2018C12.2333%2018%2014.125%2017.225%2015.675%2015.675C17.225%2014.125%2018%2012.2333%2018%2010C18%207.76667%2017.225%205.875%2015.675%204.325C14.125%202.775%2012.2333%202%2010%202C7.76667%202%205.875%202.775%204.325%204.325C2.775%205.875%202%207.76667%202%2010C2%2012.2333%202.775%2014.125%204.325%2015.675C5.875%2017.225%207.76667%2018%2010%2018Z'%20fill='%2310B981'/%3e%3c/svg%3e" />
              <span className="text-ink text-p2">No annual fees</span>
            </div>
            <div className="flex items-center gap-3">
              <img alt="Feature check" className="h-5 w-auto" src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.6%2014.6L15.65%207.55L14.25%206.15L8.6%2011.8L5.75%208.95L4.35%2010.35L8.6%2014.6V14.6M10%2020C8.61667%2020%207.31667%2019.7375%206.1%2019.2125C4.88333%2018.6875%203.825%2017.975%202.925%2017.075C2.025%2016.175%201.3125%2015.1167%200.7875%2013.9C0.2625%2012.6833%200%2011.3833%200%2010C0%208.61667%200.2625%207.31667%200.7875%206.1C1.3125%204.88333%202.025%203.825%202.925%202.925C3.825%202.025%204.88333%201.3125%206.1%200.7875C7.31667%200.2625%208.61667%200%2010%200C11.3833%200%2012.6833%200.2625%2013.9%200.7875C15.1167%201.3125%2016.175%202.025%2017.075%202.925C17.975%203.825%2018.6875%204.88333%2019.2125%206.1C19.7375%207.31667%2020%208.61667%2020%2010C20%2011.3833%2019.7375%2012.6833%2019.2125%2013.9C18.6875%2015.1167%2017.975%2016.175%2017.075%2017.075C16.175%2017.975%2015.1167%2018.6875%2013.9%2019.2125C12.6833%2019.7375%2011.3833%2020%2010%2020V20M10%2018C12.2333%2018%2014.125%2017.225%2015.675%2015.675C17.225%2014.125%2018%2012.2333%2018%2010C18%207.76667%2017.225%205.875%2015.675%204.325C14.125%202.775%2012.2333%202%2010%202C7.76667%202%205.875%202.775%204.325%204.325C2.775%205.875%202%207.76667%202%2010C2%2012.2333%202.775%2014.125%204.325%2015.675C5.875%2017.225%207.76667%2018%2010%2018V18M10%2010V10V10V10V10V10V10V10V10V10'%20fill='%2310B981'/%3e%3c/svg%3e" />
              <span className="text-ink text-p2">Rewards on every purchase</span>
            </div>
            <div className="flex items-center gap-3">
              <img alt="Feature check" className="h-5 w-auto" src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.6%2014.6L15.65%207.55L14.25%206.15L8.6%2011.8L5.75%208.95L4.35%2010.35L8.6%2014.6V14.6M10%2020C8.61667%2020%207.31667%2019.7375%206.1%2019.2125C4.88333%2018.6875%203.825%2017.975%202.925%2017.075C2.025%2016.175%201.3125%2015.1167%200.7875%2013.9C0.2625%2012.6833%200%2011.3833%200%2010C0%208.61667%200.2625%207.31667%200.7875%206.1C1.3125%204.88333%202.025%203.825%202.925%202.925C3.825%202.025%204.88333%201.3125%206.1%200.7875C7.31667%200.2625%208.61667%200%2010%200C11.3833%200%2012.6833%200.2625%2013.9%200.7875C15.1167%201.3125%2016.175%202.025%2017.075%202.925C17.975%203.825%2018.6875%204.88333%2019.2125%206.1C19.7375%207.31667%2020%208.61667%2020%2010C20%2011.3833%2019.7375%2012.6833%2019.2125%2013.9C18.6875%2015.1167%2017.975%2016.175%2017.075%2017.075C16.175%2017.975%2015.1167%2018.6875%2013.9%2019.2125C12.6833%2019.7375%2011.3833%2020%2010%2020V20M10%2018C12.2333%2018%2014.125%2017.225%2015.675%2015.675C17.225%2014.125%2018%2012.2333%2018%2010C18%207.76667%2017.225%205.875%2015.675%204.325C14.125%202.775%2012.2333%202%2010%202C7.76667%202%205.875%202.775%204.325%204.325C2.775%205.875%202%207.76667%202%2010C2%2012.2333%202.775%2014.125%204.325%2015.675C5.875%2017.225%207.76667%2018%2010%2018V18M10%2010V10V10V10V10V10V10V10V10V10'%20fill='%2310B981'/%3e%3c/svg%3e" />
              <span className="text-ink text-p2">Instant transfers</span>
            </div>
          </div>
          <button type="button" className="btn btn-primary rounded-lg px-8 py-4 w-max">
            <span className="text-snow text-b1">Learn More</span>
          </button>
        </div>
      </div>
    ),
  };

  return (
    <div className="flex flex-col items-center justify-start bg-cloud">
      {/* Hero */}
      <section className="w-full overflow-hidden mb-section">
        <Suspense fallback={<div className="w-full h-[600px] tablet:h-[750px] desktop:h-[900px] bg-gradient-to-b from-[#0a1628] to-[#1a3a5c]" />}>
          <HeroScene />
        </Suspense>

        <div className="bg-primary border-b border-border py-6 px-10 tablet:px-28 desktop:px-48">
          <div className="flex flex-col items-center justify-between gap-2 rounded-3xl border border-white bg-primary/95 px-4 py-4 text-center tablet:flex-row tablet:text-left tablet:px-8 tablet:gap-6 max-w-[1230px] overflow-hidden">
            <div className="text-white text-b3 uppercase tracking-[1.6px] shrink-0 whitespace-nowrap">
              TRUSTED BY
            </div>
            <div className="flex-1 min-w-0 max-w-[600px] overflow-hidden">
              <div className="trusted-by-marquee" aria-label="Trusted by">
                <div className="trusted-by-marquee__track" aria-hidden="true">
                  {[
                    'FORBES',
                    'BLOOMBERG',
                    'TECHCRUNCH',
                    'WALL STREET JOURNAL',
                    'BOGGER MESSENGER',
                    'FORBES',
                    'BLOOMBERG',
                    'TECHCRUNCH',
                    'WALL STREET JOURNAL',
                    'BOGGER MESSENGER',
                  ].map((name, idx) => (
                    <span
                      // eslint-disable-next-line react/no-array-index-key
                      key={`${name}-${idx}`}
                      className="trusted-by-marquee__item"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-transparent bg-primary px-4 py-2 shrink-0 whitespace-nowrap">
              <img src={container16Hr0} alt="Member FDIC" className="h-5 w-auto" />
              <span className="text-white text-b2">Member FDIC</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Brighter Bank */}
      <section className="w-full bg-snow px-6 tablet:px-10 desktop:px-24 mb-section">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-16">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-primary text-b3 uppercase tracking-[1.4px]">STABILITY & INNOVATION</p>
            <h2 className="text-ink text-h2">Why Brighter Bank</h2>
          </div>

          <div className="grid gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
            <article className="rounded-xl border border-border bg-snow p-6 shadow-sm tablet:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#6ffbbe]">
                <img src={container0} alt="Growth icon" className="h-auto w-6" />
              </div>
              <h3 className="pt-3 text-ink text-h3">Accelerated Growth</h3>
              <p className="pt-2 text-slate text-p2">
                High-yield savings accounts with rates 10x the national average. Watch your wealth
                flourish with daily compounding interest.
              </p>
            </article>

            <article className="rounded-xl border border-border bg-snow p-6 shadow-sm tablet:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#dbe1ff]">
                <img src={containerK20} alt="Security icon" className="h-auto w-6" />
              </div>
              <h3 className="pt-3 text-ink text-h3">Fortified Security</h3>
              <p className="pt-2 text-slate text-p2">
                Military-grade encryption and biometric authentication keep your assets protected
                24/7. Peace of mind is our standard.
              </p>
            </article>

            <article className="rounded-xl border border-border bg-snow p-6 shadow-sm tablet:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#ffddb8]">
                <img src={container1} alt="Analytics icon" className="h-auto w-6" />
              </div>
              <h3 className="pt-3 text-ink text-h3">Smart Analytics</h3>
              <p className="pt-2 text-slate text-p2">
                AI-driven insights that help you track spending, set budgets, and achieve your
                financial milestones faster than ever.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="w-full bg-cloud px-6 tablet:px-10 desktop:px-24 mb-section">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-16">
          <div className="flex flex-col gap-8 desktop:flex-row desktop:items-end desktop:justify-between">
            <div className="max-w-xl">
              <h2 className="text-ink text-h2">Products designed for your success</h2>
              <p className="pt-4 text-slate text-p2">
                Choose from our selection of premium financial tools tailored to empower your
                financial journey.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-snow p-2">
              <button 
                type="button" 
                className={`rounded-lg px-6 py-2 text-b2 ${activeTab === 'Checking' ? 'bg-primary text-white' : 'text-slate'} cursor-pointer`} 
                onClick={() => setActiveTab('Checking')}
              >
                Checking
              </button>
              <button 
                type="button" 
                className={`rounded-lg px-6 py-2 text-b2 ${activeTab === 'Savings' ? 'bg-primary text-white' : 'text-slate'} cursor-pointer`} 
                onClick={() => setActiveTab('Savings')}
              >
                Savings
              </button>
              <button 
                type="button" 
                className={`rounded-lg px-6 py-2 text-b2 ${activeTab === 'Credit Cards' ? 'bg-primary text-white' : 'text-slate'} cursor-pointer`} 
                onClick={() => setActiveTab('Credit Cards')}
              >
                Credit Cards
              </button>
            </div>
          </div>

          {tabContents[activeTabKey]}
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full bg-snow px-6 tablet:px-10 desktop:px-24 overflow-hidden mb-section">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-16">
          <div className="text-center">
            <h2 className="text-ink text-h2">Stories of Brighter Futures</h2>
          </div>

          <div className="grid gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
            <article className="relative overflow-hidden rounded-lg border border-border bg-cloud p-6 shadow-sm tablet:p-8">
              <div className="flex items-start gap-1 mb-4">
                <img src={containerR8Yd0} alt="Stars" className="h-5 w-auto" />
                <img src={containerR8Yj0} alt="Stars" className="h-5 w-auto" />
                <img src={containerR8Yl0} alt="Stars" className="h-5 w-auto" />
                <img src={containerR8Ym0} alt="Stars" className="h-5 w-auto" />
                <img src={containerR8Yx0} alt="Stars" className="h-5 w-auto" />
              </div>
              <p className="text-ink text-p2 italic">
                &quot;Switching to Brighter Bank was the best financial decision I've made. Their
                mortgage process was seamless, and the app is years ahead of the competition.&quot;
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-xl">
                  <img src={quoteImage1} alt="David Chen" className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="text-ink text-p2">David Chen</div>
                  <div className="text-slate text-p3">Tech Entrepreneur</div>
                </div>
              </div>
              <img
                src={containerR86R0}
                alt="Quote decoration"
                className="pointer-events-none absolute right-6 top-6 opacity-30"
              />
            </article>

            <article className="relative overflow-hidden rounded-lg border border-border bg-cloud p-6 shadow-sm tablet:p-8">
              <div className="flex items-start gap-1 mb-4">
                <img src={containerR9Yd0} alt="Stars" className="h-5 w-auto" />
                <img src={containerR9Ya0} alt="Stars" className="h-5 w-auto" />
                <img src={containerR9Yg0} alt="Stars" className="h-5 w-auto" />
                <img src={containerR9Yj0} alt="Stars" className="h-5 w-auto" />
                <img src={containerR9Yg1} alt="Stars" className="h-5 w-auto" />
              </div>
              <p className="text-ink text-p2 italic">
                &quot;The savings tools actually helped me buy my first home a year earlier than planned.
                Their AI insights are like having a personal financial advisor in my pocket.&quot;
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-xl">
                  <img src={quoteImage2} alt="Sarah Jenkins" className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="text-ink text-p2">Sarah Jenkins</div>
                  <div className="text-slate text-p3">First-time Homeowner</div>
                </div>
              </div>
              <img
                src={containerR56T0}
                alt="Quote decoration"
                className="pointer-events-none absolute right-6 top-6 opacity-30"
              />
            </article>

            <article className="relative overflow-hidden rounded-lg border border-border bg-cloud p-6 shadow-sm tablet:p-8">
              <div className="flex items-start gap-1 mb-4">
                <img src={containerF9Yt0} alt="Stars" className="h-5 w-auto" />
                <img src={containerH9Yt0} alt="Stars" className="h-5 w-auto" />
                <img src={containerD9Yt0} alt="Stars" className="h-5 w-auto" />
                <img src={containerA9Yt0} alt="Stars" className="h-5 w-auto" />
                <img src={containerP9Yt0} alt="Stars" className="h-5 w-auto" />
              </div>
              <p className="text-ink text-p2 italic">
                &quot;As a small business owner, Brighter Bank's business suite has saved me hours
                of administrative work every week. Their customer support is world-class.&quot;
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-xl">
                  <img src={quoteImage3} alt="James Miller" className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="text-ink text-p2">James Miller</div>
                  <div className="text-slate text-p3">Retail Founder</div>
                </div>
              </div>
              <img
                src={containerR33E0}
                alt="Quote decoration"
                className="pointer-events-none absolute right-6 top-6 opacity-30"
              />
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      {!isAuthenticated ? (
        <section className="w-full px-6 tablet:px-10 desktop:px-24 mb-section">
          <div
            className="mx-auto relative overflow-hidden rounded-xl p-8 w-full max-w-[1200px] tablet:p-16"
            style={{ background: 'linear-gradient(135deg, rgba(18, 28, 42, 1) 0%, rgba(0, 74, 198, 1) 100%)' }}
          >
            <img
              src={image4T50}
              alt="Subtle background"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10"
            />
            <div className="relative flex flex-col gap-6 items-center text-center mx-auto">
              <h2 className="text-white text-h2">Ready to start your journey?</h2>
              <p className="max-w-2xl text-[#dbe1ff] text-p2">
                Join over 2 million customers who have discovered a brighter way to bank. Set up your
                account in less than 5 minutes.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <NavLink to="/open-an-account" className="btn btn-primary rounded-lg px-10 py-4 text-snow text-b1">
                  Get Started Now
                </NavLink>
                <button type="button" className="btn btn-secondary rounded-lg px-10 py-4 text-b1">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}
      <CookieBanner />
    </div>
  );
}
