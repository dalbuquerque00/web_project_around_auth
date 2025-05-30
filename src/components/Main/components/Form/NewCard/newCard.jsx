import { useState, useEffect } from 'react';

export default function NewCard({ handleAddPlaceSubmit }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  

  useEffect(() => {  
    const isNameValid = name.trim().length >= 2;  
    const isLinkValid = link.trim().length > 0 && isValidUrl(link);  
    setIsFormValid(isNameValid && isLinkValid);  
  }, [name, link]);  
  
  const isValidUrl = (url) => {  
    try {  
      new URL(url);  
      return true;  
    } catch (error) {  
      return false;  
    }  
  };

  const handleNameChange = (event) => {  
    setName(event.target.value);  
  };  
  
  const handleLinkChange = (event) => {  
    setLink(event.target.value);  
  };

  const handleSubmit = (event) => {  
    event.preventDefault();  
    if (event.target.checkValidity() && isFormValid) {  
      handleAddPlaceSubmit({  
        name,  
        link  
      });  
    }  
  };

  return (  
    <form  
      id="add-form"  
      className="popup__form"  
      name="add-card"  
      noValidate  
      onSubmit={handleSubmit}  
    >  
      <div className="popup__field">  
        <input  
          type="text"  
          name="name"  
          className="popup__input popup__input_title"  
          placeholder="Título"  
          required  
          minLength="2"  
          maxLength="30"  
          value={name}  
          onChange={handleNameChange}  
        />  
        <span className="popup__error">  
          {name.length > 0 && name.length < 2 ?   
            `Use pelo menos 2 caracteres (atualmente está usando ${name.length} caracteres).`   
            : '\u00A0'}  
        </span>  
      </div>  
  
      <div className="popup__field">  
        <input  
          type="url"  
          name="link"  
          className="popup__input popup__input_link"  
          placeholder="URL da imagem"  
          required  
          value={link}  
          onChange={handleLinkChange}  
        />  
        <span className="popup__error">  
          {link.length > 0 && !isValidUrl(link) ?   
            'Por favor, introduza uma URL válida'   
            : '\u00A0'}  
        </span>  
      </div>  
  
      <button    
        type="submit"    
        className={`popup__button ${!isFormValid ? 'popup__button_disabled' : ''}`}    
        disabled={!isFormValid}    
      >    
        Crear    
      </button>  
    </form>  
  );  
}