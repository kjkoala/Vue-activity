import FakeApi from '@/lib/FakeAPI'
import Vue from 'vue'

const store = {
    state: {
        activities: {},
        categories: {}
    },
    fetchActivities () {
        return FakeApi.get('activities', {force: 1})
        .then(activities => {
            Object.keys(activities).forEach(key => 
                this.setItem('activities', key, activities[key])
            )
            return activities;
        });
      },
    fetchCategories () {
        return FakeApi.get('categories', {force: 1})
        .then(categories => {
           Object.keys(categories).forEach(key => 
                this.setItem('categories', key, categories[key])
            );
            return categories;
        });
    },
    fetchUser ()  {
        return {
            name: 'Filip Jerga',
            id: '-Aj34jknvncx98812',
        }
    },
    generateUid () {
        return Math.floor(new Date() * Math.random())
    },
    createActivity (activity) {
        activity.id = this.generateUid();
        activity.progress = 0;
        activity.createdAt = new Date();
        activity.updatedAt = new Date();
        return new FakeApi.post('activities',activity)
        .then(createdActivity => {
            this.setItem('activities', createdActivity.id, createdActivity);
            return createdActivity;
        })
    },
    updateActivity (activity) {
        activity.updatedAt = new Date();
        return new FakeApi.post('activities', activity)
        .then(updatedActivity => {
            this.setItem('activities', updatedActivity.id, updatedActivity);

            return updatedActivity;
        })
    },
    deleteActivity (activity)  {
        return FakeApi.delete('activities', activity)
        .then(deletedActivity => {
            Vue.delete(this.state.activities, activity.id);
            return deletedActivity;
        })
    },
    setItem (resource, id, item) {
        Vue.set(this.state[resource], id, item);    
    }
};



export default store;