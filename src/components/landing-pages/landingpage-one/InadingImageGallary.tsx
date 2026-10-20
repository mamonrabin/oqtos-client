
import img1 from "@/assets/images/tshirt10-1785594483830-.webp";
import img2 from "@/assets/images/tshirt11-1785594483830-.webp";
import img3 from "@/assets/images/tshirt12-1785594483831-.webp";
import img4 from "@/assets/images/tshirt2-1785594483830-.webp";
import Image from "next/image";

const InadingImageGallary = () => {
  const images = [img1, img2, img3, img4];

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl border border-primary/10 bg-white p-2 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
          >
            <div className="relative cursor-pointer aspect-square overflow-hidden rounded-lg bg-neutral-50">
              <Image
                src={image}
                alt={`Product image ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 22vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold text-white shadow-sm sm:text-xs">
              {index === 0 ? "Best Seller" : "Premium"}
            </span> */}
          </div>
        ))}
      </div>

      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-primary/10 bg-white px-5 py-2 text-xs font-medium text-primary shadow-lg sm:text-sm">
        ✨ প্রিমিয়াম কোয়ালিটি কালেকশন
      </div>
    </div>
  );
};

export default InadingImageGallary;
