import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

const EFFECTIVE_DATE = "April 22, 2026";
const CONTACT_EMAIL = "hello@christiapicks.com";
const SITE_NAME = "Christia Picks";
const SITE_URL = "https://www.christiapicks.com";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.97 0.008 80)" }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "oklch(0.88 0.015 75)", background: "oklch(0.985 0.006 80)" }}>
        <div className="container py-4 flex items-center gap-4">
          <Link href="/">
            <button className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
              <ArrowLeft size={16} /> Back to {SITE_NAME}
            </button>
          </Link>
        </div>
      </div>

      <div className="container py-16 max-w-3xl mx-auto">
        {/* Title */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>Legal</p>
          <h1 className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
            Effective Date: {EFFECTIVE_DATE} &nbsp;·&nbsp; Last Updated: {EFFECTIVE_DATE}
          </p>
        </div>

        <div className="prose max-w-none space-y-8" style={{ color: "oklch(0.28 0.015 45)", fontFamily: "'DM Sans', sans-serif" }}>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>1. Who We Are</h2>
            <p className="leading-relaxed text-sm">
              {SITE_NAME} ("{SITE_NAME}", "we", "our", or "us") operates the website at <a href={SITE_URL} className="underline" style={{ color: "oklch(0.35 0.09 155)" }}>{SITE_URL}</a>. We provide AI-powered home design tools, curated product recommendations, and design education content. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our site or use our services.
            </p>
            <p className="leading-relaxed text-sm mt-3">
              For privacy-related questions or requests, contact us at: <a href={`mailto:${CONTACT_EMAIL}`} className="underline" style={{ color: "oklch(0.35 0.09 155)" }}>{CONTACT_EMAIL}</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>2. Information We Collect</h2>
            <p className="leading-relaxed text-sm mb-3">We collect only what is necessary to provide our services:</p>
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "oklch(0.88 0.015 75)" }}>
              <table className="w-full text-sm">
                <thead style={{ background: "oklch(0.94 0.012 80)" }}>
                  <tr>
                    <th className="text-left p-3 font-medium text-xs tracking-wider uppercase" style={{ color: "oklch(0.42 0.02 60)" }}>Data Type</th>
                    <th className="text-left p-3 font-medium text-xs tracking-wider uppercase" style={{ color: "oklch(0.42 0.02 60)" }}>What We Collect</th>
                    <th className="text-left p-3 font-medium text-xs tracking-wider uppercase" style={{ color: "oklch(0.42 0.02 60)" }}>Why</th>
                  </tr>
                </thead>
                <tbody style={{ background: "oklch(0.985 0.006 80)" }}>
                  {[
                    ["Contact Info", "First name, email address", "Email list, design session results"],
                    ["Room Photos", "Images you upload to the AI Designer", "Analyzed in real time — never stored"],
                    ["Usage Data", "Pages visited, time on site, browser type", "Analytics to improve the site"],
                    ["Cookies", "Session cookies, preference cookies", "Site functionality and analytics"],
                  ].map(([type, what, why], i) => (
                    <tr key={i} className="border-t" style={{ borderColor: "oklch(0.92 0.012 80)" }}>
                      <td className="p-3 font-medium text-xs" style={{ color: "oklch(0.28 0.015 45)" }}>{type}</td>
                      <td className="p-3 text-xs" style={{ color: "oklch(0.42 0.02 60)" }}>{what}</td>
                      <td className="p-3 text-xs" style={{ color: "oklch(0.42 0.02 60)" }}>{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="leading-relaxed text-sm mt-3">
              <strong>Important:</strong> Room photos and inspiration images uploaded to our AI Room Designer are processed in real time by our AI system and are <strong>never stored, saved, or retained</strong> on our servers. They are discarded immediately after analysis.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>3. How We Use Your Information</h2>
            <p className="leading-relaxed text-sm">We use your information for the following purposes:</p>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                "To send you design tips, product recommendations, and updates you opted into",
                "To deliver your AI Room Designer results to your inbox",
                "To notify you about new courses, workshops, and content",
                "To analyze site usage and improve our services",
                "To comply with legal obligations",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2" style={{ color: "oklch(0.42 0.02 60)" }}>
                  <span style={{ color: "oklch(0.65 0.12 75)" }}>→</span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>4. We Do Not Sell Your Data</h2>
            <p className="leading-relaxed text-sm">
              <strong>We do not sell, rent, trade, or share your personal information with third parties for their marketing purposes.</strong> This applies to all visitors, including California residents under the CCPA/CPRA. We share data only with service providers who help us operate the site (email platform, analytics) under strict data processing agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>5. Cookies</h2>
            <p className="leading-relaxed text-sm">
              We use cookies to operate the site and understand how visitors use it. <strong>Essential cookies</strong> (required for the site to function) are always active. <strong>Analytics cookies</strong> are only set after you give consent via our cookie banner. You can withdraw consent at any time by clearing your browser cookies or using the cookie settings in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>6. Affiliate Links</h2>
            <p className="leading-relaxed text-sm">
              {SITE_NAME} participates in affiliate programs including Amazon Associates and LTK (LikeToKnow.it). When you click a product link and make a purchase, we may earn a small commission at no additional cost to you. We only recommend products we genuinely believe in.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>7. Your Rights</h2>
            <p className="leading-relaxed text-sm mb-3">Depending on where you live, you may have the following rights regarding your personal data:</p>
            <div className="space-y-2 text-sm">
              {[
                ["Access", "Request a copy of the personal data we hold about you"],
                ["Correction", "Ask us to correct inaccurate or incomplete data"],
                ["Deletion", "Request that we delete your personal data"],
                ["Opt-Out", "Unsubscribe from marketing emails at any time using the link in any email"],
                ["Portability", "Request your data in a machine-readable format (GDPR)"],
                ["Withdraw Consent", "Withdraw consent for data processing at any time (GDPR)"],
              ].map(([right, desc], i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ background: "oklch(0.94 0.012 80)" }}>
                  <span className="font-medium text-xs w-24 flex-shrink-0" style={{ color: "oklch(0.35 0.09 155)" }}>{right}</span>
                  <span style={{ color: "oklch(0.42 0.02 60)" }}>{desc}</span>
                </div>
              ))}
            </div>
            <p className="leading-relaxed text-sm mt-3">
              To exercise any of these rights, email us at <a href={`mailto:${CONTACT_EMAIL}`} className="underline" style={{ color: "oklch(0.35 0.09 155)" }}>{CONTACT_EMAIL}</a>. We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>8. Children's Privacy</h2>
            <p className="leading-relaxed text-sm">
              This website is intended for users 13 years of age and older. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us with personal information, please contact us at {CONTACT_EMAIL} and we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>9. Data Retention</h2>
            <p className="leading-relaxed text-sm">
              We retain your email address and name for as long as you remain subscribed to our list. You can unsubscribe at any time using the link in any email we send. Upon unsubscribing, your data will be removed from active marketing lists within 10 business days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>10. International Visitors</h2>
            <p className="leading-relaxed text-sm">
              {SITE_NAME} is operated from the United States. If you are visiting from the European Union, United Kingdom, Canada, or other regions with data protection laws, please be aware that your information will be transferred to and processed in the United States. By using our site, you consent to this transfer. We comply with GDPR, UK GDPR, and CASL requirements as described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>11. Changes to This Policy</h2>
            <p className="leading-relaxed text-sm">
              We may update this Privacy Policy from time to time. When we do, we will update the "Last Updated" date at the top of this page. If changes are material, we will notify subscribers by email. Continued use of the site after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>12. Contact Us</h2>
            <p className="leading-relaxed text-sm">
              For any privacy-related questions, requests, or concerns, contact us at:
            </p>
            <div className="mt-3 p-4 rounded-2xl text-sm" style={{ background: "oklch(0.94 0.012 80)" }}>
              <p style={{ color: "oklch(0.28 0.015 45)" }}><strong>{SITE_NAME}</strong></p>
              <p style={{ color: "oklch(0.42 0.02 60)" }}>Bixby, Oklahoma, United States</p>
              <p><a href={`mailto:${CONTACT_EMAIL}`} className="underline" style={{ color: "oklch(0.35 0.09 155)" }}>{CONTACT_EMAIL}</a></p>
            </div>
          </section>

        </div>
      </div>

      {/* Footer */}
      <div className="border-t py-8" style={{ borderColor: "oklch(0.88 0.015 75)", background: "oklch(0.985 0.006 80)" }}>
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "oklch(0.62 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy"><span className="text-xs underline cursor-pointer" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>Privacy Policy</span></Link>
            <Link href="/terms"><span className="text-xs underline cursor-pointer" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>Terms of Service</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
