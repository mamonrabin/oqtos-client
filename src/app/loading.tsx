const Loading = () => {
  return (
    <div className="w-full h-screen bg-[#AC0000] flex justify-center items-center">
      <div className="relative w-[120px] h-[120px]">
        {/* Circular spinner */}
        <div className="absolute inset-0 rounded-full border-4 border-t-[#fff] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
