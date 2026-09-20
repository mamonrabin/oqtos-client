const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex h-screen w-full items-center justify-center bg-white">
      <div className="relative flex h-[160px] w-[160px] items-center justify-center">
        {/* Animated outer rings */}
        <div className="absolute inset-0 rounded-full border border-[#087096]/20 animate-ping" />

        <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-[#087096] border-r-[#087096] animate-spin" />

        <div className="absolute inset-5 rounded-full border border-[#087096]/30 animate-[spin_3s_linear_infinite_reverse]" />

        {/* Brand */}
        <div className="relative flex flex-col items-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#087096]">
            Oqtos
          </h1>

          {/* Animated loading dots */}
          <div className="mt-2 flex items-center gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#087096]" />
            <span
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#087096]"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#087096]"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;



