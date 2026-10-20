import { hindSiliguri } from "@/app/font";

const announcementText =
  "সারা বাংলাদেশে ডেলিভারি · ক্যাশ অন ডেলিভারি সুবিধা রয়েছে";

export default function AnnouncementBar() {
  return (
    <div
      className={`absolute top-1/2 left-0 z-0 w-full -translate-y-1/2 overflow-hidden bg-primary text-white ${hindSiliguri.className}`}
      role="region"
      aria-label="Store announcements"
    >
      <div className="flex w-max animate-marquee">
        {[...Array(6)].map((_, index) => (
          <span
            key={index}
            aria-hidden={index !== 0}
            className="shrink-0 px-8 py-3 text-sm font-bold tracking-widest"
          >
            {announcementText}
          </span>
        ))}
      </div>
    </div>
  );
}