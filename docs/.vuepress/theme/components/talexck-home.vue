<script setup lang="ts">
import { computed } from 'vue'
import type { ThemeHomeConfigBase } from 'vuepress-theme-plume'
import { VPHomeBox } from 'vuepress-theme-plume/client'

const props = defineProps<ThemeHomeConfigBase & {
  profile?: HomeProfile
  projects?: HomeProject[]
  awards?: HomeAward[]
  blogText?: string
  blogLink?: string
}>()

interface HomeProfileLink {
  label: string
  href: string
  icon?: string
}

interface HomeProfile {
  avatar?: string
  name?: string
  role?: string
  description?: string
  links?: HomeProfileLink[]
}

interface HomeProject {
  index?: string
  category?: string
  title: string
  description: string
  tags?: string[]
  link?: string
}

interface HomeAward {
  eyebrow?: string
  title: string
  description: string
  badge?: string
  link?: string
}

const fallbackProfile: Required<HomeProfile> = {
  avatar: '/icon.svg',
  name: 'TalexCK',
  role: 'Developer & Architect',
  description: 'Building secure and elegant digital experiences with a focus on structural integrity and performance.',
  links: [
    { label: 'GitHub', href: 'https://github.com/TalexCK' },
    { label: 'Email', href: 'mailto:talexcks@gmail.com' },
  ],
}

const profile = computed<Required<HomeProfile>>(() => ({
  ...fallbackProfile,
  ...props.profile,
  links: props.profile?.links?.length ? props.profile.links : fallbackProfile.links,
}))

const projects = computed(() => props.projects || [])
const awards = computed(() => props.awards || [])
const blogButtonText = computed(() => props.blogText || 'VIEW BLOG')
const blogButtonLink = computed(() => props.blogLink || '/blog/')

const getSocialIcon = (link: HomeProfileLink) => {
  if (link.icon) return link.icon
  const label = link.label.toLowerCase()
  if (label.includes('github')) return 'https://api.iconify.design/line-md:github-loop.svg'
  if (label.includes('mail') || label.includes('email')) return 'https://api.iconify.design/line-md:email.svg'
  return '/icon.svg'
}

const handleCardClick = (link?: string) => {
  if (!link) return

  if (/^(https?:)?\/\//.test(link)) {
    window.open(link, '_blank', 'noopener,noreferrer')
    return
  }

  window.location.href = link
}
</script>

