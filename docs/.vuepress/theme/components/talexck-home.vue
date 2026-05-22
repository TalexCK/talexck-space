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
      <!-- Ambient background glow orbs -->
      <div class="ambient-orb orb-1" aria-hidden="true"></div>
      <div class="ambient-orb orb-2" aria-hidden="true"></div>
      <div class="ambient-orb orb-3" aria-hidden="true"></div>

      <div class="home-layout">
        <!-- Left Column (30%) -->
        <aside class="side-panel">
          <div class="sticky-wrapper">
            <article class="profile-card circuit-card">
              <!-- Card shimmer effect -->
              <div class="card-shimmer" aria-hidden="true"></div>
              <div class="avatar-wrapper">
                <div class="avatar-ring" aria-hidden="true"></div>
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
              <div class="connector-node right"><span class="node-ping" aria-hidden="true"></span></div>
              <!-- Connection line to the central bus -->
              <div class="profile-out-line">
                <span class="line-flow" aria-hidden="true"></span>
              </div>
            </article>
          </div>
        </aside>

        <!-- Right Column (70%) -->
        <main class="main-content">
          <!-- Central Bus Line (Vertical Trunk) -->
          <div class="vertical-bus">
            <span class="bus-flow" aria-hidden="true"></span>
          </div>

          <div class="content-grid">
            <!-- Projects Section -->
            <section v-if="projects.length" class="section-group">
              <h3 class="section-title">
                <span class="section-title-icon" aria-hidden="true">◆</span>
                Projects
              </h3>
              <div class="cards-stack">
                <div 
                  v-for="(project, index) in projects" 
                  :key="project.title"
                  class="card-entry"
                  :style="{ '--entry-delay': index * 0.08 + 's' }"
                >
                  <!-- Branch line from Bus to Card -->
                  <div class="branch-trace">
                    <span class="line-flow" aria-hidden="true"></span>
                  </div>
                  <article
                    class="project-card circuit-card smaller"
                    :class="{ clickable: project.link }"
                    :tabindex="project.link ? 0 : undefined"
                    @click="handleCardClick(project.link)"
                    @keydown.enter.prevent="handleCardClick(project.link)"
                    @keydown.space.prevent="handleCardClick(project.link)"
                  >
                    <div class="card-shimmer" aria-hidden="true"></div>
                    <div class="connector-node left"><span class="node-ping" aria-hidden="true"></span></div>
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
              <h3 class="section-title">
                <span class="section-title-icon" aria-hidden="true">◆</span>
                Achievements
              </h3>
              <div class="cards-stack">
                <div 
                  v-for="(award, index) in awards" 
                  :key="award.title"
                  class="card-entry"
                  :style="{ '--entry-delay': index * 0.08 + 's' }"
                >
                  <div class="branch-trace">
                    <span class="line-flow" aria-hidden="true"></span>
                  </div>
                  <article
                    class="award-card circuit-card smaller"
                    :class="{ clickable: award.link }"
                    :tabindex="award.link ? 0 : undefined"
                    @click="handleCardClick(award.link)"
                    @keydown.enter.prevent="handleCardClick(award.link)"
                    @keydown.space.prevent="handleCardClick(award.link)"
                  >
                    <div class="card-shimmer" aria-hidden="true"></div>
                    <div class="connector-node left"><span class="node-ping" aria-hidden="true"></span></div>
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
/* ========================================
   Design Tokens
   ======================================== */
.talexck-home-container {
  --circuit-line: rgba(120, 120, 140, 0.25);
  --circuit-accent: var(--vp-c-brand);
  --circuit-accent-rgb: 100, 108, 255; /* fallback, override by theme */
  --card-bg: rgba(255, 255, 255, 0.6);
  --card-bg-hover: rgba(255, 255, 255, 0.85);
  --card-border: rgba(120, 120, 140, 0.15);
  --card-border-hover: var(--circuit-accent);
  --card-shadow: 0 4px 24px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.06);
  --card-shadow-hover: 0 12px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.06);
  --bus-gap: 80px;
  --branch-w: 40px;
  --profile-wire-y: 205px;
  --glass-blur: 16px;

  position: relative;
  max-width: 1320px;
  margin: 0 auto;
  padding: 80px 24px;
  box-sizing: border-box;
  overflow: hidden;
}

/* ========================================
   Ambient Background Orbs
   ======================================== */
