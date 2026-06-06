export default function LandingFooter() {
    return (
        <footer style={{ backgroundColor: "var(--landing-bg)", borderTop: "1px solid var(--landing-line)" }}>
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs tracking-wider" style={{ color: "var(--landing-text-muted)/30" }}>
                    نظام الأرشفة الرقمية وخدمات دافعي الضرائب
                </p>
                <p className="text-xs" style={{ color: "var(--landing-text-muted)/20" }}>
                    &copy; {new Date().getFullYear()} — جميع الحقوق محفوظة
                </p>
            </div>
        </footer>
    );
}