<template>
  <VPHomeBox
    :type="type"
    :background-image="backgroundImage"
    :background-attachment="backgroundAttachment"
    :full="full"
  >
    <section class="talexck-home-container" aria-label="TalexCK Home">
      <div class="home-layout">
        <!-- Left Column (30%) -->
        <aside class="side-panel">
          <div class="sticky-wrapper">
            <article class="profile-card circuit-card">
              <div class="avatar-wrapper">
                <img class="avatar" :src="profile.avatar" :alt="profile.name">
              </div>
              <h1 class="name">{{ profile.name }}</h1>
              <p class="role">{{ profile.role }}</p>
              <p class="description">{{ profile.description }}</p>
              <nav v-if="profile.links.length" class="social-links">
                <a
                  v-for="link in profile.links"
                  :key="link.href"
                  :href="link.href"
                  target="_blank"
                  rel="noreferrer"
                  class="link-item"
                  :title="link.label"
                >
                  <img :src="getSocialIcon(link)" :alt="link.label" class="social-svg">
                </a>
              </nav>
              <!-- The Out-Node -->
              <div class="connector-node right"></div>
              <!-- Connection line to the central bus -->
              <div class="profile-out-line"></div>
            </article>
          </div>
        </aside>

        <!-- Right Column (70%) -->
        <main class="main-content">
          <!-- Central Bus Line (Vertical Trunk) -->
          <div class="vertical-bus"></div>

          <div class="content-grid">
            <!-- Projects Section -->
            <section v-if="projects.length" class="section-group">
              <h3 class="section-title">Projects</h3>
              <div class="cards-stack">
                <div 
                  v-for="(project, index) in projects" 
                  :key="project.title"
                  class="card-entry"
                >
                  <!-- Branch line from Bus to Card -->
                  <div class="branch-trace"></div>
                  <article
                    class="project-card circuit-card smaller"
                    :class="{ clickable: project.link }"
                    :tabindex="project.link ? 0 : undefined"
                    @click="handleCardClick(project.link)"
                    @keydown.enter.prevent="handleCardClick(project.link)"
                    @keydown.space.prevent="handleCardClick(project.link)"
                  >
                    <div class="connector-node left"></div>
                    <div class="card-header">
                      <span v-if="project.index || index !== undefined" class="index">
                        {{ project.index || (index + 1).toString().padStart(2, '0') }}
                      </span>
                      <span class="category">{{ project.category }}</span>
                    </div>
                    <h2 class="title">{{ project.title }}</h2>
                    <p class="summary">{{ project.description }}</p>
                    <div v-if="project.tags?.length" class="tags">
                      <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
                    </div>
                  </article>
                </div>
              </div>
            </section>

            <!-- Awards Section -->
            <section v-if="awards.length" class="section-group">
              <h3 class="section-title">Achievements</h3>
              <div class="cards-stack">
                <div 
                  v-for="award in awards" 
                  :key="award.title"
                  class="card-entry"
                >
                  <div class="branch-trace"></div>
                  <article
                    class="award-card circuit-card smaller"
                    :class="{ clickable: award.link }"
                    :tabindex="award.link ? 0 : undefined"
                    @click="handleCardClick(award.link)"
                    @keydown.enter.prevent="handleCardClick(award.link)"
                    @keydown.space.prevent="handleCardClick(award.link)"
                  >
                    <div class="connector-node left"></div>
                    <p v-if="award.eyebrow" class="eyebrow">{{ award.eyebrow }}</p>
                    <h2 class="title">{{ award.title }}</h2>
                    <p class="summary">{{ award.description }}</p>
                    <div v-if="award.badge" class="badge">
                      <span>{{ award.badge }}</span>
                    </div>
                  </article>
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>

      <!-- Footer Action Button -->
      <div class="footer-actions">
        <a :href="blogButtonLink" class="blog-button">
          <span>{{ blogButtonText }}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </a>
      </div>
    </section>
  </VPHomeBox>
</template>

<style scoped>
.talexck-home-container {
  --circuit-line: var(--vp-c-divider);
  --circuit-accent: var(--vp-c-brand);
  --card-bg: var(--vp-c-bg);
  --bus-gap: 80px; /* Same as layout gap */
  --branch-w: 40px; /* Half of gap */
  --profile-wire-y: 205px; /* 对齐左侧姓名区域，而不是卡片几何中心 */
  
  position: relative;
  max-width: 1320px;
  margin: 0 auto;
  padding: 80px 24px;
  box-sizing: border-box;
}

.home-layout {
  display: grid;
  grid-template-columns: 3.2fr 6.8fr;
  gap: var(--bus-gap);
  position: relative;
  z-index: 2;
  align-items: start;
}

/* Base Card */
.circuit-card {
  background: var(--card-bg);
  border: 1.5px solid var(--circuit-line);
  border-radius: 16px;
  padding: 36px;
  position: relative;
  transition: all 0.3s ease;
}
.circuit-card.clickable { cursor: pointer; }
.circuit-card.clickable:hover {
  border-color: var(--circuit-accent);
  transform: translateY(-4px);
}
.circuit-card.smaller { padding: 24px 28px; }

/* Left Column */
.side-panel { height: 100%; }
.sticky-wrapper {
  position: static;
}
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Horizontal line from profile to bus */
.profile-out-line {
  position: absolute;
  top: var(--profile-wire-y);
  left: 100%;
  width: var(--branch-w);
  height: 2px;
  background: var(--circuit-line);
  opacity: 0.72;
  z-index: 1;
}

