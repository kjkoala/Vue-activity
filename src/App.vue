<template>
  <div id="vueGoalApp">
      <navbar-component
      @filterSelected="setFilter"
      />
      <section class="container">
        <div class="columns">
          <div class="column is-3">
            <ActivityCreate/>
          </div>
          <div class="column is-9">
            <div class="box content" 
            :class="{fetching: isFetching, 'has-error': error 
            }">
            <div v-if="isFetching">Loading...</div>
            <div v-if="error">{{ error }}</div> 
              <div v-if="loadedContent">
                <ActivityItem v-for="activity in filteredActivity"
                :category="categories"
                :activity="activity"
                :key="activity.id">
              </ActivityItem>
              </div>
            <div v-if="!isFetching">
              <div class="activity-length">Currently {{ activityLength }} activities</div>
              <div class="activity-motivation">{{ activityMotivation }}</div> 
            </div>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
import ActivityItem from './components/ActivityItem';
import ActivityCreate from './components/ActivityCreate';
import navbarComponent from './components/TheNavbar.vue';
import store from './store';

export default {
  name: 'app',
  components: {
    ActivityItem,
    ActivityCreate,
    navbarComponent,
  },
  data () {
    const { state: {activities, categories} } = store;
    return {
          isTextDisplayed: true,
          isFetching: false,
          error: null,
          activities,
          categories,
          filtered: 'all'
        }
  },
  methods: {
          setFilter (filterOption) {
            this.filtered = filterOption;
          }
        },
        computed: { 
          filteredActivity () {
            let filterActivity = {};
            let condition;
            if(this.filtered === 'all' ) {
              return this.activities
            }
            
            if (this.filtered === 'progress') {
             condition = value => value.progress > 0 && value.progress < 100;
            }
            else if (this.filtered === 'finished') {
             condition = value => value.progress == 100;
            }
            else if (this.filtered === 'notstarted') {
               condition = value => value.progress == 0;
            }

             filterActivity = Object.values(this.activities)
            .filter(condition);

            return filterActivity;
          },
          activityLength () {
            return Object.keys(this.activities).length;
          },
          categoryLength () {
            return Object.keys(this.categories).length;
          },
          loadedContent () {
            return this.categoryLength && this.activityLength;
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
          // FakeApi.fillDB();
          this.isFetching = true;
          store.fetchActivities()
          .then(() => {
            this.isFetching = false;
          })
          .catch(error => {
            this.error = error;
            this.isFetching = false;
          });
          store.fetchCategories()
          .then(() => {})
          .catch(error => {
            this.error = error;
            this.isFetching = false;
          });
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
