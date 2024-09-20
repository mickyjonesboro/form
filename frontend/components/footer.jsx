export default function Footer() {
  return (
    <div className=" bg-gray-100 text-blue-500 py-8 mt-8 ">
      <div className=" ">
        <div className=" flex flex-col md:flex-row md:justify-between md:items-center px-20 ">
          <div>
            <a
              className="link hover:text-red-500"
              href="https://secure.ssa.gov/rome/rir-ui/helpPrivacyAndSecurity"
            >
              Privacy and Security
            </a>
          </div>
          <div>
            <a
              className=" hover:text-red-500"
              href="https://www.ssa.gov/help/mySSA_pra.html"
            >
              OMB No. 0960-0789
            </a>
          </div>
          <div>
            <a
              className="hover:text-red-500"
              href="https://www.ssa.gov/agency/privacy.html"
            >
              Privacy Policy
            </a>
          </div>
          <div>
            <a
              className="hover:text-red-500"
              href="https://secure.ssa.gov/rome/rir-ui/helpPrivacyActStatement"
            >
              Privacy Act Statement
            </a>
          </div>
          <div>
            <a
              className="hover:text-red-500"
              href="https://www.ssa.gov/accessibility/"
            >
              Accessibility Help
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
