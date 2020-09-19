<template>
  <table id="app">
    <tr>
    <td id="nav">
      <b-navbar variant="light" fluid class="main-navbar">
        <b-navbar-brand to="/" style="text-align:left;padding:0px">
          <img alt="CVX Logo" src="./assets/logo.png" width="50%"/>
        </b-navbar-brand>
        <b-navbar-nav>
          <b-nav-item to="/calendar">Kalendár</b-nav-item>
          <b-nav-item to="/about" class="nobreak">O nás</b-nav-item>
          <b-nav-item to="/contact">Kontakt</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </td>
    </tr>
    <tr>
    <td>
      <div id="main-content">
        <router-view/>
      </div>
    </td>
    </tr>
  </table>
</template>

<style lang="scss">
$link-color: #42b983;

@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';

#body {
  position: absolute;
  height: 100%;
  width: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

#nav {
  height: 1px;
  a {
    font-weight: bold;
    color: #2c3e50;
    white-space: nowrap;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  .main-navbar {
    padding:4px 8px;
    box-shadow: #2c3e50 0px 0px 5px;
  }
}

#main-content {
  height: 100%;
  overflow: scroll;
}
</style>
