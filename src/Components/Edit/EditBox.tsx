import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { updateStrings } from 'yargs';
import { create, update } from '../../apis';
import { contactsState, editedContactState } from '../../store';
import EditItem from './EditItem';

const Box = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Title = styled.h1``;

const ButtonBox = styled.div`
    margin-top: 20px;
`;

const ConfirmButton = styled.button`
    background: #28adfa;
    color: white;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #28adfa;
    border-radius: 3px;
`;

const CancelButton = styled.button`
    background: white;
    color: #28adfa;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #28adfa;
    border-radius: 3px;
`;

const EditBox = ({ setIsEdit }: { setIsEdit: (isEdit: boolean) => void }) => {
    const [editedContact, setEditedContact] = useRecoilState(editedContactState);
    const [contacts, setContacts] = useRecoilState(contactsState);

    const handleChange = (keyString: string, value: string) => {
        const newEditContact: any = { ...editedContact };
        newEditContact[keyString] = value;
        setEditedContact(newEditContact);
    };

    const handleSave = async () => {
        const response = await create(editedContact);
        if (response.ok) {
            const contact = await response.json();
            setContacts([...contacts, contact]);
            setEditedContact({});
            setIsEdit(false);
        }
    };

    const handleModify = async () => {
        const response = await update(editedContact);
        if (response.ok) {
            const contact = await response.json();

            let arr = contacts.slice(0);

            const id = arr.findIndex((index) => index.id === contact.id);
            arr.splice(id, 1, contact);

            setContacts(arr);
            setEditedContact({});
            setIsEdit(false);
        }
    };

    const handleCancel = () => {
        setEditedContact({});
        setIsEdit(false);
    };

    return (
        <Box>
            <Title>{editedContact.id ? '???????????? ???????????? ?????????' : '???????????? ???????????????'}</Title>
            <EditItem title="??????" keyString="name" value={editedContact.name} onChange={handleChange} />
            <EditItem title="????????????" keyString="phoneNumber" value={editedContact.phoneNumber} onChange={handleChange} />
            <EditItem title="??????" keyString="age" value={editedContact.age} onChange={handleChange} />
            <EditItem title="email" keyString="email" value={editedContact.email} onChange={handleChange} />
            <EditItem title="??????" keyString="description" value={editedContact.description} onChange={handleChange} />
            <ButtonBox>
                <ConfirmButton onClick={editedContact.id ? handleModify : handleSave}>??????</ConfirmButton>
                <CancelButton onClick={handleCancel}>??????</CancelButton>
            </ButtonBox>
        </Box>
    );
};

export default EditBox;