/* Right Column */
.main-content {
  position: relative;
  height: auto;
  min-height: 0;
  overflow: visible;
}

/* The Vertical Bus Line (Trunk) */
.vertical-bus {
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(var(--branch-w) * -1); /* Place exactly in middle of gap */
  width: 2px;
  background: var(--circuit-line);
  opacity: 0.72;
  z-index: 1;
  border-radius: 999px;
}

.content-grid {
  display: flex;
  flex-direction: column;
  gap: 60px;
  height: auto;
  max-height: none;
  overflow: visible;
}

.card-entry {
  position: relative;
}

/* Branch line from Bus to each Right Card */
.branch-trace {
  position: absolute;
  top: 50%;
  left: calc(var(--branch-w) * -1);
  width: var(--branch-w);
  height: 2px;
  background: var(--circuit-line);
  opacity: 0.72;
  z-index: 1;
}

/* Connector Nodes */
.connector-node {
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--circuit-line);
  border: 2px solid var(--card-bg);
  border-radius: 50%;
  z-index: 5;
}
.profile-card .connector-node.right { top: var(--profile-wire-y); right: -6px; transform: translateY(-50%); }
.connector-node.left { top: 50%; left: -6px; transform: translateY(-50%); }

.circuit-card:hover .connector-node {
  background: var(--circuit-accent);
  border-color: var(--circuit-accent);
  box-shadow: 0 0 10px var(--circuit-accent);
}

/* Visuals */
.avatar-wrapper {
  width: 120px; height: 120px; border-radius: 24px;
  background: var(--vp-c-bg-soft);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 24px; border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}
.avatar { width: 100px; height: 100px; object-fit: contain; }
.name { margin: 0; font-size: 32px; font-weight: 800; color: var(--vp-c-text-1); }
.role { font-size: 16px; color: var(--circuit-accent); font-weight: 600; text-transform: uppercase; margin: 14px 0 18px; }
.description { font-size: 15px; color: var(--vp-c-text-2); line-height: 1.6; margin-bottom: 24px; }

.social-links { display: flex; gap: 14px; }
.link-item {
  width: 40px; height: 40px; border-radius: 10px;
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider);
  display: flex; align-items: center; justify-content: center;
}
.social-svg { width: 22px; height: 22px; opacity: 0.8; }

.section-group { display: flex; flex-direction: column; gap: 24px; }
.section-title { font-size: 14px; text-transform: uppercase; color: var(--vp-c-text-3); margin-left: 12px; }
.cards-stack { display: flex; flex-direction: column; gap: 24px; }
.card-header { display: flex; align-items: baseline; gap: 10px; }

.title { font-size: 22px; font-weight: 700; color: var(--vp-c-text-1); margin-bottom: 12px; }
.summary { font-size: 15px; color: var(--vp-c-text-2); line-height: 1.6; margin-bottom: 20px; }
.tags { display: flex; flex-wrap: wrap; gap: 10px; }
.tag { font-size: 11px; padding: 5px 10px; border-radius: 6px; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); }
.badge { display: inline-flex; align-items: center; background: var(--vp-c-bg-soft); padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 700; color: var(--circuit-accent); border: 1px solid var(--circuit-line); }

.footer-actions { display: flex; justify-content: center; width: 100%; padding-top: 48px; }
.blog-button {
  display: inline-flex; align-items: center; gap: 12px; padding: 14px 28px;
  background: var(--circuit-accent); color: white !important; border-radius: 12px;
  font-weight: 700; font-size: 14px; text-decoration: none !important;
}

@media (max-width: 960px) {
  .talexck-home-container { padding: 40px 16px; }
  .home-layout { grid-template-columns: 1fr; gap: 40px; }
  .connector-node, .vertical-bus, .branch-trace, .card-entry::before, .profile-out-line { display: none; }
}

:global(html.dark) .talexck-home-container { --circuit-line: #444; }
</style>
