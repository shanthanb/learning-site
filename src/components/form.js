import React,{useState} from 'react';
import Register from './register';
import Select from 'react-select';
import NameValidation from './validatename';
import EmailValidation from './validatemail';
import axios from 'axios';

const Form = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [error,setError] = useState("");
    const [items,setItems] = useState([]);
    const [interest,setInterest] = useState([]);

    const handleName = (e) => { setName(e.target.value);}
    const handleEmail = (e) => { setEmail(e.target.value);}
    
    const postData = () => {
        Register(name,email,interest);
        alert("You are successfully registered!");
        window.location.reload();
    } 

    const validateForm = () => {
        
        if(NameValidation(name) !== "")
        { setError(NameValidation(name));
             return;
            }
        
            if(EmailValidation(email) !== "")
        { setError(EmailValidation(email));
             return;
            }

        if(interest.length === 0)
        { setError("Mention your Interests"); 
         return;
        }
        
        setError("");
        postData();
    }

    const getData = async (e) => {
        const newData = await axios.get(`https://webit-keyword-search.p.rapidapi.com/autosuggest?q=${e}&language=en&rapidapi-key=28728db04dmsh34d3f140dd059fap1c388ejsn7288577afcf7`);
        const arr = newData.data.data.results;
        const num = newData.data.data.number;
        const newItems = [];
        for(let i=0;i<num;i++){
            newItems[i] = {label:arr[i], value:i+1};
        }
        if(newItems[0].label === undefined){ setItems([]);}
        else{ setItems(newItems);}
    }

    const handleChange = (event) => {
        if(interest.length >= 3)
         { 
             setError("Only 3 interests are allowed"); 
            setItems([]);
             return;
            }
        if(event.length >= 2)
        { 
            getData(event);
         }
        setError("");
    }

    const handleSelect = (e) => { 
        setInterest(Array.isArray(e) ? e.map(x => x.label) : []);
    }

    return(
        <div className="reg-form">
            <form action="" className="form">
                <h1 className="form-title">REGISTRATION</h1>
                <div className="query">
                    {error}
                </div>
                <div className="form-div">
                    <input type="text" value={name} onChange={handleName} className="form-input" placeholder=" " />
                    <label htmlFor="" className="form-label">Username</label>
                </div>
                <div className="form-div">
                    <input type="email" value={email} onChange={handleEmail} className="form-input" placeholder=" " />
                    <label htmlFor="" className="form-label">Email</label>
                </div>
                <div className="form-div">
                <Select isMulti className="form-input form-select" onInputChange={handleChange} onChange={handleSelect} placeholder="Mention 3 Interests"  options={items} />
                </div>
                <input type="button" onClick={validateForm} className="form-button" value="Sign In" />
            </form>
        </div>
    )
}

export default Form;