import BannerSlider from "@/components/modules/BannerSlider/BannerSlider";
import StatsBar from "@/components/modules/StatsBar/StatsBar";
import RecentPosts from "@/components/RecentPosts/RecentPosts";

export default function Home() {
  return (
    <>
      <main>
        <BannerSlider/>
        <StatsBar/>
        <RecentPosts/>
      </main>
    </>
  );
}
