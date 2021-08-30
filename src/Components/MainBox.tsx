import LeftBox from './Left/LeftBox';
import RightBox from './Right/RightBox';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { contactsState, editedContactState, selectedContactState } from '../store';
import { remove } from '../apis';
import { useState } from 'react';
import EditBox from './Edit/EditBox';

const Box = styled.div`
  display: flex;
  border: 1px solid #9b9b9b;
  position: relative;
  width: 600px;
  height: 500px;
`;

const CircleButton = styled.button`
  position: absolute;
  border: none;
  color: white;
  text-align: center;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  &:disabled {
    cursor: not-allowed;
    background-color: #b6b6b6;
  }
`;

const ModButton = styled(CircleButton)`
  bottom:10px;
  right: 120px;
  background-color: #FF0000; 
`

const AddButton = styled(CircleButton)`
  bottom: 10px;
  right: 65px;
  background-color: #FFE400;
`;

const DelButton = styled(CircleButton)`
  bottom: 10px;
  right: 10px;
  background-color: #35B62C;
`;

const MainBox = () => {
  const [selectedContact, setSelectedContact] = useRecoilState(selectedContactState);
  const [contacts, setContacts] = useRecoilState(contactsState);
  const [isEdit, setIsEdit] = useState(false);
  const setEditedContact = useSetRecoilState(editedContactState);

  const handleDelete = () => {
    setSelectedContact(null);
    if (selectedContact) {
      remove(selectedContact.id);
      setContacts(contacts.filter((contact) => contact !== selectedContact));
    }
  };

  const handleAdd = () => {
    setEditedContact({});
    setIsEdit(true);
  };

  const handleMod = () => {
    setEditedContact({...selectedContact, age: String(selectedContact?.age)})
    setIsEdit(true);
  }

  return (
    <Box>
      {isEdit ? (
        <EditBox setIsEdit={setIsEdit} />
      ) : (
        <>
          <LeftBox />
          <RightBox />
          
          <ModButton disabled={!selectedContact} onClick={handleMod}>U</ModButton>
          <AddButton onClick={handleAdd}>+</AddButton>
          <DelButton disabled={!selectedContact} onClick={handleDelete}>
            -
          </DelButton>
        </>
      )}
    </Box>
  );
};

export default MainBox;
