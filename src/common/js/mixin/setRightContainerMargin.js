import {mapGetters} from 'vuex'
export const marginMixin = {
    computed: {
        ...mapGetters([
            'collapse'
        ])
    },
    created() {
        this.$nextTick(() => {
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
            this.setMargin()
        }
    }
}