.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.18;
  pointer-events: none;
  z-index: 0;
  animation: orb-drift 20s ease-in-out infinite alternate;
}
.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, var(--circuit-accent), transparent 70%);
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}
.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #a78bfa, transparent 70%);
  bottom: -80px;
  right: -60px;
  animation-delay: -7s;
}
.orb-3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, #34d399, transparent 70%);
  top: 40%;
  left: 50%;
  animation-delay: -13s;
}

@keyframes orb-drift {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(40px, -30px) scale(1.1); }
}

/* ========================================
   Layout
   ======================================== */
.home-layout {
  display: grid;
  grid-template-columns: 3.2fr 6.8fr;
  gap: var(--bus-gap);
  position: relative;
  z-index: 2;
  align-items: start;
}

/* ========================================
   Glassmorphism Card Base
   ======================================== */
.circuit-card {
  background: var(--card-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--card-border);
  border-radius: 20px;
  padding: 36px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: var(--card-shadow);
  overflow: hidden;
}

.circuit-card.clickable {
  cursor: pointer;
}

.circuit-card.clickable:hover,
.circuit-card.clickable:focus-visible {
  border-color: var(--card-border-hover);
  transform: translateY(-6px);
  box-shadow: var(--card-shadow-hover);
  background: var(--card-bg-hover);
}

.circuit-card.smaller {
  padding: 24px 28px;
}

/* Card shimmer / top-edge highlight */
.card-shimmer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.5) 30%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0.5) 70%,
    transparent
  );
  opacity: 0.6;
  pointer-events: none;
}

/* ========================================
   Left Column – Profile Card
   ======================================== */
.side-panel {
  height: 100%;
}
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
  z-index: 1;
  overflow: hidden;
}

/* ========================================
   Right Column
   ======================================== */
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
  left: calc(var(--branch-w) * -1);
  width: 2px;
  background: var(--circuit-line);
  z-index: 1;
  border-radius: 999px;
  overflow: hidden;
}

/* Flowing light animation on lines */
.line-flow {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.profile-out-line .line-flow,
.branch-trace .line-flow {
  background: linear-gradient(90deg, transparent 0%, var(--circuit-accent) 50%, transparent 100%);
  animation: flow-h 3s ease-in-out infinite;
  opacity: 0;
}

.bus-flow {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: linear-gradient(180deg, transparent 0%, var(--circuit-accent) 50%, transparent 100%);
  animation: flow-v 4s ease-in-out infinite;
  opacity: 0.6;
}

@keyframes flow-h {
  0% { transform: translateX(-100%); opacity: 0; }
  30% { opacity: 0.8; }
  70% { opacity: 0.8; }
  100% { transform: translateX(100%); opacity: 0; }
}

@keyframes flow-v {
  0% { transform: translateY(-100%); opacity: 0; }
  30% { opacity: 0.6; }
  70% { opacity: 0.6; }
  100% { transform: translateY(calc(100vh)); opacity: 0; }
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
  z-index: 1;
  overflow: hidden;
}

/* ========================================
   Connector Nodes (with pulse)
   ======================================== */
.connector-node {
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--circuit-line);
  border: 2px solid var(--card-bg);
  border-radius: 50%;
  z-index: 5;
  transition: all 0.4s ease;
}

.node-ping {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1.5px solid var(--circuit-accent);
  transform: translate(-50%, -50%) scale(1);
  opacity: 0;
  animation: node-pulse 3s ease-out infinite;
  pointer-events: none;
}

@keyframes node-pulse {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(3.5); opacity: 0; }
}

.profile-card .connector-node.right {
  top: var(--profile-wire-y);
  right: -6px;
  transform: translateY(-50%);
}
.connector-node.left {
  top: 50%;
  left: -6px;
  transform: translateY(-50%);
}

.circuit-card:hover .connector-node {
  background: var(--circuit-accent);
  border-color: var(--circuit-accent);
  box-shadow: 0 0 14px rgba(var(--circuit-accent-rgb), 0.5);
}

/* ========================================
   Avatar
   ======================================== */
.avatar-wrapper {
  width: 120px;
  height: 120px;
  border-radius: 24px;
  background: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  position: relative;
}

