export default function Faq() {
  return (
    <section className="flex flex-col items-start justify-between w-full max-w-7xl mx-auto text-brand-primary px-8 sm:px-10 md:px-20 gap-10 my-10">
      <h1 className="text-3xl font-bold">FAQ</h1>

      <section>
        <h2 className="text-2xl font-bold mb-2">General Questions</h2>
        <details>
          <summary class="cursor-pointer mb-2">
            How do I book a stay with Holidaze?
          </summary>
          <p className="mb-2">
            Booking a stay with Holidaze is easy! Simply browse our listings,
            select your preferred accommodation, and follow the booking process.
            You'll receive a confirmation once your booking is complete.
          </p>
        </details>
        <details>
          <summary class="cursor-pointer mb-2">
            What payment methods do you accept?
          </summary>
          <p className="mb-2">
            We accept major credit cards, debit cards, and PayPal. All payments
            are processed securely through our trusted payment gateways.
          </p>
        </details>
        <details>
          <summary class="cursor-pointer mb-2">
            Can I cancel or modify my booking?
          </summary>
          <p className="mb-2">
            Yes, you can cancel or modify your booking through your Holidaze
            account. Please note that cancellation policies may vary depending
            on the accommodation, so be sure to check the details before
            booking.
          </p>
        </details>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2">Accommodation Questions</h2>
        <details>
          <summary class="cursor-pointer mb-2">
            What types of accommodations do you offer?
          </summary>
          <p className="mb-2">
            Holidaze offers a variety of accommodations, including apartments,
            villas, cabins, and unique stays like treehouses and castles.
          </p>
        </details>
        <details>
          <summary class="cursor-pointer mb-2">
            Are your accommodations pet-friendly?
          </summary>
          <p className="mb-2">
            Some of our accommodations are pet-friendly. You can filter your
            search results to find pet-friendly options.
          </p>
        </details>
        <details>
          <summary class="cursor-pointer mb-2">
            What amenities are included in the accommodations?
          </summary>
          <p className="mb-2">
            Amenities vary by accommodation. Each listing will detail the
            specific amenities included, such as Wi-Fi, kitchen facilities, and
            parking.
          </p>
        </details>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2">
          Travel and Destination Questions
        </h2>
        <details>
          <summary class="cursor-pointer mb-2">
            Do you offer travel insurance?
          </summary>
          <p className="mb-2">
            While we don't offer travel insurance directly, we recommend
            purchasing travel insurance to cover medical emergencies, trip
            cancellations, and lost luggage.
          </p>
        </details>
        <details>
          <summary class="cursor-pointer mb-2">
            How can I find local recommendations for my destination?
          </summary>
          <p className="mb-2">
            Our hosts are a great resource for local recommendations. You can
            also check our blog for travel tips and hidden gems in various
            destinations.
          </p>
        </details>
        <details>
          <summary class="cursor-pointer mb-2">
            What should I do if I encounter a problem during my stay?
          </summary>
          <p className="mb-2">
            If you encounter any issues during your stay, please contact your
            host or our customer support team immediately. We're here to help
            ensure your stay is as smooth as possible.
          </p>
        </details>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2">
          Account and Privacy Questions
        </h2>
        <details>
          <summary class="cursor-pointer mb-2">
            How do I create an account with Holidaze?
          </summary>
          <p className="mb-2">
            Creating an account is simple. Just click on the "Sign Up" button
            and follow the prompts to enter your information.
          </p>
        </details>
        <details>
          <summary class="cursor-pointer mb-2">
            How do you protect my personal information?
          </summary>
          <p className="mb-2">
            We take your privacy seriously. All personal information is
            encrypted and stored securely. For more details, please refer to our
            Privacy Policy.
          </p>
        </details>
        <details>
          <summary class="cursor-pointer mb-2">
            Can I delete my account?
          </summary>
          <p className="mb-2">
            Yes, you can delete your account at any time by going to your
            account settings and following the deletion process.
          </p>
        </details>
      </section>
    </section>
  );
}
