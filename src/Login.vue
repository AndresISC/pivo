<template>
	<v-flex>
		<v-toolbar class="pink lighten-1 white--text">
			<v-toolbar-title>
				{{ title }}
			</v-toolbar-title>
		</v-toolbar>
		<v-container>
			<v-layout row>
				<v-flex xs4></v-flex>
				<v-flex xs4>
					<v-card class="white lighten-1 black--text">
						<v-toolbar class="pink lighten-1 white--text">
							<v-toolbar-title>
								{{ login }}
							</v-toolbar-title>
						</v-toolbar>
					  <v-card-title primary-title>
					    <div class="subheading">{{ inputs }}</div>
					  </v-card-title>
					    <v-form v-model="loginForm" ref='loginForm'>
					    	<v-container grid-list-md text-xs-center>
						    	<v-flex xs11>
						            <v-text-field
						              name="username"
						              label="Nombre de usuario"
						              id="username"
						              prepend-icon="perm_identity"
						              v-model="username"
						              required
						              :rules="[() => username.length> 0 || 'Indica tu nombre de usuario']">
						              </v-text-field>

						            <v-text-field
						              name="password"
						              label="Contraseña"
						              id="password"
						              prepend-icon="lock"
						              :append-icon="passwordField ? 'visibility' : 'visibility_off' "
						              :append-icon-cb="() => (passwordField = !passwordField)"
						              :type="passwordField ? 'password' : 'text'"
						              v-model="password"
						              required
						              :rules="[() => password.length > 0 || 'Indica tu contraseña' ]">
						              </v-text-field>
	            				 <small>*Indica campo requerido</small>
						         </v-flex>
						    </v-container>
					    </v-form>
						<v-card-actions class="pink lighten-1 white--text pa-2">
							<v-btn
							@click="loginAttempt"
							flat dark>{{ enter }}
							 <v-icon right dark>send</v-icon>
							</v-btn>
        				</v-card-actions>
        				<v-snackbar
					      :timeout="20000"
					      :top="true"
					      :right="true"
					      :multi-line="true"
					      :error="true"
					      :vertical="mode === 'vertical'"
					      v-model="wrongLogin">
					      {{ snackbar_text }}
					    </v-snackbar>
					</v-card>
				</v-flex>
				<v-flex xs4></v-flex>
			</v-layout>
		</v-container>

		<v-footer class="pa-3 pink lighten-1 white--text" :fixed="true">
		    <v-spacer>{{ footer_content }} {{  new Date().getFullYear() }}</v-spacer>
		    <div>{{ all_rights }}</div>
		</v-footer>

	</v-flex>
</template>

<script>

	import userLogin from './api/Login'

	export default {
	  data(){
	    return {
	      title: 'Pivo',
	      login: 'Inicio de sesión',
	      inputs: 'Indica tus credenciales',
	      enter: 'Entrar',
	      footer_content: '© Pivo - Trademark',
	      all_rights: 'Todos los derechos reservados',
	      snackbar_text: '',
	      username:'',
	      password:'',
	      passwordField: true,
	      wrongLogin:false,
	      valid:false
	    }
	  },
	  methods:{
	  	loginAttempt () {
	  		if(!(this.username.length>0) || !(this.password.length>0))
	  			this.snackbar_text = 'Indica tu usuario y contraseña'
			if (this.$refs.loginForm.validate()) {

	          	let	params = {
		  			email: this.username,
		  			password: this.password
		  		};
		  		userLogin.userLogin(params)
		  		.then(data => {
<<<<<<< HEAD
						console.log(data.data.payload.token);
		  		if(data.hasOwnProperty('token'))
					this.snackbar_text = data;//'Acceso correcto, prro >:v'
=======
		  		let token = data.data.payload.token;
		  		if( token.length > 0 )
					this.snackbar_text = 'Acceso correcto, prro >:v' //router.push('./App')		  			
>>>>>>> 696305e07f30190b62e314e178e9cf2afe4b00d0
	  			else
	  				if(!(token.length>0))
	  					this.snackbar_text = 'Usuario y contraseña incorrectos'
	  				else
	  					this.snackbar_text = 'Algo pasó mal'
		  		})
		  		.catch(data => {
	  					this.snackbar_text = 'Se presentó un error'
		  		})
			}
	  		this.wrongLogin = true;
	  	}
	  }
	}

</script>

<style>
  @import '../node_modules/vuetify/dist/vuetify.min.css';
</style>
