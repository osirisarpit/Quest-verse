export function SwordsIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M5 3l14 14" />
            <path d="M19 3l-14 14" />
            <path d="M3 5V3h2" />
            <path d="M21 19v2h-2" />
            <path d="M3 19v2h2" />
            <path d="M21 5V3h-2" />
        </svg>
    );
}
