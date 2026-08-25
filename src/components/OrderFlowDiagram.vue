<script setup>
/**
 * The order/return state machine from the marketplace project, drawn to scale.
 * Every transition shown here is one the FSM guard actually permits.
 */
const happy = [
  { x: 20,  label: 'Placed' },
  { x: 190, label: 'Confirmed' },
  { x: 360, label: 'Packed' },
  { x: 530, label: 'Shipped' },
  { x: 700, label: 'Delivered' },
]

const terminal = [
  { x: 190, label: 'Cancelled', note: 'refund queued' },
  { x: 530, label: 'Returned',  note: 'pickup raised' },
  { x: 700, label: 'Refunded',  note: 'bank / UPI logged' },
]
</script>

<template>
  <figure class="diagram">
    <figcaption class="diagram__cap">
      <span class="mono-label">Fig. 01</span>
      <span>Order and return state machine — guarded transitions only</span>
    </figcaption>

    <div class="diagram__scroll">
      <svg viewBox="0 0 830 260" role="img" class="diagram__svg"
           aria-label="State diagram: an order moves from Placed to Confirmed, Packed, Shipped and Delivered. Confirmed can move to Cancelled. Delivered can move to Returned, and Returned to Refunded. Cancelled also leads to Refunded.">
        <defs>
          <marker id="arw" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" class="d-arrow" />
          </marker>
          <marker id="arw-a" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" class="d-arrow d-arrow--alt" />
          </marker>
        </defs>

        <!-- Happy path connectors -->
        <g class="d-link">
          <line v-for="(s, i) in happy.slice(0, -1)" :key="`h${i}`"
                :x1="s.x + 110" y1="46" :x2="happy[i + 1].x - 4" y2="46"
                marker-end="url(#arw)" />
        </g>

        <!-- Branch connectors -->
        <g class="d-link d-link--alt">
          <!-- Confirmed → Cancelled -->
          <path d="M245 76 L245 160" marker-end="url(#arw-a)" />
          <!-- Shipped/Delivered → Returned -->
          <path d="M585 76 L585 160" marker-end="url(#arw-a)" />
          <!-- Cancelled → Refunded -->
          <path d="M300 190 L696 190" marker-end="url(#arw-a)" />
          <!-- Returned → Refunded -->
          <path d="M640 190 L696 190" />
        </g>

        <!-- Happy path nodes -->
        <g>
          <g v-for="s in happy" :key="s.label">
            <rect :x="s.x" y="24" width="110" height="44" rx="2" class="d-node" />
            <text :x="s.x + 55" y="51" class="d-text">{{ s.label }}</text>
          </g>
        </g>

        <!-- Terminal nodes -->
        <g>
          <g v-for="s in terminal" :key="s.label">
            <rect :x="s.x" y="168" width="110" height="44" rx="2" class="d-node d-node--alt" />
            <text :x="s.x + 55" y="195" class="d-text d-text--alt">{{ s.label }}</text>
            <text :x="s.x + 55" y="230" class="d-note">{{ s.note }}</text>
          </g>
        </g>
      </svg>
    </div>
  </figure>
</template>

<style scoped>
.diagram {
  margin: 0;
  border: 1px solid var(--rule);
  background: var(--paper-raised);
}

.diagram__cap {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.85rem;
  padding: 0.9rem 1.15rem;
  border-bottom: 1px solid var(--rule);
  font-size: 0.82rem;
  color: var(--ink-3);
}

.diagram__scroll {
  overflow-x: auto;
  padding: 1.5rem 1.15rem;
}

.diagram__svg {
  width: 100%;
  min-width: 720px;
  height: auto;
}

.d-node {
  fill: var(--paper);
  stroke: var(--ink);
  stroke-width: 1.2;
}

.d-node--alt {
  fill: var(--accent-wash);
  stroke: var(--accent);
  stroke-dasharray: 4 3;
}

.d-text {
  fill: var(--ink);
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 500;
  text-anchor: middle;
}
.d-text--alt { fill: var(--accent); }

.d-note {
  fill: var(--ink-3);
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-anchor: middle;
}

.d-link line, .d-link path {
  stroke: var(--ink-3);
  stroke-width: 1.2;
  fill: none;
}

.d-link--alt line, .d-link--alt path {
  stroke: var(--accent);
  stroke-dasharray: 4 3;
}

.d-arrow { fill: var(--ink-3); }
.d-arrow--alt { fill: var(--accent); }
</style>
