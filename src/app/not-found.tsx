import { FooterLink } from "@/components/footerLink";
import { Divider } from "@/components/divider";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col grow items-center place-items-center">
        <div className="container mx-auto md:max-w-5xl sm:px-6 lg:px-8 py-12 text-center">
          <h3
            style={{ margin: "0 auto" }}
            className="text-lg font-eb-garamond text-primary"
          >
            Not Found
          </h3>
        </div>
      </div>

      {/*  */}

      <div className="flex items-center lg:mb-0 lg:text-left">
        <Divider />
        <FooterLink href={`/random`}>Random</FooterLink>
        <Divider />
      </div>
    </>
  );
}
