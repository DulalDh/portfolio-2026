<template>
  <div class="flex flex-col items-center justify-center gap-4 py-16">
    <div class="relative w-10 h-10">
      <div class="absolute inset-0 rounded-full border-2 dark:border-slate-700 border-slate-200" />
      <div class="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500 border-r-cyan-400 animate-spin" />
    </div>
    <span class="text-sm dark:text-slate-500 text-slate-400 font-medium">{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, default: 'Loading…' },
})
</script>
