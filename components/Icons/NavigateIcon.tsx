import React from 'react';

export default function NavigateIcon({
  width = 21,
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
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_12014_29742)">
        <path
          d="M13.3836 20H12.876C12.4867 19.8821 12.1262 19.7126 11.8669 19.3881L8.13997 12.1613L0.91207 8.43497C0.596407 8.16735 0.417444 7.81522 0.300049 7.42605V6.91846C0.450315 6.51468 0.636582 6.20064 1.01486 5.97371C6.94619 3.90422 12.9245 1.91559 18.9106 0.00730345C19.8044 -0.075643 20.3767 0.545151 20.2917 1.4273C18.3706 7.39684 16.3994 13.3669 14.3285 19.2853C14.1016 19.6635 13.7875 19.8498 13.3836 20ZM17.8749 1.5692L1.88097 6.87881C1.60235 6.99463 1.32582 7.09061 1.57105 7.42501L8.4739 10.975L17.8749 1.5692ZM18.7337 2.42788L9.32697 11.8274L12.8775 18.7292C13.0487 18.8361 13.1468 18.8883 13.2876 18.713L18.7337 2.42788Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_12014_29742">
          <rect width="20" height="20" fill="white" transform="translate(0.300049)" />
        </clipPath>
      </defs>
    </svg>
  );
}
