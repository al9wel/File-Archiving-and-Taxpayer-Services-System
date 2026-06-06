import noiseImage from "@/assets/images/noise.png";

export default function NoiseOverlay({
    opacity = 0.15,
    className = "",
}: {
    opacity?: number;
    className?: string;
}) {
    return (
        <div
            className={`pointer-events-none fixed inset-0 z-[120] ${className}`}
            style={{
                opacity,
                backgroundImage: `url(${noiseImage})`,
                backgroundRepeat: "repeat",
                backgroundSize: "200px 200px",
                mixBlendMode: "multiply",
                animation: "noise-drift 8s ease-in-out infinite",
            }}
        />
    );
}