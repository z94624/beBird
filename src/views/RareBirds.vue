<template>
	<Map>
		<template #search-menu>
			<q-form
				class="q-gutter-md"
				@reset="onReset"
				@submit="onSubmit"
			>
				<q-select
					v-model="model"
					:options="options"
					label="國家"
				/>

				<q-slider
					v-model="standard"
					:max="30"
					:min="1"
					reverse
					style="width: -webkit-fill-available"
				/>

				<div>
					<q-btn
						color="primary"
						label="Submit"
						type="submit"
					/>
					<q-btn
						class="q-ml-sm"
						color="primary"
						flat
						label="Reset"
						type="reset"
					/>
				</div>
			</q-form>
		</template>
	</Map>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
