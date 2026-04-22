import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

const EFFECTIVE_DATE = "April 22, 2026";
const CONTACT_EMAIL = "hello@christiapicks.com";
const SITE_NAME = "Christia Picks";
const SITE_URL = "https://www.christiapicks.com";

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
            Effective Date: {EFFECTIVE_DATE} &nbsp;·&nbsp; Last Updated: {EFFECTIVE_DATE}
          </p>
        </div>

        <div className="space-y-8" style={{ color: "oklch(0.28 0.015 45)", fontFamily: "'DM Sans', sans-serif" }}>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>1. Agreement to Terms</h2>
            <p className="leading-relaxed text-sm">
              By accessing or using {SITE_NAME} at <a href={SITE_URL} className="underline" style={{ color: "oklch(0.35 0.09 155)" }}>{SITE_URL}</a>, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use this site. These terms apply to all visitors, users, and anyone who accesses or uses our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>2. Age Requirement</h2>
            <p className="leading-relaxed text-sm">
              This website is intended for users who are at least 13 years of age. By using this site, you represent and warrant that you are at least 13 years old. If you are under 18, you represent that you have your parent or guardian's permission to use this site. We do not knowingly collect information from children under 13. If we learn that a child under 13 has provided us with personal information, we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>3. Our Services</h2>
            <p className="leading-relaxed text-sm">
              {SITE_NAME} provides AI-powered home design analysis, curated product recommendations, design education content, and related services. Our AI Room Designer tool analyzes photos you upload to provide personalized design suggestions. <strong>The AI-generated suggestions are for informational and inspirational purposes only</strong> — they do not constitute professional interior design advice. Results may vary based on image quality and other factors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>4. Acceptable Use</h2>
            <p className="leading-relaxed text-sm mb-3">You agree to use this site only for lawful purposes. You may not:</p>
            <ul className="space-y-2 text-sm">
              {[
                "Upload images that contain illegal content, nudity, or content that violates others' rights",
                "Attempt to reverse engineer, scrape, or extract data from the site in bulk",
                "Use automated tools (bots, scrapers) to access the site without permission",
                "Impersonate another person or misrepresent your affiliation with any entity",
                "Attempt to gain unauthorized access to any part of the site or its servers",
                "Use the site in any way that could damage, disable, or impair its operation",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2" style={{ color: "oklch(0.42 0.02 60)" }}>
                  <span style={{ color: "oklch(0.65 0.12 75)" }}>→</span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>5. Intellectual Property</h2>
            <p className="leading-relaxed text-sm">
              All content on this site — including text, graphics, logos, images, design elements, and AI-generated outputs — is the property of {SITE_NAME} or its content suppliers and is protected by United States and international copyright laws. You may not reproduce, distribute, modify, or create derivative works from any content on this site without our express written permission.
            </p>
            <p className="leading-relaxed text-sm mt-3">
              You retain ownership of any photos you upload to our AI Room Designer. By uploading photos, you grant us a limited, temporary license to process them solely for the purpose of providing your design analysis. As stated in our Privacy Policy, uploaded photos are never stored.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>6. Affiliate Disclosure</h2>
            <p className="leading-relaxed text-sm">
              {SITE_NAME} participates in affiliate marketing programs. This means we may earn a commission when you click on certain product links and make a purchase, at no additional cost to you. We are a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. We also participate in the LTK (LikeToKnow.it) affiliate program and other programs. All affiliate relationships are disclosed in accordance with FTC guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>7. Disclaimer of Warranties</h2>
            <p className="leading-relaxed text-sm">
              THIS SITE AND ITS SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, {SITE_NAME.toUpperCase()} DISCLAIMS ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. We do not warrant that the site will be uninterrupted, error-free, or free of viruses or other harmful components. AI-generated design suggestions are provided for informational purposes only and do not constitute professional design advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>8. Limitation of Liability</h2>
            <p className="leading-relaxed text-sm">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, {SITE_NAME.toUpperCase()} AND ITS OWNER SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THIS SITE OR ITS SERVICES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. Our total liability to you for any claim arising from these terms or your use of the site shall not exceed $100.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>9. Third-Party Links</h2>
            <p className="leading-relaxed text-sm">
              This site contains links to third-party websites, including affiliate product links. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them. Visiting any third-party site is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>10. Governing Law</h2>
            <p className="leading-relaxed text-sm">
              These Terms of Service shall be governed by and construed in accordance with the laws of the State of Oklahoma, United States, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Tulsa County, Oklahoma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>11. Changes to These Terms</h2>
            <p className="leading-relaxed text-sm">
              We reserve the right to modify these Terms of Service at any time. We will notify you of significant changes by updating the "Last Updated" date at the top of this page. Your continued use of the site after changes are posted constitutes your acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>12. Contact Us</h2>
            <p className="leading-relaxed text-sm">
              If you have questions about these Terms of Service, please contact us:
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
