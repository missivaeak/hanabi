<header class="header">
  <h1 class="header__title">hanabi</h1>
</header>

<style>
.header {
  --ratio: calc(100dvw / 100dvh);
  position:absolute;
  top: 0;
  width: 100dvw;
  height: calc(var(--magic) * 3);
  display: grid;
  place-items: center;
}

@media screen and (aspect-ratio > 1) {
  .header {
  width: unset;
  }
}

.header__title {
  font-size: 3rem;
  border-top: solid 2px var(--theme-color);
  border-bottom: solid 2px var(--theme-color);
  color: var(--theme-color);
  line-height: 1;
  margin: var(--magic);
  text-shadow: 0 0 10px #ddd9;
  pointer-events: none;
  user-select: none;
}
</style>
