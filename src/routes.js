import Voter from "./tabs/Voter.vue";
import Candidate from './tabs/Candidate.vue';
import Admin from './tabs/Admin.vue';

export default [
    { path: "/", component: Voter, name: "voter" },
    { path: "/Candidate", component: Candidate, name: "candidate" },
    { path: "/Admin", component: Admin, name: "admin" }
];
