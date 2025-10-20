import { ref, computed, watch, onMounted } from 'vue'

export function useVideos() {
  const videos = ref([])
  const searchQuery = ref('')
  const totalLikes = ref(0)
  const foundCount = ref(0)

  function fetchVideos() {
    const mock = [
      { id: 1, title: 'Vue 3 Basics', channel: 'Frontend School', views: 12500, thumbnail: '', likes: 2 },
      { id: 2, title: 'Build a Dashboard', channel: 'DevTube', views: 8740, thumbnail: '', likes: 5 },
      { id: 3, title: 'Reactivity Deep Dive', channel: 'CodeLab', views: 4520, thumbnail: '', likes: 1 },
      { id: 4, title: 'Composition API Explained', channel: 'TechTalks', views: 23000, thumbnail: '', likes: 8 },
      { id: 5, title: 'CSS Tips', channel: 'DesignHub', views: 980, thumbnail: '', likes: 0 },
    ]

    setTimeout(() => {
      videos.value = mock
      totalLikes.value = mock.reduce((s, v) => s + (v.likes || 0), 0)
      foundCount.value = mock.length
    }, 800)
  }

  const filteredVideos = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return videos.value
    return videos.value.filter(v =>
      v.title.toLowerCase().includes(q) ||
      v.channel.toLowerCase().includes(q)
    )
  })

  watch(filteredVideos, (newList) => {
    foundCount.value = newList.length
  }, { immediate: true })


  function likeVideo(videoId) {
    const v = videos.value.find(x => x.id === videoId)
    if (v) {
      v.likes = (v.likes || 0) + 1
      totalLikes.value += 1
    }
  }

  onMounted(fetchVideos)

  return {
    videos,
    filteredVideos,
    searchQuery,
    totalLikes,
    foundCount,
    fetchVideos,
    likeVideo,
  }
}

