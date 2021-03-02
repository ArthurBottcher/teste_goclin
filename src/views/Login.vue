<template>
  <div class="page">
    <q-card class="cardLogin">
      <q-card-section>
        <h1 class="title">goclinic</h1>
        <q-input v-model="email" label="Email" type="email"  :rules="rulesEmail" />
        <q-input v-model="password" label="Senha" :type="isPwd ? 'password' : 'text'" :rules=rulesPwd>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions class="nav">
        <q-btn style="width: 150px" color="primary">Entrar</q-btn>
        <q-btn style="width: 150px" color="secondary" v-on:click="goToRegisterPage">Cadastre-se</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import router from '../router'
export default {
  name: 'Login',
  data: () => {
    return{
      email: '',
      password: '',
      isPwd: true,
      rulesEmail: [v => !!v || 'E-mail é obrigatório',
                   v => /.+@.+\..+/.test(v) || 'E-mail inválido'],
      rulesPwd: [v => !!v || 'Senha é obrigatório',
                 v => v.length >= 6 || 'A senha deve conter pelo menos 6 caracteres',]
    }
  },

  methods: {
    goToRegisterPage(){
      console.log("Estou aqui.")
      router.push({path: '/register'})
    }
  }
}
</script>
<style lang="scss">
.page{
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    min-height: 100vh;
    background: #ddd;
}
.cardLogin{
    width: 50%;
    padding: 10px;
}

.title{
    font-size: 18pt;
}

.nav{
  display: flex;
  justify-content: space-around;
}
</style>