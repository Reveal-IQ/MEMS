<script>
export default {
  name: "NavigationHeader",
};
</script>
<template>
  <nav class="navigation-header navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">MEMS Nav</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Manufacturer">Manufacturer</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Facility">Facility</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Model">Model</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Asset">Asset</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Vendor">Vendor</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style></style>
