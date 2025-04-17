import { Link } from "react-router-dom";
import { TumblrLogo } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="bg-brand-primary text-font-primary">
      <section className="flex flex-col px-10 md:flex-row mx-auto">
        <section className="flex-1/2 md:px-36 lg:px-64 py-10 gap-2 flex flex-col">
          <h6 className="text-heading-6 font-bold">
            Stay curious, stay cozy, stay Holidaze
          </h6>
          <p className="text-body-xs">
            From mountain cabins to city lofts, we're here to make your next
            escape a little more magical.
          </p>
          <p>© {new Date().getFullYear()} Holidaze - all rights reserved.</p>
        </section>
        <section className="flex-1 flex flex-col py-10 gap-2">
          <h6 className="text-heading-6 font-bold underline">Information</h6>
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/faq">FAQ</Link>
        </section>
        <section className="flex-1 flex flex-col py-10 gap-2">
          <h6 className="text-heading-6 font-bold underline">Social</h6>
          <a href="https://hudd.no" aria-label="Hudd" title="Hudd">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 hover:text-[#121b22]"
              viewBox="7 10 38 52"
              fill="currentColor"
            >
              <path
                d="M44.5734 35.9494V59.155C44.5734 60.2485 43.7204 61.099 42.6236 61.099H36.4086C35.3118 61.099 34.4587 60.2485 34.4587 59.155V40.3233C34.4587 37.7718 33.7276 35.7064 32.1433 34.2485C30.9247 33.0335 29.4623 32.3046 27.6344 32.0616C27.1469 31.9401 26.7813 31.9401 26.2939 31.9401C23.8566 31.9401 21.9068 32.669 20.3226 34.2485C18.7383 35.7064 18.0072 37.7718 18.0072 40.3233V59.0335C18.0072 60.127 17.1541 60.9775 16.0573 60.9775H9.84229C8.74552 60.9775 7.89247 60.127 7.89247 59.0335V12.0148C7.89247 10.9214 8.74552 10.0709 9.84229 10.0709H16.0573C17.1541 10.0709 18.0072 10.9214 18.0072 12.0148V20.5195L12.3456 30.6553L22.2724 22.7064L24.5878 21.127C25.8064 20.2765 27.5125 20.2765 28.7312 21.127L42.8673 31.9401C43.8422 32.669 44.5301 33.5679 44.5734 34.9278C44.5854 35.305 44.5734 35.5849 44.5734 35.9494Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a href="https://bsky.app" aria-label="BlueSky" title="BlueSky">
            <svg
              fill="none"
              viewBox="0 0 64 57"
              className="w-8 h-8 ml-1 hover:text-[#1185FE]"
            >
              <path
                fill="currentColor"
                d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z"
              ></path>
            </svg>
          </a>
          <a href="https://www.tumblr.com" aria-label="Tumblr" title="Tumblr">
            <TumblrLogo
              size={32}
              weight="fill"
              className="hover:text-[#2c4762]"
            />
          </a>
        </section>
      </section>
    </footer>
  );
}
