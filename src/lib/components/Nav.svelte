<script>
  import { slide } from "svelte/transition";
  import { page } from "../stores/page";

  import Icon from "./Icon.svelte";
  import paths from "../docs";
</script>

<nav>
  <ul class="folders">
    {#each paths as folder}
      <li class="folder" class:open={folder.open}>
        <p on:click={() => (folder.open = !folder.open)}>
          {folder.name}
          <Icon name="Arrow" />
        </p>
        {#if folder.open}
          <ul transition:slide>
            {#each Object.keys(folder.files) as name}
              <li
                class="file"
                class:current={folder.files[name] === $page.current}
                on:click={() => {
                  $page.current = folder.files[name];
                }}
              >
                {name.replace(/\B[A-Z]/g, " $&")}
              </li>
            {:else}
              <li class="file">WIP</li>
            {/each}
          </ul>
        {/if}
      </li>
    {/each}
  </ul>
</nav>

<style lang="scss">
  nav {
    background-color: var(--primary);
    color: rgb(var(--secondary));
    height: 100vh;
    overflow-y: auto;
  }

  .folders {
    display: flex;
    flex-direction: column;
  }

  .folder {
    cursor: pointer;
    user-select: none;
    margin-top: 0.5em;

    padding: 1em;
    padding-right: 1.5em;
    padding-bottom: 0;
    text-transform: uppercase;
    font-weight: 800;

    p {
      display: flex;
      gap: 2.5em;
      align-items: center;
      justify-content: space-between;

      --rotate: 90deg;
      --width: 1.5em;
      --height: 1.5em;

      :global(svg) {
        padding: 0.25em;
        border-radius: 35%;
        transition-property: background-color, transform;
      }
    }

    &.open {
      p {
        --rotate: -90deg;

        :global(svg) {
          background-color: rgba(var(--secondary), 0.15);
        }
      }
    }
  }

  .file {
    margin-top: 0.25em;
    padding: 0.5em 1em;
    font-weight: 400;
    border-radius: 0.5em;
    text-transform: capitalize;

    transition-property: background-color, transform;

    &:hover {
      background-color: rgba(var(--secondary), 0.1);
    }

    &:active {
      background-color: rgb(var(--secondary));
      color: var(--primary);
      transform: scale(0.95);
    }

    &.current {
      background-color: rgb(var(--secondary));
      color: var(--primary);
    }
  }
</style>
