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

// Built-in icons are inline so they follow the text color in day/night mode
const getSocialIcon = (link: HomeProfileLink): 'github' | 'email' | 'link' => {
  const label = link.label.toLowerCase()
  if (label.includes('github')) return 'github'
  if (label.includes('mail')) return 'email'
  return 'link'
}

const isExternal = (link: string) => /^(https?:)?\/\//.test(link)

const handleCardClick = (link?: string) => {
  if (!link) return

  if (isExternal(link)) {
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
    <section class="talexck-home" aria-label="TalexCK Home">
      <div class="grid-bg" aria-hidden="true"></div>

      <div class="home-layout">
        <!-- Profile -->
        <aside class="side-panel">
          <article class="frame profile-card">
            <div class="window-bar">
              <span>~/whoami</span>
              <span class="status"><i aria-hidden="true"></i>online</span>
            </div>
            <div class="avatar-box">
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
                :target="isExternal(link.href) ? '_blank' : undefined"
                rel="noreferrer"
                class="link-item"
              >
                <span class="link-label">
                  <img v-if="link.icon" :src="link.icon" alt="" class="link-icon">
                  <svg v-else-if="getSocialIcon(link) === 'github'" class="link-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" /></svg>
                  <svg v-else-if="getSocialIcon(link) === 'email'" class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                  <svg v-else class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></svg>
                  {{ link.label }}
                </span>
                <svg class="arrow-ne" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
              </a>
            </nav>
          </article>
        </aside>

        <!-- Projects / Achievements on a vertical bus -->
        <main class="main-content">
          <div class="bus" aria-hidden="true"><span class="bus-flow"></span></div>

          <section v-if="projects.length" class="section-group">
            <h2 class="section-title">
              <b>projects/</b>{{ projects.length }} items
            </h2>
            <article
              v-for="(project, index) in projects"
              :key="project.title"
              class="frame entry"
              :class="{ clickable: project.link }"
              :style="{ '--entry-delay': index * 0.08 + 's' }"
              :tabindex="project.link ? 0 : undefined"
              @click="handleCardClick(project.link)"
              @keydown.enter.prevent="handleCardClick(project.link)"
              @keydown.space.prevent="handleCardClick(project.link)"
            >
              <span class="wire" aria-hidden="true"></span>
              <div class="entry-meta">
                <span>
                  {{ project.index || (index + 1).toString().padStart(2, '0') }}<template v-if="project.category"> · {{ project.category }}</template>
                </span>
                <span v-if="project.link" class="entry-go" aria-hidden="true">→</span>
              </div>
              <h3 class="title">{{ project.title }}</h3>
              <p class="summary">{{ project.description }}</p>
              <div v-if="project.tags?.length" class="tags">
                <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </article>
          </section>

          <section v-if="awards.length" class="section-group">
            <h2 class="section-title">
              <b>achievements/</b>{{ awards.length }} items
            </h2>
            <article
              v-for="(award, index) in awards"
              :key="award.title"
              class="frame entry"
              :class="{ clickable: award.link }"
              :style="{ '--entry-delay': index * 0.08 + 's' }"
              :tabindex="award.link ? 0 : undefined"
              @click="handleCardClick(award.link)"
              @keydown.enter.prevent="handleCardClick(award.link)"
              @keydown.space.prevent="handleCardClick(award.link)"
            >
              <span class="wire" aria-hidden="true"></span>
              <div class="entry-meta">
                <span>{{ award.eyebrow || 'award' }}</span>
                <span v-if="award.badge" class="badge">[{{ award.badge }}]</span>
              </div>
              <h3 class="title">{{ award.title }}</h3>
              <p class="summary">{{ award.description }}</p>
            </article>
          </section>

          <a :href="blogButtonLink" class="blog-button">
            <span class="prompt" aria-hidden="true">$</span>
            <span>{{ blogButtonText }}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
          </a>
        </main>
      </div>
    </section>
  </VPHomeBox>
</template>

<style scoped>
/* ========================================
   Design Tokens (white / black + plume brand)
   ======================================== */
.talexck-home {
  --ink: #0a0a0a;
  --ink-2: #52525b;
  --ink-3: #a1a1aa;
  --paper: var(--vp-c-bg);
  --paper-soft: var(--vp-c-bg-soft);
  --rule: #e4e4e7;
  --accent: var(--vp-c-brand-1);
  --accent-soft: var(--vp-c-brand-soft);
  --mono: var(--vp-font-family-mono);
  --bus-gap: 40px;

  position: relative;
  width: 100%;
  min-width: 0;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 0 56px;
  box-sizing: border-box;
  color: var(--ink);
}

[data-theme="dark"] .talexck-home {
  --ink: #fafafa;
  --ink-2: #a1a1aa;
  --ink-3: #52525b;
  --rule: #2a2a2e;
}

/* Faint blueprint grid, fading out from the top-left */
.grid-bg {
  position: absolute;
  inset: -48px;
  background-image:
    linear-gradient(var(--rule) 1px, transparent 1px),
    linear-gradient(90deg, var(--rule) 1px, transparent 1px);
  background-size: 32px 32px;
  -webkit-mask-image: radial-gradient(ellipse closest-side at 40% 40%, #000 35%, transparent 100%);
  mask-image: radial-gradient(ellipse closest-side at 40% 40%, #000 35%, transparent 100%);
  opacity: 0.7;
  pointer-events: none;
  z-index: 0;
}

.home-layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr);
  gap: 72px;
  align-items: start;
}

/* ========================================
   Frame: square card with corner brackets
   ======================================== */
.frame {
  position: relative;
  background: var(--paper);
  border: 1px solid var(--rule);
  border-radius: 4px;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.frame::before,
.frame::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border: 1.5px solid var(--ink);
  transition: border-color 0.25s ease;
}

.frame::before {
  top: -1px;
  left: -1px;
  border-right: 0;
  border-bottom: 0;
}

.frame::after {
  right: -1px;
  bottom: -1px;
  border-left: 0;
  border-top: 0;
}

/* ========================================
   Profile
   ======================================== */
.side-panel {
  position: sticky;
  top: calc(var(--vp-nav-height, 64px) + 24px);
}

.profile-card {
  padding: 0 28px 28px;
}

.window-bar {
  display: flex;
  justify-content: space-between;
  margin: 0 -28px 28px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--rule);
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink-3);
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--accent);
}

