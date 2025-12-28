<script lang="ts">
type Props = {
  matrix: DOMMatrix;
  callback: (animationStarter: () => void) => void;
};

const { matrix, callback }: Props = $props();

const otherMatrix = new DOMMatrix().translate(0, 0, 50);
let started = $state(false);

callback(() => (started = true));
</script>

<div class="explosion" style:transform={otherMatrix.rotate(-75, 0, 0).toCSS()}>
  <div class={`explosion__particle ${started ? 'explosion__particle--started' : ''}`}></div>
  <div class={`explosion__particle ${started ? 'explosion__particle--started' : ''}`}></div>
  <div class={`explosion__particle ${started ? 'explosion__particle--started' : ''}`}></div>
  <div class={`explosion__particle ${started ? 'explosion__particle--started' : ''}`}></div>
</div>

<style>
.explosion {
  grid-row: 1;
  grid-column: 1;
  display: grid;
  place-items: center;
}

.explosion__particle:nth-child(1) {
  --target-x: 200px;
  --target-y: -40px;
}

.explosion__particle:nth-child(2) {
  --target-x: -200px;
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

.explosion__particle {
  grid-row: 1;
  grid-column: 1;
  animation: fly-up 0.5s infinite cubic-bezier(0, 0.5, 0.5, 1) paused alternate;
}

.explosion__particle::after {
  content: '';
  display: block;
  width: 30px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background-color: #eeeeee;
  animation: 
    fly-away 1s infinite cubic-bezier(0, 0.7, 1, 1) paused,
    disappear 1s infinite linear paused;
}

.explosion__particle--started, .explosion__particle--started::after {
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
