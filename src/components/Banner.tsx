"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "./banner.module.css";

const BANNER_IMAGES = [
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1600&q=80",
  "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1600&q=80",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80",
];

export default function Banner() {
  const [imageIndex, setImageIndex] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();

  const handleBannerClick = () => {
    setImageIndex((prev) => (prev + 1) % BANNER_IMAGES.length);
  };

  const handleSelectVenue = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push("/venue");
  };

  return (
    <div className={styles.banner} onClick={handleBannerClick}>
      {session?.user?.name && (
        <div className={styles.welcome}>
          Welcome {session.user.name}
        </div>
      )}
      <img
        src={BANNER_IMAGES[imageIndex]}
        alt="Venue banner"
        className={styles.bannerImage}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>where every event finds its venue</h1>
        <p className={styles.subtitle}>
          ค้นหาและจองสถานที่จัดเลี้ยงที่สมบูรณ์แบบสำหรับทุกโอกาส
        </p>
      </div>
      <button
        type="button"
        className={styles.selectVenueBtn}
        onClick={handleSelectVenue}
      >
        Select Venue
      </button>
    </div>
  );
}
