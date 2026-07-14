<template>

<div class="container py-5">
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card shadow">
        <div class="card-body p-4">
          <h2 class="text-center mb-4">
            {{ isLogin ? 'Iniciar sesión' : 'Crear cuenta' }}
          </h2>

          <!-- Aquí irá el formulario -->
          <form @submit.prevent="submit" novalidate>
            <div class="mb-3">
                <label class="form-label">Correo electrónico</label>
                <input type="email" v-model="form.email" 
                    class="form-control"
                    :class="{ 'is-invalid': errors.email}"
                    @input="errors.email=''"/>
                <div class="invalid-feedback">
                    {{ errors.email }}
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Contraseña</label>
                <input type="password" class="form-control"
                    v-model="form.password"
                    :class="{ 'is-invalid': errors.password}">
                <div class="invalid-feedback">
                    {{ errors.password }}
                </div>
            </div>
            <div v-if="!isLogin" class="mb-3">
                <label class="form-label">Repetir contraseña</label>
                <input type="password" class="form-control"
                    v-model="form.repeatPassword"
                    :class="{ 'is-invalid': errors.repeatPassword}">
                <div class="invalid-feedback">
                    {{ errors.repeatPassword }}
                </div>
            </div>
            <button class="btn btn-primary w-100" type="submit">
                {{ isLogin ? 'Entrar' : 'Crear cuenta' }}
            </button>
            <div class="text-center mt-4">
            <button class="btn btn-link" type="button"
                @click="isLogin = !isLogin">
                {{ isLogin
                ? '¿No tienes cuenta? Crear una'
                : '¿Ya tienes cuenta? Iniciar sesión'
                }}
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script setup>

import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'
import { useToastStore } from '../../stores/toast'

const auth = useAuthStore()
const router = useRouter()
const toast = useToastStore()

import { ref, reactive } from 'vue'

const isLogin = ref(true)

const form = reactive({
  email: '',
  password: '',
  repeatPassword: ''
})

const errors = reactive({
  email: '',
  password: '',
  repeatPassword: ''
})

function validate() {
    errors.email=''
    errors.password=''
    errors.repeatPassword=''

    let valid = true

  if (!form.email.trim()) {
    errors.email = 'El nombre es obligatorio'
    valid = false
  }
  if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Formato incorrecto'
    valid = false
  }
  if (form.password.length < 6) {
    errors.password = 'Longitud mínima, 6 caracteres'
    valid = false
  }
  if (!isLogin.value &&
      form.password !== form.repeatPassword) {
    errors.repeatPassword = 'No coincide'
    valid = false    
  }

  return valid
}

async function submit() {
    console.log("submit")
  if (!validate()) { 
    console.log("no valida")
    return }
  try {
    if (isLogin.value) {
    console.log("login")
      await auth.login( form.email, form.password )
    } else {
    console.log("registro")
      await auth.register( form.email, form.password )
    }
    await router.push('/productos')
  } catch (error) {
     console.log("toast")
       console.log(error)

  console.log(error.code)

  console.log(error.message)

   toast.show( getFirebaseError(error.code), 'danger' )
  }
}

function getFirebaseError(code) {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Ya existe una cuenta con ese correo.'
    case 'auth/invalid-credential':
      return 'Correo o contraseña incorrectos.'
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres.'
    default:
      return 'Ha ocurrido un error.'
  }
}

// lo siguiente es sólo para depurar
import { watch } from 'vue'

watch(form, () => {
  console.log(JSON.stringify(form))
}, { deep: true })

</script>