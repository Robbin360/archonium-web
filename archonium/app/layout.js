import './globals.css';

export const metadata = {
  title: 'ARCHONIUM — Architects of Economic Inevitability',
  description: 'Strategic infrastructure transformation',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="dark light" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <header className="top-nav" role="navigation" aria-label="Primary">
          <div className="nav-inner">
            <a className="brand" href="#hero">ARCHONIUM</a>
            <nav className="nav-links" aria-label="Sections">
              <a href="#ecosystem">Ecosystem</a>
              <a href="#methodology">Methodology</a>
              <a href="#research">Research</a>
              <a href="#partnership">Partnership</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="footer-inner">
            <div className="holdings">
              <div className="brand-foot">ARCHONIUM Holdings</div>
              <ul className="entities">
                <li><strong>AEGIS</strong> <span className="muted">(Financial Infrastructure Analysis)</span></li>
                <li><strong>NOUMENON</strong> <span className="muted">(Universal Logic Layer Solutions)</span></li>
              </ul>
            </div>
            <div className="contact">
              <a href="mailto:partnership@archonium.com">partnership@archonium.com</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}