<template>
    <article class="post">
      <h4>{{activity.title | uppercase}}</h4>
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
              <a href="#">Filip Jerga</a> updated {{activity.updatedAt | prettyTime}}
            </p>
          </div>
        </div>
        <div class="media-right">
          <span>Progress: <span
          :class="'color-'+activityProgress"
          >{{ activity.progress }}%</span></span>
        </div>
      </div>
    </article>
</template>

<script>
import textUtility from '@/mixins/textUtility';

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
    computed: {
      activityProgress () {
        if(!this.activity.progress) return 'red';
        else if (this.activity.progress > 0 && this.activity.progress <= 50) return 'orange';
        else return 'green';
      }
    }
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
  
</style>

