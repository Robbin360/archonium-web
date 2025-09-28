export default function Section({ 
  id, 
  title, 
  subtitle, 
  children, 
  className = '',
  background = 'default'
}) {
  const bgClasses = {
    default: '',
    dark: 'bg-dark',
    light: 'bg-light',
    gradient: 'bg-gradient'
  };
  
  return (
    <section id={id} className={`content-section ${bgClasses[background]} ${className}`}>
      <div className="section-container">
        {(title || subtitle) && (
          <div className="section-header">
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}
        <div className="section-content">
          {children}
        </div>
      </div>
    </section>
  );
}