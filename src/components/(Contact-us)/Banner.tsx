interface BannerProps {
    banner: { message: string; state: 'success' | 'error' };
}

export default function Banner({ banner }: BannerProps) {
    const bannerStyle = banner.state === 'success' ? 'text-green-600' : 'text-red-600';
    return <p className={`${bannerStyle} mt-4`}>{banner.message}</p>;
}
