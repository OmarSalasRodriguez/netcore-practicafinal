
import { useEffect, useState } from "react";
import { FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Button, Form } from "reactstrap";

const personaItemModel = {
    Id: 0,
    Name: "",
    Description: "",
    IsCompleted: false,
};

const PersonaModal = ({ showModal, setShowModal, savePersonaItem, edit, setEdit, updatePersonaItem }) => {
    const [personaItem, setPersonaItem] = useState(personaItemModel);

    const updateForm = (e) => {
        setPersonaItem({
            ...personaItem,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        if (edit != null) {
            setPersonaItem(edit);
        } else {
            setPersonaItem(personaItemModel);
        }

    }, [edit]);

    const closeModal = () => {
        setShowModal(!showModal);
        setEdit(null);
    };

   
    return (
        <Modal isOpen={showModal}>
            <ModalHeader>
                {personaItem.Id === 0 ? "Nuevo" : "Editar"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input
                            name="Name"
                            type="text"
                            placeholder="Nombre"
                            onChange={(e) => updateForm(e)}
                            value={personaItem.Name}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Descripción</Label>
                        <Input
                            name="Description"
                            type="text"
                            placeholder="Descripción"
                            onChange={(e) => updateForm(e)}
                            value={personaItem.Description}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Calificación</Label>
                        <Input type="select" name="IsCompleted" onChange={(e) => updateForm(e)} value={personaItem.IsCompleted}>
                            <option value="true">Completado</option>
                            <option value="false">Incompleto</option>
                        </Input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" className="me-2" onClick={personaItem.Id === 0 ? (e) => savePersonaItem(personaItem) : (e) => updatePersonaItem(personaItem)}>{personaItem.Id === 0 ? 'Guardar' : 'Actualizar'}</Button>
                <Button color="danger" size="sm" className="me-2" onClick={closeModal}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    );
};

export default PersonaModal;
