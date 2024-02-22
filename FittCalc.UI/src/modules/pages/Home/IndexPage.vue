<template>
  <q-page class="row items-center justify-evenly">
    <calorie-calc></calorie-calc>
  </q-page>
</template>

<script lang="ts">
import CalorieCalc from 'src/modules/pages/Home/components/CalorieCalc.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { CalorieCalc },
});
</script>
