<template>
  <div class="video-card">
    <div class="thumb">
      <div class="thumb-placeholder">{{ thumbnailText }}</div>
    </div>

    <div class="info">
      <h3 class="title">{{ title }}</h3>
      <p class="channel">{{ channel }}</p>
      <p class="meta">{{ views }} views • Likes: {{ likes }}</p>
    </div>

    <button class="like-btn" @click="onLike">
      ❤️ Like
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  id: { type: [Number, String], required: true },
  title: { type: String, default: '' },
  channel: { type: String, default: '' },
  views: { type: Number, default: 0 },
  thumbnail: { type: String, default: '' },
  likes: { type: Number, default: 0 }
})
const emits = defineEmits(['liked'])

const thumbnailText = props.thumbnail || (props.title ? props.title.slice(0, 2).toUpperCase() : 'TV')

function onLike() {
  emits('liked', props.id)
}
</script>

<style scoped>
.video-card{
  display:flex;
  align-items:center;
  gap:12px;
  border:1px solid #e0e0e0;
  padding:10px;
  border-radius:8px;
}
.thumb{
  width:120px;
  height:70px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#f6f6f6;
  border-radius:6px;
}
.thumb-placeholder{
  font-weight:700;
  color:#666;
}
.info{
  flex:1;
}
.title{ margin:0 0 4px 0; font-size:14px; }
.channel{ margin:0; color:#666; font-size:12px; }
.meta{ margin:6px 0 0 0; color:#999; font-size:12px; }
.like-btn{
  border: none;
  background: #fff;
  cursor: pointer;
  padding:6px 10px;
  border-radius:6px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}
.like-btn:hover{ transform: translateY(-2px); }
</style>
