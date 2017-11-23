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
									{{ login_text }}
								</v-toolbar-title>
							</v-toolbar>
						  <v-card-title primary-title>
						    <div class="subheading">{{ inputs_text }}</div>
						  </v-card-title>
						    <v-form id="form" ref='loginForm'>
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
								@click='sessionStart'
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
						      v-model="snackbar">
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

	import { mapState,mapGetters } from 'vuex'

	export default {
	  data(){
	    return {
	      login_text: 'Inicio de sesión',
	      inputs_text: 'Indica tus credenciales',
	      enter: 'Entrar',
	      message: '',
	      passwordField: true,
	      snackbar:false,
	      valid:false,
		  mode: 'vertical',
	    }
	  },
	  computed:{
	  	...mapState({
	  		loginForm: state => state.login.form
	  	}),
	  	username: {
            get () { return this.loginForm.username },
            set (value) { this.$store.commit('login/USERNAME', {username: value}) }
        },
        password: {
            get () { return this.loginForm.password },
            set (value) { this.$store.commit('login/PASSWORD', {password: value}) }
        }
	  },
	  methods:{
	  	sessionStart(){
	  		this.$store.dispatch('login/login')
	  		.then( (response) => {
	  			if(response.status)
	  				this.$router.push({path:'home'})
	  			else
	  			{
	  				this.failed(response)
	  			}
	  		} )
	  		.catch( (response) => {
	  				this.failed(response)
	  		} )
	  	},
	  	failed(response){
			this.message = response.message
			this.snackbar = !response.status
			setTimeout(function(){ this.snackbar=false },2000)
	  	}
	  }
	}

</script>

<style>
  @import '../../node_modules/vuetify/dist/vuetify.min.css';
</style>
