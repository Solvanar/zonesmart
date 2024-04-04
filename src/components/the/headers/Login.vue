<template lang="pug">
  .login
    .logo
      img(:src="FullIcon" width="243px" height="30px")
    .profile Поддержка
      img(:src="TelegramIcon" width="24px" height="24px")
      img(:src="WhatsappIcon" width="24px" height="24px")
</template>

<script lang="ts">
import FullIcon from '../../../assets/icons/full.svg'
import TelegramIcon from '../../../assets/icons/telegram.svg'
import WhatsappIcon from '../../../assets/icons/whatsapp.svg'
export default {
  name: "Login",
  data() {
    return {
      TelegramIcon,
      WhatsappIcon,
      FullIcon,
    }
  }
}
</script>

<style scoped lang="sass">
.login
  padding: 50px 30px
  background-color: transparent

  .profile
    display: flex
    gap: 10px
</style>