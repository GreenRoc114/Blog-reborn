<script lang="ts">
import type { LIGHT_DARK_MODE } from '@/types/config.ts'
import { AUTO_MODE, DARK_MODE, LIGHT_MODE } from '@constants/constants.ts'
import Icon from '@iconify/svelte'
import {
  applyThemeToDocument,
  getStoredTheme,
  setTheme,
} from '@utils/setting-utils.ts'
import { onMount } from 'svelte'

let mode: LIGHT_DARK_MODE = $state(LIGHT_MODE)

onMount(() => {
  const stored = getStoredTheme()
  if (stored === AUTO_MODE) {
    mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK_MODE : LIGHT_MODE
  } else {
    mode = stored
  }
  applyThemeToDocument(mode)

  const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)')
  const changeThemeWhenSchemeChanged = (e: MediaQueryListEvent) => {
    const current = getStoredTheme()
    if (current === AUTO_MODE) {
      mode = e.matches ? DARK_MODE : LIGHT_MODE
      applyThemeToDocument(mode)
    }
  }
  darkModePreference.addEventListener('change', changeThemeWhenSchemeChanged)
  return () => {
    darkModePreference.removeEventListener(
      'change',
      changeThemeWhenSchemeChanged,
    )
  }
})

function switchScheme(newMode: LIGHT_DARK_MODE) {
  mode = newMode
  setTheme(newMode)
}

function toggleScheme() {
  if (mode === LIGHT_MODE) {
    switchScheme(DARK_MODE)
  } else {
    switchScheme(LIGHT_MODE)
  }
}
</script>

<!-- Minimalist Flat Pill Theme Toggle Switch -->
<div class="relative flex items-center justify-center p-2 select-none" role="menu" tabindex="-1">
  <button 
    aria-label="Toggle Light/Dark Theme" 
    onclick={toggleScheme} 
    class="relative w-12 h-6.5 rounded-full bg-[#E8DFC7] dark:bg-[#2A2A28] border border-black/[0.05] dark:border-white/[0.08] transition-colors duration-300 focus:outline-none cursor-pointer flex items-center shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
  >
    <!-- Background slot icons -->
    <div class="absolute left-1.5 text-[0.7rem] text-[#8E887B]/60 dark:text-neutral-500 pointer-events-none">
      <Icon icon="material-symbols:wb-sunny-rounded" />
    </div>
    <div class="absolute right-1.5 text-[0.7rem] text-[#8E887B]/60 dark:text-neutral-500 pointer-events-none">
      <Icon icon="material-symbols:dark-mode-rounded" />
    </div>
    
    <!-- Flat sliding circular handle -->
    <div 
      class="w-5 h-5 rounded-full bg-[#FAF9F6] border border-black/[0.05] dark:border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out transform flex items-center justify-center"
      class:translate-x-0.5={mode === LIGHT_MODE}
      class:translate-x-[24px]={mode !== LIGHT_MODE}
    >
      <!-- Subtle dot center indicator -->
      <div class="w-1 h-1 rounded-full bg-[#C2522D] dark:bg-neutral-400 opacity-60"></div>
    </div>
  </button>
</div>
