<template>
  <section>
    <h1 class="header">@<a href="https://twitter.com/c18t">c18t</a>のTwitterリネームくん</h1>
    <div class="body">
      <p>@<a href="https://twitter.com/c18t">c18t</a>の名前は</p>
      <div class="rename-form-wapper">(/ɯ̹t͡ɕʲi/) <RenameForm /></div>
      <p>とします！</p>
    </div>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator"
import RenameForm from "~/components/RenameForm.vue"

@Component({
  components: {
    RenameForm
  }
})
export default class extends Vue {
}
</script>
<style lang="stylus" scoped>
.header {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif
}
.body {
  .rename-form-wapper {
    margin: 0 2rem
  }
}
</style>