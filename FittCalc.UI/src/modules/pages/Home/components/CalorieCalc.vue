<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md">
      <q-toggle v-model="useMetric" label="Use Metric System" />
      <q-input filled v-model.number="age" label="Age" type="number" />
      <q-select filled v-model="gender" :options="genderOptions" label="Gender" emit-value map-options/>
      <div v-if="useMetric">
        <q-input filled v-model.number="heightCm" label="Height (in cm)" type="number" />
        <q-input filled v-model.number="weightKg" label="Weight (in kg)" type="number" />
      </div>
      <div v-else>
        <q-select filled v-model.number="heightFeet" :options="feetOptions" label="Feet" />
        <q-select filled v-model.number="heightInches" :options="inchOptions" label="Inches" />
        <q-input filled v-model.number="weightLbs" label="Weight (in lbs)" type="number" />
      </div>
      <q-select filled v-model="activityLevel" :options="activityOptions" label="Activity Level" emit-value map-options/>
      <q-btn color="primary" label="Calculate Calorie Intake" @click="calculateCalories" />
      <div v-if="caloriesResult !== null">
        <q-card class="q-mt-md">
          <q-card-section>
            Your estimated daily calorie intake is: <strong>{{ Math.round(caloriesResult) }} calories</strong>.
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'CalorieIntakeCalculator',
  setup() {
    const age = ref<number | null>(null);
    const gender = ref<string | null>(null);
    const heightFeet = ref<number | null>(null);
    const heightInches = ref<number | null>(null);
    const heightCm = ref<number | null>(null);
    const weightKg = ref<number | null>(null);
    const weightLbs = ref<number | null>(null);
    const activityLevel = ref<string | null>(null);
    const caloriesResult = ref<number | null>(null);
    const useMetric = ref<boolean>(false);

    const genderOptions = [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' }
    ];

    const activityOptions = [
      { label: 'BMR (Basic Metabolic Rate)', value: 'bmr' },
      { label: 'Sedentary (little or no exercise)', value: 'sedentary' },
      { label: 'Lightly active (light exercise/sports 1-3 days/week)', value: 'lightly' },
      { label: 'Moderately active (moderate exercise/sports 3-5 days/week)', value: 'moderately' },
      { label: 'Very active (hard exercise/sports 6-7 days a week)', value: 'very' },
      { label: 'Extra active (very hard exercise/sports & physical job or 2x training)', value: 'extra' }
    ];

    const feetOptions = Array.from({ length: 6 }, (_, i) => i + 3);
    const inchOptions = Array.from({ length: 11 }, (_, i) => i + 1);

    const calculateCalories = () => {
      let weight = useMetric.value ? weightKg.value : (weightLbs.value ? weightLbs.value / 2.20462 : 0);
      let height = useMetric.value ? heightCm.value : ((heightFeet.value ? heightFeet.value * 30.48 : 0) + (heightInches.value ? heightInches.value * 2.54 : 0));

      if (gender.value && weight && height && age.value) {
        let bmr = gender.value === 'male'
          ? (10 * weight) + (6.25 * height) - (5 * age.value) + 5
          : (10 * weight) + (6.25 * height) - (5 * age.value) - 161;

        let activityMultiplier = getActivityMultiplier(activityLevel.value);
        caloriesResult.value = bmr * activityMultiplier;
      }
    };

    const getActivityMultiplier = (activity: string | null): number => {
      switch (activity) {
        case 'lightly':
          return 1.375;
        case 'moderately':
          return 1.55;
        case 'very':
          return 1.725;
        case 'extra':
          return 1.9;
        case 'sedentary':
          return 1.2;
        default:
          return 1; // BMR
      }
    };

    watch(useMetric, (newVal) => {
      if (newVal) {
        // Convert to metric
        if (heightFeet.value !== null && heightInches.value !== null) {
          heightCm.value = Math.round((heightFeet.value * 30.48) + (heightInches.value * 2.54));
        }
        if (weightLbs.value !== null) {
         weightKg.value = Math.round(weightLbs.value / 2.20462);
        }
      } else {
        // Convert to imperial
        if (heightCm.value !== null) {
          const totalInches = heightCm.value / 2.54;
          heightFeet.value = Math.floor(totalInches / 12);
          heightInches.value = Math.round(totalInches % 12);
        }
        if (weightKg.value !== null) {
          weightLbs.value = Math.round(weightKg.value * 2.20462);
        }
      }
    });

    return {
      age,
      gender,
      heightFeet,
      heightInches,
      heightCm,
      weightKg,
      weightLbs,
      activityLevel,
      caloriesResult,
      useMetric,
      genderOptions,
      activityOptions,
      feetOptions,
      inchOptions,
      calculateCalories
    };
  }
});
</script>
