
import { Button, Table } from "reactstrap";


const PersonaItemTable = ({ personaItems, deletePersonaItem, setEdit, showModal, setShowModal }) => {
    const sendData = (contacto) => {
        setEdit(contacto);
        setShowModal(!showModal);
    };

    const notData = (
        <tr>
            <td colSpan="5" className="text-center p-3">No hay elementos registrados</td>
        </tr>
    );

    const data = (
        personaItems.map((item) => (
            <tr key={item.Id}>
                <td>{item.Id}</td>
                <td>{item.Name}</td>
                <td>{item.Description}</td>
                <td>{item.IsCompleted ? "Completado" : "En proceso"}</td>
                <td>
                    <div className='d-flex justify-content-between'>
                        <Button color="primary" size="sm" className="me-2" onClick={() => sendData(item)}>Editar</Button>
                        <Button color="danger" size="sm" className="me-2" onClick={() => deletePersonaItem(item.Id)}>Eliminar</Button>
                    </div>
                </td>
            </tr>
        ))
    );


    return (
        <>
            <Table striped responsive id="table-to-xls">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Completado</th>
                        <th style={{ 'width': '160px' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {(personaItems.length === 0) ? notData : data}
                </tbody>
            </Table>
        </>
    );
}

export default PersonaItemTable;

