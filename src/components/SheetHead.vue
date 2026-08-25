<script setup>
defineProps({
  n: { type: String, required: true },
  label: { type: String, required: true },
  count: { type: String, default: '' },
})
</script>

<template>
  <div class="sheet-head" v-reveal>
    <span class="sheet-head__num">§ {{ n }}</span>
    <span class="sheet-head__label">{{ label }}</span>
    <span class="sheet-head__rule" aria-hidden="true" />
    <span v-if="count" class="sheet-head__count">{{ count }}</span>
  </div>
</template>
