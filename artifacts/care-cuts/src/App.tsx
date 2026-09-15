import { type FormEvent, type ReactNode, useState } from 'react';
import { ArrowDownRight, Menu, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  { href: '#what-we-do', label: 'What we do' },
  { href: '#why-it-matters', label: 'Why it matters' },
  { href: '#request', label: 'Request a visit' },
  { href: '#volunteer', label: 'Volunteer' },
  { href: '#partner', label: 'Partner with us' },
];

function Brand() {
  return (
    <a className="brand" href="#top" data-testid="link-brand">
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-mark-pole" />
      </span>
      <span>Care Cuts</span>
    </a>
  );
}

function BarberPole({ className = '' }: { className?: string }) {
  return (
    <div className={`barber-pole ${className}`} aria-hidden="true">
      <div className="barber-pole-top">
        <span className="barber-pole-cap" />
        <span className="barber-pole-globe" />
      </div>
      <div className="barber-pole-body">
        <span className="barber-pole-stripes" />
      </div>
      <div className="barber-pole-base" />
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [volunteerSent, setVolunteerSent] = useState(false);
  const [visitRequestSent, setVisitRequestSent] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleVolunteerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '');
    const email = String(formData.get('email') ?? '');
    const location = String(formData.get('location') ?? '');
    const note = String(formData.get('note') ?? '');
    const subject = encodeURIComponent(`Volunteer interest from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCity or region: ${location}\n\nA little about me:\n${note}`,
    );

    setVolunteerSent(true);
    window.location.href = `mailto:hello@carecutsco.org?subject=${subject}&body=${body}`;
  };

  const handleVisitRequestSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const requester = String(formData.get('requester') ?? '');
    const email = String(formData.get('requesterEmail') ?? '');
    const person = String(formData.get('person') ?? '');
    const location = String(formData.get('visitLocation') ?? '');
    const care = String(formData.get('care') ?? '');
    const note = String(formData.get('requestNote') ?? '');
    const subject = encodeURIComponent(`Visit request for ${person}`);
    const body = encodeURIComponent(
      `Requested by: ${requester}\nReply email: ${email}\nPerson we'd be visiting: ${person}\nWhere the visit would happen: ${location}\nCare that would feel good: ${care}\n\nAnything else to know:\n${note}`,
    );

    setVisitRequestSent(true);
    window.location.href = `mailto:hello@carecutsco.org?subject=${subject}&body=${body}`;
  };

  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <div className="section-shell">
          <div className="header-inner">
            <Brand />
            <nav className="desktop-nav" aria-label="Main navigation">
              {navItems.map((item) => (
                <a href={item.href} key={item.href} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
                  {item.label}
                </a>
              ))}
              <a className="header-action" href="#contact" data-testid="link-nav-say-hello">
                Say hello <ArrowDownRight size={15} strokeWidth={2.2} />
              </a>
            </nav>
            <button
              className="mobile-menu-button"
              type="button"
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              data-testid="button-mobile-menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          <nav className={`mobile-nav${menuOpen ? ' is-open' : ''}`} aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a href={item.href} key={item.href} onClick={closeMenu} data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={closeMenu} data-testid="link-mobile-say-hello">
              Say hello
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <BarberPole className="hero-barber-pole" />
          <div className="section-shell hero-grid">
            <div className="reveal">
              <div className="eyebrow">A little care, brought closer</div>
              <h1 id="hero-title" className="text-balance">
                A shave and a haircut, <em>where it is hard to get one.</em>
              </h1>
              <p className="hero-copy">
                We sit down with people who cannot easily get to a barber chair, and take our time. Care Cuts brings free haircuts, shaves, and basic hygiene care to people across Colorado.
              </p>
              <div className="hero-actions">
                <a className="button-primary" href="#request" data-testid="button-request-visit">
                  Request a visit <ArrowDownRight size={17} />
                </a>
                <a className="button-secondary" href="#volunteer" data-testid="button-volunteer-with-us">
                  Volunteer with us
                </a>
              </div>
              <div className="hero-note">
                <span className="hero-note-mark" aria-hidden="true" />
                <span>Independent, volunteer-run, and always centered on the person in the chair.</span>
              </div>
            </div>
            <div className="ritual-card reveal reveal-delay-1" aria-label="A note about the Care Cuts approach">
              <div className="card-topline">
                <span>Care Cuts / Colorado</span>
                <span>Since 2025</span>
              </div>
              <h2>There is no rush in this chair.</h2>
              <p>Sometimes the best part is having someone sit beside you, ask how you are, and listen for the answer.</p>
              <span className="card-signature">with care,</span>
            </div>
          </div>
        </section>

        <section className="section section-blush" id="what-we-do" aria-labelledby="what-we-do-title">
          <div className="section-shell">
            <div className="section-heading with-kicker">
              <span className="section-kicker">What we do</span>
              <div>
                <h2 id="what-we-do-title">A little room to feel like yourself again.</h2>
                <p>
                  Long hospital stays, hard stretches at home, or a season when someone cannot get to their regular barber can make ordinary grooming feel far away. We visit hospital rooms, shelters, high schools, private homes, and other places where people could use a little time and care.
                </p>
              </div>
            </div>
            <div className="offering-grid">
              {[
                ['01', 'Shaves and beard care', 'A close shave, a tidy-up, or a beard shaped with patience.'],
                ['02', 'Trimming and styling', 'Trimming, shape-ups, and styling that meet someone exactly where they are.'],
                ['03', 'Washing and detangling', 'Gentle washing, brushing, and detangling without the hurry.'],
                ['04', 'Take-home kit', 'Simple essentials to make the next day a little easier.'],
              ].map(([number, title, description]) => (
                <article className="offering" key={number} data-testid={`card-offering-${number}`}>
                  <div className="offering-number">{number}</div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="why-it-matters" aria-labelledby="why-title">
          <div className="section-shell matters-grid">
            <div className="matters-copy">
              <div className="section-kicker">Why it matters</div>
              <h2 id="why-title">Feeling cared for is not a small thing.</h2>
              <p>Grooming is one of the few things a person can still choose when so much else is out of their hands. The way their hair falls. The comfort of a clean face. How they meet the day.</p>
              <p>A haircut does not fix a hard stretch. But it can offer a moment of privacy, dignity, and being seen as a whole person.</p>
              <div className="founder-note">
                <div className="founder-note-label">How Care Cuts began</div>
                <p>Care Cuts was started by medical students. During COVID, we learned to cut hair on friends and family. Later, we saw how inpatients face that same isolation in hospital rooms, with fewer chances to feel like themselves.</p>
                <p>Studies have linked personal hygiene with social wellbeing and better hospital outcomes. We believe a little care, offered at the right pace, can make a hard day feel more human.</p>
              </div>
            </div>
            <aside className="quote-box" data-testid="quote-placeholder">
              <blockquote>“Placeholder quote: I felt like myself again.”</blockquote>
              <cite>— A care partner (replace with a real quote)</cite>
            </aside>
          </div>
        </section>

        <section className="section section-blush" id="request" aria-labelledby="request-title">
          <div className="section-shell request-layout">
            <div className="invite-copy">
              <div className="section-kicker">Request a visit</div>
              <h2 id="request-title">Just ask. We will start there.</h2>
              <p>Anyone can ask for a visit. The person does not need to be a patient, confined to a hospital, or unable to leave home. Reach out if they are not mobile right now, have time before they can see their regular barber, or would feel more like themselves with a little grooming and company.</p>
              <div className="audience-list">
                <div className="audience-item">
                  <span className="audience-dot" aria-hidden="true" />
                  <div>
                    <h3>Who we visit</h3>
                    <p>People in hospital rooms, shelters, high schools, private homes, and supportive living spaces across Colorado — including people who are not mobile or are waiting until they can see their regular barber.</p>
                  </div>
                </div>
                <div className="audience-item">
                  <span className="audience-dot" aria-hidden="true" />
                  <div>
                    <h3>What to tell us</h3>
                    <p>A first name, where the visit would happen, and what kind of care would feel good.</p>
                  </div>
                </div>
              </div>
              <a className="button-primary" href="#request-form" style={{ marginTop: '32px' }} data-testid="button-start-request">
                Start a request <ArrowDownRight size={17} />
              </a>
            </div>
            <div className="process" aria-label="How to request a visit">
              {[
                ['1', 'Reach out', 'Send a note or ask a nurse, shelter staff member, school staff member, or loved one to contact us.'],
                ['2', 'We listen', 'We will ask a few gentle questions and find a time that works.'],
                ['3', 'We come to you', 'A trained volunteer arrives with what we need and plenty of time.'],
                ['4', 'Take your time', 'We care for hair, beards, and basic hygiene — at the person’s pace.'],
              ].map(([number, title, description]) => (
                <div className="process-step" key={number} data-testid={`process-step-${number}`}>
                  <span className="process-number">{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="section-shell request-form-shell">
            <div className="request-form-card" id="request-form">
              <div className="request-form-intro">
                <div className="section-kicker">Visit request</div>
                <h3>Tell us what would help.</h3>
                <p>Share a few details and we will follow up with a person, not an automated reply. Please leave out private medical details.</p>
              </div>
              <form className="request-form" onSubmit={handleVisitRequestSubmit}>
                <div className="form-field">
                  <label htmlFor="requester-name">Your name</label>
                  <input id="requester-name" name="requester" type="text" autoComplete="name" required />
                </div>
                <div className="form-field">
                  <label htmlFor="requester-email">Your email address</label>
                  <input id="requester-email" name="requesterEmail" type="email" autoComplete="email" required />
                </div>
                <div className="form-field">
                  <label htmlFor="visit-person">Person we would visit</label>
                  <input id="visit-person" name="person" type="text" required />
                </div>
                <div className="form-field">
                  <label htmlFor="visit-location">Where would the visit happen?</label>
                  <input id="visit-location" name="visitLocation" type="text" placeholder="Home, shelter, school, hospital room..." required />
                </div>
                <div className="form-field form-field-full">
                  <label htmlFor="visit-care">What kind of care would feel good?</label>
                  <input id="visit-care" name="care" type="text" placeholder="A trim, shave, washing, detangling..." required />
                </div>
                <div className="form-field form-field-full">
                  <label htmlFor="request-note">Anything else we should know?</label>
                  <textarea id="request-note" name="requestNote" placeholder="A little context about the visit..." required />
                </div>
                <button className="button-primary request-submit" type="submit">
                  Send visit request <ArrowDownRight size={17} />
                </button>
                <p className="form-note">This opens your email app with your answers filled in for hello@carecutsco.org.</p>
                {visitRequestSent && (
                  <p className="form-success" role="status">
                    Your email draft is ready. If it did not open, write to <a href="mailto:hello@carecutsco.org">hello@carecutsco.org</a>.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        <section className="volunteer-section" id="volunteer" aria-labelledby="volunteer-title">
          <div className="section-shell volunteer-layout">
            <div className="volunteer-intro">
              <div className="section-kicker">Volunteer</div>
              <h2 id="volunteer-title">Bring your hands. Bring your patience.</h2>
              <p>New volunteers train with barbers from <a className="inline-link" href="https://www.snowleopardbarbershop.com/" target="_blank" rel="noreferrer">Snow Leopard Barbershop</a>, then pair with someone experienced before heading out on their own. You do not have to know everything. You just have to be willing to listen and learn.</p>
              <a className="button-primary volunteer-link" href="#volunteer-form" data-testid="button-volunteer-interest">
                I want to volunteer <ArrowDownRight size={17} />
              </a>
            </div>
            <div className="expect-box">
              <h3>What to expect</h3>
              <p>A gentle introduction to the people, places, and pace of Care Cuts.</p>
              <ul className="expect-list">
                <li>Hands-on training with professional barbers</li>
                <li>Your first visits alongside an experienced volunteer</li>
                <li>Simple, thoughtful care — never a performance</li>
                <li>Time to ask questions and find your comfort level</li>
              </ul>
            </div>
          </div>
          <div className="section-shell volunteer-form-shell">
            <div className="volunteer-form-card" id="volunteer-form">
              <div className="volunteer-form-intro">
                <div className="section-kicker">Volunteer interest</div>
                <h3>Tell us a little about yourself.</h3>
                <p>Share a few details and we will start a conversation. You do not need to have barbering experience to reach out.</p>
              </div>
              <form className="volunteer-form" onSubmit={handleVolunteerSubmit}>
                <div className="form-field">
                  <label htmlFor="volunteer-name">Your name</label>
                  <input id="volunteer-name" name="name" type="text" autoComplete="name" required />
                </div>
                <div className="form-field">
                  <label htmlFor="volunteer-email">Email address</label>
                  <input id="volunteer-email" name="email" type="email" autoComplete="email" required />
                </div>
                <div className="form-field form-field-full">
                  <label htmlFor="volunteer-location">City or region</label>
                  <input id="volunteer-location" name="location" type="text" autoComplete="address-level2" required />
                </div>
                <div className="form-field form-field-full">
                  <label htmlFor="volunteer-note">A little about you</label>
                  <textarea id="volunteer-note" name="note" placeholder="What brings you to Care Cuts?" required />
                </div>
                <button className="button-primary volunteer-submit" type="submit">
                  Send volunteer request <ArrowDownRight size={17} />
                </button>
                <p className="form-note">This opens your email app with your answers filled in for hello@carecutsco.org.</p>
                {volunteerSent && (
                  <p className="form-success" role="status">
                    Your email draft is ready. If it did not open, write to <a href="mailto:hello@carecutsco.org">hello@carecutsco.org</a>.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        <section className="section partner-section" id="partner" aria-labelledby="partner-title">
          <div className="section-shell">
            <div className="partner-banner">
              <div>
                <div className="section-kicker">Partner with us</div>
                <h2 id="partner-title">Good care takes a few good neighbors.</h2>
                <p>Are you a shop, a product company, or someone who would like to donate? We would love to hear what you have in mind. There is plenty of room to help.</p>
              </div>
              <a className="button-secondary" href="#contact" data-testid="button-partner-with-us">
                Let’s talk <ArrowDownRight size={17} />
              </a>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="section-shell contact-copy">
            <span className="section-kicker">Contact</span>
            <h2 id="contact-title">Say hello.</h2>
            <a className="email-link" href="mailto:hello@carecutsco.org" data-testid="link-email">
              hello@carecutsco.org
            </a>
            <p className="contact-note">A real person reads this inbox. We will get back to you as soon as we can.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-inner">
          <div className="footer-brand">
            <span className="brand-mark" aria-hidden="true">
                <span className="brand-mark-pole" />
            </span>
            <span>Care Cuts</span>
          </div>
          <p className="footer-text">Care Cuts is an independent volunteer program, not a clinical service. Hospital visits are coordinated with the bedside nurse.</p>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;