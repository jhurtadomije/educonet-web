<template>
  <div>
    <HeroSection @navigate="$emit('navigate', $event)" />
    <FeaturedServices />
    <CustomSolutions @navigate="$emit('navigate', $event)" />
    <MissionSection @navigate="$emit('navigate', $event)" />
    <SupportBanner @navigate="$emit('navigate', $event)" />
  </div>
</template>

<script setup>
import HeroSection from './HeroSection.vue'
import FeaturedServices from './FeaturedServices.vue'
import CustomSolutions from './CustomSolutions.vue'
import MissionSection from './MissionSection.vue'
import SupportBanner from './SupportBanner.vue'

defineEmits(['navigate'])
</script>