import {
  COMPANY_LINKS,
  CONTACTS,
  LEGAL_LINKS,
  NAVIGATION_LINKS,
  SOCIALS,
} from "../../data/footer";

const headingClass =
  "mb-4 font-sans text-[13px] font-bold uppercase tracking-[1px] text-ink";
const linkClass =
  "font-sans text-[14px] text-footer-text no-underline hover:text-brand";

function LinkColumn({ title, links }) {
  return (
    <div>
      <h4 className={headingClass}>{title}</h4>
      {links.map((item) => (
        <div key={item} className="mb-[10px]">
          <a href="#" className={linkClass}>
            {item}
          </a>
        </div>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-divider bg-white px-6 pt-10 pb-6 font-body md:px-[3.25rem] md:pt-14 md:pb-7"
    >
      {/*
        Phones: Contact → Follow Us → Company | Navigation side by side.
        md+: the original row (the wrapper is `contents`, so the two link
        columns keep order 0 and come before Contact / Follow Us).
      */}
      <div className="mb-12 flex flex-col justify-between gap-9 md:flex-row md:gap-0">
        <div className="order-3 grid grid-cols-2 gap-6 md:contents">
          <LinkColumn title="Company" links={COMPANY_LINKS} />
          <LinkColumn title="Navigation" links={NAVIGATION_LINKS} />
        </div>

        <div className="order-1 md:order-3">
          <h4 className="mb-4 font-sans text-[14px] font-bold uppercase tracking-[1px] text-ink">
            Contact
          </h4>
          {CONTACTS.map(({ icon, text }) => (
            <div key={text} className="mb-3 flex items-center gap-[10px]">
              <span className="text-[16px]">{icon}</span>
              <span className="font-sans text-[14px] text-footer-text">
                {text}
              </span>
            </div>
          ))}
        </div>

        <div className="order-2 md:order-4">
          <h4 className={headingClass}>Follow Us</h4>
          <div className="flex flex-wrap gap-3">
            {SOCIALS.map(({ label, title }) => (
              <a
                key={title}
                href="#"
                title={title}
                className="flex h-[38px] w-[38px] items-center justify-center rounded-[50%] border-[1.5px] border-footer-border font-sans text-[13px] font-bold text-footer-text no-underline hover:border-brand hover:text-brand"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-3 border-t border-divider pt-6 md:flex-row md:items-center md:gap-0">
        <p className="font-sans text-[13px] text-footer-muted">
          © 2025 Panda. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-6">
          {LEGAL_LINKS.map((item) => (
            <a
              key={item}
              href="#"
              className="font-sans text-[13px] text-footer-muted no-underline hover:text-brand"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
