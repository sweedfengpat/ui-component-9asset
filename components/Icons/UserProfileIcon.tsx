import React from 'react';

export default function UserProfileIcon({
  width = 19,
  height = 20,
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_12014_29863)">
        <path
          d="M9.62008 0C14.3348 0.531726 16.2515 6.22939 12.5771 9.31643C9.64517 11.7794 5.01907 10.3767 3.927 6.7966C2.9721 3.66573 5.22297 0.266646 8.58139 0H9.62008ZM13.2897 5.27291C13.2897 3.01138 11.4141 1.17773 9.10074 1.17773C6.78742 1.17773 4.91178 3.01138 4.91178 5.27291C4.91178 7.53444 6.78742 9.36809 9.10074 9.36809C11.4141 9.36809 13.2897 7.53444 13.2897 5.27291Z"
          fill="currentColor"
        />
        <path
          d="M7.3346 11.7293C8.35676 11.663 9.73599 11.662 10.7603 11.7162C14.6236 11.9208 17.8892 15.1498 18.0899 18.9245C18.116 19.4124 18.1416 19.9421 17.5123 20L0.517417 19.9723C0.0562481 19.8095 0.0898751 19.3676 0.10909 18.9621C0.286833 15.2119 3.50274 11.9777 7.33407 11.7298L7.3346 11.7293ZM16.8516 18.827C16.5932 15.5735 13.8374 13.0453 10.5206 12.8882C9.37677 12.834 7.68528 12.8115 6.582 13.0255C3.75894 13.5723 1.56465 16.0254 1.34955 18.827H16.8516Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_12014_29863">
          <rect width="18" height="20" fill="white" transform="translate(0.0999756)" />
        </clipPath>
      </defs>
    </svg>
  );
}
