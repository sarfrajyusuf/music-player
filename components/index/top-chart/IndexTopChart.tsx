"use client";
import { useState } from "react";
import { useAppStore } from "@/store/app-store";

import MainCard from "@/components/ui/main-card/MainCard";
import IndexTopChartItem from "./IndexTopChartItem";

import styles from "./IndexTopChart.module.scss";

const PLAY_LIST_ID = "top-charts-musics-playlist";

const IndexTopChart = ({ musics }: { musics: Music[] }) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list"); // State for view mode
  const [setMusic, setPlayList, playlistId] = useAppStore((state) => [
    state.setMusic,
    state.setPlaylist,
    state.playListId,
  ]);

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "list" ? "grid" : "list"));
  };

  const playMusicClickHandler = (
    type: "play" | "remove" = "play",
    music: Music
  ) => {
    setMusic(music);
    if (playlistId !== PLAY_LIST_ID) {
      setPlayList(PLAY_LIST_ID, musics);
    }
  };

  return (
    <MainCard title="Top Charts" link="/musics" text="See all">
      <div className={styles.viewToggle}>
        <button onClick={toggleViewMode}>
          {viewMode === "list" ? "Grid View" : "List View"}
        </button>
      </div>
      <ul
        className={`${styles.list} ${
          viewMode === "grid" ? styles.grid : styles.list
        }`}
      >
        {musics.map((music, index) => (
          <IndexTopChartItem
            key={music.id}
            musicData={music}
            index={index + 1}
            onMusicClick={playMusicClickHandler}
            viewMode={viewMode} // Pass viewMode as a prop
          />
        ))}
      </ul>
    </MainCard>
  );
};

export default IndexTopChart;
