import { useEffect, useState } from "react";
import './SaludoWuipy.css'

export default function SaludoWuipy() {
  const [phrase, setPhrase] = useState([]);
  const [randomNumber, setRandomNumber] = useState(0);

    useEffect(() => {
        const fetchPhrase = async () => {
       try{
        const response = await fetch("https://www.positive-api.online/phrases/esp");
        const data = await response.json(); 

        setPhrase(data);
       } catch (error) {
        console.error("Error fetching phrase:", error);
       } finally {
        const randomIndex = Math.floor(Math.random() * 40);
        setRandomNumber(randomIndex);
       }
      }

      fetchPhrase();
    }, []);

    return(
        <div>
            <h1>Hola Clase</h1>
            <p>{phrase[randomNumber]?.text}</p>
        </div>
    )
    
         
}