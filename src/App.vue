<template>
  <div id="app">
    <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header justified pills>
        <b-nav-item to="/" exact exact-active-class="active">Voter</b-nav-item>
        <b-nav-item to="/candidate" exact exact-active-class="active">Candidate</b-nav-item>
        <b-nav-item to="/admin" exact exact-active-class="active">Admin</b-nav-item>
      </b-nav>
    </b-card-header>

    <b-card-body>
      <router-view></router-view>
    </b-card-body>
  </b-card>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {},
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
