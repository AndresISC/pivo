<template>
	<div id="app">
		<v-flex>

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
						    <div class="subheading">{{ inputs }} {{ error_message }}</div>
						  </v-card-title>
						    <v-form ref='loginForm'>
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
								@click='tryLogin'
								flat dark>{{ enter }}
								 <v-icon right dark>send</v-icon>
								</v-btn>
	        				</v-card-actions>
	        				<v-snackbar
						      :timeout="2000"
						      :top="true"
						      :right="true"
						      :multi-line="true"
						      :error="true"
						      :vertical="mode === 'vertical'"
						      v-model="loginStatus">
						      {{ message }}
						    </v-snackbar>
						</v-card>
					</v-flex>
					<v-flex xs4></v-flex>
				</v-layout>
			</v-container>
		</v-flex>
	</div>
</template>

<script>

	import userLogin from '../api/Login'

	export default {
	  data(){
	    return {

	      login: 'Inicio de sesión',
	      inputs: 'Indica tus credenciales',
	      enter: 'Entrar',
	      message: '',
	      username:'',
	      password:'',
	      passwordField: true,
	      loginStatus:false,
	      valid:false,
				mode: 'vertical'
	    }
	  },
	  computed:{
	  	error_message(){
	  	}
	  },
	  methods:{
	  	tryLogin(){
	  		this.loginStatus = false
	  		if(!(this.username.length>0) || !(this.password.length>0))
	  			this.snackbarMessage = 'Indica tu usuario y contraseña'
	  		if (this.$refs.loginForm.validate()) {
	          	let	params = {
		  			email: this.username,
		  			password: this.password
		  		};
		  		this.$store.dispatch('loginAttempt',params).
		  		then( response => {
		  			this.loginStatus = response.status
		  			this.message = response.message
		  		}).catch( response => {
		  			this.loginStatus = response.status
		  			this.message = response.message
		  		})
			}
	  	}
	  },
	  resetSnackbar(){
	  	this.loginStatus = false
	  }
	}

</script>

<style>
  @import '../../node_modules/vuetify/dist/vuetify.min.css';
</style>