.avatar-ring {
  position: absolute;
  inset: -3px;
  border-radius: 27px;
  border: 2px solid transparent;
  background: linear-gradient(135deg, var(--circuit-accent), #a78bfa, #34d399) border-box;
  -webkit-mask:
    linear-gradient(#fff 0 0) padding-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.profile-card:hover .avatar-ring {
  opacity: 1;
}

.avatar {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

/* ========================================
   Typography
   ======================================== */
.name {
  margin: 0;
  font-size: 32px;
  font-weight: 800;
  color: var(--vp-c-text-1);
  letter-spacing: -0.02em;
}

.role {
  font-size: 13px;
  color: var(--circuit-accent);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin: 14px 0 18px;
  padding: 4px 14px;
  border-radius: 20px;
  background: rgba(var(--circuit-accent-rgb), 0.08);
  display: inline-block;
}

.description {
  font-size: 15px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 24px;
}

/* ========================================
   Social Links
   ======================================== */
.social-links {
  display: flex;
  gap: 14px;
}

.link-item {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.link-item:hover {
  border-color: var(--circuit-accent);
  background: rgba(var(--circuit-accent-rgb), 0.08);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--circuit-accent-rgb), 0.15);
}

.social-svg {
  width: 22px;
  height: 22px;
  opacity: 0.75;
  transition: opacity 0.3s ease;
}

.link-item:hover .social-svg {
  opacity: 1;
}

/* ========================================
   Section
   ======================================== */
.section-group {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-title {
  font-size: 12px;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  margin-left: 12px;
  letter-spacing: 0.16em;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title-icon {
  font-size: 8px;
  color: var(--circuit-accent);
  opacity: 0.7;
}

.cards-stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ========================================
   Card Content
   ======================================== */
.card-header {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 4px;
}

.index {
  font-size: 13px;
  font-weight: 700;
  color: var(--circuit-accent);
  font-variant-numeric: tabular-nums;
  opacity: 0.7;
}

.category {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-3);
}

.eyebrow {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}

.title {
  font-size: 22px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 10px;
  letter-spacing: -0.01em;
  transition: color 0.3s ease;
}

.circuit-card.clickable:hover .title {
  color: var(--circuit-accent);
}

.summary {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 18px;
}

/* ========================================
   Tags
   ======================================== */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 11px;
  padding: 4px 12px;
  border-radius: 20px;
  background: rgba(var(--circuit-accent-rgb), 0.06);
  border: 1px solid rgba(var(--circuit-accent-rgb), 0.12);
  color: var(--vp-c-text-2);
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: all 0.3s ease;
}

.circuit-card:hover .tag {
  border-color: rgba(var(--circuit-accent-rgb), 0.25);
  background: rgba(var(--circuit-accent-rgb), 0.1);
}

/* ========================================
   Badge
   ======================================== */
.badge {
  display: inline-flex;
  align-items: center;
  background: rgba(var(--circuit-accent-rgb), 0.08);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  color: var(--circuit-accent);
  border: 1px solid rgba(var(--circuit-accent-rgb), 0.15);
  letter-spacing: 0.06em;
}

/* ========================================
   Footer / Blog Button
   ======================================== */
.footer-actions {
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 56px;
  position: relative;
  z-index: 2;
}

.blog-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 32px;
  background: linear-gradient(135deg, var(--circuit-accent), #a78bfa);
  color: white !important;
  border-radius: 14px;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none !important;
  letter-spacing: 0.06em;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 4px 20px rgba(var(--circuit-accent-rgb), 0.25);
  position: relative;
  overflow: hidden;
}

.blog-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.blog-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 32px rgba(var(--circuit-accent-rgb), 0.35);
}

.blog-button:hover::before {
  transform: translateX(100%);
}

.blog-button svg {
  transition: transform 0.3s ease;
}

.blog-button:hover svg {
  transform: translateX(4px);
}

/* ========================================
   Responsive
   ======================================== */
@media (max-width: 960px) {
  .talexck-home-container {
    padding: 40px 16px;
  }
  .home-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .connector-node,
  .vertical-bus,
  .branch-trace,
  .card-entry::before,
  .profile-out-line {
    display: none;
  }
  .ambient-orb {
    opacity: 0.1;
  }
}

/* ========================================
   Dark Mode Overrides
   ======================================== */
:global(html.dark) .talexck-home-container {
  --circuit-line: rgba(255, 255, 255, 0.1);
  --card-bg: rgba(30, 30, 40, 0.6);
  --card-bg-hover: rgba(35, 35, 50, 0.8);
  --card-border: rgba(255, 255, 255, 0.08);
  --card-shadow: 0 4px 24px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.3);
  --card-shadow-hover: 0 12px 40px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.25);
}

:global(html.dark) .card-shimmer {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.06) 30%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(255, 255, 255, 0.06) 70%,
    transparent
  );
  opacity: 1;
}

:global(html.dark) .ambient-orb {
  opacity: 0.08;
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .ambient-orb,
  .bus-flow,
  .line-flow,
  .node-ping {
    animation: none !important;
  }
  .circuit-card,
  .blog-button,
  .link-item {
    transition: none !important;
  }
}
</style>
