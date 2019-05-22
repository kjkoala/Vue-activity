<template>
  <div>
  <ActivityItemUpdate 
    v-if="isUpdateActive"
    :activity="activity"
    :category="category"
    @toggleUpdate="changeUpdateState"
  />
    <ActivityItemDetail 
    v-else
  :activity="activity"
  :category="category"
  @toggleUpdate="changeUpdateState"
  />
  </div>
</template>

<script>
import ActivityItemDetail from './ActivityItemDetail'
import ActivityItemUpdate from './ActivityItemUpdate'
export default {
  components: {
    ActivityItemDetail,
    ActivityItemUpdate
  },
  props: {
    activity: {
      type: Object,
      required: true
    },
    category: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isUpdateActive: false
    }
  },
  methods: {
    changeUpdateState (isUpdate) {
      this.isUpdateActive = isUpdate
    }
  }
}
</script>