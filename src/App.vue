<template lang="">
  <div id="vueGoalApp">
      <nav class="navbar is-white topNav">
        <div class="container">
          <div class="navbar-brand">
            <h1>Activity Planner</h1>
          </div>
        </div>
      </nav>
      <nav class="navbar is-white">
        <div class="container">
          <div class="navbar-menu">
            <div class="navbar-start">
              <a class="navbar-item is-active" href="#">Newest</a>
              <a class="navbar-item" href="#">In Progress</a>
              <a class="navbar-item" href="#">Finished</a>
            </div>
          </div>
        </div>
      </nav>
      <section class="container">
        <div class="columns">
          <div class="column is-3">
            <ActivityCreate @createActivity="addActivity"/>
          </div>
          <div class="column is-9">
            <div class="box content" 
            :class="{fetching: isFetching, 'has-error': error 
            }">
              <ActivityItem v-for="activity in activities"
                             :activity="activity"
                             :key="activity.id"></ActivityItem>
              <div class="activity-length">Currently {{ activityLength }} activities</div>
              <div class="activity-motivation">{{ activityMotivation }}</div> 
            </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
import ActivityItem from './components/ActivityItem';
import { fetchActivities, fetchUser } from './api';
import ActivityCreate from './components/ActivityCreate';
import Vue from 'vue';

export default {
  name: 'app',
  components: {
    ActivityItem,
    ActivityCreate
  },
  data () {
    return {
          message: 'Hello Vue!',
          titleMessage: 'Title Message Vue!!!!!',
          isTextDisplayed: true,
          isFetching: false,
          error: null,
          user: {},
          activities: {},
        }
  },
  methods: {
          toggleTextDisplay () {
            this.isTextDisplayed = !this.isTextDisplayed
          },
          addActivity (newActivity) {
            Vue.set(this.activities, newActivity.id,  newActivity);
          }
        },
        computed: {
          activityLength () {
            return Object.keys(this.activities).length;
          },
          activityMotivation () {
            if (this.activityLength && this.activityLength < 5){
              return 'Nice to see some goals :)';
            } else if (this.activityLength >= 5) {
              return 'So many activities! Good job!';
            } else {
              return 'No activities, so sad :(';
            }
          }
        },
        created () {
          this.isFetching = true;
          fetchActivities()
          .then(activity => {
            this.activities = activity;
            this.isFetching = false;
          })
          .catch(error => {
            this.error = error;
            this.isFetching = false;
          })
          this.user = fetchUser();
        }
}
</script>

<style>
html,body {
  font-family: 'Open Sans', serif;
  background: #F2F6FA;
}
footer {
  background-color: #F2F6FA !important;
}

.fetching {
  border:2px dashed goldenrod;
}

.has-error {
  border:2px solid rebeccapurple;
}

.activity-length {
  float:right;
}

.example-wrapper {
  margin-left: 30px;
}

.topNav {
  border-top: 5px solid #3498DB;
}
.topNav .container {
  border-bottom: 1px solid #E6EAEE;
}
.container .columns {
  margin: 3rem 0;
}
.navbar-menu .navbar-item {
  padding: 0 2rem;
}
aside.menu {
  padding-top: 3rem;
}
aside.menu .menu-list {
  line-height: 1.5;
}
aside.menu .menu-label {
  padding-left: 10px;
  font-weight: 700;
}
.button.is-primary.is-alt {
  background: #00c6ff;
  background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
  background: linear-gradient(to bottom, #0072ff, #00c6ff);
  font-weight: 700;
  font-size: 14px;
  height: 3rem;
  line-height: 2.8;
}
.media-left img {
  border-radius: 50%;
}
.media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8F99A3;
}
article.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #E6EAEE;
}
article.post:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
.menu-list li{
  padding: 5px;
}

.navbar-brand > h1 {
  font-size: 31px;
  padding: 20px;
}
</style>
