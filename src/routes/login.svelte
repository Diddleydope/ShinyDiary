    <script>
        import { getAuth, createUserWithEmailAndPassword, 
            signInWithEmailAndPassword } from "firebase/auth";
        import {db, auth} from './+page.svelte';
        let email = "";
        let password = "";

        auth.onAuthStateChanged(user => {
            if(user){
                console.log("user has just logged in " , user);
            }else{
                console.log("user has logged out");
            }
        })

        //AUTH CHANGE RUNNING MULTIPLE TIMES --> WHY?
    </script>
    
    
    <div class="loginContainer">
        <input  id= "emailInput" class="loginButtons" type="email" bind:value={email}/>
        <br>
        <input  id= "passwordInput" class= "loginButtons" type="password" bind:value={password}/>
    </div>

    <div class="buttonContainer">
        <!--Sign user in-->
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

        <!--Sign user out-->
        <button type="submit" class = "Buttons" 
        on:click={() => auth.signOut()}>Sign out</button>
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
    