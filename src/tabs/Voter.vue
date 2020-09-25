<template>
  <div class='voterTab'>
    <b-card title="Hacker's Polls" bg-variant="light"> 
      <b-card-body v-if="!noDataAvailable" class="text-center">
        <b-list-group v-for="candidate in getCandidates" :key="candidate.name">
          <b-list-group-item
            class="d-flex justify-content-between align-items-center" button @click="showSidebar(candidate)"
          ><span style="text-transform: capitalize;">{{candidate.name}}</span>
            <b-badge variant="primary" pill>{{candidate.votes}}</b-badge>
          </b-list-group-item>
        </b-list-group>
        <b-sidebar v-if='sidebarCandidateData[0]' v-model='sidebar' :title="sidebarCandidateData[0].name" mt-40 left shadow>
          <template v-slot:footer="">
            <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
              <b-button v-if='!hasVoted' class="mr-auto primary" size="sm" variant="success" @click="vote" primary>Vote</b-button>
              <b-button size="sm" variant="danger" @click="sidebar=false">Close</b-button>
            </div>
          </template>
          <ProfilePage class="px-0 py-2" :candidate="sidebarCandidateData[0]"></ProfilePage>
        </b-sidebar>
      </b-card-body>
      <b-card-body v-else>
        <b-card-sub-title class="font-weight-bold"> No Data Available!!!. Please Try After Sometime... </b-card-sub-title>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import ProfilePage from '../components/ProfilePage';
export default Vue.extend({
  name: "Voter",
  components:{
    ProfilePage,
  },
  data() {
    return {
      sidebar:false,
      sidebarCandidateData:[],
    };
  },
  mounted() {
    this.$store.dispatch('initCandidatesDetails');
    this.$store.dispatch('checkIp');
  },
  computed:{
    getCandidates() { return this.$store.getters.getCandidates; },
    hasVoted() { return this.$store.getters.getHasVoted; },
    noDataAvailable() { return this.getCandidates.length == 0 },
  },
  methods:{
    showSidebar(candidate){
      this.sidebarCandidateData = [candidate];
      this.sidebar = true;
    },
    vote(){
      this.$store.dispatch('addVote', {name: this.sidebarCandidateData[0].name});
      this.sidebar = false;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.voterTab {
  width: 33%;
  margin-left: 33%;
}
</style>
