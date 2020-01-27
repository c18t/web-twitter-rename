<template>
  <!--
    section
      >(h1.header>({@}+a[:href=twitterHomeUrl]{{{screenName}}}+{'s Tweitter Rename})
      +.body
        >(p>({@}+a[:href=twitterHomeUrl]{{{:screenName}}}+{の名前は})
        +.rename-form-wapper
          >({{{:namePrefix}}}+RenameForm)
        +p{{とします！}}
  -->
  <section>
    <GitHubCorner :repository-url="repositoryUrl" />
    <h1 class="header">
      @<a :href="twitterHomeUrl">{{ screenName }}</a
      >'s Twitter Rename
    </h1>
    <div class="body">
      <p>
        @<a :href="twitterHomeUrl">{{ screenName }}</a
        >の名前は
      </p>
      <div class="rename-form-wapper">
        <RenameForm :screen-name="screenName" />
      </div>
      <p>とします！</p>
    </div>
    <TweetButton :tweet-text="tweetText" />
  </section>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import GitHubCorner from '~/components/GitHubCorner.vue'
import RenameForm from '~/components/RenameForm.vue'
import TweetButton from '~/components/TweetButton.vue'

export default createComponent({
  components: {
    GitHubCorner,
    RenameForm,
    TweetButton
  },

  setup() {
    const repositoryUrl = process.env.npm_package_homepage || ''
    const screenName = process.env.screenName || ''
    const tweetText = process.env.tweetText || ''
    return {
      repositoryUrl,
      screenName,
      tweetText,
      twitterHomeUrl: `https://twitter.com/${screenName}`
    }
  }
})
</script>

<style lang="stylus" scoped>
.header {
  margin: 4rem 2rem 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.body {
  margin: 0 2rem;

  .rename-form-wapper {
    margin: 0 2rem;
  }
}
</style>
