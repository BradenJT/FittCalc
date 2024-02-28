<template>
  <q-page class="row items-center justify-evenly">
    <WeightConvCalc/>
  </q-page>
</template>

<script lang="ts">
import WeightConvCalc from '../WeightConversion/components/WeightConvCalc.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WeightConversionPage',
  components: { WeightConvCalc },
});
</script>
