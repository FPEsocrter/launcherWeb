import { defineStore } from 'pinia'
import { BaseInitApi } from '@/service/profile/communal'
import { BASE_URL } from '@/environment'
const useInit = defineStore({
  id: 'init',
  state: () => ({
    initInfo: undefined
  }),

  actions: {
    async setInitInfo() {
      const res = await BaseInitApi()
      res.data.systemLogo = `${BASE_URL}/images/${res.data.systemLogo}?v=${Date.now()}`
      this.initInfo = res.data
      document.title = res.data.systemName
      let favicon = document.querySelector('link[rel="icon"]')
      if (favicon !== null) favicon.href = `${BASE_URL}/static/images/logo.png?v=${Date.now()}`
    }
  }
})

export { useInit }
