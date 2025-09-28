export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  icon = null,
  fullWidth = false
}) {
  const baseClasses = 'button';
  const variantClasses = {
    primary: 'button-primary',
    secondary: 'button-secondary',
    outline: 'button-outline',
    text: 'button-text'
  };
  
  const sizeClasses = {
    small: 'button-sm',
    medium: 'button-md',
    large: 'button-lg'
  };
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'button-full' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} onClick={onClick}>
      {icon && <span className="button-icon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}