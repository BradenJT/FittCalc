<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md">
      <q-toggle v-model="useMetric" label="Use Metric System" />
      <q-input filled v-model="age" label="Age" type="number" />
      <q-select filled v-model="gender" :options="genderOptions" label="Gender" />
      <div v-if="useMetric">
        <q-input filled v-model="heightCm" label="Height (in cm)" type="number" v-if="useMetric" />
      </div>
      <div v-else>
        <q-select filled v-model="heightFeet" :options="feetOptions" label="Feet"  />
        <q-select filled v-model="heightInches" :options="inchOptions" label="Inches" />
      </div>
      <q-input filled v-model="weightKg" label="Weight (in kg)" type="number" v-if="useMetric" />
      <q-input filled v-model="weightLbs" label="Weight (in lbs)" type="number" v-else />
      <q-select filled v-model="activityLevel" :options="activityOptions" label="Activity Level" />
      <q-btn color="primary" label="Calculate Calorie Intake" @click="calculateCalories" />
      <div v-if="caloriesResult !== null">
        <q-card class="q-mt-md">
          <q-card-section>
            Your estimated daily calorie intake is: <strong>{{ caloriesResult }} calories</strong>.
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { GenderOption, ActivityOption } from 'components/models'; // Adjust the path as necessary

export default defineComponent({
  name: 'CalorieIntakeCalculator',
  data() {
    return {
      age: null as number | null,
      gender: null as string | null,
      heightFeet: null as number | null,
      heightInches: null as number | null,
      heightCm: null as number | null,
      weightKg: null as number | null,
      weightLbs: null as number | null,
      activityLevel: null as string | null,
      caloriesResult: null as number | null,
      totalInches: null as number | null,
      BMR: null as number | null,
      useMetric: false,
      genderOptions: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
      ] as GenderOption[],
      activityOptions: [
        { label: 'Sedentary (little or no exercise)', value: 'sedentary' },
        { label: 'Lightly active (light exercise/sports 1-3 days/week)', value: 'lightly' },
        { label: 'Moderately active (moderate exercise/sports 3-5 days/week)', value: 'moderately' },
        { label: 'Very active (hard exercise/sports 6-7 days a week)', value: 'very' },
        { label: 'Extra active (very hard exercise/sports & physical job or 2x training)', value: 'extra' }
      ] as ActivityOption[],
      feetOptions: [1,2,3,4,5,6,7,8,9],
      inchOptions: [1,2,3,4,5,6,7,8,9,10,11],
    };
  },
  methods: {
    calculateCalories() {
      if(this.useMetric === true){
        if(this.gender === 'male'){
          if(this.weightKg !== null && this.heightCm !== null && this.age !== null){
          this.caloriesResult = ((this.weightKg * 10) + (this.heightCm * 6.25) - (5 * this.age)) - 5
          }
        }
        else{
          if(this.weightKg !== null && this.heightCm !== null && this.age !== null){
          this.caloriesResult = ((this.weightKg * 10) + (this.heightCm * 6.25) - (5 * this.age)) - 161
          }
        }
      }
      else{
        if(this.gender === 'male'){
          if(this.weightLbs !== null && this.totalInches !== null && this.age !== null){
          this.caloriesResult = ((this.weightLbs * 10) + (this.totalInches * 6.25) - (5 * this.age)) - 5
          }
        }
        else{
          if(this.weightLbs !== null && this.totalInches !== null && this.age !== null){
          this.caloriesResult = ((this.weightLbs * 10) + (this.totalInches * 6.25) - (5 * this.age)) - 161
          }
        }
      }
    }
  },
  watch: {
  useMetric(newVal: boolean) {
    if (newVal) {
      // Converting from imperial to metric
      if (this.weightLbs !== null) {
        this.weightKg = Math.round((this.weightLbs / 2.20462) * 100) / 100;
      }
      if (this.heightFeet !== null && this.heightInches !== null) {
        // Total height in inches
        this.totalInches = (this.heightFeet * 12) + this.heightInches;
        // Convert inches to cm
        this.heightCm = Math.round(this.totalInches * 2.54);
      }
    } else {
      // Converting from metric to imperial
      if (this.weightKg !== null) {
        this.weightLbs = Math.round((this.weightKg * 2.20462) * 100) / 100;
      }
      if (this.heightCm !== null) {
        // Convert cm to total inches
        this.totalInches = this.heightCm / 2.54;
        // Extract feet from total inches
        this.heightFeet = Math.floor(this.totalInches / 12);
        // Remaining inches
        this.heightInches = Math.round(this.totalInches % 12);
      }
    }
  }
}

});
</script>






