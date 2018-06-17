<template>
  <div class="rename-form">
    <input type="text" placeholder="Input new c18t's name" id="newName" maxlength="38" size="70" value="" /><button @click="emitNewName">変更</button>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue
} from 'nuxt-property-decorator'
import axios from 'axios'

@Component({ name: 'RenameForm' })
export default class RenameForm extends Vue {
  static errorEmptyName : string = '新しい名前を入力してください'

  async emitNewName() {
    const el = document.getElementById('newName') as HTMLInputElement
    if (el.value === '') alert(RenameForm.errorEmptyName)

    let newName = el.value;

    // api send
    const res = await axios.post(
      './api/emit_new_name',
      { name: newName }
    )

    // show result
    console.log(res)
    if (res.status === 201) {
      let ref = document.location.href
      let text = `@c18t の名前は「${newName}」とします！`
      let encodedText = encodeURIComponent(text)
      let href = `https://twitter.com/intent/tweet?original_referer=${ref}&ref_src=twsrc%5Etfw&text=${encodedText}&tw_p=tweetbutton&url=${ref}`
      let features = "width=500,height=400,menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes";
      window.open(href, undefined, features)
    }
    else {
      alert('名前の変更に失敗しました…')
    }
  }
}
</script>

<style lang="stylus" scoped>
.rename-form {
  display: inline
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif
  margin: 0.25rem


  input, button {
    border: 1px solid #aaa
    line-height: 2rem
    font-size: 1.2rem
  }

  input {
    border-radius: 12px 0 0 12px
    padding: 8px
    padding-left: 10px
  }
  button {
    border-radius: 0 12px 12px 0
    border-left: none
    padding: 8px 12px
    padding-right: 15px
  }

}

</style>
