<template>
  <div class="adminTab">
    <LoginForm v-if="!isAdminLoggedIn" type='admin'></LoginForm>
    <div v-else-if="!showRegisterForm">
      <b-card class="text-center" title="Candidates" bg-variant="light">
          <b-list-group v-for="name in candidateNames" :key="name">
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >{{name}}
                <b-icon-trash type='button' variant="danger" @click="deleteCandidateAccount(name)"/>
              </b-list-group-item>
          </b-list-group>
          <b-button class="mt-2" variant='success' @click="showRegisterForm=true"> Add Candidate </b-button>
          <b-button class='ml-2 mt-2' variant="danger" @click='logout'> Logout </b-button>
      </b-card>
    </div>
    <div v-else>
      <b-card bg-variant="light">
        <b-form @submit.prevent="addCandidateAccount">
          <b-form-group id="input-group-1" label="Candidate's Name:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="registerForm.name"
              required
              placeholder="Enter name"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Candidate's Password:" label-for="input-2">
            <b-form-input
              id="input-2"
              type="password"
              v-model="registerForm.password"
              required
              placeholder="Enter Password"
            ></b-form-input>
          </b-form-group>
          <b-button class='mr-2 text-center' type="submit" variant="success">Add</b-button>
          <b-button class='mr-2 text-center' type="danger" variant="danger" @click="showRegisterForm=false">Cancel</b-button>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import LoginForm from "../components/LoginForm";
export default Vue.extend({
  name: "Admin",
  components:{
    LoginForm,
  },
  data() {
    return {
      registerForm:{
        name:'',
        password:''
      },
      showRegisterForm: false,
    };
  },
  computed:{
    isAdminLoggedIn() { return this.$store.getters.getIsAdminLoggedIn },
    candidateNames() { return this.$store.getters.getCandidateNames },
  },
  methods:{
    deleteCandidateAccount(candidateName){
      this.$store.dispatch('deleteCandidateAccount', candidateName);
    },
    addCandidateAccount(){
      this.$store.dispatch('addCandidateAccount', this.registerForm);
      this.showRegisterForm=false;
    },
    logout() { this.$store.dispatch('logout', 'admin') },
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.adminTab {
  width: 33%;
  margin-left: 33%;
}
</style>
