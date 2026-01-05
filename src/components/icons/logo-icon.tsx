export function LogoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 4h4v4H4z" />
      <path d="M10 4h4v4h-4z" />
      <path d="M16 4h4v4h-4z" />
      <path d="M4 10h4v4H4z" />
      <path d="M10 10h4v4h-4z" />
      <path d="M16 10h4v4h-4z" />
      <path d="M4 16h4v4H4z" />
      <path d="M10 16h4v4h-4z" />
      <path d="m16 16 4 4" />
      <path d="m20 16-4 4" />
    </svg>
  );
}
