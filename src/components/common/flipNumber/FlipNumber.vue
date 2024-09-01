<template>
	<div class="flip-number">
		<template v-for="(item, index) in numbersSplitted">
			<template v-if="typeof item === 'number'">
				<flip-number-item
					:key="index"
					:fontSize="fontSize"
					:height="height"
					:speed="speed"
					:value="item"
					class="loop-item"
				></flip-number-item>
			</template>
			<template v-else>
				<div
					:key="index"
					class="loop-item sign"
					>{{ item }}</div
				>
			</template>
		</template>
	</div>
</template>
<script>
	import FlipNumberItem from './FlipNumberItem.vue';

	export default {
		name: 'FlipNumber',
		components: {
			FlipNumberItem,
		},
		props: {
			value: {
				type: Number,
				required: true,
				default: 0,
			},
			speed: {
				type: [Number, String],
				default: 600,
			},
			// height 決定 width, line-height 的值
			height: {
				type: Number,
				default: 100,
			},
			fontSize: {
				type: Number,
				default: 66,
			},
		},
		data() {
			let _speed = this.speed * 1;
			if (isNaN(_speed)) {
				console.error('the prop speed is not a number');
				_speed = 600;
			} else {
				_speed = _speed < 600 ? 600 : _speed;
			}
			return {
				numbersSplitted: [],
				interval: _speed,
			};
		},
		created() {
			this.splitValue();
		},
		watch: {
			value() {
				this.splitValue();
			},
		},
		methods: {
			splitValue() {
				this.numbersSplitted = [];
				if (isNaN(this.value)) {
					return console.error('the prop must be a number');
				}
				const valueSplittedArr = this.value.toString().split('');
				for (let i = 0; i < valueSplittedArr.length; i++) {
					let _val = valueSplittedArr[i];
					if (isNaN(Number(_val))) {
						this.numbersSplitted.push(_val);
					} else {
						this.numbersSplitted.push(Number(_val));
					}
				}
			},
		},
	};
</script>
<style scoped>
	.loop-item {
		display: inline-block;
	}
</style>
