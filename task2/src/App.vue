<template>
  <div class="app">
    <header>
      <h1>Mini YouTube Dashboard</h1>
    </header>

    <section class="controls">
      <input
        v-model="searchQuery"
        placeholder="Search by title or channel..."
        class="search"
      />
      <div class="counters">
        <span>Found: {{ foundCount }}</span>
        <span>Total likes: {{ totalLikes }}</span>
      </div>
    </section>

    <section class="videos">
      <div v-if="filteredVideos.length === 0" class="empty">No videos found.</div>

      <div v-else class="list">
        <VideoCard
          v-for="video in filteredVideos"
          :key="video.id"
          v-bind:id="video.id"
          v-bind:title="video.title"
          v-bind:channel="video.channel"
          v-bind:views="video.views"
          v-bind:likes="video.likes"
          v-bind:thumbnail="video.thumbnail"
          v-on:liked="handleLiked"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import VideoCard from './components/VideoCard.vue'
import { useVideos } from './composables/useVideos'

const {
  filteredVideos,
  searchQuery,
  totalLikes,
  foundCount,
  likeVideo
} = useVideos()

function handleLiked(videoId) {
  likeVideo(videoId)
}
</script>

<style>
.app{ max-width:900px; margin:20px auto; padding:0 16px; font-family:Inter, Arial, sans-serif; }
header h1{ margin:0 0 12px 0; }
.controls{ display:flex; gap:12px; align-items:center; margin-bottom:16px; }
.search{ flex:1; padding:8px 10px; border-radius:6px; border:1px solid #ddd; }
.counters{ display:flex; gap:12px; color:#555; }
.videos .list{ display: grid; grid-template-columns: 1fr; gap:12px; }
.empty{ color:#777; padding:20px; text-align:center; border:1px dashed #eee; border-radius:8px; }
@media(min-width:700px){
  .videos .list{ grid-template-columns: 1fr 1fr; }
}
</style>
