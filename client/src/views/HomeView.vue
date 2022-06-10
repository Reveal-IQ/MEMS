<script setup></script>

<template>
  <main class="container py-5">
    <h1 class="h1 text-center">Medical Equipment Management System (MEMES)</h1>
    <p>Documentation</p>
    <div class="card p-3">
      <div class="col">
        <a
          class="a-link"
          target="_blank"
          href="https://github.com/Reveal-IQ/MEMS"
          >Github Repo</a
        >
      </div>
      <div class="col">
        <a
          class="a-link"
          target="_blank"
          href="https://1drv.ms/w/s!Aoyt_5MLLrQsi6hhpnkagfaawf1pcA?e=iVbRyr"
          >User Requirement</a
        >
      </div>
      <div class="col">
        <a
          class="a-link"
          target="_blank"
          href="https://1drv.ms/w/s!Aoyt_5MLLrQsi657RYs-5oKwFtDmcg?e=cIGSvS"
          >System Architecture and Specification</a
        >
      </div>
      <div class="col">
        <a
          class="a-link"
          target="_blank"
          href="https://www.figma.com/file/3RZaloPTGo1Qe8rCp5Vv55/UI-Designs?node-id=0%3A1"
          >Visual Designs</a
        >
      </div>
      <div class="col">
        <a
          class="a-link"
          target="_blank"
          href="https://1drv.ms/w/s!Aoyt_5MLLrQsi68zxO4M0fXzqS1hWg?e=FVPErk"
          >Sprint Plan</a
        >
      </div>
      <div class="col">
        <a
          class="a-link"
          target="_blank"
          href="https://1drv.ms/x/s!Aoyt_5MLLrQsi68Atdismmgw1tSr7g?e=knGDfZ"
          >Test Cases</a
        >
      </div>
      <div class="col">
        <a
          class="a-link"
          target="_blank"
          href="https://1drv.ms/u/s!Aoyt_5MLLrQsi6hgaHG_8-McARe2UQ?e=BQGzPa"
          >Doc Repo
        </a>
      </div>
    </div>
    <!-- an example to go to the manufacturer screen -->
    <div class="d-flex row justify-content-center py-3">
      <button
        class="btn btn-green mt-4 justify-content-center"
        @click="$router.push('/manufacturer')"
      >
        Manufacturer Screen
      </button>
    </div>
  </main>
</template>
