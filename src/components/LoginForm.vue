<template>
  <b-card bg-variant="light">
      <b-form @submit.prevent="onSubmit" @reset="onReset">
      <b-form-group id="input-group-1" :label="`${type.charAt(0).toUpperCase() + type.slice(1)}'s Name:`" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" :label="`${type.charAt(0).toUpperCase() + type.slice(1)}'s Password:`" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>

      <b-button class='mr-2' type="submit" variant="primary">Login</b-button>
      <b-button class='mr-2' type="reset" variant="danger">Reset</b-button>
    </b-form>
    <div class="text-center">
      <b-spinner v-if="isLoading && !showAlert" label="Checking Info"></b-spinner>
      <b-alert  v-if="showAlert" class='mt-2' show="1" variant="danger" fade dismissible @dismissed="hideAlert"><b>Login Failed</b></b-alert>
    </div>
  </b-card>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "LoginForm",
  props: ['type'],
  data() {
    return {
      form: {
          name: '',
          password: '',
      },
      isLoading: false,
    };
  },
  computed: {
    showAlert(){ return (this.type === 'admin') ? this.$store.getters.getShowAdminAlert : this.$store.getters.getShowCandidateAlert },
  },
  methods: {
    onSubmit(){
      this.isLoading = true;
      this.$store.dispatch('login',{
        type: this.type,
        form: {...this.form},
      });
      this.onReset();
    },
    onReset(){
      this.form.name = '';
      this.form.password = '';
    },
    hideAlert() {
      this.isLoading = false;
      if(this.type === 'admin') {
        this.$store.commit('setShowAdminAlert', false);
      }
      else if(this.type === 'candidate') {
        this.$store.commit('setShowCandidateAlert', false);
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
