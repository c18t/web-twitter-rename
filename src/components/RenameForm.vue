<template>
  <!--
    .rename-form>(input[v-model=newName :placeholder=placeholder type=text maxlength=38 size=70]+button[@click=emitNewName]{変更})
  -->
  <div class="rename-form">
    <input
      v-model="newName"
      :placeholder="placeholder"
      type="text"
      maxlength="38"
      size="70"
    />
    <button @click="emitNewName">変更</button>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, Ref } from '@vue/composition-api'

export default createComponent({
  props: {
    screenName: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const errorEmptyName: string = '新しい名前を入力してください'
    const errorRenameFailed: string = '名前の変更に失敗しました…'

    const basePath: string = process.env.basePath || ''
    const newName: Ref<string> = ref('')
    const placeholder: string = `Input new ${props.screenName}'s name`

    return {
      newName,
      placeholder,
      emitNewName
    }

    async function emitNewName(): Promise<void> {
      if (newName.value === '') {
        alert(errorEmptyName)
        return
      }

      // api send
      const res = await fetch(`${basePath}/api/emit_new_name`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({ name: newName.value })
      })

      // show result
      if (res.status === 201) {
        const ref = document.location.href
        const text = `@${props.screenName} の名前は「${newName.value}」とします！`
        const encodedText = encodeURIComponent(text)
        const href = `https://twitter.com/intent/tweet?original_referer=${ref}&ref_src=twsrc%5Etfw&text=${encodedText}&tw_p=tweetbutton&url=${ref}`
        const features =
          'width=500,height=400,menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes'
        window.open(href, undefined, features)
      } else {
        alert(errorRenameFailed)
      }
    }
  }
})
</script>

<style lang="stylus" scoped>
.rename-form {
  display: inline;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0.25rem;

  input, button {
    border: 1px solid #aaa;
    line-height: 2rem;
    font-size: 1.2rem;
  }

  input {
    width: 38 * 1.2rem;
    border-radius: 12px 0 0 12px;
    padding: 8px;
    padding-left: 10px;
  }

  button {
    border-radius: 0 12px 12px 0;
    border-left: none;
    padding: 8px 12px;
    padding-right: 15px;
  }
}
</style>
