type SectionHeaderProps = {
  title?: string;
  subTitle?: string;
};

const SectionHeader = ({
  title = "Section Title",
  subTitle = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus vel amet incidunt.",
}: SectionHeaderProps) => {
  return (
    <div className="text-center mb-12">
      {/* Title */}
      <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 capitalize">
        {title}
      </h2>

      {/* Subtitle */}
      <p className="hidden md:flex max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-gray-500 justify-center">
        {subTitle}
      </p>

      {/* Decorative Line */}
      <div className="flex items-center justify-center gap-3 mt-4 md:mt-6">
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-primary" />
        <div className="w-2 h-2 rotate-45 bg-primary" />
        <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-primary" />
      </div>
    </div>
  );
};

export default SectionHeader;