import { PlatformKind } from '@/utils';

export function XMark() {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="xmark"
            className="svg-inline--fa fa-xmark text-red-500 mr-2"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            width="14"
        >
            <path
                fill="currentColor"
                d="M377 105c9.4-9.4 9.4-24.6 0-33.9l-22.6-22.6c-9.4-9.4-24.6-9.4-33.9 0L192 177.9 63.4 48.5c-9.4-9.4-24.6-9.4-33.9 0L6.9 71.1c-9.4 9.4-9.4 24.6 0 33.9L135.3 256 6.9 377c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0L192 334.1 320.6 463.5c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L248.7 256 377 105z"
            ></path>
        </svg>
    );
}

export function Check() {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="check"
            className="svg-inline--fa fa-check text-green-500 mr-2"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width="14"
        >
            <path
                fill="currentColor"
                d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
            ></path>
        </svg>
    );
}

interface PlatformProps extends React.SVGProps<SVGSVGElement> {
    platform: PlatformKind;
}

export function PlatformIcon({ platform, ...props }: PlatformProps) {
    switch (platform) {
        case 'x':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    {...props}
                >
                    <g transform="scale(5.12,5.12)">
                        <path d="M11,4c-3.85433,0 -7,3.14567 -7,7v28c0,3.85433 3.14567,7 7,7h28c3.85433,0 7,-3.14567 7,-7v-28c0,-3.85433 -3.14567,-7 -7,-7zM11,6h28c2.77367,0 5,2.22633 5,5v28c0,2.77367 -2.22633,5 -5,5h-28c-2.77367,0 -5,-2.22633 -5,-5v-28c0,-2.77367 2.22633,-5 5,-5zM13.08594,13l9.22266,13.10352l-9.30859,10.89648h2.5l7.9375,-9.29297l6.53906,9.29297h7.9375l-10.125,-14.38672l8.21094,-9.61328h-2.5l-6.83984,8.00977l-5.63672,-8.00977zM16.91406,15h3.06445l14.10742,20h-3.06445z"></path>
                    </g>
                </svg>
            );

        case 'linkedin':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                    fill="currentColor"
                    {...props}
                >
                    <path d="M9,25H4V10h5V25z M6.501,8C5.118,8,4,6.879,4,5.499S5.12,3,6.501,3C7.879,3,9,4.121,9,5.499C9,6.879,7.879,8,6.501,8z M27,25h-4.807v-7.3c0-1.741-0.033-3.98-2.499-3.98c-2.503,0-2.888,1.896-2.888,3.854V25H12V9.989h4.614v2.051h0.065 c0.642-1.18,2.211-2.424,4.551-2.424c4.87,0,5.77,3.109,5.77,7.151C27,16.767,27,25,27,25z"></path>
                </svg>
            );
    }
}
