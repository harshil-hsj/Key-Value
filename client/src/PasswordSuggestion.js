import { useState } from "react";
import './PasswordSuggestion.css';
import { useNavigate } from 'react-router-dom';

function PasswordSuggestion() {
    const [length, setLength] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const generatePassword = () => {
        const len = parseInt(length, 10);
        if (isNaN(len) || len < 8) {
            setPassword('Please enter a number greater than 7');
            return;
        }

        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

        const getRandomCharacter = (str) => str[Math.floor(Math.random() * str.length)];

        let generatedPassword = '';
        generatedPassword += getRandomCharacter(upper);
        generatedPassword += getRandomCharacter(lower);
        generatedPassword += getRandomCharacter(numbers);
        generatedPassword += getRandomCharacter(symbols);

        const allCharacters = upper + lower + numbers + symbols;

        for (let i = generatedPassword.length; i < len; i++) {
            generatedPassword += getRandomCharacter(allCharacters);
        }

        generatedPassword = generatedPassword.split('').sort(() => Math.random() - 0.5).join('');

        setPassword(generatedPassword);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password).then(() => {
            alert('Password copied to clipboard');
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    };

    return (
        <div className="background">
            <h1>Try our new feature!!!</h1>
            <div className='generator'>
                <input
                    className="inputlength"
                    type="number"
                    placeholder="Enter Length from (8-20)"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                 />
                 <button onClick={generatePassword}>Generate Password</button>
                 <div>
                    {password && <p style={{ color: 'green' }}>{password}</p>}
                 </div>
                <button onClick={copyToClipboard}>Copy To Clipboard</button>
            </div>
        </div>
    );
}

export default PasswordSuggestion;
