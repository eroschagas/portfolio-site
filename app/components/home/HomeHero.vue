<template>
  <section class="hero">
    <div class="hero__content">
      <p class="eyebrow"><i></i>{{ t.eyebrow }}</p>
      <p class="hero__hello">
        {{ t.hello }} {{ profile.name }}. <span>↗</span>
      </p>
      <h1>
        {{ t.headline }}<br /><span>{{ t.accent }}</span>
      </h1>
      <p class="hero__description">{{ t.intro }}</p>
      <div class="hero__actions">
        <a class="button" href="#explore">{{ t.explore }} <span>↗</span></a
        ><a class="text-link" href="#about">{{ t.aboutLink }} ↓</a>
      </div>
    </div>
    <div class="code-art" aria-hidden="true">
      <div class="code-art__orbit"></div>
      <div class="code-window">
        <div class="code-window__bar">
          <span>● ● ●</span><span>about-me.ts</span><span>↗</span>
        </div>
        <div class="code-window__body">
          <p class="code-comment">{{ t.codeComment }}</p>
          <p><b>const</b> developer = {</p>
          <p class="code-indent">
            name: <em>'{{ profile.name }}'</em>,
          </p>
          <p class="code-indent">
            role: <em>'{{ t.codeRole }}'</em>,
          </p>
          <p class="code-indent">stack: [<em>'Vue', 'Nuxt', 'React', 'TS'</em>],</p>
          <p class="code-indent">
            learning: <em>'{{ t.codeLearning }}'</em>
          </p>
          <p>}</p>
          <br />
          <p>developer.<strong>build</strong>(<em>'what’s next'</em>)</p>
        </div>
      </div>
      <span class="code-art__tag">&lt; curiosity /&gt;</span
      ><span class="code-art__number">01 — ∞</span>
    </div>
    <a href="#about" class="hero__scroll"
      >↓ <span>{{ t.scroll }}</span></a
    >
  </section>
</template>

<script setup lang="ts">
import { profile } from "~/data/profile";
const { t } = usePortfolio();
</script>
