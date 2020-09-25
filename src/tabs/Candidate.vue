<template>
<div class="candidateTab">
  <LoginForm v-if="!isCandidateLoggedIn" type='candidate'></LoginForm>
  <div v-else>
    <div v-if="!showCandidateForm" class="text-center">
      <ProfilePage :candidate='getLoggedInCandidate'></ProfilePage>
      <b-button class='mt-2' variant="info" @click='showCandidateForm=true'>Edit</b-button>
      <b-button class='ml-2 mt-2' variant="danger" @click='logout'> Logout </b-button>
    </div>
    <CandidateForm v-else :candidate="getLoggedInCandidate" @close='showCandidateForm=false'></CandidateForm>
  </div>
</div>
</template>

<script>
import Vue from "vue";
import LoginForm from "../components/LoginForm";
import ProfilePage from '../components/ProfilePage';
import CandidateForm from '../components/CandidateForm';
export default Vue.extend({
  name: "Candidate",
  components:{
    LoginForm,
    ProfilePage,
    CandidateForm,
    },
  data() {
    return {
      showCandidateForm: false,
    };
  },
  computed:{
    isCandidateLoggedIn() { return this.$store.getters.getIsCandidateLoggedIn },
    getLoggedInCandidate() { return this.$store.getters.getLoggedInCandidate },
  },
  methods:{
    logout() { this.$store.dispatch('logout', 'candidate') },
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.candidateTab {
  width: 33%;
  margin-left: 33%;
}
</style>
