<template>
    <div class="page">
    <img src="../assets/goclinicTemplate.png" alt="">
    <q-card class="cardLogin">
      <q-card-section>
         <img src="../assets/goclin.png"  class="logo" alt="">
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
import { register } from '../services/api'
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
                 v => v.length >= 6 || 'A senha deve conter pelo menos 6 caracteres',
                 v =>  /^(?=.*\d)(?=.*[a-z])/.test(v) || 'A senha deve conter números e letras'],
      rulesCell: [v => !!v || 'Este campo é obrigatório',
                  v => v.length>=11 || 'Insira um telefone com 9 digítos além do DDD'],
      options: [
        {label:'Profissional', value: 'professional'}, 
        {label:'Atendente', value:'attendant'}, 
        {label:'Administrador', value:'administrator'}
      ]
    }
  },
  methods:{
    async requestRegister(){
       
    },

    async onSubmit () {
      const res = await register({
        email: this.email,
        password:this.password,
        name: this.name,
        cellPhone: this.cellPhone,
        scope: this.scope.value
      })
      if(res.hasError){
        this.$q.notify({
          message: res.error,
          color: 'red',
          position: 'top'
        })
      }else {
        router.push({path: '/login'})
      }
    },
        
    

    onReset () {
      console.log("reset")
      router.back()
    },

  }
}
</script>
<style lang="scss">
$main-bg-color: #e2e2e2;
.page{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    min-height: 100vh;
    background: $main-bg-color;
}
.cardLogin{
    width: 50%;
    padding: 10px;
    margin-right: 30px;
}

.nav{
  display: flex;
  justify-content: space-around;
}

img{
  height: 100vh;
}

.logo{
  width: 150px;
  height: 50px;
}
</style>