export default function PowerDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`container-page ${className}`}>
      <div className="power-divider" aria-hidden="true" />
    </div>
  );
}
