import React, { useState, useEffect } from 'react';
import Popup from '../../Popup/popup';

export default function EditAvatar({ isOpen, onClose, onUpdateAvatar }) {
  const [avatarLink, setAvatarLink] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const isLinkValid = avatarLink.trim().length > 0 && isValidUrl(avatarLink);
    setIsFormValid(isLinkValid);
  }, [avatarLink]);

  const handleAvatarChange = (event) => {
    setAvatarLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity() && isFormValid) {
      onUpdateAvatar(avatarLink);
    }
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} title="Editar Avatar">
      <form
        id="avatar-form"
        className="popup__form"
        name="avatar"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="popup__field">
          <input
            type="url"
            name="avatar"
            className="popup__input popup__input_avatar"
            placeholder="Link da imagem"
            required
            value={avatarLink}
            onChange={handleAvatarChange}
          />
          <span className="popup__error">
            {avatarLink.trim().length === 0 ? 
              'Por favor, introduza uma URL válida' : 
              !isValidUrl(avatarLink) ? 
              'Por favor, introduza uma URL válida' : 
              '\u00A0'}
          </span>
        </div>

        <button
          type="submit"
          className={`popup__button ${!isFormValid ? 'popup__button_disabled' : ''}`}
          disabled={!isFormValid}
        >
          Salvar
        </button>
      </form>
    </Popup>
  );
}