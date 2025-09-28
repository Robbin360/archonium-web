export default function Card({ title, description, icon, className = '' }) {
  return (
    <div className={`feature-card ${className}`}>
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
}