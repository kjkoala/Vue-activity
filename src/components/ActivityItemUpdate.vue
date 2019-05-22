<template>
     <article class="post">
    <div class="activity-title">
      <!-- TODO: Add v-model -->
      <i class="fas fa-cog activity-settings" @click="isMenuDisplayed = !isMenuDisplayed" />
      <input v-model="modifiedActivity.title" type="text" class="input">
    </div>
    <div class="activity-category">
      <!-- TODO: add v-model and iterate categories in option  -->
      <select v-model="modifiedActivity.category" class="select">
        <option disabled value="">Please select one</option>
        <option v-for="cat in category"
                :key="cat.id"
                :value="cat.id">{{ cat.text }}</option>
      </select>
    </div>
    <div class="control activity-notes">
      <!-- TODO: Add v-model here -->
      <textarea v-model="modifiedActivity.notes"
                class="textarea"
                placeholder="Write some notes here" />
    </div>
    <div class="media">
      <div class="media-left">
        <p class="image is-32x32">
          <img src="../assets/user.png">
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="#">Filip Jerga</a> updated {{ modifiedActivity.updatedAt | prettyTime }} &nbsp;
          </p>
        </div>
      </div>
      <div class="media-right">
        <!-- TODO: Add v-model here -->
        <input id="progress"
               v-model.number="modifiedActivity.progress"
               type="range"
               name="progress"
               min="0" max="100" value="90" step="10">
        <label for="progress">{{ modifiedActivity.progress }} %</label>
      </div>
    </div>
    <div v-if="!isMenuDisplayed" class="activity-controll">
      <!-- TODO: create function 'updateActivity' to console log 'activity' -->
      <a class="button is-warning" @click="updateActivity">Commit Update</a>
      <!-- TODO: Emit Event to Cancel Edit Mode -->
      <a class="button is-danger" @click="notUpdateActivity">Cancel</a>
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
        modifiedActivity: {...this.activity}
      }
    },
    methods: {
        updateActivity () {
            store.updateActivity(this.modifiedActivity)
            .then(() => {
              this.$emit('toggleUpdate', false);
            })
        },
        notUpdateActivity () {
            this.modifiedActivity = this.activity;
            this.$emit('toggleUpdate', false);
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
.activity-title {
  margin-bottom: 5px;
}
.activity-settings {
  float: right;
  font-size: 22px;
  margin-bottom: 10px;
}

.activity-settings:hover {
  cursor:pointer;
}
.activity-category {
  margin:10px;
}
.media {
  margin-top:10px;
}
.activity-controll a{
  margin: 20px 0 0 0;
  margin-right: 5px;
}
.post .title {
  margin-bottom: 5px;
}
</style>