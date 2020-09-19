<template>
  <iframe id="calendar" :src="url" frameborder="0" scrolling="no"></iframe>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class About extends Vue {
  url = 'https://calendar.google.com/calendar/embed?src=tvvjrb7ummk6c42rkv2c33br3k%40group.calendar.google.com&color=%230F4B38&ctz=Europe%2FVienna'
}
</script>

<style lang="scss">
#calendar {
  border: 0;
  width: 100%;
  height: 100%;
  min-height: 390px;
  max-height: 640px;
}
</style>
