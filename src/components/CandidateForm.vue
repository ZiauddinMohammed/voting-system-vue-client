<template>
    <b-card bg-variant="light">
    <label>Name: </label><label class='font-weight-bold ml-2'>{{form.name}}</label><br>
    <label>Votes: </label><label class='font-weight-bold ml-2'>{{form.votes}}</label><br>
    <b-form @submit.prevent="onSubmit" @reset="onReset">
      <b-form-group id="input-group-1" label="Challenges Solved">
        <b-form-input
          type="number"
          min="0"
          v-model="form.challengesSolved"
          required
          placeholder="No. Of Challenges Solved"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Overall Expertise Level">
        <b-form-input
          type="number"
          min="0"
          max="5"
          v-model="form.expertiseLevel"
          required
          placeholder="Enter Expertise Level"
        ></b-form-input>
      </b-form-group>
      <label class="font-weight-bold">Skills:</label><b-icon-plus-circle class='ml-2' type='button' variant="success" @click="isAddSkill=true"/><br>
      <b-form-group v-for="skill in Object.keys(form.skills)" :key="skill" :label="skill" label-class="text-capitalize">
        <b-form-input
          type="number"
          min="0"
          max="5"
          v-model="form.skills[skill]"
          required
          placeholder="Expertise Level"
        ></b-form-input>
      </b-form-group>
      <b-form-group>
      <b-form v-if="isAddSkill" @submit.prevent="addSkill">
        <b-card class="d-flex justify-content-center">
          <b-card-sub-title class="font-weight-bold"> Add Skill: </b-card-sub-title>
          <b-input class='mt-1' v-model="skill.name" placeholder="Enter Skill" type="text" required></b-input>
          <b-input class='mt-1' v-model="skill.expertiseLevel" placeholder="Expertise Level" type="number" min="0" max="5" required></b-input>
          <b-button class='mt-1 mr-1' type="submit" variant='success'>Add</b-button>
          <b-button class='mt-1 mr-1' variant='danger' @click="closeSkillForm">Close</b-button>
        </b-card>
      </b-form>
      </b-form-group>
      <b-button class='mr-2' type="submit" variant="primary">Submit</b-button>
      <b-button class='mr-2' variant="success" @click="onReset()">Reset</b-button>
      <b-button class='mr-2' variant="danger" @click="onCancel()">Cancel</b-button>
    </b-form>
    </b-card>
</template>

<script>
import Vue from "vue";
import {cloneDeep} from "lodash";

export default Vue.extend({
  name: "CandidateForm",
  props: ['candidate'],
  data() {
    return {
      isAddSkill: false,
      skill:{
        name:'',
        expertiseLevel:0
      },
      form: cloneDeep(this.candidate),
    };
  },
  methods:{
    onCancel(){
      this.$emit('close');
    },
    async onSubmit(){
        this.$store.dispatch('updateCandidateDetails', this.form);
        this.onCancel();
    },
    onReset(){
      this.form = cloneDeep(this.candidate);
    },
    addSkill(){
      this.form.skills[this.skill.name.toLowerCase()] = this.skill.expertiseLevel;
      this.closeSkillForm();
    },
    closeSkillForm() {
      this.skill.name = '';
      this.skill.expertiseLevel = 0;
      this.isAddSkill = false;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
