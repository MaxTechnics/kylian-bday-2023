<template>
	<div style="height: 100%">
		<div class="container">
			<div class="terminal-window">
				<header>
					<div class="button red"></div>
					<div class="button yellow"></div>
					<div class="button green"></div>
				</header>
				<section class="terminal">
					<div ref="terminalo" class="history">
					</div>
					<!-- $&nbsp;<span class="prompt" ref="terminal"></span> -->
					<span class="prompt" ref="terminal"></span>
					<span class="typed-cursor"></span>

				</section>
				<section class="booton">
					<BdayBtn @clicked="emits('next')">Next</BdayBtn>
				</section>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import BdayBtn from './BdayBtn.vue';
import { onBeforeUnmount, ref } from 'vue';
import Typed from 'typed.js'

const terminal = ref()

const typing_instance = ref<null | Typed>(null);

const start_typing = () => {
	if (typing_instance.value) return;

	const date = new Date()
	const date_string = date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
	const login_string = `\`Last login: ${date_string.replace(/,/g, '')} on ttys004\`\n‌^600‌`

	const basecmd = 'kylian@FunkBook-Pro ~ % '

	const final = [
		login_string,
		`\`${basecmd}\``,
		'^400 birthday\n^800',
		'Gelukkige verjaardag! ^1000\n',
		'Dit jaar besloot ik door al onze game captures en chats \n',
		'te bladeren en memorabele momenten bij elkaar te zetten...\n',
		'How the fuck did you put up with me all these years?\n',
		'Veel plezier!\n',
		'\n',
		`\`${basecmd}\`^600`,
		'logout\n',
		'`Saving session...\n`',
		'`[Process completed]`'
	].join('')

	typing_instance.value = new Typed(terminal.value, {
		strings: [final],
		typeSpeed: 30,
		backSpeed: 0,
		backDelay: 500,
		startDelay: 500,
		loop: false,
		cursorChar: '█',
		showCursor: true,

		// onComplete: (self) => {
		//     self.cursor.remove();
		//     self.cursor = null;
		//     self.el.classList.add('typed-cursor');
		// }
	});

}

onBeforeUnmount(() => {
	if (typing_instance.value) typing_instance.value.destroy();
});

defineExpose({ start_typing });
const emits = defineEmits(['next']);
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  white-space: pre;
}

.terminal-window {
  text-align: left;
  width: 600px;
  height: 360px;
  border-radius: 10px;
  margin: auto;
  position: relative;
}

.terminal-window header {
  background: #e0e8f0;
  height: 30px;
  border-radius: 8px 8px 0 0;
  padding-left: 10px;
}

.terminal-window header .button {
  width: 12px;
  height: 12px;
  margin: 10px 4px 0 0;
  display: inline-block;
  border-radius: 8px;
}

.terminal-window header .button.green {
  background: #3BB662;
}

.terminal-window header .button.yellow {
  background: #E5C30F;
}

.terminal-window header .button.red {
  background: #E75448;
}

.terminal-window section.terminal {
  color: white;
  font-family: Menlo, Monaco, "Consolas", "Courier New", "Courier";
  font-size: 11pt;
  background: #30353A;
  padding: 10px;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  top: 30px;
  bottom: 0;
  overflow: auto;
}

.booton {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
}

.terminal-window section.terminal .typed-cursor {
    opacity: 1;
    -webkit-animation: blink 0.7s infinite;
    -moz-animation: blink 0.7s infinite;
    animation: blink 0.7s infinite;
}
@keyframes blink{
    0% { opacity:1; }
    50% { opacity:0; }
    100% { opacity:1; }
}
@-webkit-keyframes blink{
    0% { opacity:1; }
    50% { opacity:0; }
    100% { opacity:1; }
}
@-moz-keyframes blink{
    0% { opacity:1; }
    50% { opacity:0; }
    100% { opacity:1; }
}

.terminal-data { display: none; }
.terminal-window .gray { color: gray; }
.terminal-window .green { color: green;}
</style>
