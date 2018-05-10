import {mapGetters} from 'vuex'
export const marginMixin = {
  computed: {
    ...mapGetters([
      'collapse'
    ])
  },
  created() {
    this.flag = true
    this.$nextTick(() => {
      this.$refs.rightContainer.style.transition = 'margin 0 linear'
      this.setMargin()
    })
  },
  methods: {
    setMargin() {
      if (this.collapse) {
        this.$refs.rightContainer.style.marginLeft = '0'
      } else {
        this.$refs.rightContainer.style.marginLeft = '200px'
      }
    }
  },
  watch: {
    collapse() {
      if (this.flag) {
        this.$refs.rightContainer.style.transition = 'margin .3s linear'
        this.flag = false
      }
      this.setMargin()
    }
  }
}
