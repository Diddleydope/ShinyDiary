    <script>
        import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
        import {db, auth} from './+page.svelte';
        let email = "hello@gmail.com";
        let password = "1234hello";

        //Sign up the User
        createUserWithEmailAndPassword(auth, email, password).then(cred => {
            console.log("Hello LMAO");
        })

        //PROBLEM --> FUNCTION AUTOMATICALLY EXECUTES, WHY?? 
    </script>
    
    
    <div class="loginContainer">
        <input  id= "emailInput" class="loginButtons" type="email" bind:value={email}/>
        <br>
        <input  id= "passwordInput" class= "loginButtons" type="password" bind:value={password}/>
    </div>

    <div class="buttonContainer">
        <button class="Buttons" id="signin">Sign in</button>
        <button class="Buttons" id="signup" 
        on:click={() => createUserWithEmailAndPassword(auth,email,password)}>Sign up</button>
    </div>
    
    
    <style>
        .loginContainer{
            text-align: center;
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

        .buttonContainer{
            display: flex;
            justify-content: center;
        }

        .Buttons{
            margin-top: 2vh;
            width: 15vw;
            height:4vh;
            border-radius: 3%;
            border-color: transparent;
            background-color:cornsilk;
        }

        #signin{
            margin-right: 0.25vw;
        }

        #signup{
            margin-left: 0.25vw;
        }
    </style>
    