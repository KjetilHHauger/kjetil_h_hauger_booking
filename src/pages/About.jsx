export default function About() {
  return (
    <section className="flex flex-col items-start justify-between w-full max-w-7xl mx-auto text-brand-primary px-8 sm:px-10 md:px-20 gap-10 mt-10">
      <section>
        <h1 className="text-2xl font-bold">About Holidaze</h1>
        <p>
          Welcome to Holidaze, your gateway to unique and memorable travel
          experiences! At Holidaze, we believe that every journey should be an
          adventure, and every stay should feel like home. Our mission is to
          connect travelers with extraordinary accommodations around the world,
          from cozy cabins to luxurious villas, and everything in between.
        </p>
      </section>

      <section className="flex flex-col sm:flex-row items-center gap-4">
        <img
          src="https://raw.githubusercontent.com/KjetilHHauger/khh-image-bank/refs/heads/main/Booking/about/holidaze_about_1.webp"
          alt="Laptop on desk with a globe and a notebook. Outside window different travel cabins combined image"
          className="w-full sm:w-1/2 h-auto rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-xl font-bold">Our Story</h2>
          <p>
            Holidaze was founded by a group of passionate travelers who wanted
            to share their love for exploration and discovery. We understand
            that travel is more than just a destination—it's about the
            experiences, the people you meet, and the memories you create.
            That's why we curate a selection of accommodations that offer
            something special, whether it's a stunning view, a unique
            architectural design, or a warm and welcoming host.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold">Our Mission</h2>
        <p>
          Our mission is to make travel easy, enjoyable, and unforgettable. We
          strive to provide a seamless booking experience, exceptional customer
          service, and a community of like-minded travelers who share our
          passion for adventure. Whether you're planning a family vacation, a
          romantic getaway, or a solo adventure, Holidaze has the perfect stay
          for you.
        </p>
      </section>

      <section className="flex flex-col sm:flex-row-reverse items-center gap-4">
        <img
          src="https://raw.githubusercontent.com/KjetilHHauger/khh-image-bank/refs/heads/main/Booking/about/holidaze_about_2.webp"
          alt="Laptop on desk with a globe and a notebook. Outside window different travel cabins combined image"
          className="w-full sm:w-1/2 h-auto rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-xl font-bold">Our Values</h2>
          <ul>
            <li>
              <strong>Curiosity:</strong> We encourage our travelers to stay
              curious and explore the world with an open mind and heart.
            </li>
            <li>
              <strong>Comfort:</strong> We believe that comfort is key to a
              great travel experience. That's why we ensure that all our
              accommodations meet high standards of quality and comfort.
            </li>
            <li>
              <strong>Community:</strong> We foster a community of travelers who
              support and inspire each other. Join us and become part of the
              Holidaze family.
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold">What We Offer</h2>
        <ul>
          <li>
            <strong>Unique Accommodations:</strong> From treehouses to castles,
            our accommodations offer a unique and memorable stay.
          </li>
          <li>
            <strong>Personalized Recommendations:</strong> Our team of travel
            experts is always ready to help you find the perfect accommodation
            for your needs.
          </li>
          <li>
            <strong>Seamless Booking:</strong> Our user-friendly platform makes
            it easy to browse, book, and manage your stays.
          </li>
          <li>
            <strong>Exceptional Customer Service:</strong> Our dedicated
            customer support team is available 24/7 to assist you with any
            questions or concerns.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold">Join Us</h2>
        <p>
          Whether you're a seasoned traveler or just starting your journey,
          Holidaze is here to help you create unforgettable memories. Browse our
          accommodations, read our travel tips, and join our community of
          passionate explorers. Stay curious, stay cozy, stay Holidaze!
        </p>

        <p>
          Thank you for choosing Holidaze. We can't wait to help you plan your
          next adventure!
        </p>
      </section>
    </section>
  );
}
