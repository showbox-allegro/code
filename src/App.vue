<template>
	<div id="app">  
		<div>
			<s-main 
				v-if="logged"
				@logout="logged=false"
			/>
		</div>

		<s-mask v-if="!logged">
			<s-login 
				v-if="!signup"
				@login="logged=true"
				@signup="signup=true"
			/>
			<s-signup 
				v-if="signup" 
				@login="signup=false"
				@createAccount="logged=true"
			/>	
		</s-mask>
	
  </div>
</template>

<script>
import Main from "./components/main/Main";
import Mask from "./components/layout/Mask";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";

export default {
	name: 'App',
	components: {
		SMain: Main,
		SLogin : Login,
		SSignup: Signup,
		SMask: Mask
	},
	data(){
		return {
			logged: false,
			signup: false
		}
	},

}
</script>


