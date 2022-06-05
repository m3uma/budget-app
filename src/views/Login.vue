<template>
  <Header :title-text="title" @tick="e => msg = e" />
  <article>
    <div>
      <img src="@/assets/icons/person.png" alt="person">
      <span>Signing in is required to identify your data</span>
    </div>
    <form @submit.prevent="handleSubmit">
      <label for="email">Email</label>
      <input type="email" name="email" placeholder="Enter your email addres" v-model="email" required />

      <label for="password">Password</label>
      <input type="password" name="password" placeholder="Enter your email password" v-model="password" required />

      <button>Log in</button>
      <div v-if="isLoading">Loading...</div>
      <div v-if="error">{{ error }}</div>
    </form>
    <div class="info-account">
      <span>You don’t have an account yet?</span>
      <router-link :to="{ name: 'SignUp' }">Sign up here</router-link>
    </div>
  </article>
</template>

<script setup>
import Header from '@/components/molecules/Header.vue';
import { login } from '@/composable/firesbase';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const title = ref("Sign in")
let msg = ref('')

const router = useRouter();

const email = ref('');
const password = ref('');

const isLoading = ref(false);
const error = ref(null);

const handleSubmit = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    await login({ email: email.value, password: password.value });
    router.push('/');
  } catch (e) {
    error.value = e.message;
    isLoading.value = false;
  }
};
</script>

<style scoped lang="scss">
article {
  margin-top: 105px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto';
  font-style: normal;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    img {
      width: 6rem;
      padding: 2rem;
    }
    span {
      font-weight: 400;
      font-size: 20px;
      line-height: 23px;
      text-align: center;

      color: #64615F;
    }
  }
  form {
    max-width: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-weight: 500;
    border-top: 1px solid #E8E8E8;
    padding-top: 1.5rem;
    label {
      font-size: 20px;
      line-height: 28px;
      color: #64615F;
      padding-top: 0.5rem
    }
    input {
      border: none;
      border-bottom: 1px solid #E8E8E8;
      margin-bottom: 0.5rem;
      font-weight: 400;
      font-size: 15px;
      line-height: 23px;
      color: #878787;
      outline: none;
    }
    button {
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      padding: 0.6rem 1.5rem;
      letter-spacing: 0.1em;
      border: none;
      color: #FFFFFF;
      background: linear-gradient(95.98deg, #FF7F0A 0%, #FF7A00 100%);
      border-radius: 8px;
      margin: 0.7rem 0 0 auto;
      text-transform: uppercase;
    }
  }
  .info-account {
    position: fixed;
    bottom: 0;
    height: 93px;
    width: 100%;
    background: rgba(217, 217, 217, 0.15);
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
      font-weight: 400;
      font-size: 20px;
      line-height: 23px;
      color: #64615F;
    }
    a {
      font-weight: 500;
      font-size: 20px;
      line-height: 23px;
      text-decoration: none;
      color: #FF7B02;
      margin-top: 0.3rem;
    }
  }
}

@media (max-width: 576px) {
  article {
      > div { 
        img {
          width: 3rem;
        }
        span {
          font-size: 18px;
        }
      }
      form {
      max-width: 320px;
      padding: 1.5rem 1rem;
      button {
        margin-top: 3rem;
      }
    }
  }
}
</style>
