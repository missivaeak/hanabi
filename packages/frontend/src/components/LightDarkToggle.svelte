<script lang="ts">
const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: light)");
const preferredColorScheme = colorSchemeQuery.matches ? "light" : "dark";
</script>

  <label>
    {#if preferredColorScheme === "light"}
    <input type="checkbox" id="light-toggle">
    {:else}
    <input type="checkbox" id="dark-toggle">
    {/if}
    <!-- <div class="gg-sun"></div> -->
  </label>

<style>
label {
  --icon-size: 1.6em;
  --sun-color: light-dark(#DB912F, transparent);
  --moon-color: light-dark(transparent, #000000);
  --star-color: light-dark(transparent, #FFFFFF);
  --background-color: light-dark(#C6E4FF, #C0C0C0);
  --border-width: calc(var(--icon-size) / 10);
  --border-color: light-dark(#AAAAAA, #777777);

  top: var(--magic);
  right: var(--magic);
  position: absolute;
  transition: all 1s linear;
  height: var(--icon-size);
  width: var(--icon-size);
  display: grid;
  place-items: center;
  border-radius: 50%;
  outline: solid 1px var(--border-color);

  /* Moon shape */
  box-shadow: inset calc(var(--icon-size) * -0.15) 0 0 calc(var(--icon-size) / 10) var(--moon-color);

  background: 
    /* Central circle for sun */
    radial-gradient(var(--sun-color) 35%, transparent 35%),

    /* Stars */
    radial-gradient(var(--star-color)) 20% 25% / 3px 3px,
    radial-gradient(var(--star-color)) 31% 75% / 3px 3px,
    radial-gradient(var(--star-color)) 50% 21% / 3px 3px,
    radial-gradient(var(--star-color)) 30% 50% / 3px 3px,
    radial-gradient(var(--star-color)) 10% 63% / 3px 3px,
    radial-gradient(var(--star-color)) 62% 44% / 3px 3px,
    radial-gradient(var(--star-color)) 52% 62% / 3px 3px,

    /* Background for both sun and moon */
    var(--background-color);

  background-repeat: no-repeat;
}

label::before, label::after {
  --sun-ray-width: calc(var(--icon-size) / 10);
  --sun-ray-gradient: transparent 1px, var(--sun-color) 2px 16%, transparent 16% 84%, var(--sun-color) 84% calc(100% - 2px), transparent 100%;
  
  content: '';
  grid-column: 1;
  grid-row: 1;
  height: var(--icon-size);
  width: var(--icon-size);
  position: relative;

  /* Sun rays down and across, forming a plus sign */
  /* ::after element will be rotated to form diagonals */
  background:
    linear-gradient(to bottom, var(--sun-ray-gradient)) top center / var(--sun-ray-width) var(--icon-size),
    linear-gradient(to right, var(--sun-ray-gradient)) center left / var(--icon-size) var(--sun-ray-width);

  background-repeat: no-repeat;
}

label::after {
  border-radius: 50%;

  /* Rotates the sun rays for this pseudo element, making diagonals */
  rotate: 45deg;

  /* Inner shadow for both sun and moon icon */
  box-shadow:
    inset var(--border-width) calc(var(--border-width) * -1) calc(var(--border-width) * 3) #00000055,
    inset calc(var(--border-width) * -1) var(--border-width) calc(var(--border-width) * 3) #ffffff99;
}

#light-toggle, #dark-toggle {
  position: absolute;
  width: 0;
  height: 0;
}

</style>

