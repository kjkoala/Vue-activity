<template lang="">
   <div>
        <a v-if="!isFormDisplayed" @click="toggleFormDisplay" class="button is-primary is-block is-alt is-large" href="#">New Activity</a>
            <div v-if="isFormDisplayed" class="create-form">
              <h2>Create Activity</h2>
              <form>
                <div class="field">
                  <label class="label">Title</label>
                  <div class="control">
                    <input v-model="newActivity.title" class="input" type="text" placeholder="Read a Book">
                  </div>
                </div>
                <div class="field">
                  <label class="label">Category</label>
                  <div class="control">
                   <select class="select" v-model="newActivity.category">
                     <option disabled value="">Please select one</option>
                     <option v-for="(category, index) in categories" :key="index">{{category.text}}</option>
                   </select>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Notes</label>
                  <div class="control">
                    <textarea v-model="newActivity.notes" class="textarea" placeholder="Write some notes here"></textarea>
                  </div>
                </div>
                <div class="field is-grouped">
                  <div class="control">
                    <button 
                    @click="createActivity" 
                    :disabled="!isFormValid"
                    class="button is-link">
                    Create Activity
                    </button>
                  </div>
                  <div class="control">
                    <button @click="toggleFormDisplay" class="button is-text">Cancel</button>
                  </div>
                </div>
              </form>
            </div>
    </div>
</template>

<script>
import { fetchCategories, createActivity } from '@/api';
export default {
    data () {
        return {
          isFormDisplayed: false,
          categories: {},
           newActivity: {
            title: '',
            category: '',
            notes: ''
          }
        }
    },
    methods: {
        createActivity () {
            createActivity(this.newActivity)
            .then(activity => {
                this.$emit('createActivity',{...activity});
                this.newActivity.title = '';
                this.newActivity.category = '';
                this.newActivity.notes = ''
            });
        },
        toggleFormDisplay () {
            this.isFormDisplayed = !this.isFormDisplayed
        }
    },
    computed: {
        isFormValid () {
            return this.newActivity.title && this.newActivity.notes;
          }
    },
    created () {
        this.categories = fetchCategories();
    }
}
</script>

