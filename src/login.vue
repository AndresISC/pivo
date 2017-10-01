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
					              :append-icon="e1 ? 'visibility' : 'visibility_off' "
					              :append-icon-cb="() => (e1 = !e1)"
					              :type="e1 ? 'password' : 'text'"
					              v-model="password"
					              required
					              :rules="[() => password.length > 0 || 'Indica tu contraseña' ]">
					              </v-text-field>
            				 <small>*Indica campo requerido</small>
					         </v-flex>
					    </v-container>
					  </v-card-title>

						<v-card-actions class="pink lighten-1 white--text pa-2">
							<v-btn  flat dark>{{ enter }}
							 <v-icon right dark>send</v-icon>
							</v-btn>
        		</v-card-actions>

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

	export default {
	  data(){
	    return {
	      title: 'Pivo',
	      login: 'Inicio de sesión',
	      inputs: 'Indica tus credenciales',
	      enter: 'Entrar',
	      footer_content: '© Pivo - Trademark',
	      all_rights: 'Todos los derechos reservados',
	      e1: true,
	      username:'',
	      password:''
	    }
	  },
	}

</script>

<style>
  @import '../node_modules/vuetify/dist/vuetify.min.css';
</style>
