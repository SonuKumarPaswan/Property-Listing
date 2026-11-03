import React from 'react'

const PrivacyPolicyPage = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <div className="min-h-screen bg-white text-[#172554] antialiased selection:bg-[#2043B0] selection:text-white">

        {/* ══════════════════════════════════════════
            1 · HERO SECTION (White & Light Blue)
        ══════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-white to-white px-4 sm:px-6
         lg:px-8 pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 text-center border-b border-[#E5E7EB]">
          {/* Subtle ambient decorative shapes matching About Us */}
          <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[260px] sm:h-[360px] w-[90%] max-w-[650px]
           rounded-full bg-[#2043B0]/5 blur-2xl sm:blur-3xl" />
          <div className="pointer-events-none absolute right-[5%] sm:right-[10%] top-20 h-36 w-36 sm:h-48 sm:w-48
           rounded-full bg-blue-100/50 blur-xl sm:blur-2xl" />

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Legal Document pill badge */}
            <div className="mb-4 sm:mb-5 flex justify-center">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-blue-200 bg-[#F5F7FF] px-3.5 
              sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#2043B0] shadow-xs">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2043B0]" />
                <span>LEGAL DOCUMENT</span>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-[Cinzel] font-bold tracking-tight text-[#172554] leading-tight mb-4 sm:mb-6">
              Privacy <span className="text-[#2043B0]">Policy</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed mb-4">
              Your privacy matters to us. Learn how MishtiSpaces collects, uses, and protects your personal information.
            </p>

            {/* Dates */}
            <p className="text-xs sm:text-sm font-medium text-[#2043B0] bg-blue-50/80 inline-block px-4 py-1.5 rounded-full border border-blue-100">
              Last Updated: April 1, 2026 &nbsp;·&nbsp; Effective Date: January 1, 2024
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            2 · MAIN CONTENT AREA
        ══════════════════════════════════════════ */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

          {/* Intro Card */}
          <div className="rounded-2xl border border-[#E5E7EB] border-l-4 border-l-[#2043B0] bg-white 
          p-6 sm:p-8 mb-6 sm:mb-8 shadow-xs">
            <p className="text-[#4B5563] text-sm sm:text-[15px] leading-relaxed">
              At <strong className="text-[#172554] font-semibold">MishtiSpaces</strong>, we are committed to protecting the privacy and security of our users, buyers, sellers, agents, and all individuals who interact with our platform. This Privacy Policy outlines in detail how we collect, process, store, share, and protect your personal information when you use our website, mobile applications, and related real estate services. By accessing or using MishtiSpaces, you agree to the practices described in this document. We encourage you to read this policy carefully and contact us if you have any questions or concerns.
            </p>
          </div>

          {/* Section 1 */}
          <PolicySection
            number="01"
            title="Information We Collect"
            content={[
              "When you register for an account on MishtiSpaces, we collect personal identification details such as your full name, email address, mobile phone number, and a secure password. If you choose to complete a profile, you may also provide additional information such as your profile photo, preferred locations, property budget, and occupation.",
              "When you list a property, we collect detailed information about the property including its address, size, type, price, amenities, and photographs. As an agent or developer, we may also collect your professional license number, agency affiliation, and business address to verify your identity and credentials.",
              "We automatically collect technical data when you interact with our platform, including your IP address, browser type and version, device type, operating system, pages visited, time spent on each page, and click behaviour. This information is collected through cookies, web beacons, and similar tracking technologies to understand how users engage with MishtiSpaces and improve our services accordingly.",
              "If you contact our support team or fill out our contact form, we collect the content of your messages, your contact details, and any files or documents you attach. Communication records may be stored for quality assurance, legal compliance, and service improvement purposes.",
            ]}
          />

          {/* Section 2 */}
          <PolicySection
            number="02"
            title="How We Use Your Information"
            content={[
              "Your personal information is used primarily to operate and deliver MishtiSpaces services. This includes creating and managing your account, facilitating property searches, connecting buyers with sellers or agents, processing inquiries, and sending you property alerts or recommendations based on your preferences.",
              "We use your contact details to communicate with you about your account activity, property listings, bookings, or messages from other users. We may also send you service-related notifications, security alerts, and transactional emails that are necessary for the functioning of our platform.",
              "With your explicit consent, we may use your information to send you marketing communications about new property listings, promotional offers, real estate insights, and updates about our platform. You can opt out of these communications at any time by clicking the unsubscribe link in any marketing email or updating your notification preferences in your account settings.",
              "We analyse aggregated and anonymised data to understand usage trends, measure performance of our features, conduct market research, and improve the overall quality of our services. This analysis does not identify you personally and helps us develop better tools for the real estate community.",
            ]}
          />

          {/* Section 3 */}
          <PolicySection
            number="03"
            title="Cookies and Tracking Technologies"
            content={[
              "MishtiSpaces uses cookies and similar tracking technologies to enhance your experience on our platform. Cookies are small text files stored on your device that help us remember your preferences, keep you logged in, and deliver relevant content. We use both session cookies, which expire when you close your browser, and persistent cookies, which remain on your device for a set period of time.",
              "We use essential cookies that are strictly necessary for the platform to function, such as authentication tokens and security cookies. We also use performance cookies to measure how users interact with our website, preference cookies to remember your language and display settings, and marketing cookies to serve relevant advertisements across the web.",
              "You can control cookie settings through your browser preferences. Most browsers allow you to block or delete cookies. However, disabling certain cookies may affect the functionality of MishtiSpaces. You can also opt out of interest-based advertising by visiting relevant industry opt-out pages. We honour Do Not Track signals where technically feasible.",
            ]}
          />

          {/* Section 4 */}
          <PolicySection
            number="04"
            title="Sharing of Your Information"
            content={[
              "MishtiSpaces does not sell your personal information to third parties for their own marketing purposes. We share your information only in the limited circumstances described in this policy and always in compliance with applicable law.",
              "We may share your information with registered real estate agents, brokers, or property developers listed on our platform when you submit an inquiry or express interest in a property. In such cases, only the information necessary to facilitate your inquiry, such as your name, contact number, and the property you are interested in, will be shared.",
              "We work with trusted third-party service providers who assist us in operating the platform. These include cloud hosting providers, payment processors, email delivery services, analytics platforms, and customer support tools. All third-party providers are contractually obligated to protect your data and use it only for the specific purpose for which it was shared.",
              "We may disclose your information if required to do so by law or in response to a valid legal request from government authorities, courts, or law enforcement agencies. We may also share information to protect the rights, property, or safety of MishtiSpaces, our users, or the general public.",
            ]}
          />

          {/* Section 5 */}
          <PolicySection
            number="05"
            title="Data Security"
            content={[
              "We take the security of your personal information seriously and implement a range of technical and organisational measures to protect it from unauthorised access, alteration, disclosure, or destruction. Our platform uses industry-standard SSL/TLS encryption for all data transmitted between your browser and our servers.",
              "Access to personal data within our organisation is strictly controlled and limited to employees or contractors who need it to perform their job functions. All staff with access to personal data are bound by confidentiality obligations and undergo regular training on data protection best practices.",
              "Despite our best efforts, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee absolute security. In the event of a data breach that poses a significant risk to your rights and freedoms, we will notify you and the relevant authorities as required by applicable law.",
            ]}
          />

          {/* Section 6 */}
          <PolicySection
            number="06"
            title="Your Rights and Choices"
            content={[
              "You have the right to access the personal information we hold about you at any time. You can do this by logging into your account and visiting your profile settings, or by contacting our privacy team directly. Upon request, we will provide you with a copy of your personal data in a commonly used, machine-readable format.",
              "You have the right to correct or update any inaccurate or incomplete personal information we hold about you. You may also request the deletion of your personal data, subject to certain legal exceptions. For example, we may need to retain certain information for legal, financial, or audit purposes even after account deletion.",
              "You have the right to object to or restrict how we process your personal data in certain circumstances, including for direct marketing purposes. You also have the right to withdraw your consent at any time where we are relying on consent as the legal basis for processing your information.",
              "To exercise any of these rights, please contact us at the details provided at the end of this policy. We will respond to all legitimate requests within 30 days. In some cases, we may need to verify your identity before processing your request.",
            ]}
          />

          {/* Section 7 */}
          <PolicySection
            number="07"
            title="Data Retention"
            content={[
              "We retain your personal information for as long as your account is active or as needed to provide you with our services. If you choose to delete your account, we will begin the process of removing your personal data from our active systems within 30 days, subject to any applicable legal retention requirements.",
              "Certain categories of data may be retained for longer periods in accordance with legal obligations. For example, financial transaction records may be retained for up to 7 years as required by Indian tax and accounting laws. Anonymised or aggregated data that cannot identify you may be retained indefinitely for research and analytics purposes.",
            ]}
          />

          {/* Section 8 */}
          <PolicySection
            number="08"
            title="Children's Privacy"
            content={[
              "MishtiSpaces is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal information from a minor, we will take immediate steps to delete that information from our systems. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.",
            ]}
          />

          {/* Section 9 */}
          <PolicySection
            number="09"
            title="Changes to This Policy"
            content={[
              "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make significant changes, we will notify you by posting the updated policy on our website with a new effective date and, where appropriate, by sending you an email notification.",
              "We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Your continued use of MishtiSpaces after any changes to this policy constitutes your acceptance of the updated terms.",
            ]}
          />

          {/* Contact Card */}
          <div className=" border border-blue-200 bg-gradient-to-br from-[#F5F7FF] via-white to-blue-50/50 p-6 sm:p-10 
          shadow-xs relative overflow-hidden mt-8">
            <div className="pointer-events-none absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-blue-100/40 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-4">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3 py-1 
              text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#2043B0] self-start shadow-2xs">
                <span>Privacy Support</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-[Cinzel] font-bold text-[#172554] leading-tight">
                Contact Our Privacy Team
              </h2>

              <p className="text-sm text-[#4B5563] leading-relaxed max-w-2xl">
                If you have any questions, concerns, or requests related to this Privacy Policy or how we handle your data, please reach out to us through any of the following channels:
              </p>

              <div className="flex flex-col gap-3 mt-2">
                <ContactItem icon="📍" label="Address" value="C-127 Block-C Sector-63, Noida, Uttar Pradesh 201301" />
                <ContactItem icon="📞" label="Phone" value="+91 9876543210 (Mon–Sat, 9 AM – 7 PM)" />
                <ContactItem icon="✉️" label="Email" value="support@mishtispaces.com" />
              </div>

              <p className="text-xs text-[#4B5563] mt-2">
                We aim to respond to all privacy-related requests within 30 business days.
              </p>
            </div>
          </div>

        </main>
      </div>
    </>
  )
}

interface PolicySectionProps {
  number: string
  title: string
  content: string[]
}

const PolicySection: React.FC<PolicySectionProps> = ({ number, title, content }) => (
  <div className=" border border-[#E5E7EB] bg-white p-6 sm:p-8 mb-6 shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-300">
    <div className="flex items-center gap-3 sm:gap-3.5 mb-5 pb-4 border-b border-[#E5E7EB]">
      <span className="bg-blue-50 text-[#2043B0] border border-blue-200 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg shrink-0">
        {number}
      </span>
      <h2 className="text-lg sm:text-xl font-[Cinzel] font-bold text-[#172554] leading-snug">
        {title}
      </h2>
    </div>
    <div className="flex flex-col gap-3.5">
      {content.map((para, i) => (
        <p key={i} className="text-[#4B5563] text-sm sm:text-[15px] leading-relaxed">
          {para}
        </p>
      ))}
    </div>
  </div>
)

interface ContactItemProps {
  icon: string
  label: string
  value: string
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, label, value }) => (
  <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl border border-[#E5E7EB] bg-white shadow-2xs hover:border-blue-200 transition-all">
    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#F5F7FF] border border-blue-100 text-base text-[#2043B0] shrink-0">
      {icon}
    </span>
    <div className="min-w-0 flex-1">
      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#2043B0] block mb-0.5">
        {label}
      </span>
      {label.toLowerCase() === "email" ? (
        <a href={`mailto:${value}`} className="text-sm sm:text-base font-medium text-[#172554] hover:text-[#2043B0] transition-colors break-words">
          {value}
        </a>
      ) : label.toLowerCase() === "phone" ? (
        <a href={`tel:${value.split(" ")[0]}`} className="text-sm sm:text-base font-medium text-[#172554] hover:text-[#2043B0] transition-colors break-words">
          {value}
        </a>
      ) : (
        <span className="text-sm sm:text-base text-[#4B5563] leading-relaxed break-words">
          {value}
        </span>
      )}
    </div>
  </div>
)

export default PrivacyPolicyPage
