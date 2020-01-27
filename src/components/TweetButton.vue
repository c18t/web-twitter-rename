<template>
  <!--
    a.twitter-share-button[:data-text=tweetText href=https://twitter.com/share?ref_src=twsrc%5Etfw data-show-count=false]{Tweet}
  -->
  <a
    :data-text="tweetText"
    href="https://twitter.com/share?ref_src=twsrc%5Etfw"
    class="twitter-share-button"
    data-show-count="false"
    >Tweet</a
  >
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  head: {
    script: [
      {
        async: true,
        body: true,
        charset: 'utf-8',
        src: 'https://platform.twitter.com/widgets.js'
      }
    ]
  },
  props: {
    tweetText: {
      type: String,
      required: true
    }
  }
})
</script>
