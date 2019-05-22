<template>
    <article class="post">
      <div class="activity-title-wrapper">
        <h4 class="activity-title">{{ activity.title | uppercase }}</h4>
        <i class="fas fa-cog activity-settings" @click="isMenuDisplayed = !isMenuDisplayed" />
      </div>
      <p>{{ textUtility_capitalize(category[activity.category].text)  }}</p>
      <p>{{ activity.notes }}</p>
      <div class="media">
        <div class="media-left">
          <p class="image is-32x32">
            <img src="@/assets/user.png">
          </p>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <a :href="userName.id">{{ userName.name }}</a> updated {{activity.updatedAt | prettyTime}}
            </p>
          </div>
        </div>
        <div class="media-right">
          <span>Progress: <span
          :class="'color-'+activityProgress"
          >{{ activity.progress }}%</span></span>
        </div>
      </div>
      <div v-if="isMenuDisplayed" class="activity-controll">
        <a class="button is-warning" @click="$emit('toggleUpdate', true)">Edit</a>
        <a class="button is-danger" @click="deleteActivity">Delete</a>
      </div>
    </article>
</template>

<script>
import textUtility from '@/mixins/textUtility';
import store from '@/store';

export default {
  mixins: [textUtility],
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
        isMenuDisplayed: false,
      }
    },
    computed: {
      activityProgress () {
        if(!this.activity.progress) return 'red';
        else if (this.activity.progress > 0 && this.activity.progress <= 50) return 'orange';
        else return 'green';
      },
      userName () {
        return store.fetchUser();
      }
    },
    methods: {
      deleteActivity () {
       store.deleteActivity(this.activity); 
      }
    },
}
</script>

<style scope>
.color-red {
  color:red;
}

.color-orange {
  color: orange
}

.color-green {
  color: green;
}

.content h4 {
  margin-bottom:5px;
}
.activity-title {
  margin-bottom: 5px;
}
.activity-settings {
  float: right;
  font-size: 22px;
}

.activity-settings:hover {
  cursor:pointer;
}
.activity-controll a{
  margin: 20px 0 0 0;
  margin-right: 5px;
}
.post .title {
  margin-bottom: 5px;
}
</style>

