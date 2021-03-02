<template>
    <div class="page">
    <q-card class="cardLogin">
      <q-card-section>
        <h1 class="title">goclinic</h1>
        <q-form  @submit="onSubmit"  @reset="onReset" ref="myForm">
          <q-input v-model="name" label="Nome Completo" type="text" :rules="required"/>
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
          <q-input v-model="cellPhone" type="tel" label="Telefone Celular" mask="(##) ##### - ####" :rules="rulesCell"/>
          <q-select v-model="scope" :options="options" label="Função na clínica" :rules="required"/>
          <q-card-actions class="nav">
            <q-btn style="width: 150px" type="submit" color="primary">Cadastrar</q-btn>
            <q-btn style="width: 150px" type="reset" color="secondary">Cancelar</q-btn>
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import router from '../router'
export default {
  name: 'Login',
  data: () => {
    return{
      name: '',
      email: '',
      password: '',
      cellPhone:'',
      telphone:'',
      scope: '',
      isPwd: true,
      required: [v => !!v || 'Este campo é obrigatório'],
      rulesEmail: [v => !!v || 'E-mail é obrigatório',
                   v => /.+@.+\..+/.test(v) || 'E-mail inválido'],
      rulesPwd: [v => !!v || 'Senha é obrigatório',
                 v => v.length >= 6 || 'A senha deve conter pelo menos 6 caracteres',],
      rulesCell: [v => !!v || 'Este campo é obrigatório',
                  v => v.length>=11 || 'Insira um telefone com 9 digítos além do DDD'],
      options: ['Profissional', 'Atendente', 'Administrador']
    }
  },
  methods:{
     onSubmit () {
       console.log("submit")
      this.$refs.myForm.validate().then(success => {
        if (success) {
          console.log("validado")
        }
        else {
          this.$q.notify({
          color: 'error',
          textColor: 'white',
          icon: 'clear',
          message: 'Submitted'
        })
        }
      })
    },

    onReset () {
      console.log("reset")
      router.back()
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