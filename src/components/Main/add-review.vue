<template>
      <Form
          @submit="onAddReview"
          :validation-schema="schema"
          v-slot="{ errors }"
      >
      <div class="ec-ratting-star">
          <span>Your rating:</span>
          <div class="ec-t-review-rating">
              <div class="star-rating">
              <i
              v-for="star in maxStars"
              :key="star"
              class="cursor-pointer"
              @click="rate(star)"
              :class="{
                  'ecicon eci-star fill': star <= userRating,
                  'ecicon eci-star-o': star > userRating,
              }"
              ></i>
          </div>
          </div>
      </div>

      <div class="ec-ratting-input form-submit">
            <Field 
              as="textarea"
              name="review"
              placeholder="Enter Your Comment"
              class="mb-0"
              :class="{ 'is-invalid': errors.review }"
            >
          </Field>
          <div class="invalid-feedback text-danger mb-3">{{ errors.review }}</div>
          <button 
              class="btn btn-primary w-100" 
              type="submit"
              value="Submit"
              :disabled="isLoading('AddReview')"
              >
              Submit
              <img src="@/assets/images/common/loader-2.gif" width="20" v-if="isLoading('AddReview')" class="ms-3">
            </button>
      </div>
    </Form>
</template>
<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";

export default {
  components: {
      Form,
      Field,
  },
  props: {
    rating: {
      type: Number,
      default: 1,
    },
    maxStars: {
      type: Number,
      default: 5,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
        userRating: this.rating,
    };
  },
  methods: {
    rate(star) {
      this.userRating = star; // Update the rating as the user clicks a star
      this.$emit('update:rating', star); // Emit the rating back to the parent component
    },
    onAddReview(data){
      data.rating = this.userRating
      data.product_id = this.$route.params.id
      this.$store.dispatch("AddReview", { data: data, toast: this.$toast })
    },
    isLoading(actionName) {
        return this.$store.state.Loading[actionName] || false;
    },
  },
  setup(){
      const schema = Yup.object().shape({
        review: Yup.string().required("Comment is required")
      });
      return {
          schema,
      };
  },
};
</script>