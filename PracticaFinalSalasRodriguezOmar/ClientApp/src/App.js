import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import { useEffect, useState } from 'react';
import PersonaItemTable from "./components/PersonaItemTable";
import PersonaItemModal from "./components/PersonaItemModal";
import PersonaCard from "./components/PersonaCard";

const App = () => {
    const [personaItems, setPersonaItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [edit, setEdit] = useState(null);

    // GET
    const getPersonaItems = async () => {
        const response = await fetch("http://localhost:5213/api/Persona?");

        if (!response.ok) {
            setPersonaItems([]);
            return;
        }

        const data = await response.json();
        setPersonaItems(data);
    }

    // DELETE
    const deletePersonaItem = async (id) => {
        var confirm = window.confirm("¿Deseas eliminar el elemento?");
        if (!confirm) return;

        const response = await fetch("http://localhost:5213/api/Persona/" + id, {
            method: "DELETE",
        });

        if (!response.ok) return window.alert("No se ha podido eliminar el elemento");

        window.alert("Elemento eliminado");
        getPersonaItems();
    };

    // POST
    const savePersonaItem = async (personaItem) => {
        const response = await fetch("http://localhost:5213/api/Persona", {
            method: "POST",
            headers: {
                'Content-Type': "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                Name: personaItem.Name,
                Description: personaItem.Description,
                IsCompleted: personaItem.IsCompleted === 'true',
            }),
        });

        if (!response.ok) {
            window.alert("No se ha podido registrar el elemento");
            return;
        }

        setShowModal(!showModal);
        getPersonaItems();
    };

    // PATCH
    const updatePersonaItem = async (personaItem) => {
        const response = await fetch(`http://localhost:5213/api/Persona/${personaItem.Id}` , {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                Name: personaItem.Name,
                Description: personaItem.Description,
                IsCompleted: personaItem.IsCompleted === 'true',
            }),
        });

        if (!response.ok) {
            window.alert("No se ha podido actualizar el elemento");
            return;
        }


        setShowModal(!showModal);
        getPersonaItems();
    };

    useEffect(() => {
        getPersonaItems();
    }, []);


    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <div className="d-flex justify-content-between">
                                <h5>Personas</h5>
                                <div className="d-flex gap-3">
                                    <Button size="sm" color="success" onClick={() => setShowModal(!showModal)}>Agregar</Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody style={{ 'padding': '25px' }}>

                            <PersonaCard
                                personaItems={personaItems}
                                deletePersonaItem={deletePersonaItem}
                                setEdit={setEdit}
                                setShowModal={setShowModal}
                                showModal={showModal}
                            ></PersonaCard>

                            { /* <PersonaItemTable
                                personaItems={personaItems}
                                deletePersonaItem={deletePersonaItem}
                                setEdit={setEdit}
                                setShowModal={setShowModal}
                                showModal={showModal}
                            /> */ }

                        </CardBody>
                    </Card>

                </Col>
            </Row>

            <PersonaItemModal
                showModal={showModal}
                setShowModal={setShowModal}
                savePersonaItem={savePersonaItem}
                edit={edit}
                setEdit={setEdit}
                updatePersonaItem={updatePersonaItem}
            />
        </Container>
    );
}

export default App;