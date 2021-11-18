<script>
  import Nav from "./lib/components/Nav.svelte";

  import { page } from "./lib/stores/page";
</script>

<Nav />
<main>
  {#if $page.current}
    <svelte:component this={$page.current} />
  {/if}
</main>

<style global>
  @import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap");

  main {
    padding: 2em;
  }

  #app {
    display: flex;
  }

  :root {
    font-family: "Nunito", sans-serif;

    --primary: #31378b;
    --secondary: 218, 218, 230;

    color: var(--primary);
    background-color: rgb(var(--secondary));
  }

  *,
  *::after,
  *::before {
    padding: 0;
    margin: 0;

    box-sizing: border-box;

    transition: none 600ms cubic-bezier(0, 0.5, 0, 1);
  }

  ul,
  ol {
    list-style: none;
  }
</style>
