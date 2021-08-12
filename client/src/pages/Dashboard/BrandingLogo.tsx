export default function BrandingLogo(): JSX.Element {
  return (
    <div className="branding--logo">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect x="3" y="3" width="8" height="10" rx=".5" />
        <rect x="3" y="15" width="8" height="6" rx=".5" />
        <rect x="13" y="3" width="8" height="6" rx=".5" />
        <rect x="13" y="11" width="8" height="10" rx=".5" />
      </svg>
    </div>
  );
}
