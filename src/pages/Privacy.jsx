export default function Privacy() {
  return (
    <section className="flex flex-col items-start justify-between w-full max-w-7xl mx-auto text-brand-primary px-8 sm:px-10 md:px-20 gap-10 my-10">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p>
        At Holidaze, we are committed to protecting your privacy and ensuring
        the security of your personal information. This Privacy Policy outlines
        how we collect, use, and safeguard your data when you use our website
        and services.
      </p>
      <section className="flex flex-col gap-8">
        <h2 className="text-3xl font-bold">Information We Collect</h2>
        <div>
          <h3 className="text-2xl mb-2">Personal Information</h3>
          <ul>
            <li>
              <strong>Contact Details:</strong> Name, email address, phone
              number, and physical address.
            </li>
            <li>
              <strong>Travel Details:</strong> Information related to your
              bookings, including destination, travel dates, and accommodation
              preferences.
            </li>
            <li>
              <strong>Payment Information:</strong> Credit card details and
              billing information.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl">Non-Personal Information</h3>
          <ul>
            <li>
              <strong>Usage Data:</strong> Information about how you interact
              with our website, including pages visited, time spent on the site,
              and click-through rates.
            </li>
            <li>
              <strong>Device Information:</strong> Data about the device you use
              to access our website, such as IP address, browser type, and
              operating system.
            </li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-3xl font-bold">How We Use Your Information</h2>
        <div>
          <h3 className="text-2xl  mb-2">Providing Services</h3>
          <ul>
            <li>
              <strong>Booking Management:</strong> To process and manage your
              bookings, including confirmations, reminders, and updates.
            </li>
            <li>
              <strong>Customer Support:</strong> To respond to your inquiries
              and provide assistance with your travel plans.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl mb-2">Improving Our Services</h3>
          <ul>
            <li>
              <strong>Personalization:</strong> To tailor our website and
              services to your preferences and interests.
            </li>
            <li>
              <strong>Analytics:</strong> To analyze usage patterns and improve
              the functionality and user experience of our website.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl mb-2">Marketing and Communications</h3>
          <ul>
            <li>
              <strong>Newsletters and Promotions:</strong> To send you
              newsletters, special offers, and updates about our services.
            </li>
            <li>
              <strong>Targeted Advertising:</strong> To deliver personalized
              advertisements based on your interests and behavior.
            </li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-3xl font-bold">Sharing Your Information</h2>
        <div>
          <h3 className="text-2xl mb-2">Third-Party Service Providers</h3>
          <ul>
            <li>
              <strong>Payment Processors:</strong> To facilitate secure
              transactions.
            </li>
            <li>
              <strong>Analytics Providers:</strong> To help us understand how
              our website is used.
            </li>
            <li>
              <strong>Marketing Partners:</strong> To deliver targeted
              advertisements and promotions.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl mb-2">Legal Requirements</h3>
          <ul>
            <li>
              <strong>Compliance:</strong> To comply with legal obligations and
              respond to lawful requests from authorities.
            </li>
            <li>
              <strong>Safety and Security:</strong> To protect the rights,
              property, and safety of Holidaze, our users, and the public.
            </li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-3xl font-bold">Your Rights</h2>
        <div>
          <h3 className="text-2xl mb-2">Access and Control</h3>
          <ul>
            <li>
              <strong>View and Update:</strong> You have the right to view and
              update your personal information at any time.
            </li>
            <li>
              <strong>Delete:</strong> You can request the deletion of your
              personal information from our systems.
            </li>
            <li>
              <strong>Opt-Out:</strong> You can opt-out of receiving marketing
              communications from us.
            </li>
          </ul>
        </div>
      </section>
      <section className="flex flex-col gap-8">
        <h2 className="text-3xl font-bold">Data Security</h2>
        <ul>
          <li>
            <strong>Protection Measures:</strong> We implement industry-standard
            security measures to protect your personal information from
            unauthorized access, use, or disclosure.
          </li>
          <li>
            <strong>Breach Notification:</strong> In the event of a data breach,
            we will notify you promptly and take appropriate action to mitigate
            any potential harm.
          </li>
        </ul>
      </section>
      <section className="flex flex-col gap-8">
        <h2 className="text-3xl font-bold">Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or legal requirements. We will notify you of any
          significant changes by posting a notice on our website or sending you
          an email.
        </p>
      </section>
    </section>
  );
}
