<template>
    <div>
        <nav class="navbar is-white topNav">
        <div class="container">
          <div class="navbar-brand">
            <h1>Activity Planner</h1>
          </div>
        </div>
      </nav>
      <nav class="navbar is-white">
        <div class="container">
          <div class="navbar-menu is-active">
            <div class="navbar-start">
              <a class="navbar-item" :class="{'is-active': filterOption == 'all'}" @click="emitFilter('all')">All</a>
              <a class="navbar-item" :class="{'is-active': filterOption == 'progress'}"  @click="emitFilter('progress')">In Progress</a>
              <a class="navbar-item" :class="{'is-active': filterOption == 'finished'}"  @click="emitFilter('finished')">Finished</a>
              <a class="navbar-item" :class="{'is-active': filterOption == 'notstarted'}"  @click="emitFilter('notstarted')">Not started</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
</template>

<script>
export default {
  data () {
    return {
      filterOption: 'all'
    }
  },
  methods: {
    emitFilter (filterOption) {
      this.filterOption = filterOption;
      this.$emit('filterSelected', filterOption)
    }
  }
}
</script>
