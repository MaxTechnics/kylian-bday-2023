<template>
	<div class="container">
		<div class="timeline">
			<ul>
				<li v-for="funny in funnies" :key="funny.title">
					<div class="timeline-content">
						<h3 class="date">{{ funny.date }}</h3>
						<h1>{{ funny.title }}</h1>
						<p>{{ funny.description }}</p>
						<!-- <img v-if="funny.type === 'image'" :src="funny.url" /> -->
						<picture v-if="funny.type === 'image'">
							<source :srcset="funny.url">
							<source v-if="funny.fallback" :srcset="funny.fallback">
							<img v-if="funny.fallback" :src="funny.fallback">
							<img v-else :src="funny.url">
						</picture>
						<video v-if="funny.type === 'video'" :src="funny.url" controls />
					</div>
				</li>
			</ul>
		</div>
		<div class="final">
			<h1>Slot</h1>
			<p>Slot</p>
		</div>
	</div>
	<LightBox />
</template>

<script setup lang="ts">
import { funnies } from '@/assets/funny_moments';
import LightBox from './LightBox.vue';
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  font-family: "Montserrat";
}

.final {
	width: 80%;
	border-radius: 10px;
	margin-top: 20px;
	z-index: 1; 
	padding: 20px;
	background-color: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.5);
	color: white;
}

.container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  // background-color: #111;  
  flex-direction: column;
}
.timeline {
  width: 80%;
  height: auto;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.timeline ul {
  list-style: none;
}
.timeline ul li {
  padding: 20px;
//   background-color: #1e1f22;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  border-radius: 10px;
  margin-bottom: 20px;
}
.timeline ul li:last-child {
  margin-bottom: 0;
}
// .timeline-content h1 {
h1 {
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
  margin-bottom: 10px;
}
// .timeline-content p {
 p {
  font-size: 16px;
  line-height: 30px;
  font-weight: 300;
}
.timeline-content .date {
  font-size: 12px;
  font-weight: 300;
  margin-bottom: 10px;
  letter-spacing: 2px;
}

.timeline-content img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
}

.timeline-content video {
	max-width: 100%;
	max-height: 100%;
	border-radius: 10px;
}

@media only screen and (min-width: 768px) {
  .timeline:before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    // width: 2px;
	width: 8px;
    height: 100%;
    // background-color: gray;
	background-color: rgba(255, 255, 255, 0.5);
	backdrop-filter: blur(10px);
  }
  .timeline ul li {
    width: 50%;
    position: relative;
    margin-bottom: 50px;
  }
  .timeline ul li:nth-child(odd) {
    float: left;
    clear: right;
    transform: translateX(-30px);
    border-radius: 20px 0px 20px 20px;
  }
  .timeline ul li:nth-child(even) {
    float: right;
    clear: left;
    transform: translateX(30px);
    border-radius: 0px 20px 20px 20px;
  }
  .timeline ul li::before {
    content: "";
    position: absolute;
    // height: 20px;
    // width: 20px;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    // background-color: gray;
    background-color: rgba(255, 255, 255, 0.2);
    top: 0px;
  }
  .timeline ul li:nth-child(odd)::before {
    transform: translate(50%, -50%);
    right: -30px;
  }
  .timeline ul li:nth-child(even)::before {
    transform: translate(-50%, -50%);
    left: -30px;
  }
  .timeline-content .date {
    position: absolute;
    top: -30px;
  }
  .timeline ul li:hover::before {
    // background-color: aqua;
	background-color: white;
  }

  .final {
	max-width: 90%;
	width: 100%;
	border-radius: 20px;
	margin-top: 50px;
  }
}

</style>
