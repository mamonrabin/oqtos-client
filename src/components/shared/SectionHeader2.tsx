import Link from "next/link";

interface SectionHeaderProps {
  title?: string;
  subTitle?: string;
}

const SectionHeader2 = ({
  title = "Section Title",
  subTitle = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus vel amet incidunt.",
}: SectionHeaderProps) => {
  return (
    <div className="md:mb-6 mb-4">
      <div className="flex items-center gap-3">
        {/* Accent */}
        <span className="md:h-7 h-4 w-1 rounded-full bg-primary" />

        {/* Content */}
        <div className="w-full flex md:flex-col flex-row md:items-baseline items-center justify-between">
          <h2 className="text-lg font-bold capitalize tracking-tight text-gray-900 md:text-2xl">
            {title}
          </h2>

          <div className="md:w-full flex items-center md:justify-between justify-end">
            <p className="mt-1 md:block hidden text-sm leading-relaxed text-gray-500 md:text-base">
              {subTitle}
            </p>

            <Link
              href="/"
              className="group inline-flex items-center gap-1 text-sm font-semibold text-primary"
            >
              View More
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader2;