.status i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  animation: blink 2.4s ease-in-out infinite;
}

@keyframes blink {
  50% { opacity: 0.3; }
}

.avatar-box {
  width: 96px;
  height: 96px;
  display: grid;
  place-items: center;
  background: var(--paper-soft);
  border: 1px solid var(--rule);
}

.avatar {
  width: 64px;
  height: 64px;
  object-fit: contain;
}

.name {
  margin: 24px 0 6px;
  font-size: 38px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--ink);
}

.role {
  margin: 0;
  font-family: var(--mono);
  font-size: 13px;
  color: var(--accent);
}

.role::before {
  content: '> ';
  color: var(--ink-3);
}

.description {
  margin: 18px 0 24px;
  font-size: 15px;
  line-height: 1.7;
  color: var(--ink-2);
}

.social-links {
  display: grid;
  gap: 8px;
}

.link-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 14px;
  border: 1px solid var(--rule);
  font-size: 14px;
  font-weight: 500;
  color: var(--ink) !important;
  text-decoration: none !important;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.link-item:hover {
  border-color: var(--ink);
  background: var(--paper-soft);
}

.link-label {
  display: flex;
  align-items: center;
  gap: 10px;
}

.link-icon {
  width: 18px;
  height: 18px;
}

.arrow-ne {
  width: 16px;
  height: 16px;
  color: var(--ink-3);
  transition: transform 0.2s ease, color 0.2s ease;
}

.link-item:hover .arrow-ne {
  color: var(--accent);
  transform: translate(2px, -2px);
}

/* ========================================
   Bus + entries
   ======================================== */
.main-content {
  position: relative;
  padding-left: var(--bus-gap);
}

