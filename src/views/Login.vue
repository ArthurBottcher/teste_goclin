<template>
  <div class="page">
    <q-card class="cardLogin">
      <q-card-section>
        <q-form  @submit="onSubmit"  @reset="onReset">
          <h1 class="title">Goclin</h1>
          <q-input v-model="emailInput" label="Email" type="email"  :rules="rulesEmail" />
          <q-input v-model="password" label="Senha" :type="isPwd ? 'password' : 'text'" :rules=rulesPwd>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        <q-card-actions class="nav">
          <q-btn style="width: 150px" color="primary" type="submit" >Entrar</q-btn>
          <q-btn style="width: 150px" color="secondary" type="reset">Cadastre-se</q-btn>
        </q-card-actions>
      </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import router from '../router'
import {login} from '../services/api'
export default {
  name: 'Login',
  data: () => {
    return{
      emailInput: '',
      password: '',
      isPwd: true,
      rulesEmail: [v => !!v || 'E-mail é obrigatório',
                   v => /.+@.+\..+/.test(v) || 'E-mail inválido'],
      rulesPwd: [v => !!v || 'Senha é obrigatório',
                 v => v.length >= 6 || 'A senha deve conter pelo menos 6 caracteres',
                 v =>  /^(?=.*\d)(?=.*[a-z])/.test(v) || 'A senha deve conter números e letras']
    }
  },

  methods: {
    async onSubmit(){
      const res = await login({email: this.emailInput, password:this.password})
      if(res.hasError){
        this.$q.notify({
          message: res.error,
          color: 'negative',
          position: 'top'
        })
      } else{
        router.push({path: '/home'})
      }
    },

    onReset(){
      console.log("Estou aqui.")
      router.push({path: '/register'})
    }
  }
}
</script>
<style lang="scss">
//exemplo de uso alem da pasta ../styles que tbm utiliza scss
$main-bg-color: #a0a4a8;
$title-color: #3ba0ea;
.page{
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    min-height: 100vh;
    background: $main-bg-color;
}
.cardLogin{
    width: 50%;
    padding: 10px;
}

.title{
    font-size: 18pt;
    color: $title-color
}

.nav{
  display: flex;
  justify-content: space-around;
}
</style>