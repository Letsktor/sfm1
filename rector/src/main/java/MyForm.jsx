import MyDatePicker from "./MyDatePicker";
import React, {useEffect, useState} from "react";
import axios from "axios";
import emailjs from '@emailjs/browser';




function MyForm({selectedDate,animalId,animalName})
{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setDate] = useState(null);
    const animalid=animalId;
    const animalname=animalName;
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formattedDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
        const formData = {
            name,
            email,
            tel: phoneNumber,
            date:formattedDate,
            animal_id:animalid,
        };
        console.log(phoneNumber);
        try {
            const response = await axios.post('http://127.0.0.1:8080/date', formData);

        } catch (error) {
            console.error(error);
        }
        emailjs.sendForm('service_gd0pu5s', 'template_macd55m',event.target, 'F9HNYGLfLoHqaQ-yT')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                window.location.reload();
            }, (err) => {
                console.log('FAILED...', err);
            });

    };

return(<form onSubmit={handleSubmit} style={{display: "flex",flexDirection:"column",width:300,margin:0}}>
    <label style={{marginBottom:"0.5em",fontWeight:"bold"}}>
        Name:
    </label>
    <input type={"text"} name={"to_name"} style={{padding:"0.5em",border:"1px solid #ddd",borderRadius:"0.3em"}}  onChange={(e)=>setName(e.target.value)}/>
    <label style={{marginBottom:"0.5em",fontWeight:"bold"}}>
        Email:
    </label>
    <input type={"email"} name={'to_email'} style={{padding:"0.5em",border:"1px solid #ddd",borderRadius:"0.3em"}} onChange={(e)=>setEmail(e.target.value)}/>
    <label style={{marginBottom:"0.5em",fontWeight:"bold"}}>
        Phone Number:
    </label>
    <input type={"tel"} name={"to_number"} style={{padding:"0.5em",border:"1px solid #ddd",borderRadius:"0.3em"}} onChange={(e)=>setPhoneNumber(e.target.value)}/>
    <input type="hidden" name="animal_name" value={animalName} />
    <input type="hidden" name="date" value={selectedDate} />
    <input type={"submit"} style={{marginTop:"1em",padding:"0.7em",border:"none",borderRadius:"0.3em",cursor:"pointer",}} className={"submitButton"}/>
</form>)
}
export default MyForm;