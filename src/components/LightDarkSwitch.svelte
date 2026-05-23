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

<!-- Skeuomorphic Physical Toggle Switch -->
<div class="relative flex items-center justify-center p-1 select-none" role="menu" tabindex="-1">
  <!-- Metallic outer plate -->
  <div class="relative w-12 h-14 rounded-lg bg-gradient-to-b from-[#FAF8F5] to-[#EAE6DB] dark:from-[#2B2B29] dark:to-[#1C1C1A] border border-[#D5CFBF] dark:border-[#121211] shadow-[0_3px_6px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] flex items-center justify-center">
    
    <!-- Mini indicators inside plate -->
    <div class="absolute top-1 text-[9px] text-[#A69F8E] dark:text-[#5C5C58] font-bold">L</div>
    <div class="absolute bottom-0.5 text-[9px] text-[#A69F8E] dark:text-[#5C5C58] font-bold">D</div>

    <!-- Screws in corner for industrial physical look -->
    <div class="absolute top-1 left-1 w-1 h-1 rounded-full bg-[#B0AAA0] dark:bg-[#3E3E3C] shadow-inner"></div>
    <div class="absolute top-1 right-1 w-1 h-1 rounded-full bg-[#B0AAA0] dark:bg-[#3E3E3C] shadow-inner"></div>
    <div class="absolute bottom-1.5 left-1 w-1 h-1 rounded-full bg-[#B0AAA0] dark:bg-[#3E3E3C] shadow-inner"></div>
    <div class="absolute bottom-1.5 right-1 w-1 h-1 rounded-full bg-[#B0AAA0] dark:bg-[#3E3E3C] shadow-inner"></div>

    <!-- Vertical slot (recessed depth) -->
    <button 
      aria-label="Toggle Light/Dark Theme" 
      onclick={toggleScheme} 
      class="w-3.5 h-8 rounded-full bg-[#141413] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.2)] dark:shadow-[inset_0_2px_5px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.05)] relative focus:outline-none cursor-pointer overflow-visible"
    >
      <!-- The physical lever/knob -->
      <div 
        class="absolute left-[-5px] w-6 h-6 rounded-full bg-gradient-to-b from-[#FAF9F6] to-[#C8C2B3] dark:from-[#6A6A67] dark:to-[#3A3A37] border border-[#AFA99B] dark:border-[#1E1E1C] shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1.5px_0_rgba(255,255,255,0.9)] dark:shadow-[0_3px_5px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 ease-out transform flex items-center justify-center cursor-pointer"
        class:top-[-4px]={mode === LIGHT_MODE}
        class:top-[12px]={mode !== LIGHT_MODE}
      >
        <!-- Metallic reflection shine -->
        <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/50"></div>
        <!-- Center mechanical dimple/pin -->
        <div class="w-1.5 h-1.5 rounded-full bg-[#8E887B] dark:bg-[#20201F] shadow-[inset_0_0.5px_1px_rgba(0,0,0,0.4)]"></div>
      </div>
    </button>
  </div>
</div>
