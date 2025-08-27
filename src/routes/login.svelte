    <script lang="ts" context="module">
        import { getAuth, createUserWithEmailAndPassword, 
            signInWithEmailAndPassword } from "firebase/auth";
        import {auth} from './+page.svelte';
        import { loggedIn } from './store';
        import MainPage from './+page.svelte';
        let email = "";
        let password = "";

        

    </script>
    
  

    <div class="Container">
        {#if $loggedIn==false}
                <!--Sign user in-->
            <div class="loginContainer">
                <input  id= "emailInput" class="loginButtons" type="email" bind:value={email}/>
                <br>
                <input  id= "passwordInput" class= "loginButtons" type="password" bind:value={password}/>
            </div>
            
            <div class = buttonContainer>

                <button type="submit" class="Buttons" id="signin" 
                on:click={
                        () => signInWithEmailAndPassword(auth, email, password).then(cred =>{
                        email = "";
                        password = "";
                    })
                }>Sign in</button>


                <!--Sign user up-->
                <button type="submit" class="Buttons" id="signup" 
                on:click={
                        () => createUserWithEmailAndPassword(auth,email,password).then(cred => {
                        email = "";
                        password = "";
                    })
                }>Sign up</button>


        </div>
        {/if}
    </div>
    
    
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

        .loginContainer{
            text-align: center;
            margin-top: 25vh;
        }
    
        .loginButtons{
            display: block;
            scale: 2;
            width: 15vw;
            height: 2vh;
            margin-left: auto;
            margin-right: auto;
            padding: 0;
        }
    
        #passwordInput{
            margin-top: 1vh;
        }


        .Buttons{
            margin-top: 2vh;
            width: 15vw;
            height:4vh;
            border-radius: 3%;
            border-style: solid;
            border:20px;
            border-radius: 10;
            border-color: black;
            background-color:transparent;
        }

        #signin{
            margin-right: 0.25vw;
        }

        #signup{
            margin-left: 0.25vw;
        }

        
    </style>
    