import icons from "../assets/images/icons.png";
import Nav from "../components/Nav";
import { ActionButton } from "../components/ActionButton";
import { useState } from "react";
import { signUpParticipant } from "../helpers/raffle.helper";
import escudoFeliz from "../assets/images/escudo-feliz.gif";
import Loader from "../components/Loader";

export function Participate() {

    const [isLoading, setIsloading] = useState(false);

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const userHasPlayed = JSON.parse(localStorage.getItem('userHasPlayed') || '{}');
    // const userIsRegistered = JSON.parse(localStorage.getItem('userIsRegistered') || '{}');
    const userIsRegistered = true;

    // debugger
    if (isLoading) return <Loader />;

    if (userIsRegistered === true) {
        // debugger
        return (
                   
            <main className="px-12 animate-slide-in-1 gap-0">
                <img src={escudoFeliz} className="w-6/12" alt="Result" />
                <p className="main__title mt-4 font-bold">¡Gracias por registrarte!</p>
                    {/* <p className="score-message font-bold text-4xl">{message}</p> */}
                <ActionButton url="/" text="Volver" className="mt-8 w-6/12"/>
            </main>
        )
    }

    const sendData = async () => {

        setIsloading(true);

        if (userIsRegistered === "true") return;

        const participantData: ParticipantType = {
            userId: userData.data.id,
            userName: userData.data.attributes.name,
            userCompany: userData.data.attributes.company,
            userPhone: userData.data.attributes.phone,
            level: 1,
            hasPlayed: userHasPlayed === "true",
          };
          try {
            // await signUpParticipant(participantData);
            const response = await signUpParticipant(participantData);
            setIsloading(false)
            console.log("Raffle response:", response);
            
            localStorage.setItem('userIsRegistered', "true");
            // debugger;
          } catch (error) {
            console.error('Error submitting data:', error);
        }
    }

    

    
    return (
        <main className="px-12 animate-slide-in-1">
            {/* <img src={logo} className="w-64"/> */}
            {/* <p className="mt-4">Producción y Comercialización de productos químicos 🧪</p> */}
            <div className="flex flex-col w-full md:w-10/12 lg:w-8/12 text-center py-6">
                <h1 className="text-6xl font-bold mt-2 uppercase">¡Participa y gana!</h1>
                <p className="text-3xl mt-8 font-bold">Regístrate ahora y gana un<br /> premio sensacional</p>
            </div>
            <div className="flex flex-col w-full md:w-8/12 lg:w-3/12 mt-4 text-center">

                <ActionButton onClick={sendData} text="Registrarse" />
                
                <img src={icons} className="mt-16"/>
                <Nav />
                {/* <p>No eres Juan? Empieza una nueva partida</p> */}
            </div>
        </main>
    )
}