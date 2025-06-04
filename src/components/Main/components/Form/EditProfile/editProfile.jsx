import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../../../../contexts/CurrentUserContext';
import Popup from '../../Popup/popup';

function EditProfile({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentUser?.name && currentUser?.about) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <Popup
      name="edit-profile"
      title="Editar perfil"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form" name="edit-profile" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className="popup__input popup__input_type_name"
          placeholder="Nome"
          required
          minLength="2"
          maxLength="40"
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="name-error"></span>
        <input
          type="text"
          name="description"
          className="popup__input popup__input_type_about"
          placeholder="Sobre mim"
          required
          minLength="2"
          maxLength="200"
          value={description || ''}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error" id="description-error"></span>
        <button type="submit" className="popup__button">
          Salvar
        </button>
      </form>
    </Popup>
  );
}

export default EditProfile;