.bus {
  position: absolute;
  top: 8px;
  bottom: 24px;
  left: 0;
  width: 1px;
  background: var(--ink-3);
  overflow: hidden;
}

.bus-flow {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 96px;
  background: linear-gradient(transparent, var(--accent), transparent);
  animation: bus-flow 5s linear infinite;
}

@keyframes bus-flow {
  from { transform: translateY(-100%); }
  to { transform: translateY(1200px); }
}

.section-group + .section-group {
  margin-top: 48px;
}

.section-title {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 20px;
  padding: 0;
  border: 0;
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1;
  color: var(--ink-2);
}

/* Square node on the bus */
.section-title::before {
  content: '';
  position: absolute;
  left: calc(var(--bus-gap) * -1 - 4px);
  width: 9px;
  height: 9px;
  background: var(--ink);
}

.section-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--rule);
}

.section-title b {
  color: var(--ink);
  font-weight: 700;
}

.entry {
  margin-bottom: 16px;
  padding: 22px 26px;
  animation: entry-in 0.5s ease both;
  animation-delay: var(--entry-delay, 0s);
}

@keyframes entry-in {
  from { opacity: 0; transform: translateY(8px); }
}

/* Branch from the bus to the card */
.wire {
  position: absolute;
  top: 50%;
  left: calc(var(--bus-gap) * -1 - 1px);
  width: var(--bus-gap);
  height: 1px;
  background: var(--ink-3);
  transition: background 0.25s ease;
}

.wire::after {
  content: '';
  position: absolute;
  right: -4px;
  top: -3.5px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--paper);
  border: 1px solid var(--ink-3);
  transition: all 0.25s ease;
}

.entry.clickable {
  cursor: pointer;
}

.entry.clickable:hover,
.entry.clickable:focus-visible {
  outline: none;
  border-color: var(--accent);
  transform: translateX(4px);
  box-shadow: 0 10px 30px -18px var(--accent);
}

.entry.clickable:hover::before,
.entry.clickable:hover::after,
.entry.clickable:focus-visible::before,
.entry.clickable:focus-visible::after {
  border-color: var(--accent);
}

.entry.clickable:hover .wire,
.entry.clickable:focus-visible .wire {
  background: var(--accent);
}

.entry.clickable:hover .wire::after,
.entry.clickable:focus-visible .wire::after {
  background: var(--accent);
  border-color: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
}

.entry-meta {
  display: flex;
  justify-content: space-between;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--ink-3);
}

.entry-go,
.badge {
  color: var(--accent);
}

.entry-go {
  transition: transform 0.25s ease;
}

.entry.clickable:hover .entry-go {
  transform: translateX(4px);
}

.title {
  margin: 10px 0 8px;
  padding: 0;
  border: 0;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--ink);
}

.summary {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--ink-2);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--ink-2);
}

.tag::before {
  content: '#';
  color: var(--accent);
}

/* ========================================
   Blog button
   ======================================== */
.blog-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 32px;
  padding: 15px 24px;
  background: var(--ink);
  color: var(--paper) !important;
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-decoration: none !important;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.blog-button .prompt {
  color: var(--accent);
}

.blog-button svg {
  transition: transform 0.25s ease;
}

.blog-button:hover {
  transform: translateY(-2px);
  box-shadow: 4px 4px 0 var(--accent);
}

.blog-button:hover svg {
  transform: translateX(4px);
}

/* ========================================
   Responsive
   ======================================== */
@media (max-width: 960px) {
  .talexck-home {
    padding: 16px 0 32px;
  }

  .grid-bg {
    inset: 0;
  }

  .home-layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
  }

  .side-panel {
    position: static;
  }

  .main-content {
    padding-left: 0;
  }

  .bus,
  .wire,
  .section-title::before {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .status i,
  .bus-flow,
  .entry {
    animation: none !important;
  }

  .frame,
  .link-item,
  .blog-button,
  .blog-button svg,
  .entry-go,
  .arrow-ne {
    transition: none !important;
  }
}
</style>
