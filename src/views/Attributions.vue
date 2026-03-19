<template>
	<q-page padding>
		<div class="page-content-container flex flex-col items-center gap-4">
			<!-- Quote -->
			<div class="text-center p-4">
				<blockquote>
					<p>{{ $t('attrQuote') }}</p>
				</blockquote>
			</div>

			<!-- Category Chips -->
			<div class="flex justify-center items-center gap-2 p-4"> </div>
		</div>
	</q-page>
</template>

<script lang="ts" setup>
	const categories = ['mapGeo', 'apiService', 'vueEcosystem', 'designUi'];
</script>

<style lang="scss" scoped></style>
