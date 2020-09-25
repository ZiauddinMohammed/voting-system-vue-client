<template>
  <div>
    <b-card class="text-center" style="height:100%">
      <template v-slot:header>
          <h4 style="text-transform: capitalize;">{{candidate.name}}'s Profile</h4>
      </template><br>
      <h4>Details</h4>
      <b-table stacked :items="getDetails()"></b-table>
      <br><h4>Skills</h4>
      <b-table stacked :items="getSkills()"></b-table>
      <div v-if="hasNoSkill()">
        <hr style="border:1.5px solid lightgrey"/>
        <h5> No Skills </h5>
      </div>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "ProfilePage",
  props: ['candidate'],
  data() {
    return {};
  },
  methods:{
    getDetails(){
      const details={};
      for(let field in this.candidate){
        if(field != 'skills'){
          details[field] = this.candidate[field];
        }
      }
      return [details];
    },
    getSkills(){
      return [this.candidate.skills];
    },
    hasNoSkill(){
      return Object.keys(this.candidate.skills).length==0;
    },
  }
});
</script>

<style scoped>

</style>
