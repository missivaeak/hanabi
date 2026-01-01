<script lang="ts">
type Props = {
  matrix: DOMMatrix;
};

const { matrix }: Props = $props();
// const matrix = new DOMMatrix();

let started = $state(false);

</script>

<div class={`explosion ${started ? 'explosion--started' : ''}`} style:transform={matrix.rotate(-75, 0, 0).toCSS()}>
  <div class="explosion__particle"></div>
  <div class="explosion__particle"></div>
  <div class="explosion__particle"></div>
  <div class="explosion__particle"></div>
  <div class="explosion__particle"></div>
  <div class="explosion__particle"></div>
  <div class="explosion__particle"></div>
  <div class="explosion__particle"></div>
</div>

<style>
.explosion {
  grid-row: 1;
  grid-column: 1;
  display: grid;
  place-items: center;
}

.explosion__particle:nth-child(1) {
  --target-x: 100px;
  --target-y: -40px;
}

.explosion__particle:nth-child(2) {
  --target-x: -100px;
  --target-y: -40px;
}

.explosion__particle:nth-child(3) {
  --target-x: 100px;
  --target-y: -20px;
}

.explosion__particle:nth-child(4) {
  --target-x: -90px;
  --target-y: -70px;
}

.explosion__particle:nth-child(5) {
  --target-x: -10px;
  --target-y: -20px;
}

.explosion__particle:nth-child(6) {
  --target-x: 10px;
  --target-y: -5px;
}

.explosion__particle:nth-child(7) {
  --target-x: -20px;
  --target-y: -5px;
}

.explosion__particle:nth-child(8) {
  --target-x: 15px;
  --target-y: -70px;
}


.explosion__particle {
  grid-row: 1;
  grid-column: 1;
  animation: 0.5s cubic-bezier(0, 0.5, 0.5, 1) 0s 2 alternate both running fly-up;
}

.explosion__particle::after {
  content: '';
  display: block;
  width: 30px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background-color: #eeeeee;
  animation: 
    1s cubic-bezier(0, 0.7, 1, 1) 0s 1 normal both running fly-away,
    1s linear 0s 1 normal both running disappear;
}

.explosion--started * {
  animation-play-state: running;
}

@keyframes fly-up {
  to { translate: 0 var(--target-y); }
}

@keyframes fly-away {
  to { translate: var(--target-x) 0; }
}

@keyframes disappear {
  to { scale: 0; }
}
</style>
