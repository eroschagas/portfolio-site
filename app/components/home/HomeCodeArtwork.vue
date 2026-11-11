<template>
  <div class="code-art" aria-hidden="true">
    <div class="code-art__orbit"></div>
    <div class="code-window">
      <div class="code-window__bar">
        <span>● ● ●</span><span>about-me.ts</span><span>↗</span>
      </div>
      <div class="code-window__body">
        <p class="code-window__comment">{{ t.codeComment }}</p>
        <p><b>const</b> developer = {</p>
        <p class="code-window__indent">
          name: <em>'{{ profile.name }}'</em>,
        </p>
        <p class="code-window__indent">
          role: <em>'{{ t.codeRole }}'</em>,
        </p>
        <p class="code-window__indent">
          stack: [<em>'Vue', 'Nuxt', 'React', 'TS'</em>],
        </p>
        <p class="code-window__indent">
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
</template>
<script setup lang="ts">
import { profile } from "~/data/profile";
const { t } = usePortfolio();
</script>
<style scoped lang="scss">
.code-art {
  position: relative;
  min-width: 0;
  padding: 48px 0;
}
.code-art__orbit {
  position: absolute;
  inset: -25px -12px;
  border: 1px solid #272e22;
  border-radius: 50%;
  background: radial-gradient(ellipse, #b3e87708, transparent 68%);
}
.code-art__orbit:after {
  content: "";
  position: absolute;
  inset: 30px -15px;
  border: 1px dashed #303a28;
  border-radius: 50%;
}
.code-window {
  position: relative;
  z-index: 1;
  border: 1px solid #3a4332;
  border-radius: 10px;
  background: #191d17;
  box-shadow: 0 24px 70px #0004;
  transform: rotate(-3deg);
}
.code-window__bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #30372a;
  color: #7f8b75;
  font: 10px monospace;
}
.code-window__bar > span:first-child {
  color: var(--accent);
  font-size: 8px;
  letter-spacing: 3px;
}
.code-window__body {
  overflow-wrap: anywhere;
  font: clamp(10px, 1vw, 13px) / 2.2 monospace;
  padding: 25px 20px;
  color: #c7cebd;
}
.code-window__comment {
  color: #8a987d;
  margin-bottom: 13px;
}
.code-window b {
  font-weight: 400;
  color: #ceb1df;
}
.code-window em {
  font-style: normal;
  color: #c4e993;
}
.code-window strong {
  font-weight: 400;
  color: #a7c4e2;
}
.code-window__indent {
  padding-left: 16px;
}
.code-art__tag {
  position: absolute;
  z-index: 2;
  right: -12px;
  bottom: 24px;
  padding: 12px 18px;
  background: var(--accent);
  color: #26301b;
  font: 12px monospace;
  transform: rotate(5deg);
  border-radius: 4px;
}
.code-art__number {
  position: absolute;
  top: 0;
  right: 8px;
  font: 10px monospace;
  color: #94a584;
}
@media (max-width: 1000px) {
  .code-window__body {
    padding: 20px 12px;
    font-size: 10px;
  }
}
@media (max-width: 767px) {
  .code-art {
    width: 90%;
    max-width: 420px;
    margin: 10px auto 25px;
    padding: 35px 0;
  }
  .code-window__body {
    font-size: clamp(10px, 2.8vw, 12px);
    padding: 20px 16px;
  }
  .code-art__orbit {
    inset: -5px 0;
  }
}
</style